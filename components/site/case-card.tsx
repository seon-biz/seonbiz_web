import { ArrowUpRight } from "lucide-react";
import type { CaseSummary } from "@/lib/content";
export function CaseCard({item}: {item: CaseSummary}) {
  return <a href={`/cases/${item.slug}`} className={`case-card ${item.category === 'self' ? 'case-content' : 'case-customer'}`}>
    <div className="case-thumb"><img src={item.image} alt={item.alt} loading="lazy"/></div>
    <div className="case-card-copy">
      <p className="kicker">{item.tag}</p>
      <h3>{item.title.replace('\n', ' ')}</h3>
      <p>{item.summary}</p>
      {item.period && <p className="case-period">{item.period}</p>}
      <span className="text-link">작업 내용과 자료 보기 <ArrowUpRight size={18}/></span>
    </div>
  </a>;
}
