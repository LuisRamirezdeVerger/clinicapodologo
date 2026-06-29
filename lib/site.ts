/**
 * Configuración canónica del sitio. Fuente única de verdad consumida por
 * `layout.tsx` (metadata), `sitemap.ts`, `robots.ts` y el JSON-LD de la
 * landing. Si cambia el dominio o el teléfono, se actualiza aquí.
 */

export const SITE = {
  name: "Podología Balboa",
  url: "https://www.podologiabalboa.es",
  locale: "es_ES",
  description:
    "Podología Balboa en Sevilla: quiropodia, estudio biomecánico de la pisada, plantillas personalizadas, tratamiento de uña encarnada sin cirugía y servicio a domicilio. Reserva online tu cita.",
  ogImage: "/logo.webp",
  phone: "+34 686 56 63 20",
  email: "reservas@podologiabalboa.es",
  address: {
    street: "Calle Luis Montoto, 150",
    locality: "Sevilla",
    region: "Sevilla",
    postalCode: "41005",
    country: "ES",
  },
  geo: {
    latitude: 37.38821,
    longitude: -5.96784,
  },
  serviceAreas: [
    "Sevilla",
    "Dos Hermanas",
    "Alcalá de Guadaíra",
    "Mairena del Aljarafe",
    "Utrera",
    "La Rinconada",
    "Los Palacios y Villafranca",
    "Coria del Río",
    "Camas",
    "Tomares",
    "Mairena del Alcor",
    "San Juan de Aznalfarache",
    "Bormujos",
    "Castilleja de la Cuesta",
    "Aljarafe",
    "Gines",
    "Espartinas",
  ],
} as const;
