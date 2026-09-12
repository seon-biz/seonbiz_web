import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { coaching } from "@/lib/content";
import { Reveal } from "@/components/site/sections";
import { PricingSummary, FAQ, ConsultCTA } from "@/components/site/coaching-blocks";
import { PageHero } from "@/components/site/page-hero";
type Props={params:Promise<{type:string}>};
export async function generateMetadata({params}:Props){const {type}=await params;const item=coaching[type as keyof typeof coaching];return {title:item?.label??'코칭 안내',description:item?.intro}}
export default async function CoachingPage({params}:Props){const {type}=await params;const item=coaching[type as keyof typeof coaching];if(!item)notFound();const isShop=type==='shop';return <main id="main">
<PageHero eyebrow={item.eyebrow} title={item.title} intro={item.intro} image={isShop?'/images/shop-product-page.webp':'/images/service-website.webp'} alt={isShop?'상품과 규격 자료를 보며 상세페이지를 작성하는 손을 그린 일러스트':'정비 사진과 점검 내용을 서비스 소개 홈페이지에 정리하는 일러스트'} caption={isShop?'판매 중인 상품과 고객의 질문으로':'현장의 경험을 고객이 읽을 수 있게'}/>
<section className="container task-section"><p className="scope-note">필요한 작업을 골라 진행합니다. 첫 상담에서 현재 상황을 살펴보고, 코칭을 시작할 때 시간 안에 가능한 범위를 정합니다.</p>{item.tasks.map((task,i)=><Reveal key={task.title}><article className="task-row"><div><span className="step-index">0{i+1}</span><h2>{task.title}</h2></div><div><h3>{task.problem}</h3><ul>{task.items.map(t=><li key={t}><Check size={18}/>{t}</li>)}</ul><p className="task-result">{task.result}</p></div></article></Reveal>)}</section>
{isShop?<section className="related-service container"><div><p className="eyebrow">상세페이지 코딩·별도 제작</p><h2>글과 이미지가 함께 있는<br/>상세페이지로 바꾸려면</h2><p>상품 설명을 본문 텍스트로 정리하고 화면을 구성하는 작업도 다룹니다. 자사몰과 판매처마다 편집할 수 있는 범위를 먼저 확인합니다. 직접 배우는 코칭과 별도로, HTML 변환 제작은 세온코더에 의뢰하실 수 있습니다.</p></div><a className="button button-ink" href="https://seoncoder.com/" target="_blank" rel="noopener noreferrer">세온코더 제작 안내 <ArrowUpRight size={20}/></a></section>:<section className="service-example container"><p className="eyebrow">자동차 정비소에서 해볼 수 있는 일</p><h2>수리 사진 옆에<br/>작업한 이유를 적습니다.</h2><p>어떤 증상으로 입고됐는지, 무엇을 점검했고 왜 부품을 교체했는지 정리합니다. 고객에게 말로 설명하던 내용을 사진 옆에 붙여보세요. AI로 초안을 쓰고 실제 작업과 다른 내용을 고치는 순서까지 함께 익힙니다.</p><p className="meta">정비소를 가정한 작업 예시입니다. 실제 업체의 성과 사례는 아닙니다.</p></section>}
<section className="container related-case"><p>{isShop?'실제 상품 정보 정비와 검색 기록을 확인하세요.':'원고를 영상으로 옮긴 실제 제작 과정을 확인하세요.'}</p><Link href={isShop?'/cases/search-records':'/cases/content-workflow'} className="text-link">{isShop?'식품 쇼핑몰 작업 사례 보기':'짧은 영상 제작 사례 보기'}<ArrowUpRight size={18}/></Link></section>
<PricingSummary/><FAQ subset={isShop?[2,4,6]:[1,5,6]}/><ConsultCTA title={isShop?'판매 중인 상품과\n고치고 싶은 곳을 알려주세요.':'하시는 일과 준비한 자료로\n이야기를 시작해 보세요.'} description="필요한 작업과 참여하실 수 있는 시간을 듣고, 코칭 진행 방향을 함께 정합니다."/>
</main>}
