import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site/shell";
export const metadata: Metadata = {
  metadataBase: new URL("https://seonbiz-coaching.jeongohkseo.chatgpt.site"),
  title: { default: "세온비즈 · 내 사업에 써먹는 AI 1:1 코칭", template: "%s | 세온비즈" },
  description: "상세페이지를 고쳐도 반응이 없고, AI로 쓴 글이 내 사업에 맞지 않나요? 사이트와 자료를 함께 보며 고칠 곳을 찾는 AI 1:1 코칭. 첫 상담은 1시간 무료입니다.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="ko"><body><a className="skip-link" href="#main">본문으로 바로가기</a><SiteHeader/>{children}<SiteFooter/></body></html>;
}
