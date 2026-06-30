import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { LOCALES } from "@/lib/dictionaries";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) => [
    {
      url: `${SITE.url}/${locale}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: locale === "es" ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE.url}/${l}`]),
        ),
      },
    },
    {
      url: `${SITE.url}/${locale}/reserva`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);
}
