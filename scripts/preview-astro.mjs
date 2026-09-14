import './sites-env.mjs';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Test the built Worker while loading local secrets outside the deploy archive.
const args = process.argv.slice(2).map(arg => arg === '--host' ? '--ip' : arg);
const child = spawn(process.execPath, [
  fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url)),
  'dev', '--local', '--config', 'dist/server/wrangler.json',
  '--persist-to', fileURLToPath(new URL('../.wrangler/state', import.meta.url)),
  ...(existsSync('.dev.vars') ? ['--env-file', fileURLToPath(new URL('../.dev.vars', import.meta.url))] : []),
  ...args,
], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('error', error => { console.error(error); process.exitCode = 1; });
child.on('close', code => { process.exitCode = code ?? 0; });
