"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useContactModal } from "@/components/ContactModalProvider";

gsap.registerPlugin(ScrollTrigger);

// 4 featured projects (one per cube face)
const PROJECTS = [
  {
    n: "01",
    title: "NeuroFlow SaaS",
    cat: "Design · React · IA",
    year: "2024",
    tagline: "Interface SaaS pour analyse de données avec IA intégrée",
    stack: ["React", "Vite", "Tailwind", "IA"],
    img: "/portfolio/NeuroFlow-SAAS-IA-VITETailwindreact.png",
  },
  {
    n: "02",
    title: "WonderCut",
    cat: "Concept Design · Next.js",
    year: "2024",
    tagline: "Design haut de gamme pour barbier urbain",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    img: "/portfolio/WONDERCUT-Concetdesignbarbeur-nexttailwinnd.png",
  },
  {
    n: "03",
    title: "LuxeCars",
    cat: "Location · React Vite",
    year: "2024",
    tagline: "Plateforme premium de location de voitures de luxe",
    stack: ["React", "Vite", "Tailwind CSS"],
    img: "/portfolio/luxecarsLocationDeVoitureReactViteTailwindCss.png",
  },
  {
    n: "04",
    title: "Forma Immobilier",
    cat: "Agence Immo · Next.js",
    year: "2024",
    tagline: "Agence immobilière avec moteur de recherche avancé",
    stack: ["Next.js", "Tailwind", "React"],
    img: "/portfolio/FORMA-agenceimmo-NEXTtailwindReact.png",
  },
];

// Additional projects shown in the grid below the cube section
const MORE_PROJECTS = [
  { title: "Maison Verdure", cat: "Site Vitrine", img: "/portfolio/MaisonVerdure-SiteVitrineBoulangerei-HTMLCSSJS.png" },
  { title: "Aivana SaaS", cat: "Dashboard IA", img: "/portfolio/AivanaFlyes-SAASdashboardIA-NextTailwind.png" },
  { title: "Maison Parfumerie", cat: "E-commerce", img: "/portfolio/Maison-ecommerceParfumerie-reactnexttailwind.png" },
  { title: "Sora Thai", cat: "Restaurant", img: "/portfolio/SORA-RESTAUTHAI-HTMLCSSJS.png" },
  { title: "AJT Blog", cat: "Blog React", img: "/portfolio/Ajt-Blog-REACTTAILWINDnext.png" },
  { title: "Brows Creative", cat: "E-commerce WP", img: "/portfolio/BROWSCREATIVE-SalonCILS&Sourcils-WordpressWoocommerce.png" },
];

const CUBE_SIZE = 360; // desktop cube px
const HALF = CUBE_SIZE / 2;

// Scene 0 → front face (rotateY 0), Scene 1 → right (rotateY -90), etc.
const FACE_TRANSFORMS = [
  `translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
];

function ProjectInfoCard({
  project,
  onContact,
}: {
  project: (typeof PROJECTS)[0];
  onContact: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="font-bold text-xs text-abcs-red">{project.n}</span>
        <span className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/40">
          {project.cat} · {project.year}
        </span>
      </div>
      <h3 className="font-heading text-4xl md:text-5xl uppercase leading-[0.88] tracking-tight">
        {project.title}
      </h3>
      <p className="font-bold text-base text-abcs-black/60 leading-relaxed max-w-sm">
        {project.tagline}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-bold text-[10px] uppercase tracking-widest border border-abcs-black/20 px-3 py-1.5 hover:border-abcs-red hover:text-abcs-red transition-colors duration-200"
          >
            {s}
          </span>
        ))}
      </div>
      <button
        onClick={onContact}
        className="inline-flex items-center gap-2 border border-abcs-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-abcs-black hover:text-white transition-colors duration-300 group w-fit mt-1"
      >
        <span>Démarrer ce projet</span>
        <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
      </button>
    </div>
  );
}

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cubeInnerRef = useRef<HTMLDivElement>(null);
  const hudPctRef = useRef<HTMLSpanElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [scene, setScene] = useState(0);
  const { openModal } = useContactModal();
  const N = PROJECTS.length;

  // Desktop cube GSAP scrub
  useGSAP(
    () => {
      const cube = cubeInnerRef.current;
      const section = sectionRef.current;
      if (!cube || !section) return;

      let lastScene = -1;

      gsap.fromTo(
        cube,
        { rotateY: 0 },
        {
          rotateY: -(N - 1) * 90,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            onUpdate: (self) => {
              // Direct DOM updates (no React re-render)
              const pct = Math.round(self.progress * 100);
              if (hudPctRef.current) {
                hudPctRef.current.textContent =
                  String(pct).padStart(3, "0") + "%";
              }
              if (hudBarRef.current) {
                hudBarRef.current.style.width = `${self.progress * 100}%`;
              }

              const s = Math.min(Math.floor(self.progress * N), N - 1);
              if (s !== lastScene) {
                lastScene = s;
                setScene(s);
                if (counterRef.current) {
                  counterRef.current.textContent = `${String(s + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
                }
              }
            },
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* ── DESKTOP: sticky cube experience ────────────────────────────── */}
      <section
        ref={sectionRef}
        id="portfolio"
        className="hidden md:block relative bg-[#f0f0ee]"
        style={{ height: `${(N + 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Section label */}
          <div className="absolute top-8 left-8 z-10">
            <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-abcs-black/30">
              02 · Mes travaux
            </span>
          </div>

          {/* HUD — scroll pct + bar */}
          <div className="absolute top-8 right-8 z-10 flex flex-col items-end gap-2">
            <span
              ref={hudPctRef}
              className="font-heading text-5xl text-abcs-black/15 tabular-nums leading-none select-none"
            >
              000%
            </span>
            <div className="w-28 h-px bg-black/10 relative">
              <div
                ref={hudBarRef}
                className="absolute left-0 top-0 h-full bg-abcs-red"
                style={{ width: "0%" }}
              />
            </div>
            <span className="font-bold text-[9px] uppercase tracking-widest text-abcs-black/25">
              Défiler ↓
            </span>
          </div>

          {/* Main layout */}
          <div className="flex h-full items-center justify-center max-w-7xl mx-auto px-8 gap-16 xl:gap-24">

            {/* Left — project info */}
            <div className="w-[38%] shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectInfoCard project={PROJECTS[scene]} onContact={openModal} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — 3D cube */}
            <div className="flex-1 flex items-center justify-center">
              {/* Perspective wrapper */}
              <div
                style={{
                  width: CUBE_SIZE,
                  height: CUBE_SIZE,
                  perspective: CUBE_SIZE * 3.5,
                  perspectiveOrigin: "50% 50%",
                }}
              >
                {/* Cube inner — GSAP animates rotateY */}
                <div
                  ref={cubeInnerRef}
                  className="w-full h-full relative"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateY(0deg)",
                  }}
                >
                  {PROJECTS.map((p, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        transform: FACE_TRANSFORMS[i],
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover object-center"
                        sizes={`${CUBE_SIZE}px`}
                      />
                      {/* Dark overlay + red border */}
                      <div className="absolute inset-0 bg-abcs-black/30" />
                      <div className="absolute inset-0 border-2 border-abcs-red/60" />
                      {/* Project label on face */}
                      <div className="absolute bottom-4 left-4">
                        <p className="font-bold text-white text-[9px] uppercase tracking-widest opacity-70">
                          {p.n} · {p.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Counter — bottom right */}
          <div className="absolute bottom-8 right-8 z-10">
            <span
              ref={counterRef}
              className="font-heading text-2xl text-abcs-black/20 tabular-nums select-none"
            >
              01 / 04
            </span>
          </div>

          {/* Caption — bottom center */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={scene}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="font-bold text-[10px] uppercase tracking-[0.25em] text-abcs-black/25"
              >
                {PROJECTS[scene].cat}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── MOBILE: simple project stack ─────────────────────────────── */}
      <section id="portfolio" className="md:hidden py-16 px-6 bg-[#f0f0ee]">
        <div className="mb-12">
          <h2 className="font-heading text-6xl uppercase leading-none tracking-tight">
            Mes<br />travaux.
          </h2>
        </div>
        <div className="flex flex-col gap-0 border-t border-black/15">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-black/15 py-8"
            >
              <div className="relative w-full aspect-video overflow-hidden mb-5 bg-abcs-black">
                <Image src={p.img} alt={p.title} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-abcs-black/20" />
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-bold text-xs text-abcs-red">{p.n}</span>
                <span className="font-bold text-[10px] uppercase tracking-widest text-abcs-black/40">{p.cat} · {p.year}</span>
              </div>
              <h3 className="font-heading text-3xl uppercase leading-tight mb-2">{p.title}</h3>
              <p className="font-bold text-sm text-abcs-black/55 leading-relaxed mb-4">{p.tagline}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="font-bold text-[9px] uppercase tracking-widest border border-black/20 px-2.5 py-1">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ADDITIONAL PROJECTS GRID (desktop + mobile) ─────────────── */}
      <section className="w-full py-12 px-6 md:px-8 bg-[#f0f0ee] border-t border-black/10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-abcs-black/40">
              Autres projets
            </span>
            <button
              onClick={openModal}
              className="font-bold text-[10px] uppercase tracking-widest hover:text-abcs-red transition-colors"
            >
              Démarrer un projet ↗
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-black/10">
            {MORE_PROJECTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative aspect-video overflow-hidden bg-abcs-black group cursor-pointer"
                onClick={openModal}
              >
                <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                <div className="absolute inset-0 bg-abcs-black/40 group-hover:bg-abcs-black/60 transition-colors duration-300" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-heading text-white text-lg uppercase leading-tight">{p.title}</p>
                  <p className="font-bold text-white/60 text-[10px] uppercase tracking-widest mt-1">{p.cat}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
