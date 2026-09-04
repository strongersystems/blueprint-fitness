import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const B='http://localhost:8700';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const c=await b.newContext({viewport:{width:1440,height:900}});
await c.route('**/*',async r=>{for(let i=0;i<3;i++){try{return await r.fulfill({response:await r.fetch()});}catch{}await new Promise(x=>setTimeout(x,350));}await r.abort();});
const p=await c.newPage();
const problems=[];
p.on('pageerror',e=>problems.push('PAGEERROR '+e.message.split('\n')[0]));
await p.goto(B+'/members/cancel/',{waitUntil:'load'});
await p.waitForTimeout(800);
const btns = await p.$$('[data-embed-form]');
console.log('cancel buttons found:', btns.length);
if (btns.length !== 3) { problems.push('expected 3 cancellation buttons, found '+btns.length); }
if (!btns.length) {
  const all = await p.$$eval('button, a.btn', e=>e.map(x=>x.textContent.trim()).filter(t=>/cancel|leytonstone|hackney|woodford/i.test(t)).slice(0,8));
  console.log('candidate buttons:', JSON.stringify(all));
}
for (const [i, btn] of btns.entries()) {
  await btn.click(); await p.waitForTimeout(1200);
  const info = await p.evaluate(()=>{
    const o=[...document.querySelectorAll('.signup-overlay')].find(x=>!x.hasAttribute('hidden'));
    const f=o&&o.querySelector('iframe');
    return {open:!!o, src:f&&f.getAttribute('src'), id:f&&f.getAttribute('data-form-id')};
  });
  console.log('  button', i, JSON.stringify(info));
  if(!info.open) problems.push('cancel lightbox '+i+' did not open');
  if(!info.src||!/link\.stronger\.systems/.test(info.src)) problems.push('cancel lightbox '+i+' has no live form iframe');
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
}
await b.close();
console.log(problems.length?'PROBLEMS:\n'+problems.join('\n'):'ALL GREEN — cancellation lightboxes still load live forms');
