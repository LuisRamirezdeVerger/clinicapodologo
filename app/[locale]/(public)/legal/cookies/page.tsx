import { SITE } from "@/lib/site";

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  return (
    <article className="mx-auto w-full max-w-[48rem] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(2.5rem,6dvh,4rem)] space-y-[clamp(1rem,3dvh,1.5rem)]">
      <header className="space-y-[clamp(0.5rem,1.5dvh,0.75rem)]">
        <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight hyphens-auto break-words">
          {isEn ? "Cookie policy" : "Política de cookies"}
        </h1>
        <p className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] text-muted-foreground">
          {isEn ? "Last updated" : "Última actualización"}:{" "}
          {new Date().toLocaleDateString(isEn ? "en-GB" : "es-ES")}
        </p>
      </header>

      <Section n={1} title={isEn ? "What are cookies?" : "¿Qué son las cookies?"}>
        <p>
          {isEn
            ? "Cookies are small text files that websites store on the user's device when browsing. They allow basic functionality, remember preferences and analyse navigation patterns."
            : "Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario al navegar. Permiten funcionalidad básica, recordar preferencias y analizar patrones de navegación."}
        </p>
      </Section>

      <Section
        n={2}
        title={isEn ? "Cookies we use" : "Cookies que utilizamos"}
      >
        <p>
          {isEn
            ? "On this site we use the following categories:"
            : "En este sitio utilizamos las siguientes categorías:"}
        </p>
        <ul className="list-disc pl-[1.25rem] space-y-[clamp(0.375rem,1dvh,0.5rem)]">
          <li>
            <strong>{isEn ? "Strictly necessary" : "Estrictamente necesarias"}</strong>:{" "}
            {isEn
              ? "essential for the site to function (e.g. consent storage)."
              : "esenciales para el funcionamiento del sitio (p. ej. almacenamiento del consentimiento)."}
          </li>
          <li>
            <strong>{isEn ? "Analytics" : "Analíticas"}</strong>:{" "}
            {isEn
              ? "anonymous statistics on usage of the site (Vercel Analytics)."
              : "estadísticas anónimas sobre el uso del sitio (Vercel Analytics)."}
          </li>
          <li>
            <strong>{isEn ? "Third-party" : "De terceros"}</strong>:{" "}
            {isEn
              ? "fonts and assets served by Google Fonts and Vercel."
              : "tipografías y recursos servidos por Google Fonts y Vercel."}
          </li>
        </ul>
      </Section>

      <Section
        n={3}
        title={isEn ? "Cookie management" : "Gestión de las cookies"}
      >
        <p>
          {isEn
            ? "When you enter the site for the first time we show you a banner allowing you to accept or learn more. You may revoke consent at any time by deleting the data stored in your browser."
            : "Al entrar al sitio por primera vez te mostramos un banner que te permite aceptar o consultar más información. Puedes revocar tu consentimiento en cualquier momento eliminando los datos almacenados en tu navegador."}
        </p>
        <p>
          {isEn
            ? "Most modern browsers allow you to manage cookies from their settings. Lorem ipsum dolor sit amet."
            : "La mayoría de navegadores modernos permiten gestionar las cookies desde sus ajustes. Lorem ipsum dolor sit amet."}
        </p>
      </Section>

      <Section
        n={4}
        title={isEn ? "Contact" : "Contacto"}
      >
        <p>
          {isEn
            ? "If you have any questions regarding this policy, please write to"
            : "Para cualquier consulta sobre esta política, escribe a"}{" "}
          <a href={`mailto:${SITE.email}`} className="text-primary underline">
            {SITE.email}
          </a>
          .
        </p>
      </Section>
    </article>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-[clamp(0.5rem,1.5dvh,0.75rem)]">
      <h2 className="text-[clamp(1.125rem,2vw,1.375rem)] font-semibold tracking-tight">
        {n}. {title}
      </h2>
      <div className="space-y-[clamp(0.5rem,1.5dvh,0.75rem)] text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
