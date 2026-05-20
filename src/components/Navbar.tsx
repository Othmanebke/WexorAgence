"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useLang, Lang } from "@/components/LanguageContext";
import avatarPhoto from "@/img/Gemini_Generated_Image_zdg0rbzdg0rbzdg0.png";

const langLabels: Record<Lang, string> = {
  fr: "FR",
  en: "EN",
  ma: "عربي",
};

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

  const links = [
    { label: "Home", href: "/" },
    { label: t("nav_services"), href: "/tarifs" },
    { label: t("nav_portfolio"), href: "/portfolio" },
    { label: t("nav_about"), href: "/about" },
  ];

  const otherLangs = (["fr", "en", "ma"] as Lang[]).filter((l) => l !== lang);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Main pill */}
      <div className="relative flex items-center bg-[#1a1a1a]/95 backdrop-blur-xl rounded-full px-2 py-2 gap-1 shadow-[0_8px_40px_rgba(0,0,0,0.35)] border border-white/5">

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#111] flex-shrink-0 overflow-hidden mr-1">
          <Image
            src={avatarPhoto}
            alt="Othmane"
            width={36}
            height={36}
            className="w-full h-full object-cover object-top scale-150 translate-y-1"
          />
        </div>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 font-bold text-[11px] uppercase tracking-[0.1em] rounded-full transition-all duration-200 whitespace-nowrap ${
                  active
                    ? "text-white bg-white/10"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Lang switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="font-bold text-[10px] uppercase tracking-widest text-white/30 hover:text-white/70 transition-colors px-3 py-2 rounded-full hover:bg-white/5"
          >
            {langLabels[lang]}
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col border border-white/10 shadow-2xl"
              >
                {otherLangs.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className="font-bold text-[10px] uppercase tracking-widest px-6 py-3 text-white/50 hover:text-white hover:bg-abcs-red transition-colors text-left"
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact button */}
        <Link
          href="/contact"
          className="bg-white text-abcs-black font-bold text-[11px] uppercase tracking-[0.1em] px-5 py-2.5 rounded-full hover:bg-abcs-red hover:text-white transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 ml-1"
        >
          <span>{t("nav_contact")}</span>
          <span className="text-sm leading-none">+</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white/50 hover:text-white font-bold text-base px-3 py-2 rounded-full hover:bg-white/5 transition-colors ml-1"
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "≡"}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-[#1a1a1a]/95 backdrop-blur-xl rounded-3xl p-3 flex flex-col gap-1 border border-white/10 shadow-2xl md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-bold text-sm uppercase tracking-[0.1em] py-3 px-4 rounded-2xl transition-all ${
                  pathname === link.href
                    ? "text-white bg-white/10"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
