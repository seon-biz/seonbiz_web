import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notes } from "@/lib/content";
export const metadata={title:'코칭 노트',description:'쇼핑몰과 서비스 사업자가 직접 실행할 수 있는 AI 실무와 콘텐츠 운영 가이드.'};
export default function Notes(){return <main id="main"><section className="inner-hero container"><p className="eyebrow">코칭 노트</p><h1>직접 해보는 일의<br/>작은 시작.</h1><p className="lead">도구를 켜기 전에 정할 것과,<br/>결과를 만든 뒤 확인할 것을 정리합니다.</p></section><section className="container note-list">{notes.map((note,i)=><Link key={note.slug} href={`/notes/${note.slug}`}><span className="note-order">0{i+1}</span><div><p className="kicker">{note.tag}</p><h2>{note.title}</h2><p className="note-excerpt">{note.intro}</p><time dateTime="2026-09-11">2026.09.11</time></div><ArrowUpRight size={25}/></Link>)}</section></main>}
