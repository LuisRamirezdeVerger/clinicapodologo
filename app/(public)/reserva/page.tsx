"use client";

import Link from "next/link";
import { useId, useMemo, useState, type FormEvent } from "react";
import { SERVICES } from "@/lib/data/services";

/* ────────────────────────── ESTADO ────────────────────────── */

type FormState = {
  serviceId: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  acceptTerms: boolean;
};

const INITIAL_STATE: FormState = {
  serviceId: "",
  fullName: "",
  email: "",
  phone: "",
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
    form.fullName.trim().length >= 2 &&
    form.phone.trim().length >= 6 &&
    form.email.trim().length >= 5 &&
    form.acceptTerms;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setConfirmed(true);
  };

  const reset = () => {
    setForm(INITIAL_STATE);
    setConfirmed(false);
  };

  /* ───────────────────── SUCCESS STATE ───────────────────── */
  if (confirmed) {
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
          ¡Solicitud recibida!
        </h1>
        <p className="max-w-[42ch] text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
          Hemos recibido tu solicitud para{" "}
          <strong>{selectedService?.name}</strong>. En breve te contactaremos por teléfono o email para acordar día y hora.
        </p>
        <dl className="w-full rounded-2xl border border-border bg-card p-[clamp(1rem,3vw,1.5rem)] text-left text-[clamp(0.875rem,1.5vw,1rem)]">
          <Row term="Paciente" value={form.fullName} />
          <Row term="Teléfono" value={form.phone} />
          <Row term="Email" value={form.email} />
          {selectedService && (
            <Row term="Importe estimado" value={selectedService.price} accent />
          )}
        </dl>
        <div className="flex w-full flex-wrap justify-center gap-[clamp(0.5rem,2vw,1rem)]">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.625rem,1.75dvh,0.875rem)] text-[clamp(0.875rem,1.5vw,1rem)] font-semibold transition-colors hover:bg-muted active:scale-[0.97] active:opacity-80"
          >
            Nueva solicitud
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
          Solicita tu cita
        </h1>
        <p className="max-w-[50ch] text-[clamp(0.9375rem,1.7vw,1.125rem)] leading-relaxed text-muted-foreground break-words">
          Elige servicio y déjanos tus datos. Te contactaremos para acordar día y hora.
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
                    className={`flex h-full cursor-pointer flex-col gap-[clamp(0.375rem,1dvh,0.5rem)] rounded-2xl border p-[clamp(1rem,2.5vw,1.25rem)] transition-all active:scale-[0.98] ${
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
                    <span className="block text-[clamp(1rem,1.7vw,1.125rem)] font-semibold break-words">
                      {service.name}
                    </span>
                    <span className="block text-[clamp(0.9375rem,1.6vw,1.0625rem)] font-bold text-primary">
                      {service.price}
                    </span>
                    <span className="block text-[clamp(0.8125rem,1.4vw,0.9375rem)] leading-relaxed text-muted-foreground break-words">
                      {service.description}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </FieldSet>

        {/* 2 · Datos paciente */}
        <FieldSet legend="2. Tus datos">
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
            <Field label="Email" htmlForId="email">
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
                placeholder="ana@ejemplo.com"
              />
            </Field>
            <div className="sm:col-span-2">
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
            </div>
          </div>
        </FieldSet>

        {/* 3 · Notas */}
        <FieldSet legend="3. Notas (opcional)">
          <Field
            label="Motivo de consulta, alergias o medicación relevante"
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

        {/* 4 · Consentimiento */}
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
          {submitting ? "Enviando…" : "Solicitar cita"}
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

function Row({
  term,
  value,
  accent,
}: {
  term: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-between gap-[0.5rem] py-[0.375rem]">
      <dt className="text-muted-foreground">{term}</dt>
      <dd
        className={`break-words ${accent ? "font-semibold text-primary" : "font-medium"}`}
      >
        {value}
      </dd>
    </div>
  );
}
