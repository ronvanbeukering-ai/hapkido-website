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
  type: "lid" | "bibliotheek" | "zwarte-band",
  geldigTot?: string | null,
) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const datumTekst = geldigTot
    ? new Date(geldigTot).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const subject = type === "lid"
    ? "Welkom als lid bij Hapkido Yong!"
    : type === "zwarte-band"
    ? "Toegang tot de zwarte band bibliotheek is geactiveerd"
    : "Jouw toegang tot de online videobibliotheek is actief";

  const body = type === "lid"
    ? `Hallo,

Goed nieuws! Je bent ingeschreven als lid bij Hapkido Yong.

Je kunt nu inloggen op onze website om jouw account te bekijken:
https://hapkidonederland.nl/login

Heb je vragen? Stuur ons een bericht via info@hapkidonederland.nl of WhatsApp.

Met sportieve groet,
Master Ron van Beukering
Hapkido Yong — hapkidonederland.nl`
    : type === "zwarte-band"
    ? `Hallo,

Goed nieuws! Je hebt speciale toestemming gekregen voor de exclusieve zwarte band bibliotheek van Hapkido Yong.${
  datumTekst ? `\nJe toegang is geldig tot en met ${datumTekst}.` : ""
}

Log in en bekijk de zwarte band technieken:
https://hapkidonederland.nl/login

Na het inloggen vind je deze video's onder "Cursussen".

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
    emailVersturen?: "lid" | "bibliotheek" | "zwarte-band";
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
        (emailVersturen === "zwarte-band" ? update.zwarte_band_geldig_tot : update.lid_geldig_tot) as string | null,
      );
    } catch (mailErr) {
      console.error("[leden] activatiemail mislukt:", mailErr);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { email, naam, rol: rolKeuze } = await req.json() as { email: string; naam?: string; rol?: "lid" | "jeugdlid" };
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });

  const db = createServiceClient();
  const cleanEmail = email.trim().toLowerCase();

  const { data, error } = await db.auth.admin.inviteUserByEmail(cleanEmail, {
    data: { naam: naam?.trim() ?? "" },
    redirectTo: "https://hapkidonederland.nl/login",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Genereer direct een tijdelijk wachtwoord zodat het lid meteen kan
  // inloggen zonder te hoeven wachten op de uitnodigingsmail.
  const tempPw = "Hapkido" + Math.floor(1000 + Math.random() * 9000) + "!";

  if (data.user) {
    // Account activeren + tijdelijk wachtwoord instellen
    await db.auth.admin.updateUserById(data.user.id, {
      password: tempPw,
      email_confirm: true,
    });

    await db.from("profiles").upsert({
      id: data.user.id,
      email: cleanEmail,
      rol: rolKeuze ?? "lid",
      lid_geldig_tot: null,
      tijdelijk_wachtwoord: tempPw,
    });
  }

  return NextResponse.json({ ok: true, tijdelijk_wachtwoord: tempPw });
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
