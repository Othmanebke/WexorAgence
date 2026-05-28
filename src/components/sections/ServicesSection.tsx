"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LineReveal, FadeUp } from "@/components/ui/Reveal";
import { useContactModal } from "@/components/ContactModalProvider";
import { useLang } from "@/components/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    n: "01", title: "Site web sur-mesure", tags: "React · Next.js · WordPress",
    price: "À partir de 750€",
    desc: "Site vitrine, landing page ou site institutionnel développé sur-mesure. Design unique, performant, optimisé SEO et livré en 2–3 semaines.",
    includes: ["Design UI/UX personnalisé", "Responsive mobile & tablette", "SEO technique intégré", "Formulaire de contact & CTA", "Déploiement & mise en ligne inclus"],
  },
  {
    n: "02", title: "Application Web", tags: "SaaS · Dashboard · Full Stack",
    price: "À partir de 2 500€",
    desc: "Application web complexe : SaaS, tableau de bord, outil métier. Stack moderne, scalable, avec authentification et base de données.",
    includes: ["Architecture full stack (React + Node.js)", "Authentification & gestion des rôles", "Base de données PostgreSQL / Supabase", "API REST & intégrations tierces", "Documentation technique livrée"],
  },
  {
    n: "03", title: "E-commerce", tags: "WooCommerce · Next Commerce",
    price: "À partir de 1 200€",
    desc: "Boutique en ligne complète avec gestion produits, panier, paiement sécurisé et tableau de bord vendeur.",
    includes: ["Catalogue produits & variantes", "Paiement Stripe / PayPal intégré", "Gestion des commandes & stocks", "Fiches produits optimisées SEO", "Interface admin intuitive"],
  },
  {
    n: "04", title: "Refonte & Optimisation", tags: "UX/UI · Performance · SEO",
    price: "À partir de 500€",
    desc: "Modernisation complète de votre site existant : nouveau design, amélioration des performances, migration technique.",
    includes: ["Audit complet de l'existant", "Nouveau design UX/UI", "Optimisation Core Web Vitals", "Migration & redirections SEO", "Formation à l'utilisation"],
  },
  {
    n: "05", title: "Branding & Print", tags: "Canva · Adobe · Identité",
    price: "À partir de 350€",
    desc: "Création d'identité visuelle complète : logo, charte graphique, supports print et digital pour une image de marque cohérente.",
    includes: ["Logo + déclinaisons", "Charte graphique (couleurs, typographies)", "Carte de visite & flyers", "Templates réseaux sociaux", "Fichiers sources livrés (AI, PDF, PNG)"],
  },
  {
    n: "06", title: "Intégration IA", tags: "Chatbots · Automatisation",
    price: "À partir de 800€",
    desc: "Intégration d'agents IA, chatbots intelligents et automatisations dans vos outils via API OpenAI, Zapier ou Make.",
    includes: ["Chatbot personnalisé (OpenAI / Claude)", "Automatisation de workflows métier", "Intégration Zapier / Make / n8n", "Connexion à vos outils existants", "Documentation & formation incluses"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openService, setOpenService] = useState<number | null>(null);
  const { openModal } = useContactModal();
  const { t } = useLang();

  useGSAP(() => {
    const rows = gsap.utils.toArray(".service-row-item");
    gsap.from(rows, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="w-full py-16 px-6 md:px-8 bg-[#f0f0ee]">
      <div className="w-full max-w-7xl mx-auto">
        <LineReveal className="mb-16">
          <h2 className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight">
            {t("services_title")}
          </h2>
        </LineReveal>

        <div className="flex flex-col border-t border-black/15">
          {SERVICES.map((s, i) => {
            const isOpen = openService === i;
            return (
              <div key={i} className="border-b border-black/15">
                <button
                  onClick={() => setOpenService(isOpen ? null : i)}
                  className={`service-row-item w-full flex items-center justify-between py-6 px-0 text-left transition-colors duration-300 group ${
                    isOpen ? "text-abcs-black" : "hover:text-abcs-red"
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className={`font-bold text-[10px] uppercase tracking-widest w-6 md:w-8 transition-colors ${isOpen ? "text-abcs-red" : "opacity-40"}`}>
                      {s.n}
                    </span>
                    <span className="font-heading text-xl sm:text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight">
                      {s.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`hidden md:block font-bold text-xs uppercase tracking-widest transition-opacity ${isOpen ? "opacity-0" : "opacity-30 group-hover:opacity-80"}`}>
                      {s.tags}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="font-heading text-2xl leading-none"
                    >
                      +
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="bg-abcs-black text-white px-4 md:px-12 py-10 flex flex-col md:flex-row gap-10 md:gap-16">
                        <div className="md:w-1/2 flex flex-col gap-5">
                          <div>
                            <span className="font-bold text-[10px] uppercase tracking-widest text-white/30 block mb-2">Tarif</span>
                            <span className="font-heading text-3xl md:text-5xl text-abcs-red uppercase leading-none">{s.price}</span>
                          </div>
                          <p className="font-bold text-base text-white/65 leading-relaxed">{s.desc}</p>
                          <button
                            onClick={openModal}
                            className="inline-flex items-center gap-3 bg-white text-abcs-black px-6 py-3.5 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-colors duration-300 group w-fit mt-2"
                          >
                            <span>Démarrer ce projet</span>
                            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                          </button>
                        </div>
                        <div className="md:w-1/2">
                          <span className="font-bold text-[10px] uppercase tracking-widest text-white/30 block mb-5">Ce qui est inclus</span>
                          <ul className="flex flex-col gap-3">
                            {s.includes.map((item, j) => (
                              <li key={j} className="flex items-start gap-3">
                                <span className="w-1 h-1 rounded-full bg-abcs-red mt-2 shrink-0" />
                                <span className="font-bold text-sm text-white/65 leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <FadeUp delay={0.4} className="mt-12">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-3 bg-abcs-black text-white px-7 py-4 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group"
          >
            <span>Démarrer un projet</span>
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
