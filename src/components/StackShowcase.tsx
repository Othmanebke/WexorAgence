"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    n: "01",
    label: "FRONTEND",
    headline: "L'interface\nqui captive.",
    color: "#f0f0ee",
    accent: "#FF3B00",
    techs: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 96 },
      { name: "Framer Motion", level: 85 },
      { name: "GSAP", level: 80 },
    ],
    desc: "Des interfaces qui captivent et convertissent. Chaque pixel pensé pour l'expérience.",
  },
  {
    n: "02",
    label: "BACKEND",
    headline: "L'architecture\nqui tient.",
    color: "#111111",
    accent: "#FF3B00",
    techs: [
      { name: "Node.js", level: 82 },
      { name: "Supabase", level: 88 },
      { name: "PostgreSQL", level: 78 },
      { name: "REST API", level: 90 },
      { name: "Vercel / CI-CD", level: 92 },
    ],
    desc: "Une infrastructure solide, sécurisée et scalable pour chaque projet.",
  },
  {
    n: "03",
    label: "DESIGN",
    headline: "L'œil\navant le code.",
    color: "#FF3B00",
    accent: "#111111",
    techs: [
      { name: "Figma", level: 91 },
      { name: "Adobe Illustrator", level: 78 },
      { name: "Photoshop", level: 74 },
      { name: "InDesign", level: 70 },
      { name: "Canva Pro", level: 95 },
    ],
    desc: "Identité visuelle, print, motion — le design comme langage stratégique.",
  },
  {
    n: "04",
    label: "AUTOMATION",
    headline: "La tech\nqui libère.",
    color: "#111111",
    accent: "#FF3B00",
    techs: [
      { name: "ServiceNow / ITSM", level: 87 },
      { name: "OpenAI API", level: 79 },
      { name: "Zapier / n8n", level: 82 },
      { name: "Git / CI-CD", level: 88 },
      { name: "WordPress CMS", level: 93 },
    ],
    desc: "Automatisation, IA intégrée et workflows qui font le travail à ta place.",
  },
];

const allTechs = [
  "REACT", "NEXT.JS", "TAILWIND", "TYPESCRIPT", "GSAP", "NODE.JS",
  "SUPABASE", "FIGMA", "SERVICENOW", "VERCEL", "FRAMER", "POSTGRESQL",
  "WORDPRESS", "OPENAI", "PHOTOSHOP", "ILLUSTRATOR",
];

export default function StackShowcase() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Marquee 1 (→ right to left)
      if (marquee1Ref.current) {
        const inner = marquee1Ref.current.querySelector(".mq-inner");
        gsap.to(inner, { xPercent: -50, repeat: -1, duration: 22, ease: "none" });
      }

      // ── Marquee 2 (← left to right)
      if (marquee2Ref.current) {
        const inner = marquee2Ref.current.querySelector(".mq-inner");
        gsap.fromTo(inner, { xPercent: -50 }, { xPercent: 0, repeat: -1, duration: 18, ease: "none" });
      }

      // ── Horizontal scroll
      if (outerRef.current && trackRef.current) {
        const slides = trackRef.current.querySelectorAll(".hs-slide");
        const totalSlides = slides.length;

        gsap.to(trackRef.current, {
          xPercent: -(100 - 100 / totalSlides),
          ease: "none",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top top",
            end: `+=${(totalSlides - 1) * 100}%`,
            scrub: 1.2,
            pin: stickyRef.current,
            anticipatePin: 1,
          },
        });

        // ── Progress bars animate when slide is active
        slides.forEach((slide, i) => {
          const bars = slide.querySelectorAll(".skill-bar-fill");
          bars.forEach((bar) => {
            const target = (bar as HTMLElement).dataset.level || "0";
            gsap.fromTo(
              bar,
              { scaleX: 0 },
              {
                scaleX: parseInt(target) / 100,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: outerRef.current,
                  start: `${i * 100}% top`,
                  end: `${i * 100 + 50}% top`,
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

          // Number watermark parallax
          const num = slide.querySelector(".slide-num-watermark");
          if (num) {
            gsap.fromTo(
              num,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 0.04,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: outerRef.current,
                  start: `${i * 100}% top`,
                  end: `${i * 100 + 30}% top`,
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full">

      {/* ── INTRO HEADER ── */}
      <div className="w-full bg-[#111] px-8 pt-24 pb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 pb-16">
          <div className="flex flex-col gap-4">
            <div className="font-bold text-abcs-red text-[10px] uppercase tracking-[0.25em]">Notre Stack</div>
            <h2 className="font-heading text-white text-5xl md:text-8xl lg:text-[9rem] uppercase leading-[0.85] tracking-tighter">
              NOS<br />OUTILS.
            </h2>
          </div>
          <p className="font-bold text-white/40 text-base md:text-lg max-w-sm leading-relaxed pb-4">
            Chaque technologie maîtrisée est un levier supplémentaire pour ton projet. Fais défiler.
          </p>
        </div>

        {/* ── MARQUEE 1 (→) ── */}
        <div ref={marquee1Ref} className="overflow-hidden border-t border-white/10 py-5">
          <div className="mq-inner flex whitespace-nowrap w-max">
            {[...allTechs, ...allTechs].map((t, i) => (
              <span key={i} className="font-heading text-white/20 uppercase text-6xl md:text-8xl leading-none mx-6 select-none">
                {t}
                <span className="text-abcs-red mx-4 text-4xl">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── MARQUEE 2 (←) ── */}
        <div ref={marquee2Ref} className="overflow-hidden border-t border-white/10 py-5">
          <div className="mq-inner flex whitespace-nowrap w-max">
            {[...allTechs.slice().reverse(), ...allTechs.slice().reverse()].map((t, i) => (
              <span key={i} className="font-heading text-abcs-red/30 uppercase text-6xl md:text-8xl leading-none mx-6 select-none">
                {t}
                <span className="text-white/20 mx-4 text-4xl">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HORIZONTAL SCROLL SECTION ── */}
      <div ref={outerRef} style={{ height: `${categories.length * 100}vh` }} className="relative w-full">
        <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
          <div ref={trackRef} className="flex h-full" style={{ width: `${categories.length * 100}vw` }}>

            {categories.map((cat, i) => {
              const isDark = cat.color === "#111111" || cat.color === "#FF3B00";
              const textColor = cat.color === "#f0f0ee" ? "text-[#111]" : "text-white";
              const borderColor = cat.color === "#f0f0ee" ? "border-black/10" : "border-white/10";

              return (
                <div
                  key={cat.n}
                  className="hs-slide relative h-full flex-shrink-0 overflow-hidden flex flex-col justify-between px-12 md:px-20 pt-20 pb-12"
                  style={{ width: "100vw", backgroundColor: cat.color }}
                >
                  {/* Watermark number */}
                  <div
                    className="slide-num-watermark absolute left-0 bottom-0 font-heading leading-none select-none pointer-events-none"
                    style={{
                      fontSize: "clamp(18rem, 42vw, 56rem)",
                      color: isDark ? "#ffffff" : "#111111",
                      opacity: 0.04,
                      lineHeight: 0.75,
                    }}
                  >
                    {cat.n}
                  </div>

                  {/* Progress indicator */}
                  <div className={`flex items-center gap-3 z-10 ${textColor}`}>
                    <span className="font-bold text-[10px] uppercase tracking-[0.25em] opacity-40">{cat.n} / 0{categories.length}</span>
                    <div className={`flex-1 h-px max-w-[80px] ${borderColor} border-b`} />
                    <span className="font-bold text-[10px] uppercase tracking-[0.25em] opacity-40">{cat.label}</span>
                  </div>

                  {/* Main content */}
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 z-10 relative flex-1 pt-12">

                    {/* Left: headline + desc */}
                    <div className="md:w-5/12">
                      <h3
                        className={`font-heading uppercase leading-[0.85] tracking-tighter ${textColor} mb-8`}
                        style={{ fontSize: "clamp(3.5rem, 7vw, 9rem)" }}
                      >
                        {cat.headline.split("\n").map((line, j) => (
                          <span key={j} className="block">
                            {j === 1 ? <span style={{ color: cat.accent }}>{line}</span> : line}
                          </span>
                        ))}
                      </h3>
                      <p className={`font-bold text-base leading-relaxed max-w-xs opacity-50 ${textColor}`}>
                        {cat.desc}
                      </p>
                    </div>

                    {/* Right: skill bars */}
                    <div className="md:w-5/12 flex flex-col gap-5">
                      {cat.techs.map((tech, j) => (
                        <div key={tech.name} className="flex flex-col gap-2">
                          <div className={`flex items-center justify-between font-bold text-xs uppercase tracking-widest ${textColor}`}>
                            <span className="opacity-70">{tech.name}</span>
                            <span style={{ color: cat.accent }} className="opacity-80">{tech.level}%</span>
                          </div>
                          <div className={`w-full h-px relative`} style={{ backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)" }}>
                            <div
                              className="skill-bar-fill absolute left-0 top-0 h-full origin-left"
                              data-level={tech.level}
                              style={{ width: "100%", backgroundColor: cat.accent, transform: "scaleX(0)" }}
                            />
                          </div>
                        </div>
                      ))}

                      {/* Category badge */}
                      <div className={`mt-4 inline-flex items-center gap-3 border ${borderColor} px-4 py-2 w-fit`}>
                        <span className="font-bold text-[9px] uppercase tracking-[0.25em]" style={{ color: cat.accent }}>{cat.label}</span>
                        <span className={`font-bold text-[9px] uppercase tracking-[0.2em] opacity-30 ${textColor}`}>{cat.techs.length} technologies</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom label */}
                  <div className={`flex items-center justify-between z-10 border-t ${borderColor} pt-6`}>
                    <span className={`font-bold text-[10px] uppercase tracking-[0.25em] opacity-25 ${textColor}`}>Wexor Agence · Stack {cat.n}</span>
                    <span className="font-heading text-4xl" style={{ color: cat.accent }}>{cat.n}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="w-full bg-abcs-red text-white px-8 py-8 flex items-center justify-between">
        <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Notre arsenal</span>
        <div className="hidden md:flex items-center gap-12">
          {[
            { val: "14+", label: "Technologies" },
            { val: "5 ans", label: "D'expérience" },
            { val: "50+", label: "Projets livrés" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="font-heading text-3xl">{s.val}</span>
              <span className="font-bold text-[10px] uppercase tracking-widest opacity-70">{s.label}</span>
            </div>
          ))}
        </div>
        <span className="font-heading text-2xl">06</span>
      </div>
    </section>
  );
}
