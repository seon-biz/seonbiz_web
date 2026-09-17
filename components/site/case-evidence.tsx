import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseSummaries } from "@/lib/content";

type CaseKind = 'ai' | 'search-current' | 'search-legacy';

export function CaseEvidence({kind}: {kind: CaseKind}) {
  const item = caseSummaries.find(item => item.kind === kind)!;
  if (kind === 'search-legacy') return <div className="search-figures"><figure><figcaption><span>2021.05.23 — 06.22</span><strong>클릭 651회</strong></figcaption><img src="/images/search-2021.webp" width="1024" height="457" alt="2021년 고객 웹사이트 서치콘솔: 웹 검색 클릭 651회, 노출 3.25만 회" loading="lazy"/></figure><figure><figcaption><span>2022.05.23 — 06.22</span><strong>클릭 약 2,840회</strong></figcaption><img src="/images/search-2022.webp" width="1024" height="456" alt="2022년 고객 웹사이트 서치콘솔: 웹 검색 클릭 2.84천 회, 노출 19.1만 회" loading="lazy"/></figure></div>;
  const isAi = kind === 'ai';
  return <figure className="case-original">
    <a href={item.image} target="_blank" rel="noopener noreferrer" aria-label={`${item.tag} 원본 화면 크게 보기 (새 탭)`}><img src={item.image} width={isAi ? 1579 : 2734} height={isAi ? 996 : 1300} alt={item.alt} loading="lazy"/></a>
    <figcaption><span>{item.period}</span><a href={item.image} target="_blank" rel="noopener noreferrer">원본 크게 보기 <ArrowUpRight size={16}/><span className="sr-only"> (새 탭)</span></a></figcaption>
  </figure>;
}

export function CaseDetail({kind}: {kind: CaseKind}) {
  return <>
    <section className="container recent-case-evidence" aria-label="실제 기록 화면">
      <CaseEvidence kind={kind}/>
      <p className="meta">{kind === 'ai' ? '세션 소스/매체에서 “GPT”를 검색한 화면입니다. 9월은 12일까지의 기록이며 월 전체가 아닙니다. 고객을 식별할 수 있는 소스 한 행만 가렸고 숫자와 나머지 화면은 유지했습니다.' : kind === 'search-current' ? '검색 유형: 웹 · 화면의 클릭 1.27천과 1.86천은 각각 약 1,270회와 약 1,860회로 풀어 썼습니다.' : '검색 유형: 웹 · 2021년과 2022년의 같은 기간을 나란히 표시했습니다.'}</p>
    </section>
    <article className="article-body">
      {kind === 'ai' ? <>
        <h2>AI 검색을 위한 작업과 유입을 함께 살펴봤습니다</h2>
        <p>고객 웹사이트의 정보를 정비하던 기간에 ChatGPT 경로로 기록된 방문을 확인했습니다. 2026년 1월 1일부터 9월 12일까지의 화면에는 일별 등락이 있으며, 기간 후반에 일별 유입이 많아진 흐름을 볼 수 있습니다.</p>
        <h2>화면에 표시된 참여 지표</h2>
        <dl className="case-detail-metrics"><div><dt>세션수</dt><dd>1,627</dd></div><div><dt>참여율</dt><dd>63.18%</dd></div><div><dt>세션당 평균 참여 시간</dt><dd>1분 07초</dd></div></dl>
        <p>위 숫자는 “GPT”를 검색한 보고서의 합계 행에 표시된 값입니다. 참여율은 사이트 전체 평균 대비 약 두 배, 세션당 평균 참여 시간은 77.23% 높게 표시되어 있습니다.</p>
        <h2>방문 기록이 알려주는 범위</h2>
        <p>여러 ChatGPT 소스/매체가 함께 포함된 집계이며 모든 AI 서비스에서 들어온 방문 전체는 아닙니다. 어떤 질문에서 어떤 문장으로 추천됐는지나 특정 수정 하나의 효과도 알려주지 않습니다.</p>
      </> : kind === 'search-current' ? <>
        <h2>웹사이트 정보를 정비하며 검색 기록을 살펴봤습니다</h2>
        <p>페이지 제목과 본문, 이미지 설명 등 웹사이트 정보를 정비하던 기간에 구글 검색에서 노출되고 클릭된 기록을 확인했습니다. 2025년과 2026년 각각 5월 11일부터 6월 12일까지를 비교했습니다.</p>
        <h2>검색 클릭과 노출이 함께 달라졌습니다</h2>
        <dl className="case-detail-metrics"><div><dt>검색 클릭</dt><dd><span>약 1,270회 →</span>약 1,860회</dd></div><div><dt>검색 노출</dt><dd><span>4.3만 회 →</span>6.23만 회</dd></div><div><dt>평균 순위</dt><dd><span>6.9위 →</span>5.7위</dd></div></dl>
        <p>같은 기간을 1년 전과 비교했을 때 클릭과 노출이 늘고 평균 순위도 높아졌습니다. 화면의 실선은 2026년, 점선은 2025년의 일별 기록입니다.</p>
        <h2>비교할 때 알아둘 점</h2>
        <p>수요와 다른 마케팅 활동, 검색 환경 변화도 기록에 영향을 줄 수 있습니다. 웹사이트 정보를 고친 효과만 따로 계산한 결과가 아니며 문의나 매출 증가를 뜻하지도 않습니다.</p>
      </> : <>
        <h2>두 해의 같은 기간을 비교했습니다</h2>
        <p>고객 웹사이트의 정보를 정비하며 확인한 구글 서치콘솔 기록입니다. 2021년과 2022년 각각 5월 23일부터 6월 22일까지의 클릭과 노출을 비교했습니다.</p>
        <dl className="case-detail-metrics"><div><dt>검색 클릭</dt><dd><span>651회 →</span>약 2,840회</dd></div><div><dt>검색 노출</dt><dd><span>3.25만 회 →</span>19.1만 회</dd></div></dl>
        <h2>숫자가 달라진 이유는 따로 확인해야 합니다</h2>
        <p>같은 시기를 비교해도 사업 상황과 수요, 다른 홍보 활동, 검색 환경의 변화가 함께 영향을 줄 수 있습니다. 이 화면만으로 특정 수정의 효과나 문의 증가를 단정하지 않습니다.</p>
      </>}
      <h2>코칭에서는 내 홈페이지의 기록으로 판단합니다</h2>
      <p>GA4와 구글 서치콘솔의 측정을 먼저 점검하고 최소 4주간 기록을 모읍니다. 같은 기간과 유입 경로를 놓고 비교한 뒤 바꾼 내용과 그 후의 기록을 함께 보며 다음 작업을 정합니다.</p>
      <a href="/coaching/website" className="text-link">홈페이지 AI 코칭 자세히 보기 <ArrowRight size={18}/></a>
    </article>
  </>;
}
