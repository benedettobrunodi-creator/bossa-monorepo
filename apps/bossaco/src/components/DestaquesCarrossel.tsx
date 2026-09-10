"use client";
import { useEffect, useState } from "react";
import { PropertyCard } from "./PropertyCard";
import type { Imovel } from "@bossa/notion-client";

// Dois carrosséis empilhados em rolagem contínua (pedido Bruno 08/09):
// linha de cima anda pra esquerda, a de baixo pra direita. Pausa no hover.
// Com poucos imóveis, a lista é repetida pra fila nunca ficar vazia.
export function DestaquesCarrossel({ imoveis, hrefBase = "/imoveis" }: { imoveis: Imovel[]; hrefBase?: string }) {
  // celular/tablet: carrossel vira scroll nativo — arrasta com o dedo pros dois
  // lados (pedido Bruno 09/09); desktop mantém a rolagem continua automática
  const [toque, setToque] = useState(false);
  useEffect(() => { setToque(window.matchMedia("(pointer: coarse)").matches); }, []);
  if (!imoveis.length) return null;

  const encher = (lista: Imovel[]) => {
    let out = [...lista];
    while (out.length < 6) out = [...out, ...lista];
    return out;
  };
  const linha1 = encher(imoveis.filter((_, i) => i % 2 === 0));
  const linha2 = encher(imoveis.filter((_, i) => i % 2 === 1).length ? imoveis.filter((_, i) => i % 2 === 1) : imoveis);

  const Linha = ({ itens, reverso }: { itens: Imovel[]; reverso?: boolean }) => {
    if (toque) {
      const unicos = itens.filter((x, i, arr) => arr.findIndex((y) => y.id === x.id) === i);
      return (
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {unicos.map((imovel, i) => (
            <div key={`${imovel.id}-${i}`} className="w-[85vw] max-w-[370px] shrink-0 snap-start">
              <PropertyCard imovel={imovel} href={`${hrefBase}/${imovel.slug}`} />
            </div>
          ))}
        </div>
      );
    }
    return (
    <div className="overflow-hidden group">
      <div
        className={`flex gap-5 w-max ${reverso ? "anim-carrossel-rev" : "anim-carrossel"} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${Math.max(70, itens.length * 16)}s` }}
      >
        {[...itens, ...itens].map((imovel, i) => (
          <div key={`${imovel.id}-${i}`} className="w-[370px] max-w-[85vw] shrink-0">
            <PropertyCard imovel={imovel} href={`${hrefBase}/${imovel.slug}`} />
          </div>
        ))}
      </div>
    </div>
    );
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <p className="section-label mb-3">Curadoria</p>
      <h2 className="font-serif text-3xl md:text-4xl mb-2 text-brand-graphite">Destaques</h2>
      <p className="text-sm text-brand-gray mb-10 max-w-xl">
        Selecionados por arquitetura, assinatura de projeto e funcionalidade — nunca por volume.
        Não é qualquer imóvel que entra na Bossa & Co.
      </p>
      <div className="flex flex-col gap-10">
        <Linha itens={linha1} />
        <Linha itens={linha2} reverso />
      </div>
      <style>{`
        @keyframes carrossel {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .anim-carrossel { animation: carrossel linear infinite; }
        .anim-carrossel-rev { animation: carrossel linear infinite reverse; }
        @media (prefers-reduced-motion: reduce) {
          .anim-carrossel, .anim-carrossel-rev { animation-play-state: paused; }
        }
      `}</style>
    </section>
  );
}
