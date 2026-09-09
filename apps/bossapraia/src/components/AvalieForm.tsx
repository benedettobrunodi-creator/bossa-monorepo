"use client";
import { useEffect, useState } from "react";

const API = "https://terrenos-joa.vercel.app";

type Local = { id: string | null; rotulo: string; nome: string; cidade: string | null };
type Faixa = { min: number; max: number };
type Resultado = {
  modo: "FAIXA" | "PERSONALIZADA";
  faixaMin: number | null;
  faixaMax: number | null;
  faixas: { agil: Faixa; mercado: Faixa; premium: Faixa } | null;
  referencias: {
    condominio: { rotulo: string | null; medianaM2: number | null; amostra: number };
    regiao: { rotulo: string | null; medianaM2: number | null; amostra: number };
  };
};

// Nomes canônicos — mesmo dicionário de normalização do app de captação
const ARQUITETOS = [
  "Bernardes Arquitetura",
  "David Bastos",
  "Debora Aguiar",
  "Felipe Hess",
  "Fernanda Marques",
  "Gui Mattos",
  "Isay Weinfeld",
  "Jacobsen Arquitetura",
  "João Armentano",
  "Marcio Kogan (studio mk27)",
  "Nitsche Arquitetos",
  "Pascali Semerdjian",
  "Patricia Anastassiadis",
  "Paulo Mendes da Rocha",
  "Roberto Migotto",
  "Ruy Ohtake",
  "Sig Bergamin",
  "Studio Arthur Casas",
  "Triptyque",
];

const brl = (v: number | null) =>
  v != null ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) : "—";

export function AvalieForm({ workspace, whatsappMarca }: { workspace: "BOSSA_CO" | "BOSSA_CAMPO" | "BOSSA_PRAIA"; whatsappMarca: string }) {
  const [locais, setLocais] = useState<Local[]>([]);
  const [busca, setBusca] = useState("");
  const [local, setLocal] = useState<Local | null>(null);
  const [outroLocal, setOutroLocal] = useState(false);
  const [tipo, setTipo] = useState(workspace === "BOSSA_CO" ? "APARTAMENTO" : "CASA");
  const [area, setArea] = useState("");
  const [quartos, setQuartos] = useState("");
  const [arqSel, setArqSel] = useState("");
  const [arqOutro, setArqOutro] = useState("");
  const arquiteto = arqSel === "OUTRO" ? arqOutro.trim() : arqSel;
  const [reformado, setReformado] = useState(false);
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  useEffect(() => {
    fetch(`${API}/api/avaliar/locais?workspace=${workspace}`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setLocais)
      .catch(() => {});
  }, [workspace]);

  const sugestoes =
    busca.length >= 2 && !local
      ? locais.filter((l) => l.rotulo.toLowerCase().includes(busca.toLowerCase())).slice(0, 6)
      : [];

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (!local && busca.length < 2) { setErro(workspace === "BOSSA_CO" ? "Escolha o bairro." : "Escolha o condomínio."); return; }
    if (!area || Number(area) <= 0) { setErro("Informe a área construída."); return; }
    if (nome.trim().length < 2 || whatsapp.replace(/\D/g, "").length < 10) { setErro("Preencha nome e WhatsApp."); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) { setErro("Informe um e-mail válido — o estudo completo vai pra lá."); return; }
    setEnviando(true);
    try {
      const r = await fetch(`${API}/api/avaliar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspace,
          empreendimentoId: local?.id ?? null,
          bairro: local?.id ? null : (local?.nome ?? busca),
          cidade: local?.cidade ?? undefined,
          tipo, areaUtilM2: Number(area),
          quartos: quartos ? Number(quartos) : null,
          nome: nome.trim(), whatsapp: whatsapp.replace(/\D/g, ""), email: email.trim().toLowerCase(),
          arquiteto: arquiteto || null, reformado,
          origem: workspace === "BOSSA_CO" ? "bossaeco.com.br" : workspace === "BOSSA_PRAIA" ? "bossapraia.com.br" : "bossacampo.com.br",
        }),
      });
      if (!r.ok) throw new Error();
      setResultado(await r.json());
    } catch {
      setErro("Não foi possível calcular agora. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (resultado) {
    const { referencias: ref } = resultado;
    const localNome = ref.condominio.rotulo ?? busca;
    const msg = encodeURIComponent(
      `Olá! Acabei de avaliar meu imóvel no site (${localNome}, ${area} m²) e quero receber o estudo de mercado completo.`
    );
    return (
      <div className="max-w-xl mx-auto text-center">
        {resultado.modo === "FAIXA" ? (
          <>
            <p className="section-label mb-3">Estimativa preliminar</p>
            <p className="text-sm text-brand-gray mb-8">
              Três posicionamentos possíveis, calculados com base em anúncios reais monitorados pela nossa equipe.
            </p>
            {resultado.faixas && (() => {
              const destaque = arquiteto || reformado ? "premium" : "mercado";
              const cards = [
                { k: "agil", titulo: "Venda Ágil", f: resultado.faixas.agil, desc: "Posicionamento para liquidez — atrai comprador em semanas." },
                { k: "mercado", titulo: "Valor de Mercado", f: resultado.faixas.mercado, desc: "Alinhado aos imóveis comparáveis da região." },
                { k: "premium", titulo: "Posicionamento Premium", f: resultado.faixas.premium, desc: "Para imóveis impecáveis, assinados ou reformados — venda mais paciente." },
              ];
              return (
                <div className="grid md:grid-cols-3 gap-4 text-left mb-10">
                  {cards.map((c) => (
                    <div key={c.k} className={`border p-5 ${c.k === destaque ? "border-brand-graphite" : "border-brand-gray-light"}`}>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="section-label">{c.titulo}</p>
                        {c.k === destaque && (
                          <span className="text-[10px] tracking-widest uppercase bg-brand-graphite text-white px-2 py-0.5">Recomendado</span>
                        )}
                      </div>
                      <p className="font-serif text-xl leading-snug">{brl(c.f.min)}<br /><span className="text-brand-gray text-sm">a</span> {brl(c.f.max)}</p>
                      <p className="text-xs text-brand-gray mt-2">{c.desc}</p>
                    </div>
                  ))}
                </div>
              );
            })()}
            <div className="grid grid-cols-2 gap-4 text-left mb-10">
              <div className="border border-brand-gray-light p-5">
                <p className="section-label mb-2">{ref.condominio.rotulo ?? "Seu local"}</p>
                <p className="font-serif text-2xl">{ref.condominio.medianaM2 ? `R$ ${ref.condominio.medianaM2.toLocaleString("pt-BR")}/m²` : "—"}</p>
                <p className="text-xs text-brand-gray mt-1">mediana · {ref.condominio.amostra} imóveis comparáveis</p>
              </div>
              <div className="border border-brand-gray-light p-5">
                <p className="section-label mb-2">{ref.regiao.rotulo ?? "Região"}</p>
                <p className="font-serif text-2xl">{ref.regiao.medianaM2 ? `R$ ${ref.regiao.medianaM2.toLocaleString("pt-BR")}/m²` : "—"}</p>
                <p className="text-xs text-brand-gray mt-1">mediana · {ref.regiao.amostra} imóveis comparáveis</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="section-label mb-3">Análise personalizada</p>
            <p className="font-serif text-3xl mb-4">Seu imóvel pede um olhar de especialista.</p>
            <p className="text-sm text-brand-gray mb-10">
              Para essa localização, nossa curadoria prepara uma análise individual — sem estimativas genéricas.
              Um especialista retorna ainda hoje.
            </p>
          </>
        )}
        {(arquiteto || reformado) && resultado.modo === "FAIXA" && (
          <p className="text-sm text-brand-gray mb-8 -mt-4">
            {arquiteto ? `Imóveis assinados por ${arquiteto}` : "Imóveis reformados"} costumam
            se posicionar acima da faixa — no estudo completo detalhamos esse diferencial.
          </p>
        )}
        <div className="border border-brand-gray-light p-6 mb-8 text-left">
          <p className="section-label mb-2">Estudo de mercado completo</p>
          <p className="text-sm text-brand-gray">
            Receba a análise detalhada do seu imóvel: comparáveis reais, evolução de preços da região e
            recomendação de posicionamento — elaborada pelo observatório de mercado que monitora mais de
            19.000 imóveis diariamente.
          </p>
        </div>
        <a
          href={`https://wa.me/${whatsappMarca}?text=${msg}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-brand-graphite text-white text-xs tracking-widest uppercase px-10 py-4 hover:opacity-90 transition-opacity"
        >
          Receber estudo completo no WhatsApp
        </a>
        <p className="text-xs text-brand-gray mt-6">
          📩 O estudo completo em PDF foi enviado para o seu e-mail. Estimativa preliminar, não substitui avaliação presencial.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="max-w-xl mx-auto flex flex-col gap-5">
      <div className="relative">
        <label className="section-label block mb-2">{workspace === "BOSSA_CO" ? "Bairro" : "Condomínio"}</label>
        {workspace === "BOSSA_CO" ? (
          <>
            <input
              value={local ? local.rotulo : busca}
              onChange={(e) => { setBusca(e.target.value); setLocal(null); }}
              placeholder="Ex.: Vila Nova Conceição"
              className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm focus:outline-none focus:border-brand-graphite"
            />
            {sugestoes.length > 0 && (
              <div className="absolute z-10 inset-x-0 top-full bg-white border border-brand-gray-light shadow-lg">
                {sugestoes.map((s) => (
                  <button key={s.rotulo} type="button" onClick={() => { setLocal(s); setBusca(""); }}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-brand-gray-light/30">
                    {s.rotulo}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <select
              value={outroLocal ? "OUTRO" : local?.rotulo ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "OUTRO") { setLocal(null); setBusca(""); setOutroLocal(true); }
                else if (v === "") { setLocal(null); setBusca(""); setOutroLocal(false); }
                else { setLocal(locais.find((l) => l.rotulo === v) ?? null); setBusca(""); setOutroLocal(false); }
              }}
              className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm focus:outline-none"
            >
              <option value="">Selecione o condomínio</option>
              {locais.map((l) => (
                <option key={l.rotulo} value={l.rotulo}>{l.rotulo}</option>
              ))}
              <option value="OUTRO">Outro…</option>
            </select>
            {outroLocal && (
              <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Nome do condomínio"
                autoFocus
                className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm mt-1 focus:outline-none focus:border-brand-graphite" />
            )}
          </>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="section-label block mb-2">Tipo</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}
            className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm focus:outline-none">
            {workspace === "BOSSA_CO" ? (
              <>
                <option value="APARTAMENTO">Apartamento</option>
                <option value="COBERTURA">Cobertura</option>
                <option value="CASA">Casa</option>
              </>
            ) : workspace === "BOSSA_PRAIA" ? (
              <>
                <option value="CASA">Casa</option>
                <option value="APARTAMENTO">Apartamento</option>
                <option value="COBERTURA">Cobertura</option>
                <option value="LOTE">Terreno</option>
              </>
            ) : (
              <>
                <option value="CASA">Casa</option>
                <option value="LOTE">Terreno</option>
              </>
            )}
          </select>
        </div>
        <div>
          <label className="section-label block mb-2">{tipo === "LOTE" ? "Área (m²)" : "Área construída (m²)"}</label>
          <input value={area} onChange={(e) => setArea(e.target.value.replace(/\D/g, ""))} inputMode="numeric"
            placeholder="Ex.: 350"
            className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm focus:outline-none focus:border-brand-graphite" />
        </div>
        <div>
          <label className="section-label block mb-2">Quartos</label>
          <input value={quartos} onChange={(e) => setQuartos(e.target.value.replace(/\D/g, ""))} inputMode="numeric"
            placeholder="Ex.: 4"
            className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm focus:outline-none focus:border-brand-graphite" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="section-label block mb-2">Arquiteto (se assinado)</label>
          <select value={arqSel} onChange={(e) => setArqSel(e.target.value)}
            className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm focus:outline-none">
            <option value="">Não se aplica / não sei</option>
            {ARQUITETOS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
            <option value="OUTRO">Outro…</option>
          </select>
          {arqSel === "OUTRO" && (
            <input value={arqOutro} onChange={(e) => setArqOutro(e.target.value)} placeholder="Nome do arquiteto"
              autoFocus
              className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm mt-1 focus:outline-none focus:border-brand-graphite" />
          )}
        </div>
        <div className="flex items-end pb-3">
          <button type="button" onClick={() => setReformado(!reformado)}
            className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${reformado ? "border-brand-graphite bg-brand-graphite text-white" : "border-brand-gray-light text-brand-gray hover:border-brand-graphite"}`}>
            {reformado ? "✓ Reformado" : "Reformado?"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="section-label block mb-2">Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)}
            className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm focus:outline-none focus:border-brand-graphite" />
        </div>
        <div>
          <label className="section-label block mb-2">WhatsApp</label>
          <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} inputMode="tel" placeholder="(11) 9…"
            className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm focus:outline-none focus:border-brand-graphite" />
        </div>
      </div>
      <div>
        <label className="section-label block mb-2">E-mail — o estudo completo em PDF vai pra cá</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" placeholder="voce@exemplo.com.br"
          className="w-full border-b border-brand-gray-light bg-transparent py-3 text-sm focus:outline-none focus:border-brand-graphite" />
      </div>
      {erro && <p className="text-xs text-red-500">{erro}</p>}
      <button type="submit" disabled={enviando}
        className="self-center mt-4 bg-brand-graphite text-white text-xs tracking-widest uppercase px-12 py-4 hover:opacity-90 transition-opacity disabled:opacity-50">
        {enviando ? "Calculando…" : "Ver estimativa"}
      </button>
      <p className="text-xs text-brand-gray text-center">
        Sem custo e sem compromisso. Seus dados ficam só com a gente.
      </p>
    </form>
  );
}
