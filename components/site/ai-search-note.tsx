import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { caseSummaries } from "@/lib/content";

const textChecks = [
  '상품명과 규격이 본문 텍스트에 있는가',
  '가격 또는 가격 기준이 텍스트로 적혀 있는가',
  '구성품과 수량이 텍스트로 적혀 있는가',
  '배송·교환 조건이 텍스트로 적혀 있는가',
  '자주 묻는 질문과 답이 본문에 있는가',
];

export function AiSearchTextChecklist() {
  return (
    <>
      <fieldset className="note-publish-checklist">
        <legend>이미지 밖에서도 읽을 수 있나요?</legend>
        <div>{textChecks.map((check, i) => (
          <label key={check} htmlFor={'ai-search-text-check-' + i}>
            <Checkbox id={'ai-search-text-check-' + i} className="note-publish-checkbox" />
            <span>{check}</span>
          </label>
        ))}</div>
      </fieldset>
      <p>서비스업이라면 상품 규격 대신 제공 범위, 배송 조건 대신 이용·예약 조건을 확인하세요. 옮겨 적은 내용이 이미지 속 안내 및 실제 판매 조건과 서로 다른지도 대조합니다.</p>
    </>
  );
}

export function AiSearchRecordPreview() {
  const record = caseSummaries.find((item) => item.slug === 'ai-search-visits')!;
  return (
    <aside className="ai-search-record-preview" aria-labelledby="ai-search-record-title">
      <p className="ai-search-record-label">고객 사례 · 생활용품 쇼핑몰</p>
      <h3 id="ai-search-record-title">실제로는 이렇게 보입니다</h3>
      <p>방문 측정이 설정되어 있고 유입 경로가 전달되면, ChatGPT 등을 거쳐 들어온 방문을 기록에서 확인할 수 있습니다.</p>
      <figure>
        <a href="/cases/ai-search-visits" aria-label="생활용품 쇼핑몰의 GA4 원본과 기록 설명 보기">
          <img src={record.image} width="2688" height="1694" alt={record.alt} loading="lazy" />
        </a>
        <figcaption>2026.01.01–09.12 · GA4 세션 소스/매체에서 ‘GPT’를 검색한 화면</figcaption>
      </figure>
      <p>이 보고서의 합계는 1,627세션(방문 횟수에 관한 지표)입니다. 세션당 평균 참여 시간은 1분 07초로, 사이트 전체 평균보다 높게 표시되었습니다. 일별 등락이 있으며 기간 후반에 유입이 많아진 흐름을 볼 수 있습니다.</p>
      <p className="ai-search-record-scope">여러 ChatGPT 소스/매체와 별도의 chatgpt.site 경로가 함께 포함된 집계입니다. 모든 AI 유입을 뜻하지 않으며, 어떤 질문에서 추천됐는지나 특정 수정의 효과까지 알려주지는 않습니다.</p>
      <a className="text-link" href="/cases/ai-search-visits">실제 기록 보기 <ArrowUpRight size={18} aria-hidden="true" /></a>
    </aside>
  );
}

export function AiSearchCoachingLink() {
  return <a className="text-link website-process-link" href="/coaching/shop">쇼핑몰 검색·AI 검색 코칭 살펴보기 <ArrowRight size={18} aria-hidden="true" /></a>;
}
