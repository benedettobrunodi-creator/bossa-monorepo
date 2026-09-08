"use client";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface PropertyGalleryProps {
  fotos: string[];
  titulo: string;
}

export function PropertyGallery({ fotos, titulo }: PropertyGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!fotos.length) return null;

  const slides = fotos.map((src) => ({ src }));

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-1 h-[60vh] cursor-pointer">
        <div className="col-span-2 row-span-2 relative" onClick={() => { setIndex(0); setOpen(true); }}>
          <Image src={fotos[0]} alt={titulo} fill className="object-cover" sizes="50vw" priority />
        </div>
        {fotos.slice(1, 5).map((foto, i) => (
          <div key={i} className="relative" onClick={() => { setIndex(i + 1); setOpen(true); }}>
            <Image src={foto} alt={`${titulo} ${i + 2}`} fill className="object-cover" sizes="25vw" />
            {i === 3 && fotos.length > 5 && (
              <div className="absolute inset-0 bg-brand-graphite/60 flex items-center justify-center">
                <span className="text-white font-serif text-xl">+{fotos.length - 5}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
      />
    </>
  );
}
