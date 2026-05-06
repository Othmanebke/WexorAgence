"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 120);
  });

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{
        y: isScrolled ? 0 : -60,
        opacity: isScrolled ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-50 top-0 left-0 right-0 bg-[#f0f0ee]/95 backdrop-blur-sm border-b border-black/10"
    >
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="font-heading text-abcs-red text-xl uppercase tracking-tighter hover:opacity-70 transition-opacity"
        >
          WEX.
        </Link>

        <nav className="flex items-center gap-1 font-bold text-xs uppercase tracking-widest">
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className={`px-3 py-1 transition-colors hover:text-abcs-red ${active ? "text-abcs-red" : "text-abcs-black"}`}
                >
                  {link.label}
                </Link>
                {i < links.length - 1 && (
                  <span className="text-abcs-black/30 select-none">,</span>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-abcs-red text-lg uppercase tracking-tighter">
          WEX.
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-bold text-[10px] uppercase tracking-widest"
          aria-label="Menu"
        >
          {menuOpen ? "FERMER" : "MENU"}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-t border-black/10"
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-bold text-sm uppercase tracking-widest transition-colors hover:text-abcs-red ${
                pathname === link.href ? "text-abcs-red" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
