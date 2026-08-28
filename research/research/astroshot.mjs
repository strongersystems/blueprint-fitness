import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const B='http://localhost:8700/blueprint-fitness';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{const resp=await r.fetch();if(resp.status()<400||i===2)return await r.fulfill({response:resp});}catch{}await new Promise(x=>setTimeout(x,350));}await r.abort();});
const problems=[];
for(const [route,name] of [['/hackney/kickstart/','hackney-kickstart'],['/','home'],['/members/cancel/','cancel']]){
  const p=await ctx.newPage(); const errs=[];
  p.on('pageerror',e=>errs.push('PAGEERROR '+e.message.split('\n')[0]));
  p.on('console',m=>{if(m.type()==='error')errs.push('console '+m.text().slice(0,90))});
  await p.goto(B+route,{waitUntil:'load'});
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,40));}window.scrollTo({top:0,behavior:'instant'});});
  await p.waitForTimeout(1500);
  const info=await p.evaluate(()=>({
    over: document.documentElement.scrollWidth-document.documentElement.clientWidth,
    broken: [...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src).slice(0,3),
    js: document.body.classList.contains('js'),
    h: document.body.scrollHeight}));
  if(info.over>1) problems.push(route+' overflow '+info.over);
  if(info.broken.length) problems.push(route+' broken img '+info.broken[0]);
  if(errs.length) problems.push(route+' '+errs.slice(0,2).join(' | '));
  console.log(route, JSON.stringify(info));
  await p.screenshot({path:'astro-'+name+'.png', fullPage:false});
  await p.close();
}
// React island hydration on a studio page
const f=await ctx.newPage();
await f.goto(B+'/south-woodford/kickstart/',{waitUntil:'load'});
await f.$eval('#register',e=>e.scrollIntoView({behavior:'instant'}));
await f.waitForTimeout(2500);
const hydrated=await f.evaluate(()=>{
  const btn=document.querySelector('#register form button[type=submit]');
  if(!btn) return 'NO FORM';
  btn.click();
  return document.querySelectorAll('#register .field.invalid').length;
});
console.log('form validation errors after empty submit:', hydrated);
if(hydrated===0||hydrated==='NO FORM') problems.push('React form did not hydrate/validate');
await f.screenshot({path:'astro-form.png'});
await b.close();
console.log(problems.length?'PROBLEMS:\n'+problems.join('\n'):'ALL GREEN');
