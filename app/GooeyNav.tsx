"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import "./gooey-nav.css";

export type GooeyNavItem = { label: string; href: string };

type GooeyNavProps = {
  items: GooeyNavItem[];
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  initialActiveIndex?: number;
  animationTime?: number;
  timeVariance?: number;
  colors?: number[];
};

export default function GooeyNav({
  items,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  initialActiveIndex = 0,
  animationTime = 600,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
}: GooeyNavProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    const syncFromHash = () => {
      const index = items.findIndex(({ href }) => href === window.location.hash);
      if (index >= 0) setActiveIndex(index);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [items]);

  const particles = useMemo(() => Array.from({ length: particleCount }, (_, index) => {
    const angle = (index / particleCount) * Math.PI * 2;
    const distance = particleDistances[1] + ((index * 37) % Math.max(1, particleDistances[0] - particleDistances[1]));
    return {
      id: `${burst}-${index}`,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 5 + ((index * 11) % 10),
      delay: (index * 41) % timeVariance,
      color: colors[index % colors.length],
    };
  }), [burst, colors, particleCount, particleDistances, timeVariance]);

  return (
    <nav className="gooey-nav" aria-label="页面导航" style={{
      "--gooey-duration": `${animationTime}ms`,
      "--gooey-radius": `${particleR}px`,
      "--gooey-origin-x": `${((activeIndex + 0.5) / items.length) * 100}%`,
      "--gooey-item-width": `${100 / items.length}%`,
      "--gooey-count": items.length,
    } as CSSProperties}>
      <div className="gooey-nav__surface">
        <div className="gooey-nav__liquid" aria-hidden="true">
          <span className="gooey-nav__orb" style={{ left: `calc(${(activeIndex / items.length) * 100}% + 4px)` }} />
          {particles.map((particle) => (
            <i className={`gooey-nav__particle tone-${particle.color}`} key={particle.id} style={{
              "--particle-x": `${particle.x}px`, "--particle-y": `${particle.y}px`,
              "--particle-size": `${particle.size}px`, "--particle-delay": `${particle.delay}ms`,
            } as CSSProperties} />
          ))}
        </div>
        <div className="gooey-nav__items">
          {items.map((item, index) => (
            <a className={index === activeIndex ? "is-active" : ""} href={item.href} key={item.href} onClick={() => {
              if (index !== activeIndex) { setActiveIndex(index); setBurst((value) => value + 1); }
            }}>{item.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
