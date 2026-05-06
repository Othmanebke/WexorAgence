"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

const projects = [
  { id: 1, title: "Aivana", sub: "SaaS IA", cat: "Dashboard", tech: "Next.js · Tailwind · IA", desc: "Dashboard moderne propulsé par l'IA pour la génération d'insights et l'automatisation avancée.", result: "Rétention B2B augmentée.", img: "/portfolio/AivanaFlyes-SAASdashboardIA-NextTailwind.png", year: "2024" },
  { id: 2, title: "Ajt Blog", sub: "Blog", cat: "Blog", tech: "React · Tailwind · Next.js", desc: "Blog ultra-rapide optimisé SEO avec une interface épurée.", result: "Chargement < 0.5s.", img: "/portfolio/Ajt-Blog-REACTTAILWINDnext.png", year: "2024" },
  { id: 3, title: "Brows Creative", sub: "Salon", cat: "E-commerce", tech: "WordPress · WooCommerce", desc: "Boutique et réservation premium pour salon de beauté haut de gamme.", result: "+40% de réservations.", img: "/portfolio/BROWSCREATIVE-SalonCILS&Sourcils-WordpressWoocommerce.png", year: "2024" },
  { id: 4, title: "Forma Immo", sub: "Immobilier", cat: "Plateforme", tech: "Next.js · Tailwind · React", desc: "Plateforme immo avec recherche avancée et filtres dynamiques.", result: "Hausse des leads qualifiés.", img: "/portfolio/FORMA-agenceimmo-NEXTtailwindReact.png", year: "2024" },
  { id: 5, title: "Luxe Cars", sub: "Location", cat: "Web App", tech: "React · Vite · Tailwind", desc: "Réservation de véhicules de luxe avec tunnel de conversion fluide.", result: "Expérience client premium.", img: "/portfolio/luxecarsLocationDeVoitureReactViteTailwindCss.png", year: "2024" },
  { id: 6, title: "Maison Parfumerie", sub: "E-commerce", cat: "E-commerce", tech: "React · Next.js · Tailwind", desc: "E-commerce luxe avec parcours immersif et visuels haute qualité.", result: "Hausse du panier moyen.", img: "/portfolio/Maison-ecommerceParfumerie-reactnexttailwind.png", year: "2024" },
  { id: 7, title: "Maison Verdure", sub: "Boulangerie", cat: "Site Vitrine", tech: "HTML · CSS · JS", desc: "Site vitrine artisanal chaleureuse pour présenter le savoir-faire d'une boulangerie.", result: "Plus de clients en boutique.", img: "/portfolio/MaisonVerdure-SiteVitrineBoulangerei-HTMLCSSJS.png", year: "2024" },
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useGSAP(() => {
    // Parallax big text
    if (bigTextRef.current) {
      gsap.fromTo(bigTextRef.current,
        { xPercent: -5 },
        { xPercent: 3, ease: "none", scrollTrigger: { trigger: bigTextRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 } }
      );
    }

    // Project rows stagger
    gsap.from(".project-row", {
      y: 60, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
      scrollTrigger: { trigger: ".projects-list", start: "top 75%", toggleActions: "play none none none" }
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="flex-1 flex flex-col bg-[#f0f0ee]">
      <PageHeader number="04" title="PORTFOLIO" subtitle="Nos réalisations" />

      {/* Scrolling big text */}
      <div className="w-full overflow-hidden py-12 border-b border-black/10">
        <div ref={bigTextRef} className="w-max">
          <p className="font-heading text-[#111]/[0.06] uppercase leading-none whitespace-nowrap select-none" style={{ fontSize: "clamp(6rem, 18vw, 22rem)" }}>
            SÉLECTION PROJETS WEXOR
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="w-full px-6 md:px-8 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end">
          <LineReveal className="md:w-2/3">
            <h2 className="font-heading text-5xl md:text-7xl uppercase leading-[0.9]">
              Des projets pensés<br />pour convertir.
            </h2>
          </LineReveal>
          <FadeUp delay={0.25} className="md:w-1/3">
            <p className="font-bold text-base opacity-55 leading-relaxed">
              Chaque réalisation est le résultat d&apos;une collaboration étroite — design, code et stratégie alignés sur un seul objectif : ton résultat.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Orange banner */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Tous les projets</span>
        <span className="font-heading text-white text-xl md:text-2xl">{projects.length.toString().padStart(2, "0")}</span>
      </div>

      {/* Project list — hover image reveal */}
      <section className="w-full px-6 md:px-8 py-0 bg-[#f0f0ee] relative">
        <div className="w-full max-w-7xl mx-auto">
          <div className="projects-list flex flex-col border-t border-black/15">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="project-row border-b border-black/15 group"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex items-center justify-between py-6 md:py-8 transition-colors duration-200 group-hover:text-abcs-red">
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="font-bold text-[10px] opacity-40 w-4 md:w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl md:text-5xl uppercase leading-tight">{p.title}</h3>
                      <p className="font-bold text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mt-1">{p.tech}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="hidden md:block font-bold text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{p.cat}</span>
                    <span className="font-heading text-2xl leading-none opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating image on hover */}
        <div className="hidden lg:block fixed right-24 top-1/2 -translate-y-1/2 w-72 h-48 pointer-events-none z-40 overflow-hidden">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: hoveredIdx === i ? 1 : 0, scale: hoveredIdx === i ? 1 : 0.92, y: hoveredIdx === i ? 0 : 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={p.img} alt={p.title} fill className="object-cover" sizes="288px" />
              <div className="absolute inset-0 bg-abcs-black/20" />
              <div className="absolute bottom-3 left-3 bg-abcs-red text-white font-bold text-[9px] uppercase tracking-widest px-3 py-1">{p.result}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grid showcase */}
      <section className="w-full px-6 md:px-8 py-16 md:py-24 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-12 md:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-none">APERÇU VISUEL</h2>
          </LineReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {projects.slice(0, 4).map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.08}>
                <div className="relative bg-abcs-black overflow-hidden h-64 md:h-80 group">
                  <Image src={p.img} alt={p.title} fill className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-abcs-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                    <div>
                      <p className="font-bold text-white/60 text-[10px] uppercase tracking-widest mb-1">{p.cat}</p>
                      <h3 className="font-heading text-2xl uppercase text-white leading-tight">{p.title}</h3>
                    </div>
                    <span className="text-white font-heading text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">↗</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-abcs-red text-white font-bold text-[9px] uppercase px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{p.tech}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-abcs-black text-white py-24 md:py-32 px-6 md:px-8 flex flex-col items-center text-center">
        <LineReveal className="mb-4">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">LE PROCHAIN</h2>
        </LineReveal>
        <LineReveal delay={0.1} className="mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter text-abcs-red">C&apos;EST LE VÔTRE.</h2>
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
