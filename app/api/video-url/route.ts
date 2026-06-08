import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { isCursusAbonnee } from "@/lib/auth";

// Signed URLs zijn 1 uur geldig
const SIGNED_URL_TTL = 3600;

// Alleen bestanden met deze extensies worden geserveerd
const ALLOWED_EXT = [".mp4", ".mov", ".webm"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Geen pad opgegeven." }, { status: 400 });
  }

  // Voorkom path traversal
  const safe = path.replace(/\.\./g, "").replace(/^\/+/, "");
  const hasAllowedExt = ALLOWED_EXT.some((ext) =>
    safe.toLowerCase().endsWith(ext)
  );
  if (!hasAllowedExt) {
    return NextResponse.json({ error: "Ongeldig bestandstype." }, { status: 400 });
  }

  // Auth check via server-side Supabase client
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });
  }

  // Rol ophalen uit database
  const { data: profile } = await supabase
    .from("profiles")
    .select("rol, lid_geldig_tot, email")
    .eq("id", user.id)
    .single();

  const email = profile?.email ?? user.email ?? "";
  const rol = profile?.rol ?? "geen";
  const geldigTot = profile?.lid_geldig_tot ?? null;

  if (!isCursusAbonnee(email, rol, geldigTot)) {
    return NextResponse.json({ error: "Geen toegang tot cursusmateriaal." }, { status: 403 });
  }

  // Signed URL genereren met service-role key (admin toegang tot private bucket)
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await admin.storage
    .from("hapkido-cursus-videos")
    .createSignedUrl(safe, SIGNED_URL_TTL);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "Video niet gevonden." }, { status: 404 });
  }

  return NextResponse.json({ url: data.signedUrl });
}
