import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code       = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type       = searchParams.get("type") as EmailOtpType | null;
  const next       = searchParams.get("next") ?? "/dashboard";

  // Maak de success-response alvast aan zodat we cookies er direct op kunnen zetten
  const successResponse = NextResponse.redirect(`${origin}${next}`);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        // Cookies worden direct op het redirect-response object gezet
        setAll(toSet) {
          toSet.forEach(({ name, value, options }) =>
            successResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  if (code) {
    // PKCE flow (OAuth, magic link)
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return successResponse;
  } else if (token_hash && type) {
    // OTP flow (wachtwoord reset via e-mailtemplate met {{ .TokenHash }})
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) return successResponse;
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
