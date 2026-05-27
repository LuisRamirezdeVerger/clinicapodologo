"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const MOCK_USER = "angel";
const MOCK_PASS = "1234";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400)); // pseudo-latencia
    if (username.trim() === MOCK_USER && password === MOCK_PASS) {
      router.push("/dashboard");
      return;
    }
    setSubmitting(false);
    setError("Credenciales incorrectas. Inténtalo de nuevo.");
  };

  return (
    <section
      aria-labelledby="login-title"
      className="mx-auto flex min-h-[70dvh] w-full max-w-[26rem] flex-col justify-center px-[clamp(1rem,4vw,1.5rem)] py-[clamp(2rem,6dvh,4rem)]"
    >
      <header className="flex flex-col items-center gap-[clamp(0.5rem,1.5dvh,0.75rem)] text-center">
        <span
          aria-hidden="true"
          className="flex h-[clamp(3rem,7vw,4rem)] w-[clamp(3rem,7vw,4rem)] items-center justify-center rounded-2xl bg-primary text-[clamp(1rem,2vw,1.25rem)] font-bold text-primary-foreground"
        >
          CP
        </span>
        <h1
          id="login-title"
          className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-tight"
        >
          Acceso al panel
        </h1>
        <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-muted-foreground">
          Introduce tus credenciales de administrador.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-[clamp(1.5rem,4dvh,2.25rem)] flex flex-col gap-[clamp(0.875rem,2.5dvh,1.25rem)] rounded-2xl border border-border bg-card p-[clamp(1.25rem,3.5vw,2rem)] shadow-sm"
      >
        <div className="flex flex-col gap-[0.375rem]">
          <label
            htmlFor="username"
            className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] font-medium"
          >
            Usuario
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.625rem,1.75dvh,0.75rem)] text-[clamp(1rem,1.6vw,1.0625rem)] outline-none transition-all focus-visible:border-primary focus-visible:ring-[0.125rem] focus-visible:ring-primary/30"
          />
        </div>

        <div className="flex flex-col gap-[0.375rem]">
          <label
            htmlFor="password"
            className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] font-medium"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.625rem,1.75dvh,0.75rem)] text-[clamp(1rem,1.6vw,1.0625rem)] outline-none transition-all focus-visible:border-primary focus-visible:ring-[0.125rem] focus-visible:ring-primary/30"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-destructive/40 bg-destructive/10 px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5dvh,0.75rem)] text-[clamp(0.8125rem,1.4vw,0.9375rem)] text-destructive"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-[0.25rem] inline-flex w-full items-center justify-center rounded-full bg-primary px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.75rem,2dvh,1rem)] text-[clamp(0.9375rem,1.6vw,1rem)] font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg active:scale-[0.97] active:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Verificando…" : "Acceder"}
        </button>

        <p className="text-center text-[clamp(0.75rem,1.3vw,0.8125rem)] text-muted-foreground">
          Pista mock: <code>angel</code> / <code>1234</code>
        </p>
      </form>
    </section>
  );
}
