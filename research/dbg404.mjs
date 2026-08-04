import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY, bypass:'localhost,127.0.0.1'} });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.route('**/*', async r => { try{ await r.fulfill({response: await r.fetch()}); }catch{ await r.abort(); } });
for (const pg of ['index.html','kickstart.html']) {
  const p = await ctx.newPage();
  const bad=[];
  p.on('response', res => { if(res.status()>=400) bad.push(res.status()+' '+res.url()); });
  await p.goto('http://localhost:8645/'+pg,{waitUntil:'load'});
  await p.waitForTimeout(3000);
  console.log(pg, '->', bad.length?bad:'no failures');
}
await b.close();
