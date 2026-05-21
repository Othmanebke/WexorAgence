export type ServiceKey =
  | "landing" | "vitrine" | "wordpress" | "webapp" | "refonte"
  | "social_starter" | "social_growth" | "social_pro"
  | "branding_canva" | "branding_adobe";

export type Service = {
  label: string;
  price: string;
  budgets: string[];
  category: "Web" | "Social Media" | "Branding";
};

export const SERVICES: Record<ServiceKey, Service> = {
  landing:        { label: "Landing Page",            price: "300€",              budgets: ["300€", "300–600€", "+ de 600€"],              category: "Web" },
  vitrine:        { label: "Site Vitrine",             price: "À partir de 750€",  budgets: ["750–1 000€", "1 000–1 500€", "+ de 1 500€"],   category: "Web" },
  wordpress:      { label: "Pack WordPress",           price: "À partir de 1 200€",budgets: ["1 200–1 500€", "1 500–2 000€", "+ de 2 000€"], category: "Web" },
  webapp:         { label: "Application Web / SaaS",   price: "À partir de 2 500€",budgets: ["2 500–4 000€", "4 000–6 000€", "+ de 6 000€"], category: "Web" },
  refonte:        { label: "Refonte Web",              price: "Sur devis",         budgets: ["< 1 500€", "1 500–3 000€", "+ de 3 000€"],      category: "Web" },
  social_starter: { label: "Social Media — Starter",   price: "150€/mois",         budgets: ["150€/mois"],                                   category: "Social Media" },
  social_growth:  { label: "Social Media — Growth",    price: "450€/mois",         budgets: ["450€/mois"],                                   category: "Social Media" },
  social_pro:     { label: "Social Media — Pro",       price: "1 500€/mois",       budgets: ["1 500€/mois"],                                 category: "Social Media" },
  branding_canva: { label: "Branding Pack Canva Pro",  price: "150–350€",          budgets: ["150–350€"],                                    category: "Branding" },
  branding_adobe: { label: "Branding Pack Adobe CC",   price: "600–1 200€",        budgets: ["600–1 200€"],                                  category: "Branding" },
};

export const SERVICE_GROUPS: { label: string; keys: ServiceKey[] }[] = [
  { label: "Services Web",    keys: ["landing", "vitrine", "wordpress", "webapp", "refonte"] },
  { label: "Social Media",    keys: ["social_starter", "social_growth", "social_pro"] },
  { label: "Branding & Print",keys: ["branding_canva", "branding_adobe"] },
];

export function getBudgets(serviceLabel: string): string[] {
  const entry = Object.values(SERVICES).find((s) => s.label === serviceLabel);
  return entry?.budgets ?? ["< 1 000€", "1 000–3 000€", "+ de 3 000€"];
}
