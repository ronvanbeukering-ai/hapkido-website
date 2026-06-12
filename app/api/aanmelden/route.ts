import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    }
  }

  return NextResponse.json({ ok: true });
}
