import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function PageHero({eyebrow,title,intro,image,alt,caption,cta=true}:{eyebrow:string;title:string;intro:string;image:string;alt:string;caption?:string;cta?:boolean}) {
return <section className="container illustrated-hero"><div><p className="eyebrow">{eyebrow}</p><h1>{title.split('\n').map((line,i)=><span key={line}>{i>0&&<br/>}{line}</span>)}</h1><p className="lead">{intro}</p>{cta&&<><Link href="/apply" className="button button-coral">1시간 무료 상담 신청 <ArrowUpRight size={20}/></Link><p className="hero-note">Zoom으로 1시간 · 코칭 신청은 상담 후 결정</p></>}</div><figure><img src={image} width="1448" height="1086" alt={alt} fetchPriority="high"/>{caption&&<figcaption>{caption}</figcaption>}</figure></section>;
}
