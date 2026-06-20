import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

async function checkAdmin(): Promise<boolean> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  if (adminEmail && user.email?.toLowerCase() === adminEmail) return true;
  const { data: profile } = await supabase
    .from("profiles").select("rol").eq("id", user.id).single();
  return profile?.rol === "admin";
}

async function stuurActivatieEmail(
  naarEmail: string,
  type: "lid" | "bibliotheek",
  geldigTot?: string | null,
) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const isLid = type === "lid";
  const datumTekst = geldigTot
    ? new Date(geldigTot).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const subject = isLid
    ? "Welkom als lid bij Hapkido Yong!"
    : "Jouw toegang tot de online videobibliotheek is actief";

  const body = isLid
    ? `Hallo,

Goed nieuws! Je bent ingeschreven als lid bij Hapkido Yong.

Je kunt nu inloggen op onze website om jouw account te bekijken:
https://hapkidonederland.nl/login

Heb je vragen? Stuur ons een bericht via info@hapkidonederland.nl of WhatsApp.

Met sportieve groet,
Master Ron van Beukering
Hapkido Yong — hapkidonederland.nl`
    : `Hallo,

Goed nieuws! Jouw toegang tot de online videobibliotheek van Hapkido Yong is geactiveerd.${
  datumTekst ? `\nJe toegang is geldig tot en met ${datumTekst}.` : ""
}

Log in en begin direct met trainen:
https://hapkidonederland.nl/login

Na het inloggen vind je alle lessen en video's onder "Cursussen".

Heb je vragen? Stuur ons een bericht via info@hapkidonederland.nl of WhatsApp.

Met sportieve groet,
Master Ron van Beukering
Hapkido Yong — hapkidonederland.nl`;

  await transporter.sendMail({
    from: `Hapkido Yong <${gmailUser}>`,
    to: naarEmail,
    subject,
    text: body,
  });
}

export async function GET() {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createServiceClient();
  const { data, error } = await db.from("profiles").select("*").order("email");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, emailVersturen, ...update } = await req.json() as {
    id: string;
    emailVersturen?: "lid" | "bibliotheek";
    [key: string]: unknown;
  };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const db = createServiceClient();

  // Haal email op als we een activatiemail sturen
  let memberEmail = "";
  if (emailVersturen) {
    const { data } = await db.from("profiles").select("email").eq("id", id).single();
    memberEmail = data?.email ?? "";
  }

  const { error } = await db.from("profiles").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Stuur activatiemail (fout hierin blokkeert de update niet)
  if (emailVersturen && memberEmail) {
    try {
      await stuurActivatieEmail(
        memberEmail,
        emailVersturen,
        update.lid_geldig_tot as string | null,
      );
    } catch (mailErr) {
      console.error("[leden] activatiemail mislukt:", mailErr);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { email, naam } = await req.json() as { email: string; naam?: string };
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });

  const db = createServiceClient();
  const { data, error } = await db.auth.admin.inviteUserByEmail(email.trim().toLowerCase(), {
    data: { naam: naam?.trim() ?? "" },
    redirectTo: "https://hapkidonederland.nl/login",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (data.user) {
    await db.from("profiles").upsert({
      id: data.user.id,
      email: email.trim().toLowerCase(),
      rol: "lid",
      lid_geldig_tot: null,
    });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const db = createServiceClient();
  const { error } = await db.auth.admin.deleteUser(id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
