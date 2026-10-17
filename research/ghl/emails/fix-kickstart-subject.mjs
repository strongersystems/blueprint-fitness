/**
 * Correct the Kickstart price in one email step's SUBJECT.
 *
 * The subject is held on the workflow step (attributes.subject), not in the
 * template, so redeploying templates fixes the body but leaves the subject
 * saying the old price. This touches exactly one step per workflow — the step
 * whose subject carries a £ figure that no longer matches the studio — and
 * nothing else. Full-document save, as workflow.mjs requires; each workflow is
 * backed up first.
 *
 *   node fix-kickstart-subject.mjs <backup-dir> [--dry]
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';
import { STUDIOS } from './render.mjs';

const { client } = makeClient();
const DRY = process.argv.includes('--dry');
const BACKUP = process.argv[2];
mkdirSync(BACKUP, { recursive: true });

const LOCS = { 'south-woodford': 'cquQsieyBZx9vRgEqBge', leytonstone: 'mztjJyXHNWiEotc8ItXP', hackney: '147m777NnBtnn7yLrsdb' };
const WORKFLOW = '1. New Lead - 30 Day Kickstart';

for (const [slug, locationId] of Object.entries(LOCS)) {
  const price = STUDIOS[slug].kickstartPrice;
  const r = await client.listWorkflows({ locationId, parentId: 'root', limit: 200 });
  const find = async (parentId) => {
    const rr = await client.listWorkflows({ locationId, parentId, limit: 200 });
    for (const w of rr.rows || []) {
      if (w.name === WORKFLOW && w.type !== 'directory') return w;
      if (w.type === 'directory') { const hit = await find(w._id || w.id); if (hit) return hit; }
    }
  };
  const w = await find('root');
  if (!w) { console.log(`${slug}: workflow not found`); continue; }
  const id = w._id || w.id;
  const { workflow, templates } = await load(client, locationId, id);

  const wrong = templates.filter((s) => s.type === 'email' && /£\d+/.test(s.attributes?.subject || '')
                                         && !(s.attributes.subject.includes(price)));
  if (!wrong.length) { console.log(`${slug.padEnd(15)} already ${price} — nothing to change`); continue; }

  writeFileSync(`${BACKUP}/${slug}-${WORKFLOW.replace(/[^a-z0-9]+/gi, '-')}.json`, JSON.stringify({ workflow, templates }, null, 1));
  for (const s of wrong) {
    const before = s.attributes.subject;
    s.attributes.subject = before.replace(/£\d+/, price);
    console.log(`${slug.padEnd(15)} ${s.name}: "${before}" -> "${s.attributes.subject}"`);
  }
  if (DRY) continue;
  const res = await save(client, locationId, id, workflow, templates, { status: workflow.status });
  if (res.status !== 200 && res.status !== 201) throw new Error(`${slug}: save failed ${JSON.stringify(res).slice(0, 200)}`);

  /* read back rather than trust the save — GHL has returned stale reads before */
  const again = await load(client, locationId, id);
  const now = again.templates.filter((s) => wrong.some((x) => x.id === s.id)).map((s) => s.attributes.subject);
  console.log(`${' '.repeat(15)} saved; read back: ${JSON.stringify(now)}`);
}
