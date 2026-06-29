"use server";

import nodemailer from "nodemailer";
import { SERVICES } from "@/lib/data/services";

export type ReservationResult =
  | { success: true }
  | { success: false; error: string };

const TO_ADDRESS = "reservas@podologiabalboa.es";

/**
 * Server Action: envía la solicitud de cita por SMTP propio (DonDominio).
 * Credenciales tomadas exclusivamente de variables de entorno.
 */
export async function submitReservation(
  formData: FormData,
): Promise<ReservationResult> {
  try {
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const serviceId = String(formData.get("serviceId") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    if (!fullName || !email || !phone || !serviceId) {
      return { success: false, error: "Faltan campos obligatorios." };
    }

    const service = SERVICES.find((s) => s.id === serviceId);
    if (!service) {
      return { success: false, error: "Servicio no válido." };
    }

    const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error("[send-reservation] Variables SMTP no configuradas.");
      return {
        success: false,
        error: "El servicio de correo no está configurado.",
      };
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: 587,
      secure: false, // STARTTLS: el handshake se hace tras conectar en texto plano
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      authMethod: "LOGIN", // fuerza AUTH LOGIN (evita el AUTH PLAIN rechazado por DonDominio)
    });

    await transporter.sendMail({
      from: `"Podología Balboa" <${SMTP_USER}>`,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `Nueva solicitud de cita: ${fullName}`,
      html: buildEmailHtml({
        fullName,
        email,
        phone,
        serviceName: service.name,
        servicePrice: service.price,
        notes,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("[send-reservation] SMTP error:", error);
    return {
      success: false,
      error:
        "No hemos podido enviar tu solicitud. Inténtalo de nuevo o llámanos directamente.",
    };
  }
}

/* ───────────────── Plantilla HTML del correo ───────────────── */

function buildEmailHtml(data: {
  fullName: string;
  email: string;
  phone: string;
  serviceName: string;
  servicePrice: string;
  notes: string;
}): string {
  const safe = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const notesBlock = data.notes
    ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;width:140px;">Notas</td><td style="padding:8px 0;color:#111827;white-space:pre-wrap;">${safe(data.notes)}</td></tr>`
    : "";

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            <tr>
              <td style="background:#7b2334;padding:24px 32px;color:#ffffff;">
                <h1 style="margin:0;font-size:20px;font-weight:700;">Nueva solicitud de cita</h1>
                <p style="margin:4px 0 0 0;font-size:14px;opacity:0.9;">Podología Balboa</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h2 style="margin:0 0 16px 0;font-size:16px;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Datos del paciente</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                  <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Nombre</td><td style="padding:8px 0;color:#111827;font-weight:600;">${safe(data.fullName)}</td></tr>
                  <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#111827;"><a href="mailto:${safe(data.email)}" style="color:#7b2334;text-decoration:none;">${safe(data.email)}</a></td></tr>
                  <tr><td style="padding:8px 0;color:#6b7280;">Teléfono</td><td style="padding:8px 0;color:#111827;"><a href="tel:${safe(data.phone)}" style="color:#7b2334;text-decoration:none;">${safe(data.phone)}</a></td></tr>
                </table>

                <h2 style="margin:24px 0 16px 0;font-size:16px;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Servicio solicitado</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                  <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Servicio</td><td style="padding:8px 0;color:#111827;font-weight:600;">${safe(data.serviceName)}</td></tr>
                  <tr><td style="padding:8px 0;color:#6b7280;">Precio estimado</td><td style="padding:8px 0;color:#7b2334;font-weight:700;">${safe(data.servicePrice)}</td></tr>
                  ${notesBlock}
                </table>

                <p style="margin:32px 0 0 0;padding:12px 16px;background:#f9fafb;border-radius:8px;font-size:13px;color:#6b7280;">
                  Puedes responder directamente a este email para contactar con el paciente.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#f9fafb;padding:16px 32px;text-align:center;font-size:12px;color:#9ca3af;">
                Solicitud generada automáticamente desde podologiabalboa.es
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
