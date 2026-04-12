"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2560&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2560&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2560&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=2560&q=80",
];

export function HeroSlideshow({ headline, ctaPrimary, ctaSecondary }: {
  headline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}) {
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
        <h1 className="font-serif text-5xl md:text-7xl mb-10 leading-tight">{headline}</h1>
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
