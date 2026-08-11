import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const PACK='/workspace/blueprint-fitness/import-pack';
const ROUTES={'/':'index.html'};
const srv=http.createServer((q,s)=>{const u=q.url.split('?')[0];const f=ROUTES[u]||u.slice(1);const p=path.join(PACK,f);
  if(!fs.existsSync(p)){s.writeHead(404);return s.end();}
  s.writeHead(200,{'Content-Type':f.endsWith('.css')?'text/css':'text/html; charset=utf-8'});s.end(fs.readFileSync(p));});
await new Promise(r=>srv.listen(8649,r));
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{return await r.fulfill({response:await r.fetch()});}catch{await new Promise(x=>setTimeout(x,300));}}await r.abort();});
async function measure(url){
  const p=await ctx.newPage();
  await p.goto(url,{waitUntil:'load'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(1500);
  const out=await p.evaluate(()=>{
    const secs=[...document.querySelectorAll('section,div.stat-band,footer')].map(s=>({c:(s.className||s.tagName).toString().slice(0,30),h:Math.round(s.getBoundingClientRect().height)}));
    return {h:document.body.scrollHeight, inter:document.fonts.check('800 1em Inter'), secs};
  });
  await p.close(); return out;
}
for (let run=0;run<2;run++){
  const a=await measure('http://localhost:8649/');
  const r=await measure('http://localhost:8642/index.html');
  console.log(`run${run}: pack=${a.h} (Inter:${a.inter})  ref=${r.h} (Inter:${r.inter})`);
  if(a.h!==r.h){
    for(let i=0;i<Math.max(a.secs.length,r.secs.length);i++){
      const x=a.secs[i]||{},y=r.secs[i]||{};
      if(x.h!==y.h) console.log('  diff:',x.c,x.h,'vs',y.c,y.h);
    }
  }
}
await b.close();srv.close();
