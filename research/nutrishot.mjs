import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{const resp=await r.fetch();if(resp.status()<400||i===2)return await r.fulfill({response:resp});}catch{}await new Promise(x=>setTimeout(x,400));}await r.abort();});
const p=await ctx.newPage();
await p.goto('http://localhost:8642/nutrition-request.html',{waitUntil:'load'});
await p.waitForTimeout(9000);
await p.screenshot({path:'r19-nutrition.png',fullPage:true});
// did the real form render inside the iframe?
const fr=p.frames().find(f=>f.url().includes('link.stronger.systems'));
console.log('iframe present:', !!fr);
if(fr){ const t=await fr.evaluate(()=>document.body.innerText.slice(0,220)).catch(e=>'ERR '+e.message); console.log('form text:', JSON.stringify(t)); }
// why-it-works image + cancel nudge
const i=await ctx.newPage();
await i.goto('http://localhost:8642/index.html',{waitUntil:'load'});
await i.evaluate(()=>document.querySelector('.on-mist').scrollIntoView({behavior:'instant'}));
await i.waitForTimeout(1200);
await i.screenshot({path:'r19-why.png'});
const c=await ctx.newPage();
await c.goto('http://localhost:8642/cancel.html',{waitUntil:'load'});
await c.waitForTimeout(900);
await c.screenshot({path:'r19-cancel.png',fullPage:true});
await b.close();console.log('shots ok');
