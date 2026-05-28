"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// direction: "L" = enter from left, "R" = right, "T" = top, "B" = bottom
const KEYWORDS: { text: string; left: string; top: string; size: string; op: number; dir: "L" | "R" | "T" | "B" }[] = [
  { text: "React",        left: "4%",  top: "20%", size: "text-2xl",  op: 5, dir: "L" },
  { text: "Node.js",      left: "3%",  top: "48%", size: "text-xl",   op: 4, dir: "L" },
  { text: "TypeScript",   left: "7%",  top: "68%", size: "text-base", op: 3, dir: "L" },
  { text: "PostgreSQL",   left: "2%",  top: "82%", size: "text-sm",   op: 2, dir: "L" },
  { text: "Vercel",       left: "17%", top: "35%", size: "text-base", op: 3, dir: "L" },
  { text: "Git",          left: "14%", top: "78%", size: "text-base", op: 2, dir: "B" },
  { text: "Next.js",      left: "76%", top: "16%", size: "text-2xl",  op: 5, dir: "R" },
  { text: "GSAP",         left: "83%", top: "40%", size: "text-xl",   op: 4, dir: "R" },
  { text: "Framer",       left: "75%", top: "62%", size: "text-base", op: 3, dir: "R" },
  { text: "ServiceNow",   left: "78%", top: "80%", size: "text-sm",   op: 3, dir: "R" },
  { text: "WordPress",    left: "86%", top: "55%", size: "text-base", op: 2, dir: "R" },
  { text: "REST API",     left: "84%", top: "88%", size: "text-sm",   op: 2, dir: "B" },
  { text: "Figma",        left: "28%", top: "8%",  size: "text-xl",   op: 4, dir: "T" },
  { text: "Tailwind",     left: "55%", top: "6%",  size: "text-lg",   op: 3, dir: "T" },
  { text: "Supabase",     left: "42%", top: "14%", size: "text-sm",   op: 2, dir: "T" },
  { text: "Adobe CC",     left: "22%", top: "86%", size: "text-base", op: 3, dir: "B" },
  { text: "Canva Pro",    left: "47%", top: "91%", size: "text-lg",   op: 4, dir: "B" },
  { text: "IA / OpenAI",  left: "63%", top: "88%", size: "text-base", op: 3, dir: "B" },
  { text: "Zapier",       left: "36%", top: "82%", size: "text-sm",   op: 2, dir: "B" },
  { text: "HTML / CSS",   left: "60%", top: "78%", size: "text-sm",   op: 2, dir: "R" },
];

// Initial offset based on entry direction
const dirOffset = (dir: "L" | "R" | "T" | "B") => {
  if (dir === "L") return { x: -160, y: 0 };
  if (dir === "R") return { x: 160, y: 0 };
  if (dir === "T") return { x: 0, y: -80 };
  return { x: 0, y: 80 };
};

// Float animation — alternates direction
const floatY = (i: number) => [0, -10 + (i % 3) * 4, 0, 10 - (i % 3) * 4, 0];

const OP_ALPHA: Record<number, number> = { 5: 0.65, 4: 0.45, 3: 0.28, 2: 0.15 };

const STATS = [
  { val: "10+",  label: "Projets livrés" },
  { val: "20+",  label: "Technologies" },
  { val: "5 ans",label: "D'expérience" },
  { val: "100%", label: "Satisfaction" },
];

export default function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="relative w-full bg-abcs-black text-white overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Floating keywords — enter from their direction ───────── */}
      {KEYWORDS.map((kw, i) => {
        const offset = dirOffset(kw.dir);
        const alpha = OP_ALPHA[kw.op];
        return (
          <motion.span
            key={kw.text}
            className={`absolute font-heading uppercase select-none pointer-events-none whitespace-nowrap ${kw.size}`}
            style={{ left: kw.left, top: kw.top }}
            initial={{ opacity: 0, x: offset.x, y: offset.y }}
            animate={
              inView
                ? {
                    opacity: alpha,
                    x: 0,
                    y: floatY(i),
                  }
                : { opacity: 0, x: offset.x, y: offset.y }
            }
            transition={
              inView
                ? {
                    opacity: { duration: 0.6, delay: 0.1 + i * 0.06 },
                    x: { duration: 0.8, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
                    y: {
                      // After initial entry, continuous float
                      delay: 0.1 + i * 0.06,
                      duration: 4.5 + (i % 4) * 0.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.25, 0.5, 0.75, 1],
                    },
                  }
                : {}
            }
          >
            {kw.text}
          </motion.span>
        );
      })}

      {/* ── Central content ────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-bold text-[10px] uppercase tracking-[0.3em] text-abcs-red mb-8"
        >
          03 · Stack technique
        </motion.p>

        {/* Main heading */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-heading uppercase leading-[0.88] tracking-tighter text-white"
            style={{ fontSize: "clamp(4.5rem, 13vw, 12rem)" }}
          >
            Maîtrisé.
          </motion.h2>
        </div>

        {/* Script accent */}
        <div className="overflow-hidden mb-10">
          <motion.p
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="font-script leading-none text-white/25"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            Livré.
          </motion.p>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-bold text-xs text-white/30 uppercase tracking-[0.2em] max-w-xs"
        >
          Stack moderne, sélectionné pour la performance et la durabilité
        </motion.p>

        {/* Red divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-14 h-px bg-abcs-red mt-10 mb-12 origin-left"
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-heading text-4xl md:text-5xl text-white leading-none">{s.val}</span>
              <span className="font-bold text-[10px] uppercase tracking-widest text-white/25 mt-1">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
