const API = "https://terrenos-joa.vercel.app";
const WHATS = "5511921226156";

type Faixa = { min: number; max: number };
type Estudo = {
  lead: {
    nome: string; tipo: string; areaM2: number; quartos: number | null;
    arquiteto: string | null; reformado: boolean; local: string; criadoEm: string;
  };
  faixas: { agil: Faixa; mercado: Faixa; premium: Faixa } | null;
  modo: string;
  referencias: {
    condominio: { rotulo: string | null; medianaM2: number | null; amostra: number };
    regiao: { rotulo: string | null; medianaM2: number | null; amostra: number };
  };
  comparaveis: { tipo: string; areaM2: number; quartos: number | null; arquiteto: string | null; reformado: boolean; vagas: number | null; vista: string | null; loteM2: number | null; temMata: boolean; temRio: boolean; topoPlano: boolean; andar: number | null; diferenciais: string | null; preco: number; precoM2: number }[];
  regua: { rotulo: string; min: number; mediana: number | null; max: number; posicao: number | null } | null;
  panorama: { ofertaCondominio: number; ofertaRegiao: number; ticketMedioRegiao: number | null; pctAssinadosRegiao: number | null };
  premio: { assinadoPct: number | null; medianaAssinados: number | null; medianaNaoAssinados: number | null };
};

const brl = (v: number | null | undefined) =>
  v != null ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) : "—";
const num = (v: number | null | undefined) => (v != null ? v.toLocaleString("pt-BR") : "—");

export async function buscarEstudo(id: string): Promise<Estudo | null> {
  try {
    const r = await fetch(`${API}/api/estudo/${id}`, { cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()) as Estudo;
  } catch {
    return null;
  }
}

export function EstudoView({ e, marca }: { e: Estudo; marca: string }) {
  const destaque = e.lead.arquiteto || e.lead.reformado ? "premium" : "mercado";
  const dataFmt = new Date(e.lead.criadoEm).toLocaleDateString("pt-BR");
  const pos = e.regua && e.regua.posicao != null && e.regua.max > e.regua.min
    ? Math.min(97, Math.max(3, ((e.regua.posicao - e.regua.min) / (e.regua.max - e.regua.min)) * 100))
    : null;
  const msg = encodeURIComponent(`Olá! Recebi o estudo de mercado do meu imóvel (${e.lead.local}) e quero agendar a avaliação presencial.`);

  const cards = e.faixas
    ? [
        { k: "agil", titulo: "Venda Ágil", f: e.faixas.agil, desc: "Posicionamento para liquidez — atrai comprador em semanas." },
        { k: "mercado", titulo: "Valor de Mercado", f: e.faixas.mercado, desc: "Alinhado aos imóveis comparáveis da região." },
        { k: "premium", titulo: "Posicionamento Premium", f: e.faixas.premium, desc: "Para imóveis impecáveis, assinados ou reformados." },
      ]
    : [];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* 1 · capa */}
      <p className="section-label mb-2">Estudo de Mercado · {marca}</p>
      <h1 className="font-serif text-4xl md:text-5xl mb-2">{e.lead.local}</h1>
      <p className="text-sm text-brand-gray mb-1">
        Preparado para <strong>{e.lead.nome}</strong> · {dataFmt}
      </p>
      <p className="text-sm text-brand-gray mb-12">
        {e.lead.tipo} · {num(e.lead.areaM2)} m²{e.lead.quartos ? ` · ${e.lead.quartos} quartos` : ""}
        {e.lead.arquiteto ? ` · ✦ assinado por ${e.lead.arquiteto}` : ""}{e.lead.reformado ? " · reformado" : ""}
      </p>

      {/* 2 · estimativa em 3 faixas */}
      {cards.length > 0 && (
        <section className="mb-14">
          <p className="section-label mb-4">Sua estimativa</p>
          <div className="grid md:grid-cols-3 gap-4">
            {cards.map((c) => (
              <div key={c.k} className={`border p-5 ${c.k === destaque ? "border-brand-graphite" : "border-brand-gray-light"}`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="section-label">{c.titulo}</p>
                  {c.k === destaque && <span className="text-[10px] tracking-widest uppercase bg-brand-graphite text-white px-2 py-0.5">Recomendado</span>}
                </div>
                <p className="font-serif text-xl leading-snug">{brl(c.f.min)}<br /><span className="text-brand-gray text-sm">a</span> {brl(c.f.max)}</p>
                <p className="text-xs text-brand-gray mt-2">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-gray mt-3">
            Base de cálculo: mediana de {e.referencias.condominio.amostra >= 3 ? `${e.referencias.condominio.amostra} imóveis comparáveis em ${e.referencias.condominio.rotulo}` : `${e.referencias.regiao.amostra} imóveis comparáveis em ${e.referencias.regiao.rotulo}`}, monitorados pela nossa equipe.
          </p>
        </section>
      )}

      {/* 3 · comparáveis */}
      {e.comparaveis.length > 0 && (
        <section className="mb-14">
          <p className="section-label mb-4">Imóveis comparáveis à venda agora</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-brand-gray border-b border-brand-gray-light">
                  <th className="py-2 pr-4">Imóvel</th>
                  <th className="py-2 pr-4">Área</th>
                  <th className="py-2 pr-4">Diferenciais</th>
                  <th className="py-2 pr-4 text-right">vs. mediana</th>
                  <th className="py-2 pr-4 text-right">Preço pedido</th>
                  <th className="py-2 text-right">R$/m²</th>
                </tr>
              </thead>
              <tbody>
                {e.comparaveis.map((c, i) => {
                  const med = e.regua?.mediana ?? null;
                  const delta = med ? Math.round(((c.precoM2 - med) / med) * 100) : null;
                  const areas = e.comparaveis.map((x) => x.areaM2).sort((a2, b2) => a2 - b2);
                  const medArea = areas[Math.floor(areas.length / 2)];
                  const doAnuncio = (c.diferenciais ?? "").split(";").map((x) => x.trim()).filter(Boolean);
                  const difs = [
                    c.arquiteto ? `✦ ${c.arquiteto}` : null,
                    c.reformado ? "Reformado" : null,
                    ...doAnuncio,
                    c.vista ? `Vista ${c.vista.toLowerCase()}` : null,
                    c.loteM2 ? `Lote de ${num(c.loteM2)} m²` : null,
                    c.temMata ? "Mata nativa" : null,
                    c.temRio ? "Água no terreno" : null,
                    c.topoPlano ? "Terreno plano" : null,
                    c.andar && c.andar >= 8 ? `${c.andar}º andar` : null,
                    c.vagas && c.vagas >= 2 ? `${c.vagas} vagas` : null,
                  ].filter(Boolean).slice(0, 3);
                  if (difs.length === 0) {
                    difs.push(
                      c.areaM2 >= medArea * 1.15 ? "Entre as maiores metragens da amostra"
                        : c.areaM2 <= medArea * 0.85 ? "Metragem compacta para o padrão local"
                        : "Metragem típica do condomínio"
                    );
                  }
                  const vsMediana = delta == null ? "—" : delta > 1 ? `+${delta}%` : delta < -1 ? `−${Math.abs(delta)}%` : "na mediana";
                  return (
                    <tr key={i} className="border-b border-brand-gray-light/60">
                      <td className="py-2.5 pr-4 whitespace-nowrap">{c.tipo}{c.quartos ? ` · ${c.quartos}q` : ""}</td>
                      <td className="py-2.5 pr-4 whitespace-nowrap">{num(c.areaM2)} m²</td>
                      <td className="py-2.5 pr-4 text-xs text-brand-gray">{difs.join(" · ")}</td>
                      <td className="py-2.5 pr-4 text-right text-xs text-brand-gray">{vsMediana}</td>
                      <td className="py-2.5 pr-4 text-right">{brl(c.preco)}</td>
                      <td className="py-2.5 text-right">{num(c.precoM2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-gray mt-2">Anúncios reais ativos, anonimizados — nossa base é monitorada diariamente.</p>
        </section>
      )}

      {/* 4 · régua de posicionamento */}
      {e.regua && pos != null && (
        <section className="mb-14">
          <p className="section-label mb-4">Onde o seu imóvel se posiciona — {e.regua.rotulo}</p>
          <div className="relative h-2 bg-brand-gray-light rounded-full mt-8 mb-2">
            <div className="absolute -top-7 -translate-x-1/2 text-center" style={{ left: `${pos}%` }}>
              <span className="text-[10px] tracking-widest uppercase bg-brand-graphite text-white px-2 py-0.5 whitespace-nowrap">Seu imóvel</span>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-graphite" style={{ left: `${pos}%` }} />
          </div>
          <div className="flex justify-between text-xs text-brand-gray">
            <span>R$ {num(e.regua.min)}/m²</span>
            <span>mediana R$ {num(e.regua.mediana)}/m²</span>
            <span>R$ {num(e.regua.max)}/m²</span>
          </div>
        </section>
      )}

      {/* 5 · panorama */}
      <section className="mb-14">
        <p className="section-label mb-4">Panorama do mercado</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {[
            { v: String(e.panorama.ofertaCondominio), l: `à venda em ${e.referencias.condominio.rotulo ?? "seu local"}` },
            { v: String(e.panorama.ofertaRegiao), l: `à venda em ${e.referencias.regiao.rotulo ?? "sua região"}` },
            { v: brl(e.panorama.ticketMedioRegiao), l: "ticket médio da região" },
            { v: e.panorama.pctAssinadosRegiao != null ? `${e.panorama.pctAssinadosRegiao}%` : "—", l: "da oferta é assinada por arquiteto" },
          ].map((x) => (
            <div key={x.l} className="border border-brand-gray-light p-4">
              <p className="font-serif text-2xl">{x.v}</p>
              <p className="text-xs text-brand-gray mt-1">{x.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 · prêmio dos diferenciais */}
      {e.premio.assinadoPct != null && e.premio.assinadoPct > 0 && (
        <section className="mb-14 border border-brand-gray-light p-6">
          <p className="section-label mb-3">O valor da assinatura</p>
          <p className="font-serif text-3xl mb-2">+{e.premio.assinadoPct}%</p>
          <p className="text-sm text-brand-gray">
            Na {e.referencias.regiao.rotulo ?? "região"}, imóveis com projeto assinado pedem em mediana R$ {num(e.premio.medianaAssinados)}/m², contra R$ {num(e.premio.medianaNaoAssinados)}/m² dos demais — um prêmio de {e.premio.assinadoPct}% que o nosso banco de dados captura com precisão.
            {e.lead.arquiteto ? ` O seu imóvel, assinado por ${e.lead.arquiteto}, está nesse grupo.` : ""}
          </p>
        </section>
      )}

      {/* 7 · recomendação + CTA */}
      <section className="border-t border-brand-gray-light pt-10">
        <p className="section-label mb-3">Nossa recomendação</p>
        <p className="text-sm text-brand-gray leading-relaxed mb-8">
          {destaque === "premium"
            ? `Pelo conjunto de diferenciais${e.lead.arquiteto ? ` — projeto de ${e.lead.arquiteto}` : ""}${e.lead.reformado ? `${e.lead.arquiteto ? " e" : " —"} reforma recente` : ""} — recomendamos posicionamento na faixa Premium, com estratégia de venda paciente e divulgação seletiva. `
            : "Recomendamos posicionamento na faixa Valor de Mercado, alinhado aos comparáveis ativos — equilíbrio entre valorização e prazo de venda. "}
          A avaliação presencial refina esse número com o que os dados não veem: estado real, vista, acabamentos e o momento do condomínio.
        </p>
        <a href={`https://wa.me/${WHATS}?text=${msg}`} target="_blank" rel="noreferrer"
          className="inline-block bg-brand-graphite text-white text-xs tracking-widest uppercase px-10 py-4 hover:opacity-90 transition-opacity">
          Agendar avaliação presencial
        </a>
        <p className="text-xs text-brand-gray mt-6">
          Estudo gerado a partir de anúncios reais monitorados pela nossa equipe. Estimativa preliminar — não substitui avaliação presencial.
        </p>
      </section>
    </div>
  );
}
