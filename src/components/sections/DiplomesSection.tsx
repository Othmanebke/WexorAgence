"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedText } from "@/components/AnimatedText";



gsap.registerPlugin(ScrollTrigger);

const DIPLOMES = [
  {
    level: "Bac+5",
    title: "Master 2 Expert Informatique Web",
    subtitle: "Développement & Architecture Web — en cours",
    school: "RNCP Niveau 7",
    year: "2026",
    highlight: true,
  },
  {
    level: "Bac+4",
    title: "Master 1 Expert Informatique Web",
    subtitle: "Développement & Architecture Web",
    school: "RNCP Niveau 7",
    year: "2025",
    highlight: false,
  },
  {
    level: "Bac+3",
    title: "Bachelor Informatique",
    subtitle: "Informatique & Développement Logiciel",
    school: "Formation professionnelle",
    year: "2023",
    highlight: false,
  },
  {
    level: "Bac+2",
    title: "Développeur Full Stack",
    subtitle: "Développement web & applications métier",
    school: "AJC Formation",
    year: "2022",
    highlight: false,
  },
  {
    level: "Bac",
    title: "Baccalauréat Technologique",
    subtitle: "Sciences & Technologies du Management",
    school: "Lycée",
    year: "2019",
    highlight: false,
  },
];

export default function DiplomesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".diploma-item", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="diplomes"
      className="relative z-20 -mt-10 sm:-mt-14 md:-mt-20 w-full py-16 md:py-24 px-6 md:px-8 bg-abcs-black text-white rounded-t-[36px] sm:rounded-t-[50px] md:rounded-t-[64px] shadow-[0_-30px_70px_rgba(0,0,0,0.85)]"
    >

      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <AnimatedText
            as="h2"
            text="Diplômes"
            activeColor="#FFFFFF"
            justify="start"
            className="font-heading text-6xl md:text-9xl uppercase leading-none tracking-tight select-none"
          />
        </div>


        <div className="flex flex-col border-t border-white/10">
          {DIPLOMES.map((d, i) => (
            <div
              key={i}
              className={`diploma-item flex flex-col md:flex-row gap-6 md:gap-12 items-start py-10 border-b border-white/10 group transition-colors duration-300 ${
                d.highlight ? "hover:bg-abcs-red" : "hover:bg-white/5"
              }`}
            >
              {/* Level badge */}
              <div className="shrink-0 md:w-28">
                <span
                  className={`inline-block font-heading text-lg uppercase px-3 py-1 border transition-colors duration-300 ${
                    d.highlight
                      ? "border-abcs-red text-abcs-red group-hover:border-white group-hover:text-white"
                      : "border-white/20 text-white/40"
                  }`}
                >
                  {d.level}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-1">
                <h3 className={`font-heading text-2xl md:text-3xl uppercase leading-tight ${
                  d.highlight ? "text-white" : "text-white/80"
                }`}>
                  {d.title}
                </h3>
                <p className="font-bold text-sm opacity-50 group-hover:opacity-70 transition-opacity">{d.subtitle}</p>
                <p className={`font-bold text-xs uppercase tracking-widest mt-1 transition-colors duration-300 ${
                  d.highlight ? "text-abcs-red group-hover:text-white" : "text-white/30"
                }`}>
                  {d.school}
                </p>
              </div>

              {/* Year */}
              <div className="shrink-0 font-heading text-4xl md:text-5xl text-white/15 group-hover:text-white/30 transition-colors duration-300">
                {d.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
