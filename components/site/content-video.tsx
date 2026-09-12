"use client";

import { useEffect, useRef, useState } from "react";

export function ContentVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setAutoPlay(!preference.matches);
      if (preference.matches) ref.current?.pause();
      else ref.current?.play().catch(() => {});
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  return <video ref={ref} className="content-video" controls autoPlay={autoPlay} muted loop playsInline preload="metadata" poster="/images/content-poster.png" width="1080" height="1920" aria-label="써둔 원고로 만든 약 25초 세로 영상">
    <source src="/videos/content-workflow.mp4" type="video/mp4"/>
    <track kind="captions" src="/videos/content-workflow.ko.vtt" srcLang="ko" label="한국어"/>
    <p>영상을 재생할 수 없다면 <a href="/videos/content-workflow.mp4">영상 파일을 열어보세요.</a></p>
  </video>;
}
