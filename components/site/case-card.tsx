import { ArrowUpRight } from "lucide-react";
import type { CaseSummary } from "@/lib/content";
export function CaseCard({item}: {item: CaseSummary}) {
  const dimensions = item.image.includes('household') ? [2688, 1694] : item.image.includes('sports-search') ? [2734, 1300] : item.image.includes('content-') ? [1080, item.image.includes('poster') || item.image.includes('scene') ? 1920 : 1350] : item.image.includes('search-') ? [1024, 456] : [1448, 1086];
  return <a href={`/cases/${item.slug}`} className={`case-card ${item.category === 'self' ? 'case-content' : 'case-customer'}`}>
    <div className="case-thumb"><img src={item.image} width={dimensions[0]} height={dimensions[1]} alt={item.alt} loading="lazy" decoding="async"/></div>
    <div className="case-card-copy">
      <p className="kicker">{item.tag}</p>
      <h3>{item.title.replace('\n', ' ')}</h3>
      <p>{item.summary}</p>
      {item.period && <p className="case-period">{item.period}</p>}
      <span className="text-link">작업 내용과 자료 보기 <ArrowUpRight size={18}/></span>
    </div>
  </a>;
}
