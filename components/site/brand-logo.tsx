export function BrandLogo({ decorative = false }: { decorative?: boolean }) {
  return (
    <img
      className="brand-logo"
      src="/images/brand/seonbiz-wordmark.png"
      width={980}
      height={205}
      alt={decorative ? "" : "SEON비즈"}
      decoding="async"
    />
  );
}
