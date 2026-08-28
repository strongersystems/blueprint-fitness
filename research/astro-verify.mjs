import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const B='http://localhost:8700/blueprint-fitness';
const ROUTES=['/','/kickstart/','/locations/','/contact/','/members/','/members/cancel/','/members/nutrition-request/',
 '/members/check-in/','/members/terms/','/members/bookings-cancellations/','/next-steps/',
 '/hackney/kickstart/','/leytonstone/kickstart/','/south-woodford/kickstart/',
 '/hackney/next-steps/','/leytonstone/next-steps/','/south-woodford/next-steps/'];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{const resp=await r.fetch();if(resp.status()<400||i===2)return await r.fulfill({response:resp});}catch{}await new Promise(x=>setTimeout(x,350));}await r.abort();});
const problems=[];
for(const route of ROUTES){
  for(const w of [1440,390]){
    const p=await ctx.newPage(); await p.setViewportSize({width:w,height:900});
    const errs=[]; const bad=[];
    p.on('pageerror',e=>errs.push('PAGEERROR '+e.message.split('\n')[0]));
    p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,80))});
    p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().slice(-60))});
    await p.goto(B+route,{waitUntil:'load'});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,30));}});
    await p.waitForTimeout(900);
    const i=await p.evaluate(()=>({over:document.documentElement.scrollWidth-document.documentElement.clientWidth,
      broken:[...document.images].filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.src).slice(0,2)}));
    if(i.over>1) problems.push(`${route}@${w} overflow ${i.over}`);
    if(i.broken.length) problems.push(`${route}@${w} broken img ${i.broken[0]}`);
    if(bad.length) problems.push(`${route}@${w} ${bad[0]}`);
    if(errs.length) problems.push(`${route}@${w} ${errs[0]}`);
    if(w===1440) await p.screenshot({path:`av-${route.replace(/\//g,'_')||'home'}.png`});
    await p.close();
  }
}
await b.close();
console.log(problems.length?'PROBLEMS:\n'+problems.join('\n'):`ALL GREEN — ${ROUTES.length} routes × 2 widths`);
