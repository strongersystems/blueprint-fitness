/* build-compact.mjs — "lite" build for size-limited site builders.
   Same pattern as the Brigade Retreat / Real Life Fitness lite builds:
   nothing is inlined and there are NO files to paste except the pages.
   Each page loads shared minified CSS/JS + photography from the
   Higgsfield CDN, and fonts from Google Fonts.                         */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const SRC = '/workspace/blueprint-fitness/site';
const OUT = '/workspace/blueprint-fitness/lite';
const BIN = '/tmp/claude-0/-home-user-Stronger-Systems-Sites/7b94fbc0-5e63-5761-b0b1-15628e62fc8e/scratchpad/node_modules/.bin';
const CDN = 'https://blueprint-fitness.higgsfield.app';
const SHARED_CSS_URL = `${CDN}/blueprint.min.css`;
const SHARED_JS_URL = `${CDN}/blueprint.min.js`;
const GFONTS = 'https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@400..700&family=Montserrat:wght@100..900&display=swap';
const LIMIT = 50000;
const PAGES = ['index.html', 'kickstart.html', 'next-steps.html', 'locations.html', 'team.html', 'contact.html'];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

/* ---------- shared CSS: drop @font-face (Google Fonts serves them), minify ---------- */
let css = fs.readFileSync(path.join(SRC, 'css/main.css'), 'utf8');
css = css.replace(/@font-face\{[^}]*\}\s*/g, '');
if (/@font-face/.test(css)) throw new Error('a @font-face block survived');
const tmpCss = path.join(OUT, '.tmp.css');
fs.writeFileSync(tmpCss, css);
const cssMin = execFileSync(path.join(BIN, 'csso'), [tmpCss], { encoding: 'utf8', maxBuffer: 1 << 26 });
fs.writeFileSync(path.join(OUT, 'blueprint.min.css'), cssMin);
fs.rmSync(tmpCss);

/* ---------- shared JS ---------- */
const jsMin = execFileSync(path.join(BIN, 'esbuild'), [path.join(SRC, 'js/main.js'), '--minify'],
  { encoding: 'utf8', maxBuffer: 1 << 26 }).trim();
fs.writeFileSync(path.join(OUT, 'blueprint.min.js'), jsMin);

/* ---------- pages ---------- */
const HEAD_LINKS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  `<link rel="stylesheet" href="${GFONTS}">` +
  `<link rel="stylesheet" href="${SHARED_CSS_URL}">`;

function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>[ \t]*\r?\n\s*</g, '><')   // indentation between tags
    .replace(/[ \t]*\r?\n\s*/g, ' ')      // newlines inside text -> one space
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

const report = [];
for (const page of PAGES) {
  let html = fs.readFileSync(path.join(SRC, page), 'utf8');

  // photography / video / favicons -> CDN
  html = html.replace(/((?:src|href|poster)=")(img|video)\//g, `$1${CDN}/$2/`);
  html = html.replace(/url\((['"]?)(img|video)\//g, `url($1${CDN}/$2/`);

  // self-hosted font preloads -> Google Fonts + shared stylesheet
  html = html.replace(/<link rel="preload" href="fonts\/[^>]*>\s*/g, '');
  html = html.replace(/<link rel="stylesheet" href="css\/main\.css">/, HEAD_LINKS);

  html = minifyHtml(html);

  // shared script from the CDN (kept as an external file, nothing inlined)
  const TOKEN = '<script src="js/main.js" defer></script>';
  if (!html.includes(TOKEN)) throw new Error(`${page}: script tag not found`);
  html = html.replace(TOKEN, `<script src="${SHARED_JS_URL}" defer></script>`);

  if (/(src|href)="(img|video|fonts|css|js)\//.test(html)) throw new Error(`${page}: relative asset ref left`);
  fs.writeFileSync(path.join(OUT, page), html);
  report.push([page, html.length]);
}
report.push(['blueprint.min.css (CDN)', cssMin.length], ['blueprint.min.js (CDN)', jsMin.length]);

let bad = 0;
for (const [f, n] of report) {
  const over = n > LIMIT && f.endsWith('.html');
  if (over) bad++;
  console.log(`${over ? 'OVER' : 'OK  '} ${String(n).padStart(6)}  ${f}`);
}
console.log(bad ? `\n${bad} page(s) OVER ${LIMIT}` : `\nall pages within ${LIMIT} chars`);
