import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
  localeDetection: false, // abre sempre em PT; /en continua acessível pelo seletor
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
