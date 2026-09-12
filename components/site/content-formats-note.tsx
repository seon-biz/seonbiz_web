import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const scenes = [
  { src: '/images/content-poster.png', caption: '0:00 · 첫 장면, 질문 제시', alt: '실제 영상 첫 장면: HTML 변환, 주력 상품부터?' },
  { src: '/images/content-scene.png', caption: '0:07 · 설명 장면, 적용 조건', alt: '실제 영상 설명 장면: 단종 예정과 장기 품절 상품 제외' },
];

const checks = [
  '글자가 배경에 묻히지 않는가',
  '자막이 읽기 전에 넘어가지 않는가',
  '원고의 중요한 조건이 빠지지 않았는가',
  '설명글과 연결 주소가 맞는가',
];

export function ContentFormatsPreview() {
  return (
    <aside className="note-content-preview" aria-labelledby="note-content-preview-title">
      <p className="note-preview-label">세온비즈 자체 제작</p>
      <h3 id="note-content-preview-title">실제로 이렇게 만들었습니다</h3>
      <div className="note-preview-scenes">
        {scenes.map((scene) => (
          <figure key={scene.src}>
            <a href={scene.src} target="_blank" rel="noopener noreferrer" aria-label={scene.caption + ' 원본 크게 보기 (새 탭)'}>
              <img src={scene.src} width="1080" height="1920" alt={scene.alt} loading="lazy" />
            </a>
            <figcaption>{scene.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p>‘상세페이지 HTML 변환을 어떤 상품부터 시작할까?’라는 원고를 약 25초 영상으로 만들었습니다. 첫 장면에 질문을 넣고, 다음 장면부터 조건을 하나씩 설명했습니다.</p>
      <p>글자와 화면을 중심으로 만든 6개 장면입니다. 제작 사례에서 원본 영상과 같은 원고로 만든 카드뉴스도 함께 볼 수 있습니다.</p>
      <a className="text-link" href="/cases/content-workflow">제작 과정 자세히 보기 <ArrowUpRight size={18} aria-hidden="true" /></a>
    </aside>
  );
}

export function ContentFormatsChecklist() {
  return (
    <>
      <fieldset className="note-publish-checklist">
        <legend>올리기 전 확인할 네 가지</legend>
        <div>
          {checks.map((check, i) => (
            <label key={check} htmlFor={'content-publish-check-' + i}>
              <Checkbox id={'content-publish-check-' + i} className="note-publish-checkbox" />
              <span>{check}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p>카드뉴스는 첫 장부터 넘겨보고, 영상은 소리를 끈 상태에서도 재생해보세요. 가격·규격·이용 조건은 원고와 실제 자료를 대조합니다. 연결 주소는 직접 눌러 원하는 페이지가 열리는지 확인합니다.</p>
      <p>만드는 과정은 도구가 대신할 수 있지만, 올릴지 말지는 직접 보고 정합니다. 틀린 조건이나 없던 내용이 섞였다면 먼저 고칩니다. 발행할 최종 파일을 다시 확인한 뒤 올리세요.</p>
    </>
  );
}

export function ContentFormatsCoachingLinks() {
  return (
    <div className="note-coaching-links">
      <p>대표님의 상품 설명이나 현장 사진으로 직접 만들어보고 싶다면 업종에 맞는 코칭을 살펴보세요.</p>
      <div>
        <a className="text-link" href="/coaching/shop">쇼핑몰 콘텐츠 코칭 <ArrowRight size={18} aria-hidden="true" /></a>
        <a className="text-link" href="/coaching/service">서비스업 콘텐츠 코칭 <ArrowRight size={18} aria-hidden="true" /></a>
      </div>
    </div>
  );
}
