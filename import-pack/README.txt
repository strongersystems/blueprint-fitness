BLUEPRINT FITNESS - AI Studio import pack (single-file pastes)
==============================================================

8 paste files for 6 pages. Four pages are ONE self-contained file each (CSS +
JS minified inline). Two pages carry too much code to fit in one paste -
index and kickstart, the home page and the flagship funnel - so each ships as
exactly two pastes: its HTML+JS, and its stylesheet. Both halves are under
the limit.


FILES AND CHARACTER COUNTS (limit 50,000)
-----------------------------------------

  paste file          chars    contains
  ------------------  -------  ---------------------------------------------
  index.html           30,855  HTML + inline JS
  index.css            29,184  home stylesheet (link'd as `index.css`)
  kickstart.html       38,842  HTML + inline JS
  kickstart.css        30,034  kickstart stylesheet (link'd as `kickstart.css`)
  next-steps.html      44,670  HTML + inline CSS + inline JS
  locations.html       47,191  HTML + inline CSS + inline JS
  team.html            47,121  HTML + inline CSS + inline JS
  contact.html         42,963  HTML + inline CSS + inline JS


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
concatenation into template literals) and `--charset=utf8` (so it cannot emit
\uXXXX escapes). CSS unicode escapes are literal UTF-8 characters. Files are
UTF-8 - keep them UTF-8 in the TSX pipeline.

Recommended TSX embedding: `const html = ` + template literal + render via
`dangerouslySetInnerHTML` on a full-page container, or serve the string raw.
The inline <script> blocks must actually execute - if React strips them,
inject the HTML via an iframe `srcDoc` or serve the string as the response
body instead.


OTHER CONVENTIONS
-----------------

- Fonts load from Google Fonts (Anton + Montserrat + Caveat) - the same trio
  the client's own site uses, and the CDN's woff2 files carry no CORS headers
  so self-hosting them cross-origin would fail.
- All images, video and favicons are absolute URLs to
  https://blueprint-fitness.higgsfield.app/... (all 50 verified 200). Moving
  media later is one find-and-replace of that base URL.
- Internal links are root-relative pretty routes (/, /kickstart, /locations,
  /team, /next-steps, /contact) - keep those slugs or find-and-replace. The
  studio anchors are /locations#south-woodford, #leytonstone and #hackney.
- Two button labels are wired to different behaviour and must not be
  reworded: "Try us for 30 days" navigates to /kickstart; "Tap to get
  started" (kickstart only) opens the sign-up lightbox. The script picks them
  out by their text.
- The sign-up lightbox is built by the JavaScript at runtime - it is not in
  the markup. Its success state redirects to /next-steps.
- Forms remain front-end placeholders (they validate and show a "Plan
  approved" state but send nothing); wire to the CRM when ready.
- The coaching ratio is 5:1 throughout ("five people per coach"), corrected
  by the client - never 6:1.


PER-PAGE STYLESHEETS
--------------------

Each page carries only the CSS it actually uses. The shared 40,224-character
stylesheet is subset per page by matching every selector against that page's
markup plus the shared script (so classes added at runtime - .open, .show,
.in-view, .invalid - are kept). That is what brings four of the six pages
under the limit as single files.

Proven safe rather than assumed: computed styles were compared element by
element between each pack page and the same page served with the complete
stylesheet - 1,752 elements, 47,304 property checks, zero mismatches.


VERIFICATION RUN AGAINST THESE EXACT FILES
------------------------------------------

Served over HTTP in a real browser on the pretty routes: zero console errors,
zero failed requests and zero horizontal overflow on all 6 pages at 1440,
390 and 360 wide; Anton confirmed loading from Google Fonts; every image
loaded; page heights identical to the full build. Interactions all
functional: sign-up lightbox opens, validates empty submits inline, accepts a
full submission, shows the "Plan approved" stamp and redirects to
/next-steps; FAQ accordion; mobile burger menu; and the home CTA navigating
to /kickstart without opening the lightbox.

(Environment-only skips: mp4/webm playback - the headless test browser lacks
H.264 - and Google Maps iframe tiles; both verified live separately.)


REGENERATING
------------

  node ../research/build-pack.mjs      rebuilds this folder from ../site/,
                                       enforces the 50,000 cap and the
                                       TSX-safety guarantee
  node ../research/verify-pack.mjs     serves the pack on pretty routes and
                                       runs the verification above
  node ../research/style-parity.mjs    the element-by-element computed-style
                                       comparison against the full build

../site/ is the source of truth. Editing files in this folder directly means
the changes are lost the next time the build runs.
