"use client";

import { useMemo, useState } from "react";
import "./DriftWall.css";
import "./drift-overrides.css";

export type DriftItem = { image?: string; title?: string; href?: string };
type Props = {
  items?: DriftItem[]; columns?: number; tileWidth?: number; tileHeight?: number; gap?: number;
  radius?: number; tilt?: number; turn?: number; roll?: number; perspective?: number;
  depth?: number; speed?: number; direction?: "up" | "down"; variance?: number;
  parallax?: number; pauseOnHover?: boolean; lift?: number; fade?: number; dim?: number;
  grayscale?: boolean; overlayColor?: string;
};

const fallback = Array.from({ length: 15 }, (_, i) => ({ title: `图片 ${String(i + 1).padStart(2, "0")}` }));

export default function DriftWall({
  items = fallback, columns = 5, tileWidth = 200, tileHeight = 132, gap = 18,
  radius = 14, tilt = 16, turn = -14, roll = 0, perspective = 1200, depth = 120,
  speed = 42, direction = "up", variance = 0.45, parallax = 0.6, pauseOnHover = false,
  lift = 64, fade = 0.6, dim = 0.55, grayscale = false, overlayColor = "#060010",
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const columnItems = useMemo(() => {
    const count = Math.max(1, columns);
    // Reuse the full set in each column, with a different offset, so a small
    // set of interview photos can still fill the entire viewport.
    return Array.from({ length: count }, (_, column) =>
      items.length ? items.map((_, index) => items[(index + column) % items.length]) : []);
  }, [items, columns]);
  const style = {
    "--tile-width": `${tileWidth}px`, "--tile-height": `${tileHeight}px`, "--gap": `${gap}px`,
    "--radius": `${radius}px`, "--tilt": `${tilt}deg`, "--turn": `${turn}deg`, "--roll": `${roll}deg`,
    "--perspective": `${perspective}px`, "--depth": `${depth}px`, "--lift": `${lift}px`,
    "--fade": fade, "--dim": dim, "--overlay": overlayColor, "--parallax": parallax,
  } as React.CSSProperties;
  return <div className={`drift-wall ${grayscale ? "is-grayscale" : ""} ${hovered ? "is-hovered" : ""}`} style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <div className="drift-columns" style={{ gap: `${gap}px` }}>
      {columnItems.map((column, index) => {
        const factor = 1 + variance * ((((index * 0.6180339887 + 0.35) % 1) * 2) - 1);
        const duration = Math.max(7, (tileHeight + gap) * Math.max(3, column.length) / Math.max(8, speed * factor));
        const reverse = (direction === "up" ? index % 2 === 1 : index % 2 === 0);
        const stack = [...column, ...column];
        return <div className="drift-column" key={index} style={{ "--duration": `${duration}s`, "--delay": `${index * -0.7}s`, "--items": column.length } as React.CSSProperties}>
          <div className={`drift-stack ${reverse ? "reverse" : ""}`} style={{ animationDirection: reverse ? "reverse" : "normal" }}>
            {stack.map((item, tileIndex) => {
              const tileKey = `${index}-${tileIndex}`;
              const tile = <div className={`drift-tile ${activeTile === tileKey ? "is-active" : ""}`} key={tileKey} onPointerEnter={() => setActiveTile(tileKey)} onPointerLeave={() => setActiveTile(null)} style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}><div className="drift-overlay"/><span>{item.title ?? "图片待补充"}</span></div>;
              return item.href ? <a href={item.href} key={`${index}-link-${tileIndex}`}>{tile}</a> : tile;
            })}
          </div>
        </div>;
      })}
    </div>
    <div className="drift-edge drift-edge-top"/><div className="drift-edge drift-edge-bottom"/>
    {pauseOnHover && hovered && <span className="drift-paused">已暂停</span>}
  </div>;
}
