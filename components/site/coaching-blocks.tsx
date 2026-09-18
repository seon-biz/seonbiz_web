"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { coachingSteps, faqs, workAreas } from "@/lib/content";
import { Reveal } from "./sections";

const homeCoachingSteps = [
  {
    label: "상황 확인",
    title: "무엇부터 손댈지 같이 정합니다.",
    body: "지금 홈페이지와 사업 자료를 함께 봅니다. 고객이 자주 묻는 것, 현장 사진, 쓰다 만 메모까지 꺼내놓고 어디부터 시작할지 정합니다.",
  },
  {
    label: "제작과 수정",
    title: "대표님 화면에서 같이 만듭니다.",
    body: "세온비즈 계정이 아니라 대표님 계정에서 작업합니다. AI가 쓴 내용이 실제 사업과 맞는지 함께 확인하고, 휴대전화에서 읽고 전화하기 쉬운지도 봅니다.",
  },
  {
    label: "검색 기반",
    title: "검색과 AI에 걸리게 손봅니다.",
    body: "제목과 본문, 이미지 설명을 정리하고 검색엔진이 읽을 수 있는지 확인합니다. GA4와 구글 서치콘솔을 연결해 기록이 쌓이기 시작합니다.",
  },
  {
    label: "운영과 분석",
    title: "실제 방문 기록을 같이 읽습니다.",
    body: "측정이 제대로 되는지 먼저 확인하고 4주간 기록을 모읍니다. 어떤 숫자를 보고 판단할지 함께 익히고 다음 작업을 정합니다. 블로그·SNS 발행까지 원하시면 그다음에 이어서 진행합니다.",
  },
];

export function ScopeList() {
  return <section className="container section scope-overview">
    <div className="section-heading"><p className="eyebrow">코칭에서 다루는 일</p><h2>만들고 끝나면,<br/>아무것도 안 남습니다.</h2><p>홈페이지를 만들고, 검색에 걸리게 하고, 실제 방문 기록까지 봅니다. 순서는 첫 상담에서 정합니다.</p></div>
    <div className="scope-list">{workAreas.map((area,i)=><Reveal key={area.name}><article><span className="step-index">0{i+1}</span><h3>{area.name}</h3><p>{area.description}</p></article></Reveal>)}</div>
  </section>;
}

export function Method({showSessionExample=false,showProcessLink=true,showProjectEstimate=false,homeCopy=false}:{showSessionExample?:boolean;showProcessLink?:boolean;showProjectEstimate?:boolean;homeCopy?:boolean}={}) {
  const displayedSteps = homeCopy ? homeCoachingSteps : coachingSteps;
  return <section id="method" className="container section method-section">
    <div className="method-flow">
    <div className="method-sticky"><p className="eyebrow">일대일 코칭 진행 방식</p><h2>{homeCopy?<>보면서 따라<br/>하시면 됩니다.</>:<>실제 작업을 하면서<br/>하나씩 익힙니다.</>}</h2><p className="lead method-lead">한 번에 {2}시간, Zoom으로 화면을 공유합니다. 월 코칭에서는 직접 해본 결과와 어려웠던 부분을 다음 시간에 다시 살펴봅니다.</p>
      <div className="takeaway-note"><p className="kicker">코칭 후에 남기는 것</p><ul><li>함께 작성하고 수정한 내용</li><li>다시 작업할 때 볼 순서와 메모</li><li>다음에 직접 해볼 일</li></ul></div>
      {showProcessLink&&<a href="/process" className="text-link">진행 방식과 준비물 보기 <ArrowRight size={18}/></a>}
    </div>
    <div className="method-steps">{displayedSteps.map((step,i)=><Reveal key={step.label}><article className="method-step is-active"><span className="step-index">{homeCopy?step.label:<>0{i+1} / {step.label}</>}</span><h3>{step.title}</h3><p>{step.body}</p></article></Reveal>)}</div>
    </div>
    {showSessionExample&&<div className="session-example"><div><p className="eyebrow">홈페이지 제작 기간</p><h3>{"약 2개월 (8회)"}입니다.</h3><p>페이지 수와 기능, 기존 상태와 준비된 자료에 따라 달라집니다.<br/>{homeCopy?`월 코칭으로 진행하면 264만 원 (부가세 포함)입니다.`:'첫 데이터 분석까지는 대체로 약 2~3개월입니다.'}</p></div><dl><div><dt>1~2회차</dt><dd>현재 상태와 필요한 페이지를 정하고 제작을 시작합니다</dd></div><div><dt>{homeCopy?'3~6회차':'3~4회차'}</dt><dd>화면과 내용을 완성하며 SEO·GEO와 측정을 설정합니다</dd></div><div><dt>{homeCopy?`7~8회차`:`5~8회차`}</dt><dd>페이지를 보완하고 직접 관리하는 방법을 익힙니다</dd></div><div><dt>측정 후 4주~</dt><dd>GA4·서치콘솔의 첫 데이터를 분석하고 다음 작업을 정합니다</dd></div></dl>{showProjectEstimate&&<p className="session-cost-note">월 코칭으로 진행하면 홈페이지 완성까지 {"약 2개월 (8회)"}, {"264만 원"} (부가세 포함)입니다.<br/>준비된 자료와 페이지 수에 따라 달라지며, 첫 상담에서 범위를 함께 정합니다.</p>}</div>}
  </section>;
}

export function Pricing({showProcessDetails=false,homeCopy=false}:{showProcessDetails?:boolean;homeCopy?:boolean}={}) {
  return <section id="pricing" className="pricing"><div className="container section">
    <div className="section-heading pricing-heading"><div><p className="eyebrow">코칭 시간과 비용</p><h2>{homeCopy?<>한 달 해보고<br/>결정하세요.</>:<>필요한 만큼 선택하고,<br/>한 달씩 이어갑니다.</>}</h2></div><p>첫 상담에서 하려는 일을 이야기합니다.<br/>{homeCopy?'시간과 진행 방식이 맞는지 먼저 확인하시면 됩니다.':'시간과 진행 방식이 맞는지 확인한 뒤 결정하세요.'}</p></div>
    <div className="pricing-comparison"><p className="eyebrow">제작 외주와 다른 점</p><h3>{homeCopy?<>맡기면 남는 게<br/>없습니다.</>:<>제작을 맡기면 끝나지만,<br/>여기서는 시작입니다.</>}</h3><div className="pricing-comparison-copy">{showProcessDetails?<><p>온라인 외주 플랫폼의 기업형 홈페이지 제작 상품은 보통 210만~400만 원 선입니다. 완성된 화면을 받는 방식이고, 이후 문구 하나를 바꾸려면 다시 연락하고 다시 비용이 들 수 있습니다.</p><p>코칭은 대표님 계정에서 함께 만듭니다. 도메인·호스팅·수정 권한이 전부 대표님께 남고, 다음 수정은 직접 하십니다.</p><p className="pricing-comparison-note">페이지 수와 기능이 다르므로 금액을 그대로 비교하기는 어렵지만, 남는 것이 다릅니다.</p></>:<><p>제작 외주는 완성된 화면을 받고 끝납니다. 이후 문구 하나를 바꾸려면 다시 연락하고, 다시 비용이 들 수 있습니다.</p><p>코칭은 대표님 계정에서 함께 만듭니다. 도메인·호스팅·수정 권한이 전부 대표님께 남고, 다음 수정은 직접 하십니다.</p></>}</div></div>
    {showProcessDetails&&<div className="comparison-table-block"><table className="comparison-table"><caption className="sr-only">제작 외주와 세온비즈 코칭 비교</caption><thead><tr><th scope="col">구분</th><th scope="col">제작 외주</th><th scope="col">세온비즈 코칭</th></tr></thead><tbody><tr><th scope="row">받는 것</th><td data-column="제작 외주">완성된 홈페이지</td><td data-column="세온비즈 코칭">홈페이지 + 고치는 방법</td></tr><tr><th scope="row">계정 소유</th><td data-column="제작 외주">업체 계정인 경우가 있음</td><td data-column="세온비즈 코칭">처음부터 대표님 계정</td></tr><tr><th scope="row">문구 수정</th><td data-column="제작 외주">업체에 의뢰</td><td data-column="세온비즈 코칭">직접</td></tr><tr><th scope="row">수정 비용</th><td data-column="제작 외주">건별 발생 가능</td><td data-column="세온비즈 코칭">없음</td></tr><tr><th scope="row">검색·측정</th><td data-column="제작 외주">별도 계약인 경우가 많음</td><td data-column="세온비즈 코칭">코칭 과정에 포함</td></tr></tbody></table><p className="comparison-table-note">외주 조건은 업체와 상품에 따라 다릅니다. 일반적인 경우를 정리한 것입니다.</p></div>}
    <div className="price-list">
      <article className="price-row"><div><p className="kicker">코칭을 시작하기 전에</p><h3>첫 무료 상담</h3></div><div><strong>현재 상황과 코칭 가능 여부 확인</strong><p>무엇부터 시작하면 좋을지 함께 살펴봅니다. 실제 수정·제작과 상세 보고서는 유료 코칭에서 진행합니다.</p>{showProcessDetails&&<p className="consult-response">신청하시면 <strong>1영업일 이내에 카카오톡으로 연락드립니다.</strong> 연결이 어려우면 문자로 안내드립니다.</p>}</div><div className="price-amount"><strong>무료</strong><span>1시간 · Zoom</span></div></article>
      <article className="price-row"><div><p className="kicker">직접 해본 일을 다음 시간에 점검</p><h3>월 코칭</h3></div><div><strong>{`월 4회 × 2시간 · 총 8시간`}</strong><p>보통 주 1회 진행합니다. 한 달 단위로 신청하고, 해본 결과와 다음 과제를 보고 연장 여부를 정합니다.</p></div><div className="price-amount"><strong>{"132"}<span>만 원</span></strong>{showProcessDetails&&<span className="price-hourly">시간당 {"16만 5천 원"}</span>}<span>{`공급가 120만 원 + 부가세 12만 원`}</span></div></article>
    </div>
    <p className="pricing-footnote">모두 부가세 포함 금액입니다. 5주인 달에도 월 코칭은 {4}회입니다. 결제는 계좌이체로 진행하며, 규모가 큰 별도 제작은 작업 내용과 비용을 따로 협의합니다.</p>
    {showProcessDetails&&<div className="refund-summary"><h3>취소하셔도 안 쓴 시간은 돌려드립니다</h3><ul><li>첫 코칭 전 취소 → 결제액 전액 환불</li><li>시작 후 취소 → 진행한 시간만 차감, 별도 수수료 없음</li><li>당일 불참만으로 1회를 자동 차감하지 않습니다</li></ul><a href="/process#changes" className="text-link policy-link">일정 변경·취소·환불 기준 보기 <ArrowRight size={18}/></a></div>}
    {showProcessDetails?<div className="process-cost-details"><div className="additional-costs"><h3>추가로 드는 비용</h3><p>세온비즈 계정으로 작업할 때는 세온비즈가 AI 구독료를 냅니다.<br/>대표님 화면과 계정에서 작업할 때는 대표님이 구독료를 부담합니다.</p><p>광고비, 도메인·호스팅 비용은 코칭료에 포함되지 않습니다.</p></div><div className="included-support"><h3>코칭에 포함된 것</h3><p>코칭 사이에 생긴 질문은 카카오톡으로 답변드립니다.<br/>메시지로 답하기 어렵거나 추가 작업이 필요한 경우에는 코칭 시간에 설명하고 진행합니다.</p></div></div>:<div className="cost-details"><div><h3>코칭 사이의 질문은 카카오톡으로</h3><p>질문을 남겨주시면 카카오톡으로 답변드립니다. 메시지로 설명하기 어렵거나 추가 작업이 필요한 내용은 코칭 시간에 함께 진행합니다.</p></div><div><h3>AI 구독료와 운영 비용</h3><p>세온비즈 계정에서 작업할 때는 세온비즈가 AI 구독료를 냅니다. 고객 화면과 계정에서 작업할 때는 고객이 부담합니다. 광고비와 도메인·호스팅 비용 등은 별도입니다.</p></div></div>}
    {!showProcessDetails&&<a href="/process#changes" className="text-link policy-link">일정 변경·취소·환불 기준 보기 <ArrowRight size={18}/></a>}
  </div></section>;
}

export function PricingSummary() {
  return <section className="container section pricing-summary"><div><p className="eyebrow">코칭 신청 안내</p><h2>첫 상담에서<br/>진행할 일을 정합니다.</h2><p className="lead">1시간 무료 상담 후 코칭을 선택하세요.</p></div><div><dl><div><dt>월 코칭 <span>{`4회 × 2시간`}</span></dt><dd>{"132만 원"}</dd></div></dl><p className="meta">부가세 포함 · AI 구독료와 운영 비용은 사용 계정과 항목에 따라 별도 부담</p><a href="/process" className="text-link">진행 방식·포함 내용·비용 자세히 보기 <ArrowRight size={18}/></a></div></section>;
}

export function FAQ({subset,additions=[],items:customItems,homeCopy=false,showIntro=true}:{subset?:number[];additions?:{q:string;a:string}[];items?:{q:string;a:string}[];homeCopy?:boolean;showIntro?:boolean}={}) {
  const items=customItems??[...(subset?subset.map(i=>faqs[i]):faqs),...additions];
  return <section className="container section faq-section"><div><p className="eyebrow">신청 전에 궁금한 점</p><h2>{homeCopy?'이런 게 궁금하시죠.':'미리 확인하세요.'}</h2>{showIntro&&<p className="faq-intro">설명으로 충분하지 않은 부분은<br/>무료 상담에서 함께 이야기합니다.</p>}</div><Accordion type="single" collapsible className="faq-list">{items.map((item,i)=><AccordionItem value={`faq-${i}`} key={item.q}><AccordionTrigger id={`faq-question-${i}`}>{item.q}</AccordionTrigger><AccordionContent>{item.a}</AccordionContent></AccordionItem>)}</Accordion></section>;
}

export function ConsultCTA({title="지금 필요한 일부터\n이야기해 보세요.",description="어떤 도움이 필요한지 듣고, 코칭에서 함께 할 수 있는 일을 안내하겠습니다.",button="1시간 무료 상담 신청",note="코칭 신청은 상담 후 결정하시면 됩니다."}:{title?:string;description?:string;button?:string;note?:string}={}) {
  return <section className="consult-cta"><div className="container"><p className="eyebrow">첫 상담 1시간 무료 · Zoom</p><h2>{title.split('\n').map((line,i)=><span key={line}>{i>0&&<br/>}{line}</span>)}</h2><p>{description}</p><a href="/apply" className="button button-coral">{button} <ArrowUpRight size={20}/></a><span className="cta-note">{note}</span></div></section>;
}
