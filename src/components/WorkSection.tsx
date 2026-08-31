'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContactModal } from '@/components/ContactModalProvider';
import { AnimatedText } from '@/components/AnimatedText';


gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'neuroflow',
    name: 'NeuroFlow SaaS',
    category: 'Design · React · IA',
    tagline: 'Interface SaaS pour analyse de données neuronales avec IA intégrée, dashboards temps réel et visualisations interactives.',
    stack: ['React', 'Vite', 'Tailwind', 'IA'],
    image: '/portfolio/NeuroFlow-SAAS-IA-VITETailwindreact.png',
    year: '2024',
  },
  {
    id: 'forma',
    name: 'Forma Immobilier',
    category: 'Agence · Next.js',
    tagline: "Agence immobilière avec moteur de recherche avancé, fiches biens, prise de rendez-vous et espace propriétaire sécurisé.",
    stack: ['Next.js', 'Tailwind', 'React'],
    image: '/portfolio/FORMA-agenceimmo-NEXTtailwindReact.png',
    year: '2024',
  },
  {
    id: 'wondercut',
    name: 'WonderCut',
    category: 'Concept · Next.js',
    tagline: 'Design haut de gamme pour barbier urbain — système de réservation en ligne, galerie et branding sur-mesure.',
    stack: ['Next.js', 'Tailwind', 'Framer'],
    image: '/portfolio/WONDERCUT-Concetdesignbarbeur-nexttailwinnd.png',
    year: '2024',
  },
  {
    id: 'luxecars',
    name: 'LuxeCars',
    category: 'Location · React',
    tagline: 'Plateforme premium de location de voitures de luxe — catalogue filtrable, réservation instantanée et paiement sécurisé.',
    stack: ['React', 'Vite', 'Tailwind'],
    image: '/portfolio/luxecarsLocationDeVoitureReactViteTailwindCss.png',
    year: '2024',
  },
  {
    id: 'aivana',
    name: 'Aivana SaaS',
    category: 'Dashboard · IA',
    tagline: 'Tableau de bord SaaS intelligent avec analyses prédictives, automatisation IA et rapports personnalisés.',
    stack: ['Next.js', 'Tailwind', 'OpenAI'],
    image: '/portfolio/AivanaFlyes-SAASdashboardIA-NextTailwind.png',
    year: '2024',
  },
  {
    id: 'parfumerie',
    name: 'Maison Parfumerie',
    category: 'E-commerce · Next.js',
    tagline: "Boutique e-commerce haut de gamme — catalogue produits, panier, paiement Stripe et interface d'administration intuitive.",
    stack: ['Next.js', 'React', 'Tailwind'],
    image: '/portfolio/Maison-ecommerceParfumerie-reactnexttailwind.png',
    year: '2024',
  },
  {
    id: 'verdure',
    name: 'Maison Verdure',
    category: 'Site Vitrine · HTML',
    tagline: "Site vitrine premium pour une boulangerie artisanale — menu interactif, histoire de la maison et commandes en ligne.",
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/portfolio/MaisonVerdure-SiteVitrineBoulangerei-HTMLCSSJS.png',
    year: '2024',
  },
  {
    id: 'sora',
    name: 'Sora Thai',
    category: 'Restaurant · HTML',
    tagline: "Site élégant pour restaurant thaïlandais — carte animée, galerie immersive et module de réservation en ligne.",
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/portfolio/SORA-RESTAUTHAI-HTMLCSSJS.png',
    year: '2024',
  },
  {
    id: 'ajt',
    name: 'AJT Blog',
    category: 'Blog · React',
    tagline: 'Blog moderne avec système de catégories, recherche plein texte, commentaires et tableau de bord auteur.',
    stack: ['React', 'Next.js', 'Tailwind'],
    image: '/portfolio/Ajt-Blog-REACTTAILWINDnext.png',
    year: '2024',
  },
  {
    id: 'brows',
    name: 'Brows Creative',
    category: 'E-commerce · WordPress',
    tagline: 'Boutique WooCommerce pour salon de beauté — catalogue soins, réservations en ligne et espace boutique intégré.',
    stack: ['WordPress', 'WooCommerce', 'Elementor'],
    image: '/portfolio/BROWSCREATIVE-SalonCILS&Sourcils-WordpressWoocommerce.png',
    year: '2024',
  },
] as const;

type Project = (typeof PROJECTS)[number];

const SCENE_COUNT = PROJECTS.length + 1; // scene 0 = overview/intro

// ─── 4-face continuous prism with 100% identical uniform 16:9 dimensions ───────
const FACE_TRANSFORMS = [
  'rotateY(0deg) translateZ(calc(var(--cw) / 2))',
  'rotateY(90deg) translateZ(calc(var(--cw) / 2))',
  'rotateY(180deg) translateZ(calc(var(--cw) / 2))',
  'rotateY(270deg) translateZ(calc(var(--cw) / 2))',
];

const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

function getCubeTransform(progress: number): { rx: number; ry: number } {
  const t = progress * (SCENE_COUNT - 1);
  const i = Math.min(Math.floor(t), SCENE_COUNT - 2);
  const f = easeIO(t - i);
  const aRy = -i * 90;
  const bRy = -(i + 1) * 90;
  return { rx: -2, ry: aRy + (bRy - aRy) * f };
}

function sceneFromProgress(progress: number): number {
  return Math.min(SCENE_COUNT - 1, Math.floor(progress * SCENE_COUNT));
}

function deriveFaceImages(sceneIdx: number): (number | null)[] {
  const images: (number | null)[] = [null, null, null, null];
  if (sceneIdx === 0) {
    // Scene 0: Overview / Intro face is purely black/dark
    images[0] = null;
    images[1] = 0; // Preload Project 1 onto face 1
    return images;
  }
  for (let offset = -2; offset <= 2; offset++) {
    const s = sceneIdx + offset;
    if (s <= 0 || s >= SCENE_COUNT) continue;
    const fi = ((s % 4) + 4) % 4;
    const pi = s - 1;
    if (pi >= 0 && pi < PROJECTS.length) {
      images[fi] = pi;
    }
  }
  return images;
}


// ─── Background particles canvas ──────────────────────────────────────────────
function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    let w = 0, h = 0;
    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    interface Dot { x: number; y: number; vx: number; vy: number; r: number; a: number; aMin: number; aMax: number; aDir: number; aSpd: number; }
    const make = (): Dot => {
      const isStar = Math.random() < 0.25;
      const aMax = isStar ? 0.1 + Math.random() * 0.08 : 0.035 + Math.random() * 0.05;
      const aMin = aMax * 0.15;
      return { x: Math.random() * (w || 1920), y: Math.random() * (h || 1080), vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.14 - 0.02, r: isStar ? 0.7 + Math.random() * 0.8 : 0.3 + Math.random() * 0.5, a: aMin + Math.random() * (aMax - aMin), aMin, aMax, aDir: Math.random() < 0.5 ? 1 : -1, aSpd: 0.0002 + Math.random() * 0.0004 };
    };
    const dots: Dot[] = Array.from({ length: 120 }, make);
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < -2) d.x = w + 2; else if (d.x > w + 2) d.x = -2;
        if (d.y < -2) d.y = h + 2; else if (d.y > h + 2) d.y = -2;
        d.a += d.aSpd * d.aDir;
        if (d.a >= d.aMax) { d.a = d.aMax; d.aDir = -1; } else if (d.a <= d.aMin) { d.a = d.aMin; d.aDir = 1; }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.a.toFixed(3)})`;
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

// ─── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, align, onContact }: { project: Project; align: 'left' | 'right'; onContact: () => void }) {
  const right = align === 'right';
  const F = 'var(--font-inter), system-ui, sans-serif';
  const FH = 'var(--font-archivo), system-ui, sans-serif';
  return (
    <div style={{ padding: '1.75rem 1.5rem', background: 'rgba(10,10,10,0.95)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', borderLeft: right ? 'none' : '1px solid rgba(255,255,255,0.07)', borderRight: right ? '1px solid rgba(255,255,255,0.07)' : 'none', backdropFilter: 'blur(16px)', borderRadius: '12px' }}>
      {/* Red accent line */}
      <div style={{ width: '1.75rem', height: '2px', background: '#FF3B00', marginBottom: '1.1rem', marginLeft: right ? 'auto' : 0 }} />
      {/* Category · year */}
      <p style={{ fontFamily: F, fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem', textAlign: right ? 'right' : 'left' }}>
        {project.category}&nbsp;·&nbsp;{project.year}
      </p>
      {/* Name */}
      <h3 style={{ fontFamily: FH, fontWeight: 900, fontSize: 'clamp(1.4rem, 2.3vw, 2.1rem)', letterSpacing: '-0.03em', lineHeight: 0.95, color: 'rgba(255,255,255,0.95)', marginBottom: '0.9rem', textTransform: 'uppercase', textAlign: right ? 'right' : 'left' }}>
        {project.name}
      </h3>
      {/* Tagline */}
      <p style={{ fontFamily: F, fontSize: '0.75rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.45)', marginBottom: '1.1rem', textAlign: right ? 'right' : 'left' }}>
        {project.tagline}
      </p>
      {/* Stack pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem', justifyContent: right ? 'flex-end' : 'flex-start' }}>
        {project.stack.map((t) => (
          <span key={t} style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', fontFamily: F, fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>{t}</span>
        ))}
      </div>
      {/* CTA */}
      <div style={{ display: 'flex', justifyContent: right ? 'flex-end' : 'flex-start' }}>
        <button
          onClick={onContact}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(255,59,0,0.5)', color: '#FF3B00', fontFamily: F, fontSize: '0.55rem', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.55rem 1rem', background: 'rgba(255,59,0,0.06)', cursor: 'pointer', transition: 'all 0.25s', borderRadius: '6px' }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = '#FF3B00'; el.style.color = '#fff'; el.style.borderColor = '#FF3B00'; }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'rgba(255,59,0,0.06)'; el.style.color = '#FF3B00'; el.style.borderColor = 'rgba(255,59,0,0.5)'; }}
        >
          Démarrer ce projet ↗
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function WorkSection() {
  const { openModal } = useContactModal();
  const sectionRef = useRef<HTMLElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const hudPctRef = useRef<HTMLDivElement>(null);
  const hudFillRef = useRef<HTMLDivElement>(null);
  const hudSceneRef = useRef<HTMLDivElement>(null);
  const captionNumRef = useRef<HTMLDivElement>(null);
  const captionLabelRef = useRef<HTMLDivElement>(null);

  const [activeScene, setActiveScene] = useState(0);
  const activeSceneRef = useRef(0);
  const [faceImages, setFaceImages] = useState<(number | null)[]>(() => deriveFaceImages(0));

  const F = 'var(--font-inter), sans-serif';
  const FH = 'var(--font-archivo), sans-serif';
  const FM = 'monospace';

  useEffect(() => {
    if (!sectionRef.current || !cubeRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        const p = self.progress;
        const { rx, ry } = getCubeTransform(p);
        cubeRef.current!.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        const pct = Math.round(p * 100);
        if (hudPctRef.current) hudPctRef.current.textContent = String(pct).padStart(3, '0') + '%';
        if (hudFillRef.current) hudFillRef.current.style.width = `${pct}%`;
        const newScene = sceneFromProgress(p);
        if (newScene !== activeSceneRef.current) {
          activeSceneRef.current = newScene;
          const label = newScene === 0 ? 'OVERVIEW' : PROJECTS[newScene - 1].category.toUpperCase();
          if (hudSceneRef.current) hudSceneRef.current.textContent = label;
          if (captionNumRef.current) captionNumRef.current.textContent = String(newScene).padStart(2, '0');
          if (captionLabelRef.current) captionLabelRef.current.textContent = label;
          setActiveScene(newScene);
          setFaceImages(deriveFaceImages(newScene));
        }
      },
    });
    return () => trigger.kill();
  }, []);

  const project = activeScene > 0 ? PROJECTS[activeScene - 1] : null;
  const isRight = activeScene > 0 && activeScene % 2 === 0;

  return (
    <section ref={sectionRef} id="portfolio" style={{ height: `${SCENE_COUNT * 100}vh`, background: '#111111', position: 'relative' }} className="relative z-20 -mt-10 sm:-mt-14 md:-mt-20 rounded-t-[36px] sm:rounded-t-[50px] md:rounded-t-[64px] shadow-[0_-30px_70px_rgba(0,0,0,0.9)]">
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }} className="rounded-t-[36px] sm:rounded-t-[50px] md:rounded-t-[64px]">

        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <BackgroundCanvas />
          <motion.div aria-hidden style={{ position: 'absolute', top: '-20%', left: '-15%', width: '75vw', height: '75vw', background: 'radial-gradient(ellipse at center, rgba(255,59,0,0.04) 0%, rgba(255,59,0,0.01) 40%, transparent 70%)' }} animate={{ x: [0, 40, -25, 0], y: [0, 30, -40, 0] }} transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div aria-hidden style={{ position: 'absolute', bottom: '-25%', right: '-18%', width: '70vw', height: '70vw', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.006) 45%, transparent 70%)' }} animate={{ x: [0, -35, 20, 0], y: [0, -25, 35, 0] }} transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        {/* En-tête centré en haut avec AnimatedText */}
        <div className="absolute top-5 sm:top-7 left-0 right-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-4">
          <span className="font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#FF3B00] mb-1">
            02 · Réalisations & Projets récents
          </span>
          <AnimatedText
            as="h2"
            text="Mes travaux"
            activeColor="#FFFFFF"
            className="font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 60px)' }}
          />
        </div>


        {/* HUD top-right */}
        <div className="absolute top-7 right-8 z-20 text-right">
          <div ref={hudPctRef} style={{ fontFamily: FM, fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}>000%</div>
          <div style={{ width: '6rem', height: '1px', background: 'rgba(255,255,255,0.08)', marginTop: '0.4rem', marginLeft: 'auto', position: 'relative', overflow: 'hidden' }}>
            <div ref={hudFillRef} style={{ position: 'absolute', inset: '0 auto 0 0', width: '0%', background: '#FF3B00' }} />
          </div>
          <div ref={hudSceneRef} style={{ fontFamily: F, fontSize: '0.45rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginTop: '0.3rem' }}>OVERVIEW</div>
        </div>

        {/* Nav dots left */}
        <div className="absolute left-7 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2">
          {Array.from({ length: SCENE_COUNT }, (_, i) => (
            <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: i === activeScene ? '#FF3B00' : 'rgba(255,255,255,0.18)', transform: i === activeScene ? 'scale(1.6)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>

        {/* 3D 100% Homogeneous 16:9 Rotating Carousel */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', perspective: '1200px', pointerEvents: 'none', zIndex: 2 }}>
          <div
            ref={cubeRef}
            style={{
              '--cw': 'min(76vw, 760px)',
              '--ch': 'calc(var(--cw) * 9 / 16)',
              width: 'var(--cw)',
              height: 'var(--ch)',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(-2deg) rotateY(0deg)',
              flexShrink: 0,
            } as React.CSSProperties}
          >
            {([0, 1, 2, 3] as const).map((fi) => (
              <div
                key={fi}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: FACE_TRANSFORMS[fi],
                  background: 'linear-gradient(145deg, #181818 0%, #0c0c0c 100%)',
                  boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)',
                }}
              >
                {faceImages[fi] !== null ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={PROJECTS[faceImages[fi]!].image}
                      alt={PROJECTS[faceImages[fi]!].name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 90vw, 760px"
                      priority
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)' }} />
                  </div>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0e0e0e]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#FF3B00] animate-pulse shadow-[0_0_10px_#FF3B00]" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-white/30">
                        Défiler pour explorer ↓
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile card below carousel */}
          <div className="md:hidden" style={{ marginTop: '1rem', width: 'min(90vw, 420px)', flexShrink: 0, pointerEvents: 'auto' }}>
            <AnimatePresence mode="wait">
              {activeScene > 0 && project && (
                <motion.div key={`mob-${activeScene}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.32 }}>
                  <ProjectCard project={project} align="left" onContact={openModal} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop left card slot */}

        <div className="absolute hidden md:block z-10" style={{ left: 'clamp(3rem, 6vw, 6rem)', top: '50%', transform: 'translateY(-50%)', width: 'min(22rem, 30%)' }}>
          <AnimatePresence mode="wait">
            {!isRight && activeScene > 0 && project && (
              <motion.div key={`left-${activeScene}`} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.38 }}>
                <ProjectCard project={project} align="left" onContact={openModal} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop right card slot */}
        <div className="absolute hidden md:block z-10" style={{ right: 'clamp(3rem, 6vw, 6rem)', top: '50%', transform: 'translateY(-50%)', width: 'min(22rem, 30%)' }}>
          <AnimatePresence mode="wait">
            {isRight && activeScene > 0 && project && (
              <motion.div key={`right-${activeScene}`} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 14 }} transition={{ duration: 0.38 }}>
                <ProjectCard project={project} align="right" onContact={openModal} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Counter bottom-right */}
        <div className="absolute bottom-7 right-8 z-20" style={{ pointerEvents: 'none', textAlign: 'right' }}>
          <span style={{ fontFamily: FM, fontSize: '0.55rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)' }}>
            {String(activeScene).padStart(2, '0')}&nbsp;/&nbsp;{String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>

        {/* Caption bottom-center */}
        <div className="absolute bottom-7 left-1/2 z-20" style={{ transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
          <div ref={captionNumRef} style={{ fontFamily: FM, fontSize: '0.45rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.2rem' }}>00</div>
          <div ref={captionLabelRef} style={{ fontFamily: FH, fontWeight: 900, fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.08)' }}>OVERVIEW</div>
        </div>
      </div>
    </section>
  );
}
