import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-graphite text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl mb-1" style={{ color: "#9BC0CE" }}>Bossa Praia</p>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#9BC0CE" }}>Interior de São Paulo</p>
          <p className="text-sm text-white/60 leading-relaxed">
            Curadoria de propriedades residenciais no interior de São Paulo.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#9BC0CE" }}>Navegação</p>
          <nav className="flex flex-col gap-2">
            {[
              { href: "/imoveis", label: "Propriedades" },
              { href: "/sobre", label: "Sobre" },
              { href: "/contato", label: "Contato" },
              { href: "/off-catalog", label: "Off-Catalog" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#9BC0CE" }}>Contato</p>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <a href="mailto:contato@bossapraia.com.br" className="hover:text-white transition-colors">
              contato@bossapraia.com.br
            </a>
            <a href="https://wa.me/5511921226156" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              WhatsApp
            </a>
            <p className="mt-2">Campinas · Itu · Indaiatuba e região</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <p className="text-xs text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Bossa Praia. Todos os direitos reservados. · CRECI-SP 319862 ·{" "}
            <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </p>
          <a href="https://instagram.com/bossapraia" target="_blank" rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase hover:text-white transition-colors" style={{ color: "#9BC0CE" }}>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
