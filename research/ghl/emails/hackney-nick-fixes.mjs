/**
 * Nick's Hackney fixes (Oct 2026), applied to the live workflows.
 *
 *  1. "30 Day Email Sequence" / "6. Price List": drop the attached
 *     "BF Membership List 2024.pdf". It was copied in from South Woodford's
 *     account, shows South Woodford's prices and a TEAM-only membership, and
 *     Hackney offers neither. The email body now carries Hackney's prices.
 *
 *  2. "Hackney Opening Leads", both SMS steps: drop the attached
 *     "Hackney Next Steps.mp4" (Nick asking new leads to book a call) and the
 *     P.S. line that points at it. Nick would rather warm leads up first —
 *     nobody was booking the call. The rest of the message, asking whether
 *     they are local, is kept.
 *
 * Each workflow is backed up before it is saved, and each save is read back.
 *
 *   node hackney-nick-fixes.mjs <backup-dir> [--dry]
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';

const { client } = makeClient();
const LOC = '147m777NnBtnn7yLrsdb';
const DRY = process.argv.includes('--dry');
const BACKUP = process.argv[2];
mkdirSync(BACKUP, { recursive: true });

const find = async (name, parentId = 'root') => {
  const r = await client.listWorkflows({ locationId: LOC, parentId, limit: 200 });
  for (const w of r.rows || []) {
    if (w.name === name && w.type !== 'directory') return w;
    if (w.type === 'directory') { const h = await find(name, w._id || w.id); if (h) return h; }
  }
};

/** the spintax group that mentions the video, and the space before it */
const VIDEO_PS = /\s*\{[^{}]*\bvideo\b[^{}]*\}/i;

const JOBS = [
  {
    workflow: '30 Day Email Sequence',
    match: (s) => s.type === 'email' && s.name === '6. Price List',
    fix: (s) => {
      const before = (s.attributes.attachments || []).map((a) => a.name);
      s.attributes.attachments = (s.attributes.attachments || []).filter((a) => !/membership list/i.test(a.name || ''));
      return `attachments ${JSON.stringify(before)} -> ${JSON.stringify(s.attributes.attachments.map((a) => a.name))}`;
    },
    check: (s) => !(s.attributes.attachments || []).some((a) => /membership list/i.test(a.name || '')),
  },
  {
    workflow: 'Hackney Opening Leads',
    match: (s) => s.type === 'sms' && ((s.attributes.attachments || []).some((a) => /\.mp4$/i.test(a.name || '')) || VIDEO_PS.test(s.attributes.body || '')),
    fix: (s) => {
      const att = (s.attributes.attachments || []).map((a) => a.name);
      s.attributes.attachments = (s.attributes.attachments || []).filter((a) => !/\.mp4$/i.test(a.name || '') && !/video/i.test(a.type || ''));
      const ps = (s.attributes.body.match(VIDEO_PS) || [''])[0].trim();
      s.attributes.body = s.attributes.body.replace(VIDEO_PS, '');
      return `removed ${JSON.stringify(att)} and P.S. "${ps.slice(0, 60)}…"\n      body now ends: "…${s.attributes.body.slice(-90)}"`;
    },
    check: (s) => !(s.attributes.attachments || []).some((a) => /\.mp4$/i.test(a.name || '')) && !VIDEO_PS.test(s.attributes.body || ''),
  },
];

for (const job of JOBS) {
  const w = await find(job.workflow);
  if (!w) { console.log(`!! ${job.workflow}: not found`); continue; }
  const id = w._id || w.id;
  const { workflow, templates } = await load(client, LOC, id);
  const steps = templates.filter(job.match);
  console.log(`\n${job.workflow} [${workflow.status}] — ${steps.length} step(s) to change`);
  if (!steps.length) continue;
  writeFileSync(`${BACKUP}/hackney-${job.workflow.replace(/[^a-z0-9]+/gi, '-')}.json`, JSON.stringify({ workflow, templates }, null, 1));
  for (const s of steps) console.log(`  [${s.type}] ${s.name} (${s.id.slice(0, 8)}): ${job.fix(s)}`);
  if (DRY) continue;
  const res = await save(client, LOC, id, workflow, templates, { status: workflow.status });
  if (res.status !== 200 && res.status !== 201) throw new Error(`${job.workflow}: save failed ${JSON.stringify(res).slice(0, 200)}`);
  const again = await load(client, LOC, id);
  const ok = again.templates.filter((s) => steps.some((x) => x.id === s.id)).every(job.check);
  console.log(`  saved; read back ${ok ? 'confirms the change' : 'DOES NOT match — check by hand'}; status still ${again.workflow.status}`);
}
