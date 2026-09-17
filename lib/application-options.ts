export const businessTypes = ['existing', 'new', 'content', 'unsure'] as const;
export type BusinessType = typeof businessTypes[number];
export const businessTypeLabels: Record<BusinessType, string> = {
  new: '새 홈페이지 만들기',
  existing: '기존 홈페이지 수정·관리',
  content: '콘텐츠·검색 데이터',
  unsure: '아직 잘 모르겠음',
};

export const problemTypes = ['outdated', 'none', 'no-inquiries', 'content', 'other'] as const;
export type ProblemType = typeof problemTypes[number];
export const problemTypeLabels: Record<ProblemType, string> = {
  outdated: '홈페이지가 오래됐는데 고칠 방법을 모르겠다',
  none: '홈페이지가 아예 없다',
  'no-inquiries': '방문은 있는데 문의로 이어지지 않는다',
  content: '블로그·SNS를 뭘 써야 할지 모르겠다',
  other: '기타',
};

export const aiUsageTypes = ['none', 'some', 'frequent'] as const;
export type AiUsageType = typeof aiUsageTypes[number];
export const aiUsageLabels: Record<AiUsageType, string> = {
  none: '써본 적 없음',
  some: '조금 써봤음',
  frequent: '자주 쓰는 편',
};
export const applicationConsentVersion = '2026-09-17-v5';

export function businessTypeLabel(value: unknown) {
  return typeof value === 'string' && businessTypes.includes(value as BusinessType)
    ? businessTypeLabels[value as BusinessType]
    : '기존 신청 · 미수집';
}
