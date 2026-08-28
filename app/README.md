# Blueprint Fitness — site (Astro + React, pre-rendered)

React components, pre-rendered to static HTML at build time. Visitors and
search engines get real HTML; only the interactive islands ship JavaScript.

```bash
cd app
npm install
npm run dev      # local dev server
npm run build    # static output -> app/dist
```

Deploys automatically on every push to `main` (`.github/workflows/pages.yml`)
to the `gh-pages` branch → https://strongersystems.github.io/blueprint-fitness/

## Structure

| Path | What |
|---|---|
| `src/data/studios.ts` | **The three studios as data.** Addresses, postcodes, emails, CRM form ids, and each studio's HighLevel tracking snippet. Adding a studio here generates its landing + next-steps pages automatically. |
| `src/data/site.ts` | Site-wide constants (CRM host, price, ratio, socials). |
| `src/data/testimonials.ts` | The six member story films. |
| `src/layouts/Base.astro` | `<head>`, header, footer, tracking, motion-kit script. |
| `src/components/EnquiryForm.tsx` | **React island.** The enquiry form + studio selector. Pre-rendered, hydrates on scroll (`client:visible`). |
| `src/components/Tracking.astro` | Injects HighLevel tracking scripts. |
| `src/components/VideoTestimonials.astro` | Member-story grid + lightbox hooks. |
| `src/pages/[studio]/kickstart.astro` | One template → 3 studio landing pages. |
| `src/pages/[studio]/next-steps.astro` | One template → 3 studio next-steps pages. |
| `public/` | img, video, fonts, motion-kit JS — same paths as before. |

## Routes

Main site: `/` `/kickstart` `/locations` `/contact` `/next-steps`
Members: `/members` `/members/check-in` `/members/nutrition-request`
`/members/bookings-cancellations` `/members/terms` `/members/cancel`
Per studio: `/{south-woodford|leytonstone|hackney}/kickstart` and `/next-steps`

## HighLevel tracking

Each studio's snippet lives in `src/data/studios.ts` → `trackingScript`.
While it is `null` nothing is emitted, so a missing snippet never breaks a build.

- **Studio landing/next-steps pages** load ONLY that studio's script
  (`<Tracking studios={['hackney']} />`) so conversions attribute to that
  sub-account.
- **Main-site pages with the general form** load ALL THREE
  (`<Tracking all />`). The form submits a `location` value — filter on that
  at the workflow level to route the lead to the right studio.

The form also pushes a `blueprint_enquiry` event (with `location`) to
`window.dataLayer` on submit, for tag-manager style triggers.

## Forms — how submissions reach the CRM

There is no POST of our own. The tracking script harvests submissions straight
off the page, so a form only reaches HighLevel if it keeps to that contract:

- a real `<form>` **in the page DOM** — never an iframe;
- a `name` on every field to capture, and none of them `disabled`
  (`readonly` is fine — that is how the per-studio pages carry a fixed
  `location`, since **hidden inputs are skipped by the tracker**);
- `type="email"` and `type="tel"` so contacts can be matched;
- a native `<button type="submit">`, and a JS handler that does not block the
  submit event (`preventDefault()` is fine — the tracker listens in the capture
  phase on the form itself, so it has already read the fields);
- a stable `id` on the form. That is the label the submission appears under in
  the CRM — without one everything reports as "Unidentified Form". Ours are
  `blueprint-enquiry-main-site`, `blueprint-enquiry-<studio>` and
  `blueprint-contact`.

Two consequences worth knowing:

- **Fields are uncontrolled on purpose.** The DOM is the source of truth the
  tracker reads. Controlled React inputs broke it: the island hydrates on
  scroll and hydration resets a controlled input to its initial state, wiping
  anything the browser autofilled beforehand and handing the tracker a form of
  empty strings.
- **One form per tracked page.** The tracker binds to every form in the
  document, so the old placeholder sign-up lightbox was removed from
  `public/js/main.js` — it would have posted empty, unidentified submissions.
  "Tap to get started" now scrolls to the real form.

In HighLevel, Form Analytics and Form Submissions both have to be enabled in
Settings for these to sync to contacts. The tracker also fires on a submit that
fails our client-side validation, so guard the workflow on email being present;
submissions matched by email collapse onto one contact, so this behaves as
partial-lead capture rather than duplicates.

`research/form-capture-verify.mjs` proves the contract end to end: it loads the
real tracking script, submits each form and asserts the captured payload. The
POST to HighLevel is intercepted and aborted, so it never writes to the CRM.

## Note on the legacy build

`../site/` (hand-written HTML) and `../import-pack/` (AI Studio paste files)
are **left intact and unchanged**. Asset URLs under `/blueprint-fitness/img`
and `/video` are preserved by this build, so the import-pack keeps working.
