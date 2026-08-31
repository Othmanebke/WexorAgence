export type ServiceKey =
  | "branding_canva"
  | "branding_adobe"
  | "vitrine"
  | "webapp"
  | "wordpress"
  | "refonte"
  | "chatbot_ia";

export type Service = {
  label: string;
  price: string;
  budgets: string[];
  category: "Design & Print" | "Web" | "IA & Automatisation";
};

export const SERVICES: Record<ServiceKey, Service> = {
  branding_canva: {
    label: "Flyer, Logo & Design Graphique (Canva)",
    price: "Dès 50€",
    budgets: ["50–100€", "100–200€", "+ de 200€"],
    category: "Design & Print",
  },
  branding_adobe: {
    label: "Identité Visuelle & Logo (Adobe CC)",
    price: "Dès 100€",
    budgets: ["100–250€", "250–500€", "+ de 500€"],
    category: "Design & Print",
  },
  vitrine: {
    label: "Site Vitrine & Landing Page",
    price: "Dès 300€",
    budgets: ["300€", "300–500€", "500–800€", "+ de 800€"],
    category: "Web",
  },
  webapp: {
    label: "Site & Application Web Sur-Mesure",
    price: "Dès 800€",
    budgets: ["800–1 200€", "1 200–2 000€", "2 000–3 500€", "+ de 3 500€"],
    category: "Web",
  },
  wordpress: {
    label: "Site WordPress Clé en Main",
    price: "Dès 1 200€",
    budgets: ["1 200–1 800€", "1 800–2 500€", "+ de 2 500€"],
    category: "Web",
  },
  refonte: {
    label: "Refonte & Modernisation Web",
    price: "Sur devis",
    budgets: ["< 800€", "800–1 500€", "+ de 1 500€"],
    category: "Web",
  },
  chatbot_ia: {
    label: "Intégration Chatbot IA & Automatisation",
    price: "Sur devis",
    budgets: ["< 1 000€", "1 000–2 500€", "+ de 2 500€"],
    category: "IA & Automatisation",
  },
};

export const SERVICE_GROUPS: { label: string; keys: ServiceKey[] }[] = [
  { label: "Création Web", keys: ["vitrine", "webapp", "wordpress", "refonte"] },
  { label: "Design & Identité Visuelle", keys: ["branding_canva", "branding_adobe"] },
  { label: "IA & Automatisation", keys: ["chatbot_ia"] },
];

export function getBudgets(serviceLabel: string): string[] {
  // Direct match or partial match
  const entry =
    Object.values(SERVICES).find((s) => s.label === serviceLabel) ||
    Object.values(SERVICES).find((s) => serviceLabel.includes(s.label) || s.label.includes(serviceLabel));
  return entry?.budgets ?? ["300€", "500–1 000€", "+ de 1 000€"];
}
