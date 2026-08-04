/* build-compact.mjs — produce paste-ready HTML + CSS for AI Studio Builder.
   - assets referenced by absolute URL on the live deploy (no base64)
   - CSS minified to one shared styles.css
   - JS minified and inlined per page (so only .html/.css files are needed)
   - hard cap: 50,000 characters per file                                   */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const SRC = '/workspace/blueprint-fitness/site';
const OUT = '/workspace/blueprint-fitness/compact';
const BIN = '/tmp/claude-0/-home-user-Stronger-Systems-Sites/7b94fbc0-5e63-5761-b0b1-15628e62fc8e/scratchpad/node_modules/.bin';
const BASE = 'https://blueprint-fitness.higgsfield.app';
const LIMIT = 50000;
const PAGES = ['index.html', 'kickstart.html', 'next-steps.html', 'locations.html', 'team.html', 'contact.html'];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

/* ---------- 1. CSS: absolute font URLs, then minify ---------- */
let css = fs.readFileSync(path.join(SRC, 'css/main.css'), 'utf8');
css = css.replace(/url\(['"]?\.\.\/fonts\/([^'")]+)['"]?\)/g, `url(${BASE}/fonts/$1)`);
const cssRaw = path.join(OUT, '.tmp.css');
fs.writeFileSync(cssRaw, css);
const cssMin = execFileSync(path.join(BIN, 'csso'), [cssRaw], { encoding: 'utf8', maxBuffer: 1 << 26 });
fs.writeFileSync(path.join(OUT, 'styles.css'), cssMin);
fs.rmSync(cssRaw);

/* ---------- 2. JS: minify once, inline everywhere ---------- */
const jsRaw = path.join(OUT, '.tmp.js');
fs.copyFileSync(path.join(SRC, 'js/main.js'), jsRaw);
const jsMin = execFileSync(path.join(BIN, 'esbuild'), [jsRaw, '--minify'], { encoding: 'utf8', maxBuffer: 1 << 26 }).trim();
fs.rmSync(jsRaw);

/* ---------- 3. HTML ---------- */
function absolutise(html) {
  // src/href/poster="img|video|fonts/..."  ->  absolute
  html = html.replace(/((?:src|href|poster)=")(img|video|fonts)\//g, `$1${BASE}/$2/`);
  // url('img/...') inside inline styles
  html = html.replace(/url\((['"]?)(img|video)\//g, `url($1${BASE}/$2/`);
  // shared stylesheet name
  html = html.replace(/href="css\/main\.css"/g, 'href="styles.css"');
  return html;
}

/* Conservative: only *indentation* (whitespace containing a newline) is
   removed. Intentional single spaces between inline elements are authored
   without newlines, so they survive untouched. */
function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')        // comments
    .replace(/>[ \t]*\r?\n\s*</g, '><')     // tag-to-tag indentation -> nothing
    .replace(/[ \t]*\r?\n\s*/g, ' ')        // newlines inside text -> one space
    .replace(/[ \t]{2,}/g, ' ')             // runs of spaces -> one
    .trim();
}

const report = [];
for (const page of PAGES) {
  let html = fs.readFileSync(path.join(SRC, page), 'utf8');
  html = absolutise(html);
  // minify the MARKUP first, then drop the minified JS in verbatim — the
  // HTML minifier must never touch JS string literals.
  html = minifyHtml(html);
  const TOKEN = '<script src="js/main.js" defer></script>';
  if (!html.includes(TOKEN)) throw new Error(`${page}: script token not found`);
  html = html.replace(TOKEN, `<script>${jsMin}</script>`);
  fs.writeFileSync(path.join(OUT, page), html);
  report.push([page, html.length]);
}
report.push(['styles.css', cssMin.length]);

let bad = 0;
for (const [f, n] of report) {
  const ok = n <= LIMIT;
  if (!ok) bad++;
  console.log(`${ok ? 'OK ' : 'OVER'} ${String(n).padStart(6)}  ${f}`);
}
console.log(bad ? `\n${bad} file(s) OVER the ${LIMIT} limit` : `\nall files within ${LIMIT} chars`);
