"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface ImoveisFiltersProps {
  cidadeAtiva?: string;
  tipoAtivo?: string;
  cidades?: string[]; // derivadas do que está publicado
  tipos?: string[];
}

export function ImoveisFilters({ cidadeAtiva, tipoAtivo, cidades, tipos }: ImoveisFiltersProps) {
  const CIDADES = cidades ?? [];
  const TIPOS = tipos ?? [];
  const t = useTranslations("imoveis.filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const btnBase =
    "text-xs tracking-widest uppercase px-4 py-2 border transition-colors";
  const active = "border-brand-graphite bg-brand-graphite text-white";
  const inactive = "border-brand-gray-light text-brand-gray hover:border-brand-graphite hover:text-brand-graphite";

  return (
    <div className="flex flex-wrap gap-3 mb-2">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-brand-gray tracking-wide mr-1">{t("regiao")}:</span>
        <button
          className={`${btnBase} ${!cidadeAtiva ? active : inactive}`}
          onClick={() => setFilter("cidade", null)}
        >
          {t("todas")}
        </button>
        {CIDADES.map((c) => (
          <button
            key={c}
            className={`${btnBase} ${cidadeAtiva === c ? active : inactive}`}
            onClick={() => setFilter("cidade", cidadeAtiva === c ? null : c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center ml-4">
        <span className="text-xs text-brand-gray tracking-wide mr-1">{t("tipo")}:</span>
        <button
          className={`${btnBase} ${!tipoAtivo ? active : inactive}`}
          onClick={() => setFilter("tipo", null)}
        >
          {t("todos")}
        </button>
        {TIPOS.map((tp) => (
          <button
            key={tp}
            className={`${btnBase} ${tipoAtivo === tp ? active : inactive}`}
            onClick={() => setFilter("tipo", tipoAtivo === tp ? null : tp)}
          >
            {tp}
          </button>
        ))}
      </div>
    </div>
  );
}
