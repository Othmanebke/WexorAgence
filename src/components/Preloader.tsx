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
      {/* Avatar — même position que le hero, reste en place */}
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

      {/* Overlay noir — slide vers le haut */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-overlay"
            className="fixed inset-0 z-[9998] bg-abcs-black text-white overflow-hidden flex items-center justify-between px-8 md:px-16"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Grain */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
            />

            {/* Chiffre — gauche */}
            <span
              className="font-heading text-abcs-red leading-none tracking-tighter tabular-nums select-none relative z-10"
              style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
            >
              {Math.floor(progress).toString().padStart(3, "0")}
            </span>

            {/* % — droite */}
            <span
              className="font-heading text-white/20 leading-none tracking-tighter select-none relative z-10"
              style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
            >
              %
            </span>

            {/* Barre de progression — bas */}
            <div className="absolute bottom-8 left-8 md:left-16 right-8 md:right-16 z-10">
              <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-abcs-red transition-all duration-75 ease-out"
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
