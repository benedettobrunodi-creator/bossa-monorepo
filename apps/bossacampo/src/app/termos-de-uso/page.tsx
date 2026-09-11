export const metadata = { title: "Termos de Uso — Bossa Campo" };

// Enquadramento jurídico (Harvey, 11/09/26): o site é apreciação de arquitetura
// e análise de mercado — não é oferta de venda nem intermediação (ponto 7).
export default function TermosDeUso() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "96px 24px 64px", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Termos de Uso</h1>
      <p>A Bossa Campo é uma plataforma editorial de <strong>curadoria de arquitetura residencial e consultoria de análise de mercado imobiliário</strong>.</p>
      <h2 style={{ fontSize: 18, marginTop: 28 }}>Natureza do conteúdo</h2>
      <p>As propriedades apresentadas neste site têm caráter de <strong>apreciação arquitetônica e estudo de mercado</strong>. A exibição de um imóvel não constitui oferta de venda, anúncio de corretagem nem proposta de intermediação imobiliária, salvo quando expressamente indicado no próprio imóvel, com o número de CRECI correspondente.</p>
      <h2 style={{ fontSize: 18, marginTop: 28 }}>Análises e valores</h2>
      <p>Faixas de valores, métricas de R$/m² e indicadores eventualmente publicados referem-se a <strong>análises agregadas de mercado</strong> (região e segmento), produzidas pelo nosso observatório a partir de dados públicos — nunca à precificação de um imóvel específico. As análises e valores têm caráter meramente informativo, não constituem recomendação de investimento nem garantia de preço, e podem divergir de avaliações formais.</p>
      <h2 style={{ fontSize: 18, marginTop: 28 }}>Contato</h2>
      <p>Os canais de contato do site destinam-se a conversas sobre curadoria, avaliação de mercado e análises do segmento. Para tratar de dados pessoais, consulte a nossa <a href="/politica-de-privacidade">Política de Privacidade</a>.</p>
      <h2 style={{ fontSize: 18, marginTop: 28 }}>Propriedade intelectual</h2>
      <p>Textos, análises e a identidade visual são de titularidade da Bossa Campo. Imagens de propriedades são exibidas para fins de apreciação, com os devidos créditos quando aplicável.</p>
      <p style={{ marginTop: 28, fontSize: 14, opacity: 0.7 }}>Bossa Campo · Última atualização: setembro de 2026.</p>
    </main>
  );
}
