import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad globales.
 *
 * Directivas CSP afinadas para:
 *   - Self-hosted fonts via `next/font` (Inter)            → 'self'
 *   - Vercel Toolbar / Live (preview comments, feedback)   → vercel.live, *.vercel.com
 *   - Recursos estáticos del CDN de Vercel                 → *.vercel-storage.com
 *   - Posibles assets de Google (gstatic) para previews    → *.gstatic.com
 *
 * Sin comodines globales (`*`): cada origen se declara explícitamente.
 */
const CSP_DIRECTIVES = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'", // requerido por Next.js para hydration boot scripts
    "'unsafe-eval'", // requerido por React DevTools / Next dev
    "https://vercel.live",
    "https://*.vercel.com",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:", "https://*.vercel.com"],
  "font-src": [
    "'self'",
    "data:",
    "https://*.vercel.com",
    "https://*.vercel-storage.com",
    "https://*.gstatic.com",
  ],
  "connect-src": [
    "'self'",
    "https://vercel.live",
    "https://*.vercel.com",
    "https://*.pusher.com",
    "wss://*.pusher.com",
  ],
  "frame-src": ["'self'", "https://vercel.live"],
  "frame-ancestors": ["'self'"],
  "form-action": ["'self'"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
} as const;

const contentSecurityPolicy = Object.entries(CSP_DIRECTIVES)
  .map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
