/**
 * Repair the dangling pipeline-stage reference in "1. Signed Up - 30 Day Trial".
 *
 * The step "Update to WON Opportunity" marks the lead opportunity won and parks
 * it in a stage. In South Woodford and Hackney that stage id is
 * 3a4856dd-a3c6-4b28-af60-005e73b18e4e — the SAME id in both accounts, which is
 * the tell: it came in with a snapshot and belongs to neither location. GHL
 * validates the whole workflow document on write, so the bad reference blocked
 * every save, including ones that had nothing to do with it.
 *
 * Leytonstone, where someone fixed this by hand, points at a dedicated
 * "Signed Up" stage in its Leads pipeline. Neither of the other two has such a
 * stage, so this picks the furthest-along positive stage that does exist —
 * "Tour / taster / call booked". The opportunity_status stays "won", which is
 * what reporting actually keys on; the stage is where a won record is filed.
 *
 *   node fix-pipeline-stage.mjs [--dry]
 */
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';

const { client } = makeClient();
const DRY = process.argv.includes('--dry');
const BROKEN = '3a4856dd-a3c6-4b28-af60-005e73b18e4e';

const FIX = {
  'South Woodford': {
    locationId: 'cquQsieyBZx9vRgEqBge',
    stageId: '056fb00d-4474-4888-8c4e-71bab54c352d',   // 01. Leads · Tour / taster / call booked
    stageName: 'Tour / taster / call booked',
  },
  Hackney: {
    locationId: '147m777NnBtnn7yLrsdb',
    stageId: '640d2235-1891-403f-a5fd-002fc635b0b4',   // 01. Leads · Tour / taster / call booked
    stageName: 'Tour / taster / call booked',
  },
};

for (const [studio, f] of Object.entries(FIX)) {
  /* confirm the stage really exists in that location before pointing at it */
  const pipes = await client.getPipelines({ locationId: f.locationId });
  const all = (pipes.pipelines || pipes || []).flatMap((p) => (p.stages || []).map((s) => ({ ...s, pipe: p.name, pipeId: p.id })));
  const target = all.find((s) => s.id === f.stageId);
  if (!target) throw new Error(`${studio}: stage ${f.stageId} not found in this location`);

  const seen = new Set();
  const walk = async (parentId) => {
    const r = await client.listWorkflows({ locationId: f.locationId, parentId, limit: 200 });
    for (const w of (r.rows || [])) {
      const id = w._id || w.id;
      if (w.type === 'directory' || w.type === 'folder') { await walk(id); continue; }
      if (seen.has(id) || w.name !== '1. Signed Up - 30 Day Trial') continue;
      seen.add(id);

      const { workflow, templates } = await load(client, f.locationId, id);
      const hits = templates.filter((s) => s.attributes?.pipeline_stage_id === BROKEN);
      if (!hits.length) { console.log(`${studio}: nothing to fix`); continue; }

      for (const s of hits) {
        /* the stage must belong to the pipeline the step targets */
        if (target.pipeId !== s.attributes.pipeline_id) {
          throw new Error(`${studio}: stage is in "${target.pipe}" but the step targets pipeline ${s.attributes.pipeline_id}`);
        }
        console.log(`${studio}: "${s.name}" ${BROKEN}\n    -> ${f.stageId}  (${target.pipe} · ${target.name})`);
        s.attributes = { ...s.attributes, pipeline_stage_id: f.stageId };
      }
      if (DRY) { console.log('    DRY RUN — not saved'); continue; }
      const res = await save(client, f.locationId, id, workflow, templates, { status: workflow.status });
      console.log(`    saved: HTTP ${res.status}, status ${res.workflowStatus}, ${res.steps} steps`);
    }
  };
  await walk('root');
}
