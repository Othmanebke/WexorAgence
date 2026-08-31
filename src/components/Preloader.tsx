"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import heroPhoto from "@/img/Gemini_Generated_Image_zdg0rbzdg0rbzdg0.png";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const step = 100 / (2000 / 20);
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
      {/* Grand Personnage 3D — exact même position sur mobile & desktop calé sur le Hero */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-hero-character"
            className="fixed inset-0 pointer-events-none z-[9999]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[96%] max-w-[1500px]">
              <Image
                src={heroPhoto}
                alt="Othmane Bouakline"
                fill
                className="object-contain object-bottom scale-[1.12] sm:scale-100"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay noir avec compteur et barre — slide vers le haut à la fin */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-overlay"
            className="fixed inset-0 z-[9998] bg-[#0C0C0C]/90 backdrop-blur-xs text-white overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Grain */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
                backgroundSize: "128px",
              }}
            />

            {/* Header top */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FF3B00] animate-pulse" />
                <span className="font-heading font-black text-sm uppercase tracking-widest text-white/90">
                  Othmane Bouakline
                </span>
              </div>
              <span className="font-bold text-[10px] uppercase tracking-[0.25em] text-[#FF3B00]">
                Chargement
              </span>
            </div>

            {/* Bas : Compteur géant + barre de progression */}
            <div className="relative z-10 flex flex-col gap-4 w-full">
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-heading font-black text-[#FF3B00] leading-none tracking-tighter tabular-nums"
                    style={{ fontSize: "clamp(3.5rem, 11vw, 8.5rem)" }}
                  >
                    {Math.floor(progress).toString().padStart(3, "0")}
                  </span>
                  <span
                    className="font-heading font-black text-white/30 leading-none tracking-tighter"
                    style={{ fontSize: "clamp(1.8rem, 5vw, 4.5rem)" }}
                  >
                    %
                  </span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 pb-2 hidden sm:inline-block">
                  Développeur Web · Full Stack
                </span>
              </div>

              {/* Barre de progression */}
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF3B00] transition-all duration-75 ease-out shadow-[0_0_12px_#FF3B00]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
