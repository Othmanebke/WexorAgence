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

// ─── Red divider bar ─────────────────────────────────────────────────────────
function Divider({ label, number }: { label: string; number: string }) {
  return (
    <div className="w-full bg-abcs-red flex items-center justify-between px-8 py-4">
      <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">{label}</span>
      <span className="font-heading text-white text-2xl">{number}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0C0C0C]" style={{ overflowX: "clip" }}>

      {/* 01 — Hero + ticker */}
      <HeroSection />

      {/* 02 — Galerie défilante Marquee */}
      <MarqueeSection />

      {/* 03 — À propos animé avec objets 3D */}
      <AboutSection />

      {/* 04 — Services interactifs */}
      <ServicesSection />

      {/* 05 — Portfolio */}
      <Divider label="Mes travaux" number="02" />
      <WorkSection />

      {/* 06 — Stack technique (marquee) */}
      <Divider label="Stack technique" number="03" />
      <TechnologiesSection />

      {/* 07 — Expériences (horizontal scroll) */}
      <ExperienceSection />

      {/* 08 — Diplômes */}
      <Divider label="Formation académique" number="04" />
      <DiplomesSection />

      {/* CTA final */}
      <CTASection />

    </main>
  );
}
