import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Served from GitHub Pages on the custom domain blueprintfitnessldn.com, at
// the root. (blueprintfitness.uk stays a redirect to it — GitHub Pages allows
// one custom domain per repo, and that domain already only redirects.)
export default defineConfig({
  site: 'https://blueprintfitnessldn.com',
  base: '/',
  integrations: [react()],
  build: { format: 'directory' },
});
