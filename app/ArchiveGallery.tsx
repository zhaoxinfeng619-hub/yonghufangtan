"use client";

import { useEffect, useState } from "react";
import "./archive-gallery.css";

const images = [
  { src: "/assets/VIjZHAKo.png", type: "PNG", title: "项目筹备会背景图" },
  { src: "/assets/9cfeaf3426a6e485b57dba2b5571baca.jpg", type: "JPG", title: "资料归档说明图" },
];

export default function ArchiveGallery() {
  const [active, setActive] = useState<(typeof images)[number] | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="archive-row">
        {images.map((image) => (
          <button className="archive-card" type="button" key={image.src} onClick={() => setActive(image)}>
            <b>{image.type}</b>
            <strong>{image.title}</strong>
            <span>查看图片 <i>↗</i></span>
          </button>
        ))}
        <a className="archive-card archive-document-card" href="/assets/AI-sales-workbench-user-interviews.pdf" target="_blank" rel="noreferrer">
          <b>PDF</b>
          <strong>AI 销售工作台项目·用户访谈</strong>
          <span>打开访谈文档 <i>↗</i></span>
        </a>
        <div><b>MP3</b><strong>访谈录音（3 份）</strong><span>原始入口 · 未解析</span></div>
      </div>

      {active && (
        <div className="archive-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setActive(null); }}>
          <section className="archive-modal" role="dialog" aria-modal="true" aria-labelledby="archive-modal-title">
            <header className="archive-modal-header">
              <div><p className="label"><span>{active.type}</span>访谈整理</p><h2 id="archive-modal-title">{active.title}</h2></div>
              <button className="archive-close" type="button" onClick={() => setActive(null)} aria-label="关闭图片预览">×</button>
            </header>
            <div className="archive-image-wrap"><img src={active.src} alt={active.title} /></div>
          </section>
        </div>
      )}
    </>
  );
}
