// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Required for canonical URLs, sitemap, and absolute og:image paths.
  site: 'https://opik.dev',

  vite: {
    plugins: [tailwindcss()],
  },
});