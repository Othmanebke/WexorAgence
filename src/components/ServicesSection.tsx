"use client";

import React from 'react';
import { FadeIn } from './FadeIn';

const SERVICES = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Titre */}
        <FadeIn delay={0} y={40}>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28 select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Liste des Services */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={25}
              className={`py-8 sm:py-10 md:py-12 border-t border-[#0C0C0C]/15 ${
                index === SERVICES.length - 1 ? 'border-b' : ''
              } group transition-colors duration-300`}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 sm:gap-8 md:gap-12">
                {/* Numéro géant */}
                <div
                  className="font-black text-[#0C0C0C] leading-none select-none transition-transform duration-300 group-hover:translate-x-2"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </div>

                {/* Nom + Description */}
                <div className="flex-1 flex flex-col gap-2 sm:gap-3 md:gap-4 sm:pl-4">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
