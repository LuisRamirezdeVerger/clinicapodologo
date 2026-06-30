"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookieConsent";

export default function CookieBanner({
  locale,
  message,
  accept,
  reject,
  learnMore,
}: {
  locale: string;
  message: string;
  accept: string;
  reject: string;
  learnMore: string;
}) {
  // `null` durante SSR/hidratación inicial → no parpadea ni causa mismatch.
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // Cualquier valor guardado (accepted/rejected) significa decisión tomada.
      setVisible(stored === null);
    } catch {
      // localStorage bloqueado (modo privado estricto, iframes) → mostrar banner.
      setVisible(true);
    }
  }, []);

  const persist = (value: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* swallow */
    }
    setVisible(false);
  };

  const acceptAll = () => persist("accepted");
  const rejectAll = () => persist("rejected");

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] w-full max-w-[100vw] overflow-x-hidden border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-0.25rem_1rem_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex w-full max-w-[80rem] flex-col items-stretch gap-[clamp(0.75rem,2dvh,1.25rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(0.875rem,2.25dvh,1.25rem)] md:flex-row md:items-center md:justify-between">
        <p className="flex-1 text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-relaxed text-muted-foreground break-words">
          {message}
        </p>
        <div className="flex flex-wrap items-center justify-end gap-[clamp(0.5rem,1.5vw,0.75rem)]">
          <Link
            href={`/${locale}/legal/cookies`}
            className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] font-medium text-foreground underline-offset-[0.25rem] transition-all hover:underline active:scale-[0.97] active:opacity-70"
          >
            {learnMore}
          </Link>
          <button
            type="button"
            onClick={rejectAll}
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-[clamp(1.25rem,3vw,1.75rem)] py-[clamp(0.5rem,1.5dvh,0.75rem)] text-[clamp(0.8125rem,1.5vw,0.9375rem)] font-semibold text-foreground transition-colors hover:bg-muted active:scale-[0.95] active:opacity-80"
          >
            {reject}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex items-center justify-center rounded-full bg-primary px-[clamp(1.25rem,3vw,1.75rem)] py-[clamp(0.5rem,1.5dvh,0.75rem)] text-[clamp(0.8125rem,1.5vw,0.9375rem)] font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.95] active:opacity-90"
          >
            {accept}
          </button>
        </div>
      </div>
    </div>
  );
}
