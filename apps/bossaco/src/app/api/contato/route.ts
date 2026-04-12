import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nome, email, telefone, mensagem, imovel } = await req.json();

    if (!nome || !email || !telefone) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Bossa & Co. Site <noreply@bossaco.com.br>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: imovel
        ? `Interesse em imóvel: ${imovel}`
        : `Novo contato via site — ${nome}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; color: #2C2C2C;">
          <h2 style="font-size: 24px; font-weight: 400; margin-bottom: 24px;">
            ${imovel ? `Interesse em: ${imovel}` : "Novo contato via site"}
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #7A7A7A; font-size: 13px; width: 100px;">Nome</td><td style="padding: 8px 0; font-size: 15px;">${nome}</td></tr>
            <tr><td style="padding: 8px 0; color: #7A7A7A; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #1D3557;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #7A7A7A; font-size: 13px;">Telefone</td><td style="padding: 8px 0; font-size: 15px;">${telefone}</td></tr>
            ${mensagem ? `<tr><td style="padding: 8px 0; color: #7A7A7A; font-size: 13px; vertical-align: top;">Mensagem</td><td style="padding: 8px 0; font-size: 15px;">${mensagem}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #E8E8E8; margin: 24px 0;" />
          <p style="font-size: 12px; color: #7A7A7A;">Enviado via bossaco.com.br</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Falha ao enviar email." }, { status: 500 });
  }
}
