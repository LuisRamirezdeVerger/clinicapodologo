import ReservaForm from "@/components/forms/reserva-form";
import { getDictionary, type Locale } from "@/lib/dictionaries";

export default async function ReservaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = raw === "en" ? "en" : "es";
  const dict = await getDictionary(locale);
  return <ReservaForm locale={locale} dict={dict.form} />;
}
