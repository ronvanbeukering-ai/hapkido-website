import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return NextResponse.json({ isAdmin: false, email: null });

    const email = session.user.email ?? "";
    const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
    const isAdminByEmail = Boolean(adminEmail && email.toLowerCase() === adminEmail);

    const { data: profile } = await supabase
      .from("profiles").select("rol").eq("id", session.user.id).single();

    const isAdmin = isAdminByEmail || profile?.rol === "admin";
    return NextResponse.json({ isAdmin, email });
  } catch {
    return NextResponse.json({ isAdmin: false, email: null });
  }
}
