"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const REGIOES = ["Campinas", "Itu", "Indaiatuba", "Salto", "Porto Feliz", "Itatiba"];
const TIPOS = ["Residencial", "Casa", "Chácara", "Sítio", "Condomínio"];

interface ImoveisFiltersProps {
  regiaoAtiva?: string;
  tipoAtivo?: string;
}

export function ImoveisFilters({ regiaoAtiva, tipoAtivo }: ImoveisFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  const btnBase = "text-xs tracking-widest uppercase px-4 py-2 border transition-colors";
  const active = "border-brand-green bg-brand-green text-white";
  const inactive = "border-brand-gray-light text-brand-gray hover:border-brand-green hover:text-brand-green";

  return (
    <div className="flex flex-wrap gap-3 mb-2">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-brand-gray tracking-wide mr-1">Região:</span>
        <button className={`${btnBase} ${!regiaoAtiva ? active : inactive}`} onClick={() => setFilter("regiao", null)}>
          Todas
        </button>
        {REGIOES.map((r) => (
          <button
            key={r}
            className={`${btnBase} ${regiaoAtiva === r ? active : inactive}`}
            onClick={() => setFilter("regiao", regiaoAtiva === r ? null : r)}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center ml-4">
        <span className="text-xs text-brand-gray tracking-wide mr-1">Tipo:</span>
        <button className={`${btnBase} ${!tipoAtivo ? active : inactive}`} onClick={() => setFilter("tipo", null)}>
          Todos
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
