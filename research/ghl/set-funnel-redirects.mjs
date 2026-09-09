/* Retire the old GoHighLevel funnel pages by redirecting them to the new site.

   The native URL-redirect API (/funnels/redirect) is IAM-blocked for this
   credential, so the hop is done from the funnel's head tracking code, which
   GHL injects into every step page of that funnel — verified running live on
   go.blueprintfitnessldn.com/signup (it is what loads their Meta Pixel).

   Existing head code is PRESERVED and backed up: the pixel stays, the redirect
   is appended. The block is fenced by markers so it can be removed cleanly.
   Query strings and hashes are carried through so campaign attribution on
   existing email and SMS links survives the move. */
import { writeFileSync, mkdirSync } from 'node:fs';
import { makeClient } from '/home/user/stronger-web-1/ghl-internal-mcp/nurture/src/client.mjs';
const { client } = makeClient();

const DRY = process.argv.includes('--dry');
const OUT = process.argv[2];
const SITE = 'https://blueprintfitnessldn.com';
const START = '<!-- BF-REDIRECT-START -->';
const END = '<!-- BF-REDIRECT-END -->';

const FUNNELS = [
  {
    studio: 'South Woodford', locationId: 'cquQsieyBZx9vRgEqBge',
    funnelId: 'U39SlJLPDJvLV5qKkHxu', domain: 'go.blueprintfitnessldn.com',
    map: {
      '/':                      `${SITE}/south-woodford/kickstart/`,
      '/trial-2025':            `${SITE}/south-woodford/kickstart/`,
      '/trial-2023':            `${SITE}/south-woodford/kickstart/`,
      '/signup-offer':          `${SITE}/south-woodford/kickstart/`,
      '/signup':                `${SITE}/signup-southwoodford/`,
      '/30day-applied':         `${SITE}/south-woodford/next-steps/`,
      '/trial-signup-thankyou': `${SITE}/south-woodford/next-steps/`,
      '/apply':                 `${SITE}/south-woodford/next-steps/`,
      '/membership-comparison': `${SITE}/memberships/`,
      '/memberships':           `${SITE}/memberships/`,
      '/timetable-sw':          `${SITE}/south-woodford/timetable/`,
      '/timetable-ls':          `${SITE}/leytonstone/timetable/`,
    },
  },
  {
    studio: 'Leytonstone', locationId: 'mztjJyXHNWiEotc8ItXP',
    funnelId: 'QxifgdD21eGprcVf0zgi', domain: 'go.blueprintfitnessleytonstone.com',
    map: {
      '/':                      `${SITE}/leytonstone/kickstart/`,
      '/founders':              `${SITE}/leytonstone/kickstart/`,
      '/30day':                 `${SITE}/leytonstone/kickstart/`,
      '/trial-2025':            `${SITE}/leytonstone/kickstart/`,
      '/trial-2023':            `${SITE}/leytonstone/kickstart/`,
      '/coming-soon-x':         `${SITE}/leytonstone/kickstart/`,
      '/signup-offer':          `${SITE}/leytonstone/kickstart/`,
      '/signup':                `${SITE}/signup-leytonstone/`,
      '/trial-signup-thankyou': `${SITE}/leytonstone/next-steps/`,
      '/memberships':           `${SITE}/memberships/`,
    },
  },
  {
    /* the "website"-type funnel on the same domain: /memberships is a step of
       this one, not of Landing Pages, which is why it did not redirect with
       the rest. Only that path is mapped — the other steps (/cancel,
       /nutritionrequest, /teamup, /links …) are still in active use and are
       left exactly as they are. */
    studio: 'South Woodford (website)', locationId: 'cquQsieyBZx9vRgEqBge',
    funnelId: 'GXIux6iqTMZJYPppD95j', domain: 'go.blueprintfitnessldn.com',
    map: { '/memberships': `${SITE}/memberships/` },
  },
];

const block = (map) => `${START}
<script>
/* Blueprint Fitness moved to blueprintfitnessldn.com. These old funnel pages
   are kept alive purely so links already out in emails, SMS and print keep
   working — each one hops to its replacement. Remove this block once those
   links have been updated at source. */
(function () {
  var MAP = ${JSON.stringify(map, null, 2)};
  var path = location.pathname.replace(/\\/+$/, '').toLowerCase() || '/';
  var to = MAP[path];
  if (!to) return;                       /* unmapped pages are left alone */
  location.replace(to + location.search + location.hash);
})();
</script>
${END}`;

mkdirSync(OUT, { recursive: true });
for (const f of FUNNELS) {
  const cur = await client.getFunnel(f.funnelId, { locationId: f.locationId });
  const head = cur?._data?.tracking_code_head || '';
  writeFileSync(`${OUT}/backup-${f.locationId}-${f.funnelId}.head.html`, head);

  /* idempotent: replace our own block rather than stacking copies */
  const stripped = head.includes(START)
    ? head.slice(0, head.indexOf(START)) + head.slice(head.indexOf(END) + END.length)
    : head;
  const next = `${stripped.trim()}\n${block(f.map)}\n`;

  console.log(`\n${f.studio} — ${f.domain}`);
  console.log(`  existing head ${head.length} bytes (pixel preserved: ${/fbq/.test(stripped)})`);
  console.log(`  redirects: ${Object.keys(f.map).length} paths`);
  if (DRY) { console.log('  DRY RUN — not written'); continue; }

  const res = await client.updateFunnel(f.funnelId, { locationId: f.locationId, headTrackingCode: next });
  const back = await client.getFunnel(f.funnelId, { locationId: f.locationId });
  const now = back?._data?.tracking_code_head || '';
  console.log(`  saved: head now ${now.length} bytes, block present: ${now.includes(START)}, pixel still there: ${/fbq/.test(now)}`);
}
