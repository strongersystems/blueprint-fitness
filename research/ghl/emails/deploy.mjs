/**
 * Create the rebuilt email templates in all three Blueprint sub-accounts.
 *
 * Endpoints, established by probing on the throwaway test location first:
 *   POST /emails/builder        { type:'folder', title }         -> creates a folder
 *   POST /emails/builder        { type:'html', title, parentId, html, editorType:'html' }
 *                                                                -> creates a template
 *
 * The name field is `title`. `name` is accepted and silently ignored, and the
 * template comes out called "New Template" — worth knowing, because the builder
 * listing only returns ROOT-level items, so foldered templates never show up
 * there to tell you something went wrong.
 *   POST /emails/builder/data   { templateId, html, editorType } -> replaces the HTML
 *   GET  /emails/builder/{loc}/{id}                              -> doc, with downloadUrl
 *
 * Templates are created as `html` rather than `builder` on purpose. A builder
 * template needs its drag-and-drop design JSON (`dnd`), which the API does not
 * expose on read — so a builder template cannot be created or edited from here
 * at all. HTML templates are fully editable by this script and render
 * identically; the trade is that the team edits them as HTML, not by dragging.
 *
 * Writes a key -> templateId map that repoint.mjs uses to wire the workflows
 * up. That map is also the record of what this created: re-running deletes the
 * ids it lists before recreating, since the listing cannot see into folders.
 *
 *   node deploy.mjs <out.json> [--dry] [--studio south-woodford]
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { STUDIOS } from './render.mjs';
import { build, FOLDERS } from './content.mjs';

const { client } = makeClient();
const DRY = process.argv.includes('--dry');
const only = process.argv.includes('--studio') ? process.argv[process.argv.indexOf('--studio') + 1] : null;
const USER = process.env.GHL_USER_ID;

const LOCS = {
  'south-woodford': 'cquQsieyBZx9vRgEqBge',
  leytonstone: 'mztjJyXHNWiEotc8ItXP',
  hackney: '147m777NnBtnn7yLrsdb',
};

/** Root-level items only — the listing does not descend into folders, which is
    why re-runs are driven by the saved map rather than by this. */
async function existing(locationId) {
  const r = await client.rawRequest({ method: 'GET', path: '/emails/builder',
    query: { locationId, limit: 500, offset: 0 } });
  const map = new Map();
  for (const b of (r.data?.builders || [])) map.set(b.name, b.id);
  return map;
}

async function docOf(locationId, id) {
  const r = await client.rawRequest({ method: 'GET', path: `/emails/builder/${locationId}/${id}` });
  return r.ok ? r.data : null;
}

/* The builder listing cannot see inside folders, so the previously written map
   is the only record of what already exists. Ids in it are reused and their
   bodies rewritten; anything new is created. Without this a re-run silently
   duplicates every template. */
const prior = existsSync(process.argv[2]) ? JSON.parse(readFileSync(process.argv[2], 'utf8')) : {};

const out = {};
for (const [slug, locationId] of Object.entries(LOCS)) {
  if (only && slug !== only) continue;
  const studio = STUDIOS[slug];
  const emails = build(studio);
  const seen = await existing(locationId);
  const was = prior[slug] || { folders: {}, templates: {} };
  const folders = { ...was.folders };

  console.log(`\n=== ${studio.name}`);

  for (const name of FOLDERS) {
    if (folders[name]) { console.log(`  folder  (exists) ${name}`); continue; }
    if (seen.has(name)) { folders[name] = seen.get(name); console.log(`  folder  (exists) ${name}`); continue; }
    if (DRY) { folders[name] = '(dry)'; console.log(`  folder  (would create) ${name}`); continue; }
    const r = await client.rawRequest({ method: 'POST', path: '/emails/builder',
      body: { locationId, type: 'folder', title: name, updatedBy: USER, builderVersion: '2' } });
    if (!r.ok) throw new Error(`folder "${name}": ${r.status} ${JSON.stringify(r.data).slice(0, 200)}`);
    folders[name] = r.data.id;
    console.log(`  folder  created ${name}  ${r.data.id}`);
  }

  out[slug] = { locationId, folders, templates: {} };

  for (const e of emails) {
    const parentId = folders[e.folder];
    if (DRY) { console.log(`  tpl     (would write) ${e.name}`); out[slug].templates[e.key] = '(dry)'; continue; }

    let id = was.templates[e.key] || seen.get(e.name);
    const reused = !!id;
    if (id) {
      const up = await client.rawRequest({ method: 'POST', path: '/emails/builder/data',
        body: { locationId, templateId: id, html: e.html, editorType: 'html', updatedBy: USER } });
      if (!up.ok) throw new Error(`update "${e.name}": ${up.status} ${JSON.stringify(up.data).slice(0, 200)}`);
    } else {
      const cr = await client.rawRequest({ method: 'POST', path: '/emails/builder',
        body: { locationId, type: 'html', title: e.name, parentId, updatedBy: USER,
                builderVersion: '2', html: e.html, editorType: 'html', isPlainText: false } });
      if (!cr.ok) throw new Error(`create "${e.name}": ${cr.status} ${JSON.stringify(cr.data).slice(0, 200)}`);
      id = cr.data.id;
      /* the create call does not always persist the body, so write it explicitly */
      const up = await client.rawRequest({ method: 'POST', path: '/emails/builder/data',
        body: { locationId, templateId: id, html: e.html, editorType: 'html', updatedBy: USER } });
      if (!up.ok) throw new Error(`fill "${e.name}": ${up.status} ${JSON.stringify(up.data).slice(0, 200)}`);
    }
    out[slug].templates[e.key] = id;
    console.log(`  tpl     ${reused ? 'updated' : 'created'} ${e.key.padEnd(14)} ${id}  ${e.name}`);
  }

  /* verify: read every template back and confirm the copy actually landed */
  if (!DRY) {
    let ok = 0, bad = [];
    for (const e of emails) {
      const d = await docOf(locationId, out[slug].templates[e.key]);
      if (!d?.downloadUrl) { bad.push(`${e.key}: no downloadUrl`); continue; }
      const html = await (await fetch(d.downloadUrl)).text();
      const marker = e.subject.replace(/\{\{[^}]+\}\}/g, '').trim().slice(0, 18);
      if (d.name !== e.name) { bad.push(`${e.key}: stored name is ${JSON.stringify(d.name)}`); continue; }
      if (html.includes('blueprintfitnessldn.com') && (!marker || html.includes(marker.slice(0, 12)) || html.length > 3000)) ok++;
      else bad.push(`${e.key}: body looks wrong (${html.length} bytes)`);
    }
    console.log(`  verified ${ok}/${emails.length}${bad.length ? '  PROBLEMS: ' + bad.join('; ') : ''}`);
  }
}

if (!DRY) writeFileSync(process.argv[2], JSON.stringify(out, null, 2));
console.log(DRY ? '\nDRY RUN — nothing written' : `\nwrote ${process.argv[2]}`);
