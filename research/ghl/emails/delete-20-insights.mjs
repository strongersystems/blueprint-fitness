/* Delete the "20 Insights" workflows. Draft in South Woodford and Leytonstone,
   21 email steps each, every one pointing at a template that no longer exists —
   so if it were ever published it would send 21 empty emails. Backed up first. */
import { writeFileSync, mkdirSync } from 'node:fs';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';
const { client } = makeClient();
const DRY = process.argv.includes('--dry');
const BACKUP = process.argv[2];
mkdirSync(BACKUP, { recursive: true });

for (const [name, locationId] of [['South Woodford','cquQsieyBZx9vRgEqBge'],
                                  ['Leytonstone','mztjJyXHNWiEotc8ItXP'],
                                  ['Hackney','147m777NnBtnn7yLrsdb']]) {
  const found = [];
  const walk = async (parentId) => {
    const r = await client.listWorkflows({ locationId, parentId, limit: 200 });
    for (const w of (r.rows || [])) {
      const id = w._id || w.id;
      if (w.type === 'directory' || w.type === 'folder') { await walk(id); continue; }
      if (/^20 Insights/i.test(w.name)) found.push(w);
    }
  };
  await walk('root');
  if (!found.length) { console.log(`${name.padEnd(15)} none`); continue; }
  for (const w of found) {
    const id = w._id || w.id;
    const got = await load(client, locationId, id).catch(() => ({ workflow: w, templates: [] }));
    writeFileSync(`${BACKUP}/DELETED-${name.replace(/\s+/g,'-')}-20-Insights.json`,
                  JSON.stringify(got, null, 1));
    if (DRY) { console.log(`${name.padEnd(15)} would delete "${w.name}" (${w.status}, ${got.templates.length} steps)`); continue; }
    const r = await client.deleteWorkflow(id, { locationId });
    console.log(`${name.padEnd(15)} deleted "${w.name}" (${w.status}, ${got.templates.length} steps) -> ${JSON.stringify(r).slice(0,60)}`);
  }
}
