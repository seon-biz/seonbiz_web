"use client";
import { useState } from "react";
import { BrandLogo } from "@/components/site/brand-logo";
import { Menu, ArrowUpRight, X } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
// 모든 페이지의 PC·모바일 헤더와 푸터가 같은 라벨을 사용합니다.
const navigation = {
  website: { href: "/coaching/website", label: "홈페이지 코칭" },
  process: { href: "/process", label: "진행·비용" },
  cases: { href: "/cases", label: "실제 사례" },
  notes: { href: "/notes", label: "코칭 노트" },
  about: { href: "/about", label: "소개" },
  apply: { href: "/apply", label: "무료 상담 신청" },
} as const;

// 헤더와 푸터는 각각의 기존 순서와 열 구성을 유지합니다.
const headerLinks = [navigation.website, navigation.process, navigation.cases, navigation.notes, navigation.about];
const footerLinkGroups = [
  [navigation.website, navigation.cases],
  [navigation.notes, navigation.process, navigation.about, navigation.apply],
];
const footerTagline = ["만드는 것까지가 아니라,", "고치는 것까지."] as const;
export function SiteHeader({pathname}:{pathname:string}){
 const [open,setOpen]=useState(false); const path=pathname;
 return <header className="site-header"><div className="container header-inner"><a className="wordmark" href="/" aria-label="세온비즈 홈"><BrandLogo decorative /></a><nav className="desktop-nav" aria-label="주 메뉴">{headerLinks.map(({href,label})=><a key={href} href={href} aria-current={path.startsWith(href)?"page":undefined}>{label}</a>)}<a href={navigation.apply.href} className="button button-small button-ink">{navigation.apply.label} <ArrowUpRight size={17}/></a></nav><div className="mobile-nav"><a className="mobile-consult" href={navigation.apply.href}>{navigation.apply.label}</a><Sheet open={open} onOpenChange={setOpen}><SheetTrigger className="icon-button" aria-label="메뉴 열기" aria-controls="mobile-navigation"><Menu/></SheetTrigger><SheetContent id="mobile-navigation" aria-labelledby="mobile-navigation-title" aria-describedby="mobile-navigation-description" className="mobile-sheet" showCloseButton={false}><SheetClose className="icon-button sheet-close" aria-label="메뉴 닫기"><X/></SheetClose><SheetTitle id="mobile-navigation-title" className="wordmark"><BrandLogo decorative /><span className="sr-only">세온비즈 메뉴</span></SheetTitle><SheetDescription id="mobile-navigation-description" className="sr-only">코칭 안내와 데이터, 상담 신청</SheetDescription><nav aria-label="모바일 메뉴">{headerLinks.map(({href,label})=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={20}/></a>)}<a href={navigation.apply.href} onClick={()=>setOpen(false)}>{navigation.apply.label}<ArrowUpRight size={20}/></a></nav></SheetContent></Sheet></div></div></header>;
}
export function SiteFooter(){return <footer className="site-footer"><div className="container footer-top"><a href="/" className="wordmark" aria-label="세온비즈 홈"><BrandLogo decorative /></a><p>{footerTagline[0]}<br/>{footerTagline[1]}</p>{footerLinkGroups.map((group,index)=><div key={index}>{group.map(({href,label})=><a key={href} href={href}>{label}</a>)}</div>)}</div><div className="container footer-company"><span>운영 · 주식회사 티오엠</span><a href="mailto:cobaltblue872@gmail.com">cobaltblue872@gmail.com</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} SEONBIZ</span><a href="/privacy">개인정보처리방침</a><a href="/process#changes">변경·취소·환불 안내</a><span>seonbiz.com</span></div></footer>}
