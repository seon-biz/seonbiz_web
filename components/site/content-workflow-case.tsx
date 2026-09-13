import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContentVideo } from "@/components/site/content-video";

const cards = [
  {image: 'content-card-01.png', label: '01 / 질문 제시', alt: 'HTML 변환, 어떤 상품부터 시작할까요? 매출 비중이 낮고 계속 판매할 상품부터 시작하라는 카드뉴스 표지'},
  {image: 'content-card-02.png', label: '02 / 상품 고르기', alt: '매출 비중이 낮고 계속 판매하며 방문과 구매 반응을 관찰할 수 있는 상품을 고르는 기준'},
  {image: 'content-card-03.png', label: '03 / 조건 유지하기', alt: '변환 전 기록을 남기고 가격·할인·광고 조건을 유지하며 적용 후 휴대폰 화면·옵션·주문을 확인하는 순서'},
  {image: 'content-card-04.png', label: '04 / 반응 비교하기', alt: '판매 건수와 구매 전환율을 같은 기간·집계 기준으로 비교하고 광고·할인·재고 변화를 확인하는 방법'},
];

export function ContentWorkflowCase() {
  return <>
    <section className="container case-overview content-overview" aria-label="영상 제작 요약">
      <dl><div><dt>원고</dt><dd>이미 써둔<br/>블로그 글 1편</dd></div><div><dt>결과물</dt><dd>세로 영상<br/>약 25초</dd></div><div><dt>장면</dt><dd>6개</dd></div><div><dt>얼굴 노출</dt><dd>없음</dd></div></dl>
    </section>
    <article className="article-body">
      <h2>글에서 먼저 답할 질문을 정했습니다</h2>
      <p>‘상세페이지 HTML 변환을 어떤 상품부터 시작할까?’라는 주제로 원고를 썼습니다. 계속 판매할 상품인지, 필요한 정보가 준비돼 있는지 등 변환을 의뢰하기 전에 확인할 내용을 정리했습니다.</p>
      <h2>질문과 답을 약 25초 영상으로 나눴습니다</h2>
      <p>첫 장면에는 원고의 질문을 넣고, 다음 장면부터 상품을 고를 때 확인할 조건을 하나씩 설명했습니다. 아래에서 완성한 영상과 주요 장면을 확인할 수 있습니다.</p>
    </article>
    <section className="container content-video-section" aria-label="완성한 영상과 주요 장면">
      <div className="content-video-stage">
        <figure className="content-video-figure"><ContentVideo/><figcaption>소리 없이도 내용이 전달되도록 만들었습니다.<br/>자막으로 확인하세요.</figcaption></figure>
        <div className="content-scene-reference">
          <p className="eyebrow">영상 속 주요 장면</p>
          <div className="content-scene-stills">
            <figure><img src="/images/content-poster.png" width="1080" height="1920" alt="영상 표지: HTML 변환, 주력 상품부터?" loading="lazy"/><figcaption>0:00 · 첫 장면<br/>질문 제시</figcaption></figure>
            <figure><img src="/images/content-scene.png" width="1080" height="1920" alt="영상 장면: 단종 예정과 장기 품절 상품 제외" loading="lazy"/><figcaption>0:07 · 설명 장면<br/>적용 조건</figcaption></figure>
          </div>
          <p>질문에서 시작해 상품을 고르는 조건, 기록하는 방법, 마지막 정리까지 6개 장면으로 이어집니다.</p>
        </div>
      </div>
    </section>
    <section className="container content-cards-section" aria-labelledby="content-cards-title">
      <div className="content-cards-heading"><h2 id="content-cards-title">같은 원고로<br/>카드뉴스도 만들었습니다</h2><p>한 장에 한 가지 내용을 넣고, 앞장부터 읽으면 설명이 이어지도록 만듭니다.<br/>영상과 같은 원고를 쓰지만 나누는 방식이 다릅니다.</p></div>
      <p className="content-cards-note">전체 6장 중 앞 4장입니다. 각 이미지를 누르면 크게 볼 수 있습니다.</p>
      <div className="content-cards-grid" tabIndex={0} role="region" aria-label="카드뉴스 예시 4장">
        {cards.map(card => <figure key={card.image}><a href={`/images/${card.image}`} target="_blank" rel="noopener noreferrer"><img src={`/images/${card.image}`} width="1080" height="1350" alt={card.alt} loading="lazy"/><span className="sr-only"> (원본 크게 보기, 새 탭)</span></a><figcaption>{card.label}<ArrowUpRight size={16} aria-hidden="true"/></figcaption></figure>)}
      </div>
    </section>
    <article className="article-body">
      <h2>완성한 영상은 휴대전화에서 다시 봅니다</h2>
      <p>글자가 잘 읽히는지, 자막이 너무 빨리 지나가지는 않는지 확인합니다. 원고에서 중요한 내용이 빠지지 않았는지도 다시 봅니다. 코칭에서도 초안을 만드는 법부터 완성한 영상을 점검하고 고치는 법까지 알려드립니다.</p>
      <h2>써둔 글과 사진을 코칭에서 활용할 수 있습니다</h2>
      <p>고객에게 자주 설명하는 내용이나 직접 찍은 작업 사진, 이미 쓴 블로그 글로 연습할 수 있습니다.</p>
      <p>정비소라면 “타이어 교체 시기, 어떻게 알 수 있나요?”, 펜션업이라면 “체크인 전에 짐을 맡길 수 있나요?” 같은 질문 하나로 같은 순서를 적용해봅니다.</p>
      <p>어떤 내용을 골라 영상으로 만들지 정하고 제작해봅니다. 이 페이지의 영상은 세온비즈 자체 제작물이며, 고객 코칭 성과나 조회수·매출 증가 사례는 아닙니다.</p>
      <a href="/notes/content-formats" className="text-link">카드뉴스와 영상 만드는 순서 읽기 <ArrowRight size={18}/></a>
    </article>
  </>;
}
