"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="w-full bg-abcs-black text-white">

      {/* ─── TOP: Vision + Nav + Contact ─── */}
      <div className="w-full px-6 md:px-8 pt-24 pb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* Vision & CTA */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <p className="font-bold text-xl md:text-2xl leading-snug max-w-xs opacity-80">
              {t("footer_vision")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/30 px-6 py-3 font-bold text-xs uppercase tracking-widest hover:border-abcs-red hover:text-abcs-red transition-colors duration-300 group w-fit"
            >
              <span>{t("footer_cta")}</span>
              <span className="text-base leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </Link>
          </div>

          {/* Nav links large */}
          <div className="md:col-span-4 flex flex-col gap-2">
            {[
              { label: "Portfolio", href: "/portfolio" },
              { label: t("nav_services"), href: "/tarifs" },
              { label: t("nav_about"), href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading text-5xl md:text-6xl uppercase leading-tight hover:text-abcs-red transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
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
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/othmane-bouakline/" },
                  { label: "TikTok", href: "https://www.tiktok.com/@o.ldev" },
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

            {/* Availability badge */}
            <div className="flex items-center gap-2 md:justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-xs uppercase tracking-widest text-emerald-400">
                Disponible pour nouveaux projets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Giant logo ─── */}
      <div className="w-full overflow-hidden px-4 py-8">
        <h2
          className="font-heading text-abcs-red/20 uppercase leading-[0.8] tracking-tighter select-none text-center"
          style={{ fontSize: "clamp(4rem, 20vw, 26rem)" }}
        >
          O&apos;LDEV
        </h2>
      </div>

      {/* ─── Bottom legal ─── */}
      <div className="w-full px-6 md:px-8 py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-bold text-[10px] uppercase tracking-widest opacity-30">
          © {new Date().getFullYear()} O&apos;ldev — {t("footer_rights")}
        </p>
        <p className="font-bold text-[10px] uppercase tracking-widest opacity-30">
          By {t("footer_by")}
        </p>
      </div>
    </footer>
  );
}
