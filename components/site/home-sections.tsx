import { ArrowRight } from "lucide-react";

export const homeFaqAdditions = [
  { q: "무엇부터 해야 할지 모르겠어도 상담할 수 있나요?", a: "그런 경우가 가장 많습니다. 무료 상담에서 지금 하시는 일을 보고 어디서부터 손대면 좋을지 같이 정합니다." },
  { q: "작업을 대신 해주는 건가요?", a: "같이 만들고, 대표님이 직접 하실 수 있게 하는 것이 목표입니다. 처음에는 함께 작업하고, 회차가 지나면 대표님이 하시고 저는 점검하는 쪽으로 옮겨갑니다." },
  { q: "온라인 강의를 듣는 것과 무엇이 다른가요?", a: "예제가 아니라 대표님 사이트와 자료로 진행합니다. 강의는 일반적인 방법을 알려주지만, 실제 화면에서는 다른 문제가 나옵니다. 그 자리에서 막힌 곳을 같이 풉니다." },
  { q: "코칭이 끝나면 사이트는 누가 관리하나요?", a: "대표님이 하십니다. 도메인과 호스팅은 처음부터 대표님 이름으로 만듭니다. 코칭이 끝난 뒤에도 대표님 것이며, 계정도 대표님이 가지고 계십니다. 직접 운영하실 수 있게 하는 것이 코칭의 목표입니다." },
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
      <p>블로그에 쓴 글 한 편을 카드뉴스로, 짧은 영상으로 다시 만듭니다. 같은 글을 여러 곳에 붙여넣는 것이 아니라, 형식에 맞게 질문과 설명의 밀도를 바꿉니다.</p>
      <div className="camera-note"><h3>카메라 앞에 서지 않아도 됩니다.</h3><p>글과 화면으로 만드는 영상이라 얼굴이 나오지 않습니다.</p></div>
      <a href="/notes/content-formats" className="text-link"><span>블로그 글 한 편으로 카드뉴스와 짧은 영상 만들기</span><ArrowRight size={18}/></a>
    </div>
    <figure><img src="/images/content-formats.webp" width="1448" height="1086" alt="블로그 원고 한 편에서 카드뉴스 묶음과 세로형 짧은 영상으로 이어지는 콘텐츠 제작 과정" loading="lazy"/><figcaption>블로그 글 한 편 → 카드뉴스 · 짧은 영상</figcaption></figure>
  </section>;
}
