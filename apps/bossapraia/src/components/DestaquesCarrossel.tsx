"use client";
import { useEffect, useRef } from "react";
import { PropertyCard } from "./PropertyCard";
import type { Imovel } from "@/lib/vitrine";

// Dois carrosséis empilhados que andam sozinhos E aceitam arraste (dedo/trackpad):
// auto-scroll programático num container de scroll nativo — toca/arrasta, ele pausa
// e retoma 4s depois de soltar (pedido Bruno 09/09). Loop infinito por duplicação.
export function DestaquesCarrossel({ imoveis, hrefBase = "/imoveis" }: { imoveis: Imovel[]; hrefBase?: string }) {
  if (!imoveis.length) return null;

  const encher = (lista: Imovel[]) => {
    let out = [...lista];
    while (out.length < 6) out = [...out, ...lista];
    return out;
  };
  const linha1 = encher(imoveis.filter((_, i) => i % 2 === 0));
  const linha2 = encher(imoveis.filter((_, i) => i % 2 === 1).length ? imoveis.filter((_, i) => i % 2 === 1) : imoveis);

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <p className="section-label mb-3">Curadoria</p>
      <h2 className="font-serif text-3xl md:text-4xl mb-2 text-brand-graphite">Destaques</h2>
      <p className="text-sm text-brand-gray mb-10 max-w-xl">
        Selecionadas por arquitetura, assinatura de projeto e implantação — nunca por volume.
        Não é qualquer propriedade que entra na Bossa Praia.
      </p>
      <div className="flex flex-col gap-10">
        <Linha itens={linha1} hrefBase={hrefBase} />
        <Linha itens={linha2} hrefBase={hrefBase} reverso />
      </div>
    </section>
  );
}

function Linha({ itens, hrefBase, reverso }: { itens: Imovel[]; hrefBase: string; reverso?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const pausaAte = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let acumulado = 0;
    // linha reversa começa no meio pra ter estrada nos dois sentidos
    requestAnimationFrame(() => { el.scrollLeft = reverso ? el.scrollWidth / 2 : 1; });
    const passo = () => {
      if (Date.now() > pausaAte.current) {
        acumulado += reverso ? -0.55 : 0.55;
        const inteiro = Math.trunc(acumulado);
        if (inteiro !== 0) {
          el.scrollLeft += inteiro;
          acumulado -= inteiro;
        }
        const meio = el.scrollWidth / 2;
        if (meio > 0) {
          if (el.scrollLeft >= meio) el.scrollLeft -= meio;
          else if (el.scrollLeft <= 0) el.scrollLeft += meio;
        }
      }
      raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    const tocou = () => { pausaAte.current = Date.now() + 4000; };
    const entrouMouse = () => { pausaAte.current = Number.MAX_SAFE_INTEGER; };
    const saiuMouse = () => { pausaAte.current = Date.now() + 800; };
    el.addEventListener("touchstart", tocou, { passive: true });
    el.addEventListener("touchmove", tocou, { passive: true });
    el.addEventListener("wheel", tocou, { passive: true });
    el.addEventListener("mouseenter", entrouMouse);
    el.addEventListener("mouseleave", saiuMouse);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("touchstart", tocou);
      el.removeEventListener("touchmove", tocou);
      el.removeEventListener("wheel", tocou);
      el.removeEventListener("mouseenter", entrouMouse);
      el.removeEventListener("mouseleave", saiuMouse);
    };
  }, [reverso]);

  return (
    <div
      ref={ref}
      className="flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {[...itens, ...itens].map((imovel, i) => (
        <div key={`${imovel.id}-${i}`} className="w-[370px] max-w-[85vw] shrink-0">
          <PropertyCard imovel={imovel} href={`${hrefBase}/${imovel.slug}`} />
        </div>
      ))}
    </div>
  );
}
