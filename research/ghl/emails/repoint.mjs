/**
 * Point the workflow email steps at the rebuilt templates.
 *
 * Each email step carries attributes.{subject, template_id, templatesource}.
 * Only those three change — the step's position, delays, branches and ids are
 * left exactly as they are, so the shape of every workflow is untouched.
 *
 * Saving is a full-document PUT (see workflow.mjs): send a partial body and the
 * whole step file is wiped. save() handles that, and refuses to write a graph
 * with dangling references.
 *
 * Every workflow's step file is backed up to <outdir> before it is touched.
 *
 *   node repoint.mjs <tpl-map.json> <backup-dir> [--dry]
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';
import { STUDIOS } from './render.mjs';
import { build } from './content.mjs';

const { client } = makeClient();
const DRY = process.argv.includes('--dry');
const MAP = JSON.parse(await readFile(process.argv[2], 'utf8'));
const BACKUP = process.argv[3];
mkdirSync(BACKUP, { recursive: true });

/**
 * workflow name -> [template keys], in the order the email steps appear.
 * Steps are matched by name where names are unique, and by order where they
 * are not — "2. Cancelled (TeamUp)" has two steps both called "Email".
 */
const PLAN = {
  '1. New Lead - 30 Day Kickstart': {
    byName: {
      'Intro Program - Application Email': 'lead-01',
      'Email 2': 'lead-02', 'Email 3': 'lead-03', 'Email 4': 'lead-04', 'Email 5': 'lead-05',
      'Email 6': 'lead-06', 'Email 7': 'lead-07', 'Email 8': 'lead-08', 'Email 9': 'lead-09',
      'Email 10': 'lead-10',
    },
  },
  'Hackney Opening Leads': {
    byName: { 'Intro Program - Application Email': 'lead-01' },
  },
  '1. Signed Up - 30 Day Trial': {
    byName: { 'Intro - Welcome Email': 'join-01' },
  },
  '30 Day Email Sequence': {
    byName: {
      '2 Email - Nutrition Journey': 'join-02',
      '3 Email - Best Results?': 'join-03',
      '4 Email - Socials': 'join-04',
      '5 Email - Referral Hoodie': 'join-05',
      '7. Email': 'join-06',                 /* life as a full member */
      '6. Price List': 'join-07',            /* what happens after the 30 days */
      '8. Email Thankyou Legend': 'join-08',
    },
  },
  'Nutrition Consult': {
    byName: { 'Email': 'nutrition-01' },
  },
  '2. Cancelled (TeamUp)': {
    /* two steps share the name "Email", so this one goes by order */
    byOrder: ['winback-01', 'winback-02', 'winback-03'],
  },
};

let changed = 0, skipped = 0, saved = 0;
const failures = [];
for (const [slug, entry] of Object.entries(MAP)) {
  const studio = STUDIOS[slug];
  const emails = build(studio);
  const bySubject = Object.fromEntries(emails.map((e) => [e.key, e]));
  const tpl = entry.templates;
  const locationId = entry.locationId;
  console.log(`\n=== ${studio.name}`);

  const seen = new Set();
  const walk = async (parentId) => {
    const r = await client.listWorkflows({ locationId, parentId, limit: 200 });
    for (const w of (r.rows || [])) {
      const id = w._id || w.id;
      if (w.type === 'directory' || w.type === 'folder') { await walk(id); continue; }
      if (seen.has(id)) continue;
      seen.add(id);
      const plan = PLAN[w.name];
      if (!plan) continue;

      const { workflow, templates } = await load(client, locationId, id);
      writeFileSync(`${BACKUP}/${slug}-${w.name.replace(/[^a-z0-9]+/gi, '-')}.json`,
                    JSON.stringify({ workflow, templates }, null, 1));

      const steps = templates.filter((s) => s.type === 'email');
      let n = 0;
      steps.forEach((s, i) => {
        const key = plan.byName ? plan.byName[s.name] : plan.byOrder[i];
        if (!key) { console.log(`     · left alone: ${w.name} / ${s.name}`); skipped++; return; }
        const newId = tpl[key];
        const e = bySubject[key];
        if (!newId || !e) { console.log(`     ! no template for ${key}`); skipped++; return; }
        s.attributes = { ...s.attributes, subject: e.subject,
                         template_id: newId, templatesource: 'email-builder' };
        n++;
      });

      console.log(`  ${w.name.padEnd(34)} ${w.status.padEnd(10)} ${n}/${steps.length} steps repointed`);
      changed += n;
      if (DRY) continue;
      /* One workflow per save, and a failure in one must not strand the rest.
         GHL validates the WHOLE document on write, so a pre-existing dangling
         reference elsewhere in the workflow (a deleted pipeline stage, say)
         blocks a save that has nothing to do with it. Those are reported and
         skipped rather than aborting the run. */
      try {
        const res = await save(client, locationId, id, workflow, templates, { status: workflow.status });
        if (res.status !== 200 && res.status !== 201) throw new Error(JSON.stringify(res));
        saved += n;
      } catch (err) {
        const m = String(err.message);
        const why = /ASSET_PIPELINE_STAGE_NOT_FOUND/.test(m) ? 'references a pipeline stage that no longer exists'
                  : m.slice(0, 120);
        failures.push(`${studio.name} / ${w.name}: ${why}`);
        console.log(`     ! NOT SAVED — ${why}`);
        changed -= n;
      }
    }
  };
  await walk('root');
}
console.log(DRY ? `\nDRY RUN — ${changed} steps would change, ${skipped} left alone`
                : `\n${saved} steps repointed and saved, ${skipped} left alone`);
if (failures.length) {
  console.log('\nworkflows that could not be saved:');
  for (const f of failures) console.log('  ' + f);
}
