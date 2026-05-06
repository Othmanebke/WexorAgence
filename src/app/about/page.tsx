"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skills = ["React / Next.js", "Node.js", "Intelligence Artificielle", "ServiceNow", "TypeScript", "Tailwind CSS", "HTML / CSS", "WordPress", "UX Design", "ITSM", "SEO", "Figma", "Vercel"];

const values = [
  { t: "Pragmatisme", d: "Des solutions axées sur les résultats, sans complexité inutile." },
  { t: "Transparence", d: "Budget et planning clairs dès le départ, zéro mauvaise surprise." },
  { t: "Qualité", d: "Performance, accessibilité et design au cœur de chaque livrable." },
  { t: "Partenariat", d: "On travaille avec toi, pas juste pour toi — relation durable." },
];

const experiences = [
  { title: "Developer ServiceNow", company: "Inetum", period: "Sept 2025 — Présent", current: true, desc: "Développement et personnalisation de la plateforme ServiceNow : workflows, portails, intégrations API et automatisations ITSM." },
  { title: "Consultant ITSM & UX Designer", company: "Fujitsu France", period: "2023 — 2025 · 2 ans", current: false, desc: "Pilotage de projets ITSM, conception d'interfaces utilisateur et amélioration des processus IT en environnement grand compte." },
  { title: "Développeur Full Stack", company: "AJC Ingénieur", period: "2021 — 2023 · 1 an 5 mois", current: false, desc: "Conception et développement d'applications web full stack (React / Node.js), intégrations API et déploiement." },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Timeline animation
    const timelineItems = gsap.utils.toArray('.timeline-item');
    gsap.from(timelineItems, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".timeline-section",
        start: "top 75%",
      }
    });

    // Experiences reveal
    const expItems = gsap.utils.toArray('.exp-item');
    gsap.from(expItems, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".exp-section",
        start: "top 80%",
      }
    });

    // Values reveal
    const valueItems = gsap.utils.toArray('.value-item');
    gsap.from(valueItems, {
      scale: 0.9,
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".values-section",
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="flex-1 flex flex-col items-center px-0 pb-32 overflow-hidden bg-white">
      <PageHeader />
      <div className="w-full flex flex-col items-center px-8 pt-16">
      
      {/* ─── HERO PROFILE ─── */}
      <motion.div
        className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-16 mb-32"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="w-full md:w-1/2 flex justify-center relative shrink-0">
          <div className="absolute -inset-4 bg-abcs-red z-0 rotate-3"></div>
          <div className="relative w-full aspect-square border-8 border-abcs-black shadow-[16px_16px_0px_0px_rgba(17,17,17,1)] -rotate-3 bg-gray-100 z-10 flex flex-col items-center justify-center p-8 text-center">
            <h2 className="font-heading text-5xl uppercase leading-none">Othmane Bouakline</h2>
            <div className="font-script text-abcs-red text-5xl mt-4">Fondateur & Dev</div>
            <p className="mt-6 font-bold font-sans opacity-80">Bac+5 Expert Informatique Web<br/>Mastère spécialisé en architecture web</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-xs uppercase tracking-widest text-emerald-600">Disponible</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col z-20">
          <h1 className="font-heading text-6xl md:text-8xl text-abcs-black uppercase mb-6 leading-none">
            QUI JE <span className="text-abcs-red font-script normal-case ml-4 text-7xl">Suis ?</span>
          </h1>
          <p className="font-sans text-xl font-bold leading-relaxed mb-8 opacity-90">
            On ne crée pas des sites. On construit des <span className="text-abcs-red">leviers de croissance</span>. Je permets aux entrepreneurs de se concentrer sur leur métier pendant que je construis une présence digitale efficace et durable.
          </p>

          <div className="grid grid-cols-2 gap-6 border-t-4 border-abcs-black pt-8 mb-8">
            <div><div className="font-heading text-6xl text-abcs-red">50+</div><div className="font-bold uppercase tracking-widest text-xs">Projets livrés</div></div>
            <div><div className="font-heading text-6xl text-abcs-red">100%</div><div className="font-bold uppercase tracking-widest text-xs">Satisfaction</div></div>
            <div><div className="font-heading text-6xl text-abcs-red">48h</div><div className="font-bold uppercase tracking-widest text-xs">Délai de réponse</div></div>
            <div><div className="font-heading text-6xl text-abcs-red">5 ans</div><div className="font-bold uppercase tracking-widest text-xs">D&apos;expertise</div></div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <span key={s} className="border-4 border-abcs-black px-3 py-2 font-bold text-xs uppercase shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:bg-abcs-black hover:text-white transition-colors cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── TIMELINE PARCOURS ─── */}
      <section className="timeline-section w-full max-w-6xl border-t-8 border-abcs-black pt-24 mb-32">
        <h2 className="font-heading text-7xl md:text-9xl text-abcs-black uppercase mb-16 text-center">PARCOURS</h2>
        <div className="flex flex-col gap-16 w-full max-w-4xl mx-auto">
          {[
            { period: "2018-2023", title: "Formation", desc: "Bac+5 Expert Informatique Web · Mastère spécialisé en développement & architecture web. Bases solides, projets académiques concrets.", red: true },
            { period: "2021-2025", title: "Expérience Pro", desc: "Developer ServiceNow chez Inetum · Consultant ITSM & UX chez Fujitsu · Developer Full Stack chez AJC — 4 ans en grand compte et startups.", red: false },
            { period: "2025-PRÉSENT", title: "Création de Wexor", desc: "Fondation de l'agence digitale pour accompagner les TPE/PME. Design premium, code sur-mesure, relation directe sans intermédiaire.", red: true },
          ].map((item, i) => (
            <div key={i} className={`timeline-item flex flex-col md:flex-row gap-8 border-l-8 pl-8 ${item.red ? "border-abcs-red" : "border-abcs-black"}`}>
              <div className="font-heading text-4xl md:text-5xl md:w-1/3 shrink-0">{item.period}</div>
              <div className="md:w-2/3">
                <h3 className="font-bold text-2xl mb-2 uppercase">{item.title}</h3>
                <p className="font-sans font-bold opacity-80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EXPERIENCES ─── */}
      <section className="exp-section w-full max-w-6xl border-t-8 border-abcs-black pt-24 mb-32">
        <h2 className="font-heading text-7xl md:text-9xl text-abcs-black uppercase mb-16 text-center">EXPÉRIENCES</h2>
        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <div key={i} className="exp-item flex flex-col md:flex-row gap-8 p-8 border-4 border-abcs-black shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] bg-white hover:-translate-y-1 transition-transform">
              <div className="md:w-1/3">
                <div className="font-heading text-3xl uppercase leading-none mb-2">{exp.title}</div>
                <div className="text-abcs-red font-bold uppercase tracking-widest text-sm">@ {exp.company}</div>
                {exp.current && <div className="mt-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="font-bold text-xs text-emerald-600 uppercase">Poste actuel</span></div>}
              </div>
              <div className="md:w-2/3">
                <div className="font-bold text-xs uppercase tracking-widest opacity-50 mb-4">{exp.period}</div>
                <p className="font-bold opacity-80">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="values-section w-full max-w-6xl border-t-8 border-abcs-black pt-24">
        <h2 className="font-heading text-7xl md:text-9xl text-abcs-black uppercase mb-16 text-center">
          NOS <span className="text-abcs-red">VALEURS</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <div key={i} className={`value-item p-8 border-8 border-abcs-black hover:-translate-y-2 transition-transform ${i % 3 === 1 ? "bg-abcs-black text-white shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]" : "bg-white shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]"}`}>
              <div className="font-script text-abcs-red text-5xl mb-4 -rotate-2">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-heading text-4xl uppercase mb-4">{v.t}</h3>
              <p className={`font-bold ${i % 3 === 1 ? "opacity-80" : "opacity-70"}`}>{v.d}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </main>
  );
}
