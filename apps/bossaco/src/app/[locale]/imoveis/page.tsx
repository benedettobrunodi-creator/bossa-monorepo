import { getTranslations } from "next-intl/server";
import { getImoveis } from "@bossa/notion-client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ImoveisFilters } from "@/components/ImoveisFilters";

export const revalidate = 60;

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: { cidade?: string; tipo?: string };
}) {
  const t = await getTranslations();
  const imoveis = await getImoveis(process.env.NOTION_DB_BOSSA_CO!, {
    cidade: searchParams.cidade,
    tipo: searchParams.tipo,
  });

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="section-label mb-2">Portfólio</p>
          <h1 className="font-serif text-5xl mb-12">{t("imoveis.title")}</h1>

          <ImoveisFilters
            cidadeAtiva={searchParams.cidade}
            tipoAtivo={searchParams.tipo}
          />

          {imoveis.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-serif text-2xl text-brand-gray">Nenhum imóvel encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-12">
              {imoveis.map((imovel) => (
                <PropertyCard
                  key={imovel.id}
                  imovel={imovel}
                  href={`/imoveis/${imovel.slug}`}
                />
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
