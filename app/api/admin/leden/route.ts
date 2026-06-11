import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

async function checkAdmin(): Promise<boolean> {
  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return false;
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  if (adminEmail && session.user.email?.toLowerCase() === adminEmail) return true;
  const { data: profile } = await supabase
    .from("profiles").select("rol").eq("id", session.user.id).single();
  return profile?.rol === "admin";
}

export async function GET() {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createServiceClient();
  const { data, error } = await db.from("profiles").select("*").order("email");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...update } = await req.json() as { id: string; [key: string]: unknown };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const db = createServiceClient();
  const { error } = await db.from("profiles").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
