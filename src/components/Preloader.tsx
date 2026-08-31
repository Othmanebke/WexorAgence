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
      {/* Grand Personnage 3D — placé en arrière-plan (z-[9997]) pour que la barre soit toujours devant */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-hero-character"
            className="fixed inset-0 pointer-events-none z-[9997]"
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

            {/* Mobile character — exact même niveau que dans le Hero mobile */}
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

      {/* Overlay sombre avec compteur & barre de chargement TOUT EN HAUT au premier plan (z-[9999]) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-overlay"
            className="fixed inset-0 z-[9999] bg-[#0C0C0C]/80 backdrop-blur-[2px] text-white overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Header top + Compteur + Barre de progression TOUT EN HAUT */}
            <div className="relative z-30 flex flex-col gap-3.5 w-full max-w-2xl mx-auto">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B00] animate-pulse" />
                  <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-widest text-white">
                    Othmane Bouakline
                  </span>
                </div>
                <span className="font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#FF3B00]">
                  Chargement
                </span>
              </div>

              {/* Compteur & Barre tout en haut — 100% visible, net et lumineux */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="font-heading font-black text-[#FF3B00] leading-none tracking-tighter tabular-nums drop-shadow-[0_0_25px_rgba(255,59,0,0.6)]"
                      style={{ fontSize: "clamp(2.8rem, 10vw, 5.5rem)" }}
                    >
                      {Math.floor(progress).toString().padStart(3, "0")}
                    </span>
                    <span
                      className="font-heading font-black text-white/40 leading-none tracking-tighter"
                      style={{ fontSize: "clamp(1.5rem, 4.5vw, 3rem)" }}
                    >
                      %
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/70 pb-1">
                    Développeur Web Full Stack
                  </span>
                </div>

                {/* Barre de chargement en haut */}
                <div className="w-full h-[5px] bg-white/20 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-[#FF3B00] transition-all duration-75 ease-out shadow-[0_0_20px_#FF3B00]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom tag */}
            <div className="relative z-30 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
              <span>Portfolio 2026</span>
              <span>Initialisation...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
