"use client";

import { useEffect, useRef, useState } from "react";

type Review = {
  id: string;
  quote: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

const REVIEWS: readonly Review[] = [
  {
    id: "r1",
    quote:
      "Un profesional excelente y un trato muy agradable. En todas las consultas he quedado muy satisfecha.",
    author: "Paciente verificada · Doctoralia",
    rating: 5,
  },
  {
    id: "r2",
    quote:
      "Es un gran profesional que realiza con esmero su trabajo… un trato muy cordial.",
    author: "Paciente verificado · Doctoralia",
    rating: 5,
  },
  {
    id: "r3",
    quote:
      "Iba con miedo de que me doliera, pero fue muy cuidadoso, enseguida se me pasó el miedo.",
    author: "Paciente verificada · Doctoralia",
    rating: 5,
  },
  {
    id: "r4",
    quote:
      "Persona encantadora, puntual, resolutivo y con todas las cualidades de un excelente profesional.",
    author: "Paciente verificado · Doctoralia",
    rating: 5,
  },
  {
    id: "r5",
    quote:
      "El estudio de la pisada me explicó por fin de dónde venían mis dolores de rodilla. Las plantillas han sido un cambio total.",
    author: "Marina · Google Reviews",
    rating: 5,
  },
  {
    id: "r6",
    quote:
      "Tras meses corriendo con molestias, las plantillas personalizadas me devolvieron al asfalto sin dolor. Muy recomendable.",
    author: "Rubén · Google Reviews",
    rating: 5,
  },
] as const;

export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden">
      <ul
        ref={trackRef}
        aria-label="Reseñas de pacientes"
        className="flex w-full snap-x snap-mandatory gap-[clamp(0.75rem,2vw,1.25rem)] overflow-x-auto scroll-smooth px-[clamp(1rem,5vw,2.5rem)] py-[clamp(0.5rem,1.5dvh,1rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {REVIEWS.map((r) => (
          <li
            key={r.id}
            className="snap-start shrink-0 basis-[min(85vw,22rem)]"
          >
            <figure className="flex h-full flex-col gap-[clamp(0.625rem,1.5dvh,0.875rem)] rounded-2xl border border-border bg-card p-[clamp(1.25rem,3vw,1.75rem)] shadow-sm">
              <Stars rating={r.rating} />
              <blockquote className="text-[clamp(0.9375rem,1.6vw,1.0625rem)] leading-relaxed text-foreground break-words">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-auto text-[clamp(0.75rem,1.3vw,0.875rem)] text-muted-foreground">
                {r.author}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* Controles desktop (móvil hace swipe nativo) */}
      <div className="mt-[clamp(0.75rem,2dvh,1rem)] hidden justify-center gap-[0.75rem] md:flex">
        <CarouselButton
          direction="prev"
          disabled={!canPrev}
          onClick={() => scrollBy(-1)}
        />
        <CarouselButton
          direction="next"
          disabled={!canNext}
          onClick={() => scrollBy(1)}
        />
      </div>
    </div>
  );
}

/* ──────── PRIMITIVAS ──────── */

function Stars({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`Valoración ${rating} de 5`}
      className="flex gap-[0.125rem] text-[clamp(0.875rem,1.5vw,1rem)] text-accent"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Reseña anterior" : "Reseña siguiente"}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-[clamp(2.5rem,5vw,3rem)] w-[clamp(2.5rem,5vw,3rem)] items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.92] active:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-[1.125rem] w-[1.125rem]"
        style={{
          transform: direction === "prev" ? "rotate(180deg)" : undefined,
        }}
      >
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </button>
  );
}
