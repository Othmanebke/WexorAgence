"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import StackShowcase from "@/components/StackShowcase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/components/LanguageContext";
import heroPhoto from "@/img/Gemini_Generated_Image_zdg0rbzdg0rbzdg0.png";
import aboutPhoto from "@/img/cravate orange.png";

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

const services = [
  { n: "01", title: "Site web sur-mesure", tags: "React · Next.js · WordPress" },
  { n: "02", title: "Application Web", tags: "SaaS · Dashboard · Full Stack" },
  { n: "03", title: "E-commerce", tags: "WooCommerce · Next Commerce" },
  { n: "04", title: "Refonte & Optimisation", tags: "UX/UI · Performance · SEO" },
  { n: "05", title: "Branding & Print", tags: "Canva · Adobe · Identité" },
  { n: "06", title: "Intégration IA", tags: "Chatbots · Automatisation" },
];

const faqs = [
  { q: "Comment commencer un projet ?", a: "Via le formulaire ou un appel découverte. Brief rapide, puis devis sous 48h." },
  { q: "Combien de temps pour un site vitrine ?", a: "Généralement 1 à 3 semaines selon le contenu et les validations." },
  { q: "Offres-tu la gestion des réseaux sociaux ?", a: "Oui — packs community management sur demande." },
  { q: "Proposes-tu du support & maintenance ?", a: "Oui, maintenance mensuelle, mises à jour et monitoring disponibles en option." },
];

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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bigTextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [heroReady, setHeroReady] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const scrambledLogo = useTextScramble("OTHMANE", heroReady, 1400);
  const scrambledLastName = useTextScramble("BOUAKLINE", heroReady, 1700);

  // GSAP parallax + scroll effects
  useGSAP(() => {
    if (bigTextRef.current) {
      gsap.fromTo(
        bigTextRef.current,
        { xPercent: -8 },
        {
          xPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: bigTextRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }

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
  });

  return (
    <main className="flex flex-col min-h-screen bg-[#f0f0ee] overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="w-full min-h-screen relative overflow-hidden">

        {/* ── DESKTOP : textes derrière, avatar devant ── */}

        {/* LEFT — Prénom (z derrière l'image) */}
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
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-abcs-black/20 px-5 py-2.5 font-bold text-[10px] uppercase tracking-widest hover:border-abcs-red hover:text-abcs-red transition-colors group w-fit"
            >
              <span>{t("hero_cta")}</span>
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </a>
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

        {/* RIGHT — Description au niveau du coude */}
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

        {/* CENTER — Avatar grand format, au premier plan (desktop only) */}
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

        {/* ── MOBILE : avatar plein écran, texte en overlay ── */}
        <div className="md:hidden relative min-h-screen overflow-hidden">
          {/* Avatar plein écran */}
          <Image
            src={heroPhoto}
            alt="Othmane"
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
          {/* Gradient haut pour lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f0ee] via-[#f0f0ee]/75 to-transparent" />
          {/* Texte en overlay — haut */}
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
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-abcs-black text-white px-5 py-3 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group"
              >
                <span>{t("hero_cta")}</span>
                <span className="text-base leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </a>
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

      {/* ─── BIG SCROLLING TEXT + IMAGE (Section 01) ─── */}
      <section id="about" className="w-full relative overflow-hidden py-24 border-t border-black/10">

        {/* Overflowing massive text */}
        <div ref={bigTextRef} className="w-max">
          <p
            className="font-heading text-abcs-black/10 uppercase leading-none whitespace-nowrap select-none"
            style={{ fontSize: "clamp(5rem, 20vw, 28rem)" }}
          >
            {t("about_big")}
          </p>
        </div>

        {/* Content overlay */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row gap-12 md:gap-16 items-start -mt-8 md:-mt-16 relative z-10">

          {/* Image */}
          <div className="w-full sm:w-3/4 sm:mx-auto md:w-5/12 md:mx-0 overflow-hidden relative h-[380px] sm:h-[440px] md:h-[560px] flex-shrink-0">
            <div ref={imageRef} className="w-full h-full bg-abcs-black">
              <div className="w-full h-full relative overflow-hidden">
                {/* Avatar 3D — remplit tout le bloc */}
                <Image
                  src={aboutPhoto}
                  alt="Othmane"
                  fill
                  className="object-cover object-top scale-[1.1] origin-top"
                  unoptimized
                />
                {/* Gradient sombre en bas pour lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent" />
                {/* Fashion-style code lines — en haut */}
                <div className="flex flex-col gap-1 absolute top-8 left-8 z-10">
                  {["const dev = 'Othmane';", "const brand = \"O'ldev\";", "const style = 'brutalist';", "const result = 🔥;"].map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
                      className="font-mono text-xs text-white/40"
                    >
                      <span className="text-abcs-red">{line.split("=")[0]}=</span>
                      {line.split("=")[1]}
                    </motion.p>
                  ))}
                </div>
                <p className="font-bold text-white/30 text-xs uppercase tracking-widest absolute bottom-8 left-8 z-10">O&apos;ldev Studio — 2025</p>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="w-full md:w-7/12 flex flex-col gap-0 pt-8">
            <LineReveal className="mb-10">
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight uppercase">
                Ce que<br />je fais.
              </h2>
            </LineReveal>

            {/* Prestations */}
            <div className="flex flex-col border-t border-black/15">
              {[
                { n: "01", label: "Site Vitrine · Landing · E-commerce", text: "Un site qui transforme tes visiteurs en clients — pas juste une belle carte de visite." },
                { n: "02", label: "Application Web · SaaS", text: "Je construis ton outil métier, dashboard ou plateforme — stack moderne, scalable." },
                { n: "03", label: "Refonte Web complète", text: "Ton site vieilli freine ta croissance ? Je le modernise — design, SEO, conversion." },
                { n: "04", label: "Branding · Social Media", text: "Identité visuelle sur-mesure et présence sociale qui marque les esprits." },
              ].map((item, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.1}>
                  <a href="/tarifs" className="flex items-start gap-6 py-5 border-b border-black/10 group hover:text-abcs-red transition-colors duration-200">
                    <span className="font-bold text-[10px] text-abcs-red/60 tracking-widest mt-1.5 shrink-0">{item.n}</span>
                    <div>
                      <p className="font-bold text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-70 mb-1">{item.label}</p>
                      <p className="font-bold text-base md:text-lg leading-snug">{item.text}</p>
                    </div>
                    <span className="ml-auto font-heading text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 shrink-0 mt-1">↗</span>
                  </a>
                </FadeUp>
              ))}
            </div>

            {/* Prix + CTA */}
            <FadeUp delay={0.6} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/tarifs"
                className="inline-flex items-center gap-3 bg-abcs-black text-white px-7 py-4 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group"
              >
                <span>Voir mes offres & prix</span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </a>
              <span className="font-bold text-[10px] uppercase tracking-widest opacity-40">À partir de 300€ · Devis gratuit 48h</span>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── ORANGE DIVIDER 02 ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-8 py-4">
        <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">{t("services_label")}</span>
        <span className="font-heading text-white text-2xl">02</span>
      </div>

      {/* ─── SERVICES LIST ─── */}
      <section className="services-section w-full py-16 px-6 md:px-8 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">
              {t("services_title")}
            </h2>
          </LineReveal>

          <div className="flex flex-col border-t border-black/15">
            {services.map((s, i) => (
              <a
                key={i}
                href="/tarifs"
                className="service-row-item service-row flex items-center justify-between py-7 px-0 group"
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
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE SECTION (03) ─── */}
      <section className="w-full py-24 md:py-32 px-6 md:px-8 border-t border-black/10 bg-[#f0f0ee] overflow-hidden">
        <div className="w-full max-w-5xl mx-auto">
          <LineReveal>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase">
              {t("quote_1")}
            </p>
          </LineReveal>
          <LineReveal delay={0.08}>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase">
              {t("quote_2")}
            </p>
          </LineReveal>
          <LineReveal delay={0.16}>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase">
              {t("quote_3")}
            </p>
          </LineReveal>
          <LineReveal delay={0.24}>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase">
              {t("quote_4")}
            </p>
          </LineReveal>
          <LineReveal delay={0.32}>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase text-abcs-red">
              {t("quote_5")}
            </p>
          </LineReveal>

          <FadeUp delay={0.5} className="mt-16">
            <a
              href="/tarifs"
              className="inline-flex items-center gap-3 bg-abcs-black text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group"
            >
              <span>{t("quote_cta")}</span>
              <span className="text-xl leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">↗</span>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ─── ORANGE DIVIDER 04 ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-8 py-4">
        <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">{t("portfolio_label")}</span>
        <span className="font-heading text-white text-2xl">04</span>
      </div>

      {/* ─── PORTFOLIO GRID ─── */}
      <section
        className="w-full py-16 px-6 md:px-8 bg-[#f0f0ee] relative"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">
              {t("portfolio_title")}
            </h2>
          </LineReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {[
              { title: "NeuroFlow SaaS",  cat: "Design · React · IA",       year: "2024", img: "/portfolio/NeuroFlow-SAAS-IA-VITETailwindreact.png" },
              { title: "Maison Verdure",  cat: "Site Vitrine · HTML/CSS",    year: "2024", img: "/portfolio/MaisonVerdure-SiteVitrineBoulangerei-HTMLCSSJS.png" },
              { title: "WonderCut",       cat: "Concept Design · Next.js",   year: "2024", img: "/portfolio/WONDERCUT-Concetdesignbarbeur-nexttailwinnd.png" },
              { title: "LuxeCars",        cat: "Location · React Vite",      year: "2024", img: "/portfolio/luxecarsLocationDeVoitureReactViteTailwindCss.png" },
            ].map((p, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <a
                  href="/portfolio"
                  className="group block bg-[#f0f0ee] p-8 h-64 flex flex-col justify-between hover:bg-abcs-black hover:text-white transition-colors duration-300"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-60">0{i + 1}</span>
                    <span className="font-heading text-2xl leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">↗</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl uppercase leading-tight mb-2">{p.title}</h3>
                    <p className="font-bold text-xs uppercase tracking-widest opacity-40">{p.cat} · {p.year}</p>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="mt-12 flex justify-center">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-3 border border-abcs-black px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-abcs-black hover:text-white transition-colors duration-300 group"
            >
              <span>{t("portfolio_cta")}</span>
              <span className="text-xl leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          </FadeUp>
        </div>

        {/* Image flottante qui suit la souris */}
        <div
          className="hidden lg:block fixed pointer-events-none z-40 w-64 h-44 overflow-hidden"
          style={{ left: mousePos.x + 24, top: mousePos.y - 88 }}
        >
          {[
            "/portfolio/NeuroFlow-SAAS-IA-VITETailwindreact.png",
            "/portfolio/MaisonVerdure-SiteVitrineBoulangerei-HTMLCSSJS.png",
            "/portfolio/WONDERCUT-Concetdesignbarbeur-nexttailwinnd.png",
            "/portfolio/luxecarsLocationDeVoitureReactViteTailwindCss.png",
          ].map((img, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: hoveredCard === i ? 1 : 0, scale: hoveredCard === i ? 1 : 0.92, y: hoveredCard === i ? 0 : 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={img} alt="" fill className="object-cover object-top" sizes="256px" />
              <div className="absolute inset-0 bg-abcs-black/10" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── PROCESSUS ─── */}
      <section className="w-full py-16 md:py-24 px-6 md:px-8 border-t border-black/10 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Orange banner 05 */}
          <div className="flex items-center justify-between bg-abcs-red text-white px-6 py-4 mb-16">
            <span className="font-bold text-xs uppercase tracking-[0.2em]">{t("process_label")}</span>
            <span className="font-heading text-2xl">05</span>
          </div>

          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">
              {t("process_title")}
            </h2>
          </LineReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-black/15">
            {[
              { n: "01", t: "Analyse & Brief", d: "On cerne tes besoins, ta cible et tes objectifs. Brief complet, puis roadmap claire et budget défini en 48h." },
              { n: "02", t: "Design & Maquette", d: "Maquettes haute fidélité, design system cohérent. Chaque pixel est pensé pour l'impact et la conversion." },
              { n: "03", t: "Développement", d: "Code propre, performant, accessible. React, Next.js, WordPress — la stack qui te correspond." },
              { n: "04", t: "Lancement & Suivi", d: "Déploiement, SEO technique, monitoring et optimisation continue. Je reste dispo après la livraison." },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="border-b border-r border-black/15 p-8 md:p-12 flex flex-col gap-6 h-full hover:bg-abcs-red hover:text-white transition-colors duration-300 group">
                  <span className="font-bold text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-70">{s.n}</span>
                  <h3 className="font-heading text-3xl md:text-4xl uppercase leading-tight">{s.t}</h3>
                  <p className="font-bold text-sm opacity-60 group-hover:opacity-80 leading-relaxed">{s.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STACK SHOWCASE ─── */}
      <StackShowcase />

      {/* ─── FAQ ─── */}
      <section className="w-full py-16 md:py-24 px-6 md:px-8 border-t border-black/10">
        <div className="w-full max-w-5xl mx-auto">
          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">FAQ</h2>
          </LineReveal>

          <div className="flex flex-col border-t border-black/15">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-black/15">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-7 text-left hover:text-abcs-red transition-colors group"
                >
                  <span className="font-heading text-xl md:text-3xl uppercase pr-8 leading-tight">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-heading text-3xl leading-none flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 font-bold text-base opacity-60 leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          <a
            href="/contact"
            className="inline-flex items-center gap-4 bg-white text-abcs-black px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-colors duration-300 group"
          >
            <span>{t("cta_btn")}</span>
            <span className="text-xl leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">↗</span>
          </a>
        </FadeUp>
      </section>

    </main>
  );
}
