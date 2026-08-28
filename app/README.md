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

## HighLevel tracking — the one thing still needed

Each studio's snippet goes in `src/data/studios.ts` → `trackingScript`.
While it is `null` nothing is emitted, so a missing snippet never breaks a build.

- **Studio landing/next-steps pages** load ONLY that studio's script
  (`<Tracking studios={['hackney']} />`) so conversions attribute to that
  sub-account.
- **Main-site pages with the general form** load ALL THREE
  (`<Tracking all />`). The form submits a `location` value — filter on that
  at the workflow level to route the lead to the right studio.

The form also pushes a `blueprint_enquiry` event (with `location`) to
`window.dataLayer` on submit, for tag-manager style triggers.

## Note on the legacy build

`../site/` (hand-written HTML) and `../import-pack/` (AI Studio paste files)
are **left intact and unchanged**. Asset URLs under `/blueprint-fitness/img`
and `/video` are preserved by this build, so the import-pack keeps working.
