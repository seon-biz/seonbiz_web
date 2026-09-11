import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseSummaries } from "@/lib/content";
import { ConsultCTA } from "@/components/site/sections";
export const metadata={title:'실제 사례',description:'내 사업에도 도움이 될지 궁금하다면 실제 작업을 확인하세요. 식품 쇼핑몰의 검색 기록과 세온비즈 자체 콘텐츠 제작 예시를 공개합니다.'};
export default function Cases(){return <main id="main"><section className="inner-hero container"><p className="eyebrow">실제 사례</p><h1>말만으로 판단하기 어렵다면,<br/>실제 작업을 보세요.</h1><p className="lead">상품 정보를 손본 고객 쇼핑몰의 검색 기록,<br/>한 원고를 짧은 영상으로 만든 자체 제작 예시.<br/>대표님의 고민과 닮은 일이 있는지 살펴보세요.</p></section><section className="container case-grid">{caseSummaries.map(item=><Link key={item.slug} href={`/cases/${item.slug}`} className={`case-card ${item.slug==='content-workflow'?'case-content':''}`}><div className="case-thumb"><img src={item.image} alt={item.alt} loading="lazy"/></div><div className="case-card-copy"><p className="kicker">{item.tag}</p><h2>{item.title.replace('\n',' ')}</h2><p>{item.summary}</p><span className="text-link">작업 내용 살펴보기 <ArrowUpRight size={18}/></span></div></Link>)}</section><ConsultCTA/></main>}
