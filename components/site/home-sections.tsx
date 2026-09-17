import { ArrowRight } from "lucide-react";

export const homeFaqAdditions = [
  { q: "무엇부터 해야 할지 모르겠어도 상담할 수 있나요?", a: "그런 경우가 가장 많습니다. 무료 상담에서 지금 필요한 작업을 보고 어디서부터 손대면 좋을지 같이 정합니다." },
  { q: "작업을 대신 해주는 건가요?", a: "같이 만들고, 대표님이 직접 하실 수 있게 하는 것이 목표입니다. 처음에는 함께 작업하고, 회차가 지나면 대표님이 하시고 저는 점검하는 쪽으로 옮겨갑니다." },
  { q: "온라인 강의를 듣는 것과 무엇이 다른가요?", a: "예제가 아니라 대표님 사이트와 자료로 진행합니다. 강의는 일반적인 방법을 알려주지만, 실제 화면에서는 다른 문제가 나옵니다. 그 자리에서 막힌 곳을 같이 풉니다." },
  { q: "코칭이 끝나면 홈페이지는 누가 관리하나요?", a: "대표님이 직접 관리합니다. 도메인과 호스팅은 처음부터 대표님 이름으로 만들고, 문구·사진·페이지를 고치는 순서도 함께 익힙니다." },
];

export function TrustBanner() {
  return <section className="trust-banner" aria-label="세온비즈 코칭 이력과 진행 방식">
    <div className="container trust-facts">
      <div><span>함께 일한 회사</span><p><strong>35</strong>개</p><small>유료 코칭을 받은 회사 기준</small></div>
      <div><span>경력</span><p><strong>8</strong>년</p></div>
      <div><span>온라인 전국</span><p className="trust-zoom">Zoom 진행</p></div>
    </div>
  </section>;
}

export function ContentFormats() {
  return <section className="container section home-content-formats" aria-labelledby="content-formats-title">
    <div className="content-formats-copy">
      <p className="eyebrow">콘텐츠 제작</p>
      <h2 id="content-formats-title">한 번 정리한 내용이<br/>세 가지 형식으로 갑니다.</h2>
      <p>홈페이지에 정확하게 정리한 내용을 블로그 글, SNS 게시물, 유튜브 숏츠로 바꿉니다. 업체에 맞는 AI 지시문과 검토표, 반복 작업 순서를 설정합니다.</p>
      <div className="camera-note"><h3>운영은 고객이 직접 합니다.</h3><p>AI로 준비 과정을 줄이고, 최종 내용은 자기 계정에서 확인해 발행합니다.</p></div>
      <a href="/notes/content-formats" className="text-link"><span>홈페이지 내용을 블로그·SNS·숏츠로 확장하기</span><ArrowRight size={18}/></a>
    </div>
    <figure><img src="/images/content-formats.webp" width="1448" height="1086" alt="홈페이지의 설명을 블로그와 SNS 게시물, 세로 영상으로 확장하는 콘텐츠 운영 과정" loading="lazy"/><figcaption>홈페이지 → 블로그 · SNS · 유튜브 숏츠</figcaption></figure>
  </section>;
}
