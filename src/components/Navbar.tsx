"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLang, Lang } from "@/components/LanguageContext";

const langLabels: Record<Lang, string> = {
  fr: "FR",
  en: "EN",
  ma: "عربي",
};

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 120);
  });

  const links = [
    { label: t("nav_services"), href: "/tarifs" },
    { label: t("nav_portfolio"), href: "/portfolio" },
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  const otherLangs = (["fr", "en", "ma"] as Lang[]).filter((l) => l !== lang);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{
        y: (isScrolled || isMobile) ? 0 : -60,
        opacity: (isScrolled || isMobile) ? 1 : 0,
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
          O&apos;ldev.
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

        {/* Language switcher desktop */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest border border-black/20 px-3 py-1.5 hover:border-abcs-red hover:text-abcs-red transition-colors"
          >
            <span>{langLabels[lang]}</span>
            <motion.span
              animate={{ rotate: langOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[8px]"
            >
              ▼
            </motion.span>
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full right-0 mt-2 bg-[#f0f0ee] border border-black/15 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex flex-col overflow-hidden z-50"
              >
                {otherLangs.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className="font-bold text-[10px] uppercase tracking-widest px-5 py-3 hover:bg-abcs-red hover:text-white transition-colors text-left"
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-abcs-red text-lg uppercase tracking-tighter">
          O&apos;ldev.
        </Link>
        <div className="flex items-center gap-3">
          {/* Lang switcher mobile */}
          <button
            onClick={() => {
              const order: Lang[] = ["fr", "en", "ma"];
              const next = order[(order.indexOf(lang) + 1) % order.length];
              setLang(next);
            }}
            className="font-bold text-[10px] uppercase tracking-widest border border-black/20 px-2 py-1 hover:border-abcs-red hover:text-abcs-red transition-colors"
          >
            {langLabels[lang]}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-bold text-[10px] uppercase tracking-widest"
            aria-label="Menu"
          >
            {menuOpen ? t("nav_close") : t("nav_menu")}
          </button>
        </div>
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
