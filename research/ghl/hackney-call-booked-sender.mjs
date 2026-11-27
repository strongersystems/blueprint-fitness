/**
 * Hackney's "Speak With Us Call Booked" emailed the studio from a blank sender, which GHL filled with a yahoo.com
 * address; Mailgun's receiving side refuses it (5.7.26, DMARC), so hackney@ never got "CALL BOOKED" (26-27 Nov 2026:
 * Javon Taffe, Nyla Davison). Send it from the studio's own address, on the authenticated domain.
 *   node research/ghl/hackney-call-booked-sender.mjs [--dry]
 */
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save, backup } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';
const DRY = process.argv.includes('--dry');
const LOC = '147m777NnBtnn7yLrsdb', WF = 'aaa6850b-c6a4-4352-9974-c462abb12188';
const { client } = makeClient();
const { workflow, templates } = await load(client, LOC, WF);
const steps = templates.filter((t) => t.type === 'internal_notification' && t.attributes.type === 'email' && !t.attributes.email.from_email);
for (const t of steps) console.log(`"${t.name}": from "${t.attributes.email.from_email}" -> hackney@blueprintfitnessldn.com`);
if (DRY || !steps.length) process.exit(0);
await backup(client, LOC, WF, 'hackney-call-booked');
for (const t of steps) Object.assign(t.attributes.email, { from_email: 'hackney@blueprintfitnessldn.com', from_name: 'Blueprint Fitness Hackney' });
const r = await save(client, LOC, WF, workflow, templates, { status: workflow.status });
console.log('saved ->', r.workflowStatus || JSON.stringify(r).slice(0, 100));
