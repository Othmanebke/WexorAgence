"use client";

import React from 'react';
import { FadeIn } from './FadeIn';
import { useContactModal } from '@/components/ContactModalProvider';

const SERVICES = [
  {
    number: '01',
    name: 'Site Web Sur-Mesure',
    price: 'Dès 750€',
    description:
      'Site vitrine, landing page ou site corporate développé sur-mesure. Design exclusif, ultra-performant, optimisé pour le référencement naturel (SEO) et la conversion.',
    tags: ['React', 'Next.js', 'WordPress', 'SEO'],
  },
  {
    number: '02',
    name: 'Application Web & SaaS',
    price: 'Dès 2 500€',
    description:
      'Développement de plateformes web complexes, tableaux de bord interactifs et solutions SaaS. Architecture full stack évolutive, authentification et base de données sécurisée.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'API REST'],
  },
  {
    number: '03',
    name: 'Boutique E-commerce',
    price: 'Dès 1 200€',
    description:
      'Création de boutiques en ligne complètes et engageantes. Gestion des produits, paiements sécurisés Stripe / PayPal et parcours client fluide sans friction.',
    tags: ['WooCommerce', 'Next Commerce', 'Stripe'],
  },
  {
    number: '04',
    name: 'Refonte & Optimisation',
    price: 'Dès 500€',
    description:
      'Modernisation graphique de votre site existant, amélioration drastique de la vitesse de chargement (Core Web Vitals) et mise en conformité technique.',
    tags: ['Audit UX/UI', 'Performance', 'Mobile First'],
  },
  {
    number: '05',
    name: 'Branding & Identité Visuelle',
    price: 'Dès 350€',
    description:
      'Conception d’une image de marque percutante et mémorable : création de logo, charte graphique globale, supports de communication et templates réseaux sociaux.',
    tags: ['Logo', 'Charte graphique', 'Adobe CC', 'Figma'],
  },
  {
    number: '06',
    name: 'Automatisation & IA',
    price: 'Dès 800€',
    description:
      'Intégration d’agents IA sur-mesure, chatbots intelligents connectés à vos données et automatisation de vos workflows métier pour gagner un temps précieux.',
    tags: ['OpenAI', 'Chatbots', 'Make / Zapier', 'Workflows'],
  },
];

export const ServicesSection: React.FC = () => {
  const { openModal } = useContactModal();

  return (
    <section
      id="services"
      className="relative bg-[#FFFFFF] text-[#111111] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32 z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.15)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <FadeIn delay={0} y={40}>
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20 md:mb-24">
            <span className="font-bold text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FF3B00] mb-3">
              Ce que je réalise pour vous
            </span>
            <h2
              className="text-[#111111] font-black uppercase text-center leading-none tracking-tight select-none"
              style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
            >
              Mes Services
            </h2>
          </div>
        </FadeIn>

        {/* Liste des Services */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.08}
              y={25}
              className={`py-8 sm:py-10 md:py-12 border-t border-[#111111]/15 ${
                index === SERVICES.length - 1 ? 'border-b' : ''
              } group transition-all duration-300 hover:bg-[#111111]/[0.02] cursor-pointer`}
            >
              <div
                onClick={() => openModal({ type: service.name })}
                className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-10"
              >
                {/* Numéro géant + Prix sur mobile */}
                <div className="flex items-center justify-between md:flex-col md:items-start gap-3 md:w-[180px] shrink-0">
                  <span
                    className="font-black text-[#111111] leading-none select-none transition-all duration-300 group-hover:text-[#FF3B00] group-hover:translate-x-2"
                    style={{ fontSize: 'clamp(2.8rem, 8vw, 110px)' }}
                  >
                    {service.number}
                  </span>
                  <span className="inline-block px-3 py-1 bg-[#FF3B00]/10 text-[#FF3B00] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full md:mt-2">
                    {service.price}
                  </span>
                </div>

                {/* Nom + Description + Tags */}
                <div className="flex-1 flex flex-col gap-3 sm:gap-4 md:pl-2">
                  <div className="flex items-center justify-between">
                    <h3
                      className="font-bold uppercase text-[#111111] tracking-tight group-hover:text-[#FF3B00] transition-colors"
                      style={{ fontSize: 'clamp(1.2rem, 2.4vw, 2.2rem)' }}
                    >
                      {service.name}
                    </h3>
                    <span className="w-9 h-9 rounded-full bg-[#111111]/5 group-hover:bg-[#FF3B00] group-hover:text-white flex items-center justify-center font-bold text-base transition-all duration-300 shrink-0 ml-4">
                      ↗
                    </span>
                  </div>

                  <p
                    className="font-medium text-[#111111]/70 leading-relaxed max-w-2xl"
                    style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}
                  >
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold uppercase tracking-wider text-[#111111]/50 bg-[#111111]/5 px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA bas de section */}
        <FadeIn delay={0.2} y={30} className="flex justify-center mt-16 sm:mt-20">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-3 bg-[#111111] text-white px-8 py-4 sm:px-10 sm:py-4.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-[#FF3B00] transition-all duration-300 shadow-lg hover:shadow-[0_10px_25px_rgba(255,59,0,0.4)] group"
          >
            <span>Demander un devis gratuit</span>
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-base">↗</span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesSection;
