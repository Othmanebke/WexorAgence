"use client";

// Sections
import HeroSection         from "@/components/sections/HeroSection";
import { MarqueeSection }  from "@/components/MarqueeSection";
import { AboutSection }    from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import DiplomesSection     from "@/components/sections/DiplomesSection";
import CTASection          from "@/components/sections/CTASection";

// Feature components
import WorkSection         from "@/components/WorkSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import ExperienceSection   from "@/components/ExperienceSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#f0f0ee]" style={{ overflowX: "clip" }}>

      {/* 01 — Hero */}
      <HeroSection />

      {/* 02 — Galerie défilante en double rangée (Carte superposée) */}
      <MarqueeSection />

      {/* 03 — À propos animé (Carte superposée 3D & infos réelles) */}
      <AboutSection />

      {/* 04 — Services (Carte blanche superposée avec tarifs réels) */}
      <ServicesSection />

      {/* 05 — Portfolio (Carte 3D sombre superposée) */}
      <WorkSection />

      {/* 06 — Stack technique (Carte sombre superposée) */}
      <TechnologiesSection />

      {/* 07 — Expériences (Carte superposée défilement horizontal) */}
      <ExperienceSection />

      {/* 08 — Diplômes (Carte superposée) */}
      <DiplomesSection />

      {/* 09 — CTA final (Carte superposée) */}
      <CTASection />

    </main>
  );
}
