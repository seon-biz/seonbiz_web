import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site/shell";
export const metadata: Metadata = {
  metadataBase: new URL("https://seonbiz-coaching.rare-coati-7844.chatgpt.site"),
  title: { default: "세온비즈 · AI 실무 1:1 코칭", template: "%s | 세온비즈" },
  description: "쇼핑몰과 서비스 사업자의 웹사이트·마케팅·콘텐츠를 함께 개선합니다. 실제 화면으로 실행하고, 다음 작업은 직접 이어가는 AI 실무 코칭.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="ko"><body><a className="skip-link" href="#main">본문으로 바로가기</a><SiteHeader/>{children}<SiteFooter/></body></html>;
}
