/**
 * South Woodford is six people to a coach; Leytonstone and Hackney are five (Matt, 27 Nov 2026).
 *
 * Walks every South Woodford workflow, finds each email step's template (and any inline HTML), and
 * rewrites the coach-ratio wording in place: "five" -> "six", "5:1" -> "6:1". Only ratio phrases are
 * touched ("five free sessions" is a different thing and is left alone). Each template is backed up
 * before it is written and read back after.
 *
 *   node sw-six-per-coach.mjs <backup-dir> [--dry]
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';

const { client } = makeClient();
const LOC = 'cquQsieyBZx9vRgEqBge';
const DRY = process.argv.includes('--dry');
const BACKUP = process.argv[2];
const USER = process.env.GHL_USER_ID;
mkdirSync(BACKUP, { recursive: true });

const RULES = [
  [/\b(never more than|no more than|maximum of|max(?:imum)?|groups? of|up to) (?:five|5)\b(?! (?:free|sessions?|days?|weeks?|minutes?|mins?|years?|stars?)\b)/gi,
    (m, a) => `${a} ${/5/.test(m) ? '6' : (m.split(' ').pop()[0] === 'F' ? 'Six' : 'six')}`],
  [/\b(Five|five) (people|of you)(,? (?:to|per) (?:a|that|one) coach|, one coach)/g, (m, f, w, t) => `${f === 'Five' ? 'Six' : 'six'} ${w}${t}`],
  [/\b(Five|five) (people to a coach|to a coach|per coach)/g, (m, f, t) => `${f === 'Five' ? 'Six' : 'six'} ${t}`],
  [/(>\s*)5:1(\s*<)/g, '$16:1$2'],
  [/\b5:1\b/g, '6:1'],
];
const fix = (html) => RULES.reduce((h, [re, to]) => h.replace(re, to), html);
const hits = (html) => {
  const t = html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
  return [...t.matchAll(/.{0,40}(\bfive\b|\b5:1\b|\b5 (?:people|per)|max(?:imum)? (?:of )?5)\b.{0,40}/gi)]
    .map((m) => m[0].trim()).filter((s) => !/five[- ]star|five free|five sessions|the five sessions/i.test(s));
};

async function getTpl(id) {
  const r = await client.rawRequest({ method: 'GET', path: `/emails/builder/${LOC}/${id}` });
  if (!r.ok || !r.data) return null;
  const html = r.data.downloadUrl ? await (await fetch(r.data.downloadUrl)).text() : '';
  return { name: r.data.name, html, editorType: r.data.editorType || r.data.type };
}

const tplIds = new Map();          // template id -> [workflow/step]
const inline = [];                 // { wfId, wfName, step }
const walk = async (parentId) => {
  const r = await client.listWorkflows({ locationId: LOC, parentId, limit: 200 });
  for (const w of r.rows || []) {
    const id = w._id || w.id;
    if (w.type === 'directory' || w.type === 'folder') { await walk(id); continue; }
    let got; try { got = await load(client, LOC, id); } catch { continue; }
    for (const s of got.templates || []) {
      if (s.type !== 'email') continue;
      const a = s.attributes || {};
      if (a.template_id) tplIds.set(a.template_id, [...(tplIds.get(a.template_id) || []), `${w.name} [${got.workflow.status}] / ${s.name}`]);
      if (a.html && hits(a.html).length) inline.push({ wfId: id, wfName: w.name, status: got.workflow.status, step: s.name, src: a.templatesource, tid: a.template_id, keys: Object.keys(a).join(',') });
    }
  }
};
await walk('root');
console.log(`${tplIds.size} templates used by South Woodford workflows; ${inline.length} inline-HTML steps with ratio wording`);
for (const x of inline) console.log(`  INLINE ${x.wfName} [${x.status}] / ${x.step}  templatesource=${x.src} template_id=${x.tid}\n    keys: ${x.keys}`);

let changed = 0;
for (const [id, uses] of tplIds) {
  const t = await getTpl(id);
  if (!t || !t.html) continue;
  const h = hits(t.html);
  if (!h.length) continue;
  const next = fix(t.html);
  const left = hits(next).filter((s) => /\bfive\b|5:1/i.test(s) && !/\bsix\b|6:1/i.test(s));
  const six = [...next.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').matchAll(/.{0,30}(\bsix\b|\bSix\b|6:1).{0,30}/g)].map((m) => m[0].trim());
  console.log(`\n${t.name} (${id})\n  six now: ${six.join(' | ')}`);
  console.log(`\n  used by: ${uses.join('; ')}\n  before: ${h.join(' | ')}\n  after:  ${hits(next).join(' | ') || '(no ratio wording)'}${left.length ? `\n  !! still says five: ${left.join(' | ')}` : ''}`);
  if (next === t.html || DRY) continue;
  writeFileSync(`${BACKUP}/${id}.html`, t.html);
  const up = await client.rawRequest({ method: 'POST', path: '/emails/builder/data',
    body: { locationId: LOC, templateId: id, html: next, editorType: 'html', updatedBy: USER } });
  if (!up.ok) throw new Error(`update ${t.name}: ${up.status} ${JSON.stringify(up.data).slice(0, 200)}`);
  const back = await getTpl(id);
  console.log(`  saved; read back ${back && back.html === next ? 'matches' : 'DOES NOT match — check by hand'}`);
  changed++;
}
console.log(`\n${DRY ? '(dry) ' : ''}${changed} template(s) written`);

/* Steps that keep their own copy of the HTML next to template_id: update that copy too, so it can't send the old line. */
const byWf = new Map();
for (const x of inline) byWf.set(x.wfId, [...(byWf.get(x.wfId) || []), x]);
for (const [wfId, xs] of byWf) {
  const { workflow, templates } = await load(client, LOC, wfId);
  writeFileSync(`${BACKUP}/workflow-${wfId}.json`, JSON.stringify({ workflow, templates }, null, 1));
  let n = 0;
  for (const s of templates) {
    if (s.type !== 'email' || !xs.some((x) => x.step === s.name) || !s.attributes?.html) continue;
    const next = fix(s.attributes.html);
    if (next !== s.attributes.html) { s.attributes.html = next; n++; }
  }
  console.log(`\n${workflow.name} [${workflow.status}]: ${n} inline step(s) ${DRY ? 'would change' : 'changed'}`);
  if (DRY || !n) continue;
  const res = await save(client, LOC, wfId, workflow, templates, { status: workflow.status });
  if (res.status !== 200 && res.status !== 201) throw new Error(`${workflow.name}: save failed ${JSON.stringify(res).slice(0, 200)}`);
  const again = await load(client, LOC, wfId);
  const ok = again.templates.filter((s) => xs.some((x) => x.step === s.name)).every((s) => !hits(s.attributes?.html || '').length);
  console.log(`  saved; read back ${ok ? 'has no five-per-coach wording' : 'STILL has it — check by hand'}; status ${again.workflow.status}`);
}
