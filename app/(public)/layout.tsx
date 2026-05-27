import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Enlaces principales del Navbar y del Footer.
 * Centralizados como única fuente de verdad (DRY).
 */
const NAV_LINKS = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#instalaciones", label: "Instalaciones" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full max-w-[100vw] flex-col overflow-x-hidden bg-background text-foreground">
      {/* ──────────────── HEADER ──────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex w-full max-w-[80rem] flex-wrap items-center justify-between gap-[clamp(0.5rem,2vw,1.5rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(0.75rem,2dvh,1.25rem)]"
        >
          <Link
            href="/"
            aria-label="Ir a la página principal"
            className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-bold tracking-tight transition-opacity hover:opacity-80 active:scale-[0.98] active:opacity-70"
          >
            Clínica Podología
          </Link>

          <ul className="hidden items-center gap-[clamp(1rem,3vw,2.5rem)] md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-muted-foreground transition-colors hover:text-foreground active:scale-[0.98] active:opacity-70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/reserva"
            className="inline-flex items-center justify-center rounded-full bg-primary px-[clamp(1rem,2.5vw,1.75rem)] py-[clamp(0.5rem,1.5dvh,0.75rem)] text-[clamp(0.8125rem,1.5vw,0.9375rem)] font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.97] active:opacity-90"
          >
            Reservar cita
          </Link>
        </nav>
      </header>

      {/* ──────────────── MAIN ──────────────── */}
      <main className="flex-1 w-full">{children}</main>

      {/* ──────────────── FOOTER ──────────────── */}
      <footer className="w-full border-t border-border/40 bg-muted/30">
        <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 gap-[clamp(1.5rem,4dvh,2.5rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(2rem,5dvh,3.5rem)] sm:grid-cols-2 lg:grid-cols-4">
          <section aria-labelledby="footer-brand">
            <h2
              id="footer-brand"
              className="text-[clamp(1rem,2vw,1.25rem)] font-bold"
            >
              Clínica Podología
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
              {NAV_LINKS.map((link) => (
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
              <span className="break-words">Calle Mayor, 24 · 28013 Madrid</span>
              <a
                href="tel:+34910000000"
                className="transition-colors hover:text-foreground active:scale-[0.98] active:opacity-70"
              >
                +34 910 000 000
              </a>
              <a
                href="mailto:info@clinicapodologia.es"
                className="break-words transition-colors hover:text-foreground active:scale-[0.98] active:opacity-70"
              >
                info@clinicapodologia.es
              </a>
            </address>
          </section>

          <section aria-labelledby="footer-hours">
            <h2
              id="footer-hours"
              className="text-[clamp(0.875rem,1.5vw,1rem)] font-semibold uppercase tracking-wider"
            >
              Horario
            </h2>
            <dl className="mt-[clamp(0.75rem,2dvh,1rem)] flex flex-col gap-[clamp(0.375rem,1dvh,0.5rem)] text-[clamp(0.8125rem,1.4vw,0.9375rem)] text-muted-foreground">
              <div className="flex flex-wrap justify-between gap-[0.5rem]">
                <dt>Lun - Vie</dt>
                <dd>09:00 - 20:00</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-[0.5rem]">
                <dt>Sábado</dt>
                <dd>10:00 - 14:00</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-[0.5rem]">
                <dt>Domingo</dt>
                <dd>Cerrado</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="border-t border-border/40">
          <p className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(1rem,2.5dvh,1.5rem)] text-center text-[clamp(0.75rem,1.3vw,0.875rem)] text-muted-foreground">
            © {new Date().getFullYear()} Clínica Podología. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* ──────────────── BOTTOM BAR · CRÉDITOS ──────────────── */}
      <aside
        aria-label="Créditos de desarrollo"
        className="w-full border-t border-border/40 bg-background"
      >
        <p className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(0.625rem,1.5dvh,1rem)] text-center text-[clamp(0.6875rem,1.2vw,0.8125rem)] text-muted-foreground">
          Hecho con cariño por{" "}
          <a
            href="https://lacasadelosinventos.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline-offset-[0.25rem] transition-all hover:underline active:scale-[0.98] active:opacity-70"
          >
            La Casa de los Inventos
          </a>
        </p>
      </aside>
    </div>
  );
}
