import { ArrowUpRight } from "lucide-react";
import type { WebsiteCase } from "@/lib/content";

export function WebsiteCaseCard({ item, compact = false }: { item: WebsiteCase; compact?: boolean }) {
  const image = <img src={item.image} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async" />;

  if (compact) {
    return <a href="/cases" className="website-case-card website-case-card-compact">
      <div className="website-case-image">{image}</div>
      <div className="website-case-copy">
        <p className="kicker">{item.homeLabel}</p>
        <h3>{item.homeTitle ?? item.title}</h3>
        <p className="website-case-meta">{item.homeMeta}</p>
      </div>
    </a>;
  }

  return <article className="website-case-card">
    <div className="website-case-image">{image}</div>
    <div className="website-case-copy">
      <p className="kicker">{item.label}</p>
      <h3>{item.title}</h3>
      <p className="website-case-meta">{item.meta}</p>
      <p className="website-case-body">{item.body}</p>
      <blockquote className="website-case-quote"><p>{item.quote}</p></blockquote>
      <a href={item.href} target="_blank" rel="noopener" className="text-link">
        홈페이지 보기 <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
  </article>;
}
