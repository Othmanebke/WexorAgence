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
  // Desktop: outer section (CSS scroll space) + sticky inner
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  // CSS sticky approach — no GSAP pin, no white spacer
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
                if (progressBarRef.current) {
                  progressBarRef.current.style.width = `${self.progress * 100}%`;
                }
                const card = Math.min(Math.floor(self.progress * N), N - 1);
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
      {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
      {/*
        Outer div: tall enough to provide horizontal scroll space.
        Height = N × 100vh so (N-1) × 100vh of extra scroll drives the track.
        Inner sticky: always 100vh, stays at top.
        Track: N × 100vw wide, GSAP scrubs it left.
      */}
      <div
        ref={outerRef}
        className="hidden md:block relative bg-[#f0f0ee]"
        style={{ height: `${N * 100}vh` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen overflow-hidden bg-[#f0f0ee]"
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-black/10 z-20">
            <div
              ref={progressBarRef}
              className="h-full bg-abcs-red transition-none"
              style={{ width: "0%" }}
            />
          </div>

          {/* Section label */}
          <div className="absolute top-8 left-8 z-20">
            <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-abcs-black/30">
              05 · Expériences
            </span>
            <div className="flex gap-2 mt-3">
              {EXPERIENCES.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-0.5 transition-all duration-500 ${
                    i <= activeCard ? "bg-abcs-red" : "bg-black/15"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute top-8 right-8 z-20 opacity-30">
            <span className="font-bold text-[9px] uppercase tracking-widest">
              Défiler →
            </span>
          </div>

          {/* Horizontal track */}
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: `${N * 100}vw` }}
          >
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center px-16 xl:px-24 bg-[#f0f0ee]"
                style={{ width: "100vw", height: "100vh" }}
              >
                <div className="w-full max-w-6xl mx-auto grid grid-cols-2 gap-20 xl:gap-32 items-center">
                  {/* Left */}
                  <div className="flex flex-col gap-8">
                    <div>
                      <div className="font-heading leading-none text-abcs-black/8 select-none"
                           style={{ fontSize: "clamp(6rem, 18vw, 14rem)" }}>
                        {exp.year}
                      </div>
                      <div className="-mt-6 xl:-mt-10">
                        {exp.current && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="font-bold text-xs text-emerald-400 uppercase tracking-widest">
                              Poste actuel
                            </span>
                          </div>
                        )}
                        <h3 className="font-heading text-4xl xl:text-5xl uppercase leading-[0.88] tracking-tight mb-2">
                          {exp.title}
                        </h3>
                        <div className="text-abcs-red font-bold text-base uppercase tracking-widest">
                          @ {exp.company}
                        </div>
                        <div className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/35 mt-2">
                          {exp.period} · {exp.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map((s) => (
                        <span
                          key={s}
                          className="font-bold text-[10px] uppercase tracking-widest border border-abcs-black/20 px-3 py-1.5 hover:border-abcs-red hover:text-abcs-red transition-colors duration-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col gap-8 border-l border-black/10 pl-16 xl:pl-20">
                    <p className="font-bold text-lg text-abcs-black/70 leading-relaxed">
                      {exp.desc}
                    </p>
                    <ul className="flex flex-col gap-4">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-1 h-1 rounded-full bg-abcs-red mt-2.5 shrink-0" />
                          <span className="font-bold text-sm text-abcs-black/55 leading-relaxed">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="font-heading text-abcs-black/8 select-none mt-auto"
                         style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────── */}
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
              <div
                className="font-heading leading-none text-abcs-black/8 mb-0 select-none"
                style={{ fontSize: "clamp(4rem, 15vw, 6rem)" }}
              >
                {exp.year}
              </div>
              <div className="mt-1">
                {exp.current && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-[10px] text-emerald-400 uppercase tracking-widest">
                      Poste actuel
                    </span>
                  </div>
                )}
                <h3 className="font-heading text-2xl uppercase leading-tight mb-1">{exp.title}</h3>
                <div className="text-abcs-red font-bold text-sm uppercase tracking-widest mb-1">
                  @ {exp.company}
                </div>
                <div className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/35 mb-4">
                  {exp.period}
                </div>
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
                    <span key={s} className="font-bold text-[9px] uppercase tracking-widest border border-black/20 px-2.5 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
