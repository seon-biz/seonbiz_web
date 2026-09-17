import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'node:url';
import { sites } from './build/sites-vite-plugin';

export default defineConfig({
  site: process.env.SEONBIZ_SITE_URL || 'https://seonbiz.com',
  output: 'server',
  trailingSlash: 'never',
  session: false,
  build: { serverEntry: 'index.js', format: 'file' },
  integrations: [react()],
  adapter: cloudflare({
    configPath: process.env.SEONBIZ_DEPLOY_TARGET === 'cloudflare' ? './wrangler.cloudflare.jsonc' : './wrangler.jsonc',
    imageService: 'passthrough',
    inspectorPort: false,
  }),
  devToolbar: { enabled: false },
  redirects: {
    '/coaching/shop': '/coaching/website',
    '/coaching/service': '/coaching/website',
    '/notes/customer-questions': '/notes',
    '/notes/product-page-search-records': '/cases/search-performance-2025-2026',
    '/notes/blog-to-short-video-record': '/notes/content-formats',
    '/cases/ai-search-visits': '/cases/ai-referral-data-2026',
    '/cases/sports-search-records': '/cases/search-performance-2025-2026',
    '/cases/search-records': '/cases/search-performance-2021-2022',
    '/cases/content-workflow': '/notes/content-formats',
  },
  vite: {
    cacheDir: process.argv.includes('build') ? 'node_modules/.vite-build' : 'node_modules/.vite',
    plugins: process.env.SEONBIZ_DEPLOY_TARGET === 'cloudflare' ? [] : [sites()],
    optimizeDeps: { include: ['@astrojs/internal-helpers/create-filter', 'astro/assets/services/noop', 'lucide-react', 'radix-ui', 'class-variance-authority', 'clsx', 'tailwind-merge'] },
    resolve: { alias: { '@': fileURLToPath(new URL('./', import.meta.url)) } },
    server: { watch: { useFsEvents: false, usePolling: true } },
  },
});
