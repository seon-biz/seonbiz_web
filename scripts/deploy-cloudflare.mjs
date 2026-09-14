import './sites-env.mjs';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = JSON.parse(readFileSync('wrangler.cloudflare.jsonc', 'utf8'));
const built = JSON.parse(readFileSync('dist/server/wrangler.json', 'utf8'));
const email = source.send_email.find(item => item.name === 'CONTACT_EMAIL');
const builtEmail = built.send_email?.find(item => item.name === 'CONTACT_EMAIL');
if (
  basename(built.userConfigPath || '') !== 'wrangler.cloudflare.jsonc' ||
  !source.account_id || built.account_id !== source.account_id ||
  built.name !== source.name || built.main !== 'index.js' ||
  built.assets?.directory !== '../client' ||
  source.d1_databases?.length || built.d1_databases?.length ||
  !email?.destination_address || builtEmail?.destination_address !== email.destination_address ||
  built.vars?.CONTACT_EMAIL_TO !== email.destination_address ||
  built.vars?.CONTACT_EMAIL_FROM !== source.vars.CONTACT_EMAIL_FROM ||
  JSON.stringify(built.ratelimits) !== JSON.stringify(source.ratelimits)
) {
  throw new Error('Cloudflare deployment target does not match. Run npm run build:cloudflare first.');
}

const args = process.argv.slice(2);
if (args.some(arg => arg !== '--dry-run')) throw new Error('Only --dry-run is supported as an additional argument.');
const result = spawnSync(process.execPath, [
  fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url)),
  'deploy', '--config', 'dist/server/wrangler.json', ...args,
], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
