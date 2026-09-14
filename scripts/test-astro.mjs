import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readdir } from 'node:fs/promises';

const base = new URL(process.env.TEST_BASE_URL || 'http://127.0.0.1:3001');
if (!['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname)) throw new Error('Smoke tests only run against a local test server.');
try { process.loadEnvFile('.dev.vars'); } catch {}
const key = process.env.SEONBIZ_ADMIN_KEY;
assert(key, 'Set a local SEONBIZ_ADMIN_KEY before testing.');
let checks = 0;
const expect = (actual, expected, label) => { assert.equal(actual, expected, label); checks++; };
const request = (route, options = {}) => fetch(new URL(route, base), { redirect: 'manual', ...options });
const post = (route, data, headers = {}) => request(route, { method: 'POST', headers: { Origin: base.origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
let cookie = '';
const ids = [];
const fixture = { businessType: 'service', website: '', problem: 'Astro migration local test fixture only', aiUsage: '테스트용 데이터', phone: '01000000000', consent: true, companyFax: '' };

async function staticRoutes(directory = 'dist/client', relative = '') {
  let routes = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const name = relative + item.name;
    if (item.isDirectory()) routes.push(...await staticRoutes(`${directory}/${item.name}`, `${name}/`));
    else if (item.name === 'index.html') routes.push('/' + relative.replace(/\/$/, ''));
  }
  return routes;
}

try {
  const routes = await staticRoutes();
  for (const route of routes) {
    const response = await request(route);
    expect(response.status, 200, `Page ${route}`);
    const html = await response.text();
    assert.match(html, /name="generator" content="Astro v7/);
    assert.match(html, /<h1[\s>]/);
    assert(!html.includes('숙박'), `Old terminology in ${route}`);
  }
  expect((await request('/route-that-does-not-exist')).status, 404, 'Unknown URL');
  expect((await request('/coaching/unknown')).status, 404, 'Unknown coaching');
  const redirect = await request('/notes/choose-coaching');
  expect(redirect.status, 308, 'Legacy redirect status');
  assert(new URL(redirect.headers.get('location'), base).href.endsWith('/process#pricing'));

  expect((await post('/api/manage/login', { key: 'invalid-local-test-key' })).status, 401, 'Invalid admin key');
  expect((await post('/api/manage/login', { key }, { Origin: 'https://invalid.example' })).status, 403, 'Admin origin check');
  const login = await post('/api/manage/login', { key });
  expect(login.status, 200, 'Admin login');
  const setCookie = login.headers.get('set-cookie');
  assert(setCookie?.includes('HttpOnly') && setCookie.includes('SameSite=Strict') && setCookie.includes('Max-Age=28800'));
  cookie = setCookie.split(';')[0];
  const anonymous = await request('/manage');
  expect(anonymous.status, 200, 'Anonymous login page');
  assert((await anonymous.text()).includes('관리자 접속키'));
  assert(anonymous.headers.get('cache-control')?.includes('no-store'));
  const tampered = await request('/manage', { headers: { Cookie: cookie + 'bad' } });
  assert((await tampered.text()).includes('관리자 접속키'));
  checks++;

  const fresh = () => ({ ...fixture, id: randomUUID() });
  expect((await post('/api/applications', fresh(), { Origin: 'https://invalid.example' })).status, 403, 'Application origin check');
  expect((await post('/api/applications', { ...fresh(), consent: false })).status, 400, 'Consent required');
  expect((await post('/api/applications', { ...fresh(), companyFax: 'bot' })).status, 400, 'Honeypot validation');
  expect((await post('/api/applications', { ...fresh(), businessType: 'unknown' })).status, 400, 'Business enum validation');
  expect((await post('/api/applications', { ...fresh(), problem: 'short' })).status, 400, 'Minimum content length');
  expect((await post('/api/applications', { ...fresh(), problem: 'x'.repeat(13000) })).status, 413, 'Request size limit');
  expect((await post('/api/applications', fresh(), { 'Content-Type': 'text/plain' })).status, 415, 'JSON required');
  expect((await request('/api/applications', { method: 'POST', headers: { Origin: base.origin, 'Content-Type': 'application/json' }, body: '{invalid' })).status, 400, 'Malformed JSON');
  for (let i = 0; i < 5; i++) {
    const data = fresh();
    ids.push(data.id);
    const submitted = await post('/api/applications', data);
    expect(submitted.status, 201, 'Create application');
    expect((await submitted.json()).id, data.id, 'Receipt identifies saved application');
    if (i === 0) expect((await post('/api/applications', data)).status, 200, 'Idempotent retry');
  }
  expect((await post('/api/applications', fresh())).status, 429, 'Daily submission limit');
  const manage = await request('/manage', { headers: { Cookie: cookie } });
  expect(manage.status, 200, 'Authenticated application list');
  const html = await manage.text();
  assert(html.includes(fixture.problem) && html.includes('정비·시공·펜션 등 서비스업'));
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert(manage.headers.get('cache-control')?.includes('no-store'));
  expect((await request(`/api/manage/applications/${ids[0]}`, { method: 'DELETE', headers: { Origin: base.origin } })).status, 403, 'Delete requires authentication');
  expect((await request(`/api/manage/applications/${ids[0]}`, { method: 'DELETE', headers: { Origin: 'https://invalid.example', Cookie: cookie } })).status, 403, 'Delete requires matching origin');
  const logout = await post('/api/manage/logout', {}, { Cookie: cookie });
  expect(logout.status, 200, 'Admin logout');
  assert(logout.headers.get('set-cookie')?.includes('Max-Age=0'));
  console.log(`Passed ${checks} checks across ${routes.length} pages, redirects, application validation/storage, and admin authentication.`);
} finally {
  for (const id of ids) {
    const response = await request(`/api/manage/applications/${id}`, { method: 'DELETE', headers: { Origin: base.origin, Cookie: cookie } });
    assert.equal(response.status, 200, 'Remove local test fixture');
  }
  if (ids.length) {
    const response = await request('/manage', { headers: { Cookie: cookie } });
    assert(!(await response.text()).includes(fixture.problem), 'Local test fixtures must be removed.');
    console.log(`Removed all ${ids.length} local test fixtures.`);
  }
}
