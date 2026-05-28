"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useContactModal } from "@/components/ContactModalProvider";

gsap.registerPlugin(ScrollTrigger);

const ALL_PROJECTS = [
  { n: "01", title: "NeuroFlow SaaS",     cat: "Design · React · IA",       year: "2024", tagline: "Interface SaaS pour analyse de données neuronales avec IA intégrée.",           stack: ["React", "Vite", "Tailwind", "IA"],         img: "/portfolio/NeuroFlow-SAAS-IA-VITETailwindreact.png" },
  { n: "02", title: "Forma Immobilier",   cat: "Agence · Next.js",           year: "2024", tagline: "Agence immobilière avec moteur de recherche avancé et fiches biens.",           stack: ["Next.js", "Tailwind", "React"],             img: "/portfolio/FORMA-agenceimmo-NEXTtailwindReact.png" },
  { n: "03", title: "WonderCut",          cat: "Concept · Next.js",          year: "2024", tagline: "Design haut de gamme pour barbier urbain — réservation en ligne.",              stack: ["Next.js", "Tailwind", "Framer"],            img: "/portfolio/WONDERCUT-Concetdesignbarbeur-nexttailwinnd.png" },
  { n: "04", title: "LuxeCars",           cat: "Location · React",           year: "2024", tagline: "Plateforme premium de location de voitures de luxe avec catalogue filtrable.",  stack: ["React", "Vite", "Tailwind CSS"],            img: "/portfolio/luxecarsLocationDeVoitureReactViteTailwindCss.png" },
  { n: "05", title: "Aivana SaaS",        cat: "Dashboard · IA",             year: "2024", tagline: "Tableau de bord SaaS intelligent avec analyses prédictives et automatisation.", stack: ["Next.js", "Tailwind", "OpenAI"],            img: "/portfolio/AivanaFlyes-SAASdashboardIA-NextTailwind.png" },
  { n: "06", title: "Maison Parfumerie",  cat: "E-commerce · Next.js",       year: "2024", tagline: "Boutique e-commerce haut de gamme — catalogue, panier et paiement intégrés.",  stack: ["Next.js", "React", "Tailwind"],             img: "/portfolio/Maison-ecommerceParfumerie-reactnexttailwind.png" },
  { n: "07", title: "Maison Verdure",     cat: "Site Vitrine · HTML/CSS",    year: "2024", tagline: "Site premium pour une boulangerie artisanale — menu, histoire et commandes.",   stack: ["HTML", "CSS", "JavaScript"],               img: "/portfolio/MaisonVerdure-SiteVitrineBoulangerei-HTMLCSSJS.png" },
  { n: "08", title: "Sora Thai",          cat: "Restaurant · HTML/CSS",      year: "2024", tagline: "Site vitrine élégant pour restaurant thaïlandais — carte et réservation.",      stack: ["HTML", "CSS", "JS"],                       img: "/portfolio/SORA-RESTAUTHAI-HTMLCSSJS.png" },
  { n: "09", title: "AJT Blog",           cat: "Blog · React",               year: "2024", tagline: "Blog moderne avec système d'articles, recherche et catégories dynamiques.",     stack: ["React", "Next.js", "Tailwind"],             img: "/portfolio/Ajt-Blog-REACTTAILWINDnext.png" },
  { n: "10", title: "Brows Creative",     cat: "E-commerce · WordPress",     year: "2024", tagline: "Boutique WooCommerce pour salon de beauté — soins, réservations, boutique.",   stack: ["WordPress", "WooCommerce", "Elementor"],   img: "/portfolio/BROWSCREATIVE-SalonCILS&Sourcils-WordpressWoocommerce.png" },
];

const N = ALL_PROJECTS.length;

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hudPctRef = useRef<HTMLSpanElement>(null);
  const [scene, setScene] = useState(0);
  const { openModal } = useContactModal();

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      let lastScene = -1;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${(N - 1) * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (hudPctRef.current)
            hudPctRef.current.textContent =
              String(Math.round(self.progress * 100)).padStart(3, "0") + "%";
          const s = Math.min(Math.round(self.progress * (N - 1)), N - 1);
          if (s !== lastScene) {
            lastScene = s;
            setScene(s);
          }
        },
      });

      requestAnimationFrame(() => {
        const spacer = section.parentElement;
        if (spacer) spacer.style.backgroundColor = "#111111";
      });
    });
  });

  const p = ALL_PROJECTS[scene];

  return (
    <>
      {/* ── DESKTOP ─────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="portfolio"
        className="hidden md:block relative bg-abcs-black h-screen overflow-hidden"
      >
        {/* Top bar */}
        <div className="absolute top-6 left-8 right-8 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[10px] uppercase tracking-[0.25em] text-white/35">02 / Work</span>
            <span className="w-10 h-px bg-white/15" />
            <span className="font-bold text-[10px] uppercase tracking-widest text-white/20">{N} projets</span>
          </div>
          <span ref={hudPctRef} className="font-heading text-xl text-white/15 tabular-nums select-none">
            000%
          </span>
        </div>

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 z-30 pointer-events-none">
          <motion.div
            className="h-full bg-abcs-red"
            animate={{ width: `${(scene / (N - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* ── Left info panel ──────────────────────────────────────── */}
        <div className="absolute left-0 top-0 bottom-0 w-[36%] flex flex-col justify-center pl-10 pr-6 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5"
            >
              {/* Separator + category */}
              <div>
                <div className="w-6 h-px bg-abcs-red mb-4" />
                <p className="font-bold text-[10px] uppercase tracking-[0.25em] text-white/35">
                  {p.cat} · {p.year}
                </p>
              </div>

              {/* Title */}
              <h2
                className="font-heading uppercase text-white leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.8rem)" }}
              >
                {p.title}
              </h2>

              {/* Tagline */}
              <p className="font-bold text-sm text-white/45 leading-relaxed max-w-xs">
                {p.tagline}
              </p>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-bold text-[10px] uppercase tracking-widest border border-white/15 px-3 py-1.5 text-white/40 hover:border-abcs-red hover:text-abcs-red transition-colors duration-200"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={openModal}
                className="inline-flex items-center gap-3 border border-white/25 px-5 py-3 font-bold text-xs uppercase tracking-widest text-white hover:bg-abcs-red hover:border-abcs-red transition-all duration-300 group w-fit mt-1"
              >
                <span>Démarrer ce projet</span>
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Central screenshot frame ──────────────────────────────── */}
        <div className="absolute top-12 bottom-12 right-6 left-[37%] border border-white/10 overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={scene}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover object-top"
                sizes="65vw"
                priority={scene === 0}
              />
              <div className="absolute inset-0 bg-abcs-black/15" />
            </motion.div>
          </AnimatePresence>

          {/* Frame project number — bottom right inside frame */}
          <div className="absolute bottom-4 right-5 z-10 pointer-events-none select-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={scene}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-heading text-white/20 text-lg tabular-nums"
              >
                {p.n} / {String(N).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Large category label — bottom below frame ────────────── */}
        <div className="absolute bottom-2 left-[37%] right-6 flex justify-center overflow-hidden pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={scene}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-white/10 uppercase tracking-widest whitespace-nowrap select-none"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.5rem)" }}
            >
              {p.cat}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Dot navigation — right edge ──────────────────────────── */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 pointer-events-none">
          {ALL_PROJECTS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-400 ${
                i === scene ? "w-1.5 h-4 bg-abcs-red" : "w-1.5 h-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── MOBILE ─────────────────────────────────────────────────── */}
      <section id="portfolio" className="md:hidden bg-abcs-black py-16 px-6">
        <div className="mb-10 overflow-hidden">
          <motion.h2
            initial={{ y: "102%" }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-6xl uppercase leading-none tracking-tight text-white"
          >
            Mes<br />travaux.
          </motion.h2>
        </div>
        <div className="flex flex-col gap-6">
          {ALL_PROJECTS.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="border border-white/10 overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image src={proj.img} alt={proj.title} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-abcs-black/20" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-[10px] text-abcs-red">{proj.n}</span>
                  <span className="font-bold text-[10px] uppercase tracking-widest text-white/30">{proj.cat} · {proj.year}</span>
                </div>
                <h3 className="font-heading text-2xl uppercase text-white leading-tight mb-2">{proj.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.stack.map((s) => (
                    <span key={s} className="font-bold text-[9px] uppercase tracking-widest border border-white/15 px-2.5 py-1 text-white/35">{s}</span>
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
