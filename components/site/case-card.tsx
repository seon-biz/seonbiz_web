import { ArrowUpRight } from "lucide-react";
import type { CaseSummary } from "@/lib/content";
export function CaseCard({item}: {item: CaseSummary}) {
  const dimensions = item.kind === 'ai' ? [1579, 996] : item.kind === 'search-current' ? [2734, 1300] : [1024, 456];
  return <a href={`/cases/${item.slug}`} className="case-card case-customer">
    <div className="case-thumb"><img src={item.image} width={dimensions[0]} height={dimensions[1]} alt={item.alt} loading="lazy" decoding="async"/></div>
    <div className="case-card-copy">
      <p className="kicker">{item.tag}</p>
      <h3>{item.title.replace('\n', ' ')}</h3>
      {item.interpretation && <p className="case-interpretation">{item.interpretation}</p>}
      <p>{item.summary}</p>
      {item.period && <p className="case-period">{item.period}</p>}
      <span className="text-link">작업 내용과 자료 보기 <ArrowUpRight size={18}/></span>
    </div>
  </a>;
}
