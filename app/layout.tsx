import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site/shell";
export const metadata: Metadata = {
  metadataBase: new URL("https://seonbiz-coaching.jeongohkseo.chatgpt.site"),
  title: { default: "세온비즈 · 쇼핑몰·서비스업 일대일 AI 코칭", template: "%s | 세온비즈" },
  description: "홈페이지부터 상품 홍보까지, 내 사업에 필요한 일을 AI로 직접 해보세요. 쇼핑몰·서비스업을 위한 일대일 실무 코칭. 첫 상담은 1시간 무료입니다.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="ko"><body><a className="skip-link" href="#main">본문으로 바로가기</a><SiteHeader/>{children}<SiteFooter/></body></html>;
}
