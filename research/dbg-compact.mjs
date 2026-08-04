import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY, bypass:'localhost,127.0.0.1'} });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.route('**/*', async r => { if(r.request().url().includes('localhost')) return r.continue();
  try{ await r.fulfill({response: await r.fetch()}); }catch{ await r.abort(); } });
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8644/kickstart.html',{waitUntil:'load'});
await p.waitForTimeout(1500);
console.log('pageerrors:', errs.slice(0,3));
console.log(await p.evaluate(() => ({
  heroCount: document.querySelectorAll('.hero').length,
  heroClasses: [...document.querySelectorAll('section')].slice(0,3).map(s=>s.className),
  btnPrimary: document.querySelectorAll('.btn-primary').length,
  heroBtn: document.querySelectorAll('.hero .btn-primary').length,
  firstBtnHTML: document.querySelector('.btn-primary')?.outerHTML.slice(0,120),
  bodyStart: document.body.innerHTML.slice(0,300)
})));
await b.close();
