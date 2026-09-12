import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConsultCTA } from "@/components/site/coaching-blocks";
import { Reveal } from "@/components/site/sections";
export const metadata={title:'세온비즈 소개',description:'쇼핑몰과 서비스업의 실제 작업으로 배우는 일대일 AI 코칭. 자료를 살피고, 함께 작업하고, 직접 이어갈 수 있도록 정리하는 세온비즈의 일하는 방식을 소개합니다.'};
const principles=[
['지금 하시는 일로 배웁니다.','판매 중인 상품, 고객에게 자주 받는 질문, 현장에서 찍은 사진을 놓고 시작합니다. 준비한 자료가 부족하면 필요한 정보부터 함께 정리합니다.'],
['AI가 쓴 내용도 다시 확인합니다.','그럴듯한 문장에 틀린 규격이나 하지 않는 서비스가 들어갈 수 있습니다. 실제 정보와 대조하고, 고객에게 설명하듯 문장을 고칩니다.'],
['다음에 고칠 방법까지 설명합니다.','왜 바꿨는지, 다시 작업하려면 어디에서 시작하면 되는지 남깁니다. 고객 계정에서 직접 수정하고 확인하는 방법도 함께 익힙니다.'],
];
export default function About(){return <main id="main"><section className="container inner-hero about-hero"><p className="eyebrow">세온비즈가 일하는 방식</p><h1>설명은 함께 보고 있는<br/>화면에서 시작합니다.</h1><p className="lead">세온비즈는 쇼핑몰과 서비스업에서 필요한 일을 함께 해보는 일대일 AI 코칭입니다. 배운 방법을 실제 일에 쓸 수 있도록, 지금 운영하는 사업과 준비된 자료를 놓고 진행합니다.</p><div className="about-facts"><div><span>진행 방식</span><strong>Zoom 일대일</strong></div><div><span>한 번의 코칭</span><strong>2시간</strong></div><div><span>첫 상담</span><strong>1시간 무료</strong></div></div></section>
<section className="container about-principles">{principles.map(([title,body],i)=><Reveal key={title}><article><span className="step-index">0{i+1}</span><h2>{title}</h2><p>{body}</p></article></Reveal>)}</section>
<section className="container section about-proof"><div><p className="eyebrow">직접 작업한 자료</p><h2>어떤 일을 했는지<br/>확인하실 수 있습니다.</h2></div><div><p>식품 쇼핑몰의 상품 정보를 정비하며 확인한 검색 기록과, 세온비즈가 직접 만든 짧은 영상을 소개합니다. 비교한 기간과 작업 내용을 함께 설명합니다.</p><Link href="/cases" className="text-link">실제 작업 사례 보기 <ArrowUpRight size={18}/></Link></div></section>
<section className="container section about-coder"><div><p className="eyebrow">상세페이지 제작 서비스 · 세온코더</p><h2>코딩 제작을<br/>맡기고 싶으시다면</h2></div><div><p>이미지에 담긴 상품 설명을 본문 텍스트와 이미지로 구성하는 HTML 변환 제작은 세온코더에서 안내합니다. 직접 배우는 코칭과 별도로 작업 내용과 비용을 확인하실 수 있습니다.</p><a href="https://seoncoder.com/" target="_blank" rel="noopener noreferrer" className="text-link">세온코더 제작 안내 <ArrowUpRight size={18}/></a></div></section>
<ConsultCTA/></main>}
