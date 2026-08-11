import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const PACK='/workspace/blueprint-fitness/import-pack';
const ROUTES={'/':'index.html','/kickstart':'kickstart.html','/next-steps':'next-steps.html','/locations':'locations.html','/team':'team.html','/contact':'contact.html'};
const srv=http.createServer((q,s)=>{const u=q.url.split('?')[0];const f=ROUTES[u]||u.slice(1);const p=path.join(PACK,f);
  if(!fs.existsSync(p)){s.writeHead(404);return s.end();}
  s.writeHead(200,{'Content-Type':f.endsWith('.css')?'text/css':'text/html; charset=utf-8'});s.end(fs.readFileSync(p));});
await new Promise(r=>srv.listen(8651,r));
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{
  for(let i=0;i<3;i++){
    try{const resp=await r.fetch(); if(resp.status()<400||i===2){ if(resp.status()>=400) console.log('  FINAL-BAD', resp.status(), r.request().url().slice(0,120)); return await r.fulfill({response:resp}); }
      console.log('  retry', resp.status(), r.request().url().slice(0,120));
    }catch(e){ console.log('  threw', r.request().url().slice(0,110)); }
    await new Promise(x=>setTimeout(x,300));
  }
  await r.abort();
});
for(const route of Object.keys(ROUTES)){
  const p=await ctx.newPage();
  await p.goto('http://localhost:8651'+route,{waitUntil:'load'});
  await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1200);
  const inter=await p.evaluate(()=>document.fonts.check('800 1em Inter'));
  console.log(route,'inter:',inter);
  await p.close();
}
await b.close();srv.close();
