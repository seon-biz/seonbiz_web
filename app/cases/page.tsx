import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseSummaries } from "@/lib/content";
import { ConsultCTA } from "@/components/site/sections";
export const metadata={title:'실제 사례',description:'세온비즈가 다룬 작업과 실제 데이터, 자체 콘텐츠 제작 과정을 구분해 소개합니다.'};
export default function Cases(){return <main id="main"><section className="inner-hero container"><p className="eyebrow">실제 사례</p><h1>바꾼 일과 기록을,<br/>함께 봅니다.</h1><p className="lead">기간과 지표, 진행한 작업, 해석할 수 있는 범위까지.<br/>고객 사례와 세온비즈 자체 운영을 구분해 소개합니다.</p></section><section className="container case-grid">{caseSummaries.map(item=><Link key={item.slug} href={`/cases/${item.slug}`} className={`case-card ${item.slug==='content-workflow'?'case-content':''}`}><div className="case-thumb"><img src={item.image} alt={item.alt} loading="lazy"/></div><div className="case-card-copy"><p className="kicker">{item.tag}</p><h2>{item.title.replace('\n',' ')}</h2><p>{item.summary}</p><span className="text-link">자세히 보기 <ArrowUpRight size={18}/></span></div></Link>)}</section><ConsultCTA/></main>}
