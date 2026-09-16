/**
 * Branded HTML email renderer for the Blueprint Fitness CRM.
 *
 * Email clients are not browsers: no flexbox, no grid, no external stylesheet,
 * no `<style>` you can rely on. So everything here is tables, inline styles and
 * a 600px shell, with a table-cell button rather than a styled <a> so Outlook
 * renders the CTA at all. Inter is requested but every stack falls back to
 * Helvetica/Arial, because Outlook will use the fallback regardless.
 *
 * The palette and voice match the site: ink #101B2F, blue #0072F5, mist #EAF1FB,
 * sky #5EA2FF, grey #3D4A63, Inter 800 for display. The header carries the same
 * blueprint-grid motif the site uses.
 *
 * Merge fields are GoHighLevel's and are passed straight through, so
 * {{contact.first_name}} still personalises as before.
 */

export const SITE = 'https://blueprintfitnessldn.com';
const FONT = "Inter,'Helvetica Neue',Helvetica,Arial,sans-serif";
const INK = '#101B2F', BLUE = '#0072F5', MIST = '#EAF1FB', SKY = '#5EA2FF', GREY = '#3D4A63';

/** Studio facts. Kept here rather than imported so this script stands alone. */
export const STUDIOS = {
  'south-woodford': {
    slug: 'south-woodford', name: 'South Woodford', coach: 'Stu',
    email: 'southwoodford@blueprintfitnessldn.com', whatsapp: '447538298457',
    address: '4 Raven Road, South Woodford, London', postcode: 'E18 1HB',
    hours: 'Open 6am–9pm, every day', signup: 'signup-southwoodford',
    prices: { sgpt12: '£239', sgpt8: '£219', sgpt4: '£189' },
    teamup: 'https://goteamup.com/p/3662065-blueprint-fitness-south-w/memberships/',
  },
  leytonstone: {
    slug: 'leytonstone', name: 'Leytonstone', coach: 'Stu',
    email: 'leytonstone@blueprintfitnessldn.com', whatsapp: '447947790035',
    address: 'Unit 3, Hitchcock Business Centre, Leytonstone', postcode: 'E11 4RE',
    hours: 'Open early ’til late, 7 days a week', signup: 'signup-leytonstone',
    prices: { sgpt12: '£239', sgpt8: '£219', sgpt4: '£189' },
    teamup: 'https://goteamup.com/p/9748082-blueprint-fitness-leytons/memberships/',
  },
  hackney: {
    slug: 'hackney', name: 'Hackney', coach: 'Nick',
    email: 'hackney@blueprintfitnessldn.com', whatsapp: '447944690356',
    address: 'Arch 195, Morning Lane, Hackney, London', postcode: 'E9 6LJ',
    /* Hackney is closed on Sundays and has no 100+ weekly session count —
       the old templates claimed both, for every studio. */
    hours: 'Mon–Fri 6am–9pm · Sat 8–11am · Closed Sunday', signup: 'signup-hackney',
    /* Hackney is dearer at every tier — this is why the site has a memberships
       page per studio rather than one shared price list. */
    prices: { sgpt12: '£279', sgpt8: '£239', sgpt4: '£199' },
    teamup: null,
  },
};

const esc = (s) => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const links = (s) => ({
  kickstart: `${SITE}/${s.slug}/kickstart/`,
  memberships: `${SITE}/memberships/${s.slug}/`,
  signup: `${SITE}/${s.signup}/`,
  timetable: `${SITE}/${s.slug}/timetable/`,
  nutritionCourse: `${SITE}/members/nutrition-course/`,
  nutritionRequest: `${SITE}/members/nutrition-request/`,
  bookings: `${SITE}/members/bookings-cancellations/`,
  members: `${SITE}/members/`,
  whatsapp: (text) => `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(text)}`,
});

/* ---------------------------------------------------------------- blocks -- */

/** A paragraph of body copy. */
export const p = (html) =>
  `<p style="margin:0 0 16px;font-family:${FONT};font-size:16px;line-height:1.65;color:${GREY}">${html}</p>`;

/** A section heading inside the body. */
export const h = (text) =>
  `<h2 style="margin:26px 0 12px;font-family:${FONT};font-size:21px;line-height:1.3;font-weight:800;color:${INK}">${esc(text)}</h2>`;

/** A bulleted list, rendered as rows so clients cannot mangle the markers. */
export const list = (items) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px">` +
  items.map((i) => `<tr>
     <td width="22" valign="top" style="padding:0 0 9px;font-family:${FONT};font-size:16px;line-height:1.6;color:${BLUE}">&bull;</td>
     <td valign="top" style="padding:0 0 9px;font-family:${FONT};font-size:16px;line-height:1.6;color:${GREY}">${i}</td>
   </tr>`).join('') + `</table>`;

/** The one thing we want them to do. Table-cell so Outlook renders it. */
export const cta = (href, label) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:6px 0 4px">
     <tr><td align="center" style="background:${BLUE};border-radius:9px">
       <a href="${href}" style="display:block;padding:15px 24px;font-family:${FONT};font-size:16px;font-weight:700;color:#ffffff;text-decoration:none">${esc(label)}</a>
     </td></tr>
   </table>`;

/** A quieter second action. */
export const ctaGhost = (href, label) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:10px 0 4px">
     <tr><td align="center" style="border:1.5px solid ${BLUE};border-radius:9px">
       <a href="${href}" style="display:block;padding:13px 24px;font-family:${FONT};font-size:15px;font-weight:700;color:${BLUE};text-decoration:none">${esc(label)}</a>
     </td></tr>
   </table>`;

/** A pulled-out point, in the mist panel with the blue rule. */
export const panel = (html) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${MIST};border-left:4px solid ${BLUE};border-radius:0 10px 10px 0;margin:0 0 18px">
     <tr><td style="padding:16px 20px;font-family:${FONT};font-size:16px;line-height:1.6;color:${INK}">${html}</td></tr>
   </table>`;

/** The three numbers, as on the site. `ratio` is 5:1 — never 6:1. */
export const stats = (cells) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 20px"><tr>` +
  cells.map((c, i) => `${i ? '<td width="2%">&nbsp;</td>' : ''}
     <td width="32%" align="center" style="padding:14px 6px;background:#F5F9FF;border-radius:10px">
       <p style="margin:0;font-family:${FONT};font-size:24px;font-weight:800;color:${BLUE}">${esc(c.n)}</p>
       <p style="margin:2px 0 0;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${GREY}">${esc(c.l)}</p>
     </td>`).join('') + `</tr></table>`;

/** A divider. */
export const rule = () =>
  `<div style="height:1px;background:${MIST};line-height:1px;margin:24px 0">&nbsp;</div>`;

/* ----------------------------------------------------------------- shell -- */

/**
 * Wrap body blocks in the branded shell.
 *   studio    one of STUDIOS
 *   eyebrow   small blue line above the headline
 *   headline  the h1
 *   blocks    array of strings from the helpers above
 *   preheader the line inbox previews show; write it, or the client invents one
 *   signoff   { name, role } — who it is from
 */
export function email({ studio, eyebrow, headline, blocks, preheader, signoff }) {
  const s = studio;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(headline)}</title>
</head>
<body style="margin:0;padding:0;background:${MIST};-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${MIST}">
 <tr><td align="center" style="padding:28px 0">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden">

   <tr><td style="background:${INK};background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:32px 32px;padding:26px 32px">
     <!-- the stacked white lockup, which is the one on the studio membership
          cards; the blue horizontal version was a different mark and read as a
          thin outline against this header -->
     <img src="${SITE}/img/logo-bf-stacked-white.png" width="150" alt="Blueprint Fitness"
          style="display:block;border:0;outline:none;text-decoration:none;width:150px;max-width:150px;height:auto">
   </td></tr>

   <tr><td style="padding:34px 32px 0">
     <p style="margin:0 0 10px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${BLUE}">${esc(eyebrow)} &middot; ${esc(s.name)}</p>
     <h1 style="margin:0 0 18px;font-family:${FONT};font-size:30px;line-height:1.15;font-weight:800;color:${INK}">${headline}</h1>
   </td></tr>

   <tr><td style="padding:0 32px">
     ${blocks.join('\n     ')}
   </td></tr>

   <tr><td style="padding:26px 32px 0">
     <p style="margin:0 0 3px;font-family:${FONT};font-size:16px;line-height:1.6;color:${GREY}">${esc(signoff.line || 'Speak soon,')}</p>
     <p style="margin:0;font-family:${FONT};font-size:16px;font-weight:800;color:${INK}">${esc(signoff.name)}</p>
     <p style="margin:2px 0 0;font-family:${FONT};font-size:14px;color:${GREY}">${esc(signoff.role || `Blueprint Fitness ${s.name}`)}</p>
   </td></tr>

   <tr><td style="padding:26px 32px 0"><div style="height:1px;background:${MIST};line-height:1px">&nbsp;</div></td></tr>

   <tr><td style="padding:20px 32px 32px">
     <p style="margin:0 0 6px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${BLUE}">Your studio</p>
     <p style="margin:0 0 3px;font-family:${FONT};font-size:15px;font-weight:700;color:${INK}">Blueprint Fitness ${esc(s.name)}</p>
     <p style="margin:0 0 3px;font-family:${FONT};font-size:14px;line-height:1.6;color:${GREY}">${esc(s.address)}, ${esc(s.postcode)}</p>
     <p style="margin:0 0 3px;font-family:${FONT};font-size:14px;line-height:1.6;color:${GREY}">${esc(s.hours)}</p>
     <p style="margin:0;font-family:${FONT};font-size:14px;line-height:1.6">
       <a href="mailto:${s.email}" style="color:${BLUE};text-decoration:none">${s.email}</a>
       &nbsp;&middot;&nbsp;
       <a href="https://wa.me/${s.whatsapp}" style="color:${BLUE};text-decoration:none">WhatsApp</a>
     </p>
   </td></tr>

  </table>

  <p style="margin:16px auto 0;max-width:600px;font-family:${FONT};font-size:12px;line-height:1.6;color:${GREY};text-align:center">
    You are getting this because you are on the list at
    <a href="${SITE}" style="color:${BLUE};text-decoration:none">blueprintfitnessldn.com</a>.<br>
    <a href="{{trigger_link.unsubscribe}}" style="color:${GREY}">Unsubscribe</a> &middot;
    &copy; {{right_now.year}} Blueprint Fitness
  </p>

 </td></tr>
</table>
</body></html>`;
}
