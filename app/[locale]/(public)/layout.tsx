import Link from "next/link";
import type { ReactNode } from "react";
import PublicNav from "@/components/ui/public-nav";
import ScrollToTop from "@/components/ui/scroll-to-top";
import CookieBanner from "@/components/ui/cookie-banner";
import { SITE } from "@/lib/site";
import { getDictionary, type Locale } from "@/lib/dictionaries";

// E.164 puro para hrefs (tel:/mailto): quita espacios del teléfono.
const PHONE_E164 = SITE.phone.replace(/\s+/g, "");

export default async function PublicLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = raw === "en" ? "en" : "es";
  const dict = await getDictionary(locale);

  const FOOTER_LINKS = [
    { href: `/${locale}#servicios`, label: dict.nav.services },
    { href: `/${locale}#equipo`, label: dict.nav.clinic },
    { href: `/${locale}#sobre-mi`, label: dict.nav.aboutMe },
    { href: `/${locale}#contacto`, label: dict.nav.contact },
  ];

  return (
    <div className="flex min-h-[100dvh] w-full max-w-[100vw] flex-col overflow-x-hidden bg-background text-foreground">
      <header>
        <PublicNav
          locale={locale}
          nav={dict.nav}
          switcher={dict.languageSwitcher}
        />
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
              {dict.footer.tagline}
            </p>
          </section>

          <section aria-labelledby="footer-nav">
            <h2
              id="footer-nav"
              className="text-[clamp(0.875rem,1.5vw,1rem)] font-semibold uppercase tracking-wider"
            >
              {dict.footer.nav}
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
              {dict.footer.contact}
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
              {dict.footer.areas}
            </h2>
            <ul className="mt-[clamp(0.75rem,2dvh,1rem)] flex flex-wrap items-center gap-[clamp(0.25rem,0.75vw,0.375rem)] text-[clamp(0.75rem,1.3vw,0.8125rem)]">
              {SITE.serviceAreas.slice(0, 5).map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-background px-[clamp(0.5rem,1.5vw,0.75rem)] py-[0.1875rem] text-muted-foreground break-words"
                >
                  {area}
                </li>
              ))}
              <li className="text-muted-foreground/70 italic">{dict.footer.andMore}</li>
            </ul>
          </section>
        </div>

        <div className="border-t border-border/40">
          <p className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(1rem,2.5dvh,1.5rem)] text-center text-[clamp(0.75rem,1.3vw,0.875rem)] text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. {dict.footer.rights}
          </p>
        </div>
      </footer>

      {/* ─────────── BOTTOM BAR · CRÉDITOS ─────────── */}
      <aside
        aria-label="Créditos de desarrollo"
        className="w-full border-t border-border/40 bg-background"
      >
        <p className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(0.625rem,1.5dvh,1rem)] text-center text-[clamp(0.6875rem,1.2vw,0.8125rem)] text-muted-foreground">
          {dict.footer.credits}{" "}
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

      {/* ─────────── FILA LEGAL ─────────── */}
      <nav
        aria-label="Enlaces legales"
        className="w-full border-t border-border/40 bg-background"
      >
        <ul className="mx-auto flex w-full max-w-[80rem] flex-wrap items-center justify-center gap-[clamp(0.75rem,2.5vw,1.5rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(0.625rem,1.5dvh,1rem)] text-[clamp(0.6875rem,1.2vw,0.8125rem)]">
          <li>
            <Link
              href={`/${locale}/legal/aviso-legal`}
              className="text-muted-foreground transition-colors hover:text-foreground active:opacity-70"
            >
              {dict.legal.notice}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/legal/privacidad`}
              className="text-muted-foreground transition-colors hover:text-foreground active:opacity-70"
            >
              {dict.legal.privacy}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/legal/cookies`}
              className="text-muted-foreground transition-colors hover:text-foreground active:opacity-70"
            >
              {dict.legal.cookies}
            </Link>
          </li>
        </ul>
      </nav>

      {/* ─────────── FAB · SCROLL TO TOP ─────────── */}
      <ScrollToTop />

      {/* ─────────── BANNER DE COOKIES ─────────── */}
      <CookieBanner
        locale={locale}
        message={dict.legal.banner.message}
        accept={dict.legal.banner.accept}
        reject={dict.legal.banner.reject}
        learnMore={dict.legal.banner.learnMore}
      />
    </div>
  );
}
