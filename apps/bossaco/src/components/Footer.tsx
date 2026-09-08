import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-brand-graphite text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl mb-4">Bossa & Co.</p>
          <p className="text-sm text-white/60 leading-relaxed">
            Curadoria de imóveis residenciais e comerciais em São Paulo e Miami.
          </p>
        </div>

        <div>
          <p className="section-label text-white/40 mb-4">Navegação</p>
          <nav className="flex flex-col gap-2">
            {[
              { href: "/imoveis", label: t("nav.imoveis") },
              { href: "/sobre", label: t("nav.sobre") },
              { href: "/contato", label: t("nav.contato") },
              { href: "/off-catalog", label: t("nav.offCatalog") },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="section-label text-white/40 mb-4">Contato</p>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <a href="mailto:contato@bossaco.com.br" className="hover:text-white transition-colors">
              contato@bossaco.com.br
            </a>
            <a
              href="https://wa.me/5511921226156"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <p className="mt-2">Jardins, São Paulo — SP</p>
            <p>Miami, FL — USA</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <p className="text-xs text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Bossa & Co. {t("footer.direitos")} · CRECI-SP 319862 ·{" "}
            <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/bossaco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
