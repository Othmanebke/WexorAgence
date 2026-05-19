"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function LineReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "102%" }} animate={inView ? { y: 0 } : {}} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}

const skills = ["HTML / CSS", "JavaScript", "React", "Next.js", "Node.js", "WordPress", "Framer", "TypeScript", "Tailwind CSS", "Canva", "Adobe CC", "Figma", "SEO", "UX Design", "Vercel"];

const timeline = [
  { period: "2018–2023", title: "Formation", desc: "Bac+5 Expert Informatique Web. Mastère spécialisé en développement & architecture web. Bases solides, projets académiques concrets.", accent: true },
  { period: "2021–2025", title: "Expérience Pro", desc: "Developer ServiceNow chez Inetum · Consultant ITSM & UX chez Fujitsu · Developer Full Stack chez AJC — 4 ans en grand compte et startups.", accent: false },
  { period: "2025–Présent", title: "Lancement O'ldev", desc: "Lancement de mon activité freelance pour accompagner TPE/PME et entrepreneurs. Design premium, code sur-mesure, relation directe sans intermédiaire.", accent: true },
];

const experiences = [
  { title: "Developer ServiceNow", company: "Inetum", period: "Sept 2025 — Présent", current: true, desc: "Développement et personnalisation de la plateforme ServiceNow : workflows, portails, intégrations API et automatisations ITSM." },
  { title: "Consultant ITSM & UX Designer", company: "Fujitsu France", period: "2023 — 2025 · 2 ans", current: false, desc: "Pilotage de projets ITSM, conception d'interfaces utilisateur et amélioration des processus IT en environnement grand compte." },
  { title: "Développeur Full Stack", company: "AJC Ingénieur", period: "2021 — 2023 · 1 an 5 mois", current: false, desc: "Conception et développement d'applications web full stack (React / Node.js), intégrations API et déploiement." },
];

const values = [
  { t: "Pragmatisme", d: "Des solutions axées sur les résultats, sans complexité inutile." },
  { t: "Transparence", d: "Budget et planning clairs dès le départ, zéro mauvaise surprise." },
  { t: "Qualité", d: "Performance, accessibilité et design au cœur de chaque livrable." },
  { t: "Partenariat", d: "Je travaille avec toi, pas juste pour toi — relation durable." },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useGSAP(() => {
    if (bigTextRef.current) {
      gsap.fromTo(bigTextRef.current,
        { xPercent: -5 },
        { xPercent: 3, ease: "none", scrollTrigger: { trigger: bigTextRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 } }
      );
    }
    gsap.from(".timeline-item", {
      x: -60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: ".timeline-section", start: "top 75%" }
    });
    gsap.from(".exp-item", {
      y: 60, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: ".exp-section", start: "top 80%" }
    });
    gsap.from(".skill-tag", {
      scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.04, ease: "back.out(1.4)",
      scrollTrigger: { trigger: ".skills-section", start: "top 80%" }
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="flex-1 flex flex-col bg-[#f0f0ee]">
      <PageHeader number="02" title="À PROPOS" subtitle={t("page_about_sub")} />

      {/* Big scrolling text */}
      <div className="w-full overflow-hidden py-8 border-b border-black/10">
        <div ref={bigTextRef} className="w-max">
          <p className="font-heading text-[#111]/[0.06] uppercase leading-none whitespace-nowrap select-none" style={{ fontSize: "clamp(6rem, 18vw, 22rem)" }}>
            OTHMANE BOUAKLINE O&apos;LDEV
          </p>
        </div>
      </div>

      {/* ─── HERO INTRO ─── */}
      <section className="w-full px-6 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* Left: portrait card */}
          <div className="md:w-5/12 shrink-0">
            <div className="relative">
              <div className="w-full aspect-[4/5] bg-abcs-black flex flex-col items-center justify-center p-10 text-center text-white">
                {/* Animated code decoration */}
                <div className="absolute top-6 left-6 flex flex-col gap-1 text-left">
                  {["// O'ldev", "const me = {", "  nom: 'Othmane',", "  stack: 'fullstack',"].map((line, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="font-mono text-[10px] text-white/20"
                    >
                      {line}
                    </motion.span>
                  ))}
                </div>
                <h2 className="font-heading text-4xl uppercase leading-none mb-4">Othmane<br />Bouakline</h2>
                <div className="font-bold text-abcs-red text-xl mb-6">Développeur Web Freelance</div>
                <p className="font-bold opacity-50 text-sm leading-relaxed">Bac+5 Expert Informatique Web<br />Mastère spécialisé architecture web</p>
                <div className="mt-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-xs uppercase tracking-widest text-emerald-400">Disponible</span>
                </div>
              </div>
              {/* Red accent */}
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-abcs-red -z-10" />
            </div>
          </div>

          {/* Right: text */}
          <div className="md:w-7/12 flex flex-col gap-8">
            <LineReveal>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-[0.85]">
                QUI JE SUIS ?
              </h1>
            </LineReveal>
            <FadeUp delay={0.2}>
              <p className="font-bold text-xl leading-snug opacity-90">
                Un développeur web freelance avec une obsession : faire des sites qui <span className="text-abcs-red">convertissent et durent</span>. Je permets aux entrepreneurs de se concentrer sur leur métier pendant que je construis une présence digitale efficace.
              </p>
            </FadeUp>
            <FadeUp delay={0.35}>
              <p className="font-bold text-base opacity-55 leading-relaxed">
                5 ans d&apos;expérience entre le grand compte (Fujitsu, Inetum) et le freelance créatif — une combinaison rare qui me permet de comprendre à la fois les enjeux techniques et business de mes clients.
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="grid grid-cols-2 gap-6 border-t border-black/15 pt-8">
                {[
                  { val: "10+", label: "Projets livrés" },
                  { val: "100%", label: "Satisfaction" },
                  { val: "48h", label: "Délai de réponse" },
                  { val: "5 ans", label: "D'expertise" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-heading text-5xl text-abcs-red">{s.val}</div>
                    <div className="font-bold text-[10px] uppercase tracking-widest opacity-50 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Stack technique</span>
        <span className="font-heading text-white text-xl md:text-2xl">01</span>
      </div>

      <section className="skills-section w-full px-6 md:px-8 py-16 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-none">COMPÉTENCES</h2>
          </LineReveal>
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <span key={s} className="skill-tag border border-black/20 px-5 py-3 font-bold text-sm uppercase tracking-widest hover:bg-abcs-black hover:text-white hover:border-abcs-black transition-colors duration-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Mon parcours</span>
        <span className="font-heading text-white text-xl md:text-2xl">02</span>
      </div>

      <section className="timeline-section w-full px-6 md:px-8 py-16 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-12 md:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-none">PARCOURS</h2>
          </LineReveal>
          <div className="flex flex-col gap-0 border-t border-black/15">
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item flex flex-col md:flex-row gap-8 py-10 border-b border-black/15 group hover:bg-abcs-red hover:text-white transition-colors duration-300 px-0 hover:px-6">
                <div className="font-heading text-3xl md:text-4xl md:w-1/3 shrink-0 leading-tight">{item.period}</div>
                <div className="md:w-2/3">
                  <h3 className="font-heading text-3xl uppercase mb-3">{item.title}</h3>
                  <p className="font-bold opacity-60 group-hover:opacity-80 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCES ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Expériences pro</span>
        <span className="font-heading text-white text-xl md:text-2xl">03</span>
      </div>

      <section className="exp-section w-full px-6 md:px-8 py-16 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-12 md:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-none">EXPÉRIENCES</h2>
          </LineReveal>
          <div className="flex flex-col gap-px bg-black/10">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-item flex flex-col md:flex-row gap-8 p-10 bg-[#f0f0ee] group hover:bg-abcs-black hover:text-white transition-colors duration-300">
                <div className="md:w-1/3">
                  <div className="font-heading text-2xl md:text-3xl uppercase leading-tight mb-2">{exp.title}</div>
                  <div className="text-abcs-red font-bold text-sm uppercase tracking-widest">@ {exp.company}</div>
                  {exp.current && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold text-xs text-emerald-400 uppercase">Poste actuel</span>
                    </div>
                  )}
                </div>
                <div className="md:w-2/3">
                  <div className="font-bold text-[10px] uppercase tracking-widest opacity-40 mb-4">{exp.period}</div>
                  <p className="font-bold opacity-70 group-hover:opacity-90 leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Ce qui me guide</span>
        <span className="font-heading text-white text-xl md:text-2xl">04</span>
      </div>

      <section className="w-full px-6 md:px-8 py-16 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-12 md:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-none">MES VALEURS</h2>
          </LineReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {values.map((v, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className={`flex flex-col p-10 h-full group hover:bg-abcs-red hover:text-white transition-colors duration-300 ${i % 3 === 1 ? "bg-abcs-black text-white" : "bg-[#f0f0ee]"}`}>
                  <span className="font-bold text-[10px] uppercase tracking-widest opacity-40 mb-6">0{i + 1}</span>
                  <h3 className="font-heading text-4xl uppercase mb-4">{v.t}</h3>
                  <p className="font-bold opacity-60 group-hover:opacity-80 leading-relaxed">{v.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-abcs-black text-white py-24 md:py-32 px-6 md:px-8 flex flex-col items-center text-center">
        <LineReveal className="mb-4">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">ON CODE</h2>
        </LineReveal>
        <LineReveal delay={0.1} className="mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter text-abcs-red">ENSEMBLE ?</h2>
        </LineReveal>
        <FadeUp delay={0.35}>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-abcs-black px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-colors group">
            <span>Démarrer un projet</span>
            <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </Link>
        </FadeUp>
      </section>
    </main>
  );
}
