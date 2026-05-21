"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";
import avatarPhoto from "@/img/Gemini_Generated_Image_zdg0rbzdg0rbzdg0.png";

gsap.registerPlugin(ScrollTrigger);

function LineReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "102%" }} animate={inView ? { y: 0 } : {}} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}

// 3D perspective TiltCard for portrait fashion effect
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

const skills = ["HTML / CSS", "JavaScript", "React", "Next.js", "Node.js", "WordPress", "Framer", "TypeScript", "Tailwind CSS", "Canva", "Adobe CC", "Figma", "SEO", "UX Design", "Vercel"];

const experiences = [
  { title: "Developer ServiceNow", company: "Inetum", period: "Sept 2025 — Présent", current: true, desc: "Développement et personnalisation de la plateforme ServiceNow : workflows, portails, intégrations API et automatisations ITSM." },
  { title: "Consultant ITSM & UX Designer", company: "Fujitsu France", period: "2023 — 2025 · 2 ans", current: false, desc: "Pilotage de projets ITSM, conception d'interfaces utilisateur et amélioration des processus IT en environnement grand compte." },
  { title: "Développeur Full Stack", company: "AJC Ingénieur", period: "2021 — 2023 · 1 an 5 mois", current: false, desc: "Conception et développement d'applications web full stack (React / Node.js), intégrations API et déploiement." },
];

const values = [
  { t: "Pragmatisme", d: "Des solutions axées sur les résultats, sans complexité inutile." },
  { t: "Transparence", d: "Budget et planning clairs dès le départ, zéro mauvaise surprise." },
  { t: "Qualité", d: "Performance, accessibilité et design au cœur de chaque livrable." },
  { t: "Partenariat", d: "Je travaille avec toi, pas juste pour toi — relation durable." },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useGSAP(() => {
    if (bigTextRef.current) {
      gsap.fromTo(bigTextRef.current,
        { xPercent: -5 },
        { xPercent: 3, ease: "none", scrollTrigger: { trigger: bigTextRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 } }
      );
    }
    
    // Fashion Color Inversion on Scroll for Experiences Section
    gsap.fromTo(".exp-section-wrapper", 
      { backgroundColor: "#f0f0ee", color: "#111111" },
      { 
        backgroundColor: "#111111", 
        color: "#f0f0ee", 
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-section-wrapper",
          start: "top 60%",
          end: "top 25%",
          scrub: true,
          toggleActions: "play reverse play reverse"
        }
      }
    );


    
    gsap.from(".skill-tag", {
      scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.04, ease: "back.out(1.4)",
      scrollTrigger: { trigger: ".skills-section", start: "top 80%" }
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="flex-1 flex flex-col bg-[#f0f0ee]">
      <PageHeader number="02" title="À PROPOS" subtitle={t("page_about_sub")} />

      {/* Big scrolling text */}
      <div className="w-full overflow-hidden py-8 border-b border-black/10">
        <div ref={bigTextRef} className="w-max">
          <p className="font-heading text-[#111]/[0.06] uppercase leading-none whitespace-nowrap select-none" style={{ fontSize: "clamp(6rem, 18vw, 22rem)" }}>
            OTHMANE BOUAKLINE O&apos;LDEV
          </p>
        </div>
      </div>

      {/* ─── HERO INTRO ─── */}
      <section className="w-full px-6 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* Left: avatar + infos autour */}
          <div className="md:w-5/12 shrink-0">
            <TiltCard className="relative flex flex-col gap-4">

              {/* Nom + disponible */}
              <div className="flex items-end justify-between">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-heading text-4xl md:text-5xl uppercase leading-[0.85]"
                >
                  Othmane<br />Bouakline
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 pb-1"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-[10px] uppercase tracking-widest text-emerald-400">Disponible</span>
                </motion.div>
              </div>

              {/* Photo */}
              <div className="relative w-full overflow-hidden">
                <Image
                  src={avatarPhoto}
                  alt="Othmane Bouakline"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover object-top scale-[1.15] origin-top"
                />
                {/* Barre rouge bas photo */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-abcs-red" />
              </div>

              {/* Titre + tags + badge */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-abcs-red text-sm uppercase tracking-widest">Développeur Web Freelance</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Bac+5", "Mastère Web", "5 ans XP"].map((tag) => (
                      <span key={tag} className="font-bold text-[9px] uppercase tracking-wider border border-black/20 px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Spinning badge */}
                <div className="w-16 h-16 bg-abcs-red rounded-full shrink-0 select-none shadow-lg">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-1 animate-[spin_20s_linear_infinite]">
                    <path id="circlePath2" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                    <text fill="white" className="font-bold text-[7px] uppercase font-mono">
                      <textPath href="#circlePath2">• O&apos;LDEV • FREELANCE • MASTER WEB •</textPath>
                    </text>
                  </svg>
                </div>
              </div>

            </TiltCard>
          </div>

          {/* Right: text */}
          <div className="md:w-7/12 flex flex-col gap-8">
            <LineReveal>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-[0.85]">
                QUI JE SUIS ?
              </h1>
            </LineReveal>
            <FadeUp delay={0.2}>
              <p className="font-bold text-xl leading-snug opacity-90">
                Un développeur web freelance avec une obsession : faire des sites qui <span className="text-abcs-red">convertissent et durent</span>. Diplômé d&apos;un <span className="text-abcs-red">Bac+5 Expert Informatique Web</span> avec un <span className="text-abcs-red">Mastère spécialisé en développement & architecture web</span>, j&apos;accompagne les entrepreneurs pour construire une présence digitale de haut standing.
              </p>
            </FadeUp>
            <FadeUp delay={0.35}>
              <p className="font-bold text-base opacity-55 leading-relaxed">
                Fort de 5 ans d&apos;expérience passés entre les grands comptes (Consultant ITSM & UX chez Fujitsu France, Développeur ServiceNow chez Inetum) et le freelance créatif, je possède une double vision : une rigueur technique absolue alliée à un sens poussé de l&apos;esthétique et de la conversion business.
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="grid grid-cols-2 gap-6 border-t border-black/15 pt-8">
                {[
                  { val: "10+", label: "Projets livrés" },
                  { val: "100%", label: "Satisfaction" },
                  { val: "48h", label: "Délai de réponse" },
                  { val: "5 ans", label: "D'expertise" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-heading text-5xl text-abcs-red">{s.val}</div>
                    <div className="font-bold text-[10px] uppercase tracking-widest opacity-50 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Stack technique</span>
        <span className="font-heading text-white text-xl md:text-2xl">01</span>
      </div>

      <section className="skills-section w-full px-6 md:px-8 py-16 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-none">COMPÉTENCES</h2>
          </LineReveal>
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <span key={s} className="skill-tag border border-black/20 px-5 py-3 font-bold text-sm uppercase tracking-widest hover:bg-abcs-black hover:text-white hover:border-abcs-black transition-colors duration-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCES (With GSAP Fashion Inversion & Custom Styling) ─── */}
      <div className="exp-section-wrapper transition-colors duration-700">
        <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4 text-white">
          <span className="font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">Mon parcours pro</span>
          <span className="font-heading text-xl md:text-2xl">02</span>
        </div>

        <section className="exp-section w-full px-6 md:px-8 py-16 md:py-24 bg-transparent">
          <div className="w-full max-w-7xl mx-auto">
            <LineReveal className="mb-12 md:mb-16">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-none">EXPÉRIENCES</h2>
            </LineReveal>
            <div className="flex flex-col gap-0 border-t border-current/15">
              {experiences.map((exp, i) => (
                <FadeUp key={i} delay={i * 0.1} className="w-full">
                  <div className="exp-item flex flex-col md:flex-row gap-8 py-12 border-b border-current/15 group hover:bg-abcs-red hover:text-white px-0 hover:px-8 transition-all duration-300">
                    <div className="md:w-1/3 shrink-0">
                      <div className="font-heading text-2xl md:text-3xl uppercase leading-tight mb-2 group-hover:text-white">{exp.title}</div>
                      <div className="text-abcs-red group-hover:text-white font-bold text-sm uppercase tracking-widest">@ {exp.company}</div>
                      {exp.current && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-xs text-emerald-400 uppercase">Poste actuel</span>
                        </div>
                      )}
                    </div>
                    <div className="md:w-2/3">
                      <div className="font-bold text-[10px] uppercase tracking-widest opacity-40 mb-4 group-hover:opacity-80">{exp.period}</div>
                      <p className="font-bold opacity-75 group-hover:opacity-90 leading-relaxed text-base">{exp.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ─── VALUES ─── */}
      <div className="w-full bg-abcs-red flex items-center justify-between px-6 md:px-8 py-4">
        <span className="font-bold text-white text-[10px] md:text-xs uppercase tracking-[0.2em]">Ce qui me guide</span>
        <span className="font-heading text-white text-xl md:text-2xl">03</span>
      </div>

      <section className="w-full px-6 md:px-8 py-16 bg-[#f0f0ee]">
        <div className="w-full max-w-7xl mx-auto">
          <LineReveal className="mb-12 md:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-none">MES VALEURS</h2>
          </LineReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {values.map((v, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className={`flex flex-col p-10 h-full group hover:bg-abcs-red hover:text-white transition-colors duration-300 ${i % 3 === 1 ? "bg-abcs-black text-white" : "bg-[#f0f0ee]"}`}>
                  <span className="font-bold text-[10px] uppercase tracking-widest opacity-40 mb-6">0{i + 1}</span>
                  <h3 className="font-heading text-4xl uppercase mb-4">{v.t}</h3>
                  <p className="font-bold opacity-60 group-hover:opacity-80 leading-relaxed">{v.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-abcs-black text-white py-24 md:py-32 px-6 md:px-8 flex flex-col items-center text-center">
        <LineReveal className="mb-4">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">ON CODE</h2>
        </LineReveal>
        <LineReveal delay={0.1} className="mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter text-abcs-red">ENSEMBLE ?</h2>
        </LineReveal>
        <FadeUp delay={0.35}>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-abcs-black px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-colors group">
            <span>Démarrer un projet</span>
            <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </Link>
        </FadeUp>
      </section>
    </main>
  );
}
