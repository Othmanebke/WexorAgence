"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLang, Lang } from "@/components/LanguageContext";
import { useContactModal } from "@/components/ContactModalProvider";
import ChatWindow from "@/components/Chatbot";
import avatarPhoto from "@/img/cravate-orange.png";

const langLabels: Record<Lang, string> = {
  fr: "FR",
  en: "EN",
  ma: "عربي",
};

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const pathname = usePathname();

  // Show hint once — after 2.5s, only if never dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem("chat-hint-dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setShowHint(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const dismissHint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHint(false);
    localStorage.setItem("chat-hint-dismissed", "1");
  };
  const { lang, setLang, t } = useLang();
  const { openModal } = useContactModal();
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {

    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
      }
    }
  };

  const links = [
    { label: "Accueil",               href: "/#top"         },
    { label: t("nav_about"),          href: "/#about"       },
    { label: t("nav_services"),       href: "/#services"    },
    { label: t("nav_portfolio"),      href: "/#portfolio"   },
    { label: "Expériences",           href: "/#experiences" },
  ];


  const otherLangs = (["fr", "en", "ma"] as Lang[]).filter((l) => l !== lang);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Chat window — pops above the avatar */}
      <ChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Main pill */}
      <div className="relative flex items-center bg-[#1a1a1a]/95 backdrop-blur-xl rounded-full px-2 py-2 gap-1 shadow-[0_8px_40px_rgba(0,0,0,0.35)] border border-white/5">

        {/* Avatar — chat trigger */}
        <div className="relative flex-shrink-0 mr-1">

          {/* ── One-time hint popup ───────────────────────────────── */}
          <AnimatePresence>
            {showHint && !chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.92 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-full left-0 mb-3 z-10 pointer-events-auto"
              >
                <div className="relative bg-abcs-red rounded-xl rounded-bl-sm px-3.5 py-2.5 flex items-center gap-2.5 shadow-lg whitespace-nowrap">
                  {/* dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse flex-shrink-0" />
                  <span className="font-bold text-[11px] text-white uppercase tracking-wide">
                    Discutez avec mon IA
                  </span>
                  {/* dismiss */}
                  <button
                    onClick={dismissHint}
                    className="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-[10px] font-bold transition-colors leading-none flex-shrink-0"
                    aria-label="Fermer"
                  >
                    ✕
                  </button>
                  {/* Arrow pointing down-left */}
                  <div className="absolute -bottom-1.5 left-3 w-3 h-3 bg-abcs-red rotate-45 rounded-sm" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar button */}
          <button
            onClick={() => {
              setChatOpen((v) => !v);
              if (showHint) {
                setShowHint(false);
                localStorage.setItem("chat-hint-dismissed", "1");
              }
            }}
            aria-label="Ouvrir le chat"
            className="relative w-9 h-9 rounded-full bg-[#111] overflow-visible group block"
          >
            {/* Image */}
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={avatarPhoto}
                alt="Othmane"
                width={36}
                height={36}
                className="w-full h-full object-cover object-top scale-150 translate-y-1"
              />
            </div>

            {/* Pulse ring — changes color when chat open */}
            <span
              className={`absolute -inset-0.5 rounded-full border-2 transition-colors duration-300 ${
                chatOpen ? "border-abcs-red/80" : "border-transparent"
              }`}
            />

            {/* Green online dot — bottom right */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1a1a1a] z-10">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </span>
          </button>
        </div>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center">
          {links.map((link) => {
            const active = pathname === "/" && link.href === "/";
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 font-bold text-[11px] uppercase tracking-[0.1em] rounded-full transition-all duration-200 whitespace-nowrap ${
                  active ? "text-white bg-white/10" : "text-white/50 hover:text-white"
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
        <button
          onClick={openModal}
          className="bg-white text-abcs-black font-bold text-[11px] uppercase tracking-[0.1em] px-5 py-2.5 rounded-full hover:bg-abcs-red hover:text-white transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 ml-1"
        >
          <span>{t("nav_contact")}</span>
          <span className="text-sm leading-none">+</span>
        </button>

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
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-bold text-sm uppercase tracking-[0.1em] py-3 px-4 rounded-2xl transition-all text-white/50 hover:text-white hover:bg-white/5"
              >
                {link.label}
              </Link>

            ))}
            <button
              onClick={() => { openModal(); setMenuOpen(false); }}
              className="font-bold text-sm uppercase tracking-[0.1em] py-3 px-4 rounded-2xl transition-all text-white bg-abcs-red hover:bg-red-600 mt-1 text-left"
            >
              {t("nav_contact")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
