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
      {/* Grand Personnage 3D — calé exactement au même niveau que le Hero sur Mobile et Desktop */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-hero-character"
            className="fixed inset-0 pointer-events-none z-[9999]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            {/* Desktop character */}
            <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[94%] max-w-[1500px]">
              <Image
                src={heroPhoto}
                alt="Othmane Bouakline"
                fill
                className="object-contain object-bottom"
                priority
                unoptimized
              />
            </div>

            {/* Mobile character — exact même cadrage que dans le Hero mobile */}
            <div className="md:hidden absolute inset-0">
              <Image
                src={heroPhoto}
                alt="Othmane Bouakline"
                fill
                className="object-cover object-top"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay noir avec barre & compteur au-dessus du personnage — slide vers le haut à la fin */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-overlay"
            className="fixed inset-0 z-[9998] bg-[#0C0C0C]/85 backdrop-blur-xs text-white overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Header top */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B00] animate-pulse" />
                <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-widest text-white/90">
                  Othmane Bouakline
                </span>
              </div>
              <span className="font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#FF3B00]">
                Chargement
              </span>
            </div>

            {/* Compteur & Barre de chargement placés AU-DESSUS de l'avatar */}
            <div className="relative z-10 flex flex-col gap-3 w-full max-w-xl mx-auto -mt-20 sm:-mt-10">
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-heading font-black text-[#FF3B00] leading-none tracking-tighter tabular-nums"
                    style={{ fontSize: "clamp(3.2rem, 12vw, 7.5rem)" }}
                  >
                    {Math.floor(progress).toString().padStart(3, "0")}
                  </span>
                  <span
                    className="font-heading font-black text-white/30 leading-none tracking-tighter"
                    style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
                  >
                    %
                  </span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 pb-2">
                  Développeur Web Full Stack
                </span>
              </div>

              {/* Barre de progression */}
              <div className="w-full h-[4px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF3B00] transition-all duration-75 ease-out shadow-[0_0_15px_#FF3B00]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Bottom spacer / label */}
            <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/30">
              <span>Portfolio 2026</span>
              <span>Initialisation...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
