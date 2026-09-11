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
            <p className="mt-2">Fazenda Boa Vista · Quinta da Baroneza · Terras de São José · Fazenda da Grama e região</p>
          </div>
        </div>

        {/* as casas Bossa — cross-link do ecossistema (Bruno 09/09) */}
        <div className="md:col-span-3 border-t border-white/10 pt-6 mt-2">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3">As casas Bossa</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-serif text-lg">
            {false ? (
              <span className="text-white">Bossa &amp; Co.</span>
            ) : (
              <a href="https://bossaeco.com.br" className="text-white/50 hover:text-white transition-colors">Bossa &amp; Co.</a>
            )}
            {true ? (
              <span className="text-white">Bossa Campo</span>
            ) : (
              <a href="https://bossacampo.com.br" className="text-white/50 hover:text-white transition-colors">Bossa Campo</a>
            )}
            {false ? (
              <span className="text-white">Bossa Praia</span>
            ) : (
              <a href="https://bossapraia.com.br" className="text-white/50 hover:text-white transition-colors">Bossa Praia</a>
            )}
          </div>
        </div>

      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <p className="text-xs text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Bossa Campo. Todos os direitos reservados. · Bruno Di Benedetto · Corretor responsável · CRECI-SP 319862 ·{" "}
            <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
          </p>
          <a href="https://instagram.com/bossacampo" target="_blank" rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase hover:text-white transition-colors" style={{ color: "#8FAF99" }}>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
