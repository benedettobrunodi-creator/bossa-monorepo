import { getImovel, getImoveis } from "@/lib/vitrine";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyGallery } from "@/components/PropertyGallery";

export const revalidate = 30;

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const imoveis = await getImoveis("BOSSA_PRAIA");
  return imoveis.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imovel = await getImovel("BOSSA_PRAIA", params.slug);
  if (!imovel) return {};
  return {
    title: imovel.titulo,
    description: imovel.descricao?.slice(0, 160),
    openGraph: { images: imovel.fotos[0] ? [imovel.fotos[0]] : [] },
  };
}

export default async function ImovelPage({ params }: Props) {
  const imovel = await getImovel("BOSSA_PRAIA", params.slug);
  if (!imovel) notFound();

  const preco =
    imovel.preco && imovel.preco > 0
      ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(imovel.preco)
      : null; // Harvey 11/09: sem preço = apreciação, sem "Sob consulta"

  return (
    <>
      <Header />
      <main className="pt-20">
        <PropertyGallery fotos={imovel.fotos} titulo={imovel.titulo} />

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <p className="section-label mb-2">
              {imovel.tipo}
              {imovel.regiao ? ` · ${imovel.regiao}` : ""}
              {imovel.condominio ? ` · ${imovel.condominio}` : ""}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl mb-6">{imovel.titulo}</h1>
            {(imovel.arquiteto || imovel.reformado) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {imovel.arquiteto && <span className="bg-brand-green text-white text-[10px] tracking-widest uppercase px-3 py-1.5">Assinado · {imovel.arquiteto}</span>}
                {imovel.reformado && <span className="border border-brand-gray-light text-brand-graphite text-[10px] tracking-widest uppercase px-3 py-1.5">Reformado</span>}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-brand-gray-light mb-10">
              {imovel.areaConstruida && (
                <div><p className="section-label mb-1">Área const.</p><p className="font-serif text-2xl">{imovel.areaConstruida} m²</p></div>
              )}
              {imovel.areaTotal && (
                <div><p className="section-label mb-1">Área total</p><p className="font-serif text-2xl">{imovel.areaTotal} m²</p></div>
              )}
              {imovel.quartos && (
                <div><p className="section-label mb-1">Quartos</p><p className="font-serif text-2xl">{imovel.quartos}</p></div>
              )}
              {preco && (<div><p className="section-label mb-1">Preço</p><p className="font-serif text-2xl">{preco}</p></div>)}
            </div>

            {imovel.amenidades && imovel.amenidades.length > 0 && (
              <div className="mb-10">
                <h2 className="font-serif text-2xl mb-4">Amenidades</h2>
                <div className="flex flex-wrap gap-2">
                  {imovel.amenidades.map((a) => (
                    <span key={a} className="text-xs tracking-widest uppercase border border-brand-gray-light px-3 py-1.5 text-brand-gray">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {imovel.descricao && (
              <div>
                <h2 className="font-serif text-2xl mb-4">Descrição</h2>
                <p className="text-sm text-brand-gray leading-relaxed whitespace-pre-line">{imovel.descricao}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-brand-gray-light bg-white p-8">
              {preco && <p className="font-serif text-2xl mb-2">{preco}</p>}
              {imovel.creci && <p className="text-[10px] tracking-widest uppercase text-brand-gray mb-2">CRECI {imovel.creci}</p>}
              <p className="section-label mb-8">{imovel.tipo}{imovel.regiao ? ` · ${imovel.regiao}` : ""}</p>
              <a
                href={`https://wa.me/5511921226156?text=${encodeURIComponent(`Olá! Vi a curadoria da Bossa Praia e gostaria de falar sobre análise de mercado.`)}`}
                target="_blank" rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 w-full border border-brand-gray-light py-3 text-xs tracking-widest uppercase text-brand-graphite hover:border-brand-graphite transition-colors"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-5.7-5A6.6 6.6 0 0 1 7 9.3c0-.6.3-1.2.6-1.5.2-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6c-.2.2-.3.4-.1.7a9.7 9.7 0 0 0 3.6 3.2c.3.1.5.1.7-.1l.8-.9c.2-.2.4-.3.6-.2l2 1c.4.1.6.3.6.4 0 .2 0 .7-.2 1.2Z"/></svg>
                Fale com a Bossa
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
