import { ArrowRight } from "lucide-react";
import { faqs } from "@/lib/content";

const serviceProblems = [
  { problem: "제 일을 제대로 보여줄 홈페이지가 필요합니다", solution: "AI로 사이트 구조와 화면을 만들고, 서비스 소개와 작업 사례를 담습니다." },
  { problem: "방문자가 문의나 예약까지 이어지게 하고 싶습니다", solution: "문의 경로와 예약 안내, 외부 예약 플랫폼 연결을 설계합니다." },
  { problem: "현장 경험은 많은데 글로 남기지 못합니다", solution: "현장 사진과 메모를 모으는 방법부터 글로 옮기는 순서를 정합니다." },
  { problem: "만들고 나서 고치거나 관리하기 어렵습니다", solution: "대표님 계정으로 작업하고, 고치는 방법을 남깁니다." },
];

export const serviceFaqs = [
  { q: "컴퓨터를 잘 못하는데 따라갈 수 있을까요?", a: "대부분 처음 시작하십니다. 어떤 화면을 눌러야 하는지, 무엇을 입력해야 하는지부터 함께 봅니다. Zoom으로 화면을 공유하며 진행하니, 막히는 곳에서 바로 짚어드립니다. 미리 배워 오실 것은 없습니다." },
  faqs[1],
  { q: "코칭이 끝난 뒤에는 누가 관리하나요?", a: "대표님이 직접 관리하십니다. 도메인과 호스팅은 대표님 이름으로 만들고, 코칭이 끝난 뒤에도 계정은 대표님이 가지고 계십니다. 문구를 바꾸거나 사진을 교체하는 순서는 코칭에서 함께 익힙니다." },
  faqs[6],
  { q: "예약이나 결제 기능도 넣을 수 있나요?", a: "어떤 기능이 필요한지에 따라 다릅니다. 서비스 소개와 문의 접수까지는 코칭 안에서 함께 만들 수 있습니다. 예약·결제처럼 기능이 늘어나면 만드는 일뿐 아니라 이후 관리할 일도 늘어나서, 첫 상담에서 필요한 범위를 먼저 확인합니다." },
];

export function ServiceProblems() {
  return <section className="container section service-problems" aria-labelledby="service-problems-title">
    <div className="section-heading"><p className="eyebrow">이런 상황이신가요</p><h2 id="service-problems-title">일은 잘하는데,<br/>보여줄 곳이 없을 때</h2><p>잘하는 일을 보여주는 홈페이지로, 고객이 서비스와 문의 방법을 확인할 수 있게 합니다.</p></div>
    <div className="service-problem-list">{serviceProblems.map(item => <article key={item.problem}><h3>{item.problem}</h3><p><ArrowRight size={18} aria-hidden="true"/><span>{item.solution}</span></p></article>)}</div>
  </section>;
}

export function ServiceOwnership() {
  return <section className="container service-ownership" aria-labelledby="service-ownership-title">
    <div><p className="eyebrow">만든 뒤에</p><h2 id="service-ownership-title">만든 사이트는<br/>대표님 것입니다.</h2></div>
    <div className="service-ownership-copy">
      <p>도메인과 호스팅을 대표님 이름으로 만듭니다.<br/>코칭이 끝난 뒤에도 계정은 대표님이 가지고 계십니다.</p>
      <p>화면 문구를 바꾸거나 사진을 교체하는 일은 코칭이 끝난 다음에도 직접 하실 수 있습니다. 바꾸는 순서는 코칭에서 함께 익힙니다.</p>
      <div className="service-hosting-note"><h3>어디에 올리고, 비용은 얼마나 드나요?</h3><p>만든 사이트는 홈페이지를 인터넷에 공개하는 서비스인 Cloudflare Pages에 올립니다. 소개 글과 사진 중심의 소규모 사이트는 무료 요금제 범위 안에서 운영할 수 있습니다.</p><p>필요한 기능과 이용량에 따라 추가 비용이 생길 수 있습니다. 도메인 비용과 별도 유료 도구를 쓰는 경우의 비용은 첫 상담에서 미리 안내드립니다.</p></div>
    </div>
  </section>;
}
