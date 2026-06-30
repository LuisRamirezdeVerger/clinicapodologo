/**
 * Catálogo oficial de servicios de Podología Balboa.
 * Fuente única bilingüe consumida por landing (`/`), reservas (`/reserva`),
 * JSON-LD (SEO) y email transaccional.
 */

import type { Locale } from "@/lib/dictionaries";

export type LocalizedString = { es: string; en: string };

export type Service = {
  id: string;
  name: LocalizedString;
  /** Precio visible al paciente, incluye rango si aplica. Independiente de idioma. */
  price: string;
  description: LocalizedString;
};

export const SERVICES: readonly Service[] = [
  {
    id: "quiropodia",
    name: {
      es: "Quiropodia",
      en: "Chiropody / Routine Foot Care",
    },
    price: "30 €",
    description: {
      es: "Tratamiento integral de uñas, durezas, callos y helomas para mantener la salud y comodidad del pie.",
      en: "Comprehensive treatment of nails, hard skin, calluses and corns to maintain foot health and comfort.",
    },
  },
  {
    id: "estudio-biomecanico",
    name: {
      es: "Estudio biomecánico de la pisada",
      en: "Biomechanical Gait Assessment",
    },
    price: "60 €",
    description: {
      es: "Análisis computarizado de la marcha con plataforma de presiones para diagnosticar alteraciones posturales y de apoyo.",
      en: "Computerised gait analysis with pressure platform to diagnose postural and weight-bearing imbalances.",
    },
  },
  {
    id: "plantillas",
    name: {
      es: "Plantillas personalizadas",
      en: "Custom Orthotic Insoles",
    },
    price: "120 €",
    description: {
      es: "Diseño y fabricación a medida tras el estudio biomecánico para corregir y prevenir patologías del pie y la postura.",
      en: "Bespoke design and manufacture following biomechanical assessment to correct and prevent foot and postural pathologies.",
    },
  },
  {
    id: "papiloma",
    name: {
      es: "Verruga plantar (papiloma)",
      en: "Plantar Wart (HPV) Treatment",
    },
    price: "100 €",
    description: {
      es: "Tratamiento del papiloma plantar mediante técnicas de eliminación seguras y eficaces, minimizando recidivas.",
      en: "Treatment of plantar warts using safe, effective removal techniques while minimising recurrence.",
    },
  },
  {
    id: "ortonixia",
    name: {
      es: "Prótesis de silicona",
      en: "Custom Silicone Orthoses",
    },
    price: "25 - 60 €",
    description: {
      es: "Elaboración de órtesis de silicona a medida para corregir deformidades en los dedos, aliviar presiones, roces y prevenir la aparición de callosidades.",
      en: "Custom silicone orthoses to correct toe deformities, relieve pressure points, reduce friction and prevent callus formation.",
    },
  },
  {
    id: "vendaje",
    name: {
      es: "Vendaje funcional o neuromuscular",
      en: "Functional or Kinesiology Taping",
    },
    price: "20 €",
    description: {
      es: "Aplicación terapéutica de vendaje para estabilizar lesiones deportivas o facilitar la recuperación muscular.",
      en: "Therapeutic taping to stabilise sports injuries and support muscular recovery.",
    },
  },
  {
    id: "una-encarnada",
    name: {
      es: "Tratamiento de uña encarnada sin cirugía",
      en: "Ingrown Toenail Treatment (Non-Surgical)",
    },
    price: "50 €",
    description: {
      es: "Resolución conservadora de onicocriptosis evitando intervención quirúrgica, con alivio inmediato del dolor.",
      en: "Conservative resolution of onychocryptosis without surgery, providing immediate pain relief.",
    },
  },
  {
    id: "domicilio",
    name: {
      es: "Servicio a domicilio",
      en: "At-Home Podiatry Service",
    },
    price: "40 - 50 €",
    description: {
      es: "Atención podológica en tu hogar para pacientes con movilidad reducida o que prefieren la comodidad de su entorno.",
      en: "Podiatric care at your home for patients with reduced mobility or those who prefer the comfort of their own environment.",
    },
  },
] as const;

/* ───────────── Helpers ───────────── */

export const pickServiceName = (s: Service, locale: Locale): string =>
  s.name[locale] ?? s.name.es;

export const pickServiceDescription = (s: Service, locale: Locale): string =>
  s.description[locale] ?? s.description.es;
