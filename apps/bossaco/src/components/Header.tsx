"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === "pt" ? "en" : "pt";
  const switchPath = pathname.replace(`/${locale}`, "") || "/";

  const links = [
    { href: "/imoveis", label: t("imoveis") },
    { href: "/avalie", label: "Avalie seu imóvel" },
    { href: "/sobre", label: t("sobre") },
    { href: "/contato", label: t("contato") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-offwhite/95 backdrop-blur-sm border-b border-brand-gray-light">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-wide text-brand-graphite">
          Bossa & Co.
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-brand-gray hover:text-brand-graphite transition-colors tracking-wide"
            >
              {l.label}
            </Link>
          ))}

          <Link
            href={`/${otherLocale}${switchPath}`}
            className="text-xs tracking-widest uppercase text-brand-gray hover:text-brand-graphite transition-colors border-l border-brand-gray-light pl-6"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-brand-graphite"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-3 h-px bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-brand-offwhite border-t border-brand-gray-light px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-brand-graphite tracking-wide"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`/${otherLocale}${switchPath}`}
            className="text-xs tracking-widest uppercase text-brand-gray"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>
      )}
    </header>
  );
}
