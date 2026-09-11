import Image from "next/image";
import Link from "next/link";
import type { Imovel } from "@bossa/notion-client";
import { useTranslations } from "next-intl";
import clsx from "clsx";

interface PropertyCardProps {
  imovel: Imovel;
  href: string;
  showBadge?: boolean;
}

export function PropertyCard({ imovel, href, showBadge }: PropertyCardProps) {
  const t = useTranslations("imoveis.card");

  const preco =
    imovel.preco && imovel.preco > 0
      ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(imovel.preco)
      : null; // Harvey 11/09: sem preço = apreciação, sem "Sob consulta"

  return (
    <Link href={href} className="property-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-light">
        {imovel.fotos[0] ? (
          <Image
            src={imovel.fotos[0]}
            alt={imovel.titulo}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-brand-gray-light flex items-center justify-center">
            <span className="font-serif text-brand-gray text-lg opacity-40">{imovel.tipo || "Imóvel"}</span>
          </div>
        )}
        {(imovel.arquiteto || imovel.reformado) && (
          <div className="absolute bottom-3 left-3 flex flex-col gap-1 items-start">
            {imovel.arquiteto && (
              <span className="bg-brand-graphite/85 text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
                Assinado · {imovel.arquiteto}
              </span>
            )}
            {imovel.reformado && (
              <span className="bg-white/90 text-brand-graphite text-[10px] tracking-widest uppercase px-2.5 py-1">
                Reformado
              </span>
            )}
          </div>
        )}
        {showBadge && (
          <span className="absolute top-3 left-3 bg-brand-graphite text-white text-xs tracking-widest uppercase px-3 py-1">
            Exclusivo
          </span>
        )}
      </div>

      <div className="pt-4 pb-6">
        <p className="text-[10px] tracking-[0.2em] uppercase text-brand-latao font-semibold mb-1.5">
          Selecionado pela curadoria
        </p>
        <p className="section-label mb-1">
          {imovel.tipo} · {imovel.cidade}
          {imovel.bairro ? `, ${imovel.bairro}` : ""}
        </p>
        <h3 className="font-serif text-xl mb-2 text-brand-graphite group-hover:text-brand-latao transition-colors">
          {imovel.titulo}
        </h3>
        <div className="flex items-center gap-4 text-sm text-brand-gray mb-3">
          {imovel.area && <span>{imovel.area} {t("area")}</span>}
          {imovel.quartos && <span>{imovel.quartos} {t("quartos")}</span>}
          {imovel.vagas && <span>{imovel.vagas} {t("vagas")}</span>}
        </div>
        {preco && <p className="font-serif text-lg text-brand-graphite">{preco}</p>}
      </div>
    </Link>
  );
}
