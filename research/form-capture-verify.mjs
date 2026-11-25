/* form-capture-verify.mjs — prove HighLevel's tracking script actually picks up
   the site's forms: the "Try us for 30 days" pop-up's flow (/start/<studio>/), contact and check-in.

   Serves the built site locally, loads the REAL external-tracking.js, then
   submits the form and inspects the FORM_SUBMISSION event the tracker tries to
   send. The POST to backend.leadconnectorhq.com is captured and ABORTED, so the
   test never writes a contact into the live CRM. */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http';
import fs from 'fs';
import path from 'path';
process.env.NODE_EXTRA_CA_CERTS = '/root/.ccr/ca-bundle.crt';

const DIST = new URL('../app/dist', import.meta.url).pathname;
const BASE = '';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
                '.svg': 'image/svg+xml', '.json': 'application/json' };

const server = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  if (u.startsWith(BASE)) u = u.slice(BASE.length);
  let f = path.join(DIST, u);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  res.end(fs.readFileSync(f));
});
await new Promise(r => server.listen(8655, r));
const ORIGIN = 'http://localhost:8655' + BASE;

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  proxy: { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' },
});
const problems = [];

async function run(route, fill) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const events = [];
  await ctx.route('**/*', async r => {
    for (let i = 0; i < 4; i++) {
      try { return await r.fulfill({ response: await r.fetch() }); } catch {}
      await new Promise(x => setTimeout(x, 500));
    }
    await r.abort();
  });
  /* capture the tracker's payload, then abort so nothing reaches the real CRM */
  await ctx.route('**/external-tracking/events', async r => {
    try { events.push(JSON.parse(r.request().postData() || '{}')); } catch { events.push({ unparsed: true }); }
    await r.abort();
  });
  /* the call step's API: answered here, so no lookup or booking reaches GHL */
  await ctx.route('**/api/**', r => r.fulfill({ json: { ok: true, id: 'k', token: 't', days: [] } }));
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(ORIGIN + route, { waitUntil: 'load' });
  await p.waitForSelector('form[id^=website-], form[id^=members-]', { state: 'attached' });
  await p.waitForTimeout(2500);            // let the tracker boot and scan
  const forms = await p.$$eval('form', fs => fs.map(f => f.getAttribute('id') || '(no id)'));
  await p.evaluate(() => {
    const f = document.querySelector('form[id^=website-], form[id^=members-]');
    f.addEventListener('submit', () => {
      const d = {}; new FormData(f).forEach((v, k) => { d[k] = String(v); });
      window.__snap = { data: d, connected: f.isConnected };
    }, { capture: true });
  });
  const before = events.length;
  await fill(p);
  await p.waitForTimeout(1400);   // stay ahead of the success-state redirect
  let snap = null;
  try { snap = await p.evaluate(() => window.__snap || null); } catch {}
  const isSub = x => /form_submission/i.test(String(x && x.type));
  const subs = events.slice(before).filter(e => (e.events ? e.events.some(isSub) : isSub(e)));
  await ctx.close();
  return { subs, errs, forms, snap, all: events.slice(before) };
}

/* the pop-up's flow page: three answers, the details, and (info) message or call */
const start = async p => {
  for (let i = 0; i < 3; i++) { await p.click('fieldset:not([hidden]) .sf-opt'); await p.waitForTimeout(450); }
  await p.fill('#f-first', 'Verify'); await p.fill('#f-last', 'Harness');
  await p.fill('#f-email', 'harness@example.invalid'); await p.fill('#f-phone', '+44 7700 900123');
  await p.click('.js-details:visible');
  await p.waitForTimeout(400);
  if (await p.isVisible('[data-step="prefer"]')) await p.click('[data-step="prefer"] .sf-opt >> nth=0');
};

const checkin = async p => {
  await p.fill('#ci-name', 'Verify Harness');
  await p.fill('#ci-email', 'harness@example.invalid');
  await p.fill('#ci-phone', '+44 7700 900123');
  await p.selectOption('#ci-location', 'Hackney');
  await p.fill('#ci-msg', 'automated check - do not action');
  await p.check('input[name=confirm]');
  await p.click('form#members-check-in-all-sites button[type=submit]');
};

const contact = async p => {
  await p.fill('#c-name', 'Verify Harness');
  await p.fill('#c-email', 'harness@example.invalid');
  await p.selectOption('#c-location', 'Hackney');
  await p.fill('#c-msg', 'automated check - do not action');
  await p.click('form#website-contact-all-sites button[type=submit]');
};

for (const [label, route, fill] of [
  ['pop-up, speak', '/start/south-woodford/?path=speak', start],
  ['pop-up, info', '/start/hackney/?path=info', start],
  ['contact', '/contact/', contact],
  ['check-in', '/members/check-in/', checkin],
]) {
  const r = await run(route, fill);
  if (r.forms.length !== 1) problems.push(`${label}: expected exactly 1 form on the page, found ${JSON.stringify(r.forms)}`);
  if (r.errs.length) problems.push(`${label}: page errors ${r.errs.join(' | ')}`);
  if (!r.subs.length) {
    problems.push(`${label}: NO form_submission event captured (saw ${JSON.stringify(r.all).slice(0, 400)})`);
    continue;
  }
  const ev = r.subs[0].events ? r.subs[0].events.find(x => /form_submission/i.test(String(x.type))) : r.subs[0];
  console.log(`\n=== ${label} ${route} ===`);
  console.log('  formId    :', ev.formId);
  console.log('  formData  :', JSON.stringify(ev.formData));
  console.log('  labels    :', JSON.stringify(ev.formLabels));
  console.log('  forms here:', JSON.stringify(r.forms));
  console.log('  FormData at capture:', JSON.stringify(r.snap));
  const fd = ev.formData || {};
  const need = label === 'contact' ? ['first_name', 'email', 'message']
    : label === 'check-in' ? ['first_name', 'email', 'phone', 'message']
    : ['first_name', 'last_name', 'email', 'phone', 'enquiry_sounds_like_me', 'enquiry_win', 'enquiry_start', 'enquiry_path', 'enquiry_ad'];
  for (const k of need) {
    if (!fd[k]) problems.push(`${label}: field "${k}" missing from formData`);
  }
  /* the pop-up's studio is its page's own tracker (only that studio's GHL), so it carries no location field */
  if (!label.startsWith('pop-up') && !fd.location) problems.push(`${label}: field "location" missing from formData`);
  if (!ev.formId || ev.formId === 'Unidentified Form') problems.push(`${label}: form not identified`);
}

await browser.close();
server.close();
console.log(problems.length ? '\nPROBLEMS:\n' + problems.join('\n') : '\nALL GREEN — the tracking script captures every form');
