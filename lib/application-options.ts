export const businessTypes = ['shop', 'service', 'preparing', 'other'] as const;
export type BusinessType = typeof businessTypes[number];
export const businessTypeLabels: Record<BusinessType, string> = {
  shop: '쇼핑몰 운영',
  service: '정비·시공·펜션 등 서비스업',
  preparing: '아직 시작 전',
  other: '기타',
};
export const applicationConsentVersion = '2026-09-12-v2';

export function businessTypeLabel(value: unknown) {
  return typeof value === 'string' && businessTypes.includes(value as BusinessType)
    ? businessTypeLabels[value as BusinessType]
    : '기존 신청 · 미수집';
}
