import { mockCitas, mockMetricas, type Appointment } from "@/lib/mock-data";

const STATUS_LABEL: Record<Appointment["status"], string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

const STATUS_STYLE: Record<Appointment["status"], string> = {
  pending: "bg-accent/30 text-accent-foreground",
  confirmed: "bg-primary/15 text-primary",
  completed: "bg-success/15 text-success",
  cancelled: "bg-destructive/15 text-destructive",
};

const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export default function DashboardPage() {
  const today = "2026-05-27";
  const todaysAppointments = mockCitas.filter((c) => c.date === today);

  return (
    <div className="flex w-full max-w-[100vw] flex-col gap-[clamp(1.5rem,4dvh,2.5rem)] overflow-x-hidden">
      {/* ───────── ENCABEZADO ───────── */}
      <header className="flex flex-col gap-[clamp(0.25rem,1dvh,0.5rem)]">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight">
          Resumen de hoy
        </h2>
        <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-muted-foreground">
          Estado general de la clínica al {today}.
        </p>
      </header>

      {/* ───────── MÉTRICAS ───────── */}
      <section
        aria-labelledby="metrics-title"
        className="flex flex-col gap-[clamp(0.75rem,2dvh,1rem)]"
      >
        <h3 id="metrics-title" className="sr-only">
          Métricas clave
        </h3>
        <ul className="grid grid-cols-1 gap-[clamp(0.75rem,2vw,1rem)] sm:grid-cols-2 xl:grid-cols-4">
          {mockMetricas.map((m) => (
            <li
              key={m.id}
              className="flex flex-col gap-[clamp(0.25rem,0.75dvh,0.5rem)] rounded-2xl border border-border bg-card p-[clamp(1rem,2.5vw,1.5rem)]"
            >
              <span className="text-[clamp(0.75rem,1.2vw,0.875rem)] font-medium uppercase tracking-wider text-muted-foreground">
                {m.label}
              </span>
              <span className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight">
                {m.value}
              </span>
              <span
                className={`text-[clamp(0.75rem,1.3vw,0.875rem)] font-medium ${
                  m.trend === "up"
                    ? "text-success"
                    : m.trend === "down"
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {m.delta}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── CITAS DE HOY ───────── */}
      <section
        aria-labelledby="today-title"
        className="flex flex-col gap-[clamp(0.75rem,2dvh,1rem)]"
      >
        <h3
          id="today-title"
          className="text-[clamp(1.125rem,2vw,1.375rem)] font-semibold"
        >
          Citas de hoy
        </h3>

        {/* MOBILE: tarjetas (cada cita es un <article>) */}
        <ul className="grid grid-cols-1 gap-[clamp(0.625rem,1.5dvh,0.875rem)] md:hidden">
          {todaysAppointments.map((c) => (
            <li key={c.id}>
              <article className="flex flex-col gap-[clamp(0.375rem,1dvh,0.5rem)] rounded-2xl border border-border bg-card p-[clamp(1rem,3vw,1.25rem)]">
                <div className="flex flex-wrap items-center justify-between gap-[0.5rem]">
                  <span className="text-[clamp(0.9375rem,2vw,1.0625rem)] font-semibold break-words">
                    {c.patientName}
                  </span>
                  <span
                    className={`rounded-full px-[0.625rem] py-[0.1875rem] text-[clamp(0.6875rem,1.2vw,0.75rem)] font-medium ${STATUS_STYLE[c.status]}`}
                  >
                    {STATUS_LABEL[c.status]}
                  </span>
                </div>
                <dl className="grid grid-cols-2 gap-[0.5rem] text-[clamp(0.8125rem,1.4vw,0.875rem)]">
                  <div>
                    <dt className="text-muted-foreground">Servicio</dt>
                    <dd className="font-medium break-words">{c.service}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Hora</dt>
                    <dd className="font-medium">{c.time}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-muted-foreground">Importe</dt>
                    <dd className="font-semibold text-primary">
                      {priceFormatter.format(c.priceCents / 100)}
                    </dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ul>

        {/* DESKTOP: tabla real con scroll horizontal defensivo */}
        <div className="hidden w-full max-w-full overflow-x-auto rounded-2xl border border-border bg-card md:block">
          <table className="w-full min-w-[40rem] border-collapse text-left text-[clamp(0.8125rem,1.2vw,0.9375rem)]">
            <thead className="border-b border-border bg-muted/40 text-[clamp(0.75rem,1.1vw,0.8125rem)] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th scope="col" className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)] font-semibold">Hora</th>
                <th scope="col" className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)] font-semibold">Paciente</th>
                <th scope="col" className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)] font-semibold">Servicio</th>
                <th scope="col" className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)] font-semibold">Estado</th>
                <th scope="col" className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)] text-right font-semibold">Importe</th>
              </tr>
            </thead>
            <tbody>
              {todaysAppointments.map((c) => (
                <tr key={c.id} className="border-b border-border/60 last:border-b-0 transition-colors hover:bg-muted/30">
                  <td className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)] font-medium">{c.time}</td>
                  <td className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)]">{c.patientName}</td>
                  <td className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)] text-muted-foreground">{c.service}</td>
                  <td className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)]">
                    <span className={`inline-flex rounded-full px-[0.625rem] py-[0.1875rem] text-[clamp(0.6875rem,1vw,0.75rem)] font-medium ${STATUS_STYLE[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                  <td className="px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.625rem,1.5dvh,0.875rem)] text-right font-semibold text-primary">
                    {priceFormatter.format(c.priceCents / 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
