import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:1440,height:900} });
for (const [pg,out] of [['members.html','m-hub.png'],['check-in.html','m-checkin.png'],['bookings-cancellations.html','m-bookings.png'],['terms.html','m-terms.png'],['cancel.html','m-cancel.png']]) {
  await p.goto('http://localhost:8642/'+pg,{waitUntil:'load'});
  await p.waitForTimeout(1600);
  await p.screenshot({path:out, clip:{x:0,y:0,width:1440,height:900}, animations:'disabled'});
}
// lightbox placeholder
await p.goto('http://localhost:8642/cancel.html',{waitUntil:'load'});
await p.waitForTimeout(800);
await p.click('[data-embed-form="CRXo5oPCz8vG0Wf1qKrD"]');
await p.waitForTimeout(600);
await p.screenshot({path:'m-cancel-modal.png', animations:'disabled'});
const state = await p.evaluate(() => ({
  open: !document.querySelector('.signup-overlay').hidden,
  title: document.querySelector('#embed-title').textContent,
  placeholder: !!document.querySelector('.embed-placeholder'),
  iframe: !!document.querySelector('.embed-slot iframe')
}));
console.log(state);
await p.keyboard.press('Escape'); await p.waitForTimeout(400);
console.log('closed:', await p.$eval('.signup-overlay', e => e.hidden));
await b.close();
