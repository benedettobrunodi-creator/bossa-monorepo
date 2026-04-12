import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

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
  descricao?: string;
  fotos: string[];
  destaque: boolean;
  offCatalog: boolean;
  amenidades?: string[];
  proprietario?: string;
}

function prop(page: PageObjectResponse, name: string): any {
  return (page.properties as any)[name];
}

function getText(page: PageObjectResponse, ...names: string[]): string {
  for (const name of names) {
    const p = prop(page, name);
    if (!p) continue;
    if (p.type === "title" && p.title?.[0]?.plain_text) return p.title[0].plain_text;
    if (p.type === "rich_text" && p.rich_text?.[0]?.plain_text) return p.rich_text[0].plain_text;
    if (p.type === "select" && p.select?.name) return p.select.name;
    if (p.type === "url" && p.url) return p.url;
  }
  return "";
}

function getNumber(page: PageObjectResponse, ...names: string[]): number | undefined {
  for (const name of names) {
    const p = prop(page, name);
    if (p && p.type === "number" && p.number != null) return p.number;
  }
  return undefined;
}

function getCheckbox(page: PageObjectResponse, name: string): boolean {
  const p = prop(page, name);
  if (!p || p.type !== "checkbox") return false;
  return p.checkbox ?? false;
}

function getUrls(page: PageObjectResponse, ...names: string[]): string[] {
  const urls: string[] = [];
  for (const name of names) {
    const p = prop(page, name);
    if (!p) continue;
    if (p.type === "url" && p.url) urls.push(p.url);
    if (p.type === "files") {
      p.files.forEach((f: any) => {
        const url = f.type === "external" ? f.external.url : f.file?.url;
        if (url) urls.push(url);
      });
    }
  }
  return urls;
}

function getMultiSelect(page: PageObjectResponse, name: string): string[] {
  const p = prop(page, name);
  if (!p || p.type !== "multi_select") return [];
  return p.multi_select.map((s: any) => s.name);
}

export function pageToImovel(page: PageObjectResponse): Imovel {
  return {
    id: page.id,
    slug: getText(page, "Slug"),
    titulo: getText(page, "Título", "Nome", "Title"),
    status: getText(page, "Status"),
    tipo: getText(page, "Tipo"),
    cidade: getText(page, "Cidade", "Região"),
    bairro: getText(page, "Bairro") || undefined,
    regiao: getText(page, "Região") || undefined,
    condominio: getText(page, "Condomínio") || undefined,
    area: getNumber(page, "Área (m²)", "Área", "Área construída"),
    areaConstruida: getNumber(page, "Área construída"),
    areaTotal: getNumber(page, "Área total"),
    quartos: getNumber(page, "Quartos"),
    vagas: getNumber(page, "Vagas"),
    preco: getNumber(page, "Valor (R$)", "Preço", "Valor"),
    descricao: getText(page, "Descrição") || undefined,
    fotos: getUrls(page, "Imagem Principal", "Link Fotos", "Fotos"),
    destaque: getCheckbox(page, "Destaque"),
    offCatalog: getCheckbox(page, "Off-Catalog"),
    amenidades: getMultiSelect(page, "Amenidades"),
    proprietario: getText(page, "Proprietário") || undefined,
  };
}

export async function getImoveis(
  databaseId: string,
  opts?: { offCatalog?: boolean; cidade?: string; tipo?: string }
): Promise<Imovel[]> {
  const filters: any[] = [];

  if (opts?.offCatalog) {
    filters.push({ property: "Off-Catalog", checkbox: { equals: true } });
  } else {
    filters.push({ property: "Status", select: { equals: "Disponível" } });
    filters.push({ property: "Off-Catalog", checkbox: { equals: false } });
  }

  if (opts?.cidade) {
    filters.push({ property: "Cidade", select: { equals: opts.cidade } });
  }
  if (opts?.tipo) {
    filters.push({ property: "Tipo", select: { equals: opts.tipo } });
  }

  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: filters.length === 1 ? filters[0] : { and: filters },
  });

  return response.results
    .filter((p): p is PageObjectResponse => p.object === "page")
    .map(pageToImovel)
    .filter((i) => i.slug);
}

export async function getImovel(
  databaseId: string,
  slug: string
): Promise<Imovel | null> {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });

  const page = response.results.find(
    (p): p is PageObjectResponse => p.object === "page"
  );
  return page ? pageToImovel(page) : null;
}

export async function getDestaques(databaseId: string): Promise<Imovel[]> {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: "Destaque", checkbox: { equals: true } },
      ],
    },
    page_size: 3,
  });

  return response.results
    .filter((p): p is PageObjectResponse => p.object === "page")
    .map(pageToImovel);
}
