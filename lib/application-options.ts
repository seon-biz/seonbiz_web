export const businessTypes = ['new', 'existing', 'content', 'unsure'] as const;
export type BusinessType = typeof businessTypes[number];
export const businessTypeLabels: Record<BusinessType, string> = {
  new: '새 홈페이지 만들기',
  existing: '기존 홈페이지 수정·관리',
  content: '콘텐츠·검색 데이터',
  unsure: '아직 잘 모르겠음',
};
export const applicationConsentVersion = '2026-09-17-v4';

export function businessTypeLabel(value: unknown) {
  return typeof value === 'string' && businessTypes.includes(value as BusinessType)
    ? businessTypeLabels[value as BusinessType]
    : '기존 신청 · 미수집';
}
