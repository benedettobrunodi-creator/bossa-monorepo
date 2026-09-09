import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AvalieForm } from "@/components/AvalieForm";

export const metadata = { title: "Avalie seu imóvel — Bossa Campo" };

export default function AvaliePage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center mb-14">
          <p className="section-label mb-3">Avaliação Bossa</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Quanto vale o seu imóvel?</h1>
          <p className="text-sm text-brand-gray max-w-2xl mx-auto leading-relaxed">
            Nosso observatório de mercado monitora diariamente mais de 19.000 imóveis à venda nos condomínios
            mais desejados do interior de São Paulo. Descubra em segundos a faixa de valor do seu — com base em dados reais,
            não em achismo.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <AvalieForm workspace="BOSSA_CAMPO" whatsappMarca="5511921226156" />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
