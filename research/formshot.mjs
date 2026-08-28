import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
 proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{const resp=await r.fetch();if(resp.status()<400||i===2)return await r.fulfill({response:resp});}catch{}await new Promise(x=>setTimeout(x,300));}await r.abort();});
const p=await ctx.newPage();
await p.goto('http://localhost:8700/blueprint-fitness/kickstart/',{waitUntil:'load'});
await p.$eval('#register',e=>e.scrollIntoView({behavior:'instant',block:'start'}));
await p.waitForTimeout(2500);
await p.screenshot({path:'form-main.png'});
const h=await ctx.newPage();
await h.goto('http://localhost:8700/blueprint-fitness/hackney/kickstart/',{waitUntil:'load'});
await h.waitForTimeout(1500);
await h.screenshot({path:'hero-hackney.png'});
await b.close();console.log('ok');
