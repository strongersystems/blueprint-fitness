# compact/ — paste-ready build for AI Studio Builder

Same site as `site/`, repackaged for builders that accept only HTML + CSS
files and cap file size. **Every file is under 50,000 characters.**

| File | Characters |
|---|---|
| `styles.css` | 40,772 |
| `kickstart.html` | 38,598 |
| `index.html` | 30,718 |
| `team.html` | 23,999 |
| `locations.html` | 23,654 |
| `next-steps.html` | 22,009 |
| `contact.html` | 21,202 |

## How it differs from `site/`

- **One shared stylesheet.** `css/main.css` → minified `styles.css`, linked
  as `href="styles.css"` (flat, no folder).
- **JavaScript is inlined.** The motion kit is minified and dropped into a
  `<script>` at the end of each page, so there are no `.js` files to upload.
- **Assets are absolute URLs — no base64.** Every image, video and font
  points at the live deploy, e.g.
  `https://blueprint-fitness.higgsfield.app/img/bf-coach-bench.jpg`.
  Nothing to upload; the pages render standalone anywhere.
- Comments and indentation stripped. No content, styling or behaviour was
  removed — only whitespace.

## Pasting order

Create `styles.css` first, then the six pages. Keep the filenames exactly as
they are — the nav links between pages use them.

## Regenerating

`site/` stays the source of truth. After any change there:

```bash
node research/build-compact.mjs    # rebuilds compact/, enforces the 50k cap
node research/verify-compact.mjs   # renders it, checks assets/interactions
```

`verify-compact.mjs` asserts the real things: no console errors, no
horizontal overflow at 1440/390/360, no broken images, the Anton webfont
actually loads, and the full signup-lightbox funnel still works.
