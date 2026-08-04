import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
process.env.NODE_EXTRA_CA_CERTS='/root/.ccr/ca-bundle.crt';
const PACK='/workspace/blueprint-fitness/import-pack';
const ROUTES={'/':'index.html','/kickstart':'kickstart.html','/next-steps':'next-steps.html','/locations':'locations.html','/team':'team.html','/contact':'contact.html'};
const srv=http.createServer((q,s)=>{const u=q.url.split('?')[0];const f=ROUTES[u]||u.slice(1);const p=path.join(PACK,f);
  if(!fs.existsSync(p)){s.writeHead(404);return s.end();}
  s.writeHead(200,{'Content-Type':f.endsWith('.css')?'text/css':'text/html; charset=utf-8'});s.end(fs.readFileSync(p));});
await new Promise(r=>srv.listen(8647,r));
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});
const ctx=await b.newContext({viewport:{width:1440,height:900}});
await ctx.route('**/*',async r=>{for(let i=0;i<3;i++){try{return await r.fulfill({response:await r.fetch()});}catch{await new Promise(x=>setTimeout(x,300));}}await r.abort();});
const PROPS=['display','position','color','background-color','font-family','font-size','font-weight','padding','margin','border-radius','width','height','flex-direction','grid-template-columns','text-transform','letter-spacing','opacity','transform','overflow','z-index','align-items','justify-content','gap','max-width','line-height','border','box-shadow'];
async function snap(url){
  const p=await ctx.newPage(); await p.goto(url,{waitUntil:'load'});
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,30));}window.scrollTo({top:0,behavior:'instant'});});
  await p.waitForTimeout(800);
  const out=await p.evaluate(props=>{
    const els=[...document.querySelectorAll('body *')];
    return els.map(el=>{const cs=getComputedStyle(el);const o={};props.forEach(k=>o[k]=cs.getPropertyValue(k));
      return {tag:el.tagName,cls:el.className&&el.className.baseVal===undefined?String(el.className):'',s:o};});
  },PROPS);
  await p.close(); return out;
}
let mism=0,checked=0;
for(const [route,file] of Object.entries(ROUTES)){
  const A=await snap('http://localhost:8647'+route);
  const B=await snap('http://localhost:8642/'+file);
  if(A.length!==B.length){console.log(route,'ELEMENT COUNT DIFF',A.length,B.length);mism++;continue;}
  let pageM=0;
  for(let i=0;i<A.length;i++){
    for(const k of PROPS){
      checked++;
      if(A[i].s[k]!==B[i].s[k]){
        if(['transform','opacity','width','height','z-index'].includes(k)) continue; // animation/scroll dependent
        pageM++; if(pageM<=3) console.log(`${route} <${A[i].tag} class="${A[i].cls}"> ${k}: pack="${A[i].s[k]}" ref="${B[i].s[k]}"`);
      }
    }
  }
  console.log(`${route}: ${A.length} elements, ${pageM} style mismatches`);
  mism+=pageM;
}
console.log(mism?`\n${mism} MISMATCHES across ${checked} property checks`:`\nPERFECT PARITY across ${checked} computed-property checks`);
await b.close(); srv.close();
