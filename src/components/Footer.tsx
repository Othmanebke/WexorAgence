"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";
import { useContactModal } from "@/components/ContactModalProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const { t } = useLang();
  const { openModal } = useContactModal();
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = marqueeRef.current;
    if (!el) return;
    // Coulisse de gauche à droite (direction positive)
    gsap.fromTo(
      el,
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 25,
        repeat: -1,
      }
    );
  }, { scope: marqueeRef });

  const navLinks = [
    { label: "Accueil",      href: "/#top" },
    { label: "À propos",     href: "/#about" },
    { label: "Services",     href: "/#services" },
    { label: "Portfolio",    href: "/#portfolio" },
    { label: "Expériences",  href: "/#experiences" },
  ];

  const marqueeItems = [
    "O'LDEV",
    "·",
    "FREELANCE WEB",
    "·",
    "REACT & NEXT.JS",
    "·",
    "DESIGN & CONVERSION",
    "·",
    "OTHMANE BOUAKLINE",
    "·",
  ];
  const doubledMarquee = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <footer className="w-full bg-abcs-black text-white overflow-hidden">

      {/* ─── TOP: Vision + Nav + Contact ─── */}
      <div className="w-full px-6 md:px-8 pt-24 pb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* Vision & CTA */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <p className="font-bold text-xl md:text-2xl leading-snug max-w-xs opacity-80">
              {t("footer_vision")}
            </p>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-3 border border-white/30 px-6 py-3 font-bold text-xs uppercase tracking-widest hover:border-abcs-red hover:text-abcs-red transition-colors duration-300 group w-fit"
            >
              <span>{t("footer_cta")}</span>
              <span className="text-base leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </button>
          </div>

          {/* Nav links */}
          <div className="md:col-span-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-heading text-4xl md:text-5xl uppercase leading-tight hover:text-abcs-red transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => openModal()}
              className="font-heading text-4xl md:text-5xl uppercase leading-tight hover:text-abcs-red transition-colors duration-200 text-left"
            >
              Contact
            </button>
          </div>

          {/* Contact info */}
          <div className="md:col-span-4 flex flex-col gap-10 md:items-end">
            <div className="flex flex-col md:items-end gap-1">
              <span className="font-bold text-[10px] uppercase tracking-widest opacity-30 mb-1">{t("footer_email_label")}</span>
              <a
                href="mailto:othmane.bouakline.pro@gmail.com"
                className="font-bold text-base hover:text-abcs-red transition-colors break-all"
              >
                othmane.bouakline.pro@gmail.com
              </a>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <span className="font-bold text-[10px] uppercase tracking-widest opacity-30 mb-1">{t("footer_social_label")}</span>
              <div className="flex gap-6">
                {[
                  { label: "Instagram", href: "https://www.instagram.com/o.ldev/" },
                  { label: "LinkedIn",  href: "https://www.linkedin.com/in/othmane-bouakline/" },
                  { label: "TikTok",    href: "https://www.tiktok.com/@o.ldev" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-abcs-red transition-all"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 md:justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-xs uppercase tracking-widest text-emerald-400">
                Disponible pour nouveaux projets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Grand logo en plusieurs qui coulisse de gauche à droite ─── */}
      <div className="w-full overflow-hidden py-10 sm:py-14 select-none relative">
        <div
          ref={marqueeRef}
          className="flex items-center whitespace-nowrap will-change-transform gap-8"
        >
          {doubledMarquee.map((item, idx) => (
            <span
              key={idx}
              className={`font-heading uppercase leading-none tracking-tighter shrink-0 ${
                item === "O'LDEV"
                  ? "text-abcs-red/40 hover:text-abcs-red transition-colors duration-300 cursor-default"
                  : item === "·"
                  ? "text-white/20 text-3xl sm:text-5xl"
                  : "text-white/20"
              }`}
              style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Bottom legal & Cookies ─── */}
      <div className="w-full px-6 md:px-8 py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-bold text-[10px] uppercase tracking-widest opacity-30">
          © {new Date().getFullYear()} O&apos;ldev — Tous droits réservés · Développeur Web Full Stack
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/legal"
            className="font-bold text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100 hover:text-abcs-red transition-all"
          >
            Mentions légales & RGPD
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("cookie-consent");
              window.location.reload();
            }}
            className="font-bold text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100 hover:text-abcs-red transition-all"
          >
            Gestion des cookies
          </button>
        </div>
      </div>
    </footer>
  );
}
