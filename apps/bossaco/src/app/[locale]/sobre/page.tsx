import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Boutique imobiliária de alto padrão em São Paulo e Miami. Tenant representation, consultoria de compra e imóveis off-catalog.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero texto */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Sobre a Bossa & Co.</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-10 leading-tight">
              Uma boutique imobiliária que representa você — não o proprietário.
            </h1>
            <p className="text-brand-gray leading-relaxed text-lg">
              Fundada em São Paulo com presença em Miami, a Bossa & Co. nasceu para oferecer um modelo diferente de assessoria imobiliária: independente, orientada ao cliente e focada em curadoria de alto padrão. Não trabalhamos com volume. Trabalhamos com escolha.
            </p>
          </div>
        </section>

        {/* Mercados */}
        <section className="bg-brand-gray-light py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p className="section-label mb-12">Nossos mercados</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="font-serif text-3xl mb-6">São Paulo</h2>
                <p className="text-brand-gray leading-relaxed mb-4">
                  Operamos nos bairros de maior liquidez e qualidade de vida da cidade: Jardins, Vila Nova Conceição, Itaim Bibi e Morumbi. Residencial e comercial de alto padrão.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {["Jardins", "Vila Nova Conceição", "Itaim Bibi", "Morumbi", "Pinheiros"].map((b) => (
                    <li key={b} className="text-xs tracking-widest uppercase border border-brand-gray-light px-3 py-1 text-brand-gray">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-3xl mb-6">Miami</h2>
                <p className="text-brand-gray leading-relaxed mb-4">
                  Residencial de alto padrão nos bairros mais valorizados da Flórida. Acompanhamento completo para clientes brasileiros, em português.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {["Brickell", "Coconut Grove", "Coral Gables", "Miami Beach"].map((b) => (
                    <li key={b} className="text-xs tracking-widest uppercase border border-brand-gray-light px-3 py-1 text-brand-gray">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <p className="section-label mb-12">Serviços</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                titulo: "Tenant Representation",
                desc: "Representamos exclusivamente o inquilino e o comprador. Nosso interesse é o seu — nunca o do proprietário. O serviço é gratuito para o cliente.",
              },
              {
                titulo: "Consultoria de Compra",
                desc: "Do briefing inicial à assinatura do contrato, acompanhamos cada etapa com curadoria de imóveis alinhados ao seu perfil, objetivo e estilo de vida.",
              },
              {
                titulo: "Off-Catalog",
                desc: "Imóveis exclusivos que não são divulgados no mercado aberto. Acesso reservado a clientes que exigem discrição e raridade.",
              },
            ].map((s) => (
              <div key={s.titulo} className="border-t-2 border-brand-blue pt-8">
                <h3 className="font-serif text-2xl mb-4">{s.titulo}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BÈR Engenharia */}
        <section className="bg-brand-graphite text-white py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label text-white/40 mb-4">Grupo BÈR</p>
              <h2 className="font-serif text-4xl mb-6">Do imóvel ao ambiente.</h2>
              <p className="text-white/70 leading-relaxed">
                A Bossa & Co. integra o Grupo BÈR junto à BÈR Engenharia — especializada em fit-out corporativo e interiores de alto padrão. Uma combinação única: da aquisição do imóvel até a entrega do ambiente final.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border border-white/10 p-6">
                <p className="font-serif text-xl mb-2">BÈR Engenharia</p>
                <p className="text-sm text-white/60">Obras, fit-out corporativo e interiores residenciais de alto padrão.</p>
              </div>
              <div className="border border-white/20 p-6">
                <p className="font-serif text-xl mb-2">Bossa & Co.</p>
                <p className="text-sm text-white/60">Curadoria e representação imobiliária em SP e Miami.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <p className="section-label mb-4">Próximo passo</p>
          <h2 className="font-serif text-4xl mb-8">Vamos conversar?</h2>
          <Link href="/contato" className="btn-primary">
            Fale com um advisor
          </Link>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
