"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "fr" | "en" | "ma";

export const translations = {
  fr: {
    // Nav
    nav_services: "Services",
    nav_portfolio: "Portfolio",
    nav_about: "À propos",
    nav_contact: "Contact",
    nav_menu: "Menu",
    nav_close: "Fermer",

    // Hero
    hero_sub1: "O'ldev",
    hero_sub2: "FREELANCE WEB",
    hero_tagline: "Le développeur qui transforme\nton idée en réalité digitale.",
    hero_cta: "Me découvrir",
    hero_about_link: "Mon approche — Qui je suis",
    hero_desc: "Des sites taillés pour\nles ambitions qui refusent\nle compromis.",

    // About section home
    about_big: "J'AI CODÉ POUR TA VISION",
    about_title: "Othmane,\nc'est qui ?",
    about_p1: "Un développeur web freelance obsédé par une chose : faire des sites qui convertissent, pas juste des sites qui font beau.",
    about_p2: "Du code propre. Du design sur-mesure. Une stratégie pensée pour tes objectifs — pas pour les miens. Pas de templates, pas de copier-coller, juste du résultat.",
    stat_clients: "Clients",
    stat_satisfaction: "Satisfaction",
    stat_response: "Réponse",

    // Services
    services_label: "Ce que je fais",
    services_title: "MES SERVICES",

    // Quote
    quote_1: "Code propre",
    quote_2: "et design sur-mesure.",
    quote_3: "SEO et performances.",
    quote_4: "Mon langage est intentionnel,",
    quote_5: "construit pour convertir.",
    quote_cta: "Voir mes tarifs",

    // Portfolio
    portfolio_label: "Mes réalisations",
    portfolio_title: "PORTFOLIO",
    portfolio_cta: "Voir tous les projets",

    // Process
    process_label: "Comment je travaille",
    process_title: "PROCESSUS",

    // CTA final
    cta_line1: "ON CODE",
    cta_line2: "ENSEMBLE ?",
    cta_btn: "Démarrer un projet",

    // Footer
    footer_vision: "Je ne fais pas juste des sites. Je crée des visions qui s'imposent et durent.",
    footer_cta: "Travaillons ensemble",
    footer_email_label: "Projets & Devis",
    footer_social_label: "Réseaux",
    footer_rights: "Tous droits réservés.",
    footer_by: "Othmane Bouakline",

    // Pages
    page_tarifs_sub: "Mes offres & investissements",
    page_about_sub: "Qui je suis",
    page_portfolio_sub: "Mes réalisations",
    page_contact_sub: "Je t'écoute",

    // Chatbot
    chatbot_name: "O'ldev Bot",
    chatbot_status: "En ligne",
  },

  en: {
    // Nav
    nav_services: "Services",
    nav_portfolio: "Portfolio",
    nav_about: "About",
    nav_contact: "Contact",
    nav_menu: "Menu",
    nav_close: "Close",

    // Hero
    hero_sub1: "O'ldev",
    hero_sub2: "WEB FREELANCER",
    hero_tagline: "The developer who turns\nyour idea into digital reality.",
    hero_cta: "Discover me",
    hero_about_link: "My approach — Who I am",
    hero_desc: "Websites crafted for\nambitions that refuse\nto compromise.",

    // About section home
    about_big: "I CODED FOR YOUR VISION",
    about_title: "Othmane,\nwho's that?",
    about_p1: "A freelance web developer obsessed with one thing: building sites that convert, not just sites that look good.",
    about_p2: "Clean code. Custom design. A strategy built for your goals — not mine. No templates, no copy-paste, just results.",
    stat_clients: "Clients",
    stat_satisfaction: "Satisfaction",
    stat_response: "Response",

    // Services
    services_label: "What I do",
    services_title: "MY SERVICES",

    // Quote
    quote_1: "Clean code",
    quote_2: "and custom design.",
    quote_3: "SEO and performance.",
    quote_4: "My language is intentional,",
    quote_5: "built to convert.",
    quote_cta: "View my rates",

    // Portfolio
    portfolio_label: "My work",
    portfolio_title: "PORTFOLIO",
    portfolio_cta: "View all projects",

    // Process
    process_label: "How I work",
    process_title: "PROCESS",

    // CTA final
    cta_line1: "LET'S BUILD",
    cta_line2: "TOGETHER?",
    cta_btn: "Start a project",

    // Footer
    footer_vision: "I don't just build websites. I create visions that stand out and last.",
    footer_cta: "Let's work together",
    footer_email_label: "Projects & Quotes",
    footer_social_label: "Socials",
    footer_rights: "All rights reserved.",
    footer_by: "Othmane Bouakline",

    // Pages
    page_tarifs_sub: "My offers & investments",
    page_about_sub: "Who I am",
    page_portfolio_sub: "My work",
    page_contact_sub: "I'm listening",

    // Chatbot
    chatbot_name: "O'ldev Bot",
    chatbot_status: "Online",
  },

  ma: {
    // Nav
    nav_services: "خدمات",
    nav_portfolio: "أعمالي",
    nav_about: "شكون أنا",
    nav_contact: "اتصال",
    nav_menu: "القائمة",
    nav_close: "إغلاق",

    // Hero
    hero_sub1: "O'ldev",
    hero_sub2: "مطور ويب مستقل",
    hero_tagline: "المطور لي كيحول\nفكرتك لواقع رقمي.",
    hero_cta: "اكتشفني",
    hero_about_link: "طريقتي — شكون أنا",
    hero_desc: "مواقع مصممة\nللطموحات لي مابينهاش تراجع.",

    // About section home
    about_big: "كوديت للرؤية ديالك",
    about_title: "عثمان،\nشكون هو؟",
    about_p1: "مطور ويب مستقل مهووس بحاجة وحدة: نصنع مواقع لي كتجيب نتيجة، ماشي غير مواقع زوينة وصافي.",
    about_p2: "كود نقي. تصميم على المقاس. استراتيجية محسوبة لأهدافك — ماشي ديالي. ما كاين لا قوالب واجدة ولا نسخ ولصق، كاين غير النتائج.",
    stat_clients: "العملاء",
    stat_satisfaction: "الرضا",
    stat_response: "الرد",

    // Services
    services_label: "شنو كندير",
    services_title: "خدماتي",

    // Quote
    quote_1: "كود نقي",
    quote_2: "وتصميم على المقاس.",
    quote_3: "SEO وأداء سريع.",
    quote_4: "اللغة ديالي مدروسة،",
    quote_5: "مبنية باش تنجح.",
    quote_cta: "شوف الأسعار",

    // Portfolio
    portfolio_label: "الأعمال ديالي",
    portfolio_title: "معرض الأعمال",
    portfolio_cta: "شوف كاع المشاريع",

    // Process
    process_label: "كيفاش كنخدم",
    process_title: "طريقة العمل",

    // CTA final
    cta_line1: "نكوديو",
    cta_line2: "مجموعين؟",
    cta_btn: "بدا المشروع ديالك",

    // Footer
    footer_vision: "ماشي غير كنصاوب مواقع. كنخلق رؤية لي كتبقى ودوم.",
    footer_cta: "نخدمو مجموعين",
    footer_email_label: "المشاريع والطلبات",
    footer_social_label: "الشبكات",
    footer_rights: "جميع الحقوق محفوظة.",
    footer_by: "عثمان بواكلين",

    // Pages
    page_tarifs_sub: "العروض ديالي",
    page_about_sub: "شكون أنا",
    page_portfolio_sub: "الأعمال ديالي",
    page_contact_sub: "كنسمعك",

    // Chatbot
    chatbot_name: "O'ldev Bot",
    chatbot_status: "متصل",
  },
};

type TranslationKey = keyof typeof translations.fr;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "fr",
  setLang: () => {},
  t: (key) => translations.fr[key],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  const t = (key: TranslationKey): string => {
    return (translations[lang] as Record<string, string>)[key] ?? (translations.fr as Record<string, string>)[key] ?? key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
