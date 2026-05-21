"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import poseAvatar from "@/img/pose-bg.png";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
function useScramble(target: string, trigger: boolean, duration = 1100) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = Math.ceil(duration / 16);
    const id = setInterval(() => {
      frame++;
      const p = frame / total;
      setDisplay(
        target.split("").map((c, i) => {
          if (c === "'" || c === "." || c === " ") return c;
          if (i / target.length < p) return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      if (frame >= total) { clearInterval(id); setDisplay(target); }
    }, 16);
    return () => clearInterval(id);
  }, [trigger, target, duration]);
  return display;
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const scrambledName = useScramble("OTHMANE", progress > 5, 1400);
  const scrambledBrand = useScramble("O'LDEV", progress > 15, 1000);

  useEffect(() => {
    const duration = 2000;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 400);
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
          className="fixed inset-0 z-[10000] bg-abcs-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
          />

          {/* Compteur rouge — gauche */}
          <div className="absolute left-6 md:left-14 bottom-24 md:bottom-28 z-10 select-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-heading text-abcs-red leading-none tracking-tighter tabular-nums"
              style={{ fontSize: "clamp(6rem, 20vw, 18rem)", lineHeight: 0.82 }}
            >
              {Math.floor(progress).toString().padStart(3, "0")}
            </motion.div>
          </div>

          {/* Branding top-left */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="absolute top-8 left-6 md:top-12 md:left-14 z-10 select-none"
          >
            <span className="font-heading text-2xl md:text-4xl uppercase tracking-widest text-white">
              {scrambledBrand}
            </span>
            <span className="block font-bold text-[9px] uppercase tracking-[0.3em] text-white/25 mt-1">
              Freelance Web · {scrambledName}
            </span>
          </motion.div>

          {/* Avatar — émerge du bas, centré à droite */}
          <motion.div
            className="absolute bottom-0 right-0 md:right-12 z-20 select-none"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <Image
              src={poseAvatar}
              alt="Othmane"
              width={340}
              height={440}
              className="object-contain object-bottom"
              unoptimized
              priority
            />
          </motion.div>

          {/* Barre de progression — bas */}
          <div className="absolute bottom-8 left-6 md:left-14 right-6 md:right-14 z-30">
            <div className="w-full h-[2px] bg-white/8 overflow-hidden">
              <motion.div
                className="h-full bg-abcs-red"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-mono text-[8px] text-white/25 uppercase tracking-[0.25em]">
                O&apos;ldev © 2026 · Chargement
              </span>
              <span className="font-mono text-[8px] text-abcs-red/60 uppercase tracking-widest">
                {Math.floor(progress)}%
              </span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
