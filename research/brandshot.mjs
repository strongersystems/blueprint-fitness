import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [pg,out,h] of [['index.html','b-idx-hero.png',1000],['kickstart.html','b-ks-hero.png',1000],['team.html','b-team.png',900]]) {
  const p = await b.newPage({ viewport:{width:1440,height:900} });
  await p.goto('http://localhost:8642/'+pg,{waitUntil:'load'});
  await p.waitForTimeout(2500);
  await p.screenshot({path:out, clip:{x:0,y:0,width:1440,height:h}, animations:'disabled'});
  await p.close();
}
await b.close(); console.log('ok');
