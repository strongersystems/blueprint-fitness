import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Served from GitHub Pages at /blueprint-fitness/ — keeps every existing
// asset URL (img/, video/) valid so the import-pack continues to work.
export default defineConfig({
  site: 'https://strongersystems.github.io',
  base: '/blueprint-fitness',
  integrations: [react()],
  build: { format: 'directory' },
});
