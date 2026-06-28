"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#instalaciones", label: "Instalaciones" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export default function PublicNav() {
  const [open, setOpen] = useState(false);

  // Cierra con Escape (accesibilidad)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Cierra el dropdown al pasar a desktop (≥ md ~ 48rem)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 48rem)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full max-w-[100vw] border-b border-border/40 bg-background/95 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex w-full max-w-[80rem] flex-wrap items-center justify-between gap-[clamp(0.5rem,2vw,1.5rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(0.75rem,2dvh,1.25rem)]"
      >
        <Link
          href="/"
          aria-label="Ir a la página principal"
          onClick={close}
          className="font-bold tracking-tight text-foreground text-[clamp(1.25rem,3vw,1.5rem)] transition-opacity hover:opacity-80 active:scale-[0.98] active:opacity-70"
        >
          Podología Balboa
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-[clamp(1rem,3vw,2.5rem)] md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-muted-foreground transition-colors hover:text-foreground active:scale-[0.95] active:opacity-70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)]">
          <Link
            href="/reserva"
            onClick={close}
            className="inline-flex items-center justify-center rounded-full bg-primary px-[clamp(0.875rem,2.25vw,1.75rem)] py-[clamp(0.5rem,1.5dvh,0.75rem)] text-[clamp(0.8125rem,1.5vw,0.9375rem)] font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.95] active:opacity-90"
          >
            Reservar
          </Link>

          {/* Botón hamburguesa — solo móvil */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-[clamp(2.25rem,6vw,2.75rem)] w-[clamp(2.25rem,6vw,2.75rem)] items-center justify-center rounded-full border border-border bg-background text-foreground transition-all active:scale-[0.92] active:opacity-80 md:hidden"
          >
            {open ? <IconClose /> : <IconBurger />}
          </button>
        </div>
      </nav>

      {/* Dropdown móvil flotante (absolute, h-auto) */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="false"
        aria-label="Menú de navegación"
        hidden={!open}
        className={`absolute left-0 top-full z-40 h-auto w-full max-w-[100vw] overflow-x-hidden border-b border-border bg-background shadow-lg transition-all duration-200 md:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-[0.5rem] opacity-0"
        }`}
      >
        <ul className="mx-auto flex w-full max-w-[80rem] flex-col gap-[clamp(0.375rem,1dvh,0.625rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(1rem,3dvh,1.5rem)]">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className="block w-full rounded-xl px-[clamp(0.75rem,2.5vw,1rem)] py-[clamp(0.625rem,1.75dvh,0.875rem)] text-[clamp(1rem,2vw,1.125rem)] font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.98] active:opacity-80"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/reserva"
              onClick={close}
              className="mt-[clamp(0.25rem,1dvh,0.5rem)] block w-full rounded-xl bg-primary px-[clamp(0.75rem,2.5vw,1rem)] py-[clamp(0.75rem,2dvh,1rem)] text-center text-[clamp(1rem,2vw,1.125rem)] font-semibold text-primary-foreground shadow-sm transition-all active:scale-[0.98] active:opacity-90"
            >
              Reservar cita
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ──────── Iconos SVG inline ──────── */

function IconBurger() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-[1.25rem] w-[1.25rem]"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-[1.25rem] w-[1.25rem]"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}
