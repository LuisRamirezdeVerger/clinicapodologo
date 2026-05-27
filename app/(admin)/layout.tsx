import Link from "next/link";
import type { ReactNode } from "react";
import AdminMobileNav from "@/components/admin/admin-mobile-nav";

const ADMIN_NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard#calendario", label: "Calendario" },
  { href: "/dashboard#pacientes", label: "Pacientes" },
  { href: "/dashboard#configuracion", label: "Configuración" },
] as const;

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full max-w-[100vw] flex-col overflow-x-hidden bg-muted/30 text-foreground md:flex-row">
      {/* ───────── SIDEBAR (desktop) ───────── */}
      <aside
        aria-label="Navegación lateral del panel"
        className="hidden w-[clamp(14rem,18vw,18rem)] shrink-0 flex-col border-r border-border bg-background md:flex"
      >
        <div className="flex items-center gap-[0.5rem] border-b border-border px-[clamp(1rem,2vw,1.5rem)] py-[clamp(1rem,2.5dvh,1.5rem)]">
          <span className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
            CP
          </span>
          <span className="text-[clamp(0.9375rem,1.4vw,1.0625rem)] font-bold tracking-tight">
            Admin Podología
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-[clamp(0.125rem,0.5dvh,0.25rem)] p-[clamp(0.75rem,1.5vw,1rem)]">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.5rem,1.25dvh,0.625rem)] text-[clamp(0.875rem,1.4vw,0.9375rem)] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.98] active:opacity-80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-[clamp(0.75rem,1.5vw,1rem)]">
          <Link
            href="/"
            className="block rounded-lg px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.5rem,1.25dvh,0.625rem)] text-[clamp(0.8125rem,1.3vw,0.875rem)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.98]"
          >
            ← Volver al sitio público
          </Link>
        </div>
      </aside>

      {/* ───────── COLUMNA DERECHA ───────── */}
      <div className="flex w-full max-w-[100vw] flex-1 flex-col overflow-x-hidden">
        {/* TOPBAR */}
        <header className="relative w-full border-b border-border bg-background">
          <div className="flex w-full items-center justify-between gap-[clamp(0.5rem,2vw,1rem)] px-[clamp(1rem,4vw,2rem)] py-[clamp(0.75rem,2dvh,1rem)]">
            <div className="flex items-center gap-[0.5rem] md:hidden">
              <span className="flex h-[2rem] w-[2rem] items-center justify-center rounded-lg bg-primary text-primary-foreground text-[0.8125rem] font-bold">
                CP
              </span>
              <span className="text-[clamp(0.9375rem,2vw,1.0625rem)] font-bold">
                Admin
              </span>
            </div>

            <h1 className="hidden text-[clamp(1rem,1.5vw,1.25rem)] font-semibold md:block">
              Panel de administración
            </h1>

            <div className="flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)]">
              <span className="hidden text-[clamp(0.8125rem,1.3vw,0.9375rem)] text-muted-foreground sm:inline">
                Hola, <strong className="text-foreground">Ángel</strong>
              </span>
              <Link
                href="/login"
                className="rounded-full border border-border bg-background px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.375rem,1.25dvh,0.5rem)] text-[clamp(0.75rem,1.3vw,0.875rem)] font-medium transition-colors hover:bg-muted active:scale-[0.95]"
              >
                Salir
              </Link>
              <AdminMobileNav items={ADMIN_NAV} />
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="w-full max-w-[100vw] flex-1 overflow-x-hidden p-[clamp(1rem,3vw,2rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
