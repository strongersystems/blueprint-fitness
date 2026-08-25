import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const PACK='/workspace/blueprint-fitness/import-pack';
const srv=http.createServer((q,s)=>{const u=q.url.split('?')[0];const f=u==='/nutrition-request'?'nutrition-request.html':u.slice(1);const p=path.join(PACK,f);
 if(!fs.existsSync(p)){s.writeHead(404);return s.end();}
 s.writeHead(200,{'Content-Type':f.endsWith('.css')?'text/css':'text/html; charset=utf-8'});s.end(fs.readFileSync(p));});
await new Promise(r=>srv.listen(8660,r));
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
 proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{const resp=await r.fetch();if(resp.status()<400||i===2)return await r.fulfill({response:resp});}catch{}await new Promise(x=>setTimeout(x,350));}await r.abort();});
async function list(url){
  const p=await ctx.newPage(); await p.goto(url,{waitUntil:'load'}); await p.waitForTimeout(2500);
  const r=await p.evaluate(()=>{
    const els=[...document.querySelectorAll('body *')];
    return {n:els.length, sig:els.map(e=>e.tagName+'.'+String(e.className||'').split(' ')[0]),
      overlayStyled: (function(){const o=document.querySelector('.signup-overlay');
        return o?getComputedStyle(o).position:'MISSING';})(),
      cssLoaded: !!document.querySelector('link[rel=stylesheet][href*="main.css"], style')};
  });
  await p.close(); return r;
}
const A=await list('http://localhost:8660/nutrition-request');
const B=await list('http://localhost:8642/nutrition-request.html');
console.log('pack n=',A.n,'overlay position=',A.overlayStyled);
console.log('ref  n=',B.n,'overlay position=',B.overlayStyled);
for(let i=0;i<Math.max(A.sig.length,B.sig.length);i++){
  if(A.sig[i]!==B.sig[i]){ console.log('FIRST DIVERGENCE at',i,'pack:',A.sig[i],'ref:',B.sig[i]);
    console.log('pack ctx:',A.sig.slice(Math.max(0,i-2),i+4).join(' | '));
    console.log('ref  ctx:',B.sig.slice(Math.max(0,i-2),i+4).join(' | ')); break; }
}
await b.close();srv.close();
