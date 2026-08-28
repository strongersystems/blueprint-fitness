import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const B='http://localhost:8700/blueprint-fitness';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
 proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{const resp=await r.fetch();if(resp.status()<400||i===2)return await r.fulfill({response:resp});}catch{}await new Promise(x=>setTimeout(x,350));}await r.abort();});
for (const [route,expect] of [['/hackney/kickstart/',1],['/kickstart/',3],['/members/',0]]) {
  const p=await ctx.newPage(); const hits=[]; const errs=[];
  p.on('request',r=>{ if(r.url().includes('external-tracking.js')) hits.push(r.url()); });
  p.on('response',async r=>{ if(r.url().includes('external-tracking.js')) hits.push('  -> HTTP '+r.status()); });
  p.on('pageerror',e=>errs.push(e.message.split('\n')[0]));
  await p.goto(B+route,{waitUntil:'load'});
  await p.waitForTimeout(3500);
  const inDom=await p.evaluate(()=>[...document.querySelectorAll('script[data-tracking-id]')].map(s=>s.getAttribute('data-tracking-id')));
  console.log(route, 'script tags in DOM:', inDom.length, '(expected '+expect+')');
  console.log('   network:', hits.filter(h=>h.startsWith('  ->')).join(' '), '| requests:', hits.filter(h=>!h.startsWith('  ->')).length);
  if(errs.length) console.log('   pageerrors:', errs.slice(0,2));
  await p.close();
}
// dataLayer event on submit
const f=await ctx.newPage();
await f.goto(B+'/kickstart/',{waitUntil:'load'});
await f.$eval('#register',e=>e.scrollIntoView({behavior:'instant'}));
await f.waitForTimeout(2500);
await f.fill('#eq-name','Test Person'); await f.fill('#eq-email','t@example.com');
await f.fill('#eq-phone','+44 7700 900123');
await f.selectOption('#eq-loc','Leytonstone');
await f.check('input[name=confirm]');
await f.click('#register form button[type=submit]');
await f.waitForTimeout(600);
console.log('dataLayer:', JSON.stringify(await f.evaluate(()=>window.dataLayer)));
await b.close();
