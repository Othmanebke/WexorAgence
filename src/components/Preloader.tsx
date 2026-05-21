"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import heroPhoto from "@/img/Gemini_Generated_Image_zdg0rbzdg0rbzdg0.png";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
function useScramble(target: string, trigger: boolean, duration = 1000) {
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
          if (c === "'" || c === " ") return c;
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
  const scrambledBrand = useScramble("O'LDEV", progress > 5, 900);
  const scrambledName  = useScramble("OTHMANE", progress > 15, 1200);

  useEffect(() => {
    const duration = 2000;
    const step = 100 / (duration / 20);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 350);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ── Couche 1 : Avatar — même position que le hero homepage ──────── */}
      {/* Reste en place, disparaît en fondu quand le homepage prend le relais */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-avatar"
            className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.55 }}
          >
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[94%] max-w-[1500px]">
              <Image
                src={heroPhoto}
                alt="Othmane"
                fill
                className="object-contain object-bottom"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Couche 2 : Fond noir + UI — slide vers le haut ───────────────── */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-overlay"
            className="fixed inset-0 z-[9998] bg-abcs-black text-white overflow-hidden"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Grain */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
            />

            {/* BOUAKLINE géant en filigrane */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.04, y: 0 }}
                transition={{ delay: 0.2, duration: 1.2 }}
                className="font-heading text-white uppercase whitespace-nowrap"
                style={{ fontSize: "clamp(5rem, 18vw, 22rem)", lineHeight: 1 }}
              >
                BOUAKLINE
              </motion.span>
            </div>

            {/* Lignes horizontales éditorial */}
            {[20, 40, 60, 80].map((pct) => (
              <motion.div
                key={pct}
                className="absolute left-0 right-0 h-px bg-white/5"
                style={{ top: `${pct}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + pct * 0.004, duration: 1.2, ease: "easeOut" }}
              />
            ))}

            {/* Marqueurs de coins */}
            {[
              "top-6 left-6 border-t border-l",
              "top-6 right-6 border-t border-r",
              "bottom-6 left-6 border-b border-l",
              "bottom-6 right-6 border-b border-r",
            ].map((cls) => (
              <motion.div
                key={cls}
                className={`absolute w-6 h-6 border-white/20 ${cls}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
            ))}

            {/* Ligne rouge verticale — séparation compteur / avatar */}
            <motion.div
              className="absolute top-0 bottom-0 w-px bg-abcs-red/30 hidden md:block"
              style={{ left: "42%" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Numéro de page style — haut droite discret */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-8 right-6 md:top-12 md:right-14 text-right select-none z-10"
            >
              <span className="font-heading text-[10rem] md:text-[14rem] text-white/[0.03] leading-none tracking-tighter">
                01
              </span>
            </motion.div>

            {/* Branding — haut gauche */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="absolute top-8 left-6 md:top-12 md:left-14 z-10 select-none"
            >
              <span className="font-heading text-2xl md:text-4xl uppercase tracking-widest text-white">
                {scrambledBrand}
              </span>
              <span className="block font-bold text-[9px] uppercase tracking-[0.3em] text-white/25 mt-1">
                Freelance Web · {scrambledName}
              </span>
            </motion.div>

            {/* Compteur rouge — bas gauche */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="absolute left-6 md:left-14 bottom-24 md:bottom-28 z-10 select-none"
            >
              <div
                className="font-heading text-abcs-red leading-none tracking-tighter tabular-nums"
                style={{ fontSize: "clamp(6rem, 20vw, 18rem)", lineHeight: 0.82 }}
              >
                {Math.floor(progress).toString().padStart(3, "0")}
              </div>
            </motion.div>

            {/* Barre de progression — bas */}
            <div className="absolute bottom-8 left-6 md:left-14 right-6 md:right-14 z-30">
              <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-abcs-red transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
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
    </>
  );
}
