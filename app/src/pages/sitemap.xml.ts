import type { APIRoute } from 'astro';
import { studios } from '../data/studios';

/* Only pages we actually want indexed. The members area and every next-steps
   page carry <meta name="robots" content="noindex"> — they are post-enquiry or
   member-only, so they are deliberately absent here rather than listed and
   contradicted. */
const SITE = 'https://blueprintfitnessldn.com';

const paths = [
  '/',
  '/kickstart/',
  '/locations/',
  '/contact/',
  ...studios.map((s) => `/${s.slug}/kickstart/`),
];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) =>
      `  <url>\n    <loc>${SITE}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`).join('') +
    '</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
