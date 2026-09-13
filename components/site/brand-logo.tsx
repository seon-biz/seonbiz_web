export function BrandLogo({ decorative = false }: { decorative?: boolean }) {
  return (
    <img
      className="brand-logo"
      src="/images/brand/seonbiz-wordmark-approved.png"
      width={2030}
      height={375}
      alt={decorative ? "" : "SEON비즈"}
      decoding="async"
    />
  );
}
