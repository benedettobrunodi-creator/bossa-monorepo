"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Imovel } from "@bossa/notion-client";

const MOCK_IMOVEIS = [
  {
    id: "m1", slug: "", titulo: "Cobertura Jardins", tipo: "Apartamento", cidade: "São Paulo", bairro: "Jardins",
    area: 320, quartos: 4, vagas: 3, preco: 0, fotos: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"],
    status: "", descricao: "", destaque: true, offCatalog: false,
  },
  {
    id: "m2", slug: "", titulo: "Apartamento Vila Nova Conceição", tipo: "Apartamento", cidade: "São Paulo", bairro: "Vila Nova Conceição",
    area: 210, quartos: 3, vagas: 2, preco: 0, fotos: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],
    status: "", descricao: "", destaque: true, offCatalog: false,
  },
  {
    id: "m3", slug: "", titulo: "Penthouse Itaim Bibi", tipo: "Cobertura", cidade: "São Paulo", bairro: "Itaim Bibi",
    area: 480, quartos: 5, vagas: 4, preco: 0, fotos: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"],
    status: "", descricao: "", destaque: true, offCatalog: false,
  },
  {
    id: "m4", slug: "", titulo: "Casa Morumbi", tipo: "Casa", cidade: "São Paulo", bairro: "Morumbi",
    area: 650, quartos: 6, vagas: 4, preco: 0, fotos: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"],
    status: "", descricao: "", destaque: true, offCatalog: false,
  },
  {
    id: "m5", slug: "", titulo: "Apartamento Brickell", tipo: "Apartamento", cidade: "Miami", bairro: "Brickell",
    area: 180, quartos: 2, vagas: 2, preco: 0, fotos: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"],
    status: "", descricao: "", destaque: true, offCatalog: false,
  },
];

interface Props {
  imoveis: Imovel[];
}

export function PropertyCarousel({ imoveis }: Props) {
  const items = imoveis.length > 0 ? imoveis : (MOCK_IMOVEIS as any);
  const isMock = imoveis.length === 0;
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const max = Math.max(0, items.length - visible);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="section-label mb-2">Seleção</p>
          <h2 className="font-serif text-4xl">Imóveis em destaque</h2>
        </div>
        <div className="flex items-center gap-4">
          {max > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => setIdx(i => Math.max(0, i - 1))}
                disabled={idx === 0}
                className="w-10 h-10 border border-brand-gray-light flex items-center justify-center text-brand-gray hover:border-brand-graphite hover:text-brand-graphite transition-colors disabled:opacity-30"
              >←</button>
              <button
                onClick={() => setIdx(i => Math.min(max, i + 1))}
                disabled={idx >= max}
                className="w-10 h-10 border border-brand-gray-light flex items-center justify-center text-brand-gray hover:border-brand-graphite hover:text-brand-graphite transition-colors disabled:opacity-30"
              >→</button>
            </div>
          )}
          <Link href="/imoveis" className="text-xs tracking-widest uppercase text-brand-gray hover:text-brand-graphite transition-colors">
            Ver todos →
          </Link>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-500"
          style={{ transform: `translateX(calc(-${idx} * (100% / ${visible} + ${32 / visible}px)))` }}
        >
          {items.map((imovel: any) => {
            const preco = !imovel.preco || imovel.preco === 0
              ? "Sob consulta"
              : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(imovel.preco);

            const card = (
              <div className="flex-shrink-0" style={{ width: `calc(100% / ${visible} - ${(visible - 1) * 32 / visible}px)` }}>
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-light mb-4 group">
                  {imovel.fotos[0] ? (
                    <Image src={imovel.fotos[0]} alt={imovel.titulo} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                  ) : (
                    <div className="w-full h-full bg-brand-gray-light flex items-center justify-center">
                      <span className="font-serif text-brand-gray opacity-40">{imovel.tipo}</span>
                    </div>
                  )}
                  {isMock && (
                    <div className="absolute inset-0 bg-brand-graphite/0" />
                  )}
                </div>
                <p className="section-label mb-1">{imovel.tipo} · {imovel.cidade}{imovel.bairro ? `, ${imovel.bairro}` : ""}</p>
                <h3 className="font-serif text-xl mb-2 hover:text-brand-latao transition-colors">{imovel.titulo}</h3>
                <div className="flex gap-4 text-sm text-brand-gray mb-2">
                  {imovel.area && <span>{imovel.area} m²</span>}
                  {imovel.quartos && <span>{imovel.quartos} quartos</span>}
                  {imovel.vagas && <span>{imovel.vagas} vagas</span>}
                </div>
                <p className="font-serif text-lg">{preco}</p>
              </div>
            );

            return isMock || !imovel.slug ? (
              <div key={imovel.id} className="flex-shrink-0 block" style={{ width: `calc(100% / ${visible} - ${(visible - 1) * 32 / visible}px)` }}>
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-light mb-4">
                  {imovel.fotos[0] && (
                    <Image src={imovel.fotos[0]} alt={imovel.titulo} fill className="object-cover" sizes="33vw" />
                  )}
                </div>
                <p className="section-label mb-1">{imovel.tipo} · {imovel.cidade}{imovel.bairro ? `, ${imovel.bairro}` : ""}</p>
                <h3 className="font-serif text-xl mb-2">{imovel.titulo}</h3>
                <div className="flex gap-4 text-sm text-brand-gray mb-2">
                  {imovel.area && <span>{imovel.area} m²</span>}
                  {imovel.quartos && <span>{imovel.quartos} quartos</span>}
                  {imovel.vagas && <span>{imovel.vagas} vagas</span>}
                </div>
                <p className="font-serif text-lg">{preco}</p>
              </div>
            ) : (
              <Link key={imovel.id} href={`/imoveis/${imovel.slug}`} className="group flex-shrink-0 block" style={{ width: `calc(100% / ${visible} - ${(visible - 1) * 32 / visible}px)` }}>
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-light mb-4">
                  {imovel.fotos[0] ? (
                    <Image src={imovel.fotos[0]} alt={imovel.titulo} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                  ) : (
                    <div className="w-full h-full bg-brand-gray-light flex items-center justify-center">
                      <span className="font-serif text-brand-gray opacity-40">{imovel.tipo}</span>
                    </div>
                  )}
                </div>
                <p className="section-label mb-1">{imovel.tipo} · {imovel.cidade}{imovel.bairro ? `, ${imovel.bairro}` : ""}</p>
                <h3 className="font-serif text-xl mb-2 group-hover:text-brand-latao transition-colors">{imovel.titulo}</h3>
                <div className="flex gap-4 text-sm text-brand-gray mb-2">
                  {imovel.area && <span>{imovel.area} m²</span>}
                  {imovel.quartos && <span>{imovel.quartos} quartos</span>}
                  {imovel.vagas && <span>{imovel.vagas} vagas</span>}
                </div>
                <p className="font-serif text-lg">{preco}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
