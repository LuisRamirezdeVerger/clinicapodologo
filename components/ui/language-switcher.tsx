"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const LOCALES = ["es", "en"] as const;
type Locale = (typeof LOCALES)[number];

export default function LanguageSwitcher({
  ariaLabel,
}: {
  ariaLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Detecta el locale actual del primer segmento; fallback "es".
  const current: Locale =
    (LOCALES.find((l) => pathname?.startsWith(`/${l}`)) as Locale) ?? "es";

  const swap = (next: Locale) => {
    if (next === current || pending) return;
    const rest = pathname?.replace(/^\/(es|en)/, "") ?? "";
    const target = `/${next}${rest || ""}`;
    startTransition(() => router.push(target));
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center rounded-full border border-border bg-background p-[0.1875rem] text-[clamp(0.75rem,1.3vw,0.8125rem)] font-semibold"
    >
      {LOCALES.map((l) => {
        const active = l === current;
        return (
          <button
            key={l}
            type="button"
            onClick={() => swap(l)}
            aria-pressed={active}
            disabled={pending}
            className={`rounded-full px-[clamp(0.5rem,1.5vw,0.75rem)] py-[0.1875rem] uppercase tracking-wider transition-all active:scale-[0.95] disabled:opacity-60 ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
