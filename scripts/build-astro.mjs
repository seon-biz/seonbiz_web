import './sites-env.mjs';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, readdir, rm, access, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const result = spawnSync(process.execPath, [fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url)), 'build'], { stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

// Cloudflare's preview build may emit local secret files. Never package them.
async function removeLocalEnvironmentFiles(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, item.name);
    if (item.isDirectory()) await removeLocalEnvironmentFiles(filename);
    else if (item.name.startsWith('.dev.vars') || item.name.startsWith('.env')) await rm(filename);
  }
}
await removeLocalEnvironmentFiles('dist');
if (process.env.SEONBIZ_DEPLOY_TARGET === 'cloudflare') {
  const workerConfigPath = 'dist/server/wrangler.json';
  const workerConfig = JSON.parse(await readFile(workerConfigPath, 'utf8'));
  workerConfig.assets = { ...workerConfig.assets, run_worker_first: true };
  await writeFile(workerConfigPath, JSON.stringify(workerConfig));
}
if (process.env.SEONBIZ_DEPLOY_TARGET !== 'cloudflare') {
  await mkdir('dist/.openai', { recursive: true });
  await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
  await cp('drizzle', 'dist/.openai/drizzle', { recursive: true });
}
await access('dist/server/index.js');
await access('dist/server/wrangler.json');
console.log('Astro Worker and static pages are ready. Local environment files have been excluded.');
