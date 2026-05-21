"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function useScramble(target: string, duration = 1300) {
  const [display, setDisplay] = useState(target);
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!go) return;
    let frame = 0;
    const total = Math.ceil(duration / 16);
    const id = setInterval(() => {
      frame++;
      const progress = frame / total;
      setDisplay(
        target.split("").map((char, i) => {
          if (char === " " || char === "'" || char === "." || char === "À" || char === "É") return char;
          if (i / target.length < progress) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      if (frame >= total) { clearInterval(id); setDisplay(target); }
    }, 16);
    return () => clearInterval(id);
  }, [go, target, duration]);
  return display;
}

interface PageHeaderProps {
  number?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHeader({ number = "00", title = "", subtitle, children }: PageHeaderProps) {
  const scrambled = useScramble(title);

  return (
    <section className="w-full min-h-[58vh] md:min-h-[68vh] relative overflow-hidden bg-[#f0f0ee] flex flex-col justify-end px-6 md:px-8 pt-24 pb-12 md:pb-16">

      {/* Numéro géant en filigrane */}
      <div
        className="absolute bottom-0 right-4 font-heading text-abcs-black/[0.04] select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(12rem, 40vw, 36rem)" }}
        aria-hidden="true"
      >
        {number}
      </div>

      {/* Grain overlay subtil */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
      />

      {/* Label + numéro */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="flex items-center gap-4 mb-6 relative z-10"
      >
        <motion.span
          className="block h-px bg-abcs-red origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "2rem" }}
        />
        <span className="font-bold text-[10px] uppercase tracking-[0.3em] text-abcs-black/50">{subtitle ?? "O'ldev"}</span>
        <span className="font-bold text-[10px] text-abcs-red tracking-widest">{number}</span>
      </motion.div>

      {/* Titre scramble */}
      <div className="overflow-hidden relative z-10">
        <motion.h1
          className="font-heading uppercase leading-[0.82] tracking-tighter"
          style={{ fontSize: "clamp(3.5rem, 12vw, 13rem)" }}
          initial={{ y: "106%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          {scrambled}
        </motion.h1>
      </div>

      {/* Barre rouge animée */}
      <motion.div
        className="h-[3px] bg-abcs-red mt-6 origin-left relative z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      />

      {/* Slot enfant (avatar, etc.) */}
      {children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="hidden md:block absolute bottom-12 right-8 z-10"
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
