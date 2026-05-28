"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useContactModal } from "@/components/ContactModalProvider";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    n: "01",
    title: "NeuroFlow SaaS",
    cat: "Design · React · IA",
    year: "2024",
    tagline: "Interface SaaS pour analyse de données neuronales avec IA intégrée et dashboards temps réel.",
    stack: ["React", "Vite", "Tailwind", "IA"],
    img: "/portfolio/NeuroFlow-SAAS-IA-VITETailwindreact.png",
  },
  {
    n: "02",
    title: "Forma Immobilier",
    cat: "Agence · Next.js",
    year: "2024",
    tagline: "Agence immobilière avec moteur de recherche avancé, fiches biens et prise de rendez-vous.",
    stack: ["Next.js", "Tailwind", "React"],
    img: "/portfolio/FORMA-agenceimmo-NEXTtailwindReact.png",
  },
  {
    n: "03",
    title: "WonderCut",
    cat: "Concept Design · Next.js",
    year: "2024",
    tagline: "Concept design haut de gamme pour barbier urbain — réservation en ligne et branding.",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    img: "/portfolio/WONDERCUT-Concetdesignbarbeur-nexttailwinnd.png",
  },
  {
    n: "04",
    title: "LuxeCars",
    cat: "Location · React Vite",
    year: "2024",
    tagline: "Plateforme premium de location de voitures de luxe avec catalogue filtrable et réservation.",
    stack: ["React", "Vite", "Tailwind CSS"],
    img: "/portfolio/luxecarsLocationDeVoitureReactViteTailwindCss.png",
  },
  {
    n: "05",
    title: "Aivana SaaS",
    cat: "Dashboard · IA",
    year: "2024",
    tagline: "Tableau de bord SaaS intelligent avec analyses prédictives et automatisation IA.",
    stack: ["Next.js", "Tailwind", "OpenAI"],
    img: "/portfolio/AivanaFlyes-SAASdashboardIA-NextTailwind.png",
  },
  {
    n: "06",
    title: "Maison Parfumerie",
    cat: "E-commerce · Next.js",
    year: "2024",
    tagline: "Boutique e-commerce haut de gamme — catalogue produits, panier et paiement intégrés.",
    stack: ["Next.js", "React", "Tailwind"],
    img: "/portfolio/Maison-ecommerceParfumerie-reactnexttailwind.png",
  },
];

const N = PROJECTS.length;

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hudPctRef = useRef<HTMLSpanElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const { openModal } = useContactModal();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        let lastScene = -1;
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (hudPctRef.current)
              hudPctRef.current.textContent =
                String(Math.round(self.progress * 100)).padStart(3, "0") + "%";
            if (hudBarRef.current)
              hudBarRef.current.style.width = `${self.progress * 100}%`;
            const s = Math.min(Math.floor(self.progress * N), N - 1);
            if (s !== lastScene) {
              lastScene = s;
              setScene(s);
            }
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* ── DESKTOP ──────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="portfolio"
        className="hidden md:block relative bg-abcs-black"
        style={{ height: `${(N + 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* ── Background screenshot (crossfade) ─────────────────── */}
          <AnimatePresence mode="sync">
            <motion.div
              key={scene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={PROJECTS[scene].img}
                alt={PROJECTS[scene].title}
                fill
                className="object-cover object-top"
                sizes="100vw"
                priority={scene === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Left gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-abcs-black via-abcs-black/80 to-abcs-black/20 pointer-events-none" />
          {/* Top + bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-abcs-black/60 via-transparent to-abcs-black/40 pointer-events-none" />

          {/* ── Top bar ───────────────────────────────────────────── */}
          <div className="absolute top-8 left-10 right-10 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <span className="font-bold text-[10px] uppercase tracking-[0.25em] text-white/40">
                02 / Work
              </span>
              <span className="w-12 h-px bg-white/20" />
              <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/25">
                {N} projets
              </span>
            </div>
            <span
              ref={hudPctRef}
              className="font-heading text-2xl text-white/20 tabular-nums leading-none select-none"
            >
              000%
            </span>
          </div>

          {/* Progress bar — top */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 z-10">
            <div
              ref={hudBarRef}
              className="h-full bg-abcs-red transition-none"
              style={{ width: "0%" }}
            />
          </div>

          {/* ── Left info panel ───────────────────────────────────── */}
          <div className="absolute left-10 top-0 bottom-0 w-[42%] flex flex-col justify-center z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6"
              >
                {/* Thin line */}
                <div className="w-8 h-px bg-abcs-red" />

                {/* Category + year */}
                <p className="font-bold text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {PROJECTS[scene].cat} · {PROJECTS[scene].year}
                </p>

                {/* Title */}
                <h2
                  className="font-heading uppercase text-white leading-[0.88] tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 4.5vw, 5rem)" }}
                >
                  {PROJECTS[scene].title}
                </h2>

                {/* Tagline */}
                <p className="font-bold text-sm text-white/55 leading-relaxed max-w-sm">
                  {PROJECTS[scene].tagline}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {PROJECTS[scene].stack.map((s) => (
                    <span
                      key={s}
                      className="font-bold text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1.5 text-white/50 hover:border-abcs-red hover:text-abcs-red transition-colors duration-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-3 border border-white/30 px-6 py-3.5 font-bold text-xs uppercase tracking-widest text-white hover:bg-abcs-red hover:border-abcs-red transition-all duration-300 group w-fit"
                >
                  <span>Démarrer ce projet</span>
                  <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Dot navigation — right ────────────────────────────── */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            {PROJECTS.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-400 ${
                  i === scene
                    ? "w-1.5 h-4 bg-abcs-red"
                    : "w-1.5 h-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>

          {/* ── Counter — bottom right ────────────────────────────── */}
          <div className="absolute bottom-8 right-10 z-10 select-none">
            <span className="font-heading text-abcs-black/0 select-none" aria-hidden>
              {/* hidden, just for spacing */}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={scene}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-heading text-6xl text-white/10 tabular-nums leading-none"
              >
                {String(scene + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── MOBILE ────────────────────────────────────────────────────── */}
      <section id="portfolio" className="md:hidden bg-abcs-black py-16 px-6">
        <div className="mb-10">
          <h2 className="font-heading text-6xl uppercase leading-none tracking-tight text-white">
            Mes<br />travaux.
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="border border-white/10"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image src={p.img} alt={p.title} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-abcs-black/20" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-[10px] text-abcs-red">{p.n}</span>
                  <span className="font-bold text-[10px] uppercase tracking-widest text-white/35">{p.cat} · {p.year}</span>
                </div>
                <h3 className="font-heading text-2xl uppercase text-white leading-tight mb-2">{p.title}</h3>
                <p className="font-bold text-xs text-white/45 leading-relaxed mb-4">{p.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="font-bold text-[9px] uppercase tracking-widest border border-white/20 px-2.5 py-1 text-white/40">
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
