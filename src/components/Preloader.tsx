"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800; // 1.8 seconds loading experience
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 300); // 300ms dramatic pause once full
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-end bg-abcs-black text-white"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Noise overlay for texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Minimalist ambient grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Bottom Left: Welcome Message, Counter & Loading Bar */}
          <div className="absolute bottom-10 left-6 md:bottom-16 md:left-16 flex flex-col items-start z-10">
            {/* Digital Counter */}
            <div className="font-heading text-8xl md:text-[10rem] text-abcs-red leading-[0.8] mb-6 tracking-tighter select-none font-bold tabular-nums">
              {Math.floor(progress).toString().padStart(3, "0")}
            </div>

            {/* Welcome Text */}
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl uppercase tracking-tighter mb-4 leading-none select-none text-white max-w-lg">
              BIENVENUE SUR MON PORTFOLIO
            </h2>

            {/* Custom linear progress bar */}
            <div className="w-64 sm:w-80 h-[2px] bg-white/10 overflow-hidden relative">
              <div
                className="h-full bg-abcs-red transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Technical ticker detail */}
            <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.25em] mt-3 select-none">
              O&apos;LDEV © 2026 · CHARGEMENT DE L&apos;EXPÉRIENCE
            </span>
          </div>

          {/* Top Right: Glowing Brand Logo Detail */}
          <div className="absolute top-10 right-6 md:top-16 md:right-16 text-right select-none z-10">
            <span className="font-heading text-lg md:text-2xl text-white/10 uppercase tracking-widest block">
              O&apos;LDEV.
            </span>
            <span className="font-mono text-[8px] text-white/15 uppercase tracking-[0.2em] block mt-1">
              PORTFOLIO CREATIF
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

