import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// ── Simple in-memory rate limiter (per IP) ──────────────────────────────────
// Allows at most MAX_REQUESTS per window per IP address.
// Note: this resets on cold-starts; for stricter limiting use Upstash/Redis.
const RATE_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

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

// Allowed locatie values – validated against a whitelist to prevent injection
const ALLOWED_LOCATIES = new Set(["Berkel-Enschot", "Waalwijk", "onbekend"]);
const ALLOWED_DAGEN = new Set(["Maandag", "Woensdag", "Zaterdag", "Maakt niet uit", ""]);
const ALLOWED_VOOR = new Set(["mezelf", "kind", ""]);

// Field length limits
const MAX_NAAM = 100;
const MAX_EMAIL = 254; // RFC 5321
const MAX_TELEFOON = 20;
const MAX_LEEFTIJD = 3;
const MAX_OPMERKING = 1000;

type Payload = {
  naam?: string;
  email?: string;
  telefoon?: string;
  leeftijd?: string;
  voor?: string;
  locatie?: string;
  dag?: string;
  opmerking?: string;
};

export async function POST(req: Request) {
  // Rate limiting – use CF-Connecting-IP (Vercel/Cloudflare) or x-forwarded-for
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Te veel aanvragen. Probeer het over een minuut opnieuw." },
      { status: 429 }
    );
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ongeldig verzoek." }, { status: 400 });
  }

  const { naam, email, telefoon, locatie, leeftijd, voor, dag, opmerking } = body;

  // Required fields
  if (!naam || !email || !telefoon || !locatie) {
    return NextResponse.json(
      { ok: false, error: "Verplichte velden ontbreken." },
      { status: 400 }
    );
  }

  // Length validation (prevents excessively large payloads)
  if (naam.length > MAX_NAAM) {
    return NextResponse.json({ ok: false, error: "Naam te lang." }, { status: 400 });
  }
  if (email.length > MAX_EMAIL) {
    return NextResponse.json({ ok: false, error: "E-mailadres te lang." }, { status: 400 });
  }
  if (telefoon.length > MAX_TELEFOON) {
    return NextResponse.json({ ok: false, error: "Telefoonnummer te lang." }, { status: 400 });
  }
  if (opmerking && opmerking.length > MAX_OPMERKING) {
    return NextResponse.json({ ok: false, error: "Opmerking te lang (max 1000 tekens)." }, { status: 400 });
  }
  if (leeftijd && leeftijd.length > MAX_LEEFTIJD) {
    return NextResponse.json({ ok: false, error: "Ongeldige leeftijd." }, { status: 400 });
  }

  // Email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Ongeldig e-mailadres." }, { status: 400 });
  }

  // Whitelist validation for enum fields
  if (!ALLOWED_LOCATIES.has(locatie)) {
    return NextResponse.json({ ok: false, error: "Ongeldige locatie." }, { status: 400 });
  }
  if (dag !== undefined && !ALLOWED_DAGEN.has(dag)) {
    return NextResponse.json({ ok: false, error: "Ongeldige dag." }, { status: 400 });
  }
  if (voor !== undefined && !ALLOWED_VOOR.has(voor)) {
    return NextResponse.json({ ok: false, error: "Ongeldig veld 'voor'." }, { status: 400 });
  }

  // Leeftijd must be a number in range
  if (leeftijd !== undefined && leeftijd !== "") {
    const age = parseInt(leeftijd, 10);
    if (isNaN(age) || age < 4 || age > 99) {
      return NextResponse.json({ ok: false, error: "Ongeldige leeftijd." }, { status: 400 });
    }
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

      // Mail naar admin
      await transporter.sendMail({
        from: `Hapkido Yong <${gmailUser}>`,
        to: toEmail,
        subject: `Nieuwe proeflesaanvraag: ${naam} (${locatie})`,
        text: [
          `Naam:      ${naam}`,
          `E-mail:    ${email}`,
          `Telefoon:  ${telefoon}`,
          `Leeftijd:  ${leeftijd ?? "—"}`,
          `Voor:      ${voor ?? "—"}`,
          `Locatie:   ${locatie}`,
          `Dag:       ${dag ?? "—"}`,
          `Opmerking: ${opmerking ?? "—"}`,
          "",
          `Ontvangen op: ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}`,
        ].join("\n"),
      });

      // Bevestigingsmail naar de aanvrager
      await transporter.sendMail({
        from: `Hapkido Yong <${gmailUser}>`,
        to: email,
        subject: "Je proeflesaanvraag bij Hapkido Yong is ontvangen",
        text: [
          `Hallo ${naam},`,
          "",
          `Bedankt voor je aanvraag! We hebben je aanmelding voor een proefles in ${locatie} in goede orde ontvangen.`,
          "",
          "We nemen zo snel mogelijk contact met je op om een datum en tijd af te spreken.",
          "",
          "Heb je vragen? Bel of WhatsApp ons gerust:",
          "Tel: 06-19073256",
          "WhatsApp: https://wa.me/message/GBCYDJPCHVCCA1",
          "",
          "Met sportieve groet,",
          "Master Ron van Beukering",
          "Hapkido Yong — hapkidonederland.nl",
        ].join("\n"),
      });
    } catch (err) {
      console.error("[proefles] e-mail mislukt:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
