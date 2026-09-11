// @/lib/vitrine — desde 08/09/26 os imóveis vêm do app de captação Bossa
// (https://terrenos-joa.vercel.app/api/vitrine), não mais do Notion.
// A interface pública (Imovel, getImoveis, getDestaques, getImovel) foi mantida;
// o parâmetro "databaseId" das funções agora recebe o workspace ("BOSSA_CO" | "BOSSA_CAMPO"),
// vindo das envs NOTION_DB_BOSSA_CO / NOTION_DB_BOSSA_CAMPO (reaproveitadas).

export interface Imovel {
  id: string;
  slug: string;
  titulo: string;
  status: string;
  tipo: string;
  cidade: string;
  bairro?: string;
  regiao?: string;
  condominio?: string;
  area?: number;
  areaConstruida?: number;
  areaTotal?: number;
  quartos?: number;
  vagas?: number;
  preco?: number;
  creci?: string; // Fase 2: nº CRECI exibido quando venda autorizada
  descricao?: string;
  fotos: string[];
  arquiteto?: string;
  reformado?: boolean;
  destaque: boolean;
  offCatalog: boolean;
  amenidades?: string[];
  proprietario?: string;
}

const VITRINE_URL = process.env.VITRINE_URL ?? "https://terrenos-joa.vercel.app/api/vitrine";

function workspaceDe(param: string): string {
  const p = (param || "").toUpperCase();
  if (p.includes("PRAIA")) return "BOSSA_PRAIA";
  if (p.includes("CAMPO")) return "BOSSA_CAMPO";
  return "BOSSA_CO";
}

async function buscarVitrine(workspace: string): Promise<Imovel[]> {
  try {
    const r = await fetch(`${VITRINE_URL}?workspace=${workspace}`, {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return [];
    const dados = await r.json();
    if (!Array.isArray(dados)) return [];
    return dados as Imovel[];
  } catch (e) {
    console.error("vitrine indisponível:", e);
    return [];
  }
}

export async function getImoveis(
  databaseId: string,
  opts?: { offCatalog?: boolean; cidade?: string; tipo?: string }
): Promise<Imovel[]> {
  let lista = await buscarVitrine(workspaceDe(databaseId));
  if (opts?.offCatalog) lista = lista.filter((i) => i.offCatalog);
  else lista = lista.filter((i) => !i.offCatalog);
  if (opts?.cidade) lista = lista.filter((i) => i.cidade === opts.cidade);
  if (opts?.tipo) lista = lista.filter((i) => i.tipo === opts.tipo);
  return lista.filter((i) => i.slug);
}

export async function getImovel(databaseId: string, slug: string): Promise<Imovel | null> {
  const lista = await buscarVitrine(workspaceDe(databaseId));
  return lista.find((i) => i.slug === slug) ?? null;
}

export async function getDestaques(databaseId: string): Promise<Imovel[]> {
  const lista = await buscarVitrine(workspaceDe(databaseId));
  const destaques = lista.filter((i) => i.destaque && !i.offCatalog);
  // sem destaques marcados, mostra os mais recentes da vitrine
  return (destaques.length ? destaques : lista.filter((i) => !i.offCatalog)).slice(0, 8);
}
