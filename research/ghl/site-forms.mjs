/**
 * The main site's two other forms, connected to the studio that was picked (audit, 25 Nov 2026).
 *
 * Until now nothing in GHL listened for either form: the contact page (website-contact-all-sites) and the members'
 * check-in (members-check-in-all-sites) made a contact and told no one, though both pages promise a reply. Both pages
 * load all three studios' External Tracking, so a submission lands in every studio's GHL; this builds, in each studio,
 *
 *   "Website: Contact form (Nov 2026)"    trigger: External Tracking form website-contact-all-sites
 *   "Members: Check-in form (Nov 2026)"   trigger: External Tracking form members-check-in-all-sites
 *
 * Each one goes on only when Location is that studio (the form's studio box fills the Location field), then emails
 * the studio with the name, email, phone and message, tags the contact, and emails them a short "we've got it" from
 * the studio (copy checked by the copy-lint guard before anything is saved). "Not sure yet" on the contact form goes
 * to South Woodford. The message lands in a "Message" contact field (key contact.message), made here if missing.
 *
 *   node research/ghl/site-forms.mjs --dry       # print the plan
 *   node research/ghl/site-forms.mjs             # build (or rebuild in place) and publish
 */
import { randomUUID as uuid } from 'node:crypto';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';
import { assertCleanCopy } from '/home/user/stronger-web-1/client-sites/_shared/copy-lint/guard.mjs';

const DRY = process.argv.includes('--dry');
const STUDIOS = {
  'south-woodford': { loc: 'cquQsieyBZx9vRgEqBge', name: 'South Woodford', email: 'southwoodford@blueprintfitnessldn.com', also: ['Not sure yet'] },
  leytonstone: { loc: 'mztjJyXHNWiEotc8ItXP', name: 'Leytonstone', email: 'leytonstone@blueprintfitnessldn.com', also: [] },
  hackney: { loc: '147m777NnBtnn7yLrsdb', name: 'Hackney', email: 'hackney@blueprintfitnessldn.com', also: [] },
};
const FORMS = [
  { form: 'website-contact-all-sites', name: 'Website: Contact form (Nov 2026)', tag: 'website contact form', alsoNotSure: true,
    subject: (s) => `WEBSITE MESSAGE (${s.name}): {{contact.name}}`,
    intro: 'Someone has sent a message through the contact page on blueprintfitnessldn.com. They have been told we&rsquo;ll be in touch soon.',
    reply: { subject: 'Thanks for your message, {{contact.first_name}}',
      paras: ['Hi {{contact.first_name}},',
        'Thanks for getting in touch with Blueprint Fitness. We&rsquo;ve got your message and one of the team will get back to you personally very soon.',
        'If anything else comes to mind in the meantime, just reply to this email.'] } },
  { form: 'members-check-in-all-sites', name: 'Members: Check-in form (Nov 2026)', tag: 'member check-in', alsoNotSure: false,
    subject: (s) => `MEMBER CHECK-IN (${s.name}): {{contact.name}}`,
    intro: 'A member has checked in through the members&rsquo; area on blueprintfitnessldn.com. The page tells them a coach reads every check-in and comes back to them personally.',
    reply: { subject: 'Thanks for checking in, {{contact.first_name}}',
      paras: ['Hi {{contact.first_name}},',
        'Thanks for checking in. A coach will read it and come back to you personally very soon.',
        'See you at the studio soon.'] } },
];

const { client } = makeClient();

async function field(loc, name, dataType) {
  const r = await client.rawRequest({ method: 'GET', path: `/locations/${loc}/customFields`, query: { model: 'contact' } });
  const have = (r.data?.customFields || []).find((f) => f.name === name);
  if (have) return have;
  if (DRY) return { id: `(new ${name})`, fieldKey: '(new)' };
  const c = await client.rawRequest({ method: 'POST', path: `/locations/${loc}/customFields`, body: { name, dataType, model: 'contact' } });
  const f = c.data?.customField || c.data;
  if (!f?.id) throw new Error(`could not create "${name}": ${JSON.stringify(c.data).slice(0, 200)}`);
  console.log(`  field created: ${name} ${f.id} ${f.fieldKey}`);
  return f;
}

// A test contact (an @example.com email, or tagged "stronger test", as in the lead workflows) is tagged and stops,
// so a live check emails no one.
function steps(S, F, locationField, values) {
  const gate = uuid(), test = uuid(), yes = uuid(), no = uuid(), testTag = uuid(), notify = uuid(), tag = uuid(), reply = uuid();
  const base = { ifElseNodeId: '', isWait: false };
  const cond = (v) => ({ conditionType: 'contact_detail', conditionSubType: locationField, conditionOperator: '==', conditionValue: v, __conditionId: uuid(), ...base });
  const testConds = [
    { conditionType: 'contact_detail', conditionSubType: 'email', conditionOperator: 'contain', conditionValue: '@example.com', __customFieldType__: 'standard', __conditionId: uuid(), ...base },
    { conditionType: 'contact_detail', conditionSubType: 'tags', conditionOperator: 'index-of-true', conditionValue: ['stronger test'], __conditionId: uuid(), ...base },
  ];
  const branch = (id, name, conditions) => ({ id, name, operator: 'and', showErrors: false, branchNameError: 'Branch name cannot be empty!',
    segments: [{ __segmentId: uuid(), operator: 'or', conditions }] });
  const html = `<p style="margin:0;font-family:verdana,geneva,sans-serif;font-size:16px">${F.intro}<br><br>
Name: {{contact.name}}<br>
Email: {{contact.email}}<br>
Phone: {{contact.phone}}<br>
Studio: {{contact.location}}<br><br>
Their message:<br>{{contact.message}}<br><br>
Reply to them from the contact in GHL.</p>`;
  const arm = (id, name, sib, extra) => ({ id, parent: gate, order: 1, name, type: 'if_else', cat: 'conditions', sibling: sib, parentKey: gate, ...extra });
  return [
    { id: gate, order: 0, name: `Test contact, or for ${S.name}?`, type: 'if_else', cat: 'conditions', next: [test, yes, no], nodeType: 'condition-node',
      attributes: { currentRecipeType: 'CUSTOM', operator: 'and', if: true, conditionName: 'Condition', version: 2, noneBranchName: 'None',
        branches: [branch(test, 'Test: stop here', testConds), branch(yes, `For ${S.name}`, values.map(cond))] } },
    arm(test, 'Test: stop here', [yes, no], { nodeType: 'branch-yes', attributes: { if: false, conditionName: 'Condition', operator: 'and', branches: [] }, next: testTag }),
    arm(yes, `For ${S.name}`, [test, no], { nodeType: 'branch-yes', attributes: { if: false, conditionName: 'Condition', operator: 'and', branches: [] }, next: notify }),
    arm(no, 'None', [test, yes], { nodeType: 'branch-no', attributes: { else: true } }),
    { id: testTag, order: 2, parentKey: test, type: 'add_contact_tag', name: 'Tag - test', attributes: { tags: [`test: ${F.tag} ran`] } },
    { id: notify, order: 2, parentKey: yes, next: tag, type: 'internal_notification', name: 'Email the studio',
      attributes: { type: 'email', email: { from_email: S.email, from_name: `Blueprint Fitness ${S.name}`, userType: 'custom_email',
        subject: F.subject(S), html, attachments: [], to: S.email } } },
    { id: tag, order: 3, parentKey: notify, next: reply, type: 'add_contact_tag', name: `Tag: ${F.tag}`, attributes: { tags: [F.tag] } },
    { id: reply, order: 4, parentKey: tag, type: 'email', name: 'Email them: we have got it',
      attributes: { from_name: `Blueprint Fitness ${S.name}`, from_email: S.email, subject: F.reply.subject, attachments: [],
        html: F.reply.paras.concat([`The Blueprint Fitness ${S.name} team`]).map((x) => `<p style="margin:0 0 14px;font-family:verdana,geneva,sans-serif;font-size:16px">${x}</p>`).join('') } },
  ];
}

const plain = (h) => h.replace(/&rsquo;/g, '\u2019').replace(/\{\{contact\.first_name\}\}/g, 'Sam');
assertCleanCopy(FORMS.flatMap((F) => [{ text: plain(F.reply.subject), role: 'heading', where: `${F.form} subject` },
  ...F.reply.paras.map((x, i) => ({ text: plain(x), role: 'email', where: `${F.form} para ${i}` }))]), { label: 'site form replies' });

for (const [sk, S] of Object.entries(STUDIOS)) {
  console.log(`\n=== ${sk}`);
  const location = await field(S.loc, 'Location', 'TEXT');
  const message = await field(S.loc, 'Message', 'LARGE_TEXT');
  if (!DRY && message.fieldKey && message.fieldKey !== 'contact.message') throw new Error(`Message field key is ${message.fieldKey}, not contact.message`);
  const rows = (await client.rawRequest({ method: 'GET', path: `/workflow/${S.loc}/list`, query: { parentId: 'root', limit: 200, offset: 0, sortBy: 'name', sortOrder: 'asc' } })).data.rows || [];
  for (const F of FORMS) {
    const values = [S.name, ...(F.alsoNotSure ? S.also : [])];
    const T = steps(S, F, location.id, values);
    console.log(`  ${F.name}: when Location is ${values.map((v) => `"${v}"`).join(' or ')} -> email ${S.email}, tag "${F.tag}"`);
    if (DRY) continue;
    let wf = rows.find((w) => w.type === 'workflow' && w.name === F.name);
    if (!wf) {
      wf = await client.createWorkflow({ name: F.name, status: 'draft', locationId: S.loc, timezone: 'account', allowMultiple: true });
      console.log('    created', wf.id || wf._id);
    }
    const id = wf.id || wf._id;
    const { workflow } = await load(client, S.loc, id);
    const r = await save(client, S.loc, id, { ...workflow, allowMultiple: true }, T, { status: 'published' });
    console.log('    saved ->', r.workflowStatus || JSON.stringify(r).slice(0, 120));
    const have = (await client.rawRequest({ method: 'GET', path: `/workflow/${S.loc}/trigger`, query: { workflowId: id } })).data || [];
    if (!have.some((t) => (t.conditions || []).some((c) => c.field === 'formIdentifier' && c.value === F.form))) {
      const t = await client.addTrigger(id, { type: 'external_tracking', masterType: 'internal', name: `Website form: ${F.form}`, status: 'published',
        conditions: [{ operator: 'is-any-of', field: 'eventType', value: ['form'], title: 'Event', type: 'multiselect', id: 'eventType' },
          { operator: '==', field: 'formIdentifier', value: F.form, title: 'External Form', type: 'select', id: 'formIdentifier' }] }, { locationId: S.loc });
      console.log('    trigger', F.form, '->', t?.id || JSON.stringify(t).slice(0, 120));
    }
  }
}
