import type { Metadata } from "next";
import { getImoveis } from "@bossa/notion-client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const revalidate = 60;
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function OffCatalogPage() {
  const imoveis = await getImoveis(process.env.NOTION_DB_BOSSA_CAMPO!, { offCatalog: true });

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-2xl mb-16 pb-16 border-b border-brand-gray-light">
            <p className="section-label mb-4">Acesso exclusivo</p>
            <p className="font-serif text-3xl text-brand-graphite leading-snug">
              Estas propriedades são compartilhadas exclusivamente com nossos clientes.
            </p>
          </div>
          {imoveis.length === 0 ? (
            <p className="font-serif text-2xl text-brand-gray">Sem propriedades disponíveis no momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {imoveis.map((imovel) => (
                <PropertyCard key={imovel.id} imovel={imovel} href={`/imoveis/${imovel.slug}`} showBadge />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
