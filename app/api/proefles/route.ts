import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { naam, email, telefoon, locatie } = body;
  if (!naam || !email || !telefoon || !locatie) {
    return NextResponse.json(
      { ok: false, error: "Verplichte velden ontbreken." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Ongeldig e-mailadres." }, { status: 400 });
  }

  // TODO: wire to email provider (Resend / Postmark / etc.)
  // For now: log + return success so the UX is intact.
  console.log("[proefles aanvraag]", new Date().toISOString(), body);

  return NextResponse.json({ ok: true });
}
