// 코칭 금액은 모두 부가세 포함 원 단위입니다.
export const MONTHLY_COACHING = {
  sessions: 4,
  hoursPerSession: 2,
  priceWon: 1_320_000,
} as const;

export const REFUND_HOURLY_WON = 165_000;
export const MONTHLY_HOURS = MONTHLY_COACHING.sessions * MONTHLY_COACHING.hoursPerSession;
// 기존 공급가·부가세 표시는 부가세율 10%로 분리합니다.
export const MONTHLY_SUPPLY_WON = Math.round(MONTHLY_COACHING.priceWon / 1.1);
export const MONTHLY_VAT_WON = MONTHLY_COACHING.priceWon - MONTHLY_SUPPLY_WON;

function course(months: number) {
  return {
    months,
    sessions: months * MONTHLY_COACHING.sessions,
    priceWon: months * MONTHLY_COACHING.priceWon,
  } as const;
}

export const COACHING_COURSES = {
  website: course(2),
  content: course(1),
  ads: course(2),
} as const;

const numberFormat = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 4 });

export function formatManAmount(won: number): string {
  return numberFormat.format(won / 10_000);
}

export function formatManWon(won: number): string {
  return `${formatManAmount(won)}만 원`;
}

export function formatWon(won: number): string {
  return `${numberFormat.format(won)}원`;
}

export function formatKoreanWon(won: number): string {
  const man = Math.floor(won / 10_000);
  const remainder = won % 10_000;
  const tail = remainder % 1_000 === 0 ? `${remainder / 1_000}천` : numberFormat.format(remainder);
  const parts = [man ? `${numberFormat.format(man)}만` : '', remainder ? tail : ''].filter(Boolean);
  return parts.length ? `${parts.join(' ')} 원` : '0원';
}

export function formatCourseDuration(course: { months: number; sessions: number }): string {
  return `약 ${course.months}개월 (${course.sessions}회)`;
}

export function formatKoreanCount(count: number): string {
  return ['영', '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열'][count] ?? String(count);
}
