import "server-only";

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

/** Diccionario tipado desde el JSON canónico en español. */
export type Dictionary = typeof import("@/dictionaries/es.json");

/**
 * Carga el diccionario del idioma indicado. Solo se incluye en el bundle el JSON
 * realmente solicitado gracias a los imports dinámicos (code-splitting nativo).
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  (loaders[locale] ?? loaders[DEFAULT_LOCALE])();

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);
