"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

/**
 * Document offset of a section, ignoring the sticky/scale state of the
 * stacked cards (a stuck card reports its stuck position, not its real one).
 */
function naturalTop(el: HTMLElement) {
  const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-stack]"));
  const saved = cards.map((c) => [c.style.position, c.style.transform] as const);
  cards.forEach((c) => {
    c.style.position = "static";
    c.style.transform = "none";
  });
  const top = el.getBoundingClientRect().top + window.scrollY;
  cards.forEach((c, i) => {
    c.style.position = saved[i][0];
    c.style.transform = saved[i][1];
  });
  return top;
}

/** Scrolls to `#id` on the current page through Lenis. Returns false if absent. */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const top = naturalTop(el);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (lenis) lenis.scrollTo(top, { immediate: reduce });
      else window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      return true;
    },
    [lenis]
  );
}
