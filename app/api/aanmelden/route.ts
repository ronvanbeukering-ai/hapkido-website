import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let naam: string, email: string;
  try {
    ({ naam, email } = await req.json());
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const toEmail   = process.env.ADMIN_EMAIL;

  if (gmailUser && gmailPass && toEmail) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });
      await transporter.sendMail({
        from: `Hapkido Yong <${gmailUser}>`,
        to: toEmail,
        subject: `Nieuwe aanmelding: ${naam}`,
        text: [
          `Naam:   ${naam}`,
          `E-mail: ${email}`,
          ``,
          `Activeer via het dashboard: https://hapkidonederland.nl/dashboard`,
          ``,
          `Ontvangen op: ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("[aanmelden] e-mail mislukt:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
