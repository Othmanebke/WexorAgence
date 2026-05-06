"use client";

import { useRef } from "react";
import PageHeader from "@/components/PageHeader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const packs = [
  {
    tag: "Présence Web", title: "Site Vitrine", price: "À partir de 500€",
    desc: "Un site vitrine professionnel qui présente ton activité avec élégance et convertit tes visiteurs en clients.",
    features: ["Design sur-mesure unique", "Responsive mobile first", "SEO on-page complet", "Formulaire de contact", "Google Analytics configuré", "Formation CMS incluse"],
    stack: "React · Next.js · WordPress", highlight: false,
  },
  {
    tag: "CMS", title: "Pack WordPress", price: "À partir de 1 200€",
    desc: "Site complet sous WordPress avec thème premium personnalisé, plugins essentiels et prise en main autonome.",
    features: ["Thème premium personnalisé", "Plugins SEO & sécurité", "Blog & actualités intégré", "Formulaires avancés", "Optimisation vitesse", "Formation incluse"],
    stack: "WordPress · WooCommerce · Elementor", highlight: false,
  },
  {
    tag: "Développement", title: "Application Web", price: "À partir de 2 500€",
    desc: "SaaS, dashboard, marketplace ou plateforme métier. Stack moderne, architecture scalable et UX premium.",
    features: ["Architecture sur-mesure", "Authentification & rôles", "Dashboard utilisateur", "API REST intégrée", "Base de données cloud", "CI/CD & déploiement inclus"],
    stack: "Next.js · React · Supabase", highlight: true,
  },
  {
    tag: "Transformation", title: "Refonte Web", price: "Sur devis",
    desc: "Ton site vieilli freine ta croissance ? On le modernise de fond en comble : design, SEO, taux de conversion.",
    features: ["Audit complet offert", "Nouveau design premium", "Migration de contenu", "Optimisation Core Web Vitals", "SEO technique avancé", "Support post-refonte"],
    stack: "Sur-mesure · Devis gratuit", highlight: false,
  },
];

const socialPacks = [
  { title: "Starter", price: "150€ / mois", phrase: "Idéal pour démarrer", features: ["8 posts / mois", "Design visuel & publications", "Rapport basique mensuel"], highlight: false },
  { title: "Growth", price: "450€ / mois", phrase: "Pour gagner en visibilité", features: ["12–16 posts / mois", "Création de contenu & stories", "Stratégie & reporting mensuel"], highlight: true },
  { title: "Pro", price: "1 500€ / mois", phrase: "Campagnes & influence", features: ["Contenu quotidien & community mgmt", "Campagnes paid & micro-influence", "KPI et optimisation continue"], highlight: false },
];

const brandingPacks = [
  {
    title: "Pack Canva Pro", price: "150 – 350€", desc: "Création rapide, rendu propre & moderne",
    features: ["Logo principal + 2 variantes", "Palette couleurs & typographies", "Jusqu'à 3 supports print", "Templates réseaux sociaux inclus", "Fichiers HD livrés (PNG, PDF)", "Révisions illimitées"],
    tools: "Canva Pro", highlight: false,
  },
  {
    title: "Pack Adobe CC", price: "600 – 1 200€", desc: "Identité vectorielle pro, fichiers sources inclus",
    features: ["Logo vectoriel complet (principal, icône, N&B)", "Charte graphique complète", "Jusqu'à 5 supports print sur-mesure", "Templates réseaux sociaux", "Guide d'utilisation de la marque", "Fichiers sources livrés (AI, PSD, INDD)"],
    tools: "Adobe Illustrator · Photoshop · InDesign", highlight: true,
  },
];

export default function TarifsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Text Stagger
    gsap.fromTo(".hero-text-line", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
    );

    // Web Cards Reveal
    const webCards = gsap.utils.toArray('.web-cards .tarif-card');
    if (webCards.length > 0) {
      gsap.fromTo(webCards,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          delay: 0.3
        }
      );
    }

    // Other Cards Reveal (Scroll Triggered)
    const cardGroups = [
      { selector: '.social-cards', items: '.tarif-card' },
      { selector: '.branding-cards', items: '.tarif-card' }
    ];

    cardGroups.forEach((group) => {
      const items = gsap.utils.toArray(`${group.selector} ${group.items}`);
      if (items.length > 0) {
        gsap.fromTo(items,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group.selector,
              start: "top 90%",
              toggleActions: "play none none none",
              // markers: true // Uncomment for debugging
            }
          }
        );
      }
    });

    // Refresh ScrollTrigger after a short delay to account for hydration/layout shifts
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

  }, { scope: containerRef });

  // Simple 3D Tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.6
    });
  };

  return (
    <main ref={containerRef} className="flex-1 flex flex-col items-center px-0 pb-32 bg-white">
      <PageHeader />
      <div className="w-full flex flex-col items-center px-8 pt-16">

      {/* ─── HEADER ─── */}
      <div className="w-full max-w-7xl mb-24">
        <div className="inline-block bg-abcs-red text-white font-bold text-xs uppercase tracking-widest px-4 py-2 mb-6">Investissement</div>
        <h1 className="font-heading text-5xl md:text-[8rem] text-abcs-black uppercase leading-[0.8] mb-6 overflow-hidden">
          <div className="hero-text-line">COMBIEN VAUT</div>
          <div className="hero-text-line text-abcs-red">VRAIMENT</div>
          <div className="hero-text-line">TON IMAGE ?</div>
        </h1>
        <p className="hero-text-line font-bold text-xl opacity-70 max-w-2xl">
          Pas de frais cachés, pas de mauvaises surprises. Juste une tarification claire basée sur la valeur qu&apos;on apporte à ton business.
        </p>
      </div>

      {/* ─── SERVICES WEB ─── */}
      <div className="web-cards w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
        {packs.map((p, i) => (
          <div 
            key={i} 
            className={`tarif-card p-8 border-8 border-abcs-black flex flex-col transition-all relative ${p.highlight ? "bg-abcs-black text-white shadow-[16px_16px_0px_0px_rgba(255,59,0,1)]" : "bg-white shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]"}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d" }}
          >
            {p.highlight && <div className="absolute -top-5 right-8 bg-abcs-red text-white font-bold px-4 py-2 text-xs uppercase tracking-widest translate-z-[50px]">Populaire</div>}
            <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${p.highlight ? "text-abcs-red" : "opacity-50"} translate-z-[20px]`}>{p.tag}</div>
            <h2 className="font-heading text-5xl uppercase mb-2 translate-z-[40px]">{p.title}</h2>
            <div className={`font-script text-4xl mb-6 ${p.highlight ? "text-abcs-red" : "text-abcs-red"}`}>{p.price}</div>
            <p className={`font-bold mb-8 ${p.highlight ? "opacity-80" : "opacity-70"}`}>{p.desc}</p>
            <ul className="flex flex-col gap-3 mb-8">
              {p.features.map((f, j) => (
                <li key={j} className={`flex items-center gap-3 font-bold text-sm border-b pb-3 ${p.highlight ? "border-white/10" : "border-black/10"}`}>
                  <span className="text-abcs-red font-heading text-lg">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className={`text-xs font-bold uppercase tracking-widest mt-auto mb-6 ${p.highlight ? "opacity-50" : "opacity-40"}`}>{p.stack}</div>
            <a href="/contact" className={`px-8 py-4 font-bold text-sm text-center uppercase tracking-widest transition-colors ${p.highlight ? "bg-abcs-red text-white hover:bg-white hover:text-abcs-black" : "bg-abcs-black text-white hover:bg-abcs-red"}`}>
              Démarrer mon projet →
            </a>
          </div>
        ))}
      </div>

      {/* ─── OFFRE PHARE ─── */}
      <div className="w-full max-w-7xl border-t-8 border-abcs-black pt-24 mb-32">
        <div className="inline-block bg-abcs-black text-white font-bold text-xs uppercase tracking-widest px-4 py-2 mb-6">L&apos;Offre Phare</div>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="font-heading text-6xl md:text-8xl uppercase leading-[0.8] mb-6">
              LE SITE WEB<br/><span className="text-abcs-red">SUR-MESURE</span>
            </h2>
            <p className="font-bold text-xl opacity-70">Un site rapide, performant et optimisé pour Google. Pensé comme ton meilleur commercial automatisé.</p>
            <div className="font-script text-abcs-red text-5xl mt-8">500€ — 5k€</div>
            <p className="text-xs font-bold opacity-50 mt-2">*Tarif exact via devis, selon la complexité et le volume de pages.</p>
          </div>
          <div className="md:w-1/2 border-8 border-abcs-black p-8 bg-white shadow-[16px_16px_0px_0px_rgba(255,59,0,1)]">
            <ul className="flex flex-col gap-4 mb-8">
              {["Design Ultra-Premium", "Code très rapide", "Optimisé SEO On-Page", "Accessible Mobile First", "Copywriting inclus*", "Formation CMS / Admin"].map((f) => (
                <li key={f} className="flex items-center gap-3 font-bold border-b border-black/10 pb-3">
                  <span className="text-abcs-red font-heading text-xl">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">React · WordPress · Next.js</div>
            <a href="/contact" className="block bg-abcs-black text-white px-8 py-4 font-bold text-center uppercase tracking-widest hover:bg-abcs-red transition-colors">
              Démarrer mon projet
            </a>
          </div>
        </div>
      </div>

      {/* ─── PACKS RÉSEAUX SOCIAUX ─── */}
      <div className="w-full max-w-7xl border-t-8 border-abcs-black pt-24 mb-32 relative">
        <h2 className="font-heading text-6xl md:text-8xl text-abcs-black uppercase leading-none mb-16 text-center">Community<br/>Management</h2>
        <div className="social-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialPacks.map((p, i) => (
            <div 
              key={i} 
              className={`tarif-card p-6 border-4 border-abcs-black flex flex-col hover:-translate-y-2 transition-transform ${p.highlight ? "bg-abcs-red text-white shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]" : "bg-white shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]"} ${i === 1 ? "-mt-4" : ""}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {p.highlight && <div className="absolute -top-5 right-6 bg-abcs-red text-white font-bold px-4 py-1 text-xs uppercase">Populaire</div>}
              <h3 className="font-heading text-4xl uppercase mb-2">{p.title}</h3>
              <div className={`font-script text-4xl mb-2 ${p.highlight ? "text-white" : "text-abcs-red"}`}>{p.price}</div>
              <div className={`text-sm font-bold mb-6 ${p.highlight ? "opacity-60" : "opacity-50"}`}>{p.phrase}</div>
              <ul className="flex flex-col gap-3 mb-8">
                {p.features.map((f) => <li key={f} className={`flex gap-2 text-sm font-bold border-b pb-2 ${p.highlight ? "border-white/10" : "border-black/10"}`}><span className="text-abcs-red">→</span>{f}</li>)}
              </ul>
              <a href="/contact" className={`mt-auto px-6 py-3 font-bold text-sm text-center uppercase tracking-widest ${p.highlight ? "bg-white text-abcs-red hover:bg-black hover:text-white" : "bg-abcs-black text-white hover:bg-abcs-red"} transition-colors`}>
                Choisir ce plan
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ─── BRANDING & PRINT ─── */}
      <div className="w-full max-w-7xl border-t-8 border-abcs-black pt-24 mb-16">
        <h2 className="font-heading text-6xl md:text-8xl text-abcs-black uppercase leading-none mb-16 text-center">Branding &<br/>Création</h2>
        <div className="branding-cards grid grid-cols-1 md:grid-cols-2 gap-8">
          {brandingPacks.map((p, i) => (
            <div 
              key={i} 
              className={`tarif-card p-8 border-4 border-abcs-black flex flex-col hover:-translate-y-2 transition-transform relative ${p.highlight ? "bg-abcs-black text-white shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]" : "bg-white shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]"}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {p.highlight && <div className="absolute -top-5 right-8 bg-abcs-red text-white font-bold px-4 py-2 text-xs uppercase">Recommandé</div>}
              <h3 className="font-heading text-4xl uppercase mb-2">{p.title}</h3>
              <div className="font-script text-abcs-red text-4xl mb-2">{p.price}</div>
              <div className={`text-sm font-bold mb-6 ${p.highlight ? "opacity-60" : "opacity-50"}`}>{p.desc}</div>
              <ul className="flex flex-col gap-3 mb-8">
                {p.features.map((f) => <li key={f} className={`flex gap-2 text-sm font-bold border-b pb-2 ${p.highlight ? "border-white/10" : "border-black/10"}`}><span className="text-abcs-red">✓</span>{f}</li>)}
              </ul>
              <div className={`text-xs font-bold uppercase tracking-widest mt-auto mb-6 ${p.highlight ? "opacity-40" : "opacity-30"}`}>{p.tools}</div>
              <a href="/contact" className={`px-8 py-4 font-bold text-sm text-center uppercase tracking-widest transition-colors ${p.highlight ? "bg-abcs-red text-white hover:bg-white hover:text-abcs-black" : "bg-abcs-black text-white hover:bg-abcs-red"}`}>
                Demander un devis
              </a>
            </div>
          ))}
        </div>
      </div>
      </div>
    </main>
  );
}
