"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Three marquee rows — each row moves in alternating directions
const ROWS = [
  {
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "HTML / CSS", "JavaScript"],
    dir: 1,
    speed: 22,
    style: "plain", // text only
  },
  {
    items: ["Node.js", "PostgreSQL", "Supabase", "Vercel", "REST API", "Figma", "Adobe CC", "Canva Pro"],
    dir: -1,
    speed: 18,
    style: "pill", // bordered pills
  },
  {
    items: ["ServiceNow", "WordPress", "Git / GitHub", "IA / OpenAI", "Zapier", "UX Design", "ITIL", "Glide"],
    dir: 1,
    speed: 26,
    style: "accent", // some in red
  },
];

const STATS = [
  { val: "20+",  label: "Technologies" },
  { val: "10+",  label: "Projets livrés" },
  { val: "5 ans", label: "D'expérience" },
  { val: "100%", label: "Satisfaction" },
];

// Single marquee row component
function Marquee({ items, dir, speed, style: rowStyle }: typeof ROWS[0]) {
  const innerRef = useRef<HTMLDivElement>(null);
  const doubled = [...items, ...items];

  useGSAP(() => {
    const el = innerRef.current;
    if (!el) return;
    const start = dir === 1 ? 0 : -50;
    const end = dir === 1 ? -50 : 0;
    gsap.fromTo(el, { xPercent: start }, {
      xPercent: end,
      ease: "none",
      duration: speed,
      repeat: -1,
    });
  }, { scope: innerRef });

  return (
    <div
      className="overflow-hidden w-full py-2"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        ref={innerRef}
        className="flex items-center"
        style={{ width: "200%", willChange: "transform" }}
      >
        {doubled.map((item, i) => {
          const isAccent = rowStyle === "accent" && i % 3 === 0;
          const isPill = rowStyle === "pill";
          return (
            <span key={i} className="flex items-center shrink-0">
              <span
                className={`
                  font-heading uppercase tracking-tight select-none transition-colors duration-300
                  ${rowStyle === "plain" ? "text-5xl xl:text-7xl text-white/50 hover:text-white/80 px-5 xl:px-8" : ""}
                  ${isPill ? "text-3xl xl:text-5xl text-white/35 hover:text-white/65 border border-white/15 hover:border-white/35 px-5 py-1.5 xl:px-7 xl:py-2 mx-2" : ""}
                  ${rowStyle === "accent" && !isAccent ? "text-4xl xl:text-6xl text-white/45 hover:text-white/75 px-5 xl:px-7" : ""}
                  ${isAccent ? "text-4xl xl:text-6xl text-abcs-red px-5 xl:px-7" : ""}
                `}
              >
                {item}
              </span>
              {/* Separator */}
              {!isPill && (
                <span
                  className={`shrink-0 font-bold text-2xl xl:text-3xl mx-1 ${isAccent ? "text-white/15" : "text-abcs-red/40"}`}
                >
                  ·
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="relative z-20 -mt-10 sm:-mt-14 md:-mt-20 w-full bg-abcs-black text-white overflow-hidden py-20 md:py-28 rounded-t-[36px] sm:rounded-t-[50px] md:rounded-t-[64px] shadow-[0_-30px_70px_rgba(0,0,0,0.85)]"
    >

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Header ───────────────────────────────────────────────── */}
      <div ref={headerRef} className="relative z-10 flex flex-col md:flex-row md:items-end justify-between px-8 md:px-12 mb-14 md:mb-20 gap-8">

        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-bold text-[10px] uppercase tracking-[0.3em] text-abcs-red mb-4"
          >
            03 · Stack technique
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "105%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-heading uppercase leading-[0.88] tracking-tight text-white"
              style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
            >
              Stack.
            </motion.h2>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-bold text-sm text-white/30 max-w-xs leading-relaxed md:text-right"
        >
          20+ technologies maîtrisées — du frontend au déploiement, du design au no-code.
        </motion.p>
      </div>

      {/* ── Marquee rows ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col gap-1">
        {ROWS.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: row.dir === 1 ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Marquee {...row} />
          </motion.div>
        ))}
      </div>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative z-10 mt-16 md:mt-20 px-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10"
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col gap-1.5">
            <span className="font-heading text-4xl md:text-5xl text-white leading-none">{s.val}</span>
            <span className="font-bold text-[10px] uppercase tracking-widest text-white/25">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
