"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_REM = 18.75; // ~300px equivalentes en rem

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 1rem en px reales del documento (respeta zoom del usuario).
    const remInPx = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const thresholdPx = SCROLL_THRESHOLD_REM * remInPx;

    const onScroll = () => setVisible(window.scrollY > thresholdPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={handleClick}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[clamp(1rem,3dvh,2rem)] right-[clamp(1rem,3vw,2rem)] z-40 inline-flex h-[clamp(2.75rem,7vw,3.5rem)] w-[clamp(2.75rem,7vw,3.5rem)] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.92] active:opacity-90 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[1rem] opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-[clamp(1.125rem,2vw,1.375rem)] w-[clamp(1.125rem,2vw,1.375rem)]"
      >
        <polyline points="6 14 12 8 18 14" />
      </svg>
    </button>
  );
}
