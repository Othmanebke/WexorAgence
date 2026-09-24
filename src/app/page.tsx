import Preloader from "@/components/Preloader";
import StackEffect from "@/components/fx/StackEffect";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/WorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  return (
    <>
      <Preloader />
      <StackEffect />
      <main className="flex min-h-screen flex-col bg-abcs-bg" style={{ overflowX: "clip" }}>
        <HeroSection />
        <WorkSection />
        <ServicesSection />
        <TechnologiesSection />
        <AboutSection />
      </main>
    </>
  );
}
