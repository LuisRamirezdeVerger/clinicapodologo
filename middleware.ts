import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["es", "en"] as const;
const DEFAULT_LOCALE = "es";
type Locale = (typeof LOCALES)[number];

/**
 * Negociación rápida del header Accept-Language.
 * Sin dependencias: parsea la lista priorizada por q-factor y selecciona el
 * primer match contra los locales soportados.
 */
function pickLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .find((p) => p.trim().startsWith("q="))
        ?.split("=")[1];
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if ((LOCALES as readonly string[]).includes(base)) return base as Locale;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ya tiene prefijo de locale → no tocar.
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = pickLocaleFromHeader(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Excluye assets, archivos de Next, sitemap, robots, favicon e imágenes.
  matcher: [
    "/((?!_next|api|favicon\\.ico|favicon\\.svg|sitemap\\.xml|robots\\.txt|.*\\.(?:webp|png|jpg|jpeg|svg|gif|ico|css|js|woff2?)).*)",
  ],
};
