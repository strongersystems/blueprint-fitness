/* build-pack.mjs — AI Studio import pack (single-file pastes).
   Each page is ONE self-contained file: HTML + inline CSS + inline JS.
   CSS is subset per page (PurgeCSS-style token matching against that
   page's markup plus the shared JS), so pages carry only what they use.
   Any page still over the limit ships as exactly two pastes: its
   HTML+JS, and its stylesheet.
   Everything is TSX-safe by construction — the build FAILS if any
   output file contains a backtick, a ${ sequence, or a backslash.     */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import postcss from '/tmp/claude-0/-home-user-Stronger-Systems-Sites/7b94fbc0-5e63-5761-b0b1-15628e62fc8e/scratchpad/node_modules/postcss/lib/postcss.mjs';

const SRC = '/workspace/blueprint-fitness/site';
const OUT = '/workspace/blueprint-fitness/import-pack';
const BIN = '/tmp/claude-0/-home-user-Stronger-Systems-Sites/7b94fbc0-5e63-5761-b0b1-15628e62fc8e/scratchpad/node_modules/.bin';
/* asset host: GitHub Pages deploy of site/ — updates on every push to main.
   (Switch back to the Higgsfield URL — or a custom domain — in one edit here.) */
const CDN = 'https://strongersystems.github.io/blueprint-fitness';
const LIMIT = 50000;

/* paste file -> pretty route */
const ROUTES = {
  'index.html': '/',
  'kickstart.html': '/kickstart',
  'next-steps.html': '/next-steps',
  'locations.html': '/locations',
  'contact.html': '/contact',
  'members.html': '/members',
  'check-in.html': '/check-in',
  'bookings-cancellations.html': '/bookings-cancellations',
  'terms.html': '/terms',
  'cancel.html': '/cancel',
  'nutrition-request.html': '/nutrition-request',
};
const PAGES = Object.keys(ROUTES);

/* preserve the hand-written README.txt across rebuilds */
const readmePath = path.join(OUT, 'README.txt');
const readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath) : null;
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
if (readme) fs.writeFileSync(readmePath, readme);

/* ---------- shared CSS + JS ---------- */
let cssSrc = fs.readFileSync(path.join(SRC, 'css/main.css'), 'utf8').replace(/@font-face\{[^}]*\}\s*/g, '');
const tmp = path.join(OUT, '.tmp.css');
fs.writeFileSync(tmp, cssSrc);
const CSS_MIN = execFileSync(path.join(BIN, 'csso'), [tmp], { encoding: 'utf8', maxBuffer: 1 << 26 });
fs.rmSync(tmp);

let JS_MIN = execFileSync(path.join(BIN, 'esbuild'),
  /* es5 target: stops the minifier rewriting concatenation into template
     literals (backticks). utf8 charset: stops it emitting \uXXXX escapes. */
  [path.join(SRC, 'js/main.js'), '--minify', '--charset=utf8', '--target=es5'],
  { encoding: 'utf8', maxBuffer: 1 << 26 }).trim();
/* the sign-up modal is built in JS: its link AND its data-advance redirect
   target both carry the page filename, so route them too */
JS_MIN = JS_MIN.split('next-steps.html').join('/next-steps');

/* ---------- CSS subsetting ---------- */
const IDENT = /[A-Za-z0-9_-]+/g;
function tokensOf(text) { return new Set(text.match(IDENT) || []); }

/* identifiers a selector *requires* (classes, ids, attribute names) */
function selectorNeeds(sel) {
  const need = [];
  for (const m of sel.matchAll(/\.(-?[A-Za-z_][A-Za-z0-9_-]*)/g)) need.push(m[1]);
  for (const m of sel.matchAll(/#(-?[A-Za-z_][A-Za-z0-9_-]*)/g)) need.push(m[1]);
  for (const m of sel.matchAll(/\[\s*([A-Za-z_][A-Za-z0-9_-]*)/g)) need.push(m[1]);
  return need;
}

function subset(cssText, tokens) {
  const root = postcss.parse(cssText);
  const usedAnim = new Set();

  root.walkRules(rule => {
    if (rule.parent && rule.parent.type === 'atrule' && /keyframes/i.test(rule.parent.name)) return;
    const keep = rule.selectors.filter(sel => selectorNeeds(sel).every(t => tokens.has(t)));
    if (!keep.length) { rule.remove(); return; }
    rule.selectors = keep;
    rule.walkDecls(/^(animation|animation-name)$/, d => {
      d.value.split(/[,\s]+/).forEach(v => usedAnim.add(v));
    });
  });

  /* drop keyframes nobody references, then empty at-rules */
  root.walkAtRules(/keyframes/i, at => { if (!usedAnim.has(at.params)) at.remove(); });
  let pruned = true;
  while (pruned) {
    pruned = false;
    root.walkAtRules(at => {
      if (/keyframes|font-face|import|charset/i.test(at.name)) return;
      if (at.nodes && at.nodes.length === 0) { at.remove(); pruned = true; }
    });
  }
  return root.toResult().css;
}

/* ---------- assemble ---------- */
function prettify(html) {
  for (const [file, route] of Object.entries(ROUTES)) {
    html = html.split(`href="${file}"`).join(`href="${route}"`);
    html = html.split(`href="${file}#`).join(`href="${route}#`);
  }
  return html.replace(/data-advance="next-steps\.html"/g, 'data-advance="/next-steps"');
}

function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>[ \t]*\r?\n\s*</g, '><')
    .replace(/[ \t]*\r?\n\s*/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

/* pages carry their own Google Fonts links in <head> now — nothing to add */
const HEAD = '';

const jsTokens = tokensOf(fs.readFileSync(path.join(SRC, 'js/main.js'), 'utf8'));
const report = [];

for (const page of PAGES) {
  let html = fs.readFileSync(path.join(SRC, page), 'utf8');
  html = html.replace(/((?:src|href|poster|data-src|data-captions|data-poster)=")(img|video)\//g, `$1${CDN}/$2/`);
  html = html.replace(/url\((['"]?)(img|video)\//g, `url($1${CDN}/$2/`);
  html = prettify(html);
  html = minifyHtml(html);

  const tokens = new Set([...tokensOf(html), ...jsTokens]);
  const pageCss = subset(CSS_MIN, tokens);

  const single = html
    .replace('<link rel="stylesheet" href="css/main.css">', `${HEAD}<style>${pageCss}</style>`)
    .replace('<script src="js/main.js" defer></script>', `<script>${JS_MIN}</script>`);

  if (single.length <= LIMIT) {
    fs.writeFileSync(path.join(OUT, page), single);
    report.push([page, single.length, 'HTML + inline CSS + inline JS']);
  } else {
    const cssName = page.replace(/\.html$/, '.css');
    const split = html
      .replace('<link rel="stylesheet" href="css/main.css">', `${HEAD}<link rel="stylesheet" href="${cssName}">`)
      .replace('<script src="js/main.js" defer></script>', `<script>${JS_MIN}</script>`);
    fs.writeFileSync(path.join(OUT, page), split);
    fs.writeFileSync(path.join(OUT, cssName), pageCss);
    report.push([page, split.length, 'HTML + inline JS'],
                [cssName, pageCss.length, `stylesheet (link'd as ${cssName})`]);
  }
}

/* ---------- guarantees ---------- */
const failures = [];
for (const [file, len] of report) {
  const text = fs.readFileSync(path.join(OUT, file), 'utf8');
  if (len > LIMIT) failures.push(`${file}: ${len} chars OVER ${LIMIT}`);
  if (text.includes('`')) failures.push(`${file}: contains a backtick`);
  if (text.includes('${')) failures.push(`${file}: contains \${`);
  if (text.includes(String.fromCharCode(92))) failures.push(`${file}: contains a backslash`);
  if (file.endsWith('.html') && text.split('<script>').length > 1 && /<\/script>/.test(text.split('<script>')[1].split('</script>')[0]))
    failures.push(`${file}: nested </script>`);
}

console.log('paste file          chars   contains');
for (const [f, n, what] of report) console.log(`${f.padEnd(20)}${String(n).padStart(6)}  ${what}`);
console.log(failures.length ? '\nFAILED:\n' + failures.join('\n') : '\nall files <= 50,000 and TSX-safe (no backtick, no ${, no backslash)');
if (failures.length) process.exit(1);
