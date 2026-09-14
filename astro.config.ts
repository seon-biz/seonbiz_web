import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'node:url';
import { sites } from './build/sites-vite-plugin';

export default defineConfig({
  site: 'https://seonbiz-coaching.jeongohkseo.chatgpt.site',
  output: 'static',
  trailingSlash: 'never',
  session: false,
  build: { serverEntry: 'index.js', format: 'file' },
  integrations: [react()],
  adapter: cloudflare({ imageService: 'passthrough', inspectorPort: false }),
  devToolbar: { enabled: false },
  vite: {
    cacheDir: process.argv.includes('build') ? 'node_modules/.vite-build' : 'node_modules/.vite',
    plugins: [sites()],
    optimizeDeps: { include: ['@astrojs/internal-helpers/create-filter', 'astro/assets/services/noop', 'lucide-react', 'radix-ui', 'class-variance-authority', 'clsx', 'tailwind-merge'] },
    resolve: { alias: { '@': fileURLToPath(new URL('./', import.meta.url)) } },
    server: { watch: { useFsEvents: false, usePolling: true } },
  },
});
