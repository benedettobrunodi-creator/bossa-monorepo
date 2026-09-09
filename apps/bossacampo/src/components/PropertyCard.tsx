import Image from "next/image";
import Link from "next/link";
import type { Imovel } from "@bossa/notion-client";

interface PropertyCardProps {
  imovel: Imovel;
  href: string;
  showBadge?: boolean;
}

export function PropertyCard({ imovel, href, showBadge }: PropertyCardProps) {
  const preco =
    !imovel.preco || imovel.preco === 0
      ? "Sob consulta"
      : new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        }).format(imovel.preco);

  const localizacao = imovel.regiao || imovel.cidade || imovel.bairro || "";

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
            <span className="font-serif text-brand-gray text-lg opacity-40">{imovel.tipo || "Propriedade"}</span>
          </div>
        )}
        {(imovel.arquiteto || imovel.reformado) && (
          <div className="absolute bottom-3 left-3 flex flex-col gap-1 items-start">
            {imovel.arquiteto && (
              <span className="bg-brand-green/90 text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
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
          <span className="absolute top-3 left-3 bg-brand-green text-white text-xs tracking-widest uppercase px-3 py-1">
            Exclusivo
          </span>
        )}
      </div>

      <div className="pt-4 pb-6">
        <p className="text-[10px] tracking-[0.2em] uppercase text-brand-terracota font-semibold mb-1.5">
          Selecionado pela curadoria
        </p>
        <p className="section-label mb-1">
          {imovel.tipo}
          {localizacao ? ` · ${localizacao}` : ""}
          {imovel.condominio ? ` · ${imovel.condominio}` : ""}
        </p>
        <h3 className="font-serif text-xl mb-2 text-brand-graphite group-hover:text-brand-green transition-colors">
          {imovel.titulo}
        </h3>
        <div className="flex items-center gap-4 text-sm text-brand-gray mb-3">
          {imovel.areaConstruida && <span>{imovel.areaConstruida} m² const.</span>}
          {imovel.areaTotal && <span>{imovel.areaTotal} m² total</span>}
          {!imovel.areaConstruida && imovel.area && <span>{imovel.area} m²</span>}
          {imovel.quartos && <span>{imovel.quartos} quartos</span>}
        </div>
        {imovel.amenidades && imovel.amenidades.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {imovel.amenidades.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-xs px-2 py-0.5 bg-brand-offwhite border border-brand-gray-light text-brand-gray"
              >
                {a}
              </span>
            ))}
          </div>
        )}
        <p className="font-serif text-lg text-brand-graphite">{preco}</p>
      </div>
    </Link>
  );
}
