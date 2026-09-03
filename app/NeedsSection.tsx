"use client";
import { useEffect, useState } from "react";
import "./needs-scroll.css";
import "./needs-pseudo.css";

type PseudoNeed = {
  title: string;
  category: string;
  priority: string;
  rationale: string;
};

const needs = [
  { title: "获客", summary: "自动发现并筛选更有价值的线索", detail: "从竞品内容、公开信息和互动行为中，找到更值得继续沟通的客户。", items: ["自动监控竞品账号内容及评论区，挖掘潜在客户线索", "客户信息一键发起企微好友添加申请"] },
  { title: "内容", summary: "生成更像人、更接近可发布的营销内容", detail: "围绕热点、产品卖点和平台规则，减少从选题到发布的反复修改。", items: ["热点追踪+结合产品卖点一键生成多版本营销文案", "参考爆款文案进行AI仿写、润色、降重", "文案自动匹配生成配图/封面图，规避AI感过强", "文案自动转口播稿，拍摄后一键剪辑成片", "自动统计内容浏览量/互动率/转化数据，给出优化建议", "展示从浏览到成交各环节转化漏斗，定位流失环节", "营销内容合规检测（承诺收益/误导宣传等），自动提示风险", "平台限流规则检测（AI感/敏感词/硬广等），给出修改建议"] },
  { title: "沟通", summary: "让每次回复都有依据，也保留销售判断", detail: "把开场、跟进、话术和多渠道会话集中到一个工作台。", items: ["根据客户提问自动推荐场景化应答话术", "沉淀销冠话术与经验，形成可检索的话术知识库", "多渠道多账号统一会话管理", "AI托管回复、人工随时接管"] },
  { title: "客户管理", summary: "沉淀客户上下文，持续推进每一次跟进", detail: "从线索识别、分层打标到沉默提醒，让客户信息不再丢失。", items: ["公域评论/私信/访问记录自动发送差异化开场白，支持批量执行", "基于客户互动行为自动识别高意向客户并打标", "结合客户公开信息自动生成画像，过滤低质线索", "自动提醒跟进沉默/犹豫期客户，支持设置待办任务", "聚合多渠道客户互动记录，自动归档关键信息，支持检索", "客户分层标签体系，支持按标签筛选批量运营", "定期提醒老客户节日关怀，支持批量生成问候内容"] },
  { title: "产品支持", summary: "让产品知识和个性化方案随时可用", detail: "把条款、收益、规则和销售经验放到客户沟通的关键节点。", items: ["产品条款/收益/规则知识库，随官方变更自动同步更新", "根据客户信息自动生成个性化利益演示计划书", "合规风控管理（AI话术审核、敏感词禁用词库）", "保险业务中心（保险产品与条款、计划书生成、保障需求评估）"] },
  { title: "人设经营", summary: "保持专业，也表达真实生活", detail: "让个人表达成为建立线上信任的一部分。", items: ["提供人设定位建议，自动生成朋友圈及小红书日常素材"] },
];

const pseudoNeeds: PseudoNeed[] = [
  { title: "帮我自动筛掉低质量客户", category: "客户管理", priority: "P1", rationale: "意向评分和跟进优先级" },
  { title: "AI帮我自动回复客户", category: "沟通", priority: "P1", rationale: "AI辅助销售，而不是AI替代销售" },
  { title: "我要自动加企微", category: "沟通", priority: "P1", rationale: "公域客户转私域的操作太繁琐，希望降低承接成本" },
];

export default function NeedsSection() {
  const [selected, setSelected] = useState<(typeof needs)[number] | null>(null);
  const [selectedPseudo, setSelectedPseudo] = useState<PseudoNeed | null>(null);
  const closeModal = () => { setSelected(null); setSelectedPseudo(null); };
  const modalOpen = Boolean(selected || selectedPseudo);
  useEffect(() => { if (!modalOpen) return; const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal(); const old = document.body.style.overflow; document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKey); return () => { document.body.style.overflow = old; window.removeEventListener("keydown", onKey); }; }, [modalOpen]);
  return <section id="needs" className="needs-section dark section"><div className="needs-heading"><p className="label"><span>04</span>需求定义</p><div className="heading"><h2>从“想要 AI”<br /><em>到具体需要什么。</em></h2></div></div><div className="needs-card-grid" aria-label="需求定义板块">{needs.map((need, index) => <button className="needs-category-card" key={need.title} onClick={() => { setSelected(need); setSelectedPseudo(null); }}><span>0{index + 1}</span><h3>{need.title}</h3><p>{need.summary}</p><i>查看需求清单 ↗</i></button>)}</div><div className="pseudo-needs" aria-label="伪需求列表"><div className="pseudo-needs__heading"><p className="label"><span>补充判断</span>伪需求</p><p>这些表达听起来像功能诉求，但需要转译为更符合销售工作方式的支持。</p></div><div className="pseudo-needs__grid">{pseudoNeeds.map((pseudo, index) => <button className="pseudo-need-card" key={pseudo.title} onClick={() => { setSelectedPseudo(pseudo); setSelected(null); }}><div className="pseudo-need-card__meta"><span>0{index + 1}</span><b>{pseudo.category}</b><em>{pseudo.priority}</em></div><h3>{pseudo.title}</h3><p>{pseudo.rationale}</p><i>查看判断 ↗</i></button>)}</div></div>{modalOpen && <div className="needs-modal" role="presentation" onClick={closeModal}><div className="needs-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="needs-modal-title" onClick={(e) => e.stopPropagation()}><button className="needs-modal__close" aria-label="关闭需求清单" onClick={closeModal}>×</button>{selected ? <><p className="label"><span>需求清单</span>04 / {selected.title}</p><h3 id="needs-modal-title">{selected.title}</h3><p className="needs-modal__intro">{selected.detail}</p><ol>{selected.items.map((item) => <li key={item}>{item}</li>)}</ol></> : selectedPseudo ? <><p className="label"><span>伪需求</span>{selectedPseudo.category} / {selectedPseudo.priority}</p><h3 id="needs-modal-title">{selectedPseudo.title}</h3><p className="needs-modal__intro">这是一条需要进一步拆解的功能表达，优先级为 {selectedPseudo.priority}。</p><div className="pseudo-modal-rationale"><span>背后真正要解决的是</span><strong>{selectedPseudo.rationale}</strong></div></> : null}</div></div>}</section>;
}
