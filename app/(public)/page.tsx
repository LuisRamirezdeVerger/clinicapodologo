import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/data/services";
import ReviewsCarousel from "@/components/ui/reviews-carousel";
import StructuredData from "@/components/seo/structured-data";

/* ─────────────────────────────────────────────
   DATOS DE PRESENTACIÓN (no replicados)
   ───────────────────────────────────────────── */

const SPECIALTIES = [
  "Pie plano",
  "Metatarsalgia",
  "Pie cavo",
  "Pie de atleta",
] as const;

/* ─────────────────────────────────────────────
   PAGE — Server Component puro
   ───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <StructuredData />

      {/* ─────── HERO ─────── */}
      <section
        aria-labelledby="hero-title"
        className="relative w-full overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5"
      >
        <div className="mx-auto flex w-full max-w-[80rem] flex-col items-center gap-[clamp(1.5rem,4dvh,2.5rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(3rem,10dvh,7rem)] text-center">
          <Image
            src="/logo.webp"
            alt="Logotipo Oficial Podología Balboa"
            priority
            width={300}
            height={300}
            className="h-[clamp(8rem,20vw,12rem)] w-auto object-contain drop-shadow-sm"
          />

          <h1
            id="hero-title"
            className="max-w-[40ch] text-[clamp(1.75rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-foreground hyphens-auto break-words"
          >
            Cuidamos tus pies para que avances sin límites
          </h1>

          <p className="max-w-[55ch] text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-muted-foreground break-words">
            Diagnóstico certero con análisis de la marcha informatizado y plataforma de presiones. Reserva tu cita online en menos de un minuto.
          </p>

          <Link
            href="/reserva"
            className="mx-auto inline-flex w-full max-w-[24rem] items-center justify-center rounded-full bg-primary px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(1rem,2.75dvh,1.5rem)] text-[clamp(1rem,1.8vw,1.25rem)] font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl active:scale-[0.97] active:opacity-90"
          >
            Reservar cita
          </Link>
        </div>
      </section>

      {/* ─────── SERVICIOS ─────── */}
      <section
        id="servicios"
        aria-labelledby="services-title"
        className="w-full scroll-mt-[5rem]"
      >
        <div className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(3rem,8dvh,6rem)]">
          <header className="mx-auto flex max-w-[50rem] flex-col items-center gap-[clamp(0.75rem,2dvh,1rem)] text-center">
            <h2
              id="services-title"
              className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight hyphens-auto break-words"
            >
              Nuestros servicios
            </h2>
            <p className="text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
              Precios transparentes. Sin sorpresas en consulta.
            </p>
          </header>

          <ul className="mt-[clamp(2rem,5dvh,3.5rem)] grid grid-cols-1 gap-[clamp(0.75rem,2vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <article className="flex h-full flex-col gap-[clamp(0.5rem,1.25dvh,0.75rem)] rounded-2xl border border-border bg-card p-[clamp(1.25rem,3vw,1.75rem)] transition-all hover:-translate-y-[0.25rem] hover:shadow-lg active:scale-[0.98]">
                  <h3 className="text-[clamp(1rem,1.8vw,1.25rem)] font-semibold tracking-tight break-words">
                    {service.name}
                  </h3>
                  <p className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-relaxed text-muted-foreground break-words">
                    {service.description}
                  </p>
                  <p
                    aria-label={`Precio: ${service.price}`}
                    className="mt-auto pt-[clamp(0.5rem,1.5dvh,0.75rem)] text-[clamp(1.125rem,2vw,1.375rem)] font-bold text-primary"
                  >
                    {service.price}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────── SOBRE MÍ / LA CLÍNICA ─────── */}
      <section
        id="equipo"
        aria-labelledby="about-title"
        className="w-full scroll-mt-[5rem] bg-muted/30"
      >
        <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 items-start gap-[clamp(2rem,5vw,4rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(3rem,8dvh,6rem)] lg:grid-cols-2">
          <article className="flex flex-col gap-[clamp(1rem,2.5dvh,1.5rem)]">
            <header className="flex flex-col gap-[clamp(0.5rem,1.5dvh,0.75rem)]">
              <span className="text-[clamp(0.75rem,1.3vw,0.875rem)] font-semibold uppercase tracking-wider text-primary">
                Sobre la clínica
              </span>
              <h2
                id="about-title"
                className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight hyphens-auto break-words"
              >
                Diagnóstico certero, trato cercano
              </h2>
            </header>
            <p className="text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
              Desde 2016 trabajando como podólogo deportivo y general. Gracias a la experiencia clínica y al análisis de la marcha informatizado con plataforma de presiones, llegamos a un diagnóstico certero.
            </p>
            <p className="text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
              Lo principal para nosotros es el trato al paciente y la salud de su pie y postura.
            </p>
          </article>

          <aside
            aria-labelledby="specialties-title"
            className="rounded-2xl border border-border bg-card p-[clamp(1.25rem,3vw,2rem)]"
          >
            <h3
              id="specialties-title"
              className="text-[clamp(1rem,1.8vw,1.25rem)] font-semibold"
            >
              Especialidades clínicas
            </h3>
            <ul className="mt-[clamp(0.75rem,2dvh,1rem)] flex flex-wrap gap-[clamp(0.375rem,1vw,0.625rem)]">
              {SPECIALTIES.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center rounded-full bg-primary/10 px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1dvh,0.5rem)] text-[clamp(0.8125rem,1.4vw,0.9375rem)] font-medium text-primary"
                >
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ─────── SOBRE MÍ (Ángel) ─────── */}
      <section
        id="sobre-mi"
        aria-labelledby="about-me-title"
        className="w-full scroll-mt-[5rem]"
      >
        <div className="mx-auto flex w-full max-w-[72rem] flex-col gap-[clamp(1.5rem,4dvh,2.5rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(3rem,8dvh,6rem)]">
          <header className="flex flex-col gap-[clamp(0.5rem,1.5dvh,0.75rem)] text-center">
            <span className="text-[clamp(0.75rem,1.3vw,0.875rem)] font-semibold uppercase tracking-wider text-primary">
              Conoce a tu podólogo
            </span>
            <h2
              id="about-me-title"
              className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight hyphens-auto break-words"
            >
              Sobre mí
            </h2>
          </header>

          <div className="grid grid-cols-1 items-center gap-[clamp(2rem,5vw,4rem)] md:grid-cols-2">
            {/* Columna izquierda · Foto */}
            <figure className="mx-auto w-full max-w-[min(100%,25rem)]">
              <Image
                src="/perfil.webp"
                alt="Ángel Balboa - Gerente de Podología Balboa"
                width={500}
                height={500}
                className="aspect-square h-auto w-full rounded-2xl object-cover shadow-md"
              />
            </figure>

            {/* Columna derecha · Texto biográfico */}
            <article className="flex flex-col gap-[clamp(0.875rem,2dvh,1.25rem)]">
              <p className="text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-foreground break-words">
                Mi nombre es Ángel, la dedicación a la salud siempre ha sido mi vocación, ha sido a raíz de la podología cuando he podido realizarme y ayudar a la gente en problemas mas concretos.
              </p>
              <p className="text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
                ¿Qué puedo hacer por usted? Ofrecerle los tratamientos propios de la podología, aplicando un amplio conocimiento en las ramas de la anatomía humana, fisiología, patofisiología, biomecánica del miembro inferior, radiología, farmacología, medicina general y cirugía.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─────── TESTIMONIOS (carrusel) ─────── */}
      <section
        id="testimonios"
        aria-labelledby="testimonials-title"
        className="w-full scroll-mt-[5rem] bg-muted/30"
      >
        <div className="mx-auto w-full max-w-[80rem] py-[clamp(3rem,8dvh,6rem)]">
          <header className="mx-auto flex max-w-[50rem] flex-col items-center gap-[clamp(0.75rem,2dvh,1rem)] px-[clamp(1rem,5vw,2.5rem)] text-center">
            <span className="text-[clamp(0.75rem,1.3vw,0.875rem)] font-semibold uppercase tracking-wider text-primary">
              Reseñas verificadas
            </span>
            <h2
              id="testimonials-title"
              className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight hyphens-auto break-words"
            >
              Lo que dicen nuestros pacientes
            </h2>
          </header>

          <div className="mt-[clamp(1.5rem,4dvh,2.5rem)]">
            <ReviewsCarousel />
          </div>
        </div>
      </section>

      {/* ─────── CTA FINAL ─────── */}
      <section
        id="contacto"
        aria-labelledby="cta-title"
        className="w-full scroll-mt-[5rem]"
      >
        <div className="mx-auto w-full max-w-[80rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(3rem,8dvh,6rem)]">
          <article className="flex flex-col items-center gap-[clamp(1rem,3dvh,1.75rem)] rounded-3xl bg-primary/5 px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2.5rem,6dvh,4.5rem)] text-center">
            <h2
              id="cta-title"
              className="max-w-[35ch] text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight hyphens-auto break-words"
            >
              ¿Listo para dar el primer paso?
            </h2>
            <p className="max-w-[50ch] text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
              Reserva tu cita online y completa tu anamnesis previa para optimizar el tiempo en consulta.
            </p>
            <Link
              href="/reserva"
              className="inline-flex items-center justify-center rounded-full bg-primary px-[clamp(1.5rem,3.5vw,2.25rem)] py-[clamp(0.75rem,2dvh,1.125rem)] text-[clamp(0.9375rem,1.6vw,1.0625rem)] font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg active:scale-[0.97] active:opacity-90"
            >
              Reservar ahora
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
