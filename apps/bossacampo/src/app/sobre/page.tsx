import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Boutique imobiliária especializada em condomínios de campo no interior de São Paulo — Fazenda Boa Vista, Quinta da Baroneza, Terras de São José e região.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Sobre a Bossa Campo</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-10 leading-tight">
              Especialistas em encontrar o lugar certo para a sua vida.
            </h1>
            <p className="text-brand-gray leading-relaxed text-lg mb-6">
              A Bossa Campo nasceu da crença de que a escolha de onde viver é uma das decisões mais importantes da vida. Somos uma boutique imobiliária especializada no interior de São Paulo, com curadoria focada em qualidade de vida, natureza e propriedades com caráter.
            </p>
            <p className="text-brand-gray leading-relaxed text-lg">
              Essa curadoria começa na propriedade: cada uma passa por critérios rígidos de arquitetura, assinatura de projeto e funcionalidade antes de entrar no nosso portfólio. Não é qualquer propriedade que entra no site — não aceitamos volume, aceitamos padrão.
            </p>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p className="section-label mb-12">Nossos mercados</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="font-serif text-3xl mb-6">Interior de São Paulo</h2>
                <p className="text-brand-gray leading-relaxed mb-6">
                  Operamos nos condomínios de campo mais desejados do estado: Fazenda Boa Vista (Porto Feliz), Quinta da Baroneza (Bragança Paulista), Terras de São José (Itu), Fazenda da Grama (Itupeva), Helvetia (Indaiatuba) e região. Casas assinadas, chácaras e propriedades de alto padrão.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {["Campinas", "Itu", "Indaiatuba", "Salto", "Porto Feliz", "Itatiba", "Valinhos"].map((c) => (
                    <li key={c} className="text-xs tracking-widest uppercase border border-brand-gray-light px-3 py-1 text-brand-gray">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-offwhite p-8">
                <p className="font-serif text-2xl mb-4 text-brand-green">Nossa abordagem</p>
                <p className="text-brand-gray leading-relaxed text-sm">
                  Não trabalhamos com volume. Cada cliente recebe atenção exclusiva: entendemos seu estilo de vida, seus objetivos e o que significa para você a ideia de lar. Só então iniciamos a curadoria.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24">
          <p className="section-label mb-12">Serviços</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                titulo: "Consultoria Residencial",
                desc: "Do briefing à assinatura: acompanhamos cada etapa com curadoria de propriedades alinhadas ao seu perfil e objetivos de vida.",
              },
              {
                titulo: "Campo & Interior",
                desc: "Chácaras, sítios, fazendas e condomínios de campo. Conhecemos profundamente as regiões onde atuamos.",
              },
              {
                titulo: "Off-Catalog",
                desc: "Propriedades exclusivas não divulgadas no mercado aberto, compartilhadas apenas com nossos clientes.",
              },
            ].map((s) => (
              <div key={s.titulo} className="border-t-2 border-brand-green pt-8">
                <h3 className="font-serif text-2xl mb-4">{s.titulo}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 text-center bg-brand-offwhite">
          <p className="section-label mb-4">Próximo passo</p>
          <h2 className="font-serif text-4xl mb-8">Vamos conversar?</h2>
          <Link href="/contato" className="btn-green">
            Fale com um consultor
          </Link>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
