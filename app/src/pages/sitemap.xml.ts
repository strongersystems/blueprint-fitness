import type { APIRoute } from 'astro';
import { studios } from '../data/studios';

/* Only pages we actually want indexed. The members area and every next-steps
   page carry <meta name="robots" content="noindex"> — they are post-enquiry or
   member-only, so they are deliberately absent here rather than listed and
   contradicted. The redirect stubs are absent for the same reason: they
   canonicalise to their target, and a sitemap entry would nominate them as the
   page to index instead.

   No <lastmod>. It used to be the build date on every URL, which told Google
   that all fourteen pages changed every time anything deployed — and a lastmod
   that is provably wrong is a lastmod Google stops reading. Omitting it is
   valid and honest; if per-page dates are wanted later they have to come from
   git, not from Date.now(). */
const SITE = 'https://blueprintfitnessldn.com';

const paths = [
  '/',
  '/kickstart/',
  '/locations/',
  '/contact/',
  '/memberships/',
  ...studios.map((s) => `/${s.slug}/kickstart/`),
  ...studios.map((s) => `/${s.slug}/timetable/`),
  ...studios.map((s) => `/memberships/${s.slug}/`),
  /* Real landing pages with the payment embed, and indexable — they were
     simply missing here, so nothing pointed Google at them. */
  '/signup/',
  ...studios.map((s) => `/${s.signupPath}/`),
];

export const GET: APIRoute = () => {
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) =>
      `  <url>\n    <loc>${SITE}${p}</loc>\n  </url>\n`).join('') +
    '</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
