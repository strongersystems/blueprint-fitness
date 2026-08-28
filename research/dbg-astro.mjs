import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const B='http://localhost:8700/blueprint-fitness';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{const resp=await r.fetch();if(resp.status()<400||i===2)return await r.fulfill({response:resp});}catch{}await new Promise(x=>setTimeout(x,300));}await r.abort();});
// 1. which resource 404s on home
const p=await ctx.newPage(); const bad=[];
p.on('response',res=>{if(res.status()>=400)bad.push(res.status()+' '+res.url())});
await p.goto(B+'/',{waitUntil:'load'}); await p.waitForTimeout(2500);
console.log('home failures:', bad.length?bad:'none');
// 2. form hydration, waiting properly for React re-render
const f=await ctx.newPage();
await f.goto(B+'/south-woodford/kickstart/',{waitUntil:'load'});
await f.$eval('#register',e=>e.scrollIntoView({behavior:'instant'}));
await f.waitForTimeout(3000);
console.log('astro-island present:', await f.evaluate(()=>!!document.querySelector('astro-island')));
console.log('island hydrated attr:', await f.evaluate(()=>{const i=document.querySelector('astro-island');return i?i.getAttribute('ssr'):'none';}));
await f.click('#register form button[type=submit]');
await f.waitForTimeout(700);
console.log('invalid fields after submit:', await f.$$eval('#register .field.invalid', e=>e.length));
console.log('err text:', await f.$eval('#register .field.invalid .err', e=>e.textContent).catch(()=>'none'));
await b.close();
