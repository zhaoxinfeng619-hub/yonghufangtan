"use client";

import { useEffect, useRef, useState } from "react";
import "./interview-fragments.css";

type Fragment = {
  id: string;
  tag: string;
  title: string;
  quote: string;
  audio: string;
  dialogue: { speaker: string; text: string }[];
  pain: string;
};

const fragments: Fragment[] = [
  {
    id: "01",
    tag: "公域获客",
    title: "转化率低，客户流失原因不清楚",
    quote: "从内容浏览、私信咨询到添加企微，每一步都在流失。",
    audio: "/assets/fragment-01.mp3",
    dialogue: [
      { speaker: "访谈人", text: "你在这些平台发内容，一周大概能收到多少私信？又能加到多少个企业微信好友？" },
      { speaker: "被访谈人", text: "帖子差不多有四五千次浏览，可能才会有一个能继续聊下去的客户。很多人我给他说话，他也不回复。我不知道是他本来不想回复，还是因为我回复得比较慢。" },
      { speaker: "访谈人", text: "大概多少条私信可以加到一个好友？" },
      { speaker: "被访谈人", text: "可能要三五十条私信，差不多才能加到一个好友。有些人只是了解一下，有些是我主动联系但他不理我，还有些聊着聊着就没有下文了。" },
      { speaker: "被访谈人", text: "我们主要是在企业微信里成交，所以首先要把客户加到私域。加到企业微信以后，又会流失一批，最终成交的确实比较少。" },
    ],
    pain: "从内容浏览、私信咨询、添加企微到最终成交，每个环节都存在大量流失；销售缺少数据分析能力，无法判断客户为什么流失，也无法确认是否因为回复不及时造成损失。",
  },
  {
    id: "02",
    tag: "销售能力",
    title: "经验依赖个人，优秀话术难复制",
    quote: "我拿捏不准客户的心理，也不知道他到底在想什么。",
    audio: "/assets/fragment-02.mp3",
    dialogue: [
      { speaker: "访谈人", text: "你觉得领导做得比你好，具体好在哪里？" },
      { speaker: "被访谈人", text: "我觉得他说话和表达的方式比我好。而且他跟客户聊一段时间以后，就能判断这个客户能不能成交，经验比我丰富。" },
      { speaker: "被访谈人", text: "有时候我去找他问问题，他也比较忙。其他比较厉害的销售严格来说和我也是竞争对手，人家也不一定会告诉我。" },
      { speaker: "访谈人", text: "如果你的销售话术能够和领导说得一样好，你觉得转化率会提升吗？" },
      { speaker: "被访谈人", text: "那肯定会提升。我现在对于一些客户，确实拿捏不准他的心理，也不知道他到底在想什么。" },
    ],
    pain: "客户意向判断和销售话术高度依赖个人经验。新人难以快速学习优秀销售的能力，管理者没有时间持续辅导，优秀经验又难以沉淀和复制。",
  },
  {
    id: "03",
    tag: "内容生产",
    title: "通用 AI 生成内容，仍需手动修改",
    quote: "能不能直接一次写出一篇我可以使用的内容？",
    audio: "/assets/fragment-03.mp3",
    dialogue: [
      { speaker: "访谈人", text: "除了豆包以外，你平常还会使用其他 AI 工具吗？" },
      { speaker: "被访谈人", text: "不会，现在就使用豆包。" },
      { speaker: "访谈人", text: "豆包帮助你解决的最大问题是什么？又有哪些地方没有解决好？" },
      { speaker: "被访谈人", text: "主要就是帮我写稿。但是不好用的地方，就是它写得不够好，最后还是需要我自己手动修改。" },
      { speaker: "被访谈人", text: "我希望它能不能直接一次写出一篇我可以使用的内容，这样不用再修改，生成以后就可以直接发布。" },
    ],
    pain: "通用 AI 虽然能够生成文案，但生成结果质量不稳定，仍需要销售人员大量人工修改，没有真正解决内容生产效率问题。",
  },
];

export default function InterviewFragments() {
  const [active, setActive] = useState<Fragment | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  useEffect(() => {
    if (audioRef.current && active) {
      audioRef.current.load();
    }
  }, [active]);

  return (
    <>
      <div className="fragment-grid" aria-label="三个核心问题片段">
        {fragments.map((fragment) => (
          <button className="fragment-card" type="button" key={fragment.id} onClick={() => setActive(fragment)}>
            <span className="fragment-number">{fragment.id}</span>
            <span className="fragment-tag">{fragment.tag}</span>
            <strong>{fragment.title}</strong>
            <span className="fragment-quote">“{fragment.quote}”</span>
            <span className="fragment-open">查看对话与痛点 <span>↗</span></span>
          </button>
        ))}
      </div>

      {active && (
        <div className="fragment-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setActive(null); }}>
          <section className="fragment-modal" role="dialog" aria-modal="true" aria-labelledby="fragment-modal-title">
            <header className="fragment-modal-header">
              <div>
                <p className="label"><span>片段 {active.id}</span>{active.tag}</p>
                <h2 id="fragment-modal-title">{active.title}</h2>
              </div>
              <button className="fragment-close" type="button" aria-label="关闭弹窗" onClick={() => setActive(null)}>×</button>
            </header>
            <div className="fragment-player">
              <span>播放访谈录音</span>
              <audio ref={audioRef} controls preload="metadata" src={active.audio} />
            </div>
            <div className="fragment-modal-body">
              <div className="fragment-dialogue">
                <p className="fragment-section-label">对话记录</p>
                {active.dialogue.map((line, index) => (
                  <div className={`dialogue-line ${line.speaker === "被访谈人" ? "interviewee" : "interviewer"}`} key={`${line.speaker}-${index}`}>
                    <span>{line.speaker}</span><p>{line.text}</p>
                  </div>
                ))}
              </div>
              <aside className="fragment-pain">
                <p className="fragment-section-label">核心痛点</p>
                <p>{active.pain}</p>
              </aside>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
