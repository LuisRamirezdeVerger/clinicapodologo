/**
 * Catálogo oficial de servicios de la Clínica de Podología.
 * Fuente única de verdad consumida por la landing pública (`/`) y por el
 * flujo de reservas (`/reserva`). Si un precio o descripción cambia, se
 * edita aquí y se propaga automáticamente a toda la UI.
 */

export type Service = {
  id: string;
  name: string;
  /** Precio visible al paciente, incluye rango si aplica. */
  price: string;
  /** Breve descripción clínica orientada al paciente. */
  description: string;
};

export const SERVICES: readonly Service[] = [
  {
    id: "quiropodia",
    name: "Quiropodia",
    price: "30 €",
    description:
      "Tratamiento integral de uñas, durezas, callos y helomas para mantener la salud y comodidad del pie.",
  },
  {
    id: "estudio-biomecanico",
    name: "Estudio biomecánico de la pisada",
    price: "60 €",
    description:
      "Análisis computarizado de la marcha con plataforma de presiones para diagnosticar alteraciones posturales y de apoyo.",
  },
  {
    id: "plantillas",
    name: "Plantillas personalizadas",
    price: "120 €",
    description:
      "Diseño y fabricación a medida tras el estudio biomecánico para corregir y prevenir patologías del pie y la postura.",
  },
  {
    id: "papiloma",
    name: "Verruga plantar (papiloma)",
    price: "100 €",
    description:
      "Tratamiento del papiloma plantar mediante técnicas de eliminación seguras y eficaces, minimizando recidivas.",
  },
  {
    id: "ortonixia",
    name: "Ortonixia",
    price: "25 - 60 €",
    description:
      "Reeducación de la lámina ungueal con brackets o filamentos. Precio según tamaño y técnica empleada.",
  },
  {
    id: "vendaje",
    name: "Vendaje funcional o neuromuscular",
    price: "20 €",
    description:
      "Aplicación terapéutica de vendaje para estabilizar lesiones deportivas o facilitar la recuperación muscular.",
  },
  {
    id: "una-encarnada",
    name: "Tratamiento de uña encarnada sin cirugía",
    price: "50 €",
    description:
      "Resolución conservadora de onicocriptosis evitando intervención quirúrgica, con alivio inmediato del dolor.",
  },
  {
    id: "domicilio",
    name: "Servicio a domicilio",
    price: "40 - 50 €",
    description:
      "Atención podológica en tu hogar para pacientes con movilidad reducida o que prefieren la comodidad de su entorno.",
  },
] as const;
