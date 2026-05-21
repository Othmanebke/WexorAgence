"use client";

import { useEffect, useRef, useState } from "react";


export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isFinePinter, setIsFinePointer] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const els = document.querySelectorAll("a, button, [data-cursor]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
          setIsHovering(true);
          const target = e.currentTarget as HTMLElement;
          if (target && target.getAttribute("data-cursor")) {
            setCursorText(target.getAttribute("data-cursor") || "");
          }
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });
    };
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Lerp follow
    let lx = -100, ly = -100;
    const animate = () => {
      lx += (pos.current.x - lx) * 0.12;
      ly += (pos.current.y - ly) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${lx - 20}px, ${ly - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  if (!isFinePinter) return null;

  return (
    <>
      {/* Big ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[99999] mix-blend-difference transition-all duration-100"
        style={{ willChange: "transform" }}
      >
        <div
          className={`w-full h-full rounded-full border-2 border-white transition-all duration-200 flex items-center justify-center
            ${isHovering ? (cursorText ? "scale-[4] opacity-100 bg-white" : "scale-[3] opacity-60") : "scale-100 opacity-100"} 
            ${isClicking ? "scale-50" : ""}`}
        >
          {cursorText && (
            <span className="text-black font-bold text-[6px] uppercase tracking-widest scale-50 opacity-100">
              {cursorText}
            </span>
          )}
        </div>
      </div>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[99999] mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>
    </>
  );
}
