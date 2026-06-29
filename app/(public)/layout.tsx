import Link from "next/link";
import type { ReactNode } from "react";
import PublicNav from "@/components/ui/public-nav";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { SITE } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#instalaciones", label: "Instalaciones" },
  { href: "/#contacto", label: "Contacto" },
] as const;

// E.164 puro para hrefs (tel:/mailto): quita espacios del teléfono.
const PHONE_E164 = SITE.phone.replace(/\s+/g, "");

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full max-w-[100vw] flex-col overflow-x-hidden bg-background text-foreground">
      {/* ─────────── HEADER ───────────
          El posicionamiento (fixed) y los estilos visuales viven dentro de
          <PublicNav />. El <header> aquí es puramente semántico (landmark
          para lectores de pantalla y SEO), sin clases de layout. */}
      <header>
        <PublicNav />
      </header>

      {/* ─────────── MAIN ───────────
          pt-[clamp(...)] compensa la altura del navbar fixed para evitar
          que el contenido quede oculto bajo la barra superior. */}
      <main className="w-full flex-1 pt-[clamp(3.5rem,9dvh,5rem)]">
        {children}
      </main>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="w-full border-t border-border/40 bg-muted/30">
        <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 gap-[clamp(1.5rem,4dvh,2.5rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(2rem,5dvh,3.5rem)] sm:grid-cols-2 lg:grid-cols-4">
          <section aria-labelledby="footer-brand">
            <h2
              id="footer-brand"
              className="text-[clamp(1rem,2vw,1.25rem)] font-bold"
            >
              {SITE.name}
            </h2>
            <p className="mt-[clamp(0.5rem,1.5dvh,0.75rem)] text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-relaxed text-muted-foreground break-words">
              Cuidamos la salud de tus pies con tecnología avanzada y trato cercano desde hace más de una década.
            </p>
          </section>

          <section aria-labelledby="footer-nav">
            <h2
              id="footer-nav"
              className="text-[clamp(0.875rem,1.5vw,1rem)] font-semibold uppercase tracking-wider"
            >
              Navegación
            </h2>
            <ul className="mt-[clamp(0.75rem,2dvh,1rem)] flex flex-col gap-[clamp(0.375rem,1dvh,0.5rem)]">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] text-muted-foreground transition-colors hover:text-foreground active:scale-[0.98] active:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-contact">
            <h2
              id="footer-contact"
              className="text-[clamp(0.875rem,1.5vw,1rem)] font-semibold uppercase tracking-wider"
            >
              Contacto
            </h2>
            <address className="mt-[clamp(0.75rem,2dvh,1rem)] flex flex-col gap-[clamp(0.375rem,1dvh,0.5rem)] text-[clamp(0.8125rem,1.4vw,0.9375rem)] not-italic text-muted-foreground">
              <span className="break-words">
                {SITE.address.street} · {SITE.address.postalCode}{" "}
                {SITE.address.locality}
              </span>
              <a
                href={`tel:${PHONE_E164}`}
                className="transition-colors hover:text-foreground active:scale-[0.98] active:opacity-70"
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="break-words transition-colors hover:text-foreground active:scale-[0.98] active:opacity-70"
              >
                {SITE.email}
              </a>
            </address>
          </section>

          <section aria-labelledby="footer-areas">
            <h2
              id="footer-areas"
              className="text-[clamp(0.875rem,1.5vw,1rem)] font-semibold uppercase tracking-wider"
            >
              Zonas de servicio
            </h2>
            <ul className="mt-[clamp(0.75rem,2dvh,1rem)] flex flex-wrap gap-[clamp(0.25rem,0.75vw,0.375rem)] text-[clamp(0.75rem,1.3vw,0.8125rem)]">
              {SITE.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-background px-[clamp(0.5rem,1.5vw,0.75rem)] py-[0.1875rem] text-muted-foreground break-words"
                >
                  {area}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="border-t border-border/40">
          <p className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(1rem,2.5dvh,1.5rem)] text-center text-[clamp(0.75rem,1.3vw,0.875rem)] text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* ─────────── BOTTOM BAR · CRÉDITOS ─────────── */}
      <aside
        aria-label="Créditos de desarrollo"
        className="w-full border-t border-border/40 bg-background"
      >
        <p className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(0.625rem,1.5dvh,1rem)] text-center text-[clamp(0.6875rem,1.2vw,0.8125rem)] text-muted-foreground">
          Hecho con cariño por{" "}
          <a
            href="https://lacasadelosinventos.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline-offset-[0.25rem] transition-all hover:underline active:scale-[0.98] active:opacity-70"
          >
            La Casa de los Inventos
          </a>
        </p>
      </aside>

      {/* ─────────── FAB · SCROLL TO TOP ─────────── */}
      <ScrollToTop />
    </div>
  );
}
