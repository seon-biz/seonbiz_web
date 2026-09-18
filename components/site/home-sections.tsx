import { ArrowRight } from "lucide-react";
import { websiteCases } from "@/lib/content";
import { WebsiteCaseCard } from "./website-case-card";

export function TrustBanner() {
  return <section className="trust-banner" aria-label="세온비즈 코칭 이력과 진행 방식">
    <div className="container trust-facts">
      <div><span>함께 일한 회사</span><p><strong>35</strong>개 회사</p><small>유료 코칭 기준</small></div>
      <div><span>실무 경력</span><p><strong>28</strong>년</p><small>인쇄·디자인 20년 + 디지털 마케팅 8년</small></div>
      <div><span>코칭 1회</span><p><strong>2</strong>시간</p><small>Zoom 화면 공유</small></div>
      <div><span>첫 상담</span><p className="trust-zoom">1시간 무료</p><small>전국 어디서나</small></div>
    </div>
  </section>;
}

export function CoachIntro() {
  return <section className="container section home-coach-intro" aria-labelledby="home-coach-title">
    <img src="/images/profile/seonbiz-profile.webp" width="800" height="1000" alt="세온비즈를 운영하는 서정옥" loading="lazy"/>
    <div className="home-coach-intro-copy">
      <h2 id="home-coach-title">코칭은 제가 직접 진행합니다</h2>
      <p>서정옥 · 홈페이지 일대일 AI 코칭<br/>인쇄·디자인 20년, 디지털 마케팅 8년.<br/>2018년부터 제 사이트를 직접 만들기 시작해 35개 회사와 함께했습니다.<br/>이 사이트도 AI로 초안을 만들어 직접 수정했습니다.</p>
      <a href="/about" className="text-link">세온비즈 소개 보기 <ArrowRight size={18}/></a>
    </div>
  </section>;
}

export function HomeCases() {
  const testimonial = websiteCases.find(item => item.slug === 'bondaerohome')!;
  // 기존 홈 후기는 원문의 첫 문장과 마지막 문장을 발췌합니다.
  const sentences = testimonial.quote.split(/(?<=[.!?])\s+/);
  const testimonialExcerpt = sentences.filter((_, index) => index === 0 || index === sentences.length - 1);
  return <>
    <section className="container section home-cases" aria-labelledby="home-cases-title">
      <div className="home-cases-heading">
        <div><p className="eyebrow">실제 사례</p><h2 id="home-cases-title">지금은 다들<br/>혼자 하십니다.</h2></div>
        <p>제작을 대신하지 않습니다. 약 40%만 코칭에서 함께하고,<br/>나머지는 대표님이 직접 만드십니다.</p>
      </div>
      <div className="website-cases-grid home-cases-grid">
        {websiteCases.map(item => <WebsiteCaseCard key={item.slug} item={item} compact />)}
      </div>
      <a href="/cases" className="text-link">실제 사례 자세히 보기 <ArrowRight size={18} aria-hidden="true" /></a>
    </section>
    <section className="container home-testimonial" aria-label="고객 후기">
      <blockquote><p>{testimonialExcerpt[0]}{testimonialExcerpt.length > 1 && <><br/>{testimonialExcerpt[1]}</>}</p></blockquote>
      <p className="home-testimonial-source">{testimonial.title} · {testimonial.label}</p>
      <a href="/cases" className="text-link">다른 후기도 보기 <ArrowRight size={18} aria-hidden="true" /></a>
    </section>
  </>;
}

export function ContentFormats() {
  return <section className="container section home-content-formats" aria-labelledby="content-formats-title">
    <div className="content-formats-copy">
      <p className="eyebrow">콘텐츠 제작</p>
      <h2 id="content-formats-title">한 번 쓰면<br/>세 군데 올라갑니다.</h2>
      <p>홈페이지에 정확하게 정리한 내용을 블로그 글, SNS 게시물, 유튜브 숏츠로 바꿉니다. 업체에 맞는 AI 지시문과 검토표, 반복 작업 순서를 설정합니다.</p>
      <div className="camera-note"><h3>카메라 앞에 서지 않아도 됩니다.</h3><p>AI로 글과 화면을 준비하고, 최종 내용은 고객이 자기 계정에서 확인해 직접 발행합니다.</p></div>
      <a href="/notes/content-formats" className="text-link"><span>홈페이지 내용을 블로그·SNS·숏츠로 확장하기</span><ArrowRight size={18}/></a>
    </div>
    <figure><img src="/images/content-formats.webp" width="1448" height="1086" alt="홈페이지의 설명을 블로그와 SNS 게시물, 세로 영상으로 확장하는 콘텐츠 운영 과정" loading="lazy"/><figcaption>홈페이지 → 블로그 · SNS · 유튜브 숏츠</figcaption></figure>
  </section>;
}
