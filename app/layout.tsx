import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clinica-podologia.example.com"),
  title: {
    default: "Clínica Podología | Cuidamos la salud de tus pies",
    template: "%s | Clínica Podología",
  },
  description:
    "Clínica de podología especializada en quiropodia, estudio biomecánico, podología infantil y cirugía ungueal. Reserva tu cita online en minutos.",
  keywords: [
    "podología",
    "podólogo",
    "quiropodia",
    "estudio biomecánico",
    "plantillas personalizadas",
    "uñas encarnadas",
    "clínica del pie",
  ],
  authors: [{ name: "Clínica Podología" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Clínica Podología",
    title: "Clínica Podología | Cuidamos la salud de tus pies",
    description:
      "Tratamientos podológicos personalizados con tecnología avanzada. Reserva online.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0aa6a0",
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
