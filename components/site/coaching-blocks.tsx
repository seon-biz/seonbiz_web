"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { coachingSteps, faqs, workAreas } from "@/lib/content";
import { Reveal } from "./sections";

export function ScopeList() {
  return <section className="container section scope-overview">
    <div className="section-heading"><p className="eyebrow">코칭에서 다루는 일</p><h2>지금 필요한 작업부터<br/>함께 해봅니다.</h2><p>홈페이지부터 홍보와 데이터까지 살펴봅니다. 필요한 일을 고르고, 코칭 시간과 준비된 자료에 맞춰 진행합니다.</p></div>
    <div className="scope-list">{workAreas.map((area,i)=><Reveal key={area.name}><article><span className="step-index">0{i+1}</span><h3>{area.name}</h3><p>{area.description}</p></article></Reveal>)}</div>
  </section>;
}

export function Method({showSessionExample=false}:{showSessionExample?:boolean}={}) {
  return <section id="method" className="container section method-section">
    <div className="method-sticky"><p className="eyebrow">일대일 코칭 진행 방식</p><h2>실제 작업을 하면서<br/>하나씩 익힙니다.</h2><p className="lead method-lead">한 번에 2시간, Zoom으로 화면을 공유합니다. 월 코칭에서는 직접 해본 결과와 어려웠던 부분을 다음 시간에 다시 살펴봅니다.</p>
      <div className="takeaway-note"><p className="kicker">코칭 후에 남기는 것</p><ul><li>함께 작성하고 수정한 내용</li><li>다시 작업할 때 볼 순서와 메모</li><li>다음에 직접 해볼 일</li></ul></div>
      <a href="/process" className="text-link">진행 방식과 준비물 보기 <ArrowRight size={18}/></a>
    </div>
    <div className="method-steps">{coachingSteps.map((step,i)=><Reveal key={step.label}><article className="method-step is-active"><span className="step-index">0{i+1} / {step.label}</span><h3>{step.title}</h3><p>{step.body}</p></article></Reveal>)}</div>
    {showSessionExample&&<div className="session-example"><div><p className="eyebrow">회차별 진행 예시</p><h3>몇 번이면 혼자 할 수 있나요?</h3><p>빠른 분은 4회, 시간이 걸리는 분은 8회 정도 걸립니다.<br/>하시던 일과 준비된 자료에 따라 달라집니다.</p></div><dl><div><dt>1~2회차</dt><dd>지금 상태를 같이 보고, 가장 급한 것부터 손댑니다</dd></div><div><dt>3~4회차</dt><dd>대표님이 같은 작업을 혼자 해보고, 막힌 곳을 점검합니다</dd></div><div><dt>5회차~</dt><dd>나머지 상품과 페이지에 스스로 적용하고, 다음 작업을 정합니다</dd></div></dl></div>}
  </section>;
}

export function Pricing() {
  return <section id="pricing" className="pricing"><div className="container section">
    <div className="section-heading pricing-heading"><div><p className="eyebrow">코칭 시간과 비용</p><h2>필요한 만큼 선택하고,<br/>한 달씩 이어갑니다.</h2></div><p>첫 상담에서 하려는 일을 이야기합니다.<br/>시간과 진행 방식이 맞는지 확인한 뒤 결정하세요.</p></div>
    <div className="price-list">
      <article className="price-row"><div><p className="kicker">코칭을 시작하기 전에</p><h3>첫 무료 상담</h3></div><div><strong>현재 상황과 코칭 가능 여부 확인</strong><p>무엇부터 시작하면 좋을지 함께 살펴봅니다. 실제 수정·제작과 상세 보고서는 유료 코칭에서 진행합니다.</p></div><div className="price-amount"><strong>무료</strong><span>1시간 · Zoom</span></div></article>
      <article className="price-row"><div><p className="kicker">직접 해본 일을 다음 시간에 점검</p><h3>월 코칭</h3></div><div><strong>월 4회 × 2시간 · 총 8시간</strong><p>보통 주 1회 진행합니다. 한 달 단위로 신청하고, 해본 결과와 다음 과제를 보고 연장 여부를 정합니다.</p></div><div className="price-amount"><strong>132<span>만 원</span></strong><span>공급가 120만 원 + 부가세 12만 원</span></div></article>
      <article className="price-row"><div><p className="kicker">필요한 작업을 한 번에 집중해서</p><h3>단독 코칭</h3></div><div><strong>1회 2시간</strong><p>상품 설명이나 광고 설정 등 필요한 일을 정합니다. 준비된 자료를 보고 두 시간 안에 가능한 작업부터 진행합니다.</p></div><div className="price-amount"><strong>44<span>만 원</span></strong><span>공급가 40만 원 + 부가세 4만 원</span></div></article>
    </div>
    <p className="pricing-footnote">모두 부가세 포함 금액입니다. 5주인 달에도 월 코칭은 4회입니다. 결제는 계좌이체로 진행하며, 규모가 큰 별도 제작은 작업 내용과 비용을 따로 협의합니다.</p>
    <div className="cost-details"><div><h3>코칭 사이의 질문은 카카오톡으로</h3><p>질문을 남겨주시면 카카오톡으로 답변드립니다. 메시지로 설명하기 어렵거나 추가 작업이 필요한 내용은 코칭 시간에 함께 진행합니다.</p></div><div><h3>AI 구독료와 운영 비용</h3><p>세온비즈 계정에서 작업할 때는 세온비즈가 AI 구독료를 냅니다. 고객 화면과 계정에서 작업할 때는 고객이 부담합니다. 광고비와 도메인·호스팅 비용 등은 별도입니다.</p></div></div>
    <a href="/process#changes" className="text-link policy-link">일정 변경·취소·환불 기준 보기 <ArrowRight size={18}/></a>
  </div></section>;
}

export function PricingSummary() {
  return <section className="container section pricing-summary"><div><p className="eyebrow">코칭 신청 안내</p><h2>첫 상담에서<br/>진행할 일을 정합니다.</h2><p className="lead">1시간 무료 상담 후 코칭을 선택하세요.</p></div><div><dl><div><dt>월 코칭 <span>4회 × 2시간</span></dt><dd>132만 원</dd></div><div><dt>단독 코칭 <span>1회 2시간</span></dt><dd>44만 원</dd></div></dl><p className="meta">부가세 포함 · AI 구독료와 운영 비용은 사용 계정과 항목에 따라 별도 부담</p><a href="/process" className="text-link">진행 방식·포함 내용·비용 자세히 보기 <ArrowRight size={18}/></a></div></section>;
}

export function FAQ({subset,additions=[],items:customItems}:{subset?:number[];additions?:{q:string;a:string}[];items?:{q:string;a:string}[]}={}) {
  const items=customItems??[...(subset?subset.map(i=>faqs[i]):faqs),...additions];
  return <section className="container section faq-section"><div><p className="eyebrow">신청 전에 궁금한 점</p><h2>미리 확인하세요.</h2><p className="faq-intro">설명으로 충분하지 않은 부분은<br/>무료 상담에서 함께 이야기합니다.</p></div><Accordion type="single" collapsible className="faq-list">{items.map((item,i)=><AccordionItem value={`faq-${i}`} key={item.q}><AccordionTrigger id={`faq-question-${i}`}>{item.q}</AccordionTrigger><AccordionContent>{item.a}</AccordionContent></AccordionItem>)}</Accordion></section>;
}

export function ConsultCTA({title="지금 필요한 일부터\n이야기해 보세요.",description="어떤 도움이 필요한지 듣고, 코칭에서 함께 할 수 있는 일을 안내하겠습니다.",button="1시간 무료 상담 신청"}:{title?:string;description?:string;button?:string}={}) {
  return <section className="consult-cta"><div className="container"><p className="eyebrow">첫 상담 1시간 무료 · Zoom</p><h2>{title.split('\n').map((line,i)=><span key={line}>{i>0&&<br/>}{line}</span>)}</h2><p>{description}</p><a href="/apply" className="button button-coral">{button} <ArrowUpRight size={20}/></a><span className="cta-note">코칭 신청은 상담 후 결정하시면 됩니다.</span></div></section>;
}
