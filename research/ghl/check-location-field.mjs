import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
const { client } = makeClient();
const S=[['South Woodford','cquQsieyBZx9vRgEqBge'],['Leytonstone','mztjJyXHNWiEotc8ItXP'],['Hackney','147m777NnBtnn7yLrsdb']];
for (const [name,loc] of S){
  const r = await client.searchContacts({locationId: loc, query:'claude-test-locfield', limit:3});
  const rows = r?.contacts || r?.rows || [];
  if(!rows.length){ console.log(`${name.padEnd(15)} no contact yet`); continue; }
  const c = await client.getContact(rows[0].id, {locationId: loc});
  const ct = c?.contact || c;
  const cfs = ct.customField || ct.customFields || [];
  const all = await client.getCustomFields({locationId: loc});
  const defs = new Map((all?.customFields||[]).map(f=>[f.id||f._id, f.name]));
  console.log(`${name.padEnd(15)} ${JSON.stringify(cfs.map(f=>({field: defs.get(f.id)||f.id, value:f.value})))}`);
}
