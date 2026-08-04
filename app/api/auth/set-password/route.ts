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

  // getSession() reads the session straight from the cookie (fast, no
  // network call) but does NOT hydrate the GoTrueClient's in-memory state.
  // updateUser() relies on that in-memory state and fails with
  // "Auth session missing!" unless we explicitly rehydrate it first via
  // setSession() using the tokens we just read from the cookie.
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Je bent niet (meer) ingelogd. Log opnieuw in en probeer het nogmaals." },
      { status: 401 }
    );
  }
  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return NextResponse.json(
      { error: "Er ging iets mis. Vraag een nieuwe reset-link aan." },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}
