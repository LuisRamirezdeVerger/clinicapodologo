import { SERVICES } from "@/lib/data/services";
import { SITE } from "@/lib/site";

/**
 * JSON-LD para Schema.org · tipo `Podiatrist` (subtipo de MedicalBusiness).
 * Permite a Google generar rich snippets en SERP (rating, mapa, teléfono).
 * Server Component sin estado: el script se inyecta de forma idempotente.
 */
export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Podiatrist",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    logo: `${SITE.url}${SITE.ogImage}`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: ["Cash", "Credit Card", "Bizum"],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    medicalSpecialty: "Podiatry",
    availableService: SERVICES.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.name,
      description: s.description,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de servicios podológicos",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
        },
        price: extractMinPriceEur(s.price),
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: s.price,
          priceCurrency: "EUR",
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // El JSON-LD debe inyectarse como texto crudo dentro del <script>.
      // dangerouslySetInnerHTML es el patrón canónico recomendado por Next.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Extrae el primer número de un string de precio ("30 €", "25 - 60 €" → 30).
 * Schema.org `Offer.price` espera un número o string sin símbolos.
 */
function extractMinPriceEur(price: string): string {
  const match = price.match(/\d+(?:[.,]\d+)?/);
  return match ? match[0].replace(",", ".") : "0";
}
