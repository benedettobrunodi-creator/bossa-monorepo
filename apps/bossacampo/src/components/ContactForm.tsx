"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(8, "Telefone obrigatório"),
  mensagem: z.string().min(10, "Mensagem muito curta"),
  imovel: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  imovelSlug?: string;
  imovelTitulo?: string;
  compact?: boolean;
}

export function ContactForm({ imovelSlug, imovelTitulo, compact }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { imovel: imovelTitulo },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <p className="font-serif text-2xl text-brand-graphite mb-2">Mensagem enviada.</p>
        <p className="text-sm text-brand-gray">Em breve entraremos em contato.</p>
      </div>
    );
  }

  const inputClass =
    "w-full border-b border-brand-gray-light bg-transparent py-3 text-sm text-brand-graphite placeholder:text-brand-gray focus:outline-none focus:border-brand-green transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {imovelTitulo && <input type="hidden" {...register("imovel")} />}

      <div>
        <input {...register("nome")} placeholder="Nome" className={inputClass} />
        {errors.nome && <p className="text-xs text-red-500 mt-1">{errors.nome.message}</p>}
      </div>
      <div>
        <input {...register("email")} type="email" placeholder="Email" className={inputClass} />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register("telefone")} placeholder="Telefone / WhatsApp" className={inputClass} />
        {errors.telefone && <p className="text-xs text-red-500 mt-1">{errors.telefone.message}</p>}
      </div>
      {!compact && (
        <div>
          <textarea
            {...register("mensagem")}
            placeholder="Mensagem"
            rows={4}
            className={`${inputClass} resize-none`}
          />
          {errors.mensagem && <p className="text-xs text-red-500 mt-1">{errors.mensagem.message}</p>}
        </div>
      )}
      {status === "error" && (
        <p className="text-xs text-red-500">Erro ao enviar. Tente novamente.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-green self-start disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
