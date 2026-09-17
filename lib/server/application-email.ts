import { applicationSchema } from '../application-validation';
import { applicationConsentVersion, businessTypeLabels } from '../application-options';

export interface ApplicationEmailBindings {
  CONTACT_EMAIL?: Pick<SendEmail, 'send'>;
  CONTACT_EMAIL_FROM?: string;
  CONTACT_EMAIL_TO?: string;
  CONTACT_PHONE_LIMIT?: RateLimit;
  CONTACT_IP_LIMIT?: RateLimit;
}

const reply = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

const deliveryUnavailable = () => reply({
  error: '상담 신청 메일의 전송을 확인하지 못했습니다. 입력 내용은 그대로 있으니 잠시 후 다시 제출해 주세요.',
}, 503);

const tooManyRequests = () => reply({
  error: '짧은 시간에 여러 번 신청하셨습니다. 이미 접수 완료 안내를 보셨다면 연락을 기다려 주세요. 그렇지 않다면 1분 뒤 다시 제출해 주세요.',
}, 429, { 'Retry-After': '60' });

async function rateLimitKey(kind: 'phone' | 'ip', value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${kind}:${value}`));
  return `consultation:${kind}:${Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')}`;
}

export async function handleApplicationRequest(
  request: Request,
  bindings: ApplicationEmailBindings,
  receivedAt = new Date(),
) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) {
    return reply({ error: '신청 페이지에서 다시 제출해 주세요.' }, 403);
  }
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return reply({ error: '입력 형식을 확인해 주세요.' }, 415);
  }

  let parsed;
  try {
    const text = await request.text();
    if (text.length > 12000) return reply({ error: '입력 내용이 너무 깁니다.' }, 413);
    parsed = applicationSchema.safeParse(JSON.parse(text));
  } catch {
    return reply({ error: '입력 내용을 확인해 주세요.' }, 400);
  }
  if (!parsed.success) {
    return reply({ error: '필요한 작업을 선택해 주세요. 홈페이지 주소를 입력했다면 형식을 확인해 주세요. 상담 내용(10자 이상), AI 사용 경험, 휴대전화번호와 동의는 필수입니다.' }, 400);
  }

  const { CONTACT_EMAIL: email, CONTACT_EMAIL_FROM: from, CONTACT_EMAIL_TO: to,
    CONTACT_PHONE_LIMIT: phoneLimit, CONTACT_IP_LIMIT: ipLimit } = bindings;
  if (!email || !phoneLimit || !ipLimit || !from || !to || /[\r\n]/.test(from + to)) {
    return deliveryUnavailable();
  }

  const data = parsed.data;
  try {
    const ip = request.headers.get('cf-connecting-ip') || 'unavailable';
    if (!(await ipLimit.limit({ key: await rateLimitKey('ip', ip) })).success) {
      return tooManyRequests();
    }
    if (!(await phoneLimit.limit({ key: await rateLimitKey('phone', data.phone) })).success) {
      return tooManyRequests();
    }

    const date = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul', dateStyle: 'long', timeStyle: 'medium',
    }).format(receivedAt);
    const text = [
      '세온비즈 무료 상담 신청',
      '',
      `접수번호: ${data.id}`,
      `접수 시각: ${date} (한국 시간)`,
      `필요한 작업: ${businessTypeLabels[data.businessType]}`,
      `휴대전화번호: ${data.phone}`,
      `홈페이지 또는 사업용 채널 주소: ${data.website || '입력하지 않음'}`,
      '',
      '[상담하고 싶은 내용]',
      data.problem,
      '',
      '[AI 사용 경험]',
      data.aiUsage,
      '',
      '개인정보 수집·이용 동의: 동의함',
      `동의 문서 버전: ${applicationConsentVersion}`,
      '',
      '상담 신청 내용을 운영자 이메일로 전달했습니다.',
      '동일한 접수번호의 메일이 여러 번 도착하면 같은 신청의 재전송일 수 있습니다.',
    ].join('\n');

    // A successful send confirms service acceptance. It does not make later retries idempotent.
    await email.send({
      from,
      to,
      subject: `[세온비즈] 무료 상담 신청 · ${data.id.slice(0, 8).toUpperCase()}`,
      text,
      headers: { 'X-Seonbiz-Submission-ID': data.id, 'Auto-Submitted': 'auto-generated' },
    });
    return reply({ id: data.id, received: true }, 201);
  } catch {
    console.error('Consultation email delivery failed');
    return deliveryUnavailable();
  }
}
