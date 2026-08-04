# Lite builds — for size-limited site builders

The six pages here are the same pages as the full build in `../site/`,
packaged to fit paste-in limits (e.g. an AI site builder's 50,000-character
cap). Nothing is inlined — **the HTML is the only thing you paste.**

| Page | Characters |
|---|---|
| `index.html` | 17,366 |
| `kickstart.html` | 25,246 |
| `team.html` | 10,647 |
| `locations.html` | 10,302 |
| `next-steps.html` | 8,657 |
| `contact.html` | 7,850 |

Instead of inlining, they load:

- **Fonts** from Google Fonts (Anton, Montserrat, Caveat — the same trio the
  client's own site uses).
- **Photography and video** from the Higgsfield CDN
  (`https://blueprint-fitness.higgsfield.app/img/…` and `/video/…`) —
  permanent URLs, no base64 anywhere.
- **Shared CSS/JS** (`blueprint.min.css` / `blueprint.min.js`) from the same
  CDN — minified copies of the design system and motion kit extracted from
  `../site/css/main.css` and `../site/js/main.js`.
- **Maps** from Google Maps embeds (three studio pins).

If any asset host is unreachable the pages degrade gracefully: system fonts
for webfonts, posters for videos, and the layout holds because the shared
stylesheet is a single request.

The sign-up form is a front-end placeholder — it validates, shows a "Plan
approved" state and redirects, but sends nothing.

## Page slugs

The six pages link to each other as `index.html`, `kickstart.html`,
`locations.html`, `team.html`, `next-steps.html` and `contact.html`. If your
site builder uses different slugs, update those hrefs — the header nav and
call-to-action buttons on every page, plus the studio anchors
(`locations.html#south-woodford`, `#leytonstone`, `#hackney`) and the
sign-up redirect to `next-steps.html`.

Two button labels are wired to different behaviour and shouldn't be
reworded: **"Try us for 30 days"** navigates to `kickstart.html`, and
**"Tap to get started"** (kickstart page only) opens the sign-up lightbox.

## Regenerating

`node ../research/build-compact.mjs` rewrites these pre-minified files from
`../site/` and enforces the 50,000-character cap. Verify with
`node ../research/verify-compact.mjs` — it renders every page, checks for
console errors, horizontal overflow at 1440/390/360, broken images and a
loaded webfont, then drives the sign-up funnel end to end.

`blueprint.min.css` / `blueprint.min.js` are also written here, but the
copies the pages actually load are the ones **on the CDN** — they are
snapshots, not live references. If the shared CSS/JS changes, copy the new
files into the deploy repo's `app/public/` and redeploy, or the lite pages
will keep loading the old ones.
