"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
export function Reveal({children,className=""}:{children:React.ReactNode;className?:string}){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const el=ref.current;if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return;el.classList.add('reveal-ready');const observer=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){el.classList.add('revealed');observer.disconnect()}},{threshold:.12});observer.observe(el);return()=>observer.disconnect()},[]);return <div ref={ref} className={className}>{children}</div>}
export function SearchFigures(){return <div className="search-figures"><figure><figcaption><span>2021.05.23 — 06.22</span><strong>클릭 651회</strong></figcaption><img src="/images/search-2021.webp" width="1024" height="457" alt="2021년 서치콘솔: 웹 검색 클릭 651회, 노출 3.25만 회" loading="lazy"/></figure><figure><figcaption><span>2022.05.23 — 06.22</span><strong>클릭 약 2,840회</strong></figcaption><img src="/images/search-2022.webp" width="1024" height="456" alt="2022년 서치콘솔: 웹 검색 클릭 2.84천 회, 노출 19.1만 회" loading="lazy"/></figure></div>}
export function WorkShowcase() {
  const [scene, setScene] = useState("ai");
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const syncCaseLink = () => {
      const linkedScene = window.location.hash === "#work-search" ? "search" : window.location.hash === "#work-ai" ? "ai" : null;
      if (linkedScene) setScene(linkedScene);
    };
    syncCaseLink();
    window.addEventListener("hashchange", syncCaseLink);
    return () => window.removeEventListener("hashchange", syncCaseLink);
  }, []);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const b = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - b.top) / (innerHeight * .8)));
      el.style.setProperty('--work-inset', `${(1 - p) * 3.5}%`);
      el.style.setProperty('--work-radius', `${(1 - p) * 32}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);

  return <section ref={ref} className="work-showcase" data-scene={scene}>
    <span id="work-ai" className="work-case-anchor" aria-hidden="true"/>
    <span id="work-search" className="work-case-anchor" aria-hidden="true"/>
    <div className="container work-inner">
      <Reveal><div className="work-heading"><div><p className="eyebrow">세온비즈가 해온 일</p><h2>직접 작업한 내용과<br/>결과를 보여드립니다.</h2></div><p>AI 검색에서 들어온 방문과 구글 검색 기록,<br/>원고로 만든 짧은 영상을 소개합니다.</p></div></Reveal>
      <Tabs value={scene} onValueChange={setScene} className="work-tabs">
        <TabsList variant="line" aria-label="실제 작업 자료" className="work-tabs-list">
          <TabsTrigger value="ai" id="work-tab-ai" aria-controls="work-panel-ai">AI 노출</TabsTrigger>
          <TabsTrigger value="search" id="work-tab-search" aria-controls="work-panel-search">검색 데이터</TabsTrigger>
          <TabsTrigger value="content" id="work-tab-content" aria-controls="work-panel-content">콘텐츠 제작</TabsTrigger>
        </TabsList>
        <div className="work-stage">
          <TabsContent value="ai" id="work-panel-ai" aria-labelledby="work-tab-ai" className="work-panel">
            <div className="case-summary ai-case-summary" aria-label="생활용품 쇼핑몰 AI 유입 사례 요약">
              <p className="kicker">GA4 · 2026년 1~9월 · 사례 요약</p>
              <dl><div><dt>AI 검색 유입</dt><dd><strong>증가 추세</strong><span>방문 기록을 꾸준히 확인</span></dd></div><div><dt>방문자의 참여율</dt><dd><strong>약 두 배</strong><span>사이트 평균 대비</span></dd></div><div><dt>머무는 시간</dt><dd><strong>더 길게</strong><span>사이트 평균 대비</span></dd></div></dl>
              <p>기간 내 추세와 참여 품질을 정리한 요약입니다. 여러 요인이 반영된 결과이며, 특정 수정 하나의 효과를 뜻하지는 않습니다.</p>
            </div>
            <div className="work-caption"><div><p className="kicker">고객 사례 · 생활용품 쇼핑몰</p><h3>AI 검색에서 들어온 방문이<br/>계속 늘고 있습니다</h3></div><div><p>1월부터 9월까지 꾸준히 늘었고, 7월 이후 뚜렷하게 올라갔습니다. 이 방문자들은 사이트 평균보다 참여율이 약 두 배 높고, 머무는 시간도 깁니다.</p><p>GEO 작업을 꾸준히 이어간 기간의 기록입니다. 여러 요인이 반영된 결과이며, 특정 수정 하나의 효과를 뜻하지는 않습니다.</p></div></div>
          </TabsContent>
          <TabsContent value="search" id="work-panel-search" aria-labelledby="work-tab-search" className="work-panel">
            <div className="case-summary" aria-label="스포츠용품 쇼핑몰 전년 동기 대비 검색 기록 요약">
              <p className="kicker">구글 서치콘솔 · 전년 동기 대비 · 사례 요약</p>
              <dl><div><dt>검색 클릭</dt><dd><span>1,270회 →</span><strong>1,860회</strong></dd></div><div><dt>검색 노출</dt><dd><span>4.3만 회 →</span><strong>6.23만 회</strong></dd></div><div><dt>평균 순위</dt><dd><span>6.9위 →</span><strong>5.7위</strong></dd></div></dl>
              <p>같은 기간을 1년 전과 비교한 요약입니다. 여러 요인이 반영된 결과이며, 특정 수정 하나의 효과를 뜻하지는 않습니다.</p>
            </div>
            <div className="work-caption"><div><p className="kicker">고객 사례 · 스포츠용품 쇼핑몰</p><h3>구글 검색 클릭<br/>1,270회 → 1,860회</h3></div><div><p>같은 기간을 1년 전과 비교한 기록입니다. 노출은 4.3만 회에서 6.23만 회로, 평균 순위는 6.9위에서 5.7위로 올랐습니다.</p><p>상품 제목과 설명, 이미지 정보를 정비하며 살펴본 결과입니다. 여러 요인이 반영된 결과이며, 특정 수정 하나의 효과를 뜻하지는 않습니다.</p></div></div>
          </TabsContent>
          <TabsContent value="content" id="work-panel-content" aria-labelledby="work-tab-content" className="work-panel">
            <div className="content-scene"><div><p className="kicker">세온비즈 자체 제작</p><h3>써둔 원고로<br/>25초 영상 만들기</h3><p>원고에서 꼭 필요한 내용을 골라<br/>약 25초짜리 영상으로 만들었습니다.</p></div><img src="/images/content-poster.png" width="1080" height="1920" loading="lazy" alt="직접 제작한 영상 표지: HTML 변환, 주력 상품부터?"/><img src="/images/content-scene.png" width="1080" height="1920" loading="lazy" alt="영상의 다음 장면: 계속 팔 수 있어야 하니까"/></div>
            <div className="work-caption"><h3>글 한 편을 여러 곳에 활용하는 방법</h3><p>세온비즈가 직접 제작한 영상입니다. 원고를 나누고 장면을 구성한 과정을 소개합니다. 고객의 코칭 성과 자료는 아닙니다.</p></div>
            <a href="/cases/content-workflow" className="text-link">영상 제작 과정 보기 <ArrowRight size={18}/></a>
          </TabsContent>
        </div>
      </Tabs>
      <p className="case-separation">AI 노출의 생활용품 쇼핑몰과 검색 데이터의 스포츠용품 쇼핑몰은 서로 다른 사이트입니다. 업체명은 공개하지 않습니다.</p>
    </div>
  </section>;
}
