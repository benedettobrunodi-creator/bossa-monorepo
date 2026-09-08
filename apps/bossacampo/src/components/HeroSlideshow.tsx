"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Fotos reais dos imóveis publicados na vitrine (marca d'água Bossa Campo via
// proxy /api/foto-publica — aprovado pelo Harvey, nunca a URL original do
// anúncio de terceiro). Curadoria manual 08/09/26 — trocar quando a vitrine
// tiver mais captações exclusivas próprias.
const HERO_IMAGES = [
  "https://terrenos-joa.vercel.app/api/foto-publica/61c5ae37-f293-4e8a-86d2-60676bda55db",
  "https://terrenos-joa.vercel.app/api/foto-publica/2f9c2fd6-4eb4-41a5-949a-f34308c42861",
  "https://terrenos-joa.vercel.app/api/foto-publica/eb9877f8-7616-4aa5-a679-64ae8f7d0c7d",
  "https://terrenos-joa.vercel.app/api/foto-publica/2c70cd93-d396-4658-8d21-a0d8bcbe62c6",
  "https://terrenos-joa.vercel.app/api/foto-publica/0f7decdd-f217-4897-a36e-d5ccd7b35b5a",
];

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {HERO_IMAGES.map((src, i) => (
        <div key={src} className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
          <Image src={src} alt="" fill priority={i === 0} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(61,90,71,0.45)" }} />
        </div>
      ))}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "#C9B99A" }}>Bossa Campo</p>
        <h1 className="font-serif text-5xl md:text-7xl mb-10 leading-tight">
          Para quem escolhe onde viver, não apenas onde morar.
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contato" className="btn-ghost">Fale com um consultor</Link>
          <Link href="/imoveis" className="btn-ghost">Ver propriedades</Link>
          <Link href="/off-catalog" className="btn-ghost">Off-Catalog</Link>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={"rounded-full transition-all duration-300 " + (i === current ? "bg-white w-6 h-1.5" : "bg-white/40 w-1.5 h-1.5")}
            aria-label={"Slide " + (i + 1)} />
        ))}
      </div>
    </section>
  );
}
