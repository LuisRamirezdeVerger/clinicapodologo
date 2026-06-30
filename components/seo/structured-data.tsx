import {
  SERVICES,
  pickServiceName,
  pickServiceDescription,
} from "@/lib/data/services";
import type { Locale } from "@/lib/dictionaries";
import { SITE } from "@/lib/site";

/**
 * JSON-LD para Schema.org · tipo `Podiatrist` (subtipo de MedicalBusiness).
 * Locale-aware: el catálogo de servicios se publica en el idioma servido
 * para que Google indexe los rich snippets coherentes con la URL.
 */
export default function StructuredData({ locale }: { locale: Locale }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Podiatrist",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: `${SITE.url}/${locale}`,
    inLanguage: locale,
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
      name: pickServiceName(s, locale),
      description: pickServiceDescription(s, locale),
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:
        locale === "en"
          ? "Podiatry services catalogue"
          : "Catálogo de servicios podológicos",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: pickServiceName(s, locale),
          description: pickServiceDescription(s, locale),
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function extractMinPriceEur(price: string): string {
  const match = price.match(/\d+(?:[.,]\d+)?/);
  return match ? match[0].replace(",", ".") : "0";
}
