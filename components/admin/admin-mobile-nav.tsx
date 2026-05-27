"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };

export default function AdminMobileNav({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="admin-mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-[clamp(2.25rem,6vw,2.75rem)] w-[clamp(2.25rem,6vw,2.75rem)] items-center justify-center rounded-full border border-border bg-background text-foreground transition-all active:scale-[0.92] active:opacity-80"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className="h-[1.25rem] w-[1.25rem]"
        >
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      <div
        id="admin-mobile-menu"
        role="dialog"
        aria-modal="false"
        hidden={!open}
        className={`absolute left-0 top-full z-40 w-full max-w-[100vw] overflow-x-hidden border-b border-border bg-background shadow-lg transition-all duration-200 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-[0.5rem] opacity-0"
        }`}
      >
        <ul className="flex w-full flex-col gap-[clamp(0.25rem,1dvh,0.5rem)] px-[clamp(1rem,5vw,2rem)] py-[clamp(1rem,3dvh,1.5rem)]">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block w-full rounded-xl px-[clamp(0.75rem,2.5vw,1rem)] py-[clamp(0.625rem,1.75dvh,0.875rem)] text-[clamp(1rem,2vw,1.125rem)] font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.98] active:opacity-80"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
