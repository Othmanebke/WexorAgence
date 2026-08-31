"use client";

import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { useContactModal } from '@/components/ContactModalProvider';


const SERVICES = [
  {
    number: '01',
    name: 'Flyer, Logo & Design Graphique',
    price: 'Dès 50€ (Canva) · Dès 100€ (Adobe)',
    description:
      'Création visuelle rapide et professionnelle pour votre communication : flyers publicitaires, bannières, cartes de visite et logos percutants livrés prêts à imprimer ou diffuser.',
    tags: ['Canva Pro', 'Adobe Illustrator', 'Photoshop', 'Print & Digital'],
  },
  {
    number: '02',
    name: 'Site Vitrine & Landing Page',
    price: 'Dès 300€',
    description:
      'La solution idéale pour les indépendants, artisans et commerçants. Une présence web moderne, ultra-rapide, responsive et optimisée pour capter des appels et devis clients.',
    tags: ['One-Page', 'React / HTML5', 'Responsive', 'Formulaire & SEO'],
  },
  {
    number: '03',
    name: 'Site & Application Web Sur-Mesure',
    price: 'Dès 800€',
    description:
      'Plateforme web moderne développée sur-mesure (Next.js / React) : design exclusif, temps de chargement éclair, expérience utilisateur soignée et référencement naturel technique poussé.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Multi-Pages', 'SEO Avancé'],
  },
  {
    number: '04',
    name: 'Site WordPress Clé en Main',
    price: 'Dès 1 200€',
    description:
      'Site complet et 100% administrable en toute autonomie : blog, catalogue de services ou boutique e-commerce avec tableau de bord simple pour modifier vos contenus sans coder.',
    tags: ['WordPress', 'WooCommerce', 'Espace Admin', 'Autonomie Totale'],
  },
  {
    number: '05',
    name: 'Refonte & Modernisation Web',
    price: 'Sur devis (Code ou WordPress)',
    description:
      'Audit technique et transformation graphique de votre site actuel : passage au responsive moderne, amélioration des scores de vitesse (Google Core Web Vitals) et sécurisation.',
    tags: ['Audit UX/UI', 'Refonte WordPress / Code', 'Vitesse & Sécurité'],
  },
  {
    number: '06',
    name: 'Intégration Chatbot IA & Automatisation',
    price: 'Sur devis',
    description:
      'Intégration d’un agent conversationnel intelligent connecté à vos données pour répondre à vos prospects 24/7, et automatisation de vos tâches répétitives (Zapier, Make, API).',
    tags: ['Chatbot IA', 'OpenAI API', 'Support 24/7', 'Automatisation Workflows'],
  },
];

export const ServicesSection: React.FC = () => {
  const { openModal } = useContactModal();

  return (
    <section
      id="services"
      className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 bg-[#FFFFFF] text-[#111111] rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32 shadow-[0_-30px_70px_rgba(0,0,0,0.35)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <FadeIn delay={0} y={40}>
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20 md:mb-24">
            <span className="font-bold text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FF3B00] mb-3">
              Tarifs transparents & Prestations adaptées
            </span>
            <AnimatedText
              as="h2"
              text="Mes Services"
              activeColor="#111111"
              className="text-[#111111] font-black uppercase text-center leading-none tracking-tight select-none"
              style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
            />

            <p className="font-medium text-sm sm:text-base text-[#111111]/60 max-w-xl mt-4">
              Des offres claires du produit d&apos;appel au projet sur-mesure, conçues pour booster la visibilité et la rentabilité de votre activité.
            </p>
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
                {/* Numéro géant + Prix */}
                <div className="flex items-center justify-between md:flex-col md:items-start gap-3 md:w-[220px] shrink-0">
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
                      style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.9rem)' }}
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
                        className="text-[11px] font-bold uppercase tracking-wider text-[#111111]/55 bg-[#111111]/5 px-2.5 py-1 rounded"
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
            <span>Demander un devis personnalisé</span>
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-base">↗</span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesSection;
