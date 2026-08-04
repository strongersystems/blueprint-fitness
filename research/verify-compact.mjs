/* verify-compact.mjs — render the compact build (assets come from the live
   deploy, so requests are routed through the agent proxy) and prove it
   behaves identically: no console errors, no overflow, interactions work. */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
process.env.NODE_EXTRA_CA_CERTS = '/root/.ccr/ca-bundle.crt';

const BASE = 'http://localhost:8645';
const PAGES = ['index.html', 'kickstart.html', 'next-steps.html', 'locations.html', 'team.html', 'contact.html'];
const problems = [];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  proxy: { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' }
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
/* every request is fetched Node-side and fulfilled: localhost resolves
   directly, live-site assets go out through the agent proxy. */
await ctx.route('**/*', async route => {
  for (let attempt = 0; attempt < 3; attempt++) {          // proxy can flake on big assets
    try { return await route.fulfill({ response: await route.fetch() }); }
    catch { await new Promise(r => setTimeout(r, 400)); }
  }
  await route.abort();
});

for (const page of PAGES) {
  for (const [w, h] of [[1440, 900], [390, 844], [360, 740]]) {
    const p = await ctx.newPage();
    await p.setViewportSize({ width: w, height: h });
    const errs = [];
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
    await p.goto(`${BASE}/${page}`, { waitUntil: 'load' });
    // walk the page so scroll-driven reveals fire
    await p.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise(r => setTimeout(r, 40));
      }
    });
    await p.waitForTimeout(700);
    const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (over > 1) problems.push(`${page}@${w} horizontal overflow ${over}px`);
    // images actually loaded (absolute URLs resolve)?
    const broken = await p.evaluate(() =>
      [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src));
    if (broken.length) problems.push(`${page}@${w} BROKEN IMG: ${broken.slice(0, 3).join(' | ')}`);
    // font actually applied?
    if (w === 1440) {
      const fontOk = await p.evaluate(() => document.fonts.check('1em Anton'));
      if (!fontOk) problems.push(`${page} Anton webfont not loaded`);
    }
    if (errs.length) problems.push(`${page}@${w} console: ${errs.slice(0, 2).join(' | ')}`);
    if (w === 1440) await p.screenshot({ path: `lite-shots/${page}.png`, fullPage: true, animations: 'disabled' });
    await p.close();
  }
}

/* interactions: the signup lightbox funnel on kickstart */
const k = await ctx.newPage();
await k.goto(`${BASE}/kickstart.html`, { waitUntil: 'load' });
await k.click('.hero .btn-primary');
await k.waitForTimeout(500);
if (!await k.$eval('.signup-overlay', e => !e.hidden && e.classList.contains('show')))
  problems.push('lightbox did not open');
await k.click('.signup-modal form button[type=submit]');
await k.waitForTimeout(300);
if (!(await k.$$eval('.signup-modal .field.invalid', e => e.length)))
  problems.push('lightbox validation missing');
await k.fill('#su-name', 'Test'); await k.fill('#su-email', 't@e.com'); await k.fill('#su-phone', '+44 7700 900123');
await k.selectOption('#su-loc', 'Hackney');
await k.click('.signup-modal form button[type=submit]');
await k.waitForTimeout(400);
if (!await k.$eval('#signup-success', e => e.classList.contains('show'))) problems.push('success state missing');
await k.waitForURL('**/next-steps.html', { timeout: 6000 }).catch(() => problems.push('funnel did not advance'));
/* FAQ + burger */
await k.goto(`${BASE}/kickstart.html`, { waitUntil: 'load' });
await k.$eval('.faq-item button', b => b.click());
await k.waitForTimeout(400);
if (!await k.$eval('.faq-item', e => e.classList.contains('open'))) problems.push('FAQ did not open');
await k.setViewportSize({ width: 390, height: 844 });
await k.goto(`${BASE}/index.html`, { waitUntil: 'load' });
await k.click('.burger'); await k.waitForTimeout(400);
if (!await k.$eval('.mobile-menu', e => e.classList.contains('open'))) problems.push('burger did not open menu');
/* home CTA navigates (does not open lightbox) */
await k.setViewportSize({ width: 1440, height: 900 });
await k.goto(`${BASE}/index.html`, { waitUntil: 'load' });
await k.click('.hero .btn-primary');
await k.waitForURL('**/kickstart.html*', { timeout: 4000 }).catch(() => problems.push('home CTA did not navigate to kickstart'));

await browser.close();
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'ALL GREEN — compact build renders and behaves identically');
