/* Swap the email step's HTML in the three Website Enquiry drafts for the
   on-brand template. Loads each workflow, replaces only the email step's
   subject + html, saves. Everything stays draft. */
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';
import { brandedEmail, SUBJECT } from '/tmp/email-tpl.mjs';
const { client } = makeClient();

const S = [
 { name:'South Woodford', slug:'south-woodford', loc:'cquQsieyBZx9vRgEqBge', wf:'8a7994f4-ad5a-4584-bee8-93c33f861d88',
   coach:'Stu', email:'southwoodford@blueprintfitnessldn.com', signup:'signup-southwoodford', whatsapp:'447538298457',
   address:'4 Raven Road, South Woodford, London', postcode:'E18 1HB', hours:'Open 6am–9pm, every day — 100+ sessions a week' },
 { name:'Leytonstone', slug:'leytonstone', loc:'mztjJyXHNWiEotc8ItXP', wf:'ecbfd43b-e712-4f59-8629-42e2fc335677',
   coach:'Stu', email:'leytonstone@blueprintfitnessldn.com', signup:'signup-leytonstone', whatsapp:'447947790035',
   address:'Unit 3, Hitchcock Business Centre, Leytonstone High Road, London', postcode:'E11 4RE', hours:'Open early ’til late, 7 days a week' },
 { name:'Hackney', slug:'hackney', loc:'147m777NnBtnn7yLrsdb', wf:'5377f08d-c78b-4075-82cf-78a19b021888',
   coach:'Nick', email:'hackney@blueprintfitnessldn.com', signup:'signup-hackney', whatsapp:'447944690356',
   address:'Arch 195, Morning Lane, Hackney Central, London', postcode:'E9 6LJ', hours:'Mon–Fri 6am–9pm · Sat–Sun 8am–4pm' },
];

for (const s of S) {
  const { workflow, templates } = await load(client, s.loc, s.wf);
  const mail = templates.find(t => t.type === 'email');
  if (!mail) { console.log(`${s.name}: no email step`); continue; }
  mail.attributes.subject = SUBJECT;
  mail.attributes.html = brandedEmail(s);
  const res = await save(client, s.loc, s.wf, workflow, templates, { status: 'draft' });
  console.log(`${s.name.padEnd(15)} html ${String(mail.attributes.html.length).padStart(5)} chars  ->`, JSON.stringify(res));
}
