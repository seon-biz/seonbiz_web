import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Method, Pricing, FAQ, ConsultCTA } from "@/components/site/coaching-blocks";
export const metadata={title:'코칭 진행 방식·비용',description:'Zoom으로 회당 2시간, 월 4회 코칭 132만 원·단독 코칭 44만 원. 준비물과 계정·구독료, 일정 변경·취소·환불 기준을 안내합니다. 첫 상담은 1시간 무료입니다.'};
export default function Process(){return <main id="main">
<PageHero eyebrow="진행 방식 · 비용" title={'함께 작업하고,\n다음 시간에\n다시 확인합니다.'} intro="한 번에 두 시간, 대표님의 화면을 보며 진행합니다. 설명을 듣고 직접 작업한 뒤 다시 해볼 순서를 남깁니다. 월 코칭에서는 혼자 해본 결과를 다음 시간에 함께 살펴봅니다." image="/images/coaching-review.webp" alt="화면 공유로 작업한 페이지를 검토하고 다음 실습 메모를 남기는 일러스트" caption="회당 2시간 · Zoom 화면 공유"/>
<Method/>
<section className="container section preparation"><div><p className="eyebrow">시작 전에 준비할 것</p><h2>지금 쓰는 자료를<br/>그대로 가져오세요.</h2><p className="lead">무엇을 준비할지 모르겠다면<br/>무료 상담에서 먼저 확인합니다.</p></div><div className="preparation-list"><article><span>01</span><h3>컴퓨터와 화면 공유 환경</h3><p>인터넷에 연결된 컴퓨터와 Zoom을 준비합니다. 휴대전화만으로는 화면을 보며 작업하기 어려울 수 있습니다.</p></article><article><span>02</span><h3>함께 볼 사이트와 사업 자료</h3><p>상품 정보, 고객 질문, 작업 사진, 쓰다 만 글도 좋습니다. 새 홈페이지가 필요하다면 사업 소개와 필요한 기능부터 정리합니다.</p></article><article><span>03</span><h3>직접 로그인할 수 있는 계정</h3><p>고객 계정에서는 직접 로그인하고 화면을 공유합니다. 필요한 구독과 운영 비용은 시작 전에 확인합니다.</p></article></div></section>
<Pricing/>
<section id="changes" className="container section policies"><div className="section-heading"><p className="eyebrow">결제 · 일정 변경 · 환불</p><h2>시작하기 전에<br/>기준을 확인하세요.</h2><p>2026년 9월 12일부터 적용하는 세온비즈 코칭 운영 기준입니다.</p></div>
<div className="policy-body"><article><h3>결제와 다음 달 코칭</h3><p>무료 상담 후 코칭 내용과 일정을 정하고 계좌이체로 결제합니다. 입금 계좌와 최종 금액은 개별 안내합니다. 다음 달 코칭은 진행 여부를 다시 정하며 자동으로 결제되지 않습니다.</p></article>
<article><h3>일정이 바뀌었을 때</h3><p>가능한 한 코칭 시작 24시간 전까지 카카오톡이나 이메일로 알려주세요. 서로 가능한 날짜로 다시 정합니다. 당일 참석이 어려워진 경우에도 먼저 연락해 주세요. 당일 변경이나 불참만으로 1회를 자동 차감하지 않고, 사유와 남은 일정을 확인해 조율합니다.</p><p>세온비즈의 사정으로 진행하지 못한 시간은 차감하지 않습니다. 새 일정이 맞지 않아 중단을 원하면 진행하지 않은 시간의 비용을 환불합니다.</p></article>
<article><h3>중간에 취소하실 때</h3><p>첫 코칭을 시작하기 전에는 결제한 금액 전액을 환불합니다. 시작한 뒤에는 실제 진행한 시간의 비용만 빼고 나머지를 돌려드립니다. 별도의 취소 수수료는 없습니다.</p>
<div className="table-scroll"><table className="policy-table"><caption>부가세를 포함한 환불 계산 기준</caption><thead><tr><th scope="col">코칭</th><th scope="col">진행한 시간의 비용</th><th scope="col">환불 예시</th></tr></thead><tbody><tr><th scope="row">월 코칭</th><td>시간당 165,000원</td><td>8시간 중 2시간 진행 후 취소하면<br/><strong>990,000원 환불</strong></td></tr><tr><th scope="row">단독 코칭</th><td>시간당 220,000원</td><td>2시간 중 1시간 진행 후 취소하면<br/><strong>220,000원 환불</strong></td></tr></tbody></table></div>
<p>한 시간 미만은 실제 진행한 분 단위로 계산하며, 원 미만의 환불 금액은 올림합니다. 월 코칭을 중단하더라도 단독 코칭 가격으로 다시 계산하지 않습니다. 별도로 합의하지 않은 사전 준비 시간은 공제하지 않습니다.</p></article>
<article><h3>환불을 요청하는 방법</h3><p>상담 일정을 안내받은 카카오톡 또는 <a href="mailto:cobaltblue872@gmail.com">cobaltblue872@gmail.com</a>으로 요청해 주세요. 요청을 접수한 날부터 3영업일 이내에 환불하며, 계좌 확인이 필요하면 연락드립니다.</p><p className="meta">관계 법령에 따라 고객에게 더 유리한 권리가 인정되는 경우에는 해당 기준을 적용합니다. 별도로 의뢰한 제작 계약은 계약 시 안내한 범위와 조건을 따릅니다.</p></article></div></section>
<FAQ/><ConsultCTA description="단독 코칭과 월 코칭 중 무엇이 맞을지, 하시려는 일을 듣고 안내해드립니다."/>
</main>}
