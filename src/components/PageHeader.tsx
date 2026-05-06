"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Tarifs", href: "/tarifs" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Qui je suis", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface PageHeaderProps {
  number?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ number = "00", title, subtitle }: PageHeaderProps) {
  const pathname = usePathname();

  return (
    <section className="w-full pt-8 pb-0 px-6 md:px-8 bg-[#f0f0ee]">

      {/* ─── Top row: Logo + Nav (same as homepage hero) ─── */}
      <div className="flex items-start justify-between w-full mb-12">

        {/* Logo */}
        <Link href="/" className="font-heading text-abcs-red leading-[0.82] tracking-tighter hover:opacity-70 transition-opacity select-none" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
          WEX
        </Link>

        {/* Comma-separated nav — active page in orange */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="hidden md:flex items-center gap-1 font-bold text-lg md:text-2xl lg:text-3xl tracking-tight pt-2"
        >
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 hover:text-abcs-red ${isActive ? "text-abcs-red" : "text-abcs-black"}`}
                >
                  {link.label}
                </Link>
                {i < navLinks.length - 1 && (
                  <span className="text-abcs-black/30 mr-1">,</span>
                )}
              </span>
            );
          })}
        </motion.nav>

        {/* Mobile: just show active page name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:hidden font-bold text-xs uppercase tracking-widest text-abcs-red pt-4"
        >
          {navLinks.find(l => l.href === pathname)?.label ?? ""}
        </motion.div>
      </div>

      {/* ─── Sub-label below logo ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="flex justify-between font-bold text-abcs-red text-[10px] md:text-xs tracking-[0.2em] uppercase -mt-10 mb-16"
      >
        <span>WEXOR AGENCE</span>
        <span>CRÉATION WEB</span>
      </motion.div>

      {/* ─── Orange numbered banner ─── */}
      <div className="flex items-center justify-between bg-abcs-red text-white px-4 md:px-6 py-3 mb-8 md:mb-12">
        <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{subtitle ?? "Wexor Agence"}</span>
        <span className="font-heading text-2xl">{number}</span>
      </div>

      <div className="overflow-hidden pb-12 md:pb-16">
        <motion.h1
          className="font-heading text-6xl md:text-9xl lg:text-[12rem] uppercase leading-[0.82] tracking-tighter"
          initial={{ y: "102%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
