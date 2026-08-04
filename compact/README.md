# Blueprint Fitness — build guide for AI Studio Builder

Step-by-step instructions for importing this site. Follow the steps in
order. **Read "Rules" before you start — most failures come from an
importer trying to improve the files rather than copy them.**

The site is a finished, signed-off build. Your job is to reproduce it
exactly, not to redesign it.

---

## 0. What you are building

A six-page static marketing site for Blueprint Fitness, a small-group
personal training business with three studios in East London (South
Woodford, Leytonstone, Hackney).

- Plain HTML + CSS + vanilla JavaScript. **No framework, no build step,
  no package manager, no bundler.**
- Seven files total: one stylesheet, six pages.
- Reference render: <https://blueprint-fitness.higgsfield.app> — compare
  against this if anything looks wrong.

---

## 1. Rules (read before importing)

1. **Copy each file verbatim.** Do not reformat, re-indent, re-order,
   "clean up" or rewrite any file. They are already minified.
2. **Do not rename files.** The pages link to each other by exact
   filename. Renaming breaks navigation.
3. **Do not rename or remove any class, `id`, or `data-` attribute.**
   The JavaScript finds elements by these names. See §6 for the list it
   depends on.
4. **Do not convert images to base64 and do not download the assets.**
   Every image, video and font is already an absolute URL. Leave them.
5. **Do not add a framework, CSS reset, normaliser, Tailwind, or
   component library.** The stylesheet is self-contained and expects to
   be the only stylesheet.
6. **Do not extract the inline `<script>` into a separate file** unless
   your platform requires it. If it does, extract it once to a shared
   file and link it from all six pages with `defer`.
7. **Do not change any copy, price, or number.** In particular the
   coaching ratio is **5:1** ("five people per coach") throughout — this
   was explicitly corrected by the client. Never write 6:1.
8. **Every file must stay under 50,000 characters.** Current sizes and
   headroom are in §2.

---

## 2. File manifest

Create these seven files at the **root level** of the project — a flat
structure, no subfolders.

| Order | File | Characters | Headroom to 50k |
|---|---|---|---|
| 1 | `styles.css` | 40,772 | 9,228 |
| 2 | `index.html` | 30,718 | 19,282 |
| 3 | `kickstart.html` | 38,598 | 11,402 |
| 4 | `locations.html` | 23,654 | 26,346 |
| 5 | `team.html` | 23,999 | 26,001 |
| 6 | `next-steps.html` | 22,009 | 27,991 |
| 7 | `contact.html` | 21,202 | 28,798 |

(Byte counts are 10–30 higher than character counts because the copy uses
UTF-8 punctuation — en dashes, curly quotes. That is correct and
intentional; do not replace them with ASCII.)

---

## 3. Step-by-step import

### Step 1 — create `styles.css`

Paste the whole of `styles.css` into a new file at the project root named
exactly `styles.css`. It contains the design tokens, layout, every
component, all responsive breakpoints, and the `prefers-reduced-motion`
fallbacks. Nothing else is needed for styling.

### Step 2 — create `index.html` (home page)

Paste `index.html` at the project root. Confirm the `<head>` still
contains this line, pointing at the flat filename:

```html
<link rel="stylesheet" href="styles.css">
```

### Step 3 — create the remaining five pages

In any order, each at the project root, each keeping its exact filename:

`kickstart.html`, `locations.html`, `team.html`, `next-steps.html`,
`contact.html`

Every page carries its own copy of the same minified JavaScript in a
`<script>` at the end of `<body>`. That is deliberate — it means no `.js`
file is required. Do not deduplicate it unless §1 rule 6 applies.

### Step 4 — set the home page

`index.html` is the entry point. If your platform asks for a start page,
choose `index.html`.

### Step 5 — verify

Work through the checklist in §7 before declaring the import finished.

---

## 4. Page map

| File | Purpose |
|---|---|
| `index.html` | Home. Hero, brand manifesto, stat band, services, why-it-works, member quote, testimonials, photo strip, studio cards with maps, closing CTA. |
| `kickstart.html` | The conversion funnel — the 30-Day Kickstart offer. Distraction-light header (brand + label only, no nav). Hero, what's included, 30-day journey, timetable, "is this you?" survey, value section, testimonials, FAQ, sign-up. |
| `locations.html` | The three studios in full — addresses, hours, emails, photos, embedded maps. |
| `team.html` | The coaching team, grouped by studio. |
| `next-steps.html` | Post-signup confirmation: what happens next, booking placeholder, reassurance. |
| `contact.html` | Per-studio contact details and a message form. |

### How the pages link

- The header nav (on all pages except `kickstart.html`) links to
  `index.html`, `locations.html`, `team.html`, `contact.html`.
- The header call-to-action button, **"Try us for 30 days"**, links to
  `kickstart.html` on every page.
- Studio links use anchors into `locations.html`:
  `locations.html#south-woodford`, `#leytonstone`, `#hackney`. Keep those
  `id` attributes on the studio sections.
- The sign-up form on `kickstart.html` redirects to `next-steps.html` on
  successful submit.

---

## 5. The two-step call-to-action system (important)

The buttons behave differently by design. Do not unify them.

- **"Try us for 30 days"** — appears site-wide, including the header. It
  is a normal link that **navigates to `kickstart.html`**.
- **"Tap to get started"** — appears **only on `kickstart.html`**. It
  **opens the sign-up lightbox** (a modal built by the JavaScript at
  runtime; it is not in the HTML).

The JavaScript decides which is which by reading the button's text. If
you change either label, that wiring breaks.

---

## 6. Names the JavaScript depends on

Do not rename or remove any of these. The script queries them directly.

**Structural classes:** `.hero`, `.burger`, `.mobile-menu`, `.companion`,
`.fillbar`, `.ruler .mark`, `.ruler .pct`, `.sticky-cta`, `.faq-item`,
`.faq-a`, `.journey`, `.journey-item`, `.journey-line .fill`,
`.plan-grid`, `.survey`, `.survey-item`, `.slot-chip`, `.ghost-num`,
`.draft-u`, `.ribbon .track`, `.photo-strip .strip-track`, `.field`,
`.btn-primary`, `.signup-close`

**Animation hooks:** `.reveal`, `.stagger`, `.sec-head`, `.plan-frame`,
`.anno-photo`, `.card[data-tilt]`

**Data attributes:** `data-ignite`, `data-count`, `data-suffix`,
`data-cta-sentinel`, `data-daycount`, `data-daycount-track`,
`data-placeholder-form`, `data-success`, `data-advance`,
`data-advance-count`, `data-slots`, `data-slot-line`,
`data-survey-verdict`, `data-label`, `data-tilt`

**IDs:** `main`, `mobile-menu`, `register`, `journey`, `benefits`,
`survey`, `value`, `booking`, `south-woodford`, `leytonstone`, `hackney`,
`south-woodford-team`, `leytonstone-team`, `hackney-team`,
`contact-success`, `c-name`, `c-email`, `c-location`, `c-msg`

---

## 7. Verification checklist

Open each page and confirm:

- [ ] **Fonts.** Headlines render in a heavy condensed sans (Anton), body
      text in Montserrat, handwritten notes in a script face (Caveat). If
      headlines look like Arial or Times, the font URLs are not loading —
      see §8.
- [ ] **Images.** Every photo appears. No broken-image icons, no empty
      boxes.
- [ ] **Maps.** Three dark-blue mini-maps on the home page studio cards,
      and larger maps on `locations.html`.
- [ ] **No overlapping text.** Headings must never sit on top of the
      paragraph beneath them. Check at 1440px, 1024px, 900px, 768px,
      390px and 360px wide. (An overlap means the fonts loaded after
      layout — see §8.)
- [ ] **No horizontal scrolling** at 360px wide.
- [ ] **Navigation.** Every header link reaches the right page; the
      burger menu opens and closes below 900px.
- [ ] **CTA behaviour.** "Try us for 30 days" navigates to
      `kickstart.html`. On `kickstart.html`, "Tap to get started" opens
      the lightbox.
- [ ] **The lightbox.** It opens with name, email, number and a studio
      dropdown. Submitting empty shows inline errors. Filling it in and
      submitting shows a "Plan approved" stamp and then redirects to
      `next-steps.html`.
- [ ] **FAQ** items expand and collapse on `kickstart.html`.
- [ ] **Scroll animations.** Section headings underline themselves,
      photos develop from blue to full colour, the 30-day counter tracks
      your scroll on `kickstart.html`.
- [ ] **Console is clean** — no red errors.

---

## 8. Troubleshooting

**Headlines overlap the text below them, or fall back to a default
font.** The webfonts are not loading. They are absolute URLs
(`https://blueprint-fitness.higgsfield.app/fonts/…`) referenced from
`@font-face` in `styles.css` and from `<link rel="preload">` in each
page's `<head>`. Check the network panel: `anton.woff2`,
`montserrat-var.woff2` and `caveat-var.woff2` must each return **200**.
If your preview sandbox blocks external font requests, the layout will
look broken even though the code is correct — test in a normal browser
before concluding anything is wrong.

**Images are missing.** Same cause: they are absolute URLs on
`https://blueprint-fitness.higgsfield.app`. That host must be reachable.
Do not "fix" this by inlining base64 — it will blow the 50,000-character
limit.

**A file is over the character limit after editing.** Everything is
already minified, so the headroom in §2 is all you have. Prefer editing
the un-minified source (see §9) and rebuilding.

**Styling looks wrong or inconsistent.** Check that no second stylesheet,
reset, or framework was added, and that `styles.css` was pasted in full —
truncation at the end silently removes the responsive breakpoints.

---

## 9. Source of truth

This folder is **generated output**. The editable source lives one level
up in `site/` (readable HTML, `css/main.css`, `js/main.js`).

Make changes there, then regenerate:

```bash
node research/build-compact.mjs    # rebuilds this folder, enforces the 50k cap
node research/verify-compact.mjs   # renders it and checks it still works
```

`verify-compact.mjs` asserts: no console errors, no horizontal overflow
at 1440/390/360, no broken images, the Anton webfont actually loads, and
the full sign-up funnel works end to end.

Editing files in this folder directly means your changes are lost the
next time the build runs.

---

## 10. Brand reference

Only needed if you extend the site. Match these exactly.

| Token | Value | Use |
|---|---|---|
| Blueprint blue | `#0072F5` | primary buttons, links, accents |
| Ink | `#020817` | body text on light backgrounds |
| Draft navy | `#0A1A33` | dark sections ("blueprint paper") |
| Mist | `#F1F5F9` | light section backgrounds |
| Grey | `#64748B` | secondary text |

**Anton** — display headings, uppercase.
**Montserrat** — body copy.
**Caveat** — handwritten annotations only.

Voice: warm, human, simple, friendly. **British English** — "programme",
not "program". Never use hype or pressure phrasing such as "limited
spaces".
