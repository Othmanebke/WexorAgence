/** Public site identity — shared by metadata, JSON-LD, sitemap and footer. */

import { SERVICES } from "@/lib/services";

// Set NEXT_PUBLIC_SITE_URL on Vercel when a custom domain is connected.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://oldev.vercel.app").replace(/\/$/, "");

export const SITE_NAME = "O'ldev";
export const OWNER = "Othmane Bouakline";
export const EMAIL = "othmane.bouakline.pro@gmail.com";

export const SITE_TITLE = "Othmane Bouakline — Développeur web freelance | O'ldev";
export const SITE_DESCRIPTION =
  `Développeur web freelance basé en Île-de-France (Brie-Comte-Robert) : sites vitrines, sur-mesure Next.js / React et WordPress partout en France, ${SERVICES.vitrine.price.toLowerCase()}.`;

/** Based in Brie-Comte-Robert (77), works with clients all over France. */
export const LOCATION = {
  city: "Brie-Comte-Robert",
  postalCode: "77170",
  region: "Île-de-France",
  country: "FR",
};

export const SOCIALS = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/othmane-bouakline/" },
  { label: "GitHub",    href: "https://github.com/Othmanebke" },
  { label: "Instagram", href: "https://www.instagram.com/o.ldev/" },
  { label: "TikTok",    href: "https://www.tiktok.com/@o.ldev" },
];
