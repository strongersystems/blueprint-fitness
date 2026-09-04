/* form-capture-verify.mjs — prove HighLevel's tracking script actually picks up
   the React enquiry form.

   Serves the built site locally, loads the REAL external-tracking.js, then
   submits the form and inspects the FORM_SUBMISSION event the tracker tries to
   send. The POST to backend.leadconnectorhq.com is captured and ABORTED, so the
   test never writes a contact into the live CRM. */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import http from 'http';
import fs from 'fs';
import path from 'path';
process.env.NODE_EXTRA_CA_CERTS = '/root/.ccr/ca-bundle.crt';

const DIST = '/workspace/blueprint-fitness/app/dist';
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
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
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

const good = async p => {
  /* the enquiry form now lives in a lightbox: open it first */
  const trig = await p.$('[data-enquiry-trigger]');
  if (trig) { await trig.click(); await p.waitForTimeout(500); }
  await p.fill('#eq-name', 'Verify Harness');
  await p.fill('#eq-email', 'harness@example.invalid');
  await p.fill('#eq-phone', '+44 7700 900123');
  const loc = await p.$('select#eq-loc');
  if (loc) await p.selectOption('#eq-loc', 'Hackney');
  await p.fill('#eq-msg', 'automated check - do not action');
  await p.check('input[name=confirm]');
  await p.click('form[id^=website-] button[type=submit], form[id^=members-] button[type=submit]');
};
const empty = async p => {
  const trig = await p.$('[data-enquiry-trigger]');
  if (trig) { await trig.click(); await p.waitForTimeout(500); }
  await p.click('form[id^=website-] button[type=submit], form[id^=members-] button[type=submit]');
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
  ['main site', '/kickstart/', good],
  ['studio page', '/hackney/kickstart/', good],
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
  const need = label === 'contact' ? ['name', 'email', 'message'] : ['name', 'email', 'phone', 'message'];
  for (const k of need) {
    if (!fd[k]) problems.push(`${label}: field "${k}" missing from formData`);
  }
  if (!fd.location) problems.push(`${label}: field "location" missing from formData`);
  if (!ev.formId || ev.formId === 'Unidentified Form') problems.push(`${label}: form not identified`);
}

/* how the tracker behaves on a click that fails our validation */
const inv = await run('/kickstart/', empty);
console.log('\n=== empty submit on /kickstart/ ===');
console.log('  form_submission events:', inv.subs.length,
            inv.subs.length ? JSON.stringify((inv.subs[0].events ? inv.subs[0].events.find(x => /form_submission/i.test(String(x.type))) : inv.subs[0]).formData) : '');

await browser.close();
server.close();
console.log(problems.length ? '\nPROBLEMS:\n' + problems.join('\n') : '\nALL GREEN — the tracking script captures the enquiry form');
