# Blueprint Fitness — front-end site

A complete front-end build for **Blueprint Fitness** (Hackney · South Woodford ·
Leytonstone): full site + high-converting 30-Day Kickstart landing page +
next-steps page with booking placeholder. Static, no build step, vanilla JS.

**Live preview:** https://blueprint-fitness.higgsfield.app
(redeploys go to the same URL — push to the deploy repo and call the deploy
tool again; see "Redeploying" below.)

## Run it locally

```bash
cd site
python3 -m http.server 8642
# open http://localhost:8642
```

No build step. Any static file server works.

## Page map

| Page | Purpose |
|---|---|
| `index.html` | Home — drafting-board hero (their footage pinned as a site photo), definition manifesto, services, why-it-works, testimonials, studios, Kickstart CTA |
| `locations.html` | South Woodford / Leytonstone / Hackney (opening order) with real addresses, hours, emails |
| `team.html` | All 12 coaches by studio — photo cards with notched role chips, mirroring their own meet-the-team design (their exact per-coach photos), elevated with develop-on-scroll and corner ticks |
| `contact.html` | Per-studio contact cards + placeholder message form |
| `kickstart.html` | **The funnel** (general, all three studios). "Try us for 30 days" throughout; price appears exactly twice, quietly (what's-included note + FAQ). Annotated-photo hero → what's included → 30-day journey → timetable tags → site survey → testimonials → FAQ → closing CTA. Sticky mobile CTA. |
| `next-steps.html` | Post-registration: what-happens-next, styled booking-calendar placeholder, reinforcement testimonials |

The funnel actually flows: register form success state stamps "PLAN APPROVED"
and auto-advances to `next-steps.html` after a 3-second countdown.

## Design tokens (`css/main.css`)

Extracted from their real sites (hackney.blueprintfitness.uk CSS bundle +
blueprintfitnessldn.com), not invented:

- `--blue: #0072F5` — their `--primary: hsl(212 100% 48%)`
- `--ink: #020817` — their foreground `hsl(222.2 84% 4.9%)`
- `--mist: #F1F5F9`, `--grey: #64748B` — their secondary/muted
- `--draft: #0A1A33` — "blueprint paper" navy for dark sections (+ faint drafting grid)
- `--radius: .5rem` — their radius token
- Fonts (self-hosted woff2 in `fonts/`): **Anton** (display caps), **Montserrat
  variable** (body), **Caveat variable** (script annotations) — exactly the trio
  their new Hackney site loads from Google Fonts.

## The motion kit — "the drafting kit"

Every pattern derives from the brand's own idea: a **blueprint is a drawn plan**.
Their own site defines it: *"Blueprint /ˈbluːprɪnt/ — a detailed, comprehensive
plan for achieving a goal."* One-sentence brand rationale per pattern:

1. **Drafted underlines + dimension lines** (`.draft-u`, `.dim`) — headline
   underlines draw themselves like a pen pulled across a title block, because a
   Blueprint plan is drawn before it's followed. (Their static site already uses
   a blue underline under key words — ours animates it.) Caveat `.annotation`
   eyebrows are the coach's handwriting on the plan.
2. **The definition manifesto** (`[data-ignite]`) — their dictionary-definition
   motif ignites word-by-word at the visitor's own scroll pace; the key word
   "plan" turns blueprint blue.
3. **The journey primitive** (`.journey` + day counter) — the 30-Day Kickstart
   drawn to scale: a plan line is plotted down the page as you scroll, lighting
   milestones D1 → W1 → W2 → W3 → D30 (content from their real /journey
   habit-stacking page), while a pinned counter scrubs 01→30 of 30 days.
4. **The page companion** (`.companion`) — a miniature of the logo's boxed
   frame ("B:F") that fills with blue like a print coming off the drafting
   table as the page is scrolled; click returns to top.
5. **Card/section life** — staggered entrances, their ghost numerals 01–04
   oversized with scroll parallax, drafting-grid watermarks on dark sections,
   corner registration ticks on photos, subtle cursor tilt on desktop cards.
6. **The signup lightbox** (`.signup-overlay`, injected by `js/main.js`) —
   a clear two-step funnel: "Try us for 30 days" buttons site-wide (header
   included) lead to the kickstart page; there, every "Tap to get started"
   button opens the same one-step form: name, email, number, studio
   dropdown. Submit stamps "PLAN APPROVED" and auto-advances to next-steps.
   (Evolved per client review: hold-to-sign → tap-to-reveal → this.)

### v2 additions (same rule: every pattern names the brand)

7. **The plotter print** (`.anno-photo`, `.print-overlay`, `.print-head`) —
   hero photos come off the plotter: they load as a navy blueprint duotone
   with a drafting grid, then a glowing print-head line sweeps across and
   prints the full-colour reality behind it — the plan becoming the real
   thing. A warm handwritten caption writes in once the print finishes.
   (Third iteration of the hero visual: plan-sheet linework → drawn-circle
   annotations → this, per client review.)
   Also: highlighter-chip script eyebrows (`.annotation-hl` — solid blueprint
   blue with white handwriting, restyled in round 9 for contrast after the
   translucent version proved hard to read on navy), and studio pages with
   embedded maps and ghost numerals. The home studio cards carry **blueprint
   mini-maps** — live Google embeds refiltered into navy drafting sheets
   (invert &rarr; sepia &rarr; hue-rotate), one accurate pin per studio.
8. **Blueprint develop** (`.plan-frame img`) — every photo enters as a
   blue-draft print and develops into full colour, because Blueprint turns
   plans into reality. A "life at Blueprint" **photo strip** on the home page
   loops the client's professional shoot (pauses on hover; scrollable under
   reduced motion).
9. **The edge ruler** (`.ruler`, desktop) — the page is measured as it's read:
   a fixed rule with tick marks and a blue datum line showing how much of the
   drawing you've covered.
10. **The site survey** (`.survey`, kickstart) — who-it's-for as an interactive
    survey sheet: tick what's true, watch the surveyor's pen tick land, and the
    verdict line answers in the client's voice (with an honest "it's not for
    you if…" panel from their own ad copy).
11. **Timetable slot tags** (`.slot-chips`, kickstart) — tap the times that fit
    your week and the sheet annotates itself: "3 sessions a week — early
    mornings and weekends — drawn around your life."
12. **Snap-to-grid CTAs** — primary buttons magnetise toward the cursor in
    quantised drafting-grid steps (desktop only), with round-5 micro-motion:
    an arrow draws in + a pen-ring glow on hover, stamp-press on click.
    The kickstart also carries a value-anchor section ("Everything in.
    Nothing extra." — the page's single price moment, with "a coach rings
    you first" reassurance and an "ask us anything first" human escape
    hatch) and result chips on testimonials built from members' own words.
    Plus: the 30-day counter now stays pinned mid-viewport beside a **hatched
    plan grid** — 30 cells, one per day, hatched in as the visitor scrolls —
    and journey milestones carry Caveat "coach's notes" in the margin.
    Round 9 gave every milestone its own photograph (a second client Drive
    folder — see `assets/MEDIA-MANIFEST.md`), each developing from
    blue-draft to full colour as it enters view.
13. **The quality layer** (round 8) — a full-width blueprint-blue **stat band**
    whose numbers count up on arrival (200+ reviews / 100+ sessions / 5 max /
    3 studios), a giant Caveat **member pull-quote** section (Sarah's words,
    writ large), a **cinematic closer** on home (the arch footage full-bleed
    behind "Your first 30 days? Already planned."), auto-numbered section
    eyebrows ("02 — What we do", drawing-index discipline), and one unified
    12px radius across all imagery.

Constraints honoured: scroll-driven over timer-driven; every pattern has a
static `prefers-reduced-motion` fallback (all content fully visible, line
drawn, milestones lit, companion hidden, videos paused); cursor tilt is
desktop-only; max one stamp/wipe moment per page (the form success stamp).

## Media

- `assets/` — everything harvested from their sites (photos classified in
  `assets/MEDIA-MANIFEST.md`, logos, real hero video, fonts).
- `site/video/hero-montage.*` — **their own** 6.6s hero montage, compressed,
  fades baked in.
- `site/video/arch-dolly.*`, `arch-glide.*` — two ~8s silent ambient clips
  generated (Higgsfield kling3.0-turbo, image-to-video) from their one
  people-free photo: the Hackney arch storefront. Prompted as steady gimbal
  moves with "no people anywhere, architecture preserved exactly as the photo";
  fade-to-black baked at both ends; mp4 (h264) + webm (vp9) sources.
- A scroll-scrubbed frame walk-through was considered and skipped deliberately:
  only one people-free photo exists, so ambient loops serve the space better
  than a scrubbed film of the same façade. To regenerate clips: re-run the
  image-to-video generation from `assets/photos/hackney-exterior.jpg`, then
  `ffmpeg -i in.mp4 -vf "scale=1280:-2,fade=t=in:st=0:d=0.6,fade=t=out:st=7.4:d=0.6" -an -c:v libx264 -crf 27 out.mp4`
  (and a `-c:v libvpx-vp9 -crf 36` webm), plus `-ss 2 -frames:v 1` for posters.

## QA

`research/qa.mjs` (Playwright + system Chromium) runs on every change:
screenshots at 1440/390/360, full interaction suite (burger open/close above
its overlay, FAQ, signup lightbox open/close/validate from multiple pages,
funnel auto-advance, sticky CTA), horizontal-overflow detection, console/page
errors, reduced-motion check. Final pass: zero errors, zero overflow at 360px, all interactions green.
(The only report is a benign `ERR_ABORTED` when an off-screen video's fetch is
cancelled by the pause-when-hidden observer.)

## Redeploying the preview

The live preview is a Higgsfield-hosted static deploy. To update it:

1. Copy `site/*` into the deploy repo's `app/public/` (via `website_repo_access`,
   website_id `4c289f63-66b8-4902-b16d-1350d3b33735`; slug `blueprint-fitness`).
2. Commit, push to `main`, call `deploy_website` — same URL every time.
3. Verify with curl (don't trust the deploy status): `/`, `/kickstart.html`,
   `/css/main.css`, `/video/arch-dolly.mp4` should all be 200.

## Deliberately unfinished (by design — front-end only)

- **Forms are placeholders** — labelled visibly ("nothing is sent yet");
  validation + success states work, no backend.
- **Booking calendar** on `next-steps.html` is a styled placeholder block for
  the studio's real booking embed.
- **Phone numbers** — their public contact page shows placeholder-looking
  numbers (+44 20 8000 0000), so no phone is shown on this build; emails are
  their real per-studio addresses.
- **Coach photos** — their team page uses text cards (no headshots published);
  same here.
- **Testimonial videos** — six YouTube IDs exist on their funnel but could not
  be downloaded from this environment (egress blocked); all quotes on the site
  are **verbatim written testimonials from their own pages** instead
  (`research/FACTS.md` has the full list + sources).
- **Ratio confirmed as 5:1**: their ads said 6:1 but the client has
  confirmed the true max is **5 per coach** — the whole site now says 5:1
  ("no more than five people per coach" / "share your coach with four
  others"). Their own ad copy should be updated to match.
- Kickstart is priced **£169** (their standard rate). The Hackney £129 founders
  offer and 15%-for-life live only on the client's own Hackney landing page —
  deliberately excluded here per client direction.
- "5/5 on Google, 200+ reviews", "100+ sessions/week", "6am–9pm, 7 days" are
  real numbers from their current pages — re-verify at launch.

## `lite/` — for size-limited site builders

`lite/` holds the same six pages packaged for AI site builders that cap file
size: **HTML only, every page well under 50,000 characters** (7,850–25,246).
Nothing is inlined — fonts come from Google Fonts, and photography, video and
the shared minified CSS/JS come from the Higgsfield CDN, so the pages are the
only thing to paste. Rebuild with `node research/build-compact.mjs`, verify
with `node research/verify-compact.mjs`. See `lite/README.md`.
