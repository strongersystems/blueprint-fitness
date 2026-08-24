import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const PACK='/workspace/blueprint-fitness/import-pack';
const srv=http.createServer((q,s)=>{const u=q.url.split('?')[0];const f=u==='/'?'index.html':u.slice(1);const p=path.join(PACK,f);
  if(!fs.existsSync(p)){s.writeHead(404);return s.end();}
  s.writeHead(200,{'Content-Type':f.endsWith('.css')?'text/css':'text/html; charset=utf-8'});s.end(fs.readFileSync(p));});
await new Promise(r=>srv.listen(8653,r));
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
await p.goto('http://localhost:8653/',{waitUntil:'load'});
await p.waitForTimeout(1500);
console.log('errors:', errs.slice(0,4));
console.log(await p.evaluate(()=>({
  js: document.body.classList.contains('js'),
  burger: !!document.querySelector('.burger'),
  burgerVisible: (function(){const b=document.querySelector('.burger');const r=b.getBoundingClientRect();return r.width+'x'+r.height+' top:'+r.top})(),
  topEl: (function(){const b=document.querySelector('.burger');const r=b.getBoundingClientRect();const el=document.elementFromPoint(r.left+r.width/2, r.top+r.height/2);return el?el.className||el.tagName:'none'})()
})));
await p.click('.burger').catch(e=>console.log('click failed:',e.message.split('\n')[0]));
await p.waitForTimeout(500);
console.log('menu open:', await p.$eval('.mobile-menu',e=>e.classList.contains('open')));
await b.close();srv.close();
