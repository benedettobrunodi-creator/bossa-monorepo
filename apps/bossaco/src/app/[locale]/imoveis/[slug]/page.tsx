import { getImovel } from "@bossa/notion-client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyGallery } from "@/components/PropertyGallery";
import { InterestModal } from "@/components/InterestModal";

// next-intl em Server Components força render dinâmico; com generateStaticParams
// o Next tentava estático e dava 500 (DYNAMIC_SERVER_USAGE). Página é dinâmica mesmo.
export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imovel = await getImovel("BOSSA_CO", params.slug);
  if (!imovel) return {};
  return {
    title: imovel.titulo,
    description: imovel.descricao?.slice(0, 160),
    openGraph: { images: imovel.fotos[0] ? [imovel.fotos[0]] : [] },
  };
}

export default async function ImovelPage({ params }: Props) {
  const imovel = await getImovel("BOSSA_CO", params.slug);
  if (!imovel) notFound();

  const preco =
    !imovel.preco || imovel.preco === 0
      ? "Sob consulta"
      : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(imovel.preco);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Gallery */}
        <PropertyGallery fotos={imovel.fotos} titulo={imovel.titulo} />

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            <p className="section-label mb-2">
              {imovel.tipo} · {imovel.cidade}
              {imovel.bairro ? `, ${imovel.bairro}` : ""}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl mb-6">{imovel.titulo}</h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-brand-gray-light mb-10">
              {imovel.area && (
                <div>
                  <p className="section-label mb-1">Área</p>
                  <p className="font-serif text-2xl">{imovel.area} m²</p>
                </div>
              )}
              {imovel.quartos && (
                <div>
                  <p className="section-label mb-1">Quartos</p>
                  <p className="font-serif text-2xl">{imovel.quartos}</p>
                </div>
              )}
              {imovel.vagas && (
                <div>
                  <p className="section-label mb-1">Vagas</p>
                  <p className="font-serif text-2xl">{imovel.vagas}</p>
                </div>
              )}
              <div>
                <p className="section-label mb-1">Preço</p>
                <p className="font-serif text-2xl">{preco}</p>
              </div>
            </div>

            {imovel.descricao && (
              <div>
                <h2 className="font-serif text-2xl mb-4">Descrição</h2>
                <p className="text-sm text-brand-gray leading-relaxed whitespace-pre-line">
                  {imovel.descricao}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-brand-gray-light p-8">
              <p className="font-serif text-2xl mb-2">{preco}</p>
              <p className="section-label mb-8">
                {imovel.tipo} · {imovel.cidade}
              </p>
              <InterestModal imovelTitulo={imovel.titulo} imovelSlug={imovel.slug} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
