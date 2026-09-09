import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://bossapraia.com.br"),
  title: { default: "Bossa Praia — Imóveis no Litoral de SP", template: "%s | Bossa Praia" },
  description: "Curadoria de imóveis residenciais no interior de São Paulo — Campinas, Itu, Indaiatuba e região. Para quem escolhe onde viver.",
  openGraph: {
    siteName: "Bossa Praia",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-brand-offwhite text-brand-graphite font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
