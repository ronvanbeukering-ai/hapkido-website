import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email en wachtwoord zijn verplicht" }, { status: 400 });
  }

  // Auth call happens server-side (Vercel → Supabase), not from the browser.
  // This bypasses slow browser→Supabase network paths.
  const cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (toSet) => { cookiesToSet.push(...toSet); },
      },
    }
  );

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return NextResponse.json({ error: "E-mailadres of wachtwoord klopt niet." }, { status: 401 });
  }

  // Bepaal waar de gebruiker na inloggen moet landen, zodat leden/cursusabonnees
  // niet via /dashboard (alleen voor admins) eerst naar de homepage gestuurd worden.
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  let isAdmin = !!adminEmail && (data.user.email ?? "").toLowerCase() === adminEmail;
  if (!isAdmin) {
    const { data: profile } = await supabase.from("profiles").select("rol").eq("id", data.user.id).single();
    isAdmin = profile?.rol === "admin";
  }

  const response = NextResponse.json({ ok: true, isAdmin });
  cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
  return response;
}
