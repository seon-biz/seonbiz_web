import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

// Execute the real TypeScript handler with injected bindings; no Cloudflare account or mail is used.
const modules = new Map();
async function moduleUrl(filename) {
  if (modules.has(filename.href)) return modules.get(filename.href);
  let source = ts.transpileModule(await readFile(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  for (const match of [...source.matchAll(/from\s+(['"])([^'"]+)\1/g)]) {
    const specifier = match[2];
    const resolved = specifier.startsWith('.')
      ? await moduleUrl(new URL(`${specifier}.ts`, filename))
      : import.meta.resolve(specifier);
    source = source.replace(match[0], `from ${JSON.stringify(resolved)}`);
  }
  const result = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
  modules.set(filename.href, result);
  return result;
}
const { handleApplicationRequest } = await import(await moduleUrl(new URL('../lib/server/application-email.ts', import.meta.url)));

const id = '024e94ec-a93c-4d3a-8fbe-282497f55dc5';
const payload = {
  id, businessType: 'service', website: '', problem: '쇼핑몰 상품 설명을 직접 만들고 싶습니다.',
  aiUsage: '사용한 적 없음', phone: '010-0000-0000', consent: true, companyFax: '',
};
function request(data = payload, options = {}) {
  return new Request('https://example.test/api/applications', {
    method: 'POST',
    headers: {
      Origin: 'https://example.test', 'Content-Type': 'application/json',
      'CF-Connecting-IP': '192.0.2.10', ...options.headers,
    },
    body: options.body ?? JSON.stringify(data),
  });
}
function setup(overrides = {}) {
  const sent = [], phoneKeys = [], ipKeys = [];
  return {
    sent, phoneKeys, ipKeys,
    bindings: {
      CONTACT_EMAIL: { async send(message) { sent.push(message); return { messageId: 'email-test-id' }; } },
      CONTACT_EMAIL_FROM: 'consultation@example.test',
      CONTACT_EMAIL_TO: 'owner@example.test',
      CONTACT_PHONE_LIMIT: { async limit({ key }) { phoneKeys.push(key); return { success: true }; } },
      CONTACT_IP_LIMIT: { async limit({ key }) { ipKeys.push(key); return { success: true }; } },
      ...overrides,
    },
  };
}

for (const [name, data, options, status] of [
  ['foreign origin', payload, { headers: { Origin: 'https://foreign.test' } }, 403],
  ['missing origin', payload, { headers: { Origin: '' } }, 403],
  ['non-JSON body', payload, { headers: { 'Content-Type': 'text/plain' } }, 415],
  ['malformed JSON', payload, { body: '{' }, 400],
  ['oversized body', payload, { body: 'x'.repeat(12001) }, 413],
  ['missing consent', { ...payload, consent: false }, {}, 400],
  ['honeypot filled', { ...payload, companyFax: 'automated spam' }, {}, 400],
  ['invalid receipt ID', { ...payload, id: 'invalid' }, {}, 400],
  ['invalid business type', { ...payload, businessType: 'invalid' }, {}, 400],
  ['invalid phone', { ...payload, phone: 'not-a-phone' }, {}, 400],
  ['short consultation', { ...payload, problem: '짧음' }, {}, 400],
  ['unsafe website protocol', { ...payload, website: 'javascript:alert(1)' }, {}, 400],
]) {
  test(`Rejects ${name} before mail or rate-limit calls`, async () => {
    const context = setup();
    const response = await handleApplicationRequest(request(data, options), context.bindings);
    assert.equal(response.status, status);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal((await response.json()).received, undefined);
    assert.equal(context.sent.length + context.phoneKeys.length + context.ipKeys.length, 0);
  });
}

test('Sends Korean plain text to configured addresses and returns the same receipt', async () => {
  const context = setup();
  const response = await handleApplicationRequest(request({
    ...payload, to: 'attacker@example.test', from: 'attacker@example.test',
    problem: '  쇼핑몰 상품 설명을 직접 만들고 싶습니다.  ',
  }), context.bindings, new Date('2026-09-14T08:00:00Z'));
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { id, received: true });
  assert.equal(context.sent.length, 1);
  const message = context.sent[0];
  assert.equal(message.from, 'consultation@example.test');
  assert.equal(message.to, 'owner@example.test');
  assert.equal(message.html, undefined);
  assert.match(message.subject, /024E94EC/);
  for (const expected of [id, '정비·시공·펜션 등 서비스업', '01000000000',
    '사이트 또는 판매처 주소: 입력하지 않음', payload.problem, payload.aiUsage,
    '개인정보 수집·이용 동의: 동의함', '2026-09-14-v3', '2026년 9월 14일', '한국 시간']) {
    assert.ok(message.text.includes(expected), expected);
  }
  assert.equal(message.headers['X-Seonbiz-Submission-ID'], id);
  assert.equal(message.headers['Message-ID'], undefined);
  assert.match(context.phoneKeys[0], /^consultation:phone:[a-f0-9]{64}$/);
  assert.match(context.ipKeys[0], /^consultation:ip:[a-f0-9]{64}$/);
  assert.ok(!context.phoneKeys[0].includes('01000000000'));
  assert.ok(!context.ipKeys[0].includes('192.0.2.10'));
});

for (const name of ['CONTACT_IP_LIMIT', 'CONTACT_PHONE_LIMIT']) {
  test(`${name} blocks mail without claiming receipt`, async () => {
    const context = setup({ [name]: { async limit() { return { success: false }; } } });
    const response = await handleApplicationRequest(request(), context.bindings);
    assert.equal(response.status, 429);
    assert.equal(response.headers.get('retry-after'), '60');
    assert.equal((await response.json()).received, undefined);
    assert.equal(context.sent.length, 0);
  });
}

for (const name of ['CONTACT_EMAIL', 'CONTACT_EMAIL_FROM', 'CONTACT_EMAIL_TO', 'CONTACT_IP_LIMIT', 'CONTACT_PHONE_LIMIT']) {
  test(`Missing ${name} fails without attempting mail`, async () => {
    const context = setup({ [name]: undefined });
    const response = await handleApplicationRequest(request(), context.bindings);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).received, undefined);
    assert.equal(context.sent.length, 0);
  });
}

test('Does not acknowledge success before the mail service accepts', async () => {
  let release, entered;
  const enteredPromise = new Promise(resolve => { entered = resolve; });
  const context = setup({ CONTACT_EMAIL: { async send() {
    entered();
    return new Promise(resolve => { release = () => resolve({ messageId: 'accepted' }); });
  } } });
  let settled = false;
  const responsePromise = handleApplicationRequest(request(), context.bindings).then(response => { settled = true; return response; });
  await enteredPromise;
  assert.equal(settled, false);
  release();
  assert.equal((await responsePromise).status, 201);
});

test('A mail service failure is not retried and never logs application data', async () => {
  let calls = 0;
  const logs = [];
  const original = console.error;
  const context = setup({ CONTACT_EMAIL: { async send() {
    calls++;
    throw new Error(`sensitive ${payload.phone} ${payload.problem}`);
  } } });
  console.error = (...values) => logs.push(values.join(' '));
  try {
    const response = await handleApplicationRequest(request(), context.bindings);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).received, undefined);
    assert.equal(calls, 1);
    assert.deepEqual(logs, ['Consultation email delivery failed']);
  } finally { console.error = original; }
});

test('Rate limiting is consistent for normalized phone numbers', async () => {
  const context = setup();
  await handleApplicationRequest(request(), context.bindings);
  await handleApplicationRequest(request({ ...payload, phone: '01000000000' }), context.bindings);
  assert.equal(context.phoneKeys[0], context.phoneKeys[1]);
});
