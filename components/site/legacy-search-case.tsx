import { ArrowRight } from "lucide-react";
import { SearchFigures } from "@/components/site/sections";

export function LegacySearchLinks() {
  return <div className="case-recent-links">
    <p>다른 쇼핑몰의 최근 기록도 확인해 보세요.</p>
    <div><a href="/cases/ai-search-visits" className="text-link">생활용품 쇼핑몰의 AI 유입 기록 <ArrowRight size={18}/></a><a href="/cases/sports-search-records" className="text-link">스포츠용품 쇼핑몰의 검색 기록 <ArrowRight size={18}/></a></div>
  </div>;
}

export function LegacySearchCase() {
  return <>
    <section className="container case-overview" aria-label="작업과 비교 자료 요약">
      <dl>
        <div><dt>무엇을 했나</dt><dd>상품 제목, 본문 설명,<br/>이미지 설명 정비</dd></div>
        <div><dt>무엇을 봤나</dt><dd>구글 서치콘솔의<br/>클릭·노출·평균 순위</dd></div>
        <div><dt>비교 기간</dt><dd><span>2021.05.23–06.22</span><span>2022.05.23–06.22</span></dd></div>
      </dl>
    </section>
    <article className="article-body">
      <h2>상품 제목과 설명을 정비했습니다</h2>
      <p>이 식품 쇼핑몰에서는 상품 제목, 본문 설명, 이미지 설명 등 기본 정보를 정비했습니다. 작업하면서 구글에서 얼마나 검색되고 클릭되는지도 살펴봤습니다. 아래는 해당 쇼핑몰의 실제 기록입니다.</p>
      <h2>2021~2022년 기록</h2>
      <p>구글 서치콘솔에서 2021년과 2022년 각각 5월 23일부터 6월 22일까지를 비교했습니다. 클릭은 651회에서 약 2,840회로, 노출은 약 3.25만 회에서 약 19.1만 회로 늘었습니다.</p>
    </article>
    <section className="container evidence-block">
      <SearchFigures/>
      <p className="meta">출처: 해당 쇼핑몰의 구글 서치콘솔 기록 · 검색 유형: 웹<br/>고객 정보와 절대 매출은 공개하지 않습니다.</p>
    </section>
    <article className="article-body">
      <h2>비교할 때 알아두실 점</h2>
      <p>상품 구성과 수요, 다른 마케팅 활동, 측정 설정도 결과에 영향을 줄 수 있어 제목이나 설명을 고친 효과만 따로 계산할 수는 없습니다.</p>
      <p>검색 클릭과 GA4의 방문 수는 집계 기준도 다릅니다. 이 페이지에서는 서치콘솔의 검색 기록만 소개합니다. 이 자료가 광고를 하지 않았다는 뜻은 아닙니다. 개별 수정 날짜와 적용 상품 수가 확인되지 않은 항목은 성과로 따로 제시하지 않았습니다.</p>
      <h2>코칭에서는 내 사업의 기록으로 판단해봅니다</h2>
      <p>대표님의 관리 화면을 열고, 숫자의 뜻과 보는 순서부터 설명합니다. 같은 기간과 유입 경로를 놓고 비교한 뒤, 바꾼 내용과 그 후의 기록을 살펴봅니다. 이를 바탕으로 다음에 어떤 작업을 할지 정합니다.</p>
      <a href="/coaching/shop" className="text-link">쇼핑몰 코칭 자세히 보기 <ArrowRight size={18}/></a>
    </article>
  </>;
}
