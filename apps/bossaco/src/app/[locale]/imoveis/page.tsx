import { getTranslations } from "next-intl/server";
import { getImoveis } from "@bossa/notion-client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ImoveisFilters } from "@/components/ImoveisFilters";

export const revalidate = 30;

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: { cidade?: string; tipo?: string; arquiteto?: string };
}) {
  const t = await getTranslations();
  const todos = await getImoveis("BOSSA_CO");
  // região = bairro dentro de SP (pedido Bruno 08/09); cai pra cidade quando não há bairro
  const regioes = [...new Set(todos.map((i) => i.bairro || i.cidade).filter(Boolean))].sort() as string[];
  const tipos = [...new Set(todos.map((i) => i.tipo).filter(Boolean))].sort();
  const arquitetos = [...new Set(todos.flatMap((i) => (i.arquiteto ?? "").split("; ")).filter(Boolean))].sort() as string[];
  const imoveis = todos.filter(
    (i) =>
      (!searchParams.cidade || (i.bairro || i.cidade) === searchParams.cidade) &&
      (!searchParams.tipo || i.tipo === searchParams.tipo) &&
      (!searchParams.arquiteto || (i.arquiteto ?? "").split("; ").includes(searchParams.arquiteto))
  );

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
            cidades={regioes}
            tipos={tipos}
            arquitetos={arquitetos}
            arquitetoAtivo={searchParams.arquiteto}
          />

          {imoveis.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-serif text-2xl text-brand-gray">Nenhum imóvel encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 mt-12">
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
