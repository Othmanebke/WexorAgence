'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContactModal } from '@/components/ContactModalProvider';

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

// ─── Cube geometry ─────────────────────────────────────────────────────────────
const SCENE_COUNT = PROJECTS.length + 1; // scene 0 = intro

function faceAtStop(i: number): number {
  if (i < 6) return i;
  return 1 + ((i - 2) % 4);
}

const FACE_TRANSFORMS: string[] = [
  'rotateX(-90deg) translateZ(calc(var(--ch) / 2))',
  'translateZ(calc(var(--cw) / 2))',
  'rotateY(90deg) translateZ(calc(var(--cw) / 2))',
  'rotateY(180deg) translateZ(calc(var(--cw) / 2))',
  'rotateY(-90deg) translateZ(calc(var(--cw) / 2))',
  'rotateX(90deg) translateZ(calc(var(--ch) / 2))',
];

function buildStops(n: number): { rx: number; ry: number }[] {
  const base = [
    { rx: 90, ry: 0 },
    { rx: 0, ry: 0 },
    { rx: 0, ry: -90 },
    { rx: 0, ry: -180 },
    { rx: 0, ry: -270 },
    { rx: -90, ry: -360 },
  ];
  const out = base.slice(0, Math.min(n, 6));
  for (let i = 6; i < n; i++) {
    out.push({ rx: 0, ry: -360 - (i - 6) * 90 });
  }
  return out;
}

const STOPS = buildStops(SCENE_COUNT);
const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

function getCubeTransform(progress: number): { rx: number; ry: number } {
  const t = progress * (SCENE_COUNT - 1);
  const i = Math.min(Math.floor(t), SCENE_COUNT - 2);
  const f = easeIO(t - i);
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return { rx: a.rx + (b.rx - a.rx) * f, ry: a.ry + (b.ry - a.ry) * f };
}

function sceneFromProgress(progress: number): number {
  return Math.min(SCENE_COUNT - 1, Math.floor(progress * SCENE_COUNT));
}

const SWAP_RADIUS = 3;
function deriveFaceImages(stopIdx: number): (number | null)[] {
  const images: (number | null)[] = Array(6).fill(null);
  for (let offset = -SWAP_RADIUS; offset <= SWAP_RADIUS; offset++) {
    const si = stopIdx + offset;
    if (si < 0 || si >= SCENE_COUNT) continue;
    const fi = faceAtStop(si);
    const pi = si - 1;
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
    const dots: Dot[] = Array.from({ length: 140 }, make);
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
    <div style={{ padding: '1.75rem 1.5rem', background: 'rgba(10,10,10,0.95)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', borderLeft: right ? 'none' : '1px solid rgba(255,255,255,0.07)', borderRight: right ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
      {/* Red accent line */}
      <div style={{ width: '1.75rem', height: '2px', background: '#FF3B00', marginBottom: '1.1rem', marginLeft: right ? 'auto' : 0 }} />
      {/* Category · year */}
      <p style={{ fontFamily: F, fontSize: '0.5rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.75rem', textAlign: right ? 'right' : 'left' }}>
        {project.category}&nbsp;·&nbsp;{project.year}
      </p>
      {/* Name */}
      <h3 style={{ fontFamily: FH, fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', letterSpacing: '-0.03em', lineHeight: 0.9, color: 'rgba(255,255,255,0.92)', marginBottom: '0.9rem', textTransform: 'uppercase', textAlign: right ? 'right' : 'left' }}>
        {project.name}
      </h3>
      {/* Tagline */}
      <p style={{ fontFamily: F, fontSize: '0.72rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.32)', marginBottom: '1rem', textAlign: right ? 'right' : 'left' }}>
        {project.tagline}
      </p>
      {/* Stack pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem', justifyContent: right ? 'flex-end' : 'flex-start' }}>
        {project.stack.map((t) => (
          <span key={t} style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.28)', fontFamily: F, fontSize: '0.48rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.18rem 0.5rem' }}>{t}</span>
        ))}
      </div>
      {/* CTA */}
      <div style={{ display: 'flex', justifyContent: right ? 'flex-end' : 'flex-start' }}>
        <button
          onClick={onContact}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(255,59,0,0.4)', color: 'rgba(255,59,0,0.7)', fontFamily: F, fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.5rem 0.9rem', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = '#FF3B00'; el.style.color = '#fff'; el.style.borderColor = '#FF3B00'; }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'rgba(255,59,0,0.7)'; el.style.borderColor = 'rgba(255,59,0,0.4)'; }}
        >
          Démarrer ce projet ↗
        </button>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
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

  const F = 'var(--font-inter), system-ui, sans-serif';
  const FH = 'var(--font-archivo), system-ui, sans-serif';
  const FM = 'ui-monospace, "JetBrains Mono", monospace';
  const FS = 'var(--font-caveat), cursive';

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
    <section ref={sectionRef} id="portfolio" style={{ height: `${SCENE_COUNT * 100}vh`, background: '#111111', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <BackgroundCanvas />
          <motion.div aria-hidden style={{ position: 'absolute', top: '-20%', left: '-15%', width: '75vw', height: '75vw', background: 'radial-gradient(ellipse at center, rgba(255,59,0,0.04) 0%, rgba(255,59,0,0.01) 40%, transparent 70%)' }} animate={{ x: [0, 40, -25, 0], y: [0, 30, -40, 0] }} transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div aria-hidden style={{ position: 'absolute', bottom: '-25%', right: '-18%', width: '70vw', height: '70vw', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.006) 45%, transparent 70%)' }} animate={{ x: [0, -35, 20, 0], y: [0, -25, 35, 0] }} transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        {/* Top-left label */}
        <div className="absolute top-7 left-8 z-20 flex items-center gap-3">
          <span style={{ fontFamily: F, fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>02 / Mes travaux</span>
          <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontFamily: F, fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.1)' }}>{PROJECTS.length} projets</span>
        </div>

        {/* HUD top-right */}
        <div className="absolute top-7 right-8 z-20 text-right">
          <div ref={hudPctRef} style={{ fontFamily: FM, fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.22)' }}>000%</div>
          <div style={{ width: '6rem', height: '1px', background: 'rgba(255,255,255,0.08)', marginTop: '0.4rem', marginLeft: 'auto', position: 'relative', overflow: 'hidden' }}>
            <div ref={hudFillRef} style={{ position: 'absolute', inset: '0 auto 0 0', width: '0%', background: '#FF3B00' }} />
          </div>
          <div ref={hudSceneRef} style={{ fontFamily: F, fontSize: '0.45rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginTop: '0.3rem' }}>OVERVIEW</div>
        </div>

        {/* Nav dots left */}
        <div className="absolute left-7 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2">
          {Array.from({ length: SCENE_COUNT }, (_, i) => (
            <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: i === activeScene ? '#FF3B00' : 'rgba(255,255,255,0.18)', transform: i === activeScene ? 'scale(1.6)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>

        {/* 3D cube */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', perspective: '1100px', pointerEvents: 'none', zIndex: 2 }}>
          <div ref={cubeRef} style={{ '--cw': 'min(72vw, 700px)', '--ch': 'calc(var(--cw) * 9 / 16)', width: 'var(--cw)', height: 'var(--ch)', position: 'relative', transformStyle: 'preserve-3d', transform: 'rotateX(90deg) rotateY(0deg)', flexShrink: 0 } as React.CSSProperties}>
            {([0, 1, 2, 3, 4, 5] as const).map((fi) => {
              const isCap = fi === 0 || fi === 5;
              return (
                <div key={fi} style={{ position: 'absolute', overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: FACE_TRANSFORMS[fi], background: `repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 48px), #111`, ...(isCap ? { left: 0, right: 0, top: 'calc(50% - var(--cw) / 2)', width: 'var(--cw)', height: 'var(--cw)' } : { inset: 0 }) }}>
                  {faceImages[fi] !== null && (
                    <>
                      <Image src={PROJECTS[faceImages[fi]!].image} alt={PROJECTS[faceImages[fi]!].name} fill className="object-cover object-top" sizes="(max-width: 768px) 90vw, 700px" />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile card below cube */}
          <div className="md:hidden" style={{ marginTop: '0.75rem', width: 'min(72vw, 700px)', maxWidth: 'calc(100% - 2rem)', flexShrink: 0, pointerEvents: 'auto' }}>
            <AnimatePresence mode="wait">
              {activeScene > 0 && project && (
                <motion.div key={`mob-${activeScene}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.32 }}>
                  <ProjectCard project={project} align="left" onContact={openModal} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Intro card desktop */}
        <AnimatePresence>
          {activeScene === 0 && (
            <motion.div key="intro" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45 }} className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
              <div style={{ textAlign: 'center', maxWidth: '32rem', padding: '0 1.5rem' }}>
                <p style={{ fontFamily: F, fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem' }}>
                  Mes travaux&nbsp;·&nbsp;{PROJECTS.length} projets
                </p>
                <h2 style={{ fontFamily: FH, fontWeight: 900, fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', letterSpacing: '-0.04em', lineHeight: 0.88, color: 'rgba(255,255,255,0.92)', marginBottom: '0.15em', textTransform: 'uppercase' }}>
                  Mes{' '}
                  <span style={{ fontFamily: FS, fontWeight: 400, color: 'rgba(255,255,255,0.2)', textTransform: 'none', fontSize: '0.9em' }}>travaux</span>
                </h2>
                <p style={{ fontFamily: F, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', marginTop: '2rem' }}>
                  Défiler pour explorer
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile intro */}
        <div className="md:hidden absolute left-1/2 z-10 pointer-events-none" style={{ top: activeScene === 0 ? '50%' : '3.5rem', transform: `translateX(-50%) translateY(${activeScene === 0 ? '-50%' : '0'})`, transition: 'top 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)', textAlign: 'center', maxWidth: 'calc(100vw - 4rem)', width: 'max-content' }}>
          <AnimatePresence mode="wait">
            {activeScene === 0 ? (
              <motion.div key="mob-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                <p style={{ fontFamily: F, fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.25rem' }}>Mes travaux · {PROJECTS.length} projets</p>
                <h2 style={{ fontFamily: FH, fontWeight: 900, fontSize: 'clamp(3rem, 9vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 0.88, color: 'rgba(255,255,255,0.92)', textTransform: 'uppercase' }}>
                  Mes <span style={{ fontFamily: FS, fontWeight: 400, color: 'rgba(255,255,255,0.2)', textTransform: 'none' }}>travaux</span>
                </h2>
                <p style={{ fontFamily: F, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', marginTop: '1.75rem' }}>Défiler pour explorer</p>
              </motion.div>
            ) : (
              <motion.div key="mob-compact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <p style={{ fontFamily: F, fontSize: '0.42rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '0.3rem' }}>02 / Travaux</p>
                <h2 style={{ fontFamily: FH, fontWeight: 900, fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '-0.04em', lineHeight: 1, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  Mes <span style={{ fontFamily: FS, fontWeight: 400 }}>travaux</span>
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop left card slot */}
        <div className="absolute hidden md:block z-10" style={{ left: 'clamp(4rem, 7vw, 7rem)', top: '50%', transform: 'translateY(-50%)', width: 'min(21rem, 28%)' }}>
          <AnimatePresence mode="wait">
            {!isRight && activeScene > 0 && project && (
              <motion.div key={`left-${activeScene}`} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.38 }}>
                <ProjectCard project={project} align="left" onContact={openModal} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop right card slot */}
        <div className="absolute hidden md:block z-10" style={{ right: 'clamp(4rem, 7vw, 7rem)', top: '50%', transform: 'translateY(-50%)', width: 'min(21rem, 28%)' }}>
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
          <span style={{ fontFamily: FM, fontSize: '0.52rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.18)' }}>
            {String(activeScene).padStart(2, '0')}&nbsp;/&nbsp;{String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>

        {/* Caption bottom-center */}
        <div className="absolute bottom-7 left-1/2 z-20" style={{ transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
          <div ref={captionNumRef} style={{ fontFamily: FM, fontSize: '0.45rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '0.2rem' }}>00</div>
          <div ref={captionLabelRef} style={{ fontFamily: FH, fontWeight: 900, fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.06)' }}>OVERVIEW</div>
        </div>
      </div>
    </section>
  );
}
