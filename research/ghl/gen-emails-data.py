"""Turn the raw workflow extraction into a site data file.

Email bodies are 8-15KB of table-layout HTML each; 196 of them is well over a
megabyte, and the /admin page encrypts its whole contents at build time. So the
copy is reduced to readable text here — headings, paragraphs and list items kept
as lines, merge fields left visible — and the links are pulled out separately so
they can be checked rather than hunted for."""
import json, re, sys, html, urllib.parse

src, dst = sys.argv[1], sys.argv[2]
d = json.load(open(src))

BLOCK = re.compile(r'</(p|div|tr|td|h[1-6]|li|table|br)\s*>|<br\s*/?>', re.I)
TAG = re.compile(r'<[^>]+>')
PLUMB = ('firebasestorage', 'storage.googleapis', 'msgsndr', 'w3.org',
         'schemas.microsoft', 'fonts.googleapis', 'fonts.gstatic', 'filesafe.space')

def to_text(body: str) -> str:
    if not body:
        return ''
    s = re.sub(r'<(script|style|head)[^>]*>.*?</\1>', ' ', body, flags=re.S | re.I)
    s = BLOCK.sub('\n', s)
    s = TAG.sub('', s)
    s = html.unescape(s)
    s = s.replace('‌', '').replace('\xa0', ' ')
    lines = [re.sub(r'[ \t]+', ' ', ln).strip() for ln in s.split('\n')]
    out, seen_blank = [], False
    for ln in lines:
        if not ln:
            seen_blank = True
            continue
        if seen_blank and out:
            out.append('')
        seen_blank = False
        out.append(ln)
    return '\n'.join(out).strip()

HREF = re.compile(r'href\s*=\s*["\']([^"\']+)["\']', re.I)
def links(body: str):
    found = []
    for u in HREF.findall(body or ''):
        u = u.strip().replace('&amp;', '&')
        if not u.startswith('http'):
            continue
        if any(p in u for p in PLUMB):
            continue
        if u not in found:
            found.append(u)
    return found

# link health, resolved once by host/path
KNOWN_BAD = {
    'www.blueprintfitnessldn.com/nutrition-coaching': 'redirected',
    'www.blueprintfitnessldn.com/nutrition-series-videos': 'redirected',
    'www.blueprintfitnessldn.com/teamup': 'redirected',
}
def health(u: str) -> str:
    p = urllib.parse.urlparse(u)
    key = (p.netloc + p.path).lower().rstrip('/')
    if key in KNOWN_BAD:
        return KNOWN_BAD[key]
    if p.netloc.lower().startswith('go.blueprintfitness'):
        return 'legacy'
    return 'ok'

wfs = []
for w in d['out']:
    steps = []
    for s in w['steps']:
        ls = [{'url': u, 'health': health(u)} for u in links(s['body'])]
        steps.append({
            'type': s['type'], 'name': s['name'], 'subject': s['subject'],
            'from': s['from'], 'template': s['tplName'],
            'missing': bool(s['templateMissing']),
            'text': to_text(s['body']), 'links': ls,
        })
    wfs.append({'studio': w['studio'], 'workflow': w['workflow'], 'folder': w['folder'],
                'status': w['status'], 'triggers': w['triggers'], 'steps': steps})

wfs.sort(key=lambda w: (w['studio'], w['workflow']))
payload = json.dumps(wfs, ensure_ascii=False, indent=1)

open(dst, 'w').write(
    "/**\n"
    " * Every message sent by a GoHighLevel workflow, across the three studios.\n"
    " *\n"
    " * GENERATED — do not edit by hand. Regenerate with\n"
    " *   research/ghl/extract-workflow-copy.mjs  (pulls from the three sub-accounts)\n"
    " *   research/ghl/gen-emails-data.py         (reduces it to this file)\n"
    " *\n"
    " * Email bodies are stored as readable text rather than their original\n"
    " * table-layout HTML: the /admin page encrypts its whole contents at build\n"
    " * time, and a megabyte of markup nobody reads is not worth encrypting.\n"
    " * Links are kept separately so they can be audited at a glance.\n"
    " */\n"
    "export type LinkHealth = 'ok' | 'legacy' | 'redirected';\n"
    "export interface WfLink { url: string; health: LinkHealth }\n"
    "export interface WfStep {\n"
    "  type: 'email' | 'sms' | 'internal_notification';\n"
    "  name: string; subject: string; from: string;\n"
    "  template: string | null; missing: boolean;\n"
    "  text: string; links: WfLink[];\n"
    "}\n"
    "export interface WfEntry {\n"
    "  studio: string; workflow: string; folder: string; status: string;\n"
    "  triggers: string[]; steps: WfStep[];\n"
    "}\n\n"
    "export const workflowMessages: WfEntry[] = " + payload + ";\n"
)
n = sum(len(w['steps']) for w in wfs)
print(f"{len(wfs)} workflows, {n} messages, {len(payload)/1024:.0f} KB")
