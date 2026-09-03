"use client";

import { useEffect, useRef, useState } from "react";
import "./interview-video.css";

const clips = [
  { label: "上", title: "访谈现场 · 01", src: "assets/overview-interview-1.mp4" },
  { label: "中", title: "访谈现场 · 02", src: "assets/overview-interview-2.mp4" },
  { label: "下", title: "访谈现场 · 03", src: "assets/overview-interview-3.mp4" },
];

export default function InterviewVideo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = clips[activeIndex];

  useEffect(() => {
    videoRef.current?.load();
  }, [activeIndex]);

  const setClip = (index: number) => setActiveIndex(Math.max(0, Math.min(clips.length - 1, index)));

  return (
    <div className="interview-video-player">
      <video ref={videoRef} controls playsInline preload="metadata" poster="assets/overview-interview-poster.jpg" aria-label={`${active.title}视频`}>
        <source src={active.src} type="video/mp4" />
        你的浏览器暂不支持视频播放。
      </video>
      <div className="interview-video-controls">
        <div className="interview-video-segments" role="tablist" aria-label="访谈视频片段">
          {clips.map((clip, index) => (
            <button key={clip.src} type="button" role="tab" aria-selected={activeIndex === index} className={activeIndex === index ? "is-active" : ""} onClick={() => setClip(index)}>
              <span>{clip.label}</span>{clip.title}
            </button>
          ))}
        </div>
        <div className="interview-video-next">
          <span>片段 {String(activeIndex + 1).padStart(2, "0")} / 03</span>
          <button type="button" onClick={() => setClip(activeIndex - 1)} disabled={activeIndex === 0} aria-label="上一段">←</button>
          <button type="button" onClick={() => setClip(activeIndex + 1)} disabled={activeIndex === clips.length - 1} aria-label="下一段">下一段&nbsp;↗</button>
        </div>
      </div>
    </div>
  );
}
