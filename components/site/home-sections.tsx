import { ArrowRight } from "lucide-react";

export function TrustBanner() {
  return <section className="trust-banner" aria-label="세온비즈 코칭 이력과 진행 방식">
    <div className="container trust-facts">
      <div><span>유료 코칭</span><p><strong>35</strong>개 회사</p><small>무료 상담 제외</small></div>
      <div><span>디지털 마케팅</span><p><strong>8</strong>년</p><small>인쇄·디자인 20년 포함</small></div>
      <div><span>코칭 1회</span><p><strong>2</strong>시간</p><small>Zoom 화면 공유</small></div>
      <div><span>첫 상담</span><p className="trust-zoom">1시간 무료</p><small>전국 어디서나</small></div>
    </div>
  </section>;
}

export function ContentFormats() {
  return <section className="container section home-content-formats" aria-labelledby="content-formats-title">
    <div className="content-formats-copy">
      <p className="eyebrow">콘텐츠 제작</p>
      <h2 id="content-formats-title">한 번 쓴 글로,<br/>세 번 노출됩니다.</h2>
      <p>홈페이지에 정확하게 정리한 내용을 블로그 글, SNS 게시물, 유튜브 숏츠로 바꿉니다. 업체에 맞는 AI 지시문과 검토표, 반복 작업 순서를 설정합니다.</p>
      <div className="camera-note"><h3>카메라 앞에 서지 않아도 됩니다.</h3><p>AI로 글과 화면을 준비하고, 최종 내용은 고객이 자기 계정에서 확인해 직접 발행합니다.</p></div>
      <a href="/notes/content-formats" className="text-link"><span>홈페이지 내용을 블로그·SNS·숏츠로 확장하기</span><ArrowRight size={18}/></a>
    </div>
    <figure><img src="/images/content-formats.webp" width="1448" height="1086" alt="홈페이지의 설명을 블로그와 SNS 게시물, 세로 영상으로 확장하는 콘텐츠 운영 과정" loading="lazy"/><figcaption>홈페이지 → 블로그 · SNS · 유튜브 숏츠</figcaption></figure>
  </section>;
}
