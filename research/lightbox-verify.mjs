import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const B='http://localhost:8700';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const problems=[];
const mk=async(js=true)=>{const c=await b.newContext({viewport:{width:1440,height:900},javaScriptEnabled:js});
  await c.route('**/*',async r=>{for(let i=0;i<3;i++){try{return await r.fulfill({response:await r.fetch()});}catch{}await new Promise(x=>setTimeout(x,350));}await r.abort();});return c;};

const ctx=await mk();
const p=await ctx.newPage();
p.on('pageerror',e=>problems.push('PAGEERROR '+e.message.split('\n')[0]));

for (const route of ['/kickstart/','/hackney/kickstart/']) {
  await p.goto(B+route,{waitUntil:'load'}); await p.waitForTimeout(700);
  /* form ships in the initial DOM but hidden */
  const st=await p.evaluate(()=>{const f=document.querySelector('form[id^=website-]');
    const o=document.querySelector('.signup-overlay');
    return {form:!!f, formVisible:!!(f&&f.offsetParent), overlayHidden:o&&o.hasAttribute('hidden'), bodyCls:document.body.className};});
  if(!st.form) problems.push(route+': no form in the initial DOM');
  if(st.formVisible) problems.push(route+': form is visible before the lightbox opens');
  if(!st.overlayHidden) problems.push(route+': overlay not hidden at rest');
  if(!/(^| )js( |$)/.test(st.bodyCls)) problems.push(route+': body class is "'+st.bodyCls+'", gate not flipped');

  /* card trigger opens it and focuses the first field */
  await p.click('.enquiry-trigger'); await p.waitForTimeout(600);
  const open=await p.evaluate(()=>{const o=document.querySelector('.signup-overlay');
    return {shown:o.classList.contains('show'),hidden:o.hasAttribute('hidden'),
      focus:document.activeElement&&document.activeElement.id,
      locked:document.body.classList.contains('modal-open')};});
  if(open.hidden||!open.shown) problems.push(route+': lightbox did not open');
  if(open.focus!=='eq-name') problems.push(route+': focus is '+open.focus+' not eq-name');
  if(!open.locked) problems.push(route+': body scroll not locked');

  /* Escape closes it */
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  if(await p.evaluate(()=>!document.querySelector('.signup-overlay').hasAttribute('hidden')))
    problems.push(route+': Escape did not close the lightbox');

  /* the hero CTA opens the same lightbox */
  await p.evaluate(()=>window.scrollTo(0,0));
  const hero=p.locator('a[data-enquiry-trigger]').first();
  await hero.click(); await p.waitForTimeout(600);
  if(await p.evaluate(()=>document.querySelector('.signup-overlay').hasAttribute('hidden')))
    problems.push(route+': hero CTA did not open the lightbox');
  const forms=await p.$$eval('form',f=>f.length);
  if(forms!==1) problems.push(route+': '+forms+' forms on the page, expected 1');
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
}

/* full journey: open, submit, success, advance */
await p.goto(B+'/kickstart/',{waitUntil:'load'}); await p.waitForTimeout(600);
await p.click('.enquiry-trigger'); await p.waitForTimeout(500);
await p.click('.signup-modal button[type=submit]'); await p.waitForTimeout(400);
if(await p.locator('.signup-modal .field.invalid').count()<4) problems.push('validation did not flag empty fields in the lightbox');
await p.fill('#eq-name','Lightbox Check'); await p.fill('#eq-email','lb@example.invalid');
await p.fill('#eq-phone','+44 7700 900123'); await p.selectOption('#eq-loc','Hackney');
await p.click('.signup-modal button[type=submit]');
await p.waitForSelector('.signup-modal .form-success.show',{timeout:4000}).catch(()=>problems.push('no success state in the lightbox'));
await p.waitForURL('**/hackney/next-steps/',{timeout:8000}).catch(()=>problems.push('did not advance to /next-steps/'));
await ctx.close();

/* scripts DISABLED: the panel must render inline, complete, no overflow */
const nctx=await mk(false);
const n=await nctx.newPage();
for (const route of ['/kickstart/','/leytonstone/kickstart/']) {
  await n.goto(B+route,{waitUntil:'load'}); await n.waitForTimeout(400);
  const r=await n.evaluate(()=>{const f=document.querySelector('form[id^=website-]');
    return {formVisible:!!(f&&f.getClientRects().length),
      triggerVisible:!!document.querySelector('.enquiry-trigger')?.getClientRects().length,
      fallbackVisible:!!document.querySelector('.enquiry-fallback')?.getClientRects().length,
      over:document.documentElement.scrollWidth-document.documentElement.clientWidth,
      /* only what this panel owns: JS-only chrome (companion, mobile menu,
         photo captions) is legitimately invisible without a script */
      /* .signup-close is dropped on purpose (nothing to close) and .err is the
         per-field validation message, hidden until a field is flagged */
      hiddenInPanel:[...document.querySelectorAll('.signup-overlay, .signup-overlay *')]
        .filter(e=>!e.matches('.signup-close, .err'))
        .filter(e=>{const s=getComputedStyle(e);return s.opacity==='0'||s.display==='none'||s.visibility==='hidden';})
        .map(e=>e.tagName+'.'+String(e.className).slice(0,40))};});
  if(!r.formVisible) problems.push('no-JS '+route+': form not visible inline');
  if(r.triggerVisible) problems.push('no-JS '+route+': dead trigger button still shown');
  if(!r.fallbackVisible) problems.push('no-JS '+route+': no anchor fallback to the form');
  if(r.over>1) problems.push('no-JS '+route+': horizontal overflow '+r.over);
  if(r.hiddenInPanel.length) problems.push('no-JS '+route+': hidden inside the panel: '+r.hiddenInPanel.join(', '));
  console.log('no-JS '+route, JSON.stringify(r));
}
await b.close();
console.log(problems.length?'PROBLEMS:\n'+problems.join('\n'):'ALL GREEN — lightbox interactions + no-JS fallback');
