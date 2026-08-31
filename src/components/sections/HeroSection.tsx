"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/components/LanguageContext";
import { useContactModal } from "@/components/ContactModalProvider";

import heroPhoto from "@/img/Gemini_Generated_Image_zdg0rbzdg0rbzdg0.png";

// ─── Text Scramble Hook ──────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function useTextScramble(target: string, trigger: boolean, duration = 1200) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = Math.ceil(duration / 16);
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " " || char === "'" || char === ".") return char;
            if (i / target.length < progress) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplay(target);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [trigger, target, duration]);
  return display;
}

export default function HeroSection() {
  const [heroReady, setHeroReady] = useState(false);
  const { t } = useLang();
  const { openModal } = useContactModal();

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const scrambledFirst = useTextScramble("OTHMANE", heroReady, 1400);
  const scrambledLast = useTextScramble("BOUAKLINE", heroReady, 1700);

  return (
    <section id="hero" className="w-full min-h-screen relative overflow-hidden">


        {/* Desktop — left: first name */}
        <div className="hidden md:flex absolute inset-y-0 left-0 w-[55%] flex-col justify-end px-8 xl:px-12 pb-[30%] z-[1]">
          <div className="overflow-visible">
            <motion.h1
              className="font-heading text-abcs-black leading-[0.82] tracking-tighter uppercase whitespace-nowrap"
              style={{ fontSize: "clamp(4rem, 7.5vw, 9rem)" }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {scrambledFirst}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-bold text-[10px] tracking-[0.2em] uppercase mt-3 text-abcs-black/40"
          >
            Développeur Web · Full Stack
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8"
          >
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 border border-abcs-black/20 px-5 py-2.5 font-bold text-[10px] uppercase tracking-widest hover:border-abcs-red hover:text-abcs-red transition-colors group w-fit"
            >
              <span>{t("hero_cta")}</span>
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </button>
          </motion.div>
        </div>

        {/* Desktop — right: last name */}
        <div className="hidden md:flex absolute inset-y-0 right-0 w-[55%] flex-col justify-end items-end px-8 xl:px-12 pb-[32%] z-[1]">
          <div className="overflow-visible">
            <motion.h2
              className="font-heading text-abcs-black leading-[0.82] tracking-tighter uppercase whitespace-nowrap"
              style={{ fontSize: "clamp(4rem, 7.5vw, 9rem)" }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {scrambledLast}
            </motion.h2>
          </div>
        </div>

        {/* Desktop — right: description */}
        <div className="hidden md:flex absolute bottom-[28%] right-0 w-[32%] flex-col items-start px-8 xl:px-12 z-[1]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-bold text-abcs-black/50 max-w-[240px] leading-relaxed"
          >
            {t("hero_desc").split("\n").join(" ")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="mt-5 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/40">Disponible</span>
          </motion.div>
        </div>

        {/* Desktop — avatar */}
        <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[94%] max-w-[1500px] z-[5]">
          <Image src={heroPhoto} alt="Othmane" fill className="object-contain object-bottom" priority unoptimized />
        </div>

        {/* Mobile */}
        <div className="md:hidden relative min-h-screen overflow-hidden">
          <Image src={heroPhoto} alt="Othmane" fill className="object-cover object-top" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f0ee] via-[#f0f0ee]/75 to-transparent" />
          <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-10 flex flex-col gap-3">
            <div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-heading text-abcs-black leading-[0.82] tracking-tighter uppercase"
                  style={{ fontSize: "clamp(2.8rem, 11vw, 5rem)" }}
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {scrambledFirst}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  className="font-heading text-abcs-black leading-[0.82] tracking-tighter uppercase"
                  style={{ fontSize: "clamp(2.8rem, 11vw, 5rem)" }}
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  {scrambledLast}
                </motion.h2>
              </div>
            </div>
            <p className="font-bold text-[10px] tracking-[0.2em] uppercase text-abcs-black/40">
              Développeur Web · Full Stack
            </p>
            <p className="text-sm font-bold text-abcs-black/60 leading-relaxed max-w-[280px]">
              {t("hero_desc").split("\n").join(" ")}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 bg-abcs-black text-white px-5 py-3 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group"
              >
                <span>{t("hero_cta")}</span>
                <span className="text-base leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/40">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

