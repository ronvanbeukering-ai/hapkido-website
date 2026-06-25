import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { naam, email, password } = await req.json().catch(() => ({}));
  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "generic" }, { status: 400 });
  }

  // Server-side, zelfde reden als /api/auth/login en /api/auth/reset-password —
  // een directe browser→Supabase aanroep hiervoor bleek onbetrouwbaar/kon
  // blijven hangen vanuit NL.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: { data: { naam: typeof naam === "string" ? naam.trim() : "" } },
  });

  if (error) {
    const alreadyRegistered = error.message.includes("already registered");
    return NextResponse.json({ error: alreadyRegistered ? "already_registered" : "generic" }, { status: 400 });
  }

  // Profile row is created automatically by de handle_new_user() trigger
  // (SECURITY DEFINER) — geen client-side DB write nodig hier.
  return NextResponse.json({ ok: true });
}
