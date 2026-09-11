import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { notes } from "@/lib/content";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const item=notes.find(x=>x.slug===slug);return {title:item?.title??'코칭 노트',description:item?.intro}}
export default async function NoteDetail({params}:Props){const {slug}=await params;const note=notes.find(x=>x.slug===slug);if(!note)notFound();return <main id="main"><header className="article-header"><Link href="/notes" className="back-link">코칭 노트</Link><p className="eyebrow">{note.tag}</p><h1>{note.title}</h1><p className="article-meta">세온비즈 · <time dateTime="2026-09-11">2026.09.11</time></p></header><article className="article-body"><p className="article-intro">{note.intro}</p>{note.sections.map(([title,body],i)=><section key={title}><span className="step-index">0{i+1}</span><h2>{title}</h2><p>{body}</p></section>)}<div className="article-next"><p>{slug==='choose-coaching'?'어떤 코칭을 신청할지 상담 후 결정하셔도 됩니다.':'혼자 하기 어려운 부분은 코칭에서 같이 해보실 수 있습니다.'}</p><Link className="text-link" href='/apply'>1시간 무료 상담 신청<ArrowRight size={18}/></Link></div></article></main>}
