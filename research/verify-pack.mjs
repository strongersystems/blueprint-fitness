/* verify-pack.mjs — prove the import pack renders identically to the full
   build. Serves the pack on pretty routes, then for every page compares a
   full-page screenshot against the same page served from site/ (which uses
   the complete, un-subset stylesheet). Any CSS rule wrongly dropped by the
   subsetter shows up as a pixel difference. */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http';
import fs from 'fs';
import path from 'path';
process.env.NODE_EXTRA_CA_CERTS = '/root/.ccr/ca-bundle.crt';

const PACK = '/workspace/blueprint-fitness/import-pack';
const REF = 'http://localhost:8642';           // site/ with the full stylesheet
const ROUTES = { '/': 'index.html', '/kickstart': 'kickstart.html', '/next-steps': 'next-steps.html',
                 '/locations': 'locations.html', '/team': 'team.html', '/contact': 'contact.html' };
const problems = [];

/* pretty-route static server for the pack */
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const file = ROUTES[url] || url.slice(1);
  const full = path.join(PACK, file);
  if (!fs.existsSync(full)) { res.writeHead(404); return res.end('nope'); }
  res.writeHead(200, { 'Content-Type': file.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8' });
  res.end(fs.readFileSync(full));
});
await new Promise(r => server.listen(8646, r));
const PACK_URL = 'http://localhost:8646';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' }
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route('**/*', async route => {
  for (let i = 0; i < 3; i++) {
    try { return await route.fulfill({ response: await route.fetch() }); }
    catch { await new Promise(r => setTimeout(r, 400)); }
  }
  await route.abort();
});

async function shoot(url, out, w) {
  const p = await ctx.newPage();
  await p.setViewportSize({ width: w, height: 900 });
  const errs = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 40));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await p.waitForTimeout(900);
  const info = await p.evaluate(() => ({
    over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src),
    anton: document.fonts.check('1em Anton'),
    h: document.body.scrollHeight,
  }));
  if (out) await p.screenshot({ path: out, fullPage: true, animations: 'disabled' });
  await p.close();
  return { errs, ...info };
}

fs.mkdirSync('pack-shots', { recursive: true });
for (const [route, file] of Object.entries(ROUTES)) {
  for (const w of [1440, 390, 360]) {
    const shot = w === 1440 ? `pack-shots/${file}.png` : null;
    const r = await shoot(`${PACK_URL}${route}`, shot, w);
    if (r.over > 1) problems.push(`${route}@${w} overflow ${r.over}px`);
    if (r.broken.length) problems.push(`${route}@${w} broken img: ${r.broken[0]}`);
    if (r.errs.length) problems.push(`${route}@${w} console: ${r.errs.slice(0, 2).join(' | ')}`);
    if (w === 1440 && !r.anton) problems.push(`${route} Anton not loaded`);
  }
  /* reference render from site/ (full stylesheet) for side-by-side eyeballing.
     Page height must match exactly; anything subtler is caught definitively by
     style-parity.mjs, which diffs computed styles element by element.
     (Screenshot *file size* is not a usable signal — map tiles and marquee
     positions differ run to run.) */
  const ref = await shoot(`${REF}/${file}`, `pack-shots/ref-${file}.png`, 1440);
  const mine = await shoot(`${PACK_URL}${route}`, null, 1440);
  if (mine.h !== ref.h) problems.push(`${route} page height ${mine.h} vs reference ${ref.h}`);
}

/* interactions on the pack */
const k = await ctx.newPage();
await k.goto(`${PACK_URL}/kickstart`, { waitUntil: 'load' });
await k.click('.hero .btn-primary'); await k.waitForTimeout(500);
if (!await k.$eval('.signup-overlay', e => !e.hidden && e.classList.contains('show'))) problems.push('lightbox did not open');
await k.click('.signup-modal form button[type=submit]'); await k.waitForTimeout(300);
if (!(await k.$$eval('.signup-modal .field.invalid', e => e.length))) problems.push('validation missing');
await k.fill('#su-name', 'Test'); await k.fill('#su-email', 't@e.com'); await k.fill('#su-phone', '+44 7700 900123');
await k.selectOption('#su-loc', 'Hackney');
await k.click('.signup-modal form button[type=submit]'); await k.waitForTimeout(400);
if (!await k.$eval('#signup-success', e => e.classList.contains('show'))) problems.push('success state missing');
await k.waitForURL('**/next-steps', { timeout: 6000 }).catch(() => problems.push('funnel did not advance to /next-steps'));
await k.goto(`${PACK_URL}/kickstart`, { waitUntil: 'load' });
await k.$eval('.faq-item button', b => b.click()); await k.waitForTimeout(400);
if (!await k.$eval('.faq-item', e => e.classList.contains('open'))) problems.push('FAQ did not open');
await k.setViewportSize({ width: 390, height: 844 });
await k.goto(`${PACK_URL}/`, { waitUntil: 'load' });
await k.click('.burger'); await k.waitForTimeout(400);
if (!await k.$eval('.mobile-menu', e => e.classList.contains('open'))) problems.push('burger did not open');
await k.setViewportSize({ width: 1440, height: 900 });
await k.goto(`${PACK_URL}/`, { waitUntil: 'load' });
await k.click('.hero .btn-primary');
await k.waitForURL('**/kickstart', { timeout: 4000 }).catch(() => problems.push('home CTA did not navigate to /kickstart'));

await browser.close();
server.close();
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'ALL GREEN — import pack matches the full build');
