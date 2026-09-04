/* Build "Website Enquiry — <Studio>" in each Blueprint sub-account.

   Every step shape here was copied from a real node in these same accounts
   (Application, Feedback, Coming Soon 2024, Speak With Us Call Booked) rather
   than guessed — the server validates step structure and rejects what it does
   not recognise. The trigger shape is copied verbatim from the "New Lead Test"
   workflow the client built by hand in Leytonstone.

   Everything is created as DRAFT. Drafts do not run, so nothing reaches a real
   contact until a human publishes.

   node /tmp/build-wf.mjs --dry     preview
   node /tmp/build-wf.mjs           write
*/
import { randomUUID } from 'node:crypto';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';

const DRY = process.argv.includes('--dry');
const { client } = makeClient();

const STUDIOS = [
  { name: 'South Woodford', slug: 'south-woodford', loc: 'cquQsieyBZx9vRgEqBge',
    pipeline: 'pvnaXstksEawcEjD9z7u', stage: '7561e524-53d5-4378-aa61-88c5ed2049ff',
    coach: 'Stu', email: 'southwoodford@blueprintfitnessldn.com', signup: 'signup-southwoodford' },
  { name: 'Leytonstone', slug: 'leytonstone', loc: 'mztjJyXHNWiEotc8ItXP',
    pipeline: 'UCAsptFiVTdp3Qcs6LP0', stage: '8052f761-ef15-40dd-b8f7-1031d137cf6c',
    coach: 'Stu', email: 'leytonstone@blueprintfitnessldn.com', signup: 'signup-leytonstone' },
  { name: 'Hackney', slug: 'hackney', loc: '147m777NnBtnn7yLrsdb',
    pipeline: '13rhyJsN1VUAyEnx7qiJ', stage: '06899730-4c40-40ed-82d3-97ba0de6783d',
    coach: 'Nick', email: 'hackney@blueprintfitnessldn.com', signup: 'signup-hackney' },
];

const SITE = 'https://blueprintfitnessldn.com';
const msg = (s) =>
  `Hello {{contact.first_name}}, thanks for registering your interest in our 30 Day Kickstart!\n\n` +
  `Just to check, are you local to ${s.name}?\n\n${s.coach}`;

/* Branded HTML, inline — the email step takes html directly (as the account's
   own "Feedback" workflow does), so no template-library entry is needed. */
const html = (s) => `
<div style="margin:0;padding:0;background:#EAF1FB;font-family:Inter,Helvetica,Arial,sans-serif">
 <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EAF1FB;padding:24px 12px">
  <tr><td align="center">
   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden">
    <tr><td style="background:#101B2F;padding:22px 28px">
      <img src="${SITE}/img/logo-horizontal-blue.png" alt="Blueprint Fitness" width="190" style="display:block;border:0;max-width:190px">
    </td></tr>
    <tr><td style="padding:30px 28px 10px">
      <p style="margin:0 0 6px;color:#0072F5;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase">The 30-Day Kickstart</p>
      <h1 style="margin:0 0 16px;color:#101B2F;font-size:26px;line-height:1.2">Hello {{contact.first_name}}, thanks for getting in touch!</h1>
      <p style="margin:0 0 14px;color:#3D4A63;font-size:16px;line-height:1.6">Thanks for registering your interest in our 30 Day Kickstart at <strong>Blueprint Fitness ${s.name}</strong>.</p>
      <p style="margin:0 0 20px;color:#3D4A63;font-size:16px;line-height:1.6">Just to check &mdash; <strong>are you local to ${s.name}?</strong> Reply to this email or drop us a message and we&rsquo;ll get your first session booked in.</p>
      <p style="margin:0 0 26px">
        <a href="${SITE}/${s.signup}/" style="display:inline-block;background:#0072F5;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 26px;border-radius:8px">Start your 30 days</a>
      </p>
      <p style="margin:0 0 4px;color:#3D4A63;font-size:16px;line-height:1.6">Speak soon,</p>
      <p style="margin:0 0 24px;color:#101B2F;font-size:16px;font-weight:700">${s.coach} &mdash; Blueprint Fitness ${s.name}</p>
    </td></tr>
    <tr><td style="background:#EAF1FB;padding:16px 28px">
      <p style="margin:0;color:#3D4A63;font-size:13px;line-height:1.5">Blueprint Fitness ${s.name} &middot; <a href="mailto:${s.email}" style="color:#0072F5">${s.email}</a></p>
    </td></tr>
   </table>
  </td></tr>
 </table>
</div>`.trim();

const notifyHtml = (s) => `
<p style="margin:0;font-family:verdana,geneva,sans-serif;font-size:16px">
<strong>New website enquiry &mdash; ${s.name}</strong><br><br>
Name: {{contact.name}}<br>
Phone: {{contact.phone}}<br>
Email: {{contact.email}}<br><br>
Came in from the Blueprint Fitness website.
</p>`.trim();

function steps(s, fromName, fromEmail) {
  const mk = (type, name, attributes) => ({ id: randomUUID(), type, name, attributes });
  const opp = mk('create_opportunity', 'Create Or Update Opportunity', {
    fields: [], type: 'create_opportunity',
    pipeline_id: s.pipeline, pipeline_stage_id: s.stage,
    opportunity_name: 'WEBSITE ENQUIRY: {{contact.name}}',
    allow_backward: true, opportunity_status: 'open', opportunity_source: '', monetary_value: '',
  });
  const mail = mk('email', 'Confirmation email', {
    from_name: fromName, from_email: fromEmail,
    subject: 'Thanks {{contact.first_name}} — one quick question',
    html: html(s), attachments: [],
  });
  const sms = mk('sms', 'Confirmation SMS', { body: msg(s), attachments: [] });
  const notify = mk('internal_notification', 'Notify the studio', {
    type: 'email',
    email: {
      from_email: fromEmail, from_name: fromName, userType: 'custom_email',
      subject: `New website enquiry (${s.name}): {{contact.name}}`,
      html: notifyHtml(s), attachments: [], to: '{{location.email}}',
    },
  });
  const chain = [opp, mail, sms, notify];
  chain.forEach((st, i) => {
    st.order = i;
    if (i > 0) { st.parentKey = chain[i - 1].id; chain[i - 1].next = st.id; }
  });
  return chain;
}

const trigger = (s, workflowId, formId) => ({
  type: 'external_tracking',
  masterType: 'internal',
  name: 'External Tracking Event',
  workflowsTriggerType: 'INTERNAL',
  active: false,
  conditions: [
    { operator: 'is-any-of', field: 'eventType', value: ['form'], title: 'Event', type: 'multiselect', id: 'eventType' },
    { operator: '==', field: 'formIdentifier', value: formId, title: 'External Form', type: 'select', id: 'formIdentifier' },
  ],
  actions: [{ workflow_id: workflowId, type: 'add_to_workflow' }],
});

for (const s of STUDIOS) {
  console.log(`\n=== ${s.name} ===`);
  /* reuse the from-address of an existing customer-facing email in this account
     rather than inventing one that may not be verified for sending */
  let fromName = `Blueprint Fitness ${s.name}`, fromEmail = s.email;
  try {
    const list = await client.listWorkflows({ locationId: s.loc, limit: 60 });
    const ref = (list?.rows || []).find((w) => /Feedback|Nutrition Consult/i.test(w.name));
    if (ref) {
      const { templates } = await load(client, s.loc, ref.id || ref._id);
      const e = (templates || []).find((t) => t.type === 'email' && t.attributes?.from_email);
      if (e) { fromName = e.attributes.from_name; fromEmail = e.attributes.from_email;
        console.log(`  from-address reused from "${ref.name}": ${fromName} <${fromEmail}>`); }
    }
  } catch (e) { console.log('  (could not read a reference from-address:', String(e.message).slice(0, 70), ')'); }

  if (DRY) {
    const chain = steps(s, fromName, fromEmail);
    console.log('  would create draft "Website Enquiry — ' + s.name + '"');
    console.log('  trigger  formIdentifier =', `website-enquiry-${s.slug}`);
    console.log('  steps    ' + chain.map((c) => `${c.order}:${c.type}`).join(' -> '));
    console.log('  pipeline ' + s.pipeline + ' stage ' + s.stage);
    console.log('  sms body ' + JSON.stringify(msg(s)).slice(0, 90) + '…');
    continue;
  }

  const created = await client.createWorkflow({ name: `Website Enquiry — ${s.name}`, locationId: s.loc, status: 'draft' });
  const wid = created?.id || created?._id;
  console.log('  created', wid);
  await client.addTrigger(wid, trigger(s, wid, `website-enquiry-${s.slug}`), { locationId: s.loc });
  console.log('  trigger added');
  const { workflow } = await load(client, s.loc, wid);
  const res = await save(client, s.loc, wid, workflow, steps(s, fromName, fromEmail), { status: 'draft' });
  console.log('  saved:', JSON.stringify(res));
}
console.log(DRY ? '\nDRY RUN — nothing written' : '\nDone. All three are DRAFT.');
