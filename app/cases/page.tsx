import { ArrowUpRight } from "lucide-react";
import { caseSummaries, type CaseSummary } from "@/lib/content";
import { ConsultCTA } from "@/components/site/coaching-blocks";
export const metadata = {
  title: '실제 사례',
  description: '생활용품 쇼핑몰의 AI 검색 유입, 스포츠용품 쇼핑몰의 구글 검색 기록과 세온비즈 자체 콘텐츠 제작을 소개합니다. 실제 화면과 비교 기간, 숫자를 해석할 때 알아둘 점도 함께 확인하세요.',
};

function CaseCard({item}: {item: CaseSummary}) {
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

export default function Cases() {
  const listed = caseSummaries.filter(item => item.listed !== false);
  return <main id="main">
    <section className="inner-hero container">
      <p className="eyebrow">실제 사례</p>
      <h1>바꾼 내용과 결과를<br/>실제 자료로 확인하세요.</h1>
      <p className="lead">상품 정보를 정비한 고객 사례와 직접 만든 콘텐츠를 소개합니다.<br/>고객 사례마다 다른 쇼핑몰이며, 업체명은 밝히지 않습니다.<br/>작업 내용, 비교 기간, 숫자를 해석할 때 알아둘 점을 함께 담았습니다.</p>
    </section>
    <section className="container case-group" aria-labelledby="customer-cases-title">
      <div className="case-group-heading"><h2 id="customer-cases-title">고객 사례</h2></div>
      <div className="case-grid">{listed.filter(item => item.category === 'customer').map(item => <CaseCard key={item.slug} item={item}/>)}</div>
    </section>
    <section className="container case-group case-own-group" aria-labelledby="own-cases-title">
      <div className="case-group-heading"><h2 id="own-cases-title">세온비즈가 직접 만든 것</h2><p>코칭에서 알려드리는 방법을 세온비즈 사업에 먼저 적용한 기록입니다.</p></div>
      <div className="case-own-list">{listed.filter(item => item.category === 'self').map(item => <CaseCard key={item.slug} item={item}/>)}</div>
    </section>
    <ConsultCTA/>
  </main>;
}
