import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EstudoView, buscarEstudo } from "@/components/EstudoView";

export const metadata: Metadata = { title: "Estudo de Mercado", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EstudoPage({ params }: { params: { id: string } }) {
  const estudo = await buscarEstudo(params.id);
  if (!estudo) notFound();
  return (
    <>
      <Header />
      <main className="pt-24 bg-white">
        <EstudoView e={estudo} marca="Bossa Campo" />
      </main>
      <Footer />
    </>
  );
}
