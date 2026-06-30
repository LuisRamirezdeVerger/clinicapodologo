import { SITE } from "@/lib/site";

export default async function PrivacyPage({
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
          {isEn ? "Privacy policy" : "Política de privacidad"}
        </h1>
        <p className="text-[clamp(0.8125rem,1.4vw,0.9375rem)] text-muted-foreground">
          {isEn ? "Last updated" : "Última actualización"}:{" "}
          {new Date().toLocaleDateString(isEn ? "en-GB" : "es-ES")}
        </p>
      </header>

      <Section
        n={1}
        title={isEn ? "Data controller" : "Responsable del tratamiento"}
      >
        <p>
          <strong>{SITE.name}</strong> — [Insertar Nombre/Razón Social] — [Insertar NIF/CIF].
        </p>
        <p>
          {isEn ? "Address" : "Domicilio"}: {SITE.address.street},{" "}
          {SITE.address.postalCode} {SITE.address.locality}.
        </p>
        <p>
          {isEn ? "Email" : "Correo electrónico"}:{" "}
          <a href={`mailto:${SITE.email}`} className="text-primary underline">
            {SITE.email}
          </a>
          .
        </p>
      </Section>

      <Section
        n={2}
        title={isEn ? "Purpose of processing" : "Finalidad del tratamiento"}
      >
        <p>
          {isEn
            ? "We process the personal data provided through forms (name, phone, email and clinical notes) exclusively to manage your appointment request, provide podiatric care and send service-related communications."
            : "Tratamos los datos personales facilitados a través de los formularios (nombre, teléfono, email y notas clínicas) exclusivamente para gestionar tu solicitud de cita, prestar el servicio podológico y enviarte comunicaciones relativas al mismo."}
        </p>
        <p>
          {isEn
            ? "Clinical data are processed under the duty of medical confidentiality and stored for the periods set by current healthcare legislation."
            : "Los datos clínicos se tratan bajo el deber de secreto médico y se conservan durante los plazos legalmente exigidos por la normativa sanitaria vigente."}
        </p>
      </Section>

      <Section n={3} title={isEn ? "Lawful basis" : "Legitimación"}>
        <p>
          {isEn
            ? "Processing is based on (i) your explicit consent given on the form (GDPR art. 6.1.a), (ii) the execution of the healthcare service requested (art. 6.1.b) and (iii) compliance with legal obligations applicable to the clinic (art. 6.1.c)."
            : "El tratamiento se basa en (i) el consentimiento explícito otorgado en el formulario (art. 6.1.a RGPD), (ii) la ejecución de la prestación sanitaria solicitada (art. 6.1.b) y (iii) el cumplimiento de obligaciones legales aplicables a la clínica (art. 6.1.c)."}
        </p>
      </Section>

      <Section n={4} title={isEn ? "Data recipients" : "Destinatarios"}>
        <p>
          {isEn
            ? "We do not transfer data to third parties except where legally required. Data may be processed by the email-hosting provider (DonDominio) and the hosting platform (Vercel) under strict data-processing agreements."
            : "No cedemos los datos a terceros salvo por obligación legal. Los datos podrán ser tratados por el proveedor de email (DonDominio) y la plataforma de hosting (Vercel) bajo estrictos contratos de encargo de tratamiento."}
        </p>
      </Section>

      <Section n={5} title={isEn ? "Data subject rights" : "Derechos del usuario"}>
        <p>
          {isEn
            ? "You may exercise your rights of access, rectification, erasure, opposition, restriction of processing and data portability by writing to the email above, attaching a copy of your ID."
            : "Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo al correo electrónico indicado, adjuntando copia de tu DNI."}
        </p>
        <p>
          {isEn
            ? "If you consider your rights have not been properly addressed, you may lodge a complaint with the Spanish Data Protection Agency (www.aepd.es)."
            : "Si consideras que tus derechos no han sido debidamente atendidos, podrás presentar reclamación ante la Agencia Española de Protección de Datos (www.aepd.es)."}
        </p>
      </Section>

      <Section n={6} title={isEn ? "Data retention" : "Conservación de los datos"}>
        <p>
          {isEn
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Clinical histories are retained for the minimum legal period (5 years from the last patient contact, art. 17.1 Law 41/2002)."
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Las historias clínicas se conservan durante el plazo legalmente mínimo (5 años desde el último contacto con el paciente, art. 17.1 Ley 41/2002)."}
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
