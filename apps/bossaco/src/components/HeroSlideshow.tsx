"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Fotos reais dos imóveis publicados na vitrine (marca d'água Bossa & Co. via
// proxy /api/foto-publica — aprovado pelo Harvey, nunca a URL original do
// anúncio de terceiro). Curadoria manual 08/09/26 — trocar quando a vitrine
// tiver mais captações exclusivas próprias.
const HERO_IMAGES = [
  "https://terrenos-joa.vercel.app/api/foto-publica/f41e7f89-daec-4a09-a77a-7bc9064fdfb6",
  "https://terrenos-joa.vercel.app/api/foto-publica/da570c55-020e-48fd-82b9-71ee5dfdb801",
  "https://terrenos-joa.vercel.app/api/foto-publica/12b3ba56-82d5-416d-8546-3c97e5be0fa2",
  "https://terrenos-joa.vercel.app/api/foto-publica/b5f1b534-0f82-4ead-8e40-36a15c4119ee",
  "https://terrenos-joa.vercel.app/api/foto-publica/6715d7fa-ac83-40e3-a41b-b971dd7462f0",
];

export function HeroSlideshow({ headline, subline, ctaPrimary, ctaSecondary, images }: {
  headline: string;
  subline?: string;
  ctaPrimary: string;
  ctaSecondary: string;
  images?: string[]; // capas dos anúncios publicados (dinâmico); sem elas, cai na curadoria fixa
}) {
  const HERO = images && images.length >= 2 ? images : HERO_IMAGES;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {HERO.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image src={src} alt="" fill priority={i === 0} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-brand-graphite/50" />
        </div>
      ))}

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="section-label text-white/60 mb-6">Bossa & Co.</p>
        <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">{headline}</h1>
        {subline && <p className="text-sm md:text-base text-white/75 max-w-xl mx-auto mb-10">{subline}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contato" className="btn-ghost">{ctaPrimary}</Link>
          <Link href="/imoveis" className="btn-ghost">{ctaSecondary}</Link>
          <Link href="/off-catalog" className="btn-ghost">Off-Catalog</Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={"rounded-full transition-all duration-300 " + (i === current ? "bg-white w-6 h-1.5" : "bg-white/40 w-1.5 h-1.5")}
            aria-label={"Slide " + (i + 1)}
          />
        ))}
      </div>
    </section>
  );
}
