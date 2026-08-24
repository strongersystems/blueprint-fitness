import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'fs';

const BASE = 'http://localhost:8642';
const PAGES = ['index.html', 'kickstart.html', 'next-steps.html', 'locations.html', 'team.html', 'contact.html',
  'members.html', 'check-in.html', 'bookings-cancellations.html', 'terms.html', 'cancel.html'];
const VIEWPORTS = [
  ['1440', { width: 1440, height: 900 }],
  ['390', { width: 390, height: 844 }],
  ['360', { width: 360, height: 780 }],
];

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const outDir = process.argv[2] || 'qa-shots';
fs.mkdirSync(outDir, { recursive: true });
let problems = [];

for (const [vpName, vp] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  /* no proxy in this harness: fail Google Fonts fast so pending stylesheets never stall deferred scripts */
  await ctx.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  await ctx.route('https://fonts.gstatic.com/**', r => r.abort());

  for (const p of PAGES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
    const failed = [];
    page.on('requestfailed', r => { if (r.url().startsWith('http://localhost')) failed.push(r.url() + ' :: ' + (r.failure()?.errorText || '')); });
    await page.goto(`${BASE}/${p}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(e => errors.push('GOTO: ' + e.message));
    await page.waitForTimeout(600);
    // scroll through to trigger scroll-driven bits, then back to top
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += 400) { window.scrollTo({top: y, behavior: 'instant'}); await new Promise(r => setTimeout(r, 130)); }
      window.scrollTo({top: 0, behavior: 'instant'});
    });
    await page.waitForTimeout(700);
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      const bad = [];
      if (sw > docW + 1) {
        document.querySelectorAll('body *').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > 1 && (r.right > docW + 6 || r.left < -6)) {
            const cls = (typeof el.className === 'string' ? el.className : '').slice(0, 40);
            bad.push(`${el.tagName}.${cls} right=${Math.round(r.right)} left=${Math.round(r.left)}`);
          }
        });
      }
      return { docW, sw, bad: bad.slice(0, 8) };
    });
    await page.screenshot({ path: `${outDir}/${p.replace('.html', '')}-${vpName}.png`, fullPage: true, animations: 'disabled' });
    const name = `${p}@${vpName}`;
    if (errors.length) problems.push(`${name} CONSOLE: ${errors.join(' | ')}`);
    if (failed.length) problems.push(`${name} REQFAIL: ${failed.join(' | ')}`);
    if (overflow.sw > overflow.docW + 1) problems.push(`${name} OVERFLOW: scrollW=${overflow.sw} docW=${overflow.docW} :: ${overflow.bad.join(' ; ')}`);
    await page.close();
  }
  await ctx.close();
}

// ---- interaction tests at 390 ----
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  await ctx.route('https://fonts.gstatic.com/**', r => r.abort());

const page = await ctx.newPage();
const ierr = [];
page.on('pageerror', e => ierr.push(e.message));

// burger open/close
await page.goto(`${BASE}/index.html`, { waitUntil: 'load' });
await page.click('.burger');
await page.waitForTimeout(500);
const menuOpen = await page.$eval('.mobile-menu', el => el.classList.contains('open'));
const burgerAbove = await page.evaluate(() => {
  const b = document.querySelector('.burger');
  const r = b.getBoundingClientRect();
  const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  return el === b || b.contains(el);
});
await page.click('.burger');
await page.waitForTimeout(450);
const menuClosed = await page.$eval('.mobile-menu', el => !el.classList.contains('open'));
if (!menuOpen) problems.push('interaction: burger did not open menu');
if (!burgerAbove) problems.push('interaction: burger is NOT clickable above overlay when open');
if (!menuClosed) problems.push('interaction: burger did not close menu');

// FAQ accordion
await page.goto(`${BASE}/kickstart.html`, { waitUntil: 'load' });
await page.$eval('.faq-item button', b => b.click());
await page.waitForTimeout(500);
const faqOpen = await page.$eval('.faq-item', el => el.classList.contains('open') && el.querySelector('.faq-a').getBoundingClientRect().height > 10);
if (!faqOpen) problems.push('interaction: FAQ did not expand');

// signup lightbox: opens from hero CTA + form validation + funnel advance
await page.click('.hero .btn-primary');
await page.waitForTimeout(500);
const modalShown = await page.$eval('.signup-overlay', el => !el.hidden && el.classList.contains('show'));
if (!modalShown) problems.push('interaction: "Try us for 30 days" did not open the signup lightbox');
// Esc closes, reopen from sticky/other CTA
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
const modalClosed = await page.$eval('.signup-overlay', el => el.hidden);
if (!modalClosed) problems.push('interaction: Escape did not close the lightbox');
await page.click('#register .btn-primary');
await page.waitForTimeout(500);
// invalid submit
await page.click('.signup-modal form button[type=submit]');
await page.waitForTimeout(300);
const invalidCount = await page.$$eval('.signup-modal .field.invalid', els => els.length);
if (invalidCount === 0) problems.push('interaction: lightbox validation showed no inline errors on empty submit');
// fill and submit
await page.fill('#su-name', 'Test Person');
await page.fill('#su-email', 'test@example.com');
await page.fill('#su-phone', '+44 7700 900123');
await page.selectOption('#su-loc', 'Leytonstone');
await page.click('.signup-modal form button[type=submit]');
await page.waitForTimeout(500);
const successShown = await page.$eval('#signup-success', el => el.classList.contains('show'));
if (!successShown) problems.push('interaction: lightbox success state not shown');
await page.waitForURL('**/next-steps.html', { timeout: 6000 }).catch(() => problems.push('interaction: funnel did NOT auto-advance to next-steps'));

// "Try us for 30 days" elsewhere NAVIGATES to the kickstart page (no lightbox)
await page.goto(`${BASE}/index.html`, { waitUntil: 'load' });
await page.click('.hero .btn-primary');
await page.waitForURL('**/kickstart.html*', { timeout: 4000 }).catch(() => problems.push('interaction: home hero "Try us for 30 days" did not navigate to kickstart'));
const strayModal = await page.$eval('.signup-overlay', el => el.hidden).catch(() => true);
if (!strayModal) problems.push('interaction: lightbox opened on navigation CTA (should only open on "Tap to get started")');

// video-testimonial lightbox (member stories)
await page.goto(`${BASE}/index.html`, { waitUntil: 'load' });
await page.$eval('.vt-card', c => c.scrollIntoView({ behavior: 'instant', block: 'center' }));
await page.waitForTimeout(400);
await page.click('.vt-card');
await page.waitForTimeout(500);
const vtOpen = await page.$eval('.vt-overlay', el => !el.hidden && el.classList.contains('show'));
if (!vtOpen) problems.push('interaction: video card did not open the player lightbox');
const vtSrc = await page.$eval('.vt-overlay video', v => v.getAttribute('src') || '');
if (!vtSrc.includes('vt-')) problems.push('interaction: player has no video src');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
const vtClosed = await page.$eval('.vt-overlay', el => el.hidden);
if (!vtClosed) problems.push('interaction: Escape did not close the video lightbox');

// sticky CTA visibility after scrolling on kickstart
await page.goto(`${BASE}/kickstart.html`, { waitUntil: 'load' });
await page.evaluate(() => window.scrollTo(0, 2200));
await page.waitForTimeout(600);
const stickyShown = await page.$eval('.sticky-cta', el => el.classList.contains('show'));
if (!stickyShown) problems.push('interaction: sticky mobile CTA did not appear');

// contact form validation
await page.goto(`${BASE}/contact.html`, { waitUntil: 'load' });
await page.click('form[data-placeholder-form] button[type=submit]');
const cInvalid = await page.$$eval('.field.invalid', els => els.length);
if (cInvalid === 0) problems.push('interaction: contact form validation missing');

// reduced motion sanity: content visible without JS-driven motion
const rmCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await rmCtx.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  await rmCtx.route('https://fonts.gstatic.com/**', r => r.abort());

const rmPage = await rmCtx.newPage();
await rmPage.goto(`${BASE}/index.html`, { waitUntil: 'load' });
await rmPage.waitForTimeout(800);
const rmVisible = await rmPage.evaluate(() => {
  const el = document.querySelector('[data-ignite] .w');
  return el ? getComputedStyle(el).opacity === '1' : false;
});
if (!rmVisible) problems.push('reduced-motion: ignite words not fully visible');
await rmPage.screenshot({ path: `${outDir}/index-reduced-motion.png`, fullPage: false });
await rmCtx.close();

if (ierr.length) problems.push('interaction JS errors: ' + ierr.join(' | '));

console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'ALL CLEAN');
await browser.close();
