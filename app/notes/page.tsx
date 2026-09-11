import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notes } from "@/lib/content";
export const metadata={title:'코칭 노트',description:'상세페이지를 고쳐도 반응이 없고, 콘텐츠를 매번 새로 만들기 벅찬 대표님을 위한 실무 글. 고객 질문 정리부터 AI 콘텐츠 제작까지 살펴보세요.'};
export default function Notes(){return <main id="main"><section className="inner-hero container"><p className="eyebrow">코칭 노트</p><h1>혼자 해보다 막혔다면,<br/>이 글부터 읽어보세요.</h1><p className="lead">상세페이지에 무슨 말을 써야 할지,<br/>블로그 글을 영상으로 어떻게 바꿀지.<br/>내 사업에 적용해 볼 수 있도록 순서대로 설명합니다.</p></section><section className="container note-list">{notes.map((note,i)=><Link key={note.slug} href={`/notes/${note.slug}`}><span className="note-order">0{i+1}</span><div><p className="kicker">{note.tag}</p><h2>{note.title}</h2><p className="note-excerpt">{note.intro}</p><time dateTime="2026-09-11">2026.09.11</time></div><ArrowUpRight size={25}/></Link>)}</section></main>}
