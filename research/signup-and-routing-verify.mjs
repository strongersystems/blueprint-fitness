import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const B='http://localhost:8700';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const problems=[];
/* 1. lightbox must fit without scrolling at realistic heights */
for (const h of [900,800,700,844]) {
  const c=await b.newContext({viewport:{width:h===844?390:1440,height:h}});
  await c.route('**/*',async r=>{for(let i=0;i<3;i++){try{return await r.fulfill({response:await r.fetch()});}catch{}await new Promise(x=>setTimeout(x,300));}await r.abort();});
  const p=await c.newPage();
  await p.goto(B+'/kickstart/',{waitUntil:'load'}); await p.waitForTimeout(600);
  await p.click('.enquiry-trigger'); await p.waitForTimeout(700);
  const m=await p.evaluate(()=>{const el=document.querySelector('.signup-modal');
    return {scrollH:el.scrollHeight, clientH:el.clientHeight, fields:el.querySelectorAll('.field').length,
            hasConfirm:!!el.querySelector('[name=confirm]'), hasMsg:!!el.querySelector('#eq-msg')};});
  const scrolls = m.scrollH > m.clientH + 2;
  console.log(`viewport ${String(h).padStart(3)} -> modal ${m.scrollH}/${m.clientH} scrolls=${scrolls} fields=${m.fields} confirm=${m.hasConfirm} msg=${m.hasMsg}`);
  if (scrolls) problems.push(`lightbox scrolls at viewport height ${h}`);
  if (m.hasConfirm) problems.push('confirm checkbox still present');
  if (m.hasMsg) problems.push('message box still present');
  await c.close();
}
/* 2. picking a studio routes to that studio's next steps */
for (const [studio,expect] of [['Leytonstone','/leytonstone/next-steps/'],['Hackney','/hackney/next-steps/'],['Not sure yet','/next-steps/']]) {
  const c=await b.newContext({viewport:{width:1440,height:900}});
  await c.route('**/*',async r=>{for(let i=0;i<3;i++){try{return await r.fulfill({response:await r.fetch()});}catch{}await new Promise(x=>setTimeout(x,300));}await r.abort();});
  const p=await c.newPage();
  await p.goto(B+'/kickstart/',{waitUntil:'load'}); await p.waitForTimeout(600);
  await p.click('.enquiry-trigger'); await p.waitForTimeout(600);
  await p.fill('#eq-name','Route Check'); await p.fill('#eq-email','r@example.invalid');
  await p.fill('#eq-phone','+44 7700 900123'); await p.selectOption('#eq-loc',studio);
  await p.click('form[id^=website-] button[type=submit]');
  await p.waitForURL('**'+expect,{timeout:8000}).catch(()=>problems.push(`${studio} did not route to ${expect} (at ${p.url()})`));
  console.log(`${studio.padEnd(13)} -> ${p.url().replace(B,'')}`);
  await c.close();
}
/* 3. signup: all three embeds load, switching reveals a real form */
{
  const c=await b.newContext({viewport:{width:1440,height:1000}});
  const net=[];
  await c.route('**/*',async r=>{for(let i=0;i<3;i++){try{return await r.fulfill({response:await r.fetch()});}catch{}await new Promise(x=>setTimeout(x,300));}await r.abort();});
  const p=await c.newPage();
  p.on('response',r=>{if(/widget\/form/.test(r.url())) net.push(r.url().split('/form/')[1]?.slice(0,20));});
  await p.goto(B+'/signup/',{waitUntil:'load'}); await p.waitForTimeout(8000);
  const loaded=[...new Set(net)];
  console.log('signup embeds fetched:',JSON.stringify(loaded));
  if (loaded.length < 3) problems.push(`only ${loaded.length}/3 sign-up embeds fetched`);
  await c.close();
}
await b.close();
console.log(problems.length?'\nPROBLEMS:\n'+problems.join('\n'):'\nALL GREEN');
