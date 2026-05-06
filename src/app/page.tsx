"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CountUp from "@/components/CountUp";
import StackShowcase from "@/components/StackShowcase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Tarifs", href: "/tarifs" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Qui je suis", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { n: "01", title: "Site web sur-mesure", tags: "React · Next.js · WordPress" },
  { n: "02", title: "Refonte & Optimisation", tags: "UX/UI · Performance" },
  { n: "03", title: "SEO & Référencement", tags: "On-page · Technique" },
  { n: "04", title: "Flyers & Print", tags: "Figma · Adobe" },
  { n: "05", title: "Community Management", tags: "Instagram · LinkedIn" },
  { n: "06", title: "Intégration IA", tags: "Chatbots · Automatisation" },
];

const faqs = [
  { q: "Comment commencer un projet ?", a: "Via le formulaire ou un appel découverte. Brief rapide, puis devis sous 48 h." },
  { q: "Combien de temps pour un site vitrine ?", a: "Généralement 1 à 3 semaines selon le contenu et les validations." },
  { q: "Offrez-vous la gestion des réseaux sociaux ?", a: "Oui — packs community management et campagnes d'influence sur demande." },
  { q: "Proposez-vous du support & maintenance ?", a: "Oui, maintenance mensuelle, mises à jour et monitoring disponibles en option." },
];

// Clip-reveal for a single line of text
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
  const bigTextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // GSAP parallax + scroll effects
  useGSAP(() => {
    // Big overflowing text parallax
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

    // Image parallax
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

    // Marquee
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

    // Service rows stagger reveal
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
      <section className="w-full min-h-screen flex flex-col px-8 pt-8 pb-0 relative">

        {/* Top row: Logo + Nav */}
        <div className="flex items-start justify-between w-full">

          {/* Logo block */}
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <motion.h1
                className="font-heading text-abcs-red leading-[0.82] tracking-tighter select-none"
                style={{ fontSize: "clamp(7rem, 18vw, 22rem)" }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                WEX
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex justify-between font-bold text-abcs-red text-[10px] md:text-xs tracking-[0.2em] uppercase mt-3"
            >
              <span>WEXOR AGENCE</span>
              <span>CRÉATION WEB</span>
            </motion.div>
          </div>

          {/* Nav — comma separated */}
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex items-center gap-1 font-bold text-lg md:text-2xl lg:text-3xl tracking-tight pt-2"
          >
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <a
                  href={link.href}
                  className="hover:text-abcs-red transition-colors duration-200"
                >
                  {link.label}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-abcs-black/40 mr-1">,</span>
                )}
              </span>
            ))}
          </motion.nav>

          {/* Mobile nav toggle placeholder */}
          <motion.a
            href="/contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="md:hidden font-bold text-xs uppercase tracking-widest border border-abcs-black px-4 py-2 hover:bg-abcs-black hover:text-white transition-colors"
          >
            Menu
          </motion.a>
        </div>

        {/* Center / Right tagline */}
        <div className="flex-1 flex flex-col md:flex-row items-end md:items-center justify-between mt-8 md:mt-0 pb-16 gap-12">

          {/* Bottom-left description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base font-bold opacity-60 max-w-[280px] leading-relaxed self-end md:self-auto"
          >
            Développé pour les marques
            <br />ambitieuses qui refusent le
            <br />compromis.
          </motion.p>

          {/* Right block: tagline + CTA + orange banner */}
          <div className="flex flex-col items-start md:items-start gap-8 max-w-xl">
            <div className="overflow-hidden">
              <motion.h2
                className="font-heading text-3xl md:text-5xl lg:text-6xl leading-[1.0] tracking-tight text-abcs-black"
                initial={{ y: "102%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                L&apos;agence qui transforme
                <br />ton image en
                <br /><span className="text-abcs-red">machine de guerre.</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-abcs-black text-white px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group"
              >
                <span>Nous découvrir</span>
                <span className="text-lg leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">↗</span>
              </a>

              {/* Numbered orange banner */}
              <a
                href="#about"
                className="flex items-center justify-between bg-abcs-red text-white px-6 py-3 font-bold text-xs uppercase tracking-[0.15em] w-full hover:bg-abcs-black transition-colors duration-300 group"
              >
                <span>Notre approche — Qui on est</span>
                <span className="font-heading text-2xl leading-none group-hover:translate-x-1 transition-transform">01</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BIG SCROLLING TEXT + IMAGE (Section 01) ─── */}
      <section id="about" className="w-full relative overflow-hidden py-24 border-t border-black/10">

        {/* Overflowing massive text */}
        <div ref={bigTextRef} className="w-max">
          <p
            className="font-heading text-abcs-black/10 uppercase leading-none whitespace-nowrap select-none"
            style={{ fontSize: "clamp(8rem, 22vw, 28rem)" }}
          >
            ON A GRANDI POUR TES PROJETS
          </p>
        </div>

        {/* Content overlay */}
        <div className="w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-16 items-start -mt-16 relative z-10">

          {/* Image */}
          <div className="w-full md:w-5/12 overflow-hidden relative h-[420px] md:h-[560px] flex-shrink-0">
            <div ref={imageRef} className="w-full h-full bg-abcs-black">
              {/* Placeholder image avec gradient */}
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#333] flex items-end p-8">
                <p className="font-bold text-white/30 text-xs uppercase tracking-widest">Wexor Studio — 2024</p>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="w-full md:w-7/12 flex flex-col gap-8 pt-8">
            <LineReveal>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight uppercase">
                Wexor,<br />c&apos;est quoi ?
              </h2>
            </LineReveal>

            <FadeUp delay={0.2}>
              <p className="font-bold text-xl md:text-2xl leading-snug opacity-90">
                Une agence web fondée sur une obsession :
                faire des sites qui <em>convertissent</em>, pas juste des sites
                qui font beau.
              </p>
            </FadeUp>

            <FadeUp delay={0.35}>
              <p className="font-bold text-base opacity-55 leading-relaxed max-w-md">
                Du code propre. Du design sur-mesure. Une stratégie pensée pour
                tes objectifs — pas pour les nôtres. Pas de templates, pas de
                copier-coller, juste du résultat.
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="flex gap-12 pt-4 border-t border-black/15">
                {[
                  { end: 10, prefix: "+", label: "Clients accompagnés" },
                  { end: 100, suffix: "%", label: "Satisfaction" },
                  { end: 48, suffix: "h", label: "Délai de réponse" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-heading text-4xl md:text-5xl text-abcs-red">
                      <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} duration={2} />
                    </div>
                    <div className="font-bold text-[10px] uppercase tracking-widest opacity-50 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── ORANGE DIVIDER 02 ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-8 py-4">
        <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">Ce qu&apos;on fait</span>
        <span className="font-heading text-white text-2xl">02</span>
      </div>

      {/* ─── SERVICES LIST ─── */}
      <section className="services-section w-full py-16 px-8 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">
              NOS SERVICES
            </h2>
          </LineReveal>

          <div className="flex flex-col border-t border-black/15">
            {services.map((s, i) => (
              <a
                key={i}
                href="/tarifs"
                className="service-row-item service-row flex items-center justify-between py-7 px-0 group"
              >
                <div className="flex items-center gap-8">
                  <span className="font-bold text-[10px] uppercase tracking-widest opacity-40 w-8">{s.n}</span>
                  <span className="font-heading text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight">
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
      <section className="w-full py-32 px-8 border-t border-black/10 bg-[#f0f0ee] overflow-hidden">
        <div className="w-full max-w-5xl mx-auto">
          <LineReveal>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase">
              Code propre
            </p>
          </LineReveal>
          <LineReveal delay={0.08}>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase">
              et design sur-mesure.
            </p>
          </LineReveal>
          <LineReveal delay={0.16}>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase">
              SEO et performances.
            </p>
          </LineReveal>
          <LineReveal delay={0.24}>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase">
              Notre langage est intentionnel,
            </p>
          </LineReveal>
          <LineReveal delay={0.32}>
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] uppercase text-abcs-red">
              construit pour convertir.
            </p>
          </LineReveal>

          <FadeUp delay={0.5} className="mt-16">
            <a
              href="/tarifs"
              className="inline-flex items-center gap-3 bg-abcs-black text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group"
            >
              <span>Voir nos tarifs</span>
              <span className="text-xl leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">↗</span>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ─── ORANGE DIVIDER 04 ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-8 py-4">
        <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">Nos réalisations</span>
        <span className="font-heading text-white text-2xl">04</span>
      </div>

      {/* ─── PORTFOLIO GRID ─── */}
      <section className="w-full py-16 px-8 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">
              PORTFOLIO
            </h2>
          </LineReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {[
              { title: "NeuroFlow SaaS", cat: "Design · React · IA", year: "2024" },
              { title: "Maison Verdure", cat: "Site Vitrine · HTML/CSS", year: "2024" },
              { title: "WonderCut", cat: "Concept Design · Next.js", year: "2024" },
              { title: "LuxeCars", cat: "Location · React Vite", year: "2024" },
            ].map((p, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <a
                  href="/portfolio"
                  className="group block bg-[#f0f0ee] p-8 h-64 flex flex-col justify-between hover:bg-abcs-black hover:text-white transition-colors duration-300 cursor-none"
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
              <span>Voir tous les projets</span>
              <span className="text-xl leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ─── PROCESSUS ─── */}
      <section className="w-full py-24 px-8 border-t border-black/10 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Orange banner 05 */}
          <div className="flex items-center justify-between bg-abcs-red text-white px-6 py-4 mb-16">
            <span className="font-bold text-xs uppercase tracking-[0.2em]">Comment on travaille</span>
            <span className="font-heading text-2xl">05</span>
          </div>

          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">
              PROCESSUS
            </h2>
          </LineReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-black/15">
            {[
              { n: "01", t: "Analyse & Stratégie", d: "Audit complet. On identifie les leviers, les freins, et on construit une roadmap sur-mesure." },
              { n: "02", t: "Design & Prototypage", d: "Maquettes haute fidélité, design system cohérent, prototypes interactifs pour valider chaque pixel." },
              { n: "03", t: "Développement", d: "Code propre, performant, accessible. React, Next.js, WordPress — la stack qui te correspond." },
              { n: "04", t: "Lancement & Suivi", d: "Déploiement, SEO, monitoring et optimisation continue pour des résultats qui durent." },
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
      <section className="w-full py-24 px-8 border-t border-black/10">
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
      <section className="w-full bg-abcs-black text-white py-32 px-8 flex flex-col items-center text-center">
        <LineReveal className="mb-6">
          <h2 className="font-heading text-5xl md:text-8xl lg:text-[10rem] uppercase leading-[0.85] tracking-tighter">
            ON CRÉE
          </h2>
        </LineReveal>
        <LineReveal delay={0.1} className="mb-6">
          <h2 className="font-heading text-5xl md:text-8xl lg:text-[10rem] uppercase leading-[0.85] tracking-tighter text-abcs-red">
            ENSEMBLE ?
          </h2>
        </LineReveal>
        <FadeUp delay={0.4} className="mt-12">
          <a
            href="/contact"
            className="inline-flex items-center gap-4 bg-white text-abcs-black px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-colors duration-300 group"
          >
            <span>Démarrer un projet</span>
            <span className="text-xl leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">↗</span>
          </a>
        </FadeUp>
      </section>

    </main>
  );
}
