import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { notes } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = notes.find((note) => note.slug === slug);
  return { title: item?.title ?? '코칭 노트', description: item?.metaDescription ?? item?.intro };
}

export default async function NoteDetail({ params }: Props) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);
  if (!note) notFound();
  const related = note.relatedHref || (slug === 'choose-coaching' ? '/process' : slug === 'content-formats' ? '/cases/content-workflow' : '/coaching/shop');
  const label = note.relatedLabel || (slug === 'choose-coaching' ? '전체 진행 방식과 비용 확인하기' : slug === 'content-formats' ? '직접 만든 영상과 제작 과정 보기' : '상세페이지 코칭 살펴보기');

  return (
    <main id="main">
      <header className="article-header">
        <a href="/notes" className="back-link">코칭 노트</a>
        <p className="eyebrow">{note.tag}</p>
        <h1 className={slug === 'customer-questions' ? 'customer-questions-title' : undefined}>{note.title}</h1>
        <p className="article-meta">세온비즈 · <time dateTime="2026-09-12">2026.09.12</time></p>
      </header>
      <article className="article-body">
        <p className="article-intro">{note.intro}</p>
        {note.sections.map(([title, ...paragraphs], i) => (
          <section key={title}>
            <span className="step-index">{String(i + 1).padStart(2, '0')}</span>
            <h2>{title}</h2>
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {note.example?.afterSection === i + 1 && (
              <aside className="article-example" aria-labelledby="article-example-title">
                <h3 id="article-example-title">{note.example.title}</h3>
                <p className="example-disclosure">{note.example.disclosure}</p>
                <dl>
                  <div><dt>고객 문의</dt><dd>{note.example.question}</dd></div>
                  <div><dt>수정 전</dt><dd>{note.example.before}</dd></div>
                  <div className="example-after"><dt>수정 후</dt><dd><strong>본문에 보관 방법 추가</strong>{note.example.after.map((line) => <span key={line}>{line}</span>)}</dd></div>
                </dl>
                <p className="example-note">{note.example.note}</p>
              </aside>
            )}
          </section>
        ))}
        {note.source && <p className="source-note">함께 참고할 자료: <a href={note.source.href} target="_blank" rel="noopener noreferrer">{note.source.label}</a></p>}
        <div className="article-next">
          <p>실제 작업과 진행 안내도 함께 확인해보세요.</p>
          <a className="text-link" href={related}>{label}<ArrowRight size={18} /></a>
        </div>
      </article>
    </main>
  );
}
