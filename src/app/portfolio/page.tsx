"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "Aivana", sub: "Flyes SaaS", cat: "SaaS IA", tech: "Next.js · Tailwind · IA", desc: "Dashboard moderne propulsé par l'IA pour de la génération d'insights et l'automatisation avancée.", challenge: "Interface d'analyse complexe mais intuitive.", solution: "Dashboard Next.js avec visualisations temps réel.", result: "Rétention B2B augmentée.", img: "/portfolio/AivanaFlyes-SAASdashboardIA-NextTailwind.png" },
  { id: 2, title: "Ajt", sub: "Blog", cat: "Blog", tech: "React · Tailwind · Next.js", desc: "Blog ultra-rapide optimisé SEO avec une interface épurée.", challenge: "Vitesse et SEO irréprochables.", solution: "Architecture Next.js pensée pour les Core Web Vitals.", result: "Chargement < 0.5s.", img: "/portfolio/Ajt-Blog-REACTTAILWINDnext.png" },
  { id: 3, title: "Brows", sub: "Creative", cat: "E-commerce", tech: "WordPress · WooCommerce", desc: "Boutique et réservation premium pour salon de beauté.", challenge: "Digitaliser un salon haut de gamme.", solution: "WooCommerce personnalisé + module de résa.", result: "+40% de résas.", img: "/portfolio/BROWSCREATIVE-SalonCILS&Sourcils-WordpressWoocommerce.png" },
  { id: 4, title: "Forma", sub: "Immobilier", cat: "Agence Immo", tech: "Next.js · Tailwind · React", desc: "Plateforme immo avec recherche avancée et filtres dynamiques.", challenge: "Moderniser l'image de l'agence.", solution: "Moteur de recherche React/Next.js performant.", result: "Hausse des leads qualifiés.", img: "/portfolio/FORMA-agenceimmo-NEXTtailwindReact.png" },
  { id: 5, title: "Luxe Cars", sub: "Location", cat: "Web App", tech: "React · Vite · Tailwind CSS", desc: "Réservation de véhicules de luxe avec tunnel fluide.", challenge: "Système de résa fluide.", solution: "Interface Vite ultra-dynamique.", result: "Expérience client premium.", img: "/portfolio/luxecarsLocationDeVuitureReactViteTailwindCss.png" },
  { id: 6, title: "Maison", sub: "Parfumerie", cat: "E-commerce", tech: "React · Next.js · Tailwind", desc: "E-commerce luxe avec parcours immersif.", challenge: "Retranscrire l'univers olfactif.", solution: "Expérience Next.js fluide et visuels immersifs.", result: "Hausse du panier moyen.", img: "/portfolio/Maison-ecommerceParfumerie-reactnexttailwind.png" },
  { id: 7, title: "Maison Verdure", sub: "Boulangerie", cat: "Site Vitrine", tech: "HTML · CSS · JS", desc: "Site vitrine artisanal pour présenter le savoir-faire.", challenge: "Présence web chaleureuse.", solution: "Design épuré aux tons naturels.", result: "Plus de clients en boutique.", img: "/portfolio/MaisonVerdure-SiteVitrineBoulangerei-HTMLCSSJS.png" },
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(() => {
    // 1. Hero Animation
    gsap.from(".portfolio-hero-line", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });

    // 2. Tunnel Animation
    const sections = gsap.utils.toArray('.project-slide');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${sections.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.floor(self.progress * (sections.length - 0.01));
          setActiveIdx(idx);
        }
      }
    });

    sections.forEach((section: any, i: number) => {
      // We want each section to "cross" the screen
      // Initial: scale down, opacity 0
      // Active: scale 1, opacity 1
      // Exit: scale up, opacity 0

      if (i !== 0) {
        gsap.set(section, { autoAlpha: 0, scale: 0.8 });
        
        tl.to(section, {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power2.inOut"
        }, i);
      }

      if (i !== sections.length - 1) {
        tl.to(section, {
          autoAlpha: 0,
          scale: 1.2,
          duration: 1,
          ease: "power2.inOut"
        }, i + 0.5);
      }
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-white min-h-screen">
      <PageHeader />

      {/* HERO */}
      <section className="px-8 pt-20 pb-32 max-w-7xl mx-auto">
        <h1 className="font-heading text-6xl md:text-[8rem] uppercase leading-[0.8] mb-8 overflow-hidden">
          <span className="portfolio-hero-line block">SÉLECTION</span>
          <span className="portfolio-hero-line block text-abcs-red">PROJETS</span>
          <span className="portfolio-hero-line block">WEXOR.</span>
        </h1>
        <p className="portfolio-hero-line font-bold opacity-60 max-w-md">
          Explorez nos réalisations à travers ce tunnel immersif.
        </p>
      </section>

      {/* TUNNEL SECTION */}
      <div ref={sectionRef} className="h-screen w-full bg-abcs-black relative overflow-hidden flex items-center justify-center">
        
        {/* Background Depth */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

        {/* Counter */}
        <div className="absolute top-12 left-12 text-white/10 font-heading text-9xl z-50 pointer-events-none">
          {(activeIdx + 1).toString().padStart(2, '0')}
        </div>

        {/* Slides Container */}
        <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
          {projects.map((p, idx) => (
            <div 
              key={idx} 
              className="project-slide absolute inset-0 flex items-center justify-center p-8"
            >
              <div className="w-full flex flex-col lg:flex-row gap-12 items-center bg-zinc-900 border border-white/10 p-8 md:p-16 rounded-2xl shadow-2xl">
                
                {/* Image */}
                <div className="relative w-full lg:w-1/2 aspect-video border-4 border-white shadow-[15px_15px_0px_0px_#ff3b00] overflow-hidden">
                  <Image src={p.img} alt={p.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 bg-abcs-red text-white font-bold text-[10px] uppercase px-3 py-1">{p.cat}</div>
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2 text-white">
                  <div className="text-abcs-red font-bold text-xs uppercase mb-2">{p.tech}</div>
                  <h2 className="font-heading text-5xl md:text-7xl uppercase leading-none mb-4">{p.title}</h2>
                  <p className="font-bold opacity-50 text-sm mb-8 leading-relaxed line-clamp-3">{p.desc}</p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    <div>
                      <div className="text-abcs-red font-heading text-[10px] mb-1">Challenge</div>
                      <div className="text-[11px] opacity-60 font-bold">{p.challenge}</div>
                    </div>
                    <div>
                      <div className="text-abcs-red font-heading text-[10px] mb-1">Résultat</div>
                      <div className="text-[11px] opacity-60 font-bold">{p.result}</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link href="/contact" className="bg-white text-black px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-all inline-block">
                      Détails projet ↗
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL SECTION */}
      <section className="py-40 px-8 flex flex-col items-center bg-white border-t-8 border-abcs-black">
         <h2 className="font-heading text-6xl md:text-9xl uppercase text-center mb-12">ET SI LE PROCHAIN <br/> PROJET ÉTAIT <span className="text-abcs-red">LE VÔTRE ?</span></h2>
         <Link href="/contact" className="bg-abcs-black text-white px-12 py-6 font-bold text-xl uppercase tracking-widest hover:bg-abcs-red transition-all">
            Contactez-nous
         </Link>
      </section>

    </main>
  );
}
