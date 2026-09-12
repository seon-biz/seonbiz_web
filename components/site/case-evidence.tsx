import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseSummaries } from "@/lib/content";

export function CaseEvidence({kind}: {kind: 'ai' | 'search'}) {
  const item = caseSummaries.find(item => item.recordKind === kind)!;
  return <figure className="case-original">
    <a href={item.image} target="_blank" rel="noopener noreferrer" aria-label={`${item.tag} 원본 화면 크게 보기 (새 탭)`}><img src={item.image} width={kind === 'ai' ? 2688 : 2734} height={kind === 'ai' ? 1694 : 1300} alt={item.alt} loading="lazy"/></a>
    <figcaption><span>{item.period}</span><a href={item.image} target="_blank" rel="noopener noreferrer">원본 크게 보기 <ArrowUpRight size={16}/><span className="sr-only"> (새 탭)</span></a></figcaption>
  </figure>;
}

export function RecentCaseDetail({kind}: {kind: 'ai' | 'search'}) {
  return <>
    <section className="container recent-case-evidence" aria-label="실제 기록 화면">
      <CaseEvidence kind={kind}/>
      <p className="meta">{kind === 'ai' ? '세션 소스/매체에서 “GPT”를 검색한 화면입니다. 9월은 12일까지의 기록이며 월 전체가 아닙니다.' : '검색 유형: 웹 · 화면에 표시된 클릭 1.27천과 1.86천을 각각 약 1,270회와 약 1,860회로 풀어 썼습니다.'}</p>
    </section>
    <article className="article-body">
      {kind === 'ai' ? <>
        <h2>AI 검색을 위한 작업과 유입을 함께 살펴봤습니다</h2>
        <p>생활용품 쇼핑몰에서 AI 검색을 위한 정보 정비를 이어가며, ChatGPT 경로로 기록된 방문을 확인했습니다. 2026년 1월 1일부터 9월 12일까지의 화면에는 일별 등락이 나타납니다. 매달 같은 비율로 늘어난 기록은 아니며, 기간 후반에 일별 유입이 많아진 흐름을 볼 수 있습니다.</p>
        <h2>화면에 표시된 참여 지표</h2>
        <dl className="case-detail-metrics"><div><dt>세션수</dt><dd>1,627</dd></div><div><dt>참여율</dt><dd>63.18%</dd></div><div><dt>세션당 평균 참여 시간</dt><dd>1분 07초</dd></div></dl>
        <p>위 숫자는 “GPT”를 검색한 보고서의 합계 행에 표시된 값입니다. 참여율은 사이트 전체 평균 대비 약 두 배, 세션당 평균 참여 시간은 77.23% 높게 표시되어 있습니다.</p>
        <h2>방문 기록이 알려주는 범위</h2>
        <p>이 화면에는 ChatGPT의 여러 소스/매체 표기와 별도의 chatgpt.site 추천 경로가 함께 잡혀 있습니다. 모든 AI 서비스에서 들어온 방문 전체를 집계한 자료는 아닙니다. 소스/매체별 행을 더하거나 특정 매체 한 줄만으로 전체 추세를 판단하지 않고, 보고서의 집계 범위를 함께 확인합니다.</p>
        <p>세션수는 방문 횟수에 관한 지표로 방문자 수와 다릅니다. AI의 답변에 어떤 문장으로 소개되었는지, 얼마나 자주 추천되었는지까지 보여주지는 않습니다. 여러 요인이 함께 반영된 기록이므로 특정 수정 하나의 효과나 매출 변화로 해석하지 않습니다.</p>
      </> : <>
        <h2>상품 제목과 설명, 이미지 정보를 정비했습니다</h2>
        <p>스포츠용품 쇼핑몰의 상품 정보를 정비하며 구글 검색에서 노출되고 클릭된 기록을 살펴봤습니다. 2025년과 2026년 각각 5월 11일부터 6월 12일까지를 비교했습니다.</p>
        <h2>검색 클릭과 노출이 함께 늘었습니다</h2>
        <dl className="case-detail-metrics"><div><dt>검색 클릭</dt><dd><span>약 1,270회 →</span>약 1,860회</dd></div><div><dt>검색 노출</dt><dd><span>4.3만 회 →</span>6.23만 회</dd></div><div><dt>평균 순위</dt><dd><span>6.9위 →</span>5.7위</dd></div></dl>
        <p>같은 기간을 1년 전과 비교했을 때 클릭과 노출이 늘고, 평균 순위도 높아졌습니다. 화면의 실선은 2026년, 점선은 2025년의 일별 기록입니다.</p>
        <h2>비교할 때 알아두실 점</h2>
        <p>상품 구성과 수요, 다른 마케팅 활동 등도 검색 기록에 영향을 줄 수 있습니다. 상품 정보를 고친 효과만 따로 계산한 결과가 아니며, 검색 클릭이 늘었다고 해서 매출 증가를 뜻하지는 않습니다.</p>
        <p>생활용품 쇼핑몰의 AI 검색 유입 사례와는 다른 사이트입니다. 두 사례의 숫자를 합쳐서 보거나 같은 쇼핑몰의 변화로 비교하지 않습니다.</p>
      </>}
      <h2>코칭에서는 내 사업의 기록으로 판단해봅니다</h2>
      <p>대표님의 관리 화면을 열고, 숫자의 뜻과 보는 순서부터 설명합니다. 같은 기간과 유입 경로를 놓고 비교한 뒤, 바꾼 내용과 그 후의 기록을 살펴봅니다. 이를 바탕으로 다음에 어떤 작업을 할지 정합니다.</p>
      <a href="/coaching/shop" className="text-link">쇼핑몰 코칭 자세히 보기 <ArrowRight size={18}/></a>
      {kind === 'search' && <div className="article-next"><p>다른 쇼핑몰의 이전 기록도 볼 수 있습니다.</p><a href="/cases/search-records" className="text-link">식품 쇼핑몰의 2021~2022년 검색 기록 <ArrowRight size={18}/></a></div>}
    </article>
  </>;
}
