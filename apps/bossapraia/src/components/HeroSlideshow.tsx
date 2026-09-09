"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Hero da Bossa Praia: usa as capas reais da vitrine (marca d'água Bossa Praia
// via proxy /api/foto-publica — aprovado pelo Harvey, nunca a URL original do
// anúncio de terceiro). Enquanto a vitrine do litoral estiver vazia, mostra um
// gradient petróleo→grafite em vez de foto (decisão do Tom, 09/09/26 — nunca
// stock nem foto de outra marca).
export function HeroSlideshow({ images }: { images?: string[] } = {}) {
  const HERO = images && images.length >= 2 ? images : [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (HERO.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [HERO.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #2E5A6B 0%, #274D5D 45%, #2C2C2C 100%)" }}>
      {HERO.map((src, i) => (
        <div key={src} className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
          <Image src={src} alt="" fill priority={i === 0} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,90,107,0.45)" }} />
        </div>
      ))}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "#C9B99A" }}>Bossa Praia</p>
        <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
          Para quem escolhe onde viver, não apenas onde morar.
        </h1>
        <p className="text-sm md:text-base text-white/75 max-w-xl mx-auto mb-10">
          Cada propriedade passa por critério de arquitetura, assinatura de projeto e funcionalidade antes de entrar na curadoria — nunca por volume.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contato" className="btn-ghost">Fale com um consultor</Link>
          <Link href="/imoveis" className="btn-ghost">Ver propriedades</Link>
          <Link href="/off-catalog" className="btn-ghost">Off-Catalog</Link>
        </div>
      </div>
      {HERO.length >= 2 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {HERO.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={"rounded-full transition-all duration-300 " + (i === current ? "bg-white w-6 h-1.5" : "bg-white/40 w-1.5 h-1.5")}
              aria-label={"Slide " + (i + 1)} />
          ))}
        </div>
      )}
    </section>
  );
}
