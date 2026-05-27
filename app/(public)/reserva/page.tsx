"use client";

import Link from "next/link";
import { useId, useMemo, useState, type FormEvent } from "react";

/* ────────────────────────── MOCKS ────────────────────────── */

type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
};

const SERVICES: readonly Service[] = [
  {
    id: "quiropodia",
    name: "Quiropodia",
    description: "Tratamiento integral de uñas, durezas y callosidades.",
    durationMinutes: 45,
    priceCents: 3500,
  },
  {
    id: "biomecanica",
    name: "Estudio Biomecánico",
    description: "Análisis de la pisada y plantillas personalizadas.",
    durationMinutes: 60,
    priceCents: 8000,
  },
  {
    id: "infantil",
    name: "Podología Infantil",
    description: "Prevención y corrección en pies en crecimiento.",
    durationMinutes: 40,
    priceCents: 4500,
  },
  {
    id: "cirugia",
    name: "Cirugía Ungueal",
    description: "Solución definitiva a uñas encarnadas.",
    durationMinutes: 60,
    priceCents: 18000,
  },
] as const;

const AVAILABLE_DAYS: readonly { value: string; label: string }[] = [
  { value: "2026-06-01", label: "Lun 1 Junio" },
  { value: "2026-06-02", label: "Mar 2 Junio" },
  { value: "2026-06-03", label: "Mié 3 Junio" },
  { value: "2026-06-04", label: "Jue 4 Junio" },
  { value: "2026-06-05", label: "Vie 5 Junio" },
] as const;

const AVAILABLE_SLOTS: readonly string[] = [
  "09:00",
  "10:00",
  "11:30",
  "13:00",
  "16:30",
  "18:00",
  "19:30",
] as const;

const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

/* ────────────────────────── ESTADO ────────────────────────── */

type FormState = {
  serviceId: string;
  day: string;
  slot: string;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
  acceptTerms: boolean;
};

const INITIAL_STATE: FormState = {
  serviceId: "",
  day: "",
  slot: "",
  fullName: "",
  phone: "",
  email: "",
  notes: "",
  acceptTerms: false,
};

/* ────────────────────────── PAGE ────────────────────────── */

export default function ReservaPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === form.serviceId),
    [form.serviceId],
  );

  const isValid =
    form.serviceId !== "" &&
    form.day !== "" &&
    form.slot !== "" &&
    form.fullName.trim().length >= 2 &&
    form.phone.trim().length >= 6 &&
    form.acceptTerms;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    // Simulación de petición a servidor (mock)
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setConfirmed(true);
  };

  const reset = () => {
    setForm(INITIAL_STATE);
    setConfirmed(false);
  };

  /* ───────────────────── SUCCESS STATE ───────────────────── */
  if (confirmed) {
    const dayLabel = AVAILABLE_DAYS.find((d) => d.value === form.day)?.label;
    return (
      <section
        aria-labelledby="success-title"
        className="mx-auto flex w-full max-w-[42rem] flex-col items-center gap-[clamp(1rem,3dvh,1.75rem)] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(3rem,8dvh,5rem)] text-center"
      >
        <span
          aria-hidden="true"
          className="flex h-[clamp(3.5rem,8vw,5rem)] w-[clamp(3.5rem,8vw,5rem)] items-center justify-center rounded-full bg-success/15 text-[clamp(1.75rem,4vw,2.5rem)] text-success"
        >
          ✓
        </span>
        <h1
          id="success-title"
          className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight hyphens-auto break-words"
        >
          ¡Cita confirmada!
        </h1>
        <p className="max-w-[40ch] text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
          Hemos registrado tu reserva de <strong>{selectedService?.name}</strong> para el{" "}
          <strong>{dayLabel}</strong> a las <strong>{form.slot}</strong>. Te enviaremos un recordatorio a tu teléfono.
        </p>
        <dl className="w-full rounded-2xl border border-border bg-card p-[clamp(1rem,3vw,1.5rem)] text-left text-[clamp(0.875rem,1.5vw,1rem)]">
          <div className="flex flex-wrap justify-between gap-[0.5rem] py-[0.375rem]">
            <dt className="text-muted-foreground">Paciente</dt>
            <dd className="font-medium break-words">{form.fullName}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-[0.5rem] py-[0.375rem]">
            <dt className="text-muted-foreground">Teléfono</dt>
            <dd className="font-medium">{form.phone}</dd>
          </div>
          {selectedService && (
            <div className="flex flex-wrap justify-between gap-[0.5rem] py-[0.375rem]">
              <dt className="text-muted-foreground">Importe</dt>
              <dd className="font-semibold text-primary">
                {priceFormatter.format(selectedService.priceCents / 100)}
              </dd>
            </div>
          )}
        </dl>
        <div className="flex w-full flex-wrap justify-center gap-[clamp(0.5rem,2vw,1rem)]">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.625rem,1.75dvh,0.875rem)] text-[clamp(0.875rem,1.5vw,1rem)] font-semibold transition-colors hover:bg-muted active:scale-[0.97] active:opacity-80"
          >
            Nueva reserva
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.625rem,1.75dvh,0.875rem)] text-[clamp(0.875rem,1.5vw,1rem)] font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg active:scale-[0.97] active:opacity-90"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  /* ───────────────────── FORM STATE ───────────────────── */
  return (
    <section
      aria-labelledby="reserva-title"
      className="mx-auto w-full max-w-[48rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(2rem,6dvh,4rem)]"
    >
      <header className="flex flex-col items-center gap-[clamp(0.5rem,1.5dvh,0.75rem)] text-center">
        <h1
          id="reserva-title"
          className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight hyphens-auto break-words"
        >
          Reserva tu cita
        </h1>
        <p className="max-w-[50ch] text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
          Elige servicio, fecha y completa tus datos. Solo te llevará un minuto.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-[clamp(2rem,5dvh,3rem)] flex flex-col gap-[clamp(1.5rem,4dvh,2.5rem)]"
      >
        {/* 1 · Servicio */}
        <FieldSet legend="1. Selecciona un servicio">
          <ul className="grid grid-cols-1 gap-[clamp(0.75rem,2vw,1rem)] sm:grid-cols-2">
            {SERVICES.map((service) => {
              const checked = form.serviceId === service.id;
              return (
                <li key={service.id}>
                  <label
                    className={`flex h-full cursor-pointer flex-col gap-[clamp(0.25rem,0.75dvh,0.5rem)] rounded-2xl border p-[clamp(1rem,2.5vw,1.25rem)] transition-all active:scale-[0.98] ${
                      checked
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={checked}
                      onChange={() => update("serviceId", service.id)}
                      className="sr-only"
                    />
                    <span className="flex flex-wrap items-baseline justify-between gap-[0.5rem]">
                      <span className="text-[clamp(1rem,1.7vw,1.125rem)] font-semibold break-words">
                        {service.name}
                      </span>
                      <span className="text-[clamp(0.875rem,1.5vw,1rem)] font-bold text-primary">
                        {priceFormatter.format(service.priceCents / 100)}
                      </span>
                    </span>
                    <span className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-relaxed text-muted-foreground break-words">
                      {service.description}
                    </span>
                    <span className="text-[clamp(0.75rem,1.3vw,0.8125rem)] text-muted-foreground">
                      Duración aprox. {service.durationMinutes} min
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </FieldSet>

        {/* 2 · Fecha y hora */}
        <FieldSet legend="2. Elige fecha y hora">
          <div className="grid grid-cols-1 gap-[clamp(1rem,2.5vw,1.5rem)] sm:grid-cols-2">
            <Field label="Día" htmlForId="day">
              <select
                id="day"
                required
                value={form.day}
                onChange={(e) => update("day", e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Selecciona un día…
                </option>
                {AVAILABLE_DAYS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Hora" htmlForId="slot">
              <select
                id="slot"
                required
                value={form.slot}
                onChange={(e) => update("slot", e.target.value)}
                disabled={form.day === ""}
                className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <option value="" disabled>
                  {form.day === "" ? "Elige día primero…" : "Selecciona hora…"}
                </option>
                {AVAILABLE_SLOTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </FieldSet>

        {/* 3 · Datos paciente */}
        <FieldSet legend="3. Tus datos">
          <div className="grid grid-cols-1 gap-[clamp(1rem,2.5vw,1.5rem)] sm:grid-cols-2">
            <Field label="Nombre completo" htmlForId="fullName">
              <input
                id="fullName"
                type="text"
                required
                autoComplete="name"
                minLength={2}
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={inputClass}
                placeholder="Ana García"
              />
            </Field>
            <Field label="Teléfono" htmlForId="phone">
              <input
                id="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
                placeholder="+34 600 000 000"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email (opcional)" htmlForId="email">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                  placeholder="ana@ejemplo.com"
                />
              </Field>
            </div>
          </div>
        </FieldSet>

        {/* 4 · Anamnesis */}
        <FieldSet legend="4. Anamnesis breve (opcional)">
          <Field
            label="Notas médicas, alergias o medicación relevante"
            htmlForId="notes"
            hint="Esta información ayuda al podólogo a preparar tu visita."
          >
            <textarea
              id="notes"
              rows={4}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className={`${inputClass} min-h-[6rem] resize-y`}
              placeholder="Ej: Diabetes tipo II, alergia al látex…"
            />
          </Field>
        </FieldSet>

        {/* 5 · Consentimiento */}
        <label className="flex items-start gap-[clamp(0.5rem,1.5vw,0.75rem)] rounded-xl bg-muted/40 p-[clamp(0.75rem,2vw,1rem)] cursor-pointer active:opacity-80">
          <input
            type="checkbox"
            required
            checked={form.acceptTerms}
            onChange={(e) => update("acceptTerms", e.target.checked)}
            className="mt-[0.25rem] h-[1rem] w-[1rem] accent-primary"
          />
          <span className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-relaxed text-muted-foreground break-words">
            Acepto la política de privacidad y el tratamiento de mis datos clínicos por la clínica.
          </span>
        </label>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-[clamp(1.5rem,3.5vw,2.25rem)] py-[clamp(0.875rem,2.25dvh,1.125rem)] text-[clamp(1rem,1.7vw,1.0625rem)] font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg active:scale-[0.97] active:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-md"
        >
          {submitting ? "Confirmando…" : "Confirmar reserva"}
        </button>
      </form>
    </section>
  );
}

/* ────────────────────────── PRIMITIVAS UI ────────────────────────── */

const inputClass =
  "w-full max-w-full rounded-xl border border-border bg-background px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.625rem,1.75dvh,0.75rem)] text-[clamp(1rem,1.6vw,1.0625rem)] leading-tight text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-[0.125rem] focus-visible:ring-primary/30";

function FieldSet({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-[clamp(0.75rem,2dvh,1rem)] rounded-2xl border border-border bg-card p-[clamp(1rem,3vw,1.75rem)]">
      <legend className="px-[0.5rem] text-[clamp(0.9375rem,1.6vw,1.0625rem)] font-semibold tracking-tight">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  htmlForId,
  hint,
  children,
}: {
  label: string;
  htmlForId: string;
  hint?: string;
  children: React.ReactNode;
}) {
  const hintId = useId();
  return (
    <div className="flex flex-col gap-[clamp(0.25rem,0.75dvh,0.375rem)]">
      <label
        htmlFor={htmlForId}
        className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] font-medium"
      >
        {label}
      </label>
      {children}
      {hint && (
        <p
          id={hintId}
          className="text-[clamp(0.75rem,1.3vw,0.8125rem)] text-muted-foreground break-words"
        >
          {hint}
        </p>
      )}
    </div>
  );
}
