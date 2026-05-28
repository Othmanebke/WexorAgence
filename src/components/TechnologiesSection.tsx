"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Keywords scattered around the central text
// Each: text, left %, top %, Tailwind text size, opacity level (1–5)
const KEYWORDS = [
  // Left zone
  { text: "React",        left: "4%",  top: "18%", size: "text-2xl",  op: 5 },
  { text: "Node.js",      left: "2%",  top: "44%", size: "text-xl",   op: 4 },
  { text: "TypeScript",   left: "6%",  top: "66%", size: "text-base", op: 3 },
  { text: "PostgreSQL",   left: "3%",  top: "82%", size: "text-sm",   op: 2 },
  { text: "Vercel",       left: "16%", top: "35%", size: "text-sm",   op: 3 },
  { text: "Git",          left: "14%", top: "78%", size: "text-base", op: 2 },
  // Right zone
  { text: "Next.js",      left: "76%", top: "14%", size: "text-2xl",  op: 5 },
  { text: "GSAP",         left: "82%", top: "38%", size: "text-xl",   op: 4 },
  { text: "Framer",       left: "74%", top: "60%", size: "text-base", op: 3 },
  { text: "ServiceNow",   left: "78%", top: "78%", size: "text-sm",   op: 3 },
  { text: "WordPress",    left: "88%", top: "54%", size: "text-base", op: 2 },
  { text: "REST API",     left: "86%", top: "86%", size: "text-sm",   op: 2 },
  // Top zone (between left/right, above center)
  { text: "Figma",        left: "30%", top: "8%",  size: "text-xl",   op: 4 },
  { text: "Tailwind",     left: "56%", top: "6%",  size: "text-lg",   op: 3 },
  { text: "Supabase",     left: "43%", top: "13%", size: "text-sm",   op: 2 },
  // Bottom zone
  { text: "Adobe CC",     left: "26%", top: "84%", size: "text-base", op: 3 },
  { text: "Canva Pro",    left: "48%", top: "90%", size: "text-lg",   op: 4 },
  { text: "IA / OpenAI",  left: "64%", top: "86%", size: "text-base", op: 3 },
  { text: "Zapier",       left: "38%", top: "80%", size: "text-sm",   op: 2 },
  { text: "HTML / CSS",   left: "60%", top: "76%", size: "text-sm",   op: 2 },
];

// Opacity levels mapped to Tailwind
const OP_MAP: Record<number, string> = {
  5: "opacity-60",
  4: "opacity-40",
  3: "opacity-25",
  2: "opacity-15",
};

// Float Y offsets — cycle through keywords
const FLOAT_OFFSETS = [
  [0, -10, 0, 10, 0],
  [0, 8, 0, -8, 0],
  [0, -6, 0, 6, 0],
  [0, 12, 0, -12, 0],
];

const STATS = [
  { val: "10+",  label: "Projets livrés" },
  { val: "20+",  label: "Technologies" },
  { val: "5 ans",label: "D'expérience" },
  { val: "100%", label: "Satisfaction" },
];

export default function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="relative w-full bg-abcs-black text-white overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Floating keywords ─────────────────────────────────────── */}
      {KEYWORDS.map((kw, i) => (
        <motion.span
          key={kw.text}
          className={`absolute font-heading uppercase select-none pointer-events-none whitespace-nowrap ${kw.size} ${OP_MAP[kw.op]}`}
          style={{ left: kw.left, top: kw.top }}
          initial={{ opacity: 0, y: 20 }}
          animate={
            inView
              ? {
                  opacity: kw.op === 5 ? 0.6 : kw.op === 4 ? 0.4 : kw.op === 3 ? 0.25 : 0.15,
                  y: FLOAT_OFFSETS[i % FLOAT_OFFSETS.length],
                }
              : { opacity: 0, y: 20 }
          }
          transition={
            inView
              ? {
                  opacity: { duration: 0.7, delay: i * 0.05 },
                  y: {
                    duration: 4 + (i % 3) * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  },
                }
              : {}
          }
        >
          {kw.text}
        </motion.span>
      ))}

      {/* ── Central content ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-bold text-[10px] uppercase tracking-[0.3em] text-abcs-red mb-6"
        >
          03 · Stack technique
        </motion.p>

        {/* Main heading */}
        <div className="overflow-hidden mb-3">
          <motion.h2
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-heading uppercase leading-[0.88] tracking-tighter text-white"
            style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
          >
            Maîtrisé.
          </motion.h2>
        </div>

        {/* Accent line — script font */}
        <div className="overflow-hidden mb-8">
          <motion.p
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="font-script text-white/30 leading-none"
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
          className="font-bold text-sm text-white/35 uppercase tracking-[0.2em] max-w-xs"
        >
          Stack moderne sélectionné pour la performance et la durabilité
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-abcs-red mt-10 mb-12 origin-left"
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-heading text-4xl md:text-5xl text-white leading-none">{s.val}</span>
              <span className="font-bold text-[10px] uppercase tracking-widest text-white/30 mt-1">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
