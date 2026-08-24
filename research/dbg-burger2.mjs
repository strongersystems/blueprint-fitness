import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const PACK='/workspace/blueprint-fitness/import-pack';
const srv=http.createServer((q,s)=>{const u=q.url.split('?')[0];const f=u==='/'?'index.html':u.slice(1);const p=path.join(PACK,f);
  if(!fs.existsSync(p)){s.writeHead(404);return s.end();}
  s.writeHead(200,{'Content-Type':f.endsWith('.css')?'text/css':'text/html; charset=utf-8'});s.end(fs.readFileSync(p));});
await new Promise(r=>srv.listen(8654,r));
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:390,height:844}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{const resp=await r.fetch();if(resp.status()<400||i===2)return await r.fulfill({response:resp});}catch{}await new Promise(x=>setTimeout(x,300));}await r.abort();});
for(let run=0;run<3;run++){
  const p=await ctx.newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message.split('\n')[0]));
  await p.goto('http://localhost:8654/',{waitUntil:'load'});
  await p.waitForTimeout(800);
  const pre=await p.evaluate(()=>({js:document.body.classList.contains('js'),burger:!!document.querySelector('.burger')}));
  await p.click('.burger');
  await p.waitForTimeout(500);
  const open=await p.$eval('.mobile-menu',e=>e.classList.contains('open'));
  console.log('run'+run, JSON.stringify(pre), 'menu open:', open, 'pageerrors:', errs);
  await p.close();
}
await b.close();srv.close();
