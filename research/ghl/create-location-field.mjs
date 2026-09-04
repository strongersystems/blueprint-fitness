import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
const { client } = makeClient();
/* remove the probe from the throwaway account */
const test = process.env.GHL_TEST_LOCATION_ID;
const d = await client.rawRequest({ method:'DELETE', path:`/locations/${test}/customFields/FmGzlnggSjmZcmPPCzxb` });
console.log('probe field deleted:', d.status);

/* create Location where it is missing, matching South Woodford's field exactly */
for (const [name, loc] of [['Leytonstone','mztjJyXHNWiEotc8ItXP'],['Hackney','147m777NnBtnn7yLrsdb']]) {
  const cur = await client.getCustomFields({locationId: loc});
  const has = (cur?.customFields||[]).find(f=>/^location$/i.test(f.name));
  if (has) { console.log(`${name}: already has Location [${has.id||has._id}]`); continue; }
  const r = await client.rawRequest({ method:'POST', path:`/locations/${loc}/customFields`,
    body:{ name:'Location', dataType:'TEXT', model:'contact' } });
  const f = r.data?.customField;
  console.log(`${name}: HTTP ${r.status} -> id=${f?.id} fieldKey=${f?.fieldKey} dataType=${f?.dataType}`);
}
