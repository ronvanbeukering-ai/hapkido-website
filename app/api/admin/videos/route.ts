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

function extractYoutubeId(raw: string): string {
  const m = raw.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : raw;
}

// Vimeo's oEmbed thumbnail is omitted when a video is domain-restricted in
// its privacy settings; a Referer matching the allowed embed domain
// satisfies that check server-side (there's no browser Referer to rely on).
async function vimeoThumbnail(rawUrl: string): Promise<string | null> {
  const url = rawUrl.replace(/^vimeo-/, "");
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${url}`)}`,
      { headers: { Referer: "https://hapkidonederland.nl/" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.thumbnail_url) return null;
    return (data.thumbnail_url as string).replace(/_\d+x\d+/, "_640");
  } catch {
    return null;
  }
}

async function resolveThumbnail(video: { platform?: string; url?: string }): Promise<string | null> {
  if (!video.url) return null;
  if (video.platform === "youtube" || !video.platform) {
    return `https://img.youtube.com/vi/${extractYoutubeId(video.url)}/mqdefault.jpg`;
  }
  if (video.platform === "vimeo") {
    return vimeoThumbnail(video.url);
  }
  return null;
}

export async function GET() {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createServiceClient();
  const { data, error } = await db.from("hapkido_videos").select("*").order("volgorde", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  // Auto-fetch a thumbnail whenever the video source changed (new video, or
  // an edit that changed platform/url) so admins never have to think about it.
  // If the fetch fails, omit the field entirely rather than writing null —
  // an edit to e.g. the title shouldn't wipe out a thumbnail that already exists.
  const thumbnail_url = await resolveThumbnail(body);
  const record = thumbnail_url ? { ...body, thumbnail_url } : body;

  const db = createServiceClient();
  const { error } = await db.from("hapkido_videos").upsert(record);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!await checkAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const db = createServiceClient();
  const { error } = await db.from("hapkido_videos").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
