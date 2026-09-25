"use client";

import { useEffect, useState } from "react";

/** Delay after which the hero intro starts (the curtain is rising by then). */
export const LOADER_INTRO_DELAY = 2700;
const LOADER_UNMOUNT = 3700;

/**
 * "BONJOUR" loader: the outline is drawn (0 → 1.4s), the stroke is erased in
 * the same direction (1.6 → 2.6s), then the curtain rises (2.5s). Hidden by CSS and unmounted under reduced motion.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setVisible(false), reduce ? 0 : LOADER_UNMOUNT);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="preloader fixed inset-0 z-[300] flex items-center justify-center bg-abcs-black"
      style={{ animation: "loader-up 1s cubic-bezier(.76,0,.24,1) 2.5s forwards" }}
    >
      <svg viewBox="0 0 1000 230" className="w-[min(86vw,860px)] overflow-visible">
        <text
          x="500"
          y="180"
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-archivo), system-ui, sans-serif",
            fontSize: 210,
            letterSpacing: -8,
            textTransform: "uppercase",
            fill: "none",
            stroke: "#FF3B00",
            strokeWidth: 2.5,
            strokeDasharray: 1600,
            strokeDashoffset: 1600,
            animation:
              "loader-draw 1.4s cubic-bezier(.65,0,.35,1) forwards, loader-undraw 1s cubic-bezier(.65,0,.35,1) 1.6s forwards",
          }}
        >
          BONJOUR
        </text>
      </svg>
    </div>
  );
}
