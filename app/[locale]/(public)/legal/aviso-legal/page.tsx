import { SITE } from "@/lib/site";

export default async function LegalNoticePage({
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
          {isEn ? "Legal notice" : "Aviso legal"}
        </h1>
        <p className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] text-muted-foreground">
          {isEn ? "Last updated" : "Última actualización"}:{" "}
          {new Date().toLocaleDateString(isEn ? "en-GB" : "es-ES")}
        </p>
      </header>

      <Section
        n={1}
        title={isEn ? "Site ownership" : "Titularidad del sitio web"}
      >
        <p>
          {isEn
            ? "In compliance with Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the following ownership details are disclosed:"
            : "En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa de los siguientes datos identificativos del titular:"}
        </p>
        <ul className="list-disc pl-[1.25rem]">
          <li>
            {isEn ? "Trade name" : "Denominación"}: <strong>{SITE.name}</strong> 
          </li>
          <li>{isEn ? "Tax ID" : "NIF/CIF"}: 30264306D</li>
          <li>
            {isEn ? "Address" : "Domicilio"}: {SITE.address.street},{" "}
            {SITE.address.postalCode} {SITE.address.locality}
          </li>
          <li>
            {isEn ? "Email" : "Email"}:{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary underline">
              {SITE.email}
            </a>
          </li>
          <li>
            {isEn ? "Professional registry" : "Colegiado"}: 1531
          </li>
        </ul>
      </Section>

      <Section
        n={2}
        title={isEn ? "Object and purpose" : "Objeto y finalidad"}
      >
        <p>
          {isEn
            ? "This website provides information about the podiatric services offered by the clinic and allows users to request appointments. Lorem ipsum dolor sit amet."
            : "El presente sitio web tiene por objeto informar sobre los servicios podológicos prestados y permitir a los usuarios solicitar cita. Lorem ipsum dolor sit amet."}
        </p>
      </Section>

      <Section
        n={3}
        title={isEn ? "Conditions of use" : "Condiciones de uso"}
      >
        <p>
          {isEn
            ? "Access to and use of the site implies full acceptance of these terms. The user agrees to make appropriate use of the contents and not to engage in unlawful activities."
            : "El acceso y la utilización del sitio implican la aceptación plena de estas condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y a no realizar actividades ilícitas."}
        </p>
      </Section>

      <Section
        n={4}
        title={isEn ? "Intellectual property" : "Propiedad intelectual"}
      >
        <p>
          {isEn
            ? "All contents (texts, images, logos, code) are the property of the holder or of third parties whose use has been duly authorised. Their reproduction without prior written authorisation is forbidden."
            : "Todos los contenidos (textos, imágenes, logotipos, código) son propiedad del titular o de terceros cuyo uso ha sido debidamente autorizado. Queda prohibida su reproducción sin autorización previa por escrito."}
        </p>
      </Section>

      <Section
        n={5}
        title={isEn ? "Liability" : "Responsabilidad"}
      >
        <p>
          {isEn
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The holder is not liable for any damages arising from misuse of the site or from causes beyond its control."
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. El titular no se hace responsable de los daños derivados del uso indebido del sitio ni de causas ajenas a su control."}
        </p>
      </Section>

      <Section
        n={6}
        title={isEn ? "Governing law" : "Legislación aplicable"}
      >
        <p>
          {isEn
            ? "These terms are governed by Spanish law. Any dispute shall be submitted to the Courts of Seville (Spain)."
            : "Las presentes condiciones se rigen por la legislación española. Para cualquier controversia las partes se someten a los Juzgados y Tribunales de Sevilla (España)."}
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
