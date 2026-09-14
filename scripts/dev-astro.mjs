import './sites-env.mjs';
// Keep the dev server in this terminal so its lifecycle belongs to the preview.
process.env.ASTRO_DEV_BACKGROUND = '1';
process.argv = [process.execPath, new URL('../node_modules/astro/bin/astro.mjs', import.meta.url).pathname, 'dev', ...process.argv.slice(2)];
await import('../node_modules/astro/bin/astro.mjs');
