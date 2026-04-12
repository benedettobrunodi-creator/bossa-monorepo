"use client";
import { useState } from "react";
import { ContactForm } from "./ContactForm";

interface InterestModalProps {
  imovelTitulo: string;
  imovelSlug: string;
}

export function InterestModal({ imovelTitulo, imovelSlug }: InterestModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary w-full text-center">
        Tenho interesse
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white max-w-md w-full p-10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="section-label mb-1">Interesse</p>
                <p className="font-serif text-2xl">{imovelTitulo}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-brand-gray hover:text-brand-graphite transition-colors text-2xl leading-none mt-1"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
            <ContactForm
              imovelSlug={imovelSlug}
              imovelTitulo={imovelTitulo}
              compact
            />
          </div>
        </div>
      )}
    </>
  );
}
