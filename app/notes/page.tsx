import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notes } from "@/lib/content";
import { PageHero } from "@/components/site/page-hero";
export const metadata={title:'코칭 노트',description:'홈페이지 제작, 상세페이지 문구, 블로그·SNS·영상, 검색과 광고 기록. 직접 작업할 때 참고할 방법과 선택 기준을 정리했습니다.'};
export default function Notes(){return <main id="main"><PageHero eyebrow="코칭 노트" title={'혼자 해보실 때\n참고하세요.'} intro="홈페이지를 만들고, 상품을 설명하고, 홍보할 글을 쓰는 일. 직접 작업할 때 도움이 될 방법과 선택 기준을 정리했습니다." image="/images/content-formats.webp" alt="원고에서 핵심 내용을 골라 카드뉴스와 세로 영상으로 나누는 일러스트" caption="글 한 편에서 카드뉴스와 짧은 영상까지" cta={false}/><section className="container note-list">{notes.map((note,i)=><Link key={note.slug} href={'/notes/'+note.slug}><span className="note-order">0{i+1}</span><div><p className="kicker">{note.tag}</p><h2>{note.title}</h2><p className="note-excerpt">{note.intro}</p><time dateTime="2026-09-12">2026.09.12</time></div><ArrowUpRight size={25}/></Link>)}</section></main>}
