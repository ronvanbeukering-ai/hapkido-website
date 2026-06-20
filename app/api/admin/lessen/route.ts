import { NextRequest, NextResponse } from "next/server";
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

export async function GET() {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createServiceClient();
  const { data, error } = await db.from("hapkido_lessen").select("*").order("nr", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const db = createServiceClient();
  const { error } = await db.from("hapkido_lessen").upsert(body);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
