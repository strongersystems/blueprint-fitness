BLUEPRINT FITNESS - AI Studio import pack (single-file pastes)
==============================================================

17 paste files for 10 pages - the public site plus the members area
(/members, /check-in, /bookings-cancellations, /terms, /cancel). Pages that
fit ship as ONE self-contained file (CSS + JS minified inline); pages that
don't ship as exactly two pastes - HTML+JS plus a stylesheet - each half
under the limit. (The team page is hidden for now at the client's request -
unlinked from all navigation and not part of this pack. The /cancel page's
three studio buttons open LIVE cancellation forms - the client's real
link.stronger.systems embeds, loaded in a branded lightbox with
form_embed.js fetched on first open; without JavaScript the buttons link
straight to the hosted forms. Every other form - contact, kickstart
sign-up, members check-in - remains a placeholder: nothing is sent and no
CRM is wired.)


FILES AND CHARACTER COUNTS (limit 50,000)
-----------------------------------------

  paste file                  chars    contains
  --------------------------  -------  --------------------------------------
  index.html                   40,314  HTML + inline JS
  index.css                    33,712  stylesheet (link'd as `index.css`)
  kickstart.html               48,902  HTML + inline JS
  kickstart.css                35,153  stylesheet (link'd as `kickstart.css`)
  next-steps.html              31,519  HTML + inline JS
  next-steps.css               26,632  stylesheet (link'd as `next-steps.css`)
  locations.html               27,687  HTML + inline JS
  locations.css                25,835  stylesheet (link'd as `locations.css`)
  contact.html                 49,185  HTML + inline CSS + inline JS
  members.html                 48,592  HTML + inline CSS + inline JS
  check-in.html                49,586  HTML + inline CSS + inline JS
  bookings-cancellations.html  27,043  HTML + inline JS
  bookings-cancellations.css   25,682  stylesheet (link'd as `bookings-cancellations.css`)
  terms.html                   29,840  HTML + inline JS
  terms.css                    25,530  stylesheet (link'd as `terms.css`)
  cancel.html                  25,099  HTML + inline JS
  cancel.css                   25,261  stylesheet (link'd as `cancel.css`)


WORKS WITHOUT JAVASCRIPT (the fix that matters)
-----------------------------------------------

Every page renders as a COMPLETE static page even if the <script> block is
stripped or never executes - the same convention that made the RLF and CTPT
packs work. The body starts as <body class="no-js"> and the script's first
act is to flip it to class="js". Every hidden-until-revealed animation state
in the CSS is scoped under .js, so:

- script runs      -> full motion kit, exactly as designed
- script stripped  -> nothing is ever hidden: all copy visible, photos
                     developed (no blueprint filter stuck on), captions
                     shown, journey milestones lit, headline underlines
                     drawn as static bars, tickers stopped, and the JS-only
                     chrome (scroll ruler, page companion, sticky bar,
                     sign-up lightbox) simply absent

Verified by rendering every page in a real browser with JavaScript
disabled: zero hidden or transformed elements, zero photos stuck in the
blueprint filter, zero horizontal overflow.

Do NOT remove the no-js class from <body> or unpick the .js scoping when
editing - that gate is what makes the pages safe in script-stripping embeds.


TSX-SAFE BY CONSTRUCTION
------------------------

Because these will be embedded in TSX, every file is guaranteed to contain:

- zero backticks       - safe inside a template literal
- zero ${              - no accidental interpolation
- zero backslashes     - nothing gets eaten by escape processing, so a plain
                         template literal works; String.raw is not needed

That guarantee is enforced by the build (it fails if any file violates it).
To achieve it, four small behaviour-preserving rewrites were made to the
JavaScript:

- the email regex became an equivalent string-method check, parity-tested
  against the original on 18 cases
- the phone regex is now built with `new RegExp`, `\d` written as `[0-9]`,
  parity-tested on 10 cases
- the whitespace class `\s` became a string built with
  `String.fromCharCode.apply`, and the all-whitespace test became
  `.trim() === ''`
- the em-dash escape `—` became the literal character

The minifier is run with `--target=es5` (so it cannot rewrite string
concatenation into template literals) and `--charset=utf8` (so it cannot
emit \uXXXX escapes). CSS unicode escapes are literal UTF-8 characters.
Files are UTF-8 - keep them UTF-8 in the TSX pipeline.

Recommended TSX embedding: `const html = ` + template literal + render via
`dangerouslySetInnerHTML` on a full-page container, or serve the string raw.
If scripts are stripped the pages still render fully (see above); to get the
motion kit and the sign-up lightbox as well, inject the HTML via an iframe
`srcDoc` or serve the string as the response body so <script> executes.


OTHER CONVENTIONS
-----------------

- Fonts load from Google Fonts (Inter + Montserrat), per the client's brand
  guide. The pages carry their own font links in <head>.
- All images, video (including the six member-story films + their VTT
  captions and poster thumbnails) and favicons are absolute URLs to
  https://strongersystems.github.io/blueprint-fitness/... - the GitHub Pages
  deploy of site/, which updates automatically on every push to main.
  Moving media later (e.g. back to the Higgsfield URL or a custom domain)
  is one find-and-replace of that base URL, or one edit in build-pack.mjs.
- Internal links are root-relative pretty routes (/, /kickstart, /locations,
  /next-steps, /contact, /members, /check-in, /bookings-cancellations,
  /terms, /cancel) - keep those slugs or find-and-replace. The
  studio anchors are /locations#south-woodford, #leytonstone and #hackney.
- Two button labels are wired to different behaviour and must not be
  reworded: "Try us for 30 days" navigates to /kickstart; "Tap to get
  started" (kickstart only) opens the sign-up lightbox. The script picks
  them out by their text.
- The member-stories section ([data-vt] cards, #member-stories) opens each
  film in a video lightbox; without JavaScript the cards link straight to
  the mp4. It appears on /, /kickstart and /next-steps and is safe to copy
  into any other page.
- The sign-up lightbox is built by the JavaScript at runtime - it is not in
  the markup. Its success state redirects to /next-steps.
- The three /cancel studio buttons submit to the client's LIVE CRM forms
  (link.stronger.systems). All other forms remain front-end placeholders
  (they validate and show a success state but send nothing); wire to the
  CRM when ready.
- The coaching ratio is 5:1 throughout ("five people per coach"), corrected
  by the client - never 6:1.


PER-PAGE STYLESHEETS
--------------------

Each page carries only the CSS it actually uses. The shared stylesheet is
subset per page by matching every selector against that page's markup plus
the shared script (so classes added at runtime - .open, .show, .in-view,
.invalid, .js - are kept). That is what brings four of the six pages under
the limit as single files.

Proven safe rather than assumed: computed styles were compared element by
element between each pack page and the same page served with the complete
stylesheet - 1,752 elements, 47,304 property checks, zero mismatches.


VERIFICATION RUN AGAINST THESE EXACT FILES
------------------------------------------

Served over HTTP in a real browser on the pretty routes, scripts ENABLED:
zero console errors, zero failed requests and zero horizontal overflow on
all 5 pages at 1440, 390 and 360 wide; Anton confirmed loading from Google
Fonts; every image loaded; page heights identical to the full build.
Interactions all functional: sign-up lightbox opens, validates empty submits
inline, accepts a full submission, shows the "Plan approved" stamp and
redirects to /next-steps; FAQ accordion; mobile burger menu; and the home
CTA navigating to /kickstart without opening the lightbox.

Scripts DISABLED: all 5 pages still render complete and correct (see the
no-JS section above).

(Environment-only skips: mp4/webm playback - the headless test browser
lacks H.264 - and Google Maps iframe tiles; both verified live separately.)


REGENERATING
------------

  node ../research/build-pack.mjs      rebuilds this folder from ../site/,
                                       enforces the 50,000 cap and the
                                       TSX-safety guarantee (README.txt is
                                       preserved; refresh its counts table
                                       if sizes change)
  node ../research/verify-pack.mjs     scripts-enabled verification
  node ../research/verify-nojs.mjs     scripts-DISABLED verification
  node ../research/style-parity.mjs    element-by-element computed-style
                                       comparison against the full build

../site/ is the source of truth. Editing files in this folder directly means
the changes are lost the next time the build runs.
