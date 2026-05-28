"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useContactModal } from "@/components/ContactModalProvider";

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

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const { openModal } = useContactModal();
  const N = EXPERIENCES.length;

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) return;

      const scrollDistance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
            const card = Math.min(Math.floor(self.progress * N), N - 1);
            setActiveCard(card);
          },
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* ── DESKTOP: horizontal pin scroll ───────────────────────────── */}
      <section
        ref={sectionRef}
        id="experiences"
        className="hidden md:block relative bg-[#f0f0ee] overflow-hidden"
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
        <div className="absolute top-8 left-8 z-20 flex flex-col gap-1">
          <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-abcs-black/30">
            04 · Expériences
          </span>
          <div className="flex gap-2 mt-2">
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
        <div className="absolute top-8 right-8 z-20 flex items-center gap-2 opacity-40">
          <span className="font-bold text-[9px] uppercase tracking-widest">Défiler →</span>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-screen"
          style={{ width: `${N * 100}vw` }}
        >
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="w-screen h-screen shrink-0 flex items-center px-16 xl:px-24"
            >
              {/* Card layout: 2 columns */}
              <div className="w-full max-w-6xl mx-auto grid grid-cols-2 gap-20 xl:gap-32 items-center">

                {/* Left: year + meta */}
                <div className="flex flex-col gap-8">
                  <div>
                    <div className="font-heading text-[10rem] xl:text-[14rem] leading-none text-abcs-black/8 select-none -ml-2">
                      {exp.year}
                    </div>
                    <div className="-mt-8 xl:-mt-12">
                      {exp.current && (
                        <div className="flex items-center gap-2 mb-4">
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

                  {/* Stack */}
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

                {/* Right: desc + highlights */}
                <div className="flex flex-col gap-8 border-l border-black/10 pl-16 xl:pl-20">
                  <p className="font-bold text-lg text-abcs-black/70 leading-relaxed">
                    {exp.desc}
                  </p>
                  <ul className="flex flex-col gap-4">
                    {exp.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: j * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-1 h-1 rounded-full bg-abcs-red mt-2.5 shrink-0" />
                        <span className="font-bold text-sm text-abcs-black/55 leading-relaxed">{h}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Card number */}
                  <div className="font-heading text-7xl xl:text-8xl text-abcs-black/8 select-none mt-auto">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOBILE: vertical stack ────────────────────────────────────── */}
      <section id="experiences" className="md:hidden py-16 px-6 bg-[#f0f0ee]">
        <div className="mb-12">
          <h2 className="font-heading text-6xl uppercase leading-none tracking-tight">
            Expé-<br />riences.
          </h2>
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
              {/* Year watermark */}
              <div className="font-heading text-6xl text-abcs-black/8 leading-none mb-0 -mb-4 select-none">
                {exp.year}
              </div>
              <div className="mt-2">
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
                    <span key={s} className="font-bold text-[9px] uppercase tracking-widest border border-black/20 px-2.5 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
