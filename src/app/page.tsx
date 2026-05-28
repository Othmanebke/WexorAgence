"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/components/LanguageContext";
import { useContactModal } from "@/components/ContactModalProvider";
import WorkSection from "@/components/WorkSection";
import ExperienceSection from "@/components/ExperienceSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import heroPhoto from "@/img/Gemini_Generated_Image_zdg0rbzdg0rbzdg0.png";
import aboutPhoto from "@/img/cravate-orange.png";

gsap.registerPlugin(ScrollTrigger);

// ─── Text Scramble Hook ───────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
function useTextScramble(target: string, trigger: boolean, duration = 1200) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = Math.ceil(duration / 16);
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " " || char === "'" || char === ".") return char;
            if (i / target.length < progress) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplay(target);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [trigger, target, duration]);
  return display;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  { n: "01", title: "Site web sur-mesure", tags: "React · Next.js · WordPress" },
  { n: "02", title: "Application Web", tags: "SaaS · Dashboard · Full Stack" },
  { n: "03", title: "E-commerce", tags: "WooCommerce · Next Commerce" },
  { n: "04", title: "Refonte & Optimisation", tags: "UX/UI · Performance · SEO" },
  { n: "05", title: "Branding & Print", tags: "Canva · Adobe · Identité" },
  { n: "06", title: "Intégration IA", tags: "Chatbots · Automatisation" },
];


const diplomes = [
  {
    level: "Bac+5",
    title: "Expert Informatique Web",
    subtitle: "Mastère spécialisé — Développement & Architecture Web",
    school: "RNCP Niveau 7",
    year: "2022",
    highlight: true,
  },
  {
    level: "Bac+4",
    title: "Master 1 — Informatique Web",
    subtitle: "Développement web avancé & architecture logicielle",
    school: "À compléter",
    year: "2021",
    highlight: false,
  },
  {
    level: "Bac+3",
    title: "Licence Professionnelle",
    subtitle: "Développement Web & Applications",
    school: "À compléter",
    year: "2020",
    highlight: false,
  },
  {
    level: "Bac+2",
    title: "BTS SIO — SLAM",
    subtitle: "Solutions Logicielles et Applications Métiers",
    school: "À compléter",
    year: "2019",
    highlight: false,
  },
  {
    level: "Bac",
    title: "Baccalauréat",
    subtitle: "Série générale",
    school: "À compléter",
    year: "2017",
    highlight: false,
  },
];

// ─── Animation helpers ───────────────────────────────────────────────────────

function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "102%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [heroReady, setHeroReady] = useState(false);
  const { t } = useLang();
  const { openModal } = useContactModal();

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const scrambledLogo = useTextScramble("OTHMANE", heroReady, 1400);
  const scrambledLastName = useTextScramble("BOUAKLINE", heroReady, 1700);

  useGSAP(() => {
    if (marqueeRef.current) {
      const inner = marqueeRef.current.querySelector(".marquee-inner");
      if (inner) {
        gsap.to(inner, {
          xPercent: -50,
          repeat: -1,
          duration: 18,
          ease: "none",
        });
      }
    }

    const rows = gsap.utils.toArray(".service-row-item");
    gsap.from(rows, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".diploma-item", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".diplomes-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <main className="flex flex-col min-h-screen bg-[#f0f0ee]" style={{ overflowX: "clip" }}>

      {/* ─── HERO ─── */}
      <section id="hero" className="w-full min-h-screen relative overflow-hidden">

        {/* LEFT — Prénom */}
        <div className="hidden md:flex absolute inset-y-0 left-0 w-[55%] flex-col justify-end px-8 xl:px-12 pb-[30%] z-[1]">
          <div className="overflow-visible">
            <motion.h1
              className="font-heading text-abcs-black leading-[0.82] tracking-tighter uppercase whitespace-nowrap"
              style={{ fontSize: "clamp(4rem, 7.5vw, 9rem)" }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {scrambledLogo}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-bold text-[10px] tracking-[0.2em] uppercase mt-3 text-abcs-black/40"
          >
            Développeur Web · Full Stack
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8"
          >
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 border border-abcs-black/20 px-5 py-2.5 font-bold text-[10px] uppercase tracking-widest hover:border-abcs-red hover:text-abcs-red transition-colors group w-fit"
            >
              <span>{t("hero_cta")}</span>
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </button>
          </motion.div>
        </div>

        {/* RIGHT — Nom de famille */}
        <div className="hidden md:flex absolute inset-y-0 right-0 w-[55%] flex-col justify-end items-end px-8 xl:px-12 pb-[32%] z-[1]">
          <div className="overflow-visible">
            <motion.h2
              className="font-heading text-abcs-black leading-[0.82] tracking-tighter uppercase whitespace-nowrap"
              style={{ fontSize: "clamp(4rem, 7.5vw, 9rem)" }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {scrambledLastName}
            </motion.h2>
          </div>
        </div>

        {/* RIGHT — Description */}
        <div className="hidden md:flex absolute bottom-[28%] right-0 w-[32%] flex-col items-start px-8 xl:px-12 z-[1]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-bold text-abcs-black/50 max-w-[240px] leading-relaxed"
          >
            {t("hero_desc").split("\n").join(" ")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="mt-5 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/40">Disponible</span>
          </motion.div>
        </div>

        {/* CENTER — Avatar */}
        <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[94%] max-w-[1500px] z-[5]">
          <Image
            src={heroPhoto}
            alt="Othmane"
            fill
            className="object-contain object-bottom"
            priority
            unoptimized
          />
        </div>

        {/* MOBILE */}
        <div className="md:hidden relative min-h-screen overflow-hidden">
          <Image src={heroPhoto} alt="Othmane" fill className="object-cover object-top" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f0ee] via-[#f0f0ee]/75 to-transparent" />
          <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-10 flex flex-col gap-3">
            <div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-heading text-abcs-black leading-[0.82] tracking-tighter uppercase"
                  style={{ fontSize: "clamp(2.8rem, 11vw, 5rem)" }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {scrambledLogo}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  className="font-heading text-abcs-black leading-[0.82] tracking-tighter uppercase"
                  style={{ fontSize: "clamp(2.8rem, 11vw, 5rem)" }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  {scrambledLastName}
                </motion.h2>
              </div>
            </div>
            <p className="font-bold text-[10px] tracking-[0.2em] uppercase text-abcs-black/40">
              Développeur Web · Full Stack
            </p>
            <p className="text-sm font-bold text-abcs-black/60 leading-relaxed max-w-[280px]">
              {t("hero_desc").split("\n").join(" ")}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 bg-abcs-black text-white px-5 py-3 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group"
              >
                <span>{t("hero_cta")}</span>
                <span className="text-base leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/40">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECH TICKER ─── */}
      <div ref={marqueeRef} className="w-full overflow-hidden border-t border-b border-black/10 py-4 bg-[#f0f0ee]">
        <div className="marquee-inner flex whitespace-nowrap gap-0 w-max">
          {[...Array(2)].map((_, repeat) => (
            <span key={repeat} className="flex items-center">
              {["HTML", "CSS", "JAVASCRIPT", "REACT", "NEXT.JS", "NODE.JS", "WORDPRESS", "FRAMER", "CANVA", "ADOBE", "FIGMA", "TYPESCRIPT"].map((tech, i) => (
                <span key={i} className="flex items-center">
                  <span className="font-heading text-abcs-black/20 text-sm uppercase tracking-[0.3em] px-6">{tech}</span>
                  <span className="text-abcs-red font-bold text-sm">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── DIVIDER 01 — QUI JE SUIS ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-8 py-4">
        <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">Qui je suis</span>
        <span className="font-heading text-white text-2xl">01</span>
      </div>

      {/* ─── QUI JE SUIS ─── */}
      <section id="about" className="w-full py-16 md:py-24 px-6 md:px-8 bg-[#f0f0ee] border-b border-black/10">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* Photo */}
          <FadeUp className="w-full sm:w-3/4 sm:mx-auto md:w-5/12 md:mx-0 shrink-0">
            <div className="relative overflow-hidden bg-abcs-black">
              <Image
                src={aboutPhoto}
                alt="Othmane Bouakline"
                width={600}
                height={700}
                className="w-full h-auto object-cover object-top scale-[1.08] origin-top"
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-abcs-red" />
              <div className="flex flex-col gap-1 absolute top-8 left-8 z-10">
                {["const dev = 'Othmane';", "const brand = \"O'ldev\";", "const style = 'brutalist';"].map((line, i) => (
                  <p key={i} className="font-mono text-xs text-white/40">
                    <span className="text-abcs-red">{line.split("=")[0]}=</span>
                    {line.split("=")[1]}
                  </p>
                ))}
              </div>
              <div className="absolute bottom-6 left-6 z-10 flex flex-wrap gap-1.5">
                {["Bac+5", "Mastère Web", "5 ans XP"].map((tag) => (
                  <span key={tag} className="font-bold text-[9px] uppercase tracking-wider border border-white/20 px-2.5 py-1 text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Texte */}
          <div className="w-full md:w-7/12 flex flex-col gap-8">
            <LineReveal>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight uppercase">
                Qui je<br />suis.
              </h2>
            </LineReveal>

            <FadeUp delay={0.2}>
              <p className="font-bold text-xl leading-snug opacity-90">
                Un développeur web freelance avec une obsession : faire des sites qui{" "}
                <span className="text-abcs-red">convertissent et durent</span>. Diplômé d&apos;un{" "}
                <span className="text-abcs-red">Bac+5 Expert Informatique Web</span>, j&apos;accompagne
                les entrepreneurs pour construire une présence digitale de haut standing.
              </p>
            </FadeUp>

            <FadeUp delay={0.35}>
              <p className="font-bold text-base opacity-55 leading-relaxed">
                Fort de 5 ans d&apos;expérience passés entre les grands comptes (Consultant ITSM & UX chez
                Fujitsu France, Développeur ServiceNow chez Inetum) et le freelance créatif, je possède
                une double vision : rigueur technique absolue et sens poussé de l&apos;esthétique.
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

            <FadeUp delay={0.6}>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-3 bg-abcs-black text-white px-7 py-4 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group w-fit"
              >
                <span>Démarrer un projet</span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </button>
            </FadeUp>
          </div>
        </div>
      </section>

      <WorkSection />

      {/* ─── DIVIDER 03 — SERVICES ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-8 py-4">
        <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">{t("services_label")}</span>
        <span className="font-heading text-white text-2xl">03</span>
      </div>

      {/* ─── SERVICES ─── */}
      <section id="services" className="services-section w-full py-16 px-6 md:px-8 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">
              {t("services_title")}
            </h2>
          </LineReveal>

          <div className="flex flex-col border-t border-black/15">
            {services.map((s, i) => (
              <button
                key={i}
                onClick={openModal}
                className="service-row-item service-row flex items-center justify-between py-7 px-0 group text-left w-full"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="font-bold text-[10px] uppercase tracking-widest opacity-40 w-6 md:w-8">{s.n}</span>
                  <span className="font-heading text-xl sm:text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight">
                    {s.title}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden md:block font-bold text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                    {s.tags}
                  </span>
                  <span className="service-arrow font-heading text-2xl leading-none transition-transform duration-200">↗</span>
                </div>
              </button>
            ))}
          </div>

          <FadeUp delay={0.4} className="mt-12">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-3 bg-abcs-black text-white px-7 py-4 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group"
            >
              <span>Démarrer un projet</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ─── DIVIDER — TECHNOLOGIES ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-8 py-4">
        <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">Stack technique</span>
        <span className="font-heading text-white text-2xl">04</span>
      </div>

      <TechnologiesSection />

      <ExperienceSection />

      {/* ─── DIVIDER 05 — DIPLÔMES ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-8 py-4">
        <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">Formation académique</span>
        <span className="font-heading text-white text-2xl">05</span>
      </div>

      {/* ─── DIPLÔMES ─── */}
      <section id="diplomes" className="diplomes-section w-full py-16 md:py-24 px-6 md:px-8 bg-abcs-black text-white">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-12 md:mb-16">
            <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">
              Diplômes
            </h2>
          </LineReveal>

          <div className="flex flex-col border-t border-white/10">
            {diplomes.map((d, i) => (
              <div
                key={i}
                className={`diploma-item flex flex-col md:flex-row gap-6 md:gap-12 items-start py-10 border-b border-white/10 group transition-colors duration-300 ${
                  d.highlight ? "hover:bg-abcs-red" : "hover:bg-white/5"
                }`}
              >
                {/* Level badge */}
                <div className="shrink-0 md:w-28">
                  <span
                    className={`inline-block font-heading text-lg uppercase px-3 py-1 border ${
                      d.highlight
                        ? "border-abcs-red text-abcs-red group-hover:border-white group-hover:text-white"
                        : "border-white/20 text-white/40"
                    } transition-colors duration-300`}
                  >
                    {d.level}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className={`font-heading text-2xl md:text-3xl uppercase leading-tight ${
                    d.highlight ? "text-white" : "text-white/80"
                  }`}>
                    {d.title}
                  </h3>
                  <p className="font-bold text-sm opacity-50 group-hover:opacity-70 transition-opacity">{d.subtitle}</p>
                  <p className={`font-bold text-xs uppercase tracking-widest mt-1 ${
                    d.highlight ? "text-abcs-red group-hover:text-white" : "text-white/30"
                  } transition-colors duration-300`}>
                    {d.school}
                  </p>
                </div>

                {/* Year */}
                <div className="shrink-0 font-heading text-4xl md:text-5xl text-white/15 group-hover:text-white/30 transition-colors duration-300">
                  {d.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="w-full bg-abcs-black text-white py-24 md:py-32 px-6 md:px-8 flex flex-col items-center text-center">
        <LineReveal className="mb-4 md:mb-6">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl lg:text-[10rem] uppercase leading-[0.85] tracking-tighter">
            {t("cta_line1")}
          </h2>
        </LineReveal>
        <LineReveal delay={0.1} className="mb-8 md:mb-6">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl lg:text-[10rem] uppercase leading-[0.85] tracking-tighter text-abcs-red">
            {t("cta_line2")}
          </h2>
        </LineReveal>
        <FadeUp delay={0.4} className="mt-12">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-4 bg-white text-abcs-black px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-colors duration-300 group"
          >
            <span>{t("cta_btn")}</span>
            <span className="text-xl leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">↗</span>
          </button>
        </FadeUp>
      </section>

    </main>
  );
}
