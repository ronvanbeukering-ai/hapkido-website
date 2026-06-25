import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { site } from "@/lib/site";

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "E-mailadres is verplicht." }, { status: 400 });
  }

  // Server-side, net als /api/auth/login — een directe browser→Supabase
  // aanroep hiervoor bleek onbetrouwbaar/kon blijven hangen vanuit NL.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${site.url}/nieuw-wachtwoord`,
  });

  if (error) {
    return NextResponse.json({ error: "Er ging iets mis. Probeer het opnieuw." }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
