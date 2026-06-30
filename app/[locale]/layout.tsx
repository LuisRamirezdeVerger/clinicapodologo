import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { LOCALES, type Locale } from "@/lib/dictionaries";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE_BY_LOCALE: Record<Locale, string> = {
  es: `${SITE.name} | Especialistas en Biomecánica y Pies`,
  en: `${SITE.name} | Foot & Biomechanics Specialists`,
};

const DESCRIPTION_BY_LOCALE: Record<Locale, string> = {
  es: SITE.description,
  en: "Podología Balboa in Seville: chiropody, biomechanical gait assessment, custom orthotic insoles, non-surgical ingrown toenail treatment and at-home service. Book your appointment online.",
};

const OG_LOCALE: Record<Locale, string> = {
  es: "es_ES",
  en: "en_GB",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (LOCALES as readonly string[]).includes(raw)
    ? (raw as Locale)
    : ("es" as Locale);
  const title = TITLE_BY_LOCALE[locale] ?? TITLE_BY_LOCALE.es;
  const description = DESCRIPTION_BY_LOCALE[locale] ?? DESCRIPTION_BY_LOCALE.es;
  const url = `${SITE.url}/${locale}`;

  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: `%s | ${SITE.name}` },
    description,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    keywords:
      locale === "en"
        ? [
            "podiatrist Seville",
            "chiropody Seville",
            "biomechanical gait assessment",
            "custom orthotic insoles",
            "ingrown toenail treatment",
            "plantar wart",
            "silicone orthoses",
            "at-home podiatry Seville",
            "sports podiatry",
            "Podología Balboa",
          ]
        : [
            "podólogo Sevilla",
            "podología Sevilla",
            "quiropodia Sevilla",
            "estudio de la pisada Sevilla",
            "estudio biomecánico Sevilla",
            "plantillas personalizadas Sevilla",
            "tratamiento uña encarnada",
            "papiloma plantar",
            "podólogo a domicilio Sevilla",
            "podología deportiva",
            "Podología Balboa",
          ],
    category: "health",
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE.url}/es`,
        en: `${SITE.url}/en`,
        "x-default": `${SITE.url}/es`,
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url,
      siteName: SITE.name,
      title,
      description,
      images: [
        {
          url: SITE.ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE.name} - ${locale === "en" ? "Podiatric clinic in Seville" : "Clínica podológica en Sevilla"}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: true, email: true, address: true },
    icons: {
      icon: [{ url: "/logo.webp", type: "image/webp" }],
      apple: "/logo.webp",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#7b2334",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} data-scroll-behavior="smooth" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
