/**
 * Opportunity values = the studio's Kickstart price (26 Nov 2026), in "1. Signed Up - 30 Day Trial" (the won
 * opportunity) and in the two lead workflows (the open one): "New Lead - Website (Ads Nov 2026)" and
 * "New Lead - Main Website (Nov 2026)". Edited in place (same step ids), so leads part-way through stay where they are.
 * They were the wrong way round (South Woodford and Leytonstone £129, Hackney £149). Prices: app/src/data/studios.ts
 * kickstartPrice; change them together. Backs each workflow up first (ghl-internal-mcp/nurture/backups).
 *
 *   node research/ghl/signup-opportunity-values.mjs [--dry]
 */
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load, save, backup } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';

const DRY = process.argv.includes('--dry');
const STUDIOS = {
  'south-woodford': { loc: 'cquQsieyBZx9vRgEqBge', price: '149',
    wfs: ['707c1c9f-b0e4-405f-94f3-8b86c68b0932', 'bb017723-71d6-4c68-b533-af5d45b1fd68', 'ccb6548c-9198-43cd-8c24-c82e02a129f5'] },
  leytonstone: { loc: 'mztjJyXHNWiEotc8ItXP', price: '149',
    wfs: ['e6cf59b0-4509-4922-bca5-b8b807b80194', 'daa1ec1c-97e2-4989-8482-78584aba3126', '9de00aaf-a03f-4e49-9682-dc6b08c61f98'] },
  hackney: { loc: '147m777NnBtnn7yLrsdb', price: '129',  // founders price
    wfs: ['7ace7376-0cd5-4137-ba37-62f7755860e0', 'abf8697b-64c1-4a28-ad42-bb8d9d31698b', '44b84bf6-e208-4234-9715-e5e096b1e5bc'] },
};
const { client } = makeClient();
for (const [sk, S] of Object.entries(STUDIOS)) for (const wf of S.wfs) {
  const { workflow, templates } = await load(client, S.loc, wf);
  const opp = templates.filter((t) => t.type === 'create_opportunity' && t.attributes.monetary_value);
  for (const t of opp) console.log(sk, workflow.name, `"${t.name}"`, t.attributes.monetary_value, '->', S.price);
  if (DRY || opp.every((t) => t.attributes.monetary_value === S.price)) continue;
  await backup(client, S.loc, wf, `opportunity-${sk}`);
  for (const t of opp) t.attributes.monetary_value = S.price;
  const r = await save(client, S.loc, wf, workflow, templates, { status: workflow.status });
  console.log('  saved ->', r.workflowStatus || JSON.stringify(r).slice(0, 100));
}
