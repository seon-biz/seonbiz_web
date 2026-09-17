import { ArrowRight } from "lucide-react";

const serviceProblems = [
  { problem: "견적 문의가 오면, 보여줄 게 카톡 사진뿐입니다", solution: "흩어진 사진과 설명을 홈페이지의 서비스 소개와 작업 사례로 옮깁니다." },
  { problem: "사람은 들어오는데, 전화는 울리지 않습니다", solution: "고객이 확인할 정보와 문의 경로를 한 화면에서 찾을 수 있게 정리합니다." },
  { problem: "할 말은 많은데, 쓰려고 앉으면 한 줄도 안 나옵니다", solution: "현장 사진·메모·고객 질문을 근거로 AI 초안을 만들고 직접 확인합니다." },
  { problem: "가격 한 줄 바꾸는 데, 업체 연락하고 사흘을 기다립니다", solution: "대표님 계정에서 직접 고치고, 다음에도 따라 할 수 있는 순서를 남깁니다." },
];

export function ServiceProblems() {
  return <section id="coaching" className="container section service-problems" aria-labelledby="service-problems-title">
    <div className="section-heading"><p className="eyebrow">이런 상황이라면</p><h2 id="service-problems-title">만들긴 만들었는데,<br/>손댈 수가 없습니다.</h2><p>외주로 만든 홈페이지가 1년째 그대로라면, 문제는 대표님이 아니라 만든 방식에 있습니다.</p></div>
    <div className="service-problem-list">{serviceProblems.map(item => <article key={item.problem}><h3>{item.problem}</h3><p><ArrowRight size={18} aria-hidden="true"/><span>{item.solution}</span></p></article>)}</div>
  </section>;
}

export function ServiceOwnership() {
  return <section className="container service-ownership" aria-labelledby="service-ownership-title">
    <div><p className="eyebrow">만든 뒤에</p><h2 id="service-ownership-title">만든 사이트는<br/>대표님 것입니다.</h2></div>
    <div className="service-ownership-copy">
      <p>도메인과 호스팅을 대표님 이름으로 만듭니다.<br/>코칭이 끝난 뒤에도 계정은 대표님이 가지고 계십니다.</p>
      <p>화면 문구를 바꾸거나 사진을 교체하는 일은 코칭이 끝난 다음에도 직접 하실 수 있습니다. 바꾸는 순서는 코칭에서 함께 익힙니다.</p>
      <div className="service-hosting-note"><h3>어디에 올리고, 비용은 얼마나 드나요?</h3><p>코칭에서 만드는 소개형 홈페이지는 인터넷에 사이트를 공개하는 서비스인 Cloudflare Pages에 올립니다. 소개 글과 사진 중심의 소규모 사이트는 무료 요금제 범위 안에서 운영할 수 있습니다.</p><p>필요한 기능과 이용량에 따라 추가 비용이 생길 수 있습니다. 도메인 비용과 별도 유료 도구를 쓰는 경우의 비용은 첫 상담에서 미리 안내드립니다.</p></div>
    </div>
  </section>;
}
