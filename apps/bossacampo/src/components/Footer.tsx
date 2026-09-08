import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-graphite text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl mb-1" style={{ color: "#8FAF99" }}>Bossa Campo</p>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#8FAF99" }}>Interior de São Paulo</p>
          <p className="text-sm text-white/60 leading-relaxed">
            Curadoria de propriedades residenciais no interior de São Paulo.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#8FAF99" }}>Navegação</p>
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
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#8FAF99" }}>Contato</p>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <a href="mailto:contato@bossacampo.com.br" className="hover:text-white transition-colors">
              contato@bossacampo.com.br
            </a>
            <a href="https://wa.me/5511921226156" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              WhatsApp
            </a>
            <p className="mt-2">Campinas · Itu · Indaiatuba e região</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Bossa Campo. Todos os direitos reservados.
          </p>
          <a href="https://instagram.com/bossacampo" target="_blank" rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase hover:text-white transition-colors" style={{ color: "#8FAF99" }}>
            Instagram
          </a>
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: 12, opacity: 0.7, paddingBottom: 16 }}>
        CRECI-SP 319862 · <a href="/politica-de-privacidade">Política de Privacidade</a>
      </div>
    </footer>
  );
}
