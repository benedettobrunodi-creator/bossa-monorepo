"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/imoveis", label: "Propriedades" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "#3D5A47" }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-wide" style={{ color: "#C9B99A" }}>
          Bossa Campo
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm tracking-wide transition-colors"
              style={{ color: pathname.startsWith(l.href) ? "#F7F4EF" : "#C9B99A" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/off-catalog"
            className="text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 hover:bg-[#C9B99A] hover:text-[#3D5A47]"
            style={{ borderColor: "#C9B99A", color: "#C9B99A" }}>
            Off-Catalog
          </Link>
        </nav>
        <button className="md:hidden p-2" style={{ color: "#C9B99A" }} onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-3 h-px bg-current" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ backgroundColor: "#3D5A47", borderColor: "#4e7260" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm tracking-wide" style={{ color: "#C9B99A" }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/off-catalog" className="text-sm tracking-wide" style={{ color: "#F7F4EF" }} onClick={() => setOpen(false)}>Off-Catalog</Link>
        </div>
      )}
    </header>
  );
}
