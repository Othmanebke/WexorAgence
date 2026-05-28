"use client";

import Image from "next/image";
import { LineReveal, FadeUp } from "@/components/ui/Reveal";
import { useContactModal } from "@/components/ContactModalProvider";
import aboutPhoto from "@/img/cravate-orange.png";

const STATS = [
  { val: "10+",  label: "Projets livrés" },
  { val: "100%", label: "Satisfaction" },
  { val: "48h",  label: "Délai de réponse" },
  { val: "5 ans",label: "D'expertise" },
];

export default function AboutSection() {
  const { openModal } = useContactModal();

  return (
    <section id="about" className="w-full py-16 md:py-24 px-6 md:px-8 bg-[#f0f0ee] border-b border-black/10">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">

        {/* Photo */}
        <FadeUp className="w-full sm:w-3/4 sm:mx-auto md:w-5/12 md:mx-0 shrink-0">
          <div className="relative overflow-hidden bg-abcs-black">
            <Image
              src={aboutPhoto}
              alt="Othmane Bouakline"
              width={600}
              height={700}
              className="w-full h-auto object-cover object-top scale-[1.08] origin-top"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-abcs-red" />
            <div className="flex flex-col gap-1 absolute top-8 left-8 z-10">
              {["const dev = 'Othmane';", "const brand = \"O'ldev\";", "const style = 'brutalist';"].map((line, i) => (
                <p key={i} className="font-mono text-xs text-white/40">
                  <span className="text-abcs-red">{line.split("=")[0]}=</span>
                  {line.split("=")[1]}
                </p>
              ))}
            </div>
            <div className="absolute bottom-6 left-6 z-10 flex flex-wrap gap-1.5">
              {["Bac+5", "Mastère Web", "5 ans XP"].map((tag) => (
                <span key={tag} className="font-bold text-[9px] uppercase tracking-wider border border-white/20 px-2.5 py-1 text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Text */}
        <div className="w-full md:w-7/12 flex flex-col gap-8">
          <LineReveal>
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight uppercase">
              Qui je<br />suis.
            </h2>
          </LineReveal>

          <FadeUp delay={0.2}>
            <p className="font-bold text-xl leading-snug opacity-90">
              Un développeur web freelance avec une obsession : faire des sites qui{" "}
              <span className="text-abcs-red">convertissent et durent</span>. Diplômé d&apos;un{" "}
              <span className="text-abcs-red">Bac+5 Expert Informatique Web</span>, j&apos;accompagne
              les entrepreneurs pour construire une présence digitale de haut standing.
            </p>
          </FadeUp>

          <FadeUp delay={0.35}>
            <p className="font-bold text-base opacity-55 leading-relaxed">
              Fort de 5 ans d&apos;expérience passés entre les grands comptes (Consultant ITSM & UX chez
              Fujitsu France, Développeur ServiceNow chez Inetum) et le freelance créatif, je possède
              une double vision : rigueur technique absolue et sens poussé de l&apos;esthétique.
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="grid grid-cols-2 gap-6 border-t border-black/15 pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-heading text-5xl text-abcs-red">{s.val}</div>
                  <div className="font-bold text-[10px] uppercase tracking-widest opacity-50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.6}>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-3 bg-abcs-black text-white px-7 py-4 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 group w-fit"
            >
              <span>Démarrer un projet</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
