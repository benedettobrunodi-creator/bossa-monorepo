import { getTranslations } from "next-intl/server";
import { getDestaques, getImoveis } from "@bossa/notion-client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { PropertyCarousel } from "@/components/PropertyCarousel";
import Link from "next/link";

export const revalidate = 30;

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations();
  const destaques = await getDestaques("BOSSA_CO");
  // capas dos anúncios publicados rodando no hero (pedido Bruno 08/09)
  const capas = (await getImoveis("BOSSA_CO")).map((i) => i.fotos[0]).filter(Boolean).slice(0, 8);

  return (
    <>
      <Header />
      <HeroSlideshow
        images={capas}
        headline={t("hero.headline")}
        ctaPrimary={t("hero.cta_primary")}
        ctaSecondary={t("hero.cta_secondary")}
      />
      <PropertyCarousel imoveis={destaques} />
      <section className="py-24 bg-brand-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">O que fazemos</p>
          <h2 className="font-serif text-4xl mb-14">Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { titulo: "Tenant Representation", desc: "Representamos o inquilino e o comprador, não o proprietário. Nosso compromisso é exclusivamente com você — e o serviço é gratuito." },
              { titulo: "Consultoria de Compra", desc: "Curadoria de imóveis alinhados ao seu perfil, objetivo e estilo de vida. Do briefing à assinatura do contrato." },
              { titulo: "Off-Catalog", desc: "Acesso a imóveis exclusivos não divulgados no mercado aberto. Para quem exige discrição e raridade." },
            ].map((s) => (
              <div key={s.titulo} className="border-t border-brand-gray-light pt-8">
                <h3 className="font-serif text-2xl mb-4">{s.titulo}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="section-label mb-3">Sobre nós</p>
          <p className="font-serif text-3xl text-brand-graphite leading-snug mb-8">
            Somos uma boutique imobiliária de alto padrão com presença em São Paulo e Miami, focada em curadoria e representação de clientes.
          </p>
          <Link href="/sobre" className="btn-primary">Conhecer a Bossa & Co.</Link>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
