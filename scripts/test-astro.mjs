import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readdir } from 'node:fs/promises';

const base = new URL(process.env.TEST_BASE_URL || 'http://127.0.0.1:3001');
if (!['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname)) throw new Error('Smoke tests only run against a local test server.');
let checks = 0;
const expect = (actual, expected, label) => { assert.equal(actual, expected, label); checks++; };
const request = (route, options = {}) => fetch(new URL(route, base), { redirect: 'manual', ...options });
const post = (route, data, headers = {}) => request(route, { method: 'POST', headers: { Origin: base.origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
const fixture = { businessType: 'existing', website: '', problem: 'outdated', problemOther: '', aiUsage: 'none', phone: '01000000000', consent: true, companyFax: '' };

async function staticRoutes(directory = 'dist/client', relative = '') {
  let routes = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const name = relative + item.name;
    if (item.isDirectory()) routes.push(...await staticRoutes(`${directory}/${item.name}`, `${name}/`));
    else if (item.name === 'index.html') routes.push('/' + relative.replace(/\/$/, ''));
    else if (item.name.endsWith('.html') && name !== '404.html') routes.push('/' + name.slice(0, -5));
  }
  return routes;
}

{
  const routes = [...new Set([...await staticRoutes(), '/', '/process', '/cases', '/notes', '/about', '/apply', '/privacy'])];
  for (const route of routes) {
    const response = await request(route);
    expect(response.status, 200, `Page ${route}`);
    const html = await response.text();
    assert.match(html, /name="generator" content="Astro v7/);
    assert.match(html, /<h1[\s>]/);
    assert(!/(쇼핑몰|상세페이지|스마트스토어|자사몰|쿠팡|SEON코더)/.test(html), `Removed commerce content in ${route}`);
  }
  expect((await request('/route-that-does-not-exist')).status, 404, 'Unknown URL');
  expect((await request('/coaching/unknown')).status, 404, 'Unknown coaching');
  const redirect = await request('/notes/choose-coaching');
  expect(redirect.status, 308, 'Legacy redirect status');
  assert(new URL(redirect.headers.get('location'), base).href.endsWith('/process#pricing'));
  for (const [from, to] of [
    ['/coaching/shop', '/coaching/website'],
    ['/coaching/service', '/coaching/website'],
    ['/notes/customer-questions', '/notes'],
    ['/cases/ai-search-visits', '/cases/ai-referral-data-2026'],
    ['/cases/sports-search-records', '/cases/search-performance-2025-2026'],
    ['/cases/search-records', '/cases/search-performance-2021-2022'],
    ['/cases/content-workflow', '/notes/content-formats'],
  ]) {
    const response = await request(from);
    assert([301, 302, 307, 308].includes(response.status), `Redirect status for ${from}`);
    checks++;
    assert.equal(new URL(response.headers.get('location'), base).pathname, to, `Redirect target for ${from}`);
    checks++;
  }

  expect((await request('/manage')).status, 404, 'Removed administrator page');
  expect((await post('/api/manage/login', { key: 'unused' })).status, 404, 'Removed administrator API');

  const fresh = () => ({ ...fixture, id: randomUUID() });
  expect((await post('/api/applications', fresh(), { Origin: 'https://invalid.example' })).status, 403, 'Application origin check');
  expect((await post('/api/applications', { ...fresh(), consent: false })).status, 400, 'Consent required');
  expect((await post('/api/applications', { ...fresh(), companyFax: 'bot' })).status, 400, 'Honeypot validation');
  expect((await post('/api/applications', { ...fresh(), businessType: 'unknown' })).status, 400, 'Business enum validation');
  expect((await post('/api/applications', { ...fresh(), problem: 'unknown' })).status, 400, 'Problem enum validation');
  expect((await post('/api/applications', { ...fresh(), aiUsage: 'unknown' })).status, 400, 'AI usage enum validation');
  expect((await post('/api/applications', { ...fresh(), problem: 'other', problemOther: 'x'.repeat(13000) })).status, 413, 'Request size limit');
  expect((await post('/api/applications', fresh(), { 'Content-Type': 'text/plain' })).status, 415, 'JSON required');
  expect((await request('/api/applications', { method: 'POST', headers: { Origin: base.origin, 'Content-Type': 'application/json' }, body: '{invalid' })).status, 400, 'Malformed JSON');
  console.log(`Passed ${checks} checks across ${routes.length} pages, redirects, removed admin routes, and application validation. No emails were sent.`);
}
