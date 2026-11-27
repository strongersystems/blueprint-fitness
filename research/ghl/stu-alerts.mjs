/**
 * South Woodford and Leytonstone team alerts reach Stu (27 Nov 2026). Stu: "Nikki not come through". Google accepted
 * the alert into southwoodford@, but it was sent FROM southwoodford@ TO southwoodford@, and Gmail tends to keep mail
 * "from yourself" out of the inbox; the alerts he does see (sign-ups) come from another sender. So every lead / call
 * booked / website message / check-in alert in these studios:
 *   - is sent from "Blueprint Fitness alerts <alerts@blueprintfitnessldn.com>" (on the authenticated domain), not the inbox it goes to
 *   - also goes to Stu's own email (srook1980@gmail.com, his GHL user email, already on the nutrition alerts)
 * Hackney's alerts get the same sender (not Stu). Backs each workflow up first. Re-runnable.   node research/ghl/stu-alerts.mjs [--dry]
 */
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save, backup } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';
const DRY = process.argv.includes('--dry');
const STU = 'srook1980@gmail.com', FROM = 'alerts@blueprintfitnessldn.com';
const STUDIOS = {
  'south-woodford': { loc: 'cquQsieyBZx9vRgEqBge', inbox: 'southwoodford@blueprintfitnessldn.com', wfs: ['bb017723-71d6-4c68-b533-af5d45b1fd68', 'ccb6548c-9198-43cd-8c24-c82e02a129f5', 'b7a30319-3b35-43cc-a9bd-143342ca4c7e', 'fd6dcf8f-c247-4cc3-9d68-d8dae3196a8c', '84b7edd9-9e35-4f65-9c12-263dea5515c4'] },
  // Hackney: the sender only (its alerts are Nick's, not Stu's); same "from itself to itself" pattern.
  hackney: { loc: '147m777NnBtnn7yLrsdb', inbox: 'hackney@blueprintfitnessldn.com', noStu: true, wfs: ['abf8697b-64c1-4a28-ad42-bb8d9d31698b', '44b84bf6-e208-4234-9715-e5e096b1e5bc', 'bbc8cd45-fde4-412e-8e67-024dfd4fb364', 'f97c0c1b-c342-49b2-9ca0-47dc4da0d853', 'aaa6850b-c6a4-4352-9974-c462abb12188'] },
  leytonstone: { loc: 'mztjJyXHNWiEotc8ItXP', inbox: 'leytonstone@blueprintfitnessldn.com', wfs: ['daa1ec1c-97e2-4989-8482-78584aba3126', '9de00aaf-a03f-4e49-9682-dc6b08c61f98', '90fbd9c4-e73b-4c64-8644-c436520700cd', '87504919-6a57-4e91-b4a4-f1f081abdcba', 'cbe1e6c6-bc32-48c7-8e16-2414afa633a6'] },
};
const { client } = makeClient();
for (const [sk, S] of Object.entries(STUDIOS)) for (const wf of S.wfs) {
  const { workflow, templates } = await load(client, S.loc, wf);
  let n = 0;
  for (const t of templates) {
    const em = t.type === 'internal_notification' && t.attributes.type === 'email' && t.attributes.email;
    if (!em || em.userType !== 'custom_email') continue;
    const to = (em.to || '').split(',').map((x) => x.trim()).filter(Boolean);
    if (!to.some((x) => x === S.inbox || x === '{{location.email}}')) continue;
    const before = `${em.from_email || '(default)'} -> ${em.to}`;
    if (!S.noStu && !to.includes(STU)) to.push(STU);
    em.to = to.join(',');
    em.from_email = FROM; em.from_name = em.from_name && !/^Blueprint Fitness (South Woodford|Leytonstone|Hackney)$/.test(em.from_name) ? em.from_name : `Blueprint Fitness ${{ 'south-woodford': 'South Woodford', leytonstone: 'Leytonstone', hackney: 'Hackney' }[sk]} alerts`;
    console.log(`${sk} | ${workflow.name} | "${t.name}": ${before}  =>  ${em.from_email} -> ${em.to}`);
    n++;
  }
  if (DRY || !n) continue;
  await backup(client, S.loc, wf, `stu-alerts-${sk}`);
  const r = await save(client, S.loc, wf, workflow, templates, { status: workflow.status });
  console.log('   saved ->', r.workflowStatus || JSON.stringify(r).slice(0, 80));
}
