"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  // No smoothed wheel scrolling under reduced motion
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: !reduce }}>
      {children}
    </ReactLenis>
  );
}
