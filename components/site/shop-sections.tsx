import { ArrowRight, ArrowUpRight } from "lucide-react";
import { faqs } from "@/lib/content";

const shopProblems = [
  { problem: "상품의 좋은 점을 어떻게 설명해야 할지 모르겠습니다", solution: "리뷰와 문의에서 실제 고객의 말을 찾아 상세페이지 흐름과 카피를 정리합니다." },
  { problem: "자사몰에서 만든 페이지가 다른 판매처에서는 깨집니다", solution: "판매처마다 맞는 형태로 바꾸고, 모바일 표시를 점검합니다." },
  { problem: "검색과 AI 검색에 대응하고 싶은데 무엇부터 할지 모르겠습니다", solution: "상품명, 설명, 자주 묻는 질문의 형태를 정비합니다." },
  { problem: "광고를 켜도 무엇을 보고 판단해야 할지 모르겠습니다", solution: "광고를 같이 세팅하고, 키워드와 비용과 전환을 함께 봅니다." },
];

export const shopFaqs = [
  faqs[2],
  { q: "한 회차에 상세페이지와 홍보 글을 모두 만들 수 있나요?", a: "작업의 규모와 준비된 자료에 따라 다릅니다. 가장 급한 상품과 작업부터 정하고, 한 회차에 가능한 범위로 진행합니다. 함께 작업한 내용과 다음에 직접 해볼 순서를 남깁니다." },
  faqs[6],
  { q: "스마트스토어나 쿠팡만 하는데도 코칭을 받을 수 있나요?", a: "됩니다. Cafe24 자사몰을 중심으로 진행하지만, 스마트스토어·쿠팡·오픈마켓·종합몰에 같은 상품을 올리는 일도 함께 다룹니다. 판매처마다 편집할 수 있는 범위가 달라서, 첫 상담에서 지금 쓰시는 곳을 확인하고 시작합니다." },
  { q: "상품이 많은데 몇 개나 고칠 수 있나요?", a: "한 회차에 한두 상품을 같이 작업하고, 나머지는 같은 순서로 대표님이 이어서 하십니다. 전부 대신 고쳐드리는 것이 아니라, 첫 상품을 함께 하면서 방법을 익히시는 구조입니다." },
];

export function ShopProblems() {
  return <section className="container section shop-problems" aria-labelledby="shop-problems-title">
    <div className="section-heading"><p className="eyebrow">이런 상황이신가요</p><h2 id="shop-problems-title">쇼핑몰을 하다 보면<br/>막히는 지점이 있습니다.</h2></div>
    <div className="shop-problem-list">{shopProblems.map(item => <article key={item.problem}><h3>{item.problem}</h3><p><ArrowRight size={18} aria-hidden="true"/><span>{item.solution}</span></p></article>)}</div>
  </section>;
}

export function ShopPageExplanation() {
  return <>
    <section className="container section shop-page-explanation" aria-labelledby="shop-explanation-title">
      <div><p className="eyebrow">검색과 AI 검색을 위한 상품 설명</p><h2 id="shop-explanation-title">상세페이지가 사진 한 장이라면,<br/>상품 설명을 글로도 보여주세요.</h2></div>
      <div className="shop-explanation-copy">
        <p className="shop-sign-analogy">간판에 그림과 함께 무엇을 파는지 적혀 있으면, 지나가는 사람이 가게를 이해하기 쉽습니다. 상세페이지도 마찬가지입니다.</p>
        <p>중요한 상품 설명은 이미지에만 담지 않고 본문 글로도 제공합니다. 사진 속 상품명과 특징, 사용법을 정리해 검색과 AI 검색이 내용을 파악하기 쉬운 형태로 바꿉니다.</p>
        <p>바꾸는 작업도 대표님과 함께 합니다.<br/>다음 상품부터는 직접 하실 수 있게 순서를 남깁니다.</p>
      </div>
    </section>
    <aside className="container shop-coder-box" aria-labelledby="shop-coder-title"><div><h2 id="shop-coder-title">코딩 제작을 맡기고 싶으시다면</h2><p>세온비즈의 상세페이지 제작 서비스, SEON코더에서 HTML 변환 제작을 안내합니다.<br/>직접 배우는 코칭과 별도로 작업 내용과 비용을 확인하실 수 있습니다.</p></div><a className="button button-ink" href="https://seoncoder.com/" target="_blank" rel="noopener noreferrer">SEON코더 제작 안내 <ArrowUpRight size={20}/></a></aside>
  </>;
}

export function ShopCaseLinks() {
  return <section className="container related-case shop-case-links" aria-label="쇼핑몰 검색 사례">
    <p>실제 상품 정보 정비와 검색 기록을 확인하세요.</p>
    <div><a href="/#work-search" className="text-link">스포츠용품 쇼핑몰 검색 기록 보기 <ArrowUpRight size={18}/></a><a href="/#work-ai" className="text-link">생활용품 쇼핑몰 AI 검색 유입 보기 <ArrowUpRight size={18}/></a></div>
  </section>;
}
