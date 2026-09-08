import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com um advisor da Bossa & Co.",
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <p className="section-label mb-4">Contato</p>
            <h1 className="font-serif text-5xl mb-8">Fale com um advisor.</h1>
            <p className="text-brand-gray leading-relaxed mb-12 max-w-sm">
              Estamos disponíveis para conversar sobre imóveis, oportunidades ou qualquer dúvida. Sem pressão, sem compromisso.
            </p>

            <div className="flex flex-col gap-6 text-sm">
              <div>
                <p className="section-label mb-1">Email</p>
                <a href="mailto:contato@bossaco.com.br" className="text-brand-graphite hover:text-brand-latao transition-colors">
                  contato@bossaco.com.br
                </a>
              </div>
              <div>
                <p className="section-label mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/5511921226156"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-graphite hover:text-brand-latao transition-colors"
                >
                  +55 11 9 9999-9999
                </a>
              </div>
              <div>
                <p className="section-label mb-1">São Paulo</p>
                <p className="text-brand-gray">Jardins, São Paulo — SP, Brasil</p>
              </div>
              <div>
                <p className="section-label mb-1">Miami</p>
                <p className="text-brand-gray">Miami, FL — United States</p>
              </div>
              <div>
                <p className="section-label mb-1">Instagram</p>
                <a
                  href="https://instagram.com/bossaco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-graphite hover:text-brand-latao transition-colors"
                >
                  @bossaco
                </a>
              </div>
            </div>
          </div>

          <div className="pt-12 lg:pt-20">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
