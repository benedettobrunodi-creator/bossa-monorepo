import { getDestaques } from "@bossa/notion-client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { PropertyCarousel } from "@/components/PropertyCarousel";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const destaques = await getDestaques("BOSSA_CAMPO");

  return (
    <>
      <Header />
      <HeroSlideshow />
      <PropertyCarousel imoveis={destaques} />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label mb-3">O que fazemos</p>
          <h2 className="font-serif text-4xl mb-14">Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { titulo: "Consultoria Residencial", desc: "Curadoria de propriedades no interior de São Paulo alinhadas ao seu estilo de vida, com acompanhamento completo do processo." },
              { titulo: "Campo & Interior", desc: "Especializados em chácaras, sítios, condomínios de campo e casas em cidades históricas. Conhecemos cada região como poucos." },
              { titulo: "Off-Catalog", desc: "Propriedades exclusivas compartilhadas apenas com nossos clientes — sem divulgação no mercado aberto." },
            ].map((s) => (
              <div key={s.titulo} className="border-t border-brand-sand pt-8">
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
            Somos uma boutique imobiliária especializada no interior de São Paulo — Campinas, Itu, Indaiatuba e região — com foco em qualidade de vida e escolha consciente.
          </p>
          <Link href="/sobre" className="btn-green">Conhecer a Bossa Campo</Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
