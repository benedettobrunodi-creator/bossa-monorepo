import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com um consultor da Bossa Campo.",
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <p className="section-label mb-4">Contato</p>
            <h1 className="font-serif text-5xl mb-8">Fale com um consultor.</h1>
            <p className="text-brand-gray leading-relaxed mb-12 max-w-sm">
              Conte-nos sobre o que você está buscando. Sem pressa, sem pressão — só uma conversa honesta sobre o que faz sentido para a sua vida.
            </p>

            <div className="flex flex-col gap-6 text-sm">
              <div>
                <p className="section-label mb-1">Email</p>
                <a href="mailto:contato@bossacampo.com.br" className="text-brand-graphite hover:text-brand-green transition-colors">
                  contato@bossacampo.com.br
                </a>
              </div>
              <div>
                <p className="section-label mb-1">WhatsApp</p>
                <a href="https://wa.me/5511921226156" target="_blank" rel="noopener noreferrer" className="text-brand-graphite hover:text-brand-green transition-colors">
                  +55 11 9 9999-9999
                </a>
              </div>
              <div>
                <p className="section-label mb-1">Região de atuação</p>
                <p className="text-brand-gray">Campinas · Itu · Indaiatuba · Salto e região</p>
              </div>
              <div>
                <p className="section-label mb-1">Instagram</p>
                <a href="https://instagram.com/bossacampo" target="_blank" rel="noopener noreferrer" className="text-brand-graphite hover:text-brand-green transition-colors">
                  @bossacampo
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
