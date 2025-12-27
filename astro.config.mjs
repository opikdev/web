// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://opik.dev',
  integrations: [
    sitemap({
      // Automatically discovers all static pages
      // You can add customPages for per-page control
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});