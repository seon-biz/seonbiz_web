import { ArrowUpRight } from "lucide-react";
import { notes } from "@/lib/content";
import { PageHero } from "@/components/site/page-hero";

export const metadata = {
  title: { absolute: '쇼핑몰·서비스업 AI 활용 가이드 | 세온비즈 코칭 노트' },
  description: '상세페이지 쓰는 법, 블로그를 카드뉴스·영상으로 넓히는 법, 광고 숫자 읽는 법, AI 검색 대응까지. 직접 해보실 때 참고할 글입니다.',
};

export default function Notes() {
  const listedNotes = [
    ...notes.filter((note) => note.category !== 'record'),
    ...notes.filter((note) => note.category === 'record'),
  ];

  return (
    <main id="main" className="notes-page">
      <PageHero
        eyebrow="코칭 노트"
        title={'혼자 해보실 때\n참고하세요.'}
        intro={'쇼핑몰과 서비스업 대표님이 직접 작업할 때 필요한 내용을 정리했습니다.\n\n홈페이지를 만들고, 상품을 설명하고, 홍보할 글을 쓰는 일. 직접 작업할 때 도움이 될 방법과 선택 기준을 정리했습니다.'}
        image="/images/content-formats.webp"
        alt="원고에서 핵심 내용을 골라 카드뉴스와 세로 영상으로 나누는 일러스트"
        caption="글 한 편에서 카드뉴스와 짧은 영상까지"
        cta={false}
      />
      <section className="container note-list" aria-label="코칭 노트 글 목록">
        {listedNotes.map((note, i) => (
          <a key={note.slug} href={'/notes/' + note.slug}>
            <span className="note-order">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="kicker">{note.tag}</p>
              <h2>{note.title}</h2>
              <p className="note-excerpt">{note.intro}</p>
              <time dateTime="2026-09-12">2026.09.12</time>
            </div>
            <ArrowUpRight size={25} aria-hidden="true" />
          </a>
        ))}
      </section>
      <section className="container notes-consult" aria-label="무료 상담 안내">
        <p>글로 정리한 내용을 대표님 사업에 적용해보고 싶으시면<br />{' '}첫 상담에서 지금 상황을 함께 살펴봅니다.</p>
        <a className="button button-ink" href="/apply">1시간 무료 상담 신청 <ArrowUpRight size={20} aria-hidden="true" /></a>
      </section>
    </main>
  );
}
