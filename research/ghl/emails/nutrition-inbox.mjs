/**
 * Copy nutrition consultation requests to nutrition@blueprintfitnessldn.com
 * (requested by Staf, 5 Nov 2026), alongside whoever already receives them.
 *
 * In each studio's "Nutrition Consult" workflow, the internal notification that
 * goes to a fixed address gets nutrition@ appended. GHL stores several
 * recipients as one comma-separated string — the format its own UI writes, as
 * in "Check In Form Feb 2024" — so that is what is written here. Nothing else
 * in the workflow changes. Backed up before saving; each save is read back.
 *
 *   node nutrition-inbox.mjs <backup-dir> [--dry]
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';

const { client } = makeClient();
const ADD = 'nutrition@blueprintfitnessldn.com';
const DRY = process.argv.includes('--dry');
const BACKUP = process.argv[2];
mkdirSync(BACKUP, { recursive: true });
const LOCS = { 'south-woodford': 'cquQsieyBZx9vRgEqBge', leytonstone: 'mztjJyXHNWiEotc8ItXP', hackney: '147m777NnBtnn7yLrsdb' };

const find = async (loc, name, parentId = 'root') => {
  const r = await client.listWorkflows({ locationId: loc, parentId, limit: 200 });
  for (const w of r.rows || []) {
    if (w.name === name && w.type !== 'directory') return w;
    if (w.type === 'directory') { const h = await find(loc, name, w._id || w.id); if (h) return h; }
  }
};
/* internal notifications keep the recipient under attributes.email.to */
const toOf = (s) => String(s.attributes?.email?.to ?? '');
const setTo = (s, v) => { s.attributes.email.to = v; };

for (const [slug, loc] of Object.entries(LOCS)) {
  const w = await find(loc, 'Nutrition Consult');
  if (!w) { console.log(`${slug}: no Nutrition Consult workflow`); continue; }
  const id = w._id || w.id;
  const { workflow, templates } = await load(client, loc, id);
  const custom = templates.filter((s) => s.type === 'internal_notification' && toOf(s).includes('@'));
  if (!custom.length) { console.log(`${slug.padEnd(15)} NOT FOUND: no notification to a fixed address`); continue; }
  const steps = custom.filter((s) => !toOf(s).toLowerCase().includes(ADD));
  if (!steps.length) { console.log(`${slug.padEnd(15)} already includes ${ADD}`); continue; }
  writeFileSync(`${BACKUP}/${slug}-Nutrition-Consult.json`, JSON.stringify({ workflow, templates }, null, 1));
  for (const s of steps) {
    const before = toOf(s);
    setTo(s, `${before},${ADD}`);
    console.log(`${slug.padEnd(15)} "${s.name}": "${before}" -> "${toOf(s)}"`);
  }
  if (DRY) continue;
  const res = await save(client, loc, id, workflow, templates, { status: workflow.status });
  if (res.status !== 200 && res.status !== 201) throw new Error(`${slug}: save failed ${JSON.stringify(res).slice(0, 200)}`);
  const again = await load(client, loc, id);
  const now = again.templates.filter((s) => steps.some((x) => x.id === s.id)).map(toOf);
  console.log(`${' '.repeat(15)} saved, status ${again.workflow.status}; read back: ${JSON.stringify(now)}`);
}
