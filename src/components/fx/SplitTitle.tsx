"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Line = { text: string; className?: string };

type Props = {
  /** One entry per visual line. */
  lines: (string | Line)[];
  className?: string;
  style?: CSSProperties;
  as?: "h2" | "h3";
};

/**
 * Section title revealed word by word (mask + translateY 110% / rotate 6° → 0,
 * 90ms stagger) when it enters the viewport. Static under reduced motion (CSS).
 */
export default function SplitTitle({ lines, className = "", style, as: Tag = "h2" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let i = 0;
  const normalized = lines.map((l) => (typeof l === "string" ? { text: l } : l));

  return (
    <Tag ref={ref} className={`split-title ${className}`} style={style}>
      {normalized.map((line, li) => (
        <span key={li} className={line.className}>
          {li > 0 && <br />}
          {line.text.split(/\s+/).map((word, wi) => (
            <span key={wi}>
              {wi > 0 && " "}
              <span className="split-mask">
                <span className="split-unit" style={{ "--i": i++ } as CSSProperties}>
                  {word}
                </span>
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
