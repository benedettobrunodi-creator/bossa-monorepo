import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bossaeco.com"),
  title: { default: "Bossa & Co. — Imóveis de Alto Padrão", template: "%s | Bossa & Co." },
  description: "Curadoria de imóveis residenciais e comerciais em São Paulo e Miami. Tenant representation, consultoria de compra e acesso exclusivo a imóveis off-catalog.",
  openGraph: {
    siteName: "Bossa & Co.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Bossa & Co. — Imóveis de Alto Padrão" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-brand-offwhite text-brand-graphite font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
