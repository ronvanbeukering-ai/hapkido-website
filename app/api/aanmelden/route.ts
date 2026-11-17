import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Rate limiter: max 3 registrations per 10 minutes per IP
const RATE_WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 3;

type RateEntry = { count: number; resetAt: number };
const rateLimitMap = new Map<string, RateEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

const MAX_NAAM = 100;
const MAX_EMAIL = 254;

function sanitize(s: string): string {
  return s.replace(/[\r\n]/g, " ").trim();
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let naam: string, email: string;
  try {
    ({ naam, email } = await req.json());
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!naam || !email) return NextResponse.json({ ok: false }, { status: 400 });
  if (typeof naam !== "string" || typeof email !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (naam.length > MAX_NAAM || email.length > MAX_EMAIL) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const safeNaam  = sanitize(naam);
  const safeEmail = sanitize(email);

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail   = process.env.ADMIN_EMAIL;

  if (!resendApiKey || !toEmail) {
    console.error("[aanmelden] E-mailconfig ontbreekt: RESEND_API_KEY / ADMIN_EMAIL zijn niet ingesteld.");
    return NextResponse.json(
      { ok: false, error: "E-mail verzenden is momenteel niet beschikbaar. Neem contact op via WhatsApp." },
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);
  const mailFrom = process.env.RESEND_FROM ?? "Hapkido Yong <noreply@hapkidonederland.nl>";

  try {
    await resend.emails.send({
      from: mailFrom,
      to: toEmail,
      subject: `Nieuwe aanmelding: ${safeNaam}`,
      text: [
        `Naam:   ${safeNaam}`,
        `E-mail: ${safeEmail}`,
        ``,
        `Activeer via het dashboard: https://hapkidonederland.nl/dashboard`,
        ``,
        `Ontvangen op: ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[aanmelden] e-mail mislukt:", err);
    return NextResponse.json(
      { ok: false, error: "Het verzenden van de bevestiging is mislukt. Neem contact op via WhatsApp." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
