import { notFound } from "next/navigation";
import { ContentWorkflowCase } from "@/components/site/content-workflow-case";
import { caseSummaries } from "@/lib/content";
import { LegacySearchCase, LegacySearchLinks } from "@/components/site/legacy-search-case";
import { RecentCaseDetail } from "@/components/site/case-evidence";
import { ConsultCTA } from "@/components/site/coaching-blocks";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const item=caseSummaries.find(x=>x.slug===slug);return {title:item?.title.replace('\n',' ')??'사례',description:item?.summary}}
export default async function CaseDetail({params}:Props){const {slug}=await params;const item=caseSummaries.find(x=>x.slug===slug);if(!item)notFound();return <main id="main"><section className="inner-hero container"><a href="/cases" className="back-link">실제 사례</a><p className="eyebrow">{item.tag}</p><h1>{item.title.split('\n').map((line,i)=><span key={line}>{i>0&&<br/>}{line}</span>)}</h1><p className="lead">{item.summary}</p>{slug==='search-records'&&<LegacySearchLinks/>}</section>{item.recordKind?<RecentCaseDetail kind={item.recordKind}/>:slug==='search-records'?<LegacySearchCase/>:<ContentWorkflowCase/>}<ConsultCTA/></main>}
