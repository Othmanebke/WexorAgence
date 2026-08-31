"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import heroPhoto from "@/img/Gemini_Generated_Image_zdg0rbzdg0rbzdg0.png";
import avatarPhoto from "@/img/cravate-orange.png";

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
      {/* Desktop Avatar — fond aligné avec le hero */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-avatar-desktop"
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

      {/* Overlay noir — slide vers le haut avec avatar mobile & stats */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-overlay"
            className="fixed inset-0 z-[9998] bg-[#0C0C0C] text-white overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none"
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

            {/* Header / Brand */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-md">
                  <Image src={avatarPhoto} alt="Othmane" fill className="object-cover object-top scale-125" priority />
                </div>
                <span className="font-heading font-black text-sm uppercase tracking-widest text-white/90">
                  Othmane Bouakline
                </span>
              </div>
              <span className="font-bold text-[10px] uppercase tracking-[0.25em] text-[#FF3B00]">
                Chargement
              </span>
            </div>

            {/* Mobile Centered Avatar Visual */}
            <div className="relative z-10 md:hidden flex flex-col items-center justify-center my-auto">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-[#FF3B00] via-[#FF6600] to-white/30 shadow-[0_0_40px_rgba(255,59,0,0.4)]"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#161616]">
                  <Image
                    src={avatarPhoto}
                    alt="Othmane Bouakline"
                    fill
                    className="object-cover object-top scale-110"
                    priority
                    unoptimized
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FF3B00] text-white px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap shadow-md">
                  Portfolio
                </div>
              </motion.div>
              <p className="font-bold text-xs uppercase tracking-[0.2em] text-white/50 mt-5">
                Développeur Web · Full Stack
              </p>
            </div>

            {/* Bas : Compteur + Barre de progression */}
            <div className="relative z-10 flex flex-col gap-4 w-full">
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-heading font-black text-[#FF3B00] leading-none tracking-tighter tabular-nums"
                    style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
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
                <span className="font-mono text-xs uppercase tracking-widest text-white/30 pb-2 hidden sm:inline-block">
                  Initialisation de l&apos;expérience
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
