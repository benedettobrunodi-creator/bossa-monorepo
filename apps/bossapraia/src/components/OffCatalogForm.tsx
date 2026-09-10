"use client";
import { useState } from "react";

const API = "https://terrenos-joa.vercel.app";

// Ficha de cadastro do off-catalog (Bruno 10/09): a página nunca diz "não temos
// imóveis" — o acervo é apresentado como reservado a membros, e o visitante
// deixa o cadastro pra receber acesso.
export function OffCatalogForm({ workspace }: { workspace: "BOSSA_CO" | "BOSSA_CAMPO" | "BOSSA_PRAIA" }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [interesse, setInteresse] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setErro("");
    try {
      const r = await fetch(`${API}/api/off-catalog/membros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspace, nome, email, telefone, interesse }),
      });
      if (!r.ok) throw new Error();
      setEnviado(true);
    } catch {
      setErro("Não conseguimos enviar agora. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="max-w-xl">
        <p className="font-serif text-2xl text-brand-graphite mb-3">Cadastro recebido.</p>
        <p className="text-sm text-brand-gray leading-relaxed">
          Nossa curadoria entra em contato para apresentar as propriedades reservadas que fazem sentido para você.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="max-w-xl space-y-4">
      <input value={nome} onChange={(e) => setNome(e.target.value)} required minLength={2}
        placeholder="Nome"
        className="w-full border border-brand-gray-light bg-transparent px-4 py-3 text-sm outline-none focus:border-brand-graphite transition" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email"
        placeholder="E-mail"
        className="w-full border border-brand-gray-light bg-transparent px-4 py-3 text-sm outline-none focus:border-brand-graphite transition" />
      <input value={telefone} onChange={(e) => setTelefone(e.target.value)}
        placeholder="WhatsApp (opcional)"
        className="w-full border border-brand-gray-light bg-transparent px-4 py-3 text-sm outline-none focus:border-brand-graphite transition" />
      <textarea value={interesse} onChange={(e) => setInteresse(e.target.value)} rows={3}
        placeholder="O que você procura? Região, tipo de casa, arquiteto… (opcional)"
        className="w-full border border-brand-gray-light bg-transparent px-4 py-3 text-sm outline-none focus:border-brand-graphite transition resize-none" />
      {erro && <p className="text-sm text-red-700">{erro}</p>}
      <button type="submit" disabled={enviando}
        className="bg-brand-graphite text-white text-sm tracking-wide px-8 py-3 hover:opacity-90 transition disabled:opacity-50">
        {enviando ? "Enviando…" : "Solicitar acesso"}
      </button>
    </form>
  );
}
