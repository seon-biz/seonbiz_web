import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseSummaries } from "@/lib/content";
import { ConsultCTA } from "@/components/site/sections";
export const metadata={title:'실제 사례',description:'세온비즈가 진행한 식품 쇼핑몰 작업과 자체 콘텐츠 제작 사례입니다. 구글 검색 기록과 실제 결과물을 소개합니다.'};
export default function Cases(){return <main id="main"><section className="inner-hero container"><p className="eyebrow">실제 사례</p><h1>어떤 일을 해왔는지<br/>보여드립니다.</h1><p className="lead">식품 쇼핑몰에서 진행한 작업과 검색 기록,<br/>세온비즈가 직접 만든 콘텐츠를 소개합니다.</p></section><section className="container case-grid">{caseSummaries.map(item=><Link key={item.slug} href={`/cases/${item.slug}`} className={`case-card ${item.slug==='content-workflow'?'case-content':''}`}><div className="case-thumb"><img src={item.image} alt={item.alt} loading="lazy"/></div><div className="case-card-copy"><p className="kicker">{item.tag}</p><h2>{item.title.replace('\n',' ')}</h2><p>{item.summary}</p><span className="text-link">자세히 보기 <ArrowUpRight size={18}/></span></div></Link>)}</section><ConsultCTA/></main>}
