import { SERVICES, type ServiceKey } from "@/lib/services";
import { EMAIL, OWNER, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIALS } from "@/lib/site";

const OFFERS: ServiceKey[] = ["vitrine", "webapp", "wordpress", "branding_canva", "refonte", "chatbot_ia"];

/** "Dès 1 200€" → 1200 ; "Sur devis" → undefined */
const minPrice = (price: string) => {
  const n = parseInt(price.replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : undefined;
};

/** schema.org graph for the home page (Person + ProfessionalService + WebSite). */
export function homeJsonLd() {
  const person = `${SITE_URL}/#person`;
  const business = `${SITE_URL}/#business`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: OWNER,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image.png`,
        jobTitle: "Développeur web freelance",
        email: `mailto:${EMAIL}`,
        sameAs: SOCIALS.map((s) => s.href),
        knowsAbout: ["Next.js", "React", "TypeScript", "WordPress", "WooCommerce", "Tailwind CSS", "Node.js", "SEO", "ServiceNow"],
        worksFor: { "@id": business },
      },
      {
        "@type": "ProfessionalService",
        "@id": business,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image.png`,
        logo: `${SITE_URL}/icon.png`,
        email: EMAIL,
        founder: { "@id": person },
        areaServed: { "@type": "Country", name: "France" },
        currenciesAccepted: "EUR",
        makesOffer: OFFERS.map((key) => {
          const s = SERVICES[key];
          const min = minPrice(s.price);
          return {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.label },
            ...(min !== undefined && {
              priceSpecification: { "@type": "PriceSpecification", minPrice: min, priceCurrency: "EUR" },
            }),
          };
        }),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "fr-FR",
        publisher: { "@id": business },
      },
    ],
  };
}
