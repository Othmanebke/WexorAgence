export type ProjectTag = "nextjs" | "wordpress" | "html";

export type Project = {
  id: string;
  name: string;
  category: string;
  tag: ProjectTag;
  tagline: string;
  stack: string[];
  image: string;
  concept?: boolean;
};

export const PROJECT_FILTERS: { tag: ProjectTag | "all"; label: string }[] = [
  { tag: "all",       label: "Tous" },
  { tag: "nextjs",    label: "React / Next.js" },
  { tag: "wordpress", label: "WordPress" },
  { tag: "html",      label: "HTML" },
];

export const PROJECTS: Project[] = [
  {
    id: "forma",
    name: "Forma Immobilier",
    category: "Agence immo · Next.js",
    tag: "nextjs",
    tagline: "Agence immobilière avec moteur de recherche avancé, fiches biens, prise de rendez-vous et espace propriétaire sécurisé.",
    stack: ["Next.js", "Tailwind", "React"],
    image: "/portfolio/forma.webp",
  },
  {
    id: "parfumerie",
    name: "Maison Parfumerie",
    category: "E-commerce · Next.js",
    tag: "nextjs",
    tagline: "Boutique e-commerce haut de gamme : catalogue, panier, paiement Stripe et interface d’administration.",
    stack: ["Next.js", "React", "Tailwind"],
    image: "/portfolio/parfumerie.webp",
  },
  {
    id: "aivana",
    name: "Aivana SaaS",
    category: "Dashboard IA · Next.js",
    tag: "nextjs",
    tagline: "Tableau de bord SaaS avec analyses prédictives, automatisation IA et rapports personnalisés.",
    stack: ["Next.js", "Tailwind", "OpenAI"],
    image: "/portfolio/aivana.webp",
    concept: true,
  },
  {
    id: "brows",
    name: "Brows Creative",
    category: "E-commerce · WordPress",
    tag: "wordpress",
    tagline: "Boutique WooCommerce pour salon de beauté : catalogue soins, réservations en ligne et boutique intégrée.",
    stack: ["WordPress", "WooCommerce", "Elementor"],
    image: "/portfolio/brows.webp",
  },
  {
    id: "verdure",
    name: "Maison Verdure",
    category: "Site vitrine · HTML",
    tag: "html",
    tagline: "Site vitrine pour une boulangerie artisanale : menu interactif, histoire de la maison et commandes en ligne.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "/portfolio/verdure.webp",
  },
  {
    id: "luxecars",
    name: "LuxeCars",
    category: "Location · React",
    tag: "nextjs",
    tagline: "Plateforme premium de location de voitures de luxe : catalogue filtrable, réservation instantanée et paiement sécurisé.",
    stack: ["React", "Vite", "Tailwind"],
    image: "/portfolio/luxecars.webp",
  },
  {
    id: "sora",
    name: "Sora Thai",
    category: "Restaurant · HTML",
    tag: "html",
    tagline: "Site élégant pour restaurant thaïlandais : carte animée, galerie immersive et module de réservation en ligne.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "/portfolio/sora.webp",
  },
  {
    id: "ajt",
    name: "AJT Blog",
    category: "Blog · Next.js",
    tag: "nextjs",
    tagline: "Blog moderne avec système de catégories, recherche plein texte, commentaires et tableau de bord auteur.",
    stack: ["React", "Next.js", "Tailwind"],
    image: "/portfolio/ajt-blog.webp",
  },
];
