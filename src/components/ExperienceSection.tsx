"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    year: "2025",
    title: "Developer ServiceNow",
    company: "Inetum",
    period: "Sept 2025 — Présent",
    type: "CDI · Présentiel & Remote",
    current: true,
    desc: "Développement et personnalisation de la plateforme ServiceNow : workflows, portails, intégrations API et automatisations ITSM.",
    highlights: [
      "Conception de portails ServiceNow sur-mesure",
      "Automatisation de workflows ITSM complexes",
      "Intégrations API REST avec systèmes tiers",
      "Accompagnement des équipes métier",
    ],
    stack: ["ServiceNow", "JavaScript", "REST API", "ITSM", "Glide"],
  },
  {
    year: "2023",
    title: "Consultant ITSM & UX Designer",
    company: "Fujitsu France",
    period: "2023 — 2025 · 2 ans",
    type: "CDI · Grand compte",
    current: false,
    desc: "Pilotage de projets ITSM, conception d'interfaces utilisateur et amélioration des processus IT en environnement grand compte.",
    highlights: [
      "Pilotage end-to-end de projets ITSM",
      "Design d'interfaces utilisateur complexes",
      "Analyse et optimisation des processus IT",
      "Coordination équipes pluridisciplinaires",
    ],
    stack: ["Figma", "ITSM", "UX Design", "ITIL", "ServiceNow"],
  },
  {
    year: "2021",
    title: "Développeur Full Stack",
    company: "AJC Ingénieur",
    period: "2021 — 2023 · 1 an 5 mois",
    type: "Alternance · Full Stack",
    current: false,
    desc: "Conception et développement d'applications web full stack (React / Node.js), intégrations API et déploiement cloud.",
    highlights: [
      "Développement React + Node.js full stack",
      "Architecture et intégrations API REST",
      "Mise en production et déploiement Vercel",
      "Code review et bonnes pratiques",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "REST API", "Vercel"],
  },
];

const N = EXPERIENCES.length;

export default function ExperienceSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => -((N - 1) * window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: outer,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressBarRef.current)
                  progressBarRef.current.style.width = `${self.progress * 100}%`;
                const card = Math.min(
                  Math.round(self.progress * (N - 1)),
                  N - 1
                );
                setActiveCard(card);
              },
            },
          }
        );
      });
    },
    { scope: outerRef }
  );

  return (
    <div id="experiences">
      {/* ── DESKTOP ──────────────────────────────────────────────────────── */}
      {/*
        outer:  (N+1) × 100vh tall → provides scroll space
        sticky: always 100vh, top-0
        clip:   absolute inset-0 overflow-hidden → forces clip to 100vw × 100vh
        track:  N × 100vw, GSAP scrubs it left
        panels: absolute 50/50 columns, no max-width centering → no blank gaps
      */}
      <div
        ref={outerRef}
        className="hidden md:block relative bg-[#f0f0ee]"
        style={{ height: `${(N + 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen z-20 bg-[#f0f0ee]">

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-black/10 z-30">
            <div ref={progressBarRef} className="h-full bg-abcs-red transition-none" style={{ width: "0%" }} />
          </div>

          {/* HUD labels */}
          <div className="absolute top-7 left-10 z-30">
            <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-abcs-black/30">
              05 · Expériences
            </span>
            <div className="flex gap-2 mt-2.5">
              {EXPERIENCES.map((_, i) => (
                <div key={i} className={`w-5 h-0.5 transition-all duration-500 ${i <= activeCard ? "bg-abcs-red" : "bg-black/15"}`} />
              ))}
            </div>
          </div>
          <div className="absolute top-7 right-10 z-30 opacity-30">
            <span className="font-bold text-[9px] uppercase tracking-widest">Défiler →</span>
          </div>

          {/* Clip wrapper — FORCES overflow clip to 100vw × 100vh */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Track — GSAP animates x */}
            <div
              ref={trackRef}
              className="flex h-full will-change-transform"
              style={{ width: `${N * 100}vw` }}
            >
              {EXPERIENCES.map((exp, i) => (
                /* Panel — absolutely-positioned 50/50 columns, full 100vw width */
                <div
                  key={i}
                  className="relative shrink-0 bg-[#f0f0ee]"
                  style={{ width: "100vw", height: "100vh" }}
                >
                  {/* Year watermark — absolute, spans full panel */}
                  <div
                    className="absolute top-14 left-10 font-heading text-abcs-black/[0.06] select-none pointer-events-none leading-none"
                    style={{ fontSize: "clamp(6rem, 16vw, 14rem)" }}
                  >
                    {exp.year}
                  </div>

                  {/* Left column — 50% of panel */}
                  <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center pl-10 xl:pl-16 pr-8 py-24">
                    <div className="relative z-10 flex flex-col gap-6">
                      {exp.current && (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-xs text-emerald-400 uppercase tracking-widest">Poste actuel</span>
                        </div>
                      )}
                      <div>
                        <h3
                          className="font-heading uppercase leading-[0.88] tracking-tight text-abcs-black"
                          style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.5rem)" }}
                        >
                          {exp.title}
                        </h3>
                        <div className="text-abcs-red font-bold text-base uppercase tracking-widest mt-1">
                          @ {exp.company}
                        </div>
                        <div className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/35 mt-2">
                          {exp.period} · {exp.type}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((s) => (
                          <span key={s} className="font-bold text-[10px] uppercase tracking-widest border border-abcs-black/20 px-3 py-1.5 hover:border-abcs-red hover:text-abcs-red transition-colors duration-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <div className="absolute top-20 bottom-20 left-1/2 w-px bg-black/10" />

                  {/* Right column — 50% of panel */}
                  <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center pl-8 pr-10 xl:pr-16 py-24">
                    <div className="flex flex-col gap-6">
                      <p className="font-bold text-base text-abcs-black/65 leading-relaxed">
                        {exp.desc}
                      </p>
                      <ul className="flex flex-col gap-3">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span className="w-1 h-1 rounded-full bg-abcs-red mt-2.5 shrink-0" />
                            <span className="font-bold text-sm text-abcs-black/50 leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                      {/* Panel number — bottom of right col */}
                      <div
                        className="font-heading text-abcs-black/[0.05] select-none mt-8 leading-none"
                        style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* end clip wrapper */}
        </div>
      </div>

      {/* ── MOBILE ─────────────────────────────────────────────────────── */}
      <div className="md:hidden py-16 px-6 bg-[#f0f0ee]">
        <div className="mb-12 overflow-hidden">
          <motion.h2
            initial={{ y: "102%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-6xl uppercase leading-none tracking-tight"
          >
            Expériences.
          </motion.h2>
        </div>
        <div className="flex flex-col border-t border-black/15">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="py-10 border-b border-black/15"
            >
              <div className="font-heading leading-none text-abcs-black/8 mb-1 select-none" style={{ fontSize: "clamp(4rem,14vw,5.5rem)" }}>
                {exp.year}
              </div>
              {exp.current && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-[10px] text-emerald-400 uppercase tracking-widest">Poste actuel</span>
                </div>
              )}
              <h3 className="font-heading text-2xl uppercase leading-tight mb-1">{exp.title}</h3>
              <div className="text-abcs-red font-bold text-sm uppercase tracking-widest mb-1">@ {exp.company}</div>
              <div className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/35 mb-4">{exp.period}</div>
              <p className="font-bold text-sm text-abcs-black/60 leading-relaxed mb-5">{exp.desc}</p>
              <ul className="flex flex-col gap-2 mb-5">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-abcs-red mt-1.5 shrink-0" />
                    <span className="font-bold text-xs text-abcs-black/50 leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {exp.stack.map((s) => (
                  <span key={s} className="font-bold text-[9px] uppercase tracking-widest border border-black/20 px-2.5 py-1">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
