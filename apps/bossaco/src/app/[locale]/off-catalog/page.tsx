import type { Metadata } from "next";
import { getImoveis } from "@bossa/notion-client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { OffCatalogForm } from "@/components/OffCatalogForm";

export const revalidate = 30;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function OffCatalogPage() {
  const imoveis = await getImoveis("BOSSA_CO", { offCatalog: true });

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-2xl mb-16 pb-16 border-b border-brand-gray-light">
            <p className="section-label mb-4">Acesso exclusivo</p>
            <p className="font-serif text-3xl text-brand-graphite leading-snug">
              Estes imóveis são compartilhados exclusivamente com nossos clientes.
            </p>
          </div>

          {imoveis.length === 0 ? (
            <div>
              <p className="font-serif text-2xl text-brand-graphite mb-3">Acervo reservado a membros.</p>
              <p className="text-sm text-brand-gray leading-relaxed max-w-2xl mb-10">
                As propriedades off-catalog não aparecem na vitrine pública: são casas que os proprietários
                preferem apresentar apenas a interessados selecionados. Deixe seu cadastro — nossa curadoria
                entra em contato e apresenta o que faz sentido para o seu perfil.
              </p>
              <OffCatalogForm workspace="BOSSA_CO" />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
              {imoveis.map((imovel) => (
                <PropertyCard
                  key={imovel.id}
                  imovel={imovel}
                  href={`/imoveis/${imovel.slug}`}
                  showBadge
                />
              ))}
            </div>
          )}

          {imoveis.length > 0 && (
          <div className="mt-16 pt-16 border-t border-brand-gray-light">
            <p className="section-label mb-4">Quer acesso ao acervo completo?</p>
            <OffCatalogForm workspace="BOSSA_CO" />
          </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
