import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS = '/root/.ccr/ca-bundle.crt';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: { server: process.env.HTTPS_PROXY } });
const ctx = await b.newContext();
await ctx.route('**/*', async r => {
  if (!r.request().url().startsWith('http')) return r.continue();
  for (let i=0;i<5;i++){ try { return await r.fulfill({ response: await r.fetch() }); } catch {}
    await new Promise(x=>setTimeout(x,400)); }
  await r.abort();
});
const CASES = [
  ['https://go.blueprintfitnessldn.com/memberships',              '/memberships/'],
  ['https://go.blueprintfitnessldn.com/nutritionrequest',         'go.blueprintfitnessldn.com/nutritionrequest'],
  ['https://go.blueprintfitnessldn.com/cancel',                   'go.blueprintfitnessldn.com/cancel'],
  ['https://go.blueprintfitnessldn.com/teamup',                   'go.blueprintfitnessldn.com/teamup'],
];
let pass = 0;
for (const [from, want] of CASES) {
  const p = await ctx.newPage();
  let final = '(no load)';
  try {
    await p.goto(from, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await p.waitForTimeout(9000);
    final = p.url();
  } catch (e) { final = 'ERR ' + String(e.message).slice(0, 50); }
  const ok = final.includes(want);
  if (ok) pass++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${from.replace('https://','').padEnd(50)} -> ${final.replace('https://blueprintfitnessldn.com','')}`);
  await p.close();
}
console.log(`\n${pass}/${CASES.length} redirects working`);
await b.close();
