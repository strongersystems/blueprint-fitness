import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const PACK='/workspace/blueprint-fitness/import-pack';
const ROUTES={'/team':'team.html','/contact':'contact.html'};
const srv=http.createServer((q,s)=>{const u=q.url.split('?')[0];const f=ROUTES[u]||u.slice(1);const p=path.join(PACK,f);
  if(!fs.existsSync(p)){s.writeHead(404);return s.end();}
  s.writeHead(200,{'Content-Type':f.endsWith('.css')?'text/css':'text/html; charset=utf-8'});s.end(fs.readFileSync(p));});
await new Promise(r=>srv.listen(8650,r));
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:360,height:740}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{return await r.fulfill({response:await r.fetch()});}catch{await new Promise(x=>setTimeout(x,300));}}await r.abort();});
for(const route of Object.keys(ROUTES)){
  const p=await ctx.newPage(); const bad=[];
  p.on('response',res=>{if(res.status()>=400)bad.push(res.status()+' '+res.url())});
  await p.goto('http://localhost:8650'+route,{waitUntil:'load'});
  await p.waitForTimeout(2500);
  console.log(route, bad.length?bad:'clean');
  await p.close();
}
await b.close();srv.close();
