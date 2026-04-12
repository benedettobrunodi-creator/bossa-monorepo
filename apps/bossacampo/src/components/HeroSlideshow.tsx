"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=2560&q=80",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=2560&q=80",
  "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=2560&q=80",
  "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=2560&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=2560&q=80",
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
