/* On-brand HTML email for the Website Enquiry workflows.

   Email-client rules, not website rules: tables for layout, inline styles,
   600px max, no flexbox/grid, no external CSS, web-safe fallbacks behind Inter,
   and a table-cell CTA rather than a styled <a> block so Outlook renders it.
   Brand: ink #101B2F, blue #0072F5, sky #5EA2FF, mist #EAF1FB, grey #3D4A63. */

const SITE = 'https://blueprintfitnessldn.com';
const FONT = "Inter,'Helvetica Neue',Helvetica,Arial,sans-serif";

export function brandedEmail(s) {
  const wa = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(
    `Hi Blueprint Fitness ${s.name} — I've just registered my interest in the 30 Day Kickstart.`)}`;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Your 30-Day Kickstart at Blueprint Fitness ${s.name}</title>
</head>
<body style="margin:0;padding:0;background:#EAF1FB;-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Thanks for registering your interest — one quick question before we book you in.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EAF1FB">
 <tr><td align="center" style="padding:28px 0">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden">

   <!-- header: ink with the blueprint grid -->
   <tr><td style="background:#101B2F;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:32px 32px;padding:26px 32px">
     <img src="${SITE}/img/logo-horizontal-blue.png" width="200" alt="Blueprint Fitness"
          style="display:block;border:0;outline:none;text-decoration:none;width:200px;max-width:200px;height:auto">
   </td></tr>

   <!-- headline -->
   <tr><td style="padding:34px 32px 0">
     <p style="margin:0 0 10px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#0072F5">The 30-Day Kickstart &middot; ${s.name}</p>
     <h1 style="margin:0 0 18px;font-family:${FONT};font-size:30px;line-height:1.15;font-weight:800;color:#101B2F">Hello {{contact.first_name}}, you&rsquo;re on the list.</h1>
     <p style="margin:0 0 16px;font-family:${FONT};font-size:16px;line-height:1.65;color:#3D4A63">Thanks for registering your interest in our 30&nbsp;Day Kickstart at <strong style="color:#101B2F">Blueprint Fitness ${s.name}</strong>. A coach will give you a ring shortly for a friendly chat &mdash; no hard sell, ever.</p>
   </td></tr>

   <!-- the one question -->
   <tr><td style="padding:6px 32px 0">
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EAF1FB;border-left:4px solid #0072F5;border-radius:0 10px 10px 0">
      <tr><td style="padding:18px 20px">
        <p style="margin:0;font-family:${FONT};font-size:17px;line-height:1.55;font-weight:700;color:#101B2F">Just to check &mdash; are you local to ${s.name}?</p>
        <p style="margin:8px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:#3D4A63">Reply to this email or message us on WhatsApp and we&rsquo;ll get your first session booked in.</p>
      </td></tr>
     </table>
   </td></tr>

   <!-- what the 30 days include -->
   <tr><td style="padding:28px 32px 0">
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
       <td width="32%" align="center" style="padding:14px 6px;background:#F5F9FF;border-radius:10px">
         <p style="margin:0;font-family:${FONT};font-size:24px;font-weight:800;color:#0072F5">12</p>
         <p style="margin:2px 0 0;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#3D4A63">Coached sessions</p>
       </td>
       <td width="2%">&nbsp;</td>
       <td width="32%" align="center" style="padding:14px 6px;background:#F5F9FF;border-radius:10px">
         <p style="margin:0;font-family:${FONT};font-size:24px;font-weight:800;color:#0072F5">5:1</p>
         <p style="margin:2px 0 0;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#3D4A63">Max ratio</p>
       </td>
       <td width="2%">&nbsp;</td>
       <td width="32%" align="center" style="padding:14px 6px;background:#F5F9FF;border-radius:10px">
         <p style="margin:0;font-family:${FONT};font-size:24px;font-weight:800;color:#0072F5">100+</p>
         <p style="margin:2px 0 0;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#3D4A63">Sessions a week</p>
       </td>
      </tr>
     </table>
   </td></tr>

   <!-- CTAs: table-cell buttons so Outlook renders them -->
   <tr><td style="padding:26px 32px 0">
     <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td align="center" style="background:#0072F5;border-radius:9px">
        <a href="${SITE}/${s.signup}/" style="display:block;padding:15px 24px;font-family:${FONT};font-size:16px;font-weight:700;color:#ffffff;text-decoration:none">Start your 30 days &rarr;</a>
      </td></tr>
      <tr><td height="10" style="height:10px;line-height:10px">&nbsp;</td></tr>
      <tr><td align="center" style="border:1.5px solid #0072F5;border-radius:9px">
        <a href="${wa}" style="display:block;padding:13px 24px;font-family:${FONT};font-size:15px;font-weight:700;color:#0072F5;text-decoration:none">Message ${s.name} on WhatsApp</a>
      </td></tr>
     </table>
   </td></tr>

   <!-- sign-off -->
   <tr><td style="padding:28px 32px 0">
     <p style="margin:0 0 3px;font-family:${FONT};font-size:16px;line-height:1.6;color:#3D4A63">Speak soon,</p>
     <p style="margin:0;font-family:${FONT};font-size:16px;font-weight:800;color:#101B2F">${s.coach}</p>
     <p style="margin:2px 0 0;font-family:${FONT};font-size:14px;color:#3D4A63">Blueprint Fitness ${s.name}</p>
   </td></tr>

   <tr><td style="padding:26px 32px 0"><div style="height:1px;background:#EAF1FB;line-height:1px">&nbsp;</div></td></tr>

   <!-- studio details -->
   <tr><td style="padding:20px 32px 32px">
     <p style="margin:0 0 6px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0072F5">Your studio</p>
     <p style="margin:0 0 3px;font-family:${FONT};font-size:15px;font-weight:700;color:#101B2F">Blueprint Fitness ${s.name}</p>
     <p style="margin:0 0 3px;font-family:${FONT};font-size:14px;line-height:1.6;color:#3D4A63">${s.address}, ${s.postcode}</p>
     <p style="margin:0 0 3px;font-family:${FONT};font-size:14px;line-height:1.6;color:#3D4A63">${s.hours}</p>
     <p style="margin:0;font-family:${FONT};font-size:14px;line-height:1.6"><a href="mailto:${s.email}" style="color:#0072F5;text-decoration:none">${s.email}</a></p>
   </td></tr>

  </table>

  <p style="margin:16px auto 0;max-width:600px;font-family:${FONT};font-size:12px;line-height:1.6;color:#3D4A63;text-align:center">
    You&rsquo;re getting this because you registered your interest at
    <a href="${SITE}" style="color:#0072F5;text-decoration:none">blueprintfitnessldn.com</a>.
  </p>

 </td></tr>
</table>
</body></html>`;
}

export const SUBJECT = 'Hello {{contact.first_name}} — quick question about your 30 Day Kickstart';
