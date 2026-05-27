import Link from "next/link";

/**
 * Datos estáticos provisionales.
 * Se sustituirán por consulta a Drizzle (`getActiveServices()`) cuando la
 * base de datos esté configurada — tarea pospuesta a propósito en este turno.
 */
const SERVICES = [
  {
    id: "quiropodia",
    name: "Quiropodia",
    description: "Tratamiento integral de uñas, durezas y callosidades.",
    priceCents: 3500,
  },
  {
    id: "biomecanica",
    name: "Estudio Biomecánico",
    description: "Análisis de la pisada y diseño de plantillas personalizadas.",
    priceCents: 8000,
  },
  {
    id: "infantil",
    name: "Podología Infantil",
    description: "Prevención y corrección de patologías en crecimiento.",
    priceCents: 4500,
  },
  {
    id: "cirugia",
    name: "Cirugía Ungueal",
    description: "Solución definitiva a uñas encarnadas con técnica mínima.",
    priceCents: 18000,
  },
] as const;

const VALUES = [
  {
    title: "Tecnología avanzada",
    description: "Equipamiento de última generación para diagnósticos precisos.",
  },
  {
    title: "Trato cercano",
    description: "Acompañamos cada paso de tu tratamiento personalmente.",
  },
  {
    title: "Resultados duraderos",
    description: "Enfoque preventivo orientado a la salud a largo plazo.",
  },
] as const;

const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export default function HomePage() {
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative w-full overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5"
      >
        <div className="mx-auto flex w-full max-w-[80rem] flex-col items-center gap-[clamp(1.5rem,4dvh,2.5rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(3rem,10dvh,7rem)] text-center">
          <span className="inline-flex rounded-full border border-border bg-background/60 px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.25rem,0.75dvh,0.375rem)] text-[clamp(0.75rem,1.3vw,0.875rem)] font-medium text-muted-foreground backdrop-blur">
            Clínica de Podología
          </span>

          <h1
            id="hero-title"
            className="max-w-[40ch] text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight hyphens-auto break-words"
          >
            Cuidamos tus pies para que avances sin límites
          </h1>

          <p className="max-w-[55ch] text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-muted-foreground break-words">
            Tratamientos personalizados con tecnología de última generación. Reserva tu cita online en menos de un minuto.
          </p>

          <div className="flex w-full flex-wrap items-center justify-center gap-[clamp(0.75rem,2vw,1rem)]">
            <Link
              href="/reserva"
              className="inline-flex items-center justify-center rounded-full bg-primary px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.75rem,2dvh,1rem)] text-[clamp(0.875rem,1.6vw,1rem)] font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg active:scale-[0.97] active:opacity-90"
            >
              Reservar cita
            </Link>
            <Link
              href="#servicios"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.75rem,2dvh,1rem)] text-[clamp(0.875rem,1.6vw,1rem)] font-semibold transition-colors hover:bg-muted active:scale-[0.97] active:opacity-80"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

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
              Soluciones especializadas para cada tipo de patología podológica.
            </p>
          </header>

          <ul className="mt-[clamp(2rem,5dvh,3.5rem)] grid grid-cols-1 gap-[clamp(1rem,2.5vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <article className="group flex h-full flex-col gap-[clamp(0.5rem,1.5dvh,0.75rem)] rounded-2xl border border-border bg-card p-[clamp(1.25rem,3vw,1.75rem)] transition-all hover:-translate-y-[0.25rem] hover:shadow-lg active:scale-[0.98] active:opacity-90">
                  <h3 className="text-[clamp(1.125rem,2vw,1.375rem)] font-semibold tracking-tight break-words">
                    {service.name}
                  </h3>
                  <p className="text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed text-muted-foreground break-words">
                    {service.description}
                  </p>
                  <p className="mt-auto pt-[clamp(0.5rem,1.5dvh,0.75rem)] text-[clamp(1rem,1.8vw,1.25rem)] font-bold text-primary">
                    {priceFormatter.format(service.priceCents / 100)}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="equipo"
        aria-labelledby="about-title"
        className="w-full scroll-mt-[5rem] bg-muted/30"
      >
        <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 items-center gap-[clamp(2rem,5vw,4rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(3rem,8dvh,6rem)] lg:grid-cols-2">
          <div className="flex flex-col gap-[clamp(1rem,2.5dvh,1.5rem)]">
            <h2
              id="about-title"
              className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight hyphens-auto break-words"
            >
              Una clínica pensada para ti
            </h2>
            <p className="text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
              Combinamos experiencia clínica y tecnología para ofrecerte un tratamiento eficaz, cómodo y adaptado a tus necesidades reales.
            </p>
          </div>

          <ul className="flex flex-col gap-[clamp(1rem,2dvh,1.25rem)]">
            {VALUES.map((value) => (
              <li
                key={value.title}
                className="rounded-xl border border-border bg-background p-[clamp(1rem,2.5vw,1.5rem)]"
              >
                <article className="flex flex-col gap-[clamp(0.25rem,1dvh,0.5rem)]">
                  <h3 className="text-[clamp(1rem,1.8vw,1.25rem)] font-semibold break-words">
                    {value.title}
                  </h3>
                  <p className="text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed text-muted-foreground break-words">
                    {value.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
