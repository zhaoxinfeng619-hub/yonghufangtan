import type { Metadata } from "next";
import DriftWall from "./DriftWall";
import NeedsSection from "./NeedsSection";
import InterviewFragments from "./InterviewFragments";
import ArchiveGallery from "./ArchiveGallery";
import GooeyNav from "./GooeyNav";
import InterviewVideo from "./InterviewVideo";

export const metadata: Metadata = { title: "AI 销售工作台｜用户访谈成果", description: "线上保险销售 AI 工作台 0-1 项目的用户访谈展示。" };

const nav = [{ href: "#overview", label: "项目概述" },{ href: "#persona", label: "用户的一天" },{ href: "#journey", label: "销售流程" },{ href: "#findings", label: "核心问题" },{ href: "#needs", label: "需求定义" },{ href: "#demo", label: "方案 Demo" },{ href: "#archive", label: "访谈整理" }];
const wallImages = ["assets/interview-01.png","assets/interview-02.png","assets/interview-03.png","assets/interview-04.png","assets/interview-05.png","assets/interview-06.png"];
const driftItems = wallImages.map((image, index) => ({ image, title: `访谈现场 ${String(index + 1).padStart(2, "0")}` }));
const steps = [["01","发内容获客","小红书图文 / 抖音视频"],["02","客户互动","私信、评论或主动触达"],["03","破冰闲聊","先聊热点和生活，再引出保险"],["04","了解需求","购买对象、预算、缴费年限"],["05","转到企微","留下联系方式，进入私域"],["06","方案沟通","推荐方案、回答疑问、制作计划书"],["07","推进成交","电话沟通、指导投保"],["08","长期维护","回访、复购和转介绍"]];
const pains = [["01","内容生产耗时","每天想选题、写文案、做图片；一条小红书通常要花 30–60 分钟。"],["02","多平台难管理","多个账号、多部手机频繁切换，爆帖时很容易来不及回复。"],["03","精准客户难判断","看得到访问和互动，却很难判断谁真正有兴趣。"],["04","线上信任难建立","客户见不到销售，不能一上来就讲保险。"],["05","客户信息易丢失","客户过一段时间回来，还要重新翻聊天记录。"],["06","合规边界不清晰","条款会变化，平台规则复杂，主要靠个人经验判断。"]];
function Label({n,children}:{n:string;children:React.ReactNode}){
  const labels: Record<string, string> = { "项目概览": "项目概述", "用户画像": "用户的一天", "访谈发现": "核心问题", "需求方向": "需求定义", "原始资料": "访谈整理" };
  const text = typeof children === "string" ? labels[children] ?? children : children;
  return <p className="label"><span>{n}</span>{text}</p>
}
export default function Home(){return <main>
<header className="nav"><GooeyNav items={nav} particleCount={15} particleDistances={[90,10]} particleR={100} initialActiveIndex={0} animationTime={600} timeVariance={300} colors={[1,2,3,1,2,3,1,4]} /><small>用户访谈 · 2026.08</small></header>
<section id="overview" className="hero"><div className="hero-drift"><DriftWall items={driftItems} columns={6} tileWidth={280} tileHeight={180} gap={22} tilt={12} turn={-10} perspective={1300} depth={120} speed={84} direction="up" variance={0.45} parallax={0.6} lift={54} fade={0.6} dim={0.72} overlayColor="#060010" /></div><div className="hero-copy"><Label n="0—1">用户研究档案 / 线上保险销售</Label><h1>AI销售<br/><i>用户访谈</i></h1></div><div className="hero-stats"><div><b>7</b><span>位访谈对象</span></div><div><b>80</b><span>分钟访谈</span></div><div><b>3</b><span>条完整链路</span></div></div></section>
<section className="overview-info"><div className="overview-video"><Label n="项目概述">访谈现场</Label><InterviewVideo /></div><div className="overview-details"><div className="detail-item"><span>项目名称</span><strong>AI 辅助保险销售工作台</strong><small>线上保险销售全链路提效项目</small></div><div className="detail-item"><span>访谈信息</span><strong>2026 年 8 月 30 日</strong><small>7 位访谈对象 · 80 分钟访谈</small></div><div className="detail-item content-item"><span>访谈内容</span><strong>沿着客户从内容到成交的路径，寻找AI真正能帮上忙的地方。</strong></div><div className="detail-item"><span>访谈对象</span><strong>线上保险销售（KOS）</strong><small>围绕内容获客、私域引流与成交转化展开</small></div><div className="detail-item product-item"><span>主营产品</span><strong>太平洋保险「蛮好人生」年金险</strong><small>寿险 · 面向养老金规划场景</small></div></div></section>
<section id="persona" className="dark section"><Label n="01">用户的一天</Label><div className="user-day-video"><video controls playsInline preload="metadata" poster="assets/user-day-poster.jpg" aria-label="小安的一天视频"><source src="assets/user-day-latest.mp4" type="video/mp4" />你的浏览器暂不支持视频播放。</video></div></section>
<section id="journey" className="section"><Label n="02">销售流程</Label><img className="journey-map" src="assets/sales-journey-map.png" alt="销售链路用户地图：从内容获客、建立关系、需求转化，到成交与持续跟进" /></section>
<section id="findings" className="paper section"><Label n="03">访谈发现</Label><div className="heading"><h2>问题不在某一个点，<br/><em>而在整条链路。</em></h2><p>时间不够、客户难找、信任难建、信息难记，以及对平台规则和 AI 的不确定，是访谈中反复出现的关键词。</p></div><div className="pain-grid">{pains.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div><InterviewFragments /></section>
<NeedsSection />
<section id="demo" className="demo-section section"><Label n="05">方案 Demo</Label><div className="demo-heading"><h2>从访谈洞察，<br/><em>走向可体验的方案。</em></h2><p>这里会持续收录基于访谈洞察构建的方案原型。</p></div><div className="demo-grid"><a className="demo-card" href="https://cain0624.github.io/taiping-sdr-workbench/" target="_blank" rel="noreferrer"><span className="demo-icon">AI</span><span className="demo-card-copy"><b>太平洋 SDR 工作台</b><small>销售辅助方案 Demo</small></span><span className="demo-arrow">↗</span></a></div></section>
<section id="principles" className="section"><Label n="05">AI 边界</Label><div className="principle"><h2>AI 负责提效，<br/><em>人负责判断、信任与成交。</em></h2><p>销售并不想把全部工作交给机器。理想的 AI 助理应该负责准备工作，在关键节点把主动权交还给销售。</p></div><div className="boundary"><article><h3>AI 可以辅助</h3><p>文案初稿、热点整理、客户摘要、意向建议、常见问题回答、视频剪辑。</p></article><article><h3>必须由人负责</h3><p>建立信任、复杂需求判断、最终产品推荐、收益解释、合规审核和成交推进。</p></article></div></section>
<section id="archive" className="archive"><Label n="06">原始资料</Label><ArchiveGallery /></section>
</main>}
