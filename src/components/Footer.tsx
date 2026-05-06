import Link from "next/link";
import Magnetic from "@/components/Magnetic";

export default function Footer() {
  return (
    <footer className="w-full bg-abcs-black text-white pt-32 pb-8 px-8 md:px-16 flex flex-col items-center">
      {/* ─── TOP SECTION: VISION & NAVIGATION ─── */}
      <div className="w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        
        {/* COL 1-4: Vision & CTA */}
        <div className="lg:col-span-4 flex flex-col items-start gap-8">
          <p className="font-bold text-2xl md:text-3xl leading-tight max-w-sm">
            On ne fait pas juste des sites. On crée des visions qui s&apos;imposent et qui durent.
          </p>
          <Magnetic>
            <Link href="/contact" className="bg-white text-abcs-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-all flex items-center gap-3">
              TRAVAILLONS ENSEMBLE ↗
            </Link>
          </Magnetic>
        </div>

        {/* COL 5-8: Main Links (Large) */}
        <div className="lg:col-span-4 flex flex-col items-start gap-2">
          <nav className="flex flex-col gap-1">
            <Magnetic>
              <Link href="/portfolio" className="font-heading text-6xl md:text-7xl hover:text-abcs-red transition-all leading-none uppercase">Portfolio</Link>
            </Magnetic>
            <Magnetic>
              <Link href="/tarifs" className="font-heading text-6xl md:text-7xl hover:text-abcs-red transition-all leading-none uppercase">Services</Link>
            </Magnetic>
            <Magnetic>
              <Link href="/about" className="font-heading text-6xl md:text-7xl hover:text-abcs-red transition-all leading-none uppercase">About</Link>
            </Magnetic>
          </nav>
        </div>

        {/* COL 9-12: Contact Details */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-12">
          <div className="flex flex-col items-start lg:items-end">
            <span className="font-bold text-xs uppercase tracking-widest opacity-40 mb-2">Projets & Devis</span>
            <a href="mailto:studio@wexor-agence.com" className="font-bold text-xl md:text-2xl hover:text-abcs-red transition-all">
              studio@wexor-agence.com
            </a>
          </div>
          <div className="flex flex-col items-start lg:items-end">
            <span className="font-bold text-xs uppercase tracking-widest opacity-40 mb-2">Collaboration</span>
            <a href="mailto:work@wexor-agence.com" className="font-bold text-xl md:text-2xl hover:text-abcs-red transition-all">
              work@wexor-agence.com
            </a>
          </div>
        </div>
      </div>

      {/* ─── MIDDLE SECTION: GIANT LOGO ─── */}
      <div className="w-full max-w-screen-2xl mb-16 overflow-hidden">
        <h2 className="font-heading text-[22vw] leading-[0.75] text-abcs-red uppercase tracking-tighter select-none flex justify-center">
          WEXOR
        </h2>
      </div>

      {/* ─── BOTTOM SECTION: LEGAL & SOCIAL ─── */}
      <div className="w-full max-w-screen-2xl flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest font-bold uppercase opacity-40 gap-6 pt-8 border-t border-white/10">
        <div>© {new Date().getFullYear()} WEXOR STUDIO — TOUS DROITS RÉSERVÉS.</div>
        
        <div className="flex gap-12">
           <Magnetic><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LINKEDIN</a></Magnetic>
           <Magnetic><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a></Magnetic>
           <Magnetic><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TWITTER (X)</a></Magnetic>
        </div>

        <div>SITE BY SUERO — OTHMANE BOUAKLINE</div>
      </div>
    </footer>
  );
}
