import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notes } from "@/lib/content";
export const metadata={title:'코칭 노트',description:'상세페이지 문구 작성, AI로 카드뉴스와 영상 만들기 등 쇼핑몰과 서비스업 운영에 참고할 글을 모았습니다.'};
export default function Notes(){return <main id="main"><section className="inner-hero container"><p className="eyebrow">코칭 노트</p><h1>운영하시면서<br/>참고하실 글입니다.</h1><p className="lead">상세페이지 문구를 고치거나 콘텐츠를 만들 때<br/>참고하실 수 있도록 방법과 순서를 정리했습니다.</p></section><section className="container note-list">{notes.map((note,i)=><Link key={note.slug} href={`/notes/${note.slug}`}><span className="note-order">0{i+1}</span><div><p className="kicker">{note.tag}</p><h2>{note.title}</h2><p className="note-excerpt">{note.intro}</p><time dateTime="2026-09-11">2026.09.11</time></div><ArrowUpRight size={25}/></Link>)}</section></main>}
