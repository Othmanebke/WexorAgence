"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Magnetic from "@/components/Magnetic";

const links = [
  { label: "Tarifs", href: "/tarifs" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Qui je suis", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Pill appears only after scroll — on ALL pages
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isScrolled ? 0 : -100,
        opacity: isScrolled ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-50 top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-auto px-2 md:px-0"
    >
      {/* Desktop pill */}
      <div className="hidden md:flex items-center gap-0 bg-white/95 backdrop-blur-md border-2 border-abcs-black shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] rounded-full overflow-hidden">
        <Magnetic>
          <Link
            href="/"
            className="font-heading font-black tracking-tighter uppercase text-abcs-red text-xl px-6 py-3 border-r-2 border-abcs-black hover:bg-abcs-red hover:text-white transition-colors block"
          >
            WEX
          </Link>
        </Magnetic>

        {links.slice(0, -1).map((link) => {
          const active = pathname === link.href;
          return (
            <Magnetic key={link.href}>
              <Link
                href={link.href}
                className={`font-bold text-xs tracking-widest uppercase px-5 py-3 border-r-2 border-abcs-black transition-colors block
                  ${active ? "bg-abcs-black text-white" : "hover:bg-abcs-black hover:text-white"}`}
              >
                {link.label}
              </Link>
            </Magnetic>
          );
        })}

        <Magnetic>
          <Link
            href="/contact"
            className={`font-bold text-xs tracking-widest uppercase px-6 py-3 transition-colors block
              ${pathname === "/contact" ? "bg-abcs-red text-white" : "bg-abcs-red text-white hover:bg-abcs-black"}`}
          >
            Contact ↗
          </Link>
        </Magnetic>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between bg-white/95 backdrop-blur-md border-2 border-abcs-black shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] rounded-full px-4 py-2">
        <Link href="/" className="font-heading font-black tracking-tighter uppercase text-abcs-red text-lg">
          WEX
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-bold text-xs uppercase tracking-widest px-3 py-1 border-2 border-abcs-black hover:bg-abcs-black hover:text-white transition-colors rounded-full"
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="md:hidden overflow-hidden mt-2"
      >
        <div className="bg-white border-2 border-abcs-black shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col">
          <Link href="/" onClick={() => setMenuOpen(false)} className={`font-bold text-xs tracking-widest uppercase px-6 py-4 border-b border-abcs-black transition-colors ${pathname === "/" ? "bg-abcs-black text-white" : "hover:bg-abcs-red hover:text-white"}`}>
            Accueil
          </Link>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-bold text-xs tracking-widest uppercase px-6 py-4 border-b border-abcs-black last:border-0 transition-colors
                  ${active ? "bg-abcs-black text-white" : "hover:bg-abcs-red hover:text-white"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </motion.header>
  );
}
