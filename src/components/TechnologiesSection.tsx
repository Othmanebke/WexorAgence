"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = ["Tous", "Frontend", "Backend", "Design", "Outils"] as const;
type Category = (typeof CATEGORIES)[number];

const TECHS = [
  // Frontend
  { id: "html",    name: "HTML / CSS",     cat: "Frontend", level: 5, badge: "Pro",          desc: "Sémantique, accessibilité, CSS avancé & animations" },
  { id: "js",      name: "JavaScript",     cat: "Frontend", level: 5, badge: "Pro",          desc: "ES6+, async/await, DOM, modules natifs" },
  { id: "ts",      name: "TypeScript",     cat: "Frontend", level: 4, badge: "Avancé",       desc: "Types, generics, interfaces, strictMode" },
  { id: "react",   name: "React",          cat: "Frontend", level: 5, badge: "Pro",          desc: "Composants, hooks, context, state management" },
  { id: "next",    name: "Next.js",        cat: "Frontend", level: 5, badge: "Pro",          desc: "App Router, SSR, SSG, API Routes, Middleware" },
  { id: "tailwind",name: "Tailwind CSS",   cat: "Frontend", level: 5, badge: "Pro",          desc: "Utility-first, responsive, dark mode, JIT" },
  { id: "framer",  name: "Framer Motion",  cat: "Frontend", level: 4, badge: "Avancé",       desc: "Animations, gestures, layout animations, spring" },
  { id: "gsap",    name: "GSAP",           cat: "Frontend", level: 4, badge: "Avancé",       desc: "ScrollTrigger, timelines, 3D CSS, scrub" },
  // Backend
  { id: "node",    name: "Node.js",        cat: "Backend",  level: 4, badge: "Avancé",       desc: "API REST, Express, middleware, auth JWT" },
  { id: "postgres",name: "PostgreSQL",     cat: "Backend",  level: 3, badge: "Intermédiaire",desc: "Requêtes, jointures, indexation, optimisation" },
  { id: "supabase",name: "Supabase",       cat: "Backend",  level: 3, badge: "Intermédiaire",desc: "Auth, Realtime, storage, Row Level Security" },
  { id: "vercel",  name: "Vercel",         cat: "Backend",  level: 5, badge: "Pro",          desc: "Déploiement, CI/CD, Edge Functions, analytics" },
  // Design
  { id: "figma",   name: "Figma",          cat: "Design",   level: 4, badge: "Avancé",       desc: "UI/UX, prototypes, auto-layout, design system" },
  { id: "adobe",   name: "Adobe CC",       cat: "Design",   level: 3, badge: "Intermédiaire",desc: "Photoshop, Illustrator, InDesign, export web" },
  { id: "canva",   name: "Canva Pro",      cat: "Design",   level: 5, badge: "Pro",          desc: "Branding, social media, print, Brand Kit" },
  // Outils
  { id: "servicenow",name: "ServiceNow",   cat: "Outils",   level: 4, badge: "Avancé",       desc: "ITSM, workflows, portails, Glide scripting" },
  { id: "wordpress", name: "WordPress",    cat: "Outils",   level: 4, badge: "Avancé",       desc: "Thèmes custom, WooCommerce, ACF, Gutenberg" },
  { id: "git",     name: "Git / GitHub",   cat: "Outils",   level: 4, badge: "Avancé",       desc: "Versioning, branches, PR, GitHub Actions" },
  { id: "ai",      name: "IA / OpenAI",    cat: "Outils",   level: 3, badge: "Intermédiaire",desc: "API, prompting, RAG, agents, automatisation" },
  { id: "zapier",  name: "Zapier / Make",  cat: "Outils",   level: 3, badge: "Intermédiaire",desc: "Automatisations no-code, webhooks, intégrations" },
] as const;

type Tech = (typeof TECHS)[number];

// ─── Badge color helpers ──────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, string> = {
  Pro:           "border-abcs-red text-abcs-red group-hover:border-white group-hover:text-white",
  Avancé:        "border-abcs-black/30 text-abcs-black/50 group-hover:border-white/60 group-hover:text-white/70",
  Intermédiaire: "border-abcs-black/20 text-abcs-black/35 group-hover:border-white/40 group-hover:text-white/50",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function TechCard({ tech }: { tech: Tech }) {
  return (
    <div className="group bg-[#f0f0ee] border-b border-r border-black/10 p-6 flex flex-col gap-4 hover:bg-abcs-red hover:text-white transition-colors duration-300 cursor-default min-h-[160px]">
      {/* Top row: cat + badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-[9px] uppercase tracking-[0.2em] text-abcs-black/35 group-hover:text-white/60 transition-colors duration-300">
          {tech.cat}
        </span>
        <span
          className={`font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 border transition-colors duration-300 ${BADGE_STYLES[tech.badge]}`}
        >
          {tech.badge}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-heading text-xl md:text-2xl uppercase leading-tight flex-1">
        {tech.name}
      </h3>

      {/* Description */}
      <p className="font-bold text-[11px] text-abcs-black/40 group-hover:text-white/70 leading-relaxed transition-colors duration-300">
        {tech.desc}
      </p>

      {/* Level bar */}
      <div className="flex gap-1 mt-auto pt-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`flex-1 h-0.5 transition-colors duration-300 ${
              dot <= tech.level
                ? "bg-abcs-red group-hover:bg-white"
                : "bg-black/12 group-hover:bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TechnologiesSection() {
  const [activeFilter, setActiveFilter] = useState<Category>("Tous");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  const filtered = useMemo(
    () =>
      activeFilter === "Tous"
        ? [...TECHS]
        : TECHS.filter((t) => t.cat === activeFilter),
    [activeFilter]
  );

  return (
    <section ref={sectionRef} id="technologies" className="w-full py-16 md:py-24 px-6 md:px-8 bg-[#f0f0ee]">
      <div className="w-full max-w-7xl mx-auto">

        {/* Header row */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">

          {/* Title */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "102%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight"
            >
              Stack.
            </motion.h2>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => {
              const count = cat === "Tous" ? TECHS.length : TECHS.filter((t) => t.cat === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 border transition-all duration-200 flex items-center gap-2 ${
                    activeFilter === cat
                      ? "bg-abcs-black text-white border-abcs-black"
                      : "border-abcs-black/20 text-abcs-black hover:border-abcs-black"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`tabular-nums ${activeFilter === cat ? "opacity-50" : "opacity-30"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-black/10 border-t border-l border-black/10"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.25, delay: i * 0.03 },
                  scale: { duration: 0.25, delay: i * 0.03 },
                }}
              >
                <TechCard tech={tech} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex items-center justify-between"
        >
          <span className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/30">
            {filtered.length} {filtered.length === 1 ? "technologie" : "technologies"}
            {activeFilter !== "Tous" ? ` · ${activeFilter}` : " maîtrisées"}
          </span>
          {activeFilter !== "Tous" && (
            <button
              onClick={() => setActiveFilter("Tous")}
              className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/30 hover:text-abcs-red transition-colors"
            >
              Voir tout ×
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
