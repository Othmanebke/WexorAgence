"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

const webPacks = [
  { tag: "Conversion", title: "Landing Page", price: "300€", desc: "Une page d'atterrissage unique (One-Page) ultra-optimisée pour capter des prospects ou vendre un produit spécifique de façon percutante.", features: ["Design premium fashion & motion", "Structure mono-page axée conversion", "Responsive mobile first", "Formulaire ou appel à l'action direct", "Optimisation de vitesse SEO", "Suivi analytics basique"], stack: "React · Next.js · Tailwind" },
  { tag: "Présence Web", title: "Site Vitrine", price: "À partir de 750€", desc: "Un site vitrine professionnel de plusieurs pages qui présente ton activité avec élégance et convertit tes visiteurs en clients.", features: ["Design sur-mesure unique", "Responsive mobile first", "SEO on-page complet", "Formulaire de contact", "Google Analytics configuré", "Formation CMS incluse"], stack: "React · Next.js · WordPress" },
  { tag: "CMS", title: "Pack WordPress", price: "À partir de 1 200€", desc: "Site complet sous WordPress avec thème premium personnalisé, plugins essentiels et prise en main autonome.", features: ["Thème premium personnalisé", "Plugins SEO & sécurité", "Blog & actualités intégré", "Formulaires avancés", "Optimisation vitesse", "Formation incluse"], stack: "WordPress · WooCommerce · Elementor" },
  { tag: "Développement", title: "Application Web", price: "À partir de 2 500€", desc: "SaaS, dashboard, marketplace ou plateforme métier. Stack moderne, architecture scalable et UX premium.", features: ["Architecture sur-mesure", "Authentification & rôles", "Dashboard utilisateur", "API REST intégrée", "Base de données cloud", "CI/CD & déploiement inclus"], stack: "Next.js · React · Supabase", highlight: true },
  { tag: "Transformation", title: "Refonte Web", price: "Sur devis", desc: "Ton site vieilli freine ta croissance ? Je le modernise de fond en comble : design, SEO, taux de conversion.", features: ["Audit complet offert", "Nouveau design premium", "Migration de contenu", "Optimisation Core Web Vitals", "SEO technique avancé", "Support post-refonte"], stack: "Sur-mesure · Devis gratuit" },
];

const socialPacks = [
  { title: "Starter", price: "150€/mois", desc: "Idéal pour démarrer", features: ["8 posts / mois", "Design visuel & publications", "Rapport mensuel"] },
  { title: "Growth", price: "450€/mois", desc: "Pour gagner en visibilité", features: ["12–16 posts / mois", "Création contenu & stories", "Stratégie & reporting"], highlight: true },
  { title: "Pro", price: "1 500€/mois", desc: "Campagnes & influence", features: ["Contenu quotidien", "Campagnes paid & influence", "KPI & optimisation"] },
];

const brandingPacks = [
  { title: "Pack Canva Pro", price: "150–350€", desc: "Création rapide, rendu propre", features: ["Logo + 2 variantes", "Palette & typographies", "3 supports print", "Templates réseaux"], tools: "Canva Pro" },
  { title: "Pack Adobe CC", price: "600–1 200€", desc: "Identité vectorielle pro", features: ["Logo vectoriel complet", "Charte graphique complète", "5 supports print", "Fichiers sources (AI, PSD)"], tools: "Illustrator · Photoshop", highlight: true },
];

export default function TarifsPage() {
  const [openPack, setOpenPack] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useGSAP(() => {
    gsap.from(".tarif-row", { y: 50, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".tarifs-list", start: "top 80%" } });
    gsap.from(".social-row", { x: -40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".social-section", start: "top 80%" } });
    gsap.from(".branding-row", { x: -40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".branding-section", start: "top 80%" } });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="flex-1 flex flex-col bg-[#f0f0ee]">
      <PageHeader number="03" title="TARIFS" subtitle={t("page_tarifs_sub")} />

      <section className="w-full px-6 md:px-8 pt-16 md:pt-20 pb-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <LineReveal className="md:w-1/2">
            <h2 className="font-heading text-4xl md:text-5xl uppercase leading-tight">Pas de frais cachés.<br />Juste de la valeur.</h2>
          </LineReveal>
          <FadeUp delay={0.2} className="md:w-1/2">
            <p className="font-bold text-lg opacity-60 leading-relaxed">Tarification claire basée sur la valeur réelle. Chaque projet fait l&apos;objet d&apos;un devis personnalisé gratuit.</p>
          </FadeUp>
        </div>
      </section>

      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Services Web</span>
        <span className="font-heading text-white text-xl md:text-2xl">01</span>
      </div>

      <section className="w-full px-6 md:px-8 py-16 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-8xl uppercase leading-none">MES SERVICES WEB</h2>
          </LineReveal>
          <div className="tarifs-list flex flex-col border-t border-black/15">
            {webPacks.map((p, i) => (
              <div key={i} className="tarif-row border-b border-black/15">
                <button onClick={() => setOpenPack(openPack === i ? null : i)} className="w-full flex items-center justify-between py-6 md:py-7 text-left group hover:text-abcs-red transition-colors">
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="font-bold text-[10px] opacity-40 w-4 md:w-6">0{i+1}</span>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                      <span className="font-heading text-xl sm:text-2xl md:text-4xl uppercase">{p.title}</span>
                      {p.highlight && <span className="bg-abcs-red text-white font-bold text-[9px] uppercase tracking-widest px-3 py-1 w-fit mt-1 md:mt-0">Populaire</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="hidden md:block font-bold text-sm opacity-50 group-hover:opacity-100 transition-opacity">{p.price}</span>
                    <motion.span animate={{ rotate: openPack === i ? 45 : 0 }} transition={{ duration: 0.25 }} className="font-heading text-3xl">+</motion.span>
                  </div>
                </button>
                <AnimatePresence>
                  {openPack === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                      <div className="pb-8 md:pb-10 pl-4 sm:pl-10 md:pl-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <p className="font-bold text-base opacity-60 leading-relaxed mb-6">{p.desc}</p>
                          <ul className="flex flex-col gap-3">
                            {p.features.map((f) => (
                              <li key={f} className="flex items-center gap-3 font-bold text-sm border-b border-black/10 pb-3">
                                <span className="text-abcs-red text-lg">✓</span> {f}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 font-bold text-[10px] uppercase tracking-widest opacity-40">{p.stack}</div>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="font-heading text-5xl text-abcs-red">{p.price}</div>
                          <Link href="/contact" className="inline-flex items-center gap-3 bg-abcs-black text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red transition-colors mt-8 w-fit group">
                            <span>Démarrer mon projet</span>
                            <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Community Management</span>
        <span className="font-heading text-white text-xl md:text-2xl">02</span>
      </div>

      <section className="social-section w-full px-6 md:px-8 py-16 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-8xl uppercase leading-none">COMMUNITY<br />MANAGEMENT</h2>
          </LineReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
            {socialPacks.map((p, i) => (
              <div key={i} className={`social-row flex flex-col p-8 md:p-10 ${p.highlight ? "bg-abcs-black text-white" : "bg-[#f0f0ee]"} group hover:bg-abcs-red hover:text-white transition-colors duration-300`}>
                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <h3 className="font-heading text-3xl md:text-4xl uppercase">{p.title}</h3>
                  {p.highlight && <span className="bg-abcs-red group-hover:bg-white group-hover:text-abcs-red text-white font-bold text-[9px] uppercase px-3 py-1 transition-colors">Top</span>}
                </div>
                <div className="font-heading text-4xl mb-2">{p.price}</div>
                <div className="font-bold text-xs opacity-50 mb-8">{p.desc}</div>
                <ul className="flex flex-col gap-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-bold text-sm border-b border-current/10 pb-3 opacity-80">
                      <span>→</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-8 inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest border-b border-current pb-1 w-fit opacity-60 hover:opacity-100 transition-opacity">
                  Choisir ce plan ↗
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Branding & Print</span>
        <span className="font-heading text-white text-xl md:text-2xl">03</span>
      </div>

      <section className="branding-section w-full px-6 md:px-8 py-16 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-16">
            <h2 className="font-heading text-6xl md:text-8xl uppercase leading-none">BRANDING &<br />CRÉATION</h2>
          </LineReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {brandingPacks.map((p, i) => (
              <div key={i} className={`branding-row flex flex-col p-8 md:p-10 ${p.highlight ? "bg-abcs-black text-white" : "bg-[#f0f0ee]"} group hover:bg-abcs-red hover:text-white transition-colors duration-300`}>
                {p.highlight && <span className="bg-abcs-red group-hover:bg-white group-hover:text-abcs-red text-white font-bold text-[9px] uppercase px-3 py-1 w-fit mb-6 transition-colors">Recommandé</span>}
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl uppercase mb-2">{p.title}</h3>
                <div className="font-heading text-3xl text-abcs-red group-hover:text-white mb-2 transition-colors">{p.price}</div>
                <div className="font-bold text-sm opacity-50 mb-8">{p.desc}</div>
                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-bold text-sm border-b border-current/10 pb-3 opacity-80">
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="font-bold text-[10px] uppercase tracking-widest opacity-30 mb-6">{p.tools}</div>
                <Link href="/contact" className="inline-flex items-center gap-3 border border-current px-6 py-3 font-bold text-xs uppercase tracking-widest w-fit hover:bg-white hover:text-abcs-black hover:border-white transition-colors">
                  Demander un devis ↗
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-abcs-black text-white py-24 md:py-32 px-6 md:px-8 flex flex-col items-center text-center">
        <LineReveal className="mb-4">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">UN PROJET ?</h2>
        </LineReveal>
        <LineReveal delay={0.1} className="mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter text-abcs-red">ON EN PARLE.</h2>
        </LineReveal>
        <FadeUp delay={0.35}>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-abcs-black px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-colors group">
            <span>Obtenir un devis gratuit</span>
            <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </Link>
        </FadeUp>
      </section>
    </main>
  );
}
