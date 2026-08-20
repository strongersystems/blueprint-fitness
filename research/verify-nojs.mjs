/* verify-nojs.mjs — render every pack page with JavaScript DISABLED and
   prove it is a complete static page: body keeps no-js, nothing hidden,
   photos developed, no overlap-inducing transforms, hero text visible. */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
process.env.NODE_EXTRA_CA_CERTS = '/root/.ccr/ca-bundle.crt';
const PACK = '/workspace/blueprint-fitness/import-pack';
const ROUTES = { '/': 'index.html', '/kickstart': 'kickstart.html', '/next-steps': 'next-steps.html',
                 '/locations': 'locations.html',  '/contact': 'contact.html' };
const srv = http.createServer((q, s) => {
  const u = q.url.split('?')[0]; const f = ROUTES[u] || u.slice(1); const p = path.join(PACK, f);
  if (!fs.existsSync(p)) { s.writeHead(404); return s.end(); }
  s.writeHead(200, { 'Content-Type': f.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8' });
  s.end(fs.readFileSync(p));
});
await new Promise(r => srv.listen(8648, r));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
await ctx.route('**/*', async route => {
  for (let i = 0; i < 3; i++) { try { return await route.fulfill({ response: await route.fetch() }); }
    catch { await new Promise(r => setTimeout(r, 300)); } }
  await route.abort();
});
const problems = [];
fs.mkdirSync('nojs-shots', { recursive: true });
for (const [route, file] of Object.entries(ROUTES)) {
  const p = await ctx.newPage();
  await p.goto(`http://localhost:8648${route}`, { waitUntil: 'load' });
  await p.waitForTimeout(1200);
  const r = await p.evaluate(() => {
    const hidden = [];
    for (const el of document.querySelectorAll('.reveal, .stagger > *, h1, h2, .lede')) {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.opacity) < 0.99 || (cs.transform !== 'none' && cs.transform !== 'matrix(1, 0, 0, 1, 0, 0)'))
        hidden.push(el.tagName + '.' + String(el.className).split(' ')[0]);
    }
    const undeveloped = [...document.querySelectorAll('.plan-frame img')]
      .filter(i => getComputedStyle(i).filter !== 'none').length;
    return {
      nojs: document.body.classList.contains('no-js'),
      hidden: hidden.slice(0, 5), hiddenCount: hidden.length,
      undeveloped,
      over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h: document.body.scrollHeight,
    };
  });
  if (!r.nojs) problems.push(`${route}: body lost no-js class without JS?!`);
  if (r.hiddenCount) problems.push(`${route}: ${r.hiddenCount} hidden/transformed elements e.g. ${r.hidden.join(', ')}`);
  if (r.undeveloped) problems.push(`${route}: ${r.undeveloped} photos stuck in blueprint filter`);
  if (r.over > 1) problems.push(`${route}: overflow ${r.over}px`);
  await p.screenshot({ path: `nojs-shots/${file}.png`, fullPage: true, animations: 'disabled' });
  await p.close();
}
await browser.close(); srv.close();
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'ALL GREEN — every page is a complete static page with JavaScript disabled');
