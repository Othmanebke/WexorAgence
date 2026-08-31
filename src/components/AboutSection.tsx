/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 bg-[#0C0C0C] text-white overflow-hidden select-none rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px] shadow-[0_-25px_60px_rgba(0,0,0,0.8)]"
    >

      {/* 4 Objets 3D décoratifs dans les 4 coins */}
      <div className="absolute top-[2%] sm:top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 pointer-events-none opacity-40 sm:opacity-90">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon"
            className="w-[70px] sm:w-[130px] md:w-[180px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[3%] sm:bottom-[6%] left-[2%] sm:left-[5%] md:left-[8%] z-0 pointer-events-none opacity-40 sm:opacity-90">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Object"
            className="w-[60px] sm:w-[110px] md:w-[160px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          />
        </FadeIn>
      </div>

      <div className="absolute top-[2%] sm:top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 pointer-events-none opacity-40 sm:opacity-90">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego"
            className="w-[70px] sm:w-[130px] md:w-[180px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[3%] sm:bottom-[6%] right-[2%] sm:right-[5%] md:right-[8%] z-0 pointer-events-none opacity-40 sm:opacity-90">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group"
            className="w-[75px] sm:w-[135px] md:w-[190px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          />
        </FadeIn>
      </div>


      {/* Contenu Central */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <FadeIn delay={0} y={40}>
          <p className="font-bold text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FF3B00] mb-3">
            Othmane Bouakline · Développeur Web Full Stack
          </p>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Qui je suis
          </h2>
        </FadeIn>

        <div className="h-8 sm:h-12 md:h-14" />

        {/* Badges compétences & statut */}
        <FadeIn delay={0.15} y={20} className="flex flex-wrap justify-center gap-2 mb-8 max-w-lg">
          {["Bac+5 Expert Web", "5 ans d'expérience", "React / Next.js", "Design & Conversion"].map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/80"
            >
              {tag}
            </span>
          ))}
        </FadeIn>

        {/* Texte animé au scroll avec les vraies informations */}
        <div className="max-w-[620px] px-3">
          <AnimatedText
            text="Développeur web freelance avec plus de 5 ans d'expérience et diplômé d'un Bac+5 Expert Informatique Web, j'accompagne les entreprises et créateurs pour bâtir des sites rapides, esthétiques et conçus pour convertir. Alliant rigueur technique et sens aigu du design, je donne vie à votre vision digitale !"
            className="font-medium text-base sm:text-lg md:text-xl leading-relaxed text-center text-[#D7E2EA]"
          />
        </div>

        <div className="h-12 sm:h-16 md:h-20" />

        <FadeIn delay={0.25} y={30}>
          <ContactButton label="Démarrer un projet" />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
