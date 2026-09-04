import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
import { load } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/workflow.mjs';
const { client } = makeClient();
const S=[['South Woodford','cquQsieyBZx9vRgEqBge','8a7994f4-ad5a-4584-bee8-93c33f861d88'],
         ['Leytonstone','mztjJyXHNWiEotc8ItXP','ecbfd43b-e712-4f59-8629-42e2fc335677'],
         ['Hackney','147m777NnBtnn7yLrsdb','5377f08d-c78b-4075-82cf-78a19b021888']];
for (const [name,loc,wf] of S){
  const { workflow, templates } = await load(client, loc, wf);
  const tr = await client.getTriggers(wf, { locationId: loc });
  const t = (Array.isArray(tr)?tr:[])[0];
  const form = t?.conditions?.find(c=>c.field==='formIdentifier')?.value;
  const opp = templates.find(x=>x.type==='create_opportunity')?.attributes;
  console.log(`${name.padEnd(15)} status=${workflow.status}  trigger=${t?.type}  form=${form}`);
  console.log(`                steps: ${templates.map(x=>x.type).join(' -> ')}`);
  console.log(`                pipeline=${opp?.pipeline_id} stage=${opp?.pipeline_stage_id}`);
}
