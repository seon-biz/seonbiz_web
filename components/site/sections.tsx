"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CaseEvidence } from "./case-evidence";

export function Reveal({children,className=""}:{children:React.ReactNode;className?:string}){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const el=ref.current;if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return;el.classList.add('reveal-ready');const observer=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){el.classList.add('revealed');observer.disconnect()}},{threshold:.12});observer.observe(el);return()=>observer.disconnect()},[]);return <div ref={ref} data-reveal="" className={className}>{children}</div>}

export function SearchFigures(){return <div className="search-figures"><figure><figcaption><span>2021.05.23 — 06.22</span><strong>클릭 651회</strong></figcaption><img src="/images/search-2021.webp" width="1024" height="457" alt="2021년 고객 웹사이트 서치콘솔: 웹 검색 클릭 651회, 노출 3.25만 회" loading="lazy"/></figure><figure><figcaption><span>2022.05.23 — 06.22</span><strong>클릭 약 2,840회</strong></figcaption><img src="/images/search-2022.webp" width="1024" height="456" alt="2022년 고객 웹사이트 서치콘솔: 웹 검색 클릭 2.84천 회, 노출 19.1만 회" loading="lazy"/></figure></div>}

export function WorkShowcase() {
  const [scene, setScene] = useState("ai");
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const linkedScene = window.location.hash === "#data-current" ? "current" : window.location.hash === "#data-legacy" ? "legacy" : window.location.hash === "#data-ai" ? "ai" : null;
    if (linkedScene) setScene(linkedScene);
  }, []);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {frame=0;const b=el.getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight-b.top)/(innerHeight*.8)));el.style.setProperty('--work-inset',`${(1-p)*3.5}%`);el.style.setProperty('--work-radius',`${(1-p)*32}px`);};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    addEventListener('scroll',onScroll,{passive:true});update();return()=>{removeEventListener('scroll',onScroll);cancelAnimationFrame(frame)};
  }, []);

  return <section ref={ref} className="work-showcase" data-scene={scene}>
    <span id="data-ai" className="work-case-anchor" aria-hidden="true"/><span id="data-current" className="work-case-anchor" aria-hidden="true"/><span id="data-legacy" className="work-case-anchor" aria-hidden="true"/>
    <div className="container work-inner">
      <Reveal><div className="work-heading"><div><p className="eyebrow">고객 웹사이트의 실제 데이터</p><h2>수정한 내용과<br/>그 뒤의 기록을 봅니다.</h2></div><p>GA4의 AI 유입과 구글 서치콘솔 기록을<br/>확인 가능한 범위 안에서 설명합니다.</p></div></Reveal>
      <Tabs value={scene} onValueChange={setScene} className="work-tabs">
        <TabsList variant="line" aria-label="실제 웹사이트 데이터" className="work-tabs-list"><TabsTrigger value="ai" id="work-tab-ai" aria-controls="work-panel-ai">GA4 AI 유입</TabsTrigger><TabsTrigger value="current" id="work-tab-current" aria-controls="work-panel-current">최근 서치콘솔</TabsTrigger><TabsTrigger value="legacy" id="work-tab-legacy" aria-controls="work-panel-legacy">이전 서치콘솔</TabsTrigger></TabsList>
        <div className="work-stage">
          <TabsContent value="ai" id="work-panel-ai" aria-labelledby="work-tab-ai" className="work-panel"><CaseEvidence kind="ai"/><div className="work-caption"><div><p className="kicker">GA4 사례 · 고객 웹사이트</p><h3>ChatGPT를 거친<br/>방문 기록입니다</h3></div><div><p>2026년 1월 1일부터 9월 12일까지 GA4에서 “GPT”를 검색한 결과입니다. 일별 등락과 참여 지표를 함께 확인합니다.</p><p>AI 검색을 위한 정보 정비를 이어가던 기간의 기록이며 특정 수정 하나의 효과나 모든 AI 서비스의 유입을 뜻하지 않습니다.</p></div></div><a href="/cases/ai-referral-data-2026" className="text-link">데이터와 해석 범위 보기 <ArrowRight size={18}/></a></TabsContent>
          <TabsContent value="current" id="work-panel-current" aria-labelledby="work-tab-current" className="work-panel"><CaseEvidence kind="search-current"/><div className="work-caption"><div><p className="kicker">최근 서치콘솔 사례 · 고객 웹사이트</p><h3>검색 클릭<br/>약 1,270회 → 1,860회</h3></div><div><p>2025년과 2026년 각각 5월 11일~6월 12일을 비교한 기록입니다. 노출은 4.3만 회에서 6.23만 회로, 평균 순위는 6.9위에서 5.7위로 바뀌었습니다.</p><p>웹사이트 정보를 정비하던 기간의 자료지만 특정 수정 하나의 효과나 문의 증가를 뜻하지 않습니다.</p></div></div><a href="/cases/search-performance-2025-2026" className="text-link">데이터와 비교 조건 보기 <ArrowRight size={18}/></a></TabsContent>
          <TabsContent value="legacy" id="work-panel-legacy" aria-labelledby="work-tab-legacy" className="work-panel"><CaseEvidence kind="search-legacy"/><div className="work-caption"><div><p className="kicker">이전 서치콘솔 사례 · 고객 웹사이트</p><h3>검색 클릭<br/>651회 → 약 2,840회</h3></div><div><p>2021년과 2022년 각각 5월 23일~6월 22일의 구글 검색 기록을 비교했습니다.</p><p>두 시기의 클릭과 노출을 실제 화면으로 확인하되 다른 변화가 함께 영향을 줄 수 있다는 점도 설명합니다.</p></div></div><a href="/cases/search-performance-2021-2022" className="text-link">데이터와 비교 조건 보기 <ArrowRight size={18}/></a></TabsContent>
        </div>
      </Tabs>
      <p className="case-separation">세 자료는 서로 다른 고객 웹사이트의 기록입니다. 숫자를 합치거나 같은 웹사이트의 변화로 비교하지 않습니다.</p>
    </div>
  </section>;
}
