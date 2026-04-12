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
    !imovel.preco || imovel.preco === 0
      ? t("sobConsulta")
      : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(imovel.preco);

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
        {showBadge && (
          <span className="absolute top-3 left-3 bg-brand-graphite text-white text-xs tracking-widest uppercase px-3 py-1">
            Exclusivo
          </span>
        )}
      </div>

      <div className="pt-4 pb-6">
        <p className="section-label mb-1">
          {imovel.tipo} · {imovel.cidade}
          {imovel.bairro ? `, ${imovel.bairro}` : ""}
        </p>
        <h3 className="font-serif text-xl mb-2 text-brand-graphite group-hover:text-brand-blue transition-colors">
          {imovel.titulo}
        </h3>
        <div className="flex items-center gap-4 text-sm text-brand-gray mb-3">
          {imovel.area && <span>{imovel.area} {t("area")}</span>}
          {imovel.quartos && <span>{imovel.quartos} {t("quartos")}</span>}
          {imovel.vagas && <span>{imovel.vagas} {t("vagas")}</span>}
        </div>
        <p className="font-serif text-lg text-brand-graphite">{preco}</p>
      </div>
    </Link>
  );
}
