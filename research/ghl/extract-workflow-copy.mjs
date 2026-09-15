/* Every message step in every Blueprint workflow, with its real copy. READ ONLY.

   Shapes, learned from the live data:
     email                 attributes.{subject, template_id} — the HTML is NOT
                           inline. GET /emails/builder/{loc}/{tplId} returns a
                           doc whose downloadUrl is the actual HTML file.
                           (The /emails/builder LIST only returns a handful of
                           templates and misses every nurture email, so each
                           template must be fetched by id.)
     sms                   attributes.body
     internal_notification attributes.email.{subject, html}

   Workflow steps live in a file at workflow.fileUrl; folders ("directory"
   rows) sit alongside workflows in the list and are walked too. */
import { writeFileSync } from 'node:fs';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';
const { client } = makeClient();

const LOCS = [
  ['South Woodford', 'cquQsieyBZx9vRgEqBge'],
  ['Leytonstone',    'mztjJyXHNWiEotc8ItXP'],
  ['Hackney',        '147m777NnBtnn7yLrsdb'],
];
const MSG = new Set(['email', 'sms', 'internal_notification']);
const errors = [];
const tplCache = new Map();          // `${loc}/${id}` -> { name, html }
const snipCache = new Map();         // locationId -> Map(id -> snippet)

/* templatesource "other" means the body lives in a Snippet, not the email
   builder — the Nutrition Consult emails are all of this kind. */
async function snippets(locationId) {
  if (!snipCache.has(locationId)) {
    const r = await client.listSnippets({ locationId });
    snipCache.set(locationId, new Map((r.snippets || []).map(s => [s._id || s.id, s])));
  }
  return snipCache.get(locationId);
}

async function template(locationId, id) {
  const key = `${locationId}/${id}`;
  if (tplCache.has(key)) return tplCache.get(key);
  let val = { name: null, html: '', missing: true };
  try {
    const r = await client.rawRequest({ method: 'GET', path: `/emails/builder/${locationId}/${id}` });
    if (r.ok && r.data && r.data.downloadUrl) {
      const html = await (await fetch(r.data.downloadUrl)).text();
      val = { name: r.data.name || null, html, missing: false };
    } else if (r.ok && r.data) {
      val = { name: r.data.name || null, html: '', missing: false };
    }
  } catch (e) { errors.push(`template ${id}: ${String(e.message).slice(0, 90)}`); }
  tplCache.set(key, val);
  return val;
}

const out = [];
for (const [studio, locationId] of LOCS) {
  const seen = new Set();
  const walk = async (parentId, path) => {
    const r = await client.listWorkflows({ locationId, parentId, limit: 200 });
    for (const w of (r.rows || [])) {
      const id = w._id || w.id;
      if (w.type === 'directory' || w.type === 'folder') { await walk(id, path.concat(w.name)); continue; }
      if (seen.has(id)) continue;
      seen.add(id);
      let got;
      try { got = await load(client, locationId, id); }
      catch (e) { errors.push(`${studio}/${w.name}: ${String(e.message).slice(0, 110)}`); continue; }

      let triggers = [];
      try {
        const t = await client.getTriggers(id, { locationId });
        triggers = (Array.isArray(t) ? t : t?.triggers || []).map(x => x.name || x.type).filter(Boolean);
      } catch (e) {}

      const steps = [];
      for (const s of (got.templates || [])) {
        if (!MSG.has(s.type)) continue;
        const a = s.attributes || {};
        const step = { id: s.id, type: s.type, name: s.name || '', subject: '', from: '',
                       tplId: null, tplName: null, templateMissing: false, body: '' };
        if (s.type === 'email') {
          step.subject = a.subject || '';
          step.from = [a.from_name, a.from_email].filter(Boolean).join(' · ');
          step.tplId = a.template_id || null;
          if (step.tplId) {
            if (a.templatesource === 'other') {
              const sn = (await snippets(locationId)).get(step.tplId);
              if (sn) { step.tplName = sn.name; step.body = sn.template?.html || sn.template?.body || ''; }
              else step.templateMissing = true;
            } else {
              const t = await template(locationId, step.tplId);
              step.tplName = t.name; step.body = t.html; step.templateMissing = t.missing;
            }
          }
          if (!step.body && a.html) step.body = a.html;
        } else if (s.type === 'sms') {
          step.body = a.body || '';
        } else {
          step.subject = a.email?.subject || '';
          step.body = a.email?.html || '';
          step.from = a.email?.from_email || '';
        }
        steps.push(step);
      }
      if (steps.length) out.push({ studio, locationId, workflowId: id, workflow: w.name,
                                   folder: path.join(' / '), status: w.status, triggers, steps });
    }
  };
  await walk('root', []);
  const mine = out.filter(x => x.studio === studio).flatMap(x => x.steps);
  console.log(`${studio.padEnd(15)} ${mine.length} steps · ${mine.filter(s => s.body).length} with copy · ` +
              `${mine.filter(s => s.templateMissing).length} missing template`);
}
writeFileSync(process.argv[2], JSON.stringify({ out, errors }, null, 2));
if (errors.length) { console.log('\nerrors:'); errors.slice(0, 10).forEach(e => console.log('  ' + e)); }
