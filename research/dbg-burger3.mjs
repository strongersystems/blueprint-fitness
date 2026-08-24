import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
const PACK='/workspace/blueprint-fitness/import-pack';
const srv=http.createServer((q,s)=>{const u=q.url.split('?')[0];const f=u==='/'?'index.html':u.slice(1);const p=path.join(PACK,f);
  if(!fs.existsSync(p)){s.writeHead(404);return s.end();}
  s.writeHead(200,{'Content-Type':f.endsWith('.css')?'text/css':'text/html; charset=utf-8'});s.end(fs.readFileSync(p));});
await new Promise(r=>srv.listen(8655,r));
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:390,height:844}});
await p.addInitScript(() => {
  window.__attached = [];
  const orig = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, fn, opts) {
    if (this && this.className && String(this.className).indexOf('burger') !== -1) window.__attached.push(type);
    return orig.call(this, type, fn, opts);
  };
});
const errs=[]; p.on('pageerror',e=>errs.push(e.message.split('\n')[0]));
await p.goto('http://localhost:8655/',{waitUntil:'load'});
await p.waitForTimeout(1000);
const r = await p.evaluate(() => {
  const bg = document.querySelector('.burger');
  bg.click();
  return {
    attached: window.__attached,
    aria: bg.getAttribute('aria-expanded'),
    open: document.querySelector('.mobile-menu').classList.contains('open'),
  };
});
console.log(JSON.stringify(r), 'pageerrors:', errs);
await b.close();srv.close();
