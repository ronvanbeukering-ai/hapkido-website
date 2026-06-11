import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// The migrate endpoint must NEVER be publicly accessible in production.
// It is gated by SUPABASE_ACCESS_TOKEN on the server, but blocking it at the
// edge layer adds an extra layer of protection.
const BLOCKED_IN_PRODUCTION = ["/api/migrate"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block the migration endpoint unless we're in local development
  if (BLOCKED_IN_PRODUCTION.some((p) => pathname.startsWith(p))) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip Supabase when env vars are missing (e.g. during static prerendering)
  if (!supabaseUrl || !supabaseKey) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(toSet) {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // getSession() validates the JWT locally from the cookie — no network call.
  // Fast enough for route protection on a club website; revoked tokens are
  // caught at the next full page load when the cookie expires.
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const superadminEmail = process.env.ADMIN_EMAIL ?? "";

    // Super admin: skip the extra DB call — email match is enough
    if (superadminEmail && user.email?.toLowerCase() === superadminEmail.toLowerCase()) {
      return supabaseResponse;
    }

    // For other users: check profile role in DB
    const { data: profile } = await supabase
      .from("profiles")
      .select("rol")
      .eq("id", user.id)
      .single();

    if (profile?.rol !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/migrate"],
};
