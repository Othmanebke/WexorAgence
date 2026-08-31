"use client";

// Sections
import HeroSection         from "@/components/sections/HeroSection";
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
    <main className="flex flex-col min-h-screen bg-[#f0f0ee]" style={{ overflowX: "clip" }}>

      {/* 01 — Hero (Fond clair signature) */}
      <HeroSection />

      {/* 02 — À propos animé (Design moderne avec objets 3D & infos réelles) */}
      <AboutSection />

      {/* 03 — Services (Design moderne avec prestations & prix réels) */}
      <ServicesSection />

      {/* 04 — Portfolio */}
      <Divider label="Mes travaux" number="02" />
      <WorkSection />

      {/* 05 — Stack technique (marquee) */}
      <Divider label="Stack technique" number="03" />
      <TechnologiesSection />

      {/* 06 — Expériences (horizontal scroll) */}
      <ExperienceSection />

      {/* 07 — Diplômes */}
      <Divider label="Formation académique" number="04" />
      <DiplomesSection />

      {/* CTA final */}
      <CTASection />

    </main>
  );
}
