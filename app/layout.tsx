import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site/shell";
export const metadata: Metadata = {
  metadataBase: new URL("https://seonbiz-coaching.jeongohkseo.chatgpt.site"),
  title: { default: "세온비즈 · 쇼핑몰·서비스업 일대일 AI 코칭", template: "%s | 세온비즈" },
  description: "상세페이지를 고치고 블로그를 쓰면서 AI를 배웁니다. 대표님이 운영하는 사이트와 자료로 진행하는 일대일 실무 코칭. 첫 상담은 1시간 무료입니다.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="ko"><body><a className="skip-link" href="#main">본문으로 바로가기</a><SiteHeader/>{children}<SiteFooter/></body></html>;
}
