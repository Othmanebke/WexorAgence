"use client";

import { useLang } from "@/components/LanguageContext";

// Sections
import HeroSection       from "@/components/sections/HeroSection";
import AboutSection      from "@/components/sections/AboutSection";
import ServicesSection   from "@/components/sections/ServicesSection";
import DiplomesSection   from "@/components/sections/DiplomesSection";
import CTASection        from "@/components/sections/CTASection";

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
  const { t } = useLang();

  return (
    <main className="flex flex-col min-h-screen bg-[#f0f0ee]" style={{ overflowX: "clip" }}>

      {/* 01 — Hero + ticker */}
      <HeroSection />

      {/* 02 — Qui je suis */}
      <Divider label="Qui je suis" number="01" />
      <AboutSection />

      {/* 03 — Portfolio (all 10 projects, scroll-driven) */}
      <Divider label="Mes travaux" number="02" />
      <WorkSection />

      {/* 04 — Services (accordion) */}
      <Divider label={t("services_label")} number="03" />
      <ServicesSection />

      {/* 05 — Stack technique (marquee) */}
      <Divider label="Stack technique" number="04" />
      <TechnologiesSection />

      {/* 06 — Expériences (horizontal scroll) */}
      <ExperienceSection />

      {/* 07 — Diplômes */}
      <Divider label="Formation académique" number="05" />
      <DiplomesSection />

      {/* CTA final */}
      <CTASection />

    </main>
  );
}
