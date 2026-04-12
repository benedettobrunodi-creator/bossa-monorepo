"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Imovel } from "@bossa/notion-client";

const MOCK_IMOVEIS = [
  {
    id: "m1", slug: "", titulo: "Casa de campo — Quinta da Baronesa", tipo: "Casa", regiao: "Itu",
    areaConstruida: 520, quartos: 5, preco: 0,
    fotos: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"],
  },
  {
    id: "m2", slug: "", titulo: "Chácara com lago — Indaiatuba", tipo: "Chácara", regiao: "Indaiatuba",
    areaConstruida: 380, quartos: 4, preco: 0,
    fotos: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"],
  },
  {
    id: "m3", slug: "", titulo: "Casa em condomínio — Fazenda da Grama", tipo: "Casa", regiao: "Itupeva",
    areaConstruida: 460, quartos: 4, preco: 0,
    fotos: ["https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80"],
  },
  {
    id: "m4", slug: "", titulo: "Sítio — Porto Feliz", tipo: "Sítio", regiao: "Porto Feliz",
    areaConstruida: 280, quartos: 3, preco: 0,
    fotos: ["https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80"],
  },
  {
    id: "m5", slug: "", titulo: "Fazenda — Campinas", tipo: "Fazenda", regiao: "Campinas",
    areaConstruida: 680, quartos: 6, preco: 0,
    fotos: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80"],
  },
];

interface Props { imoveis: Imovel[]; }

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
          <h2 className="font-serif text-4xl">Propriedades em destaque</h2>
        </div>
        <div className="flex items-center gap-4">
          {max > 0 && (
            <div className="flex gap-2">
              <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}
                className="w-10 h-10 border border-brand-gray-light flex items-center justify-center text-brand-gray hover:border-brand-green hover:text-brand-green transition-colors disabled:opacity-30">←</button>
              <button onClick={() => setIdx(i => Math.min(max, i + 1))} disabled={idx >= max}
                className="w-10 h-10 border border-brand-gray-light flex items-center justify-center text-brand-gray hover:border-brand-green hover:text-brand-green transition-colors disabled:opacity-30">→</button>
            </div>
          )}
          <Link href="/imoveis" className="text-xs tracking-widest uppercase text-brand-gray hover:text-brand-graphite transition-colors">
            Ver todas →
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
            const localizacao = imovel.regiao || imovel.cidade || "";
            const style = { width: `calc(100% / ${visible} - ${(visible - 1) * 32 / visible}px)` };

            const inner = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-light mb-4">
                  {imovel.fotos?.[0] ? (
                    <Image src={imovel.fotos[0]} alt={imovel.titulo} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                  ) : (
                    <div className="w-full h-full bg-brand-gray-light flex items-center justify-center">
                      <span className="font-serif text-brand-gray opacity-40">{imovel.tipo}</span>
                    </div>
                  )}
                </div>
                <p className="section-label mb-1">{imovel.tipo}{localizacao ? ` · ${localizacao}` : ""}</p>
                <h3 className="font-serif text-xl mb-2 group-hover:text-brand-green transition-colors">{imovel.titulo}</h3>
                <div className="flex gap-4 text-sm text-brand-gray mb-2">
                  {imovel.areaConstruida && <span>{imovel.areaConstruida} m² const.</span>}
                  {!imovel.areaConstruida && imovel.area && <span>{imovel.area} m²</span>}
                  {imovel.quartos && <span>{imovel.quartos} quartos</span>}
                </div>
                <p className="font-serif text-lg">{preco}</p>
              </>
            );

            return isMock || !imovel.slug ? (
              <div key={imovel.id} className="group flex-shrink-0" style={style}>{inner}</div>
            ) : (
              <Link key={imovel.id} href={`/imoveis/${imovel.slug}`} className="group flex-shrink-0 block" style={style}>{inner}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
