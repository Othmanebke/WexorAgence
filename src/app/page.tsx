"use client";

import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CountUp from "@/components/CountUp";
import Magnetic from "@/components/Magnetic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const cyclicWords = ["convertissent", "sur-mesure", "performants", "mémorables", "visibles"];

const services = [
  { id: 1, title: "Site web sur-mesure", desc: "Design unique, responsive, optimisé SEO — développé en code ou CMS selon tes besoins et objectifs.", large: true, dark: false },
  { id: 2, title: "Refonte & optimisation", desc: "Audit UX/UI complet, optimisation des performances et refonte stratégique pour booster tes conversions.", large: false, dark: true, tall: true },
  { id: 3, title: "SEO & Référencement", desc: "Stratégie de visibilité on-page et technique pour grimper dans les résultats Google.", large: false, dark: false },
  { id: 4, title: "Flyers & supports print", desc: "Création de flyers, cartes de visite, brochures et visuels print professionnels.", large: false, dark: false, accent: true },
  { id: 5, title: "Community Management", desc: "Gestion de tes réseaux sociaux, création de contenu engageant et stratégie d'influence.", large: false, dark: false },
  { id: 6, title: "Intégration IA", desc: "Chatbots, automatisation et outils intelligents pour enrichir l'expérience de tes visiteurs.", large: true, dark: false },
];

const testimonials = []; // Removed section


const faqs = [
  { q: "Comment commencer un projet avec votre agence ?", a: "Tu peux nous contacter via le formulaire ou fixer un appel découverte. On fait un brief rapide, puis on t'envoie un devis sous 48 h." },
  { q: "Combien de temps pour un site vitrine ?", a: "Généralement 1 à 3 semaines selon le contenu et les validations." },
  { q: "Offrez-vous la gestion des réseaux sociaux ?", a: "Oui — nous proposons des packs de community management et des campagnes d'influence sur demande." },
  { q: "Proposez-vous des options de support/maintenance ?", a: "Oui, maintenance mensuelle, mises à jour et monitoring sont disponibles en option." },
];

const techLogos = ["React", "Next.js", "Vercel", "Figma", "Framer", "WordPress", "Tailwind", "SEO", "React", "Next.js", "Vercel", "Figma", "Framer", "WordPress", "Tailwind", "SEO"];

// Reusable reveal wrapper
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.96]);

  const marqueeRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  const [wordIdx, setWordIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useGSAP(() => {
    // Dynamic Marquee
    if (marqueeRef.current) {
      let direction = 1; // 1 = left, -1 = right
      const marqueeInner = marqueeRef.current.querySelector('.animate-marquee-gsap');
      
      if (marqueeInner) {
        // Use a continuous x animation
        const tween = gsap.to(marqueeInner, {
          xPercent: -50,
          repeat: -1,
          duration: 15,
          ease: "none",
        }).totalProgress(0.5);

        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (self.direction !== direction) {
              direction = self.direction;
              gsap.to(tween, { timeScale: direction, overwrite: true });
            }
            // Add a little speed bump on scroll
            gsap.to(tween, { timeScale: direction * 2.5, duration: 0.1, overwrite: true, onComplete: () => {
              gsap.to(tween, { timeScale: direction, duration: 1, ease: "power2.out", overwrite: true });
            }});
          }
        });
      }
    }

    // Bento Grid Stagger
    if (bentoRef.current) {
      const bentoItems = gsap.utils.toArray('.bento-item');
      gsap.from(bentoItems, {
        y: 150,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    }
  });

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % cyclicWords.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <main ref={heroRef} className="flex flex-col min-h-screen bg-white overflow-hidden pb-32">

      {/* ─── HERO ─── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="w-full min-h-screen flex flex-col pt-8 px-8 sticky top-0 will-change-transform"
      >
        <div className="flex flex-col lg:flex-row justify-between w-full">
          <div className="flex flex-col overflow-hidden">
            <motion.h1
              className="font-heading text-abcs-red text-[12rem] md:text-[20rem] leading-[0.75] tracking-tighter"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              WEX
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-between font-bold text-abcs-red text-xs md:text-sm tracking-widest mt-4"
            >
              <span>WEXOR AGENCE</span>
              <span>CRÉATION WEB</span>
            </motion.div>
          </div>

          <div className="flex flex-col justify-between items-end pt-12 lg:pt-8 gap-y-32">
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex gap-6 font-bold text-xl md:text-3xl tracking-tight"
            >
              {["Tarifs", "Portfolio", "Qui je suis", "Contact"].map((label, i) => {
                const hrefs = ["/tarifs", "/portfolio", "/about", "/contact"];
                return (
                  <Magnetic key={label}>
                    <a href={hrefs[i]} className="hover:text-abcs-red transition-colors relative group overflow-hidden block">
                      {label}{i < 3 ? "," : ""}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-abcs-red transition-all duration-300 group-hover:w-full" />
                    </a>
                  </Magnetic>
                );
              })}
            </motion.nav>
          </div>
        </div>

        {/* ─── CENTERED ANIMATED TAGLINE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col items-center justify-center text-center py-12"
        >
          <p className="font-heading text-3xl md:text-5xl lg:text-6xl tracking-tight text-abcs-black uppercase mb-4">
            ON CRÉE DES SITES QUI
          </p>
          {/* Big animated word - Sticker effect */}
          <div className="relative pb-12 pt-0 -mt-10 md:-mt-16">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y: 50, scale: 0.2, rotate: -25, opacity: 0 }}
                animate={{ y: 0, scale: 1.1, rotate: -5, opacity: 1 }}
                exit={{ y: -50, scale: 0.5, rotate: 10, opacity: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                className="block font-script text-abcs-red leading-none select-none drop-shadow-[0_10px_20px_rgba(255,59,0,0.2)]"
                style={{ fontSize: "clamp(80px, 16vw, 200px)" }}
              >
                {cyclicWords[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="font-bold text-sm md:text-base uppercase tracking-widest opacity-50 mt-6"
          >
            Sites sur-mesure · Refonte · SEO · Print
          </motion.p>
        </motion.div>

        {/* Stats + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-end mt-auto pb-16 gap-8"
        >
          <div className="flex gap-12">
            {[
              { end: 10, prefix: "+", label: "Clients accompagnés" },
              { end: 100, suffix: "%", label: "Satisfaction client" },
              { end: 48, suffix: "h", label: "Délai de réponse max" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-heading text-5xl text-abcs-red">
                  <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} duration={2} />
                </div>
                <div className="font-bold text-xs uppercase tracking-widest opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
          <a href="/contact" className="group bg-abcs-black text-white px-6 py-3 font-bold text-sm hover:bg-abcs-red transition-all flex items-center gap-2 uppercase tracking-widest overflow-hidden relative">
            <span className="relative z-10">Démarrer un projet</span>
            <span className="relative z-10 text-xl leading-none group-hover:translate-x-1 transition-transform">↗</span>
          </a>
        </motion.div>
      </motion.section>

      {/* ─── Content below (z-10 to sit on top of sticky hero after scroll) ─── */}
      <div className="relative z-10 bg-white">

        {/* ─── LOGO MARQUEE ─── */}
        <div ref={marqueeRef} className="w-full bg-abcs-black text-white py-4 overflow-hidden flex border-t-4 border-b-4 border-abcs-black">
          <div className="animate-marquee-gsap whitespace-nowrap font-bold tracking-widest text-sm uppercase flex gap-12 w-max">
            {[...techLogos, ...techLogos].map((t, i) => <span key={i}>{t} <span className="text-abcs-red mx-2">•</span></span>)}
          </div>
        </div>

        {/* ─── QUICK PRESENTATION ─── */}
        <section className="w-full py-32 px-8 flex flex-col items-center border-t-8 border-abcs-black bg-white overflow-hidden">
          <div className="w-full max-w-7xl flex flex-col gap-12">
            <RevealLine>
              <h2 className="font-heading text-6xl md:text-8xl lg:text-[10rem] text-abcs-black uppercase leading-[0.8] tracking-tighter">
                L&apos;AGENCE QUI <br/> <span className="text-abcs-red">PROPULSE</span> <br/> TON IMAGE.
              </h2>
            </RevealLine>
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <Reveal delay={0.2} className="w-full md:w-1/2">
                <p className="font-bold text-2xl md:text-3xl leading-snug">
                  Wexor, c&apos;est l&apos;alliance de la performance brute et d&apos;un design sur-mesure. On ne se contente pas de faire du "beau", on construit des outils de conversion.
                </p>
              </Reveal>
              <Reveal delay={0.4} className="w-full md:w-1/2">
                <p className="font-bold opacity-60 text-lg leading-relaxed">
                  Que tu sois un entrepreneur solo ou une PME, on t&apos;accompagne pour créer une présence digitale qui te ressemble vraiment. Pas de templates, pas de compromis, juste du résultat.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── SERVICES BENTO GRID ─── */}
        <section className="w-full py-32 px-8 border-t-8 border-abcs-black bg-white">
          <div ref={bentoRef} className="w-full max-w-7xl mx-auto flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-8 border-abcs-black pb-8">
              <RevealLine>
                <h2 className="font-heading text-6xl md:text-9xl text-abcs-black uppercase leading-none">
                  CE QU&apos;ON <span className="text-abcs-red">FAIT</span>
                </h2>
              </RevealLine>
              <Reveal delay={0.2}>
                <p className="max-w-xs text-sm font-bold opacity-70 mt-4 md:mt-0">Des solutions digitales complètes pour chaque étape de votre croissance.</p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
              {[
                { n: "01", title: "Site web sur-mesure", desc: "Design unique, responsive, optimisé SEO — développé en code ou CMS selon tes besoins.", stack: "React · Next.js · WordPress", span: "md:col-span-2", bg: "bg-white", shadow: "shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]", offset: "" },
                { n: "02", title: "Refonte & optim.", desc: "Audit UX/UI complet, optimisation des performances et refonte stratégique pour booster tes conversions.", stack: "", span: "md:row-span-2", bg: "bg-abcs-black text-white", shadow: "shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]", offset: "" },
                { n: "03", title: "SEO & Référencement", desc: "Visibilité on-page et technique pour grimper dans Google.", stack: "", span: "", bg: "bg-white", shadow: "shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]", offset: "" },
                { n: "04", title: "Flyers & Print", desc: "Flyers, cartes de visite, brochures et visuels print.", stack: "", span: "", bg: "bg-abcs-red text-white", shadow: "shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]", offset: "" },
                { n: "05", title: "Community Management", desc: "Réseaux sociaux, contenu engageant, stratégie d'influence.", stack: "", span: "", bg: "bg-white", shadow: "shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]", offset: "" },
                { n: "06", title: "Intégration IA", desc: "Chatbots, automatisation et outils intelligents pour enrichir l'expérience.", stack: "", span: "md:col-span-2", bg: "bg-white", shadow: "shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]", offset: "" },
              ].map((s, i) => (
                <div key={i} className={`bento-item border-8 border-abcs-black p-8 flex flex-col transition-colors h-full ${s.bg} hover:bg-abcs-black hover:text-white ${s.span} group`}>
                  <div className={`font-script text-5xl mb-2 -rotate-2 text-abcs-red`}>{s.n}</div>
                  <h3 className="font-heading text-3xl md:text-4xl uppercase mb-4">{s.title}</h3>
                  <div className="font-bold opacity-80 text-sm">{s.desc}</div>
                  {s.stack && <div className="mt-6 text-xs font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100">{s.stack}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="w-full py-32 px-8 flex flex-col items-center border-t-8 border-abcs-black bg-gray-100">
          <div className="w-full max-w-7xl flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-8 border-abcs-black pb-8">
              <RevealLine>
                <h2 className="font-heading text-6xl md:text-8xl lg:text-[9rem] text-abcs-black uppercase leading-[0.8] tracking-tighter">
                  NOTRE <br/> <span className="text-abcs-red">PROCESSUS</span>
                </h2>
              </RevealLine>
              <Reveal delay={0.2}>
                <div className="font-bold text-xl uppercase tracking-widest mt-8 md:mt-0">Comment on travaille</div>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[
                { n: "01", t: "Analyse &\nStratégie", d: "Audit complet de ton écosystème digital. On identifie les leviers, les freins, et on construit une roadmap sur-mesure." },
                { n: "02", t: "Design &\nPrototypage", d: "Maquettes haute fidélité, design system cohérent, et prototypes interactifs pour valider chaque pixel." },
                { n: "03", t: "Développement\nSur-Mesure", d: "Code propre, performant, accessible. React, Next.js, WordPress — on choisit la stack qui te correspond." },
                { n: "04", t: "Lancement &\nOptimisation", d: "Déploiement, SEO, monitoring et optimisation continue pour des résultats qui durent." },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 0.1} className={i % 2 !== 0 ? "md:mt-16" : ""}>
                  <div className="flex flex-col border-4 border-abcs-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(255,59,0,1)] hover:-translate-y-2 transition-transform">
                    <div className="font-script text-abcs-red text-6xl mb-4 -rotate-3">Étape {s.n}</div>
                    <h3 className="font-heading text-4xl uppercase mb-4 leading-none whitespace-pre-line">{s.t}</h3>
                    <p className="font-bold font-sans opacity-80">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-32 w-full flex justify-center">
              <a href="/portfolio" className="group bg-abcs-black text-white px-12 py-6 font-bold text-xl hover:bg-abcs-red transition-colors flex items-center gap-4 uppercase tracking-widest">
                NOS RÉALISATIONS
                <span className="group-hover:translate-x-1 transition-transform text-3xl leading-none">↗</span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* ─── BIG QUOTE with horizontal scroll text ─── */}
        <section className="w-full py-48 px-8 flex flex-col justify-center items-center border-t border-black/10 overflow-hidden">
          <RevealLine className="text-center max-w-5xl">
            <h2 className="font-heading text-4xl md:text-6xl lg:text-[5rem] leading-[0.9] text-abcs-black uppercase">
              Nous ne faisons pas<br/>de sites web.
            </h2>
          </RevealLine>
          <RevealLine delay={0.15} className="text-center">
            <h2 className="font-heading text-4xl md:text-6xl lg:text-[5rem] leading-[0.9] text-abcs-black uppercase">
              Nous créons des expériences qui
            </h2>
          </RevealLine>
          <Reveal delay={0.35}>
            <span className="font-script text-abcs-red text-[5rem] md:text-[10rem] leading-none -rotate-6 block mt-4">
              Transforment
            </span>
          </Reveal>
        </section>

        {/* ─── FAQ ─── */}
        <section className="w-full py-32 px-8 border-t-8 border-abcs-black bg-gray-100">
          <div className="w-full max-w-4xl mx-auto">
            <RevealLine className="mb-16">
              <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none">FAQ</h2>
            </RevealLine>
            <div className="flex flex-col gap-0">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="border-4 border-abcs-black border-b-0 last:border-b-4">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex justify-between items-center p-8 text-left hover:bg-abcs-red hover:text-white group transition-colors"
                    >
                      <span className="font-heading text-2xl md:text-3xl uppercase pr-4">{faq.q}</span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-heading text-4xl shrink-0"
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
                          <p className="px-8 pb-8 font-bold opacity-80 text-lg">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-16 flex justify-center">
              <a href="/contact" className="group bg-abcs-black text-white px-12 py-6 font-bold text-xl hover:bg-abcs-red transition-colors flex items-center gap-4 uppercase tracking-widest">
                DÉMARRER MON PROJET
                <span className="group-hover:translate-x-1 transition-transform text-3xl leading-none">↗</span>
              </a>
            </Reveal>
          </div>
        </section>

      </div>
    </main>
  );
}
