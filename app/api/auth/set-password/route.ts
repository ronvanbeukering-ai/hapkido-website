import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Wachtwoord instellen gebeurt server-side (Vercel → Supabase) — directe
// browser→Supabase aanroepen voor auth zijn hier onbetrouwbaar/traag
// gebleken (zelfde reden als /api/auth/login).
export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}));

  if (!password || typeof password !== "string" || password.length < 8) {
    return NextResponse.json(
      { error: "Wachtwoord moet minimaal 8 tekens zijn." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return NextResponse.json(
      { error: "Er ging iets mis. Vraag een nieuwe reset-link aan." },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}
