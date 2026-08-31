"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const handler = () => setIsFinePointer(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const onMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Hover detection on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [role='button'], input, select, textarea, [data-cursor]")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    // Smooth Lerp Physics
    const animate = () => {
      pos.current.x += (targetPos.current.x - pos.current.x) * 0.18;
      pos.current.y += (targetPos.current.y - pos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(raf.current);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] mix-blend-difference will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
    >
      <div
        className={`flex items-center justify-center rounded-full border border-white bg-white/10 backdrop-blur-[1px] transition-all duration-200 ease-out select-none ${
          isHovering
            ? "w-12 h-12 bg-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            : isClicking
            ? "w-8 h-8 scale-90"
            : "w-9 h-9 scale-100"
        }`}
      >
        {/* Symbole de dev </> visible en permanence grâce au mix-blend-difference */}
        <span
          className={`font-mono font-black tracking-tighter leading-none transition-all duration-150 ${
            isHovering
              ? "text-black text-xs scale-110"
              : "text-white text-[11px]"
          }`}
        >
          &lt;/&gt;
        </span>
      </div>
    </div>
  );
}
