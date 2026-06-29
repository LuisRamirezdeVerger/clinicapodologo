import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Especialistas en Biomecánica y Pies`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "podólogo Sevilla",
    "podología Sevilla",
    "quiropodia Sevilla",
    "estudio de la pisada Sevilla",
    "estudio biomecánico Sevilla",
    "plantillas personalizadas Sevilla",
    "tratamiento uña encarnada",
    "papiloma plantar",
    "ortonixia",
    "podólogo a domicilio Sevilla",
    "podología deportiva",
    "Podología Balboa",
  ],
  category: "health",
  alternates: {
    canonical: SITE.url,
    languages: { "es-ES": SITE.url },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Especialistas en Biomecánica y Pies`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} - Clínica podológica en Sevilla`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Especialistas en Biomecánica y Pies`,
    description: SITE.description,
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
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#7b2334",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
