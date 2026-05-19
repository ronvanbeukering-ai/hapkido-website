"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, ArrowRight, Crown, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { LessenLijst, VideoGalerij, type VideoItem } from "@/components/CursusPlayer";
import type { Les } from "@/lib/cursussen";
import { hapkidoLessen, hapkidoVideos } from "@/lib/cursussen";

type Profiel = {
  id: string;
  email: string;
  rol: "admin" | "lid" | "geen";
  lid_geldig_tot: string | null;
};

type Props = {
  lessen: Les[];
  videos: { id: string; titel: string; beschrijving: string; categorie: string }[];
};

function isLidActief(profiel: Profiel | null): boolean {
  if (!profiel) return false;
  if (profiel.rol === "admin") return true;
  if (profiel.rol === "lid") {
    if (!profiel.lid_geldig_tot) return true;
    return new Date(profiel.lid_geldig_tot) > new Date();
  }
  return false;
}

export function CursusContent({ lessen: staticLessen, videos: staticVideos }: Props) {
  const [profiel, setProfiel] = useState<Profiel | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbVideos, setDbVideos] = useState<VideoItem[] | null>(null);
  const [dbLessen, setDbLessen] = useState<Les[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function laadData() {
      // Auth
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfiel(data ?? { id: user.id, email: user.email ?? "", rol: "geen", lid_geldig_tot: null });
      }

      // Videos van database
      const { data: vids } = await supabase
        .from("hapkido_videos")
        .select("id, titel, beschrijving, categorie, platform, volgorde")
        .eq("zichtbaar", true)
        .order("volgorde");
      if (vids && vids.length > 0) setDbVideos(vids as VideoItem[]);

      // Lessen van database
      const { data: les } = await supabase
        .from("hapkido_lessen")
        .select("nr, titel, duur, categorie, gratis")
        .order("nr");
      if (les && les.length > 0) setDbLessen(les as Les[]);

      setLoading(false);
    }

    laadData();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => laadData());
    return () => subscription.unsubscribe();
  }, [supabase]);

  const isLid = isLidActief(profiel);
  const isIngelogd = !!profiel;

  // Gebruik DB data als beschikbaar, anders statische fallback
  const allVideos: VideoItem[] = dbVideos
    ? dbVideos
    : staticVideos.map((v) => ({ ...v, platform: "youtube" }));
  const allLessen: Les[] = dbLessen ?? staticLessen;

  // Niet-leden zien alleen YouTube video's (geen eigen/private content)
  const publiekeVideos = allVideos.filter((v) => v.platform === "youtube");

  // Leden: gratis-markering op alle lessen
  const lessenVoorLid = isLid ? allLessen.map((l) => ({ ...l, gratis: true })) : allLessen;

  if (loading) {
    return (
      <div className="section">
        <div className="container-x flex justify-center">
          <div className="w-8 h-8 border-2 border-[color:var(--color-accent-600)] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Status banner */}
      {isLid && (
        <div className="bg-emerald-50 border-b border-emerald-200">
          <div className="container-x py-3 flex items-center gap-2 text-sm text-emerald-800">
            <CheckCircle size={16} />
            {profiel?.rol === "admin"
              ? "Je bent ingelogd als beheerder — volledige toegang."
              : "Je bent actief lid — volledige toegang tot alle lessen en video's."}
            {profiel?.rol === "admin" && (
              <Link href="/dashboard" className="ml-auto font-semibold hover:underline flex items-center gap-1">
                <Crown size={14} /> Dashboard
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Cursusinfo + lessenlijst */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="badge-red mb-4">Cursus</div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
                Hapkido — Basis tot Gevorderd
              </h2>
              <p className="mt-4 text-[color:var(--color-text)] leading-relaxed">
                Beheers de kunst van Hapkido Combinatie — van basisgrepen en valbreektechnieken
                tot gevorderde joint-locks en wapentechnieken. Opgebouwd door{" "}
                <strong>Master Ron van Beukering</strong> (6e Dan) voor leden van Hapkido Yong.
              </p>
            </div>

            <div className="card p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[color:var(--color-muted)]">Instructeur</span>
                <span className="font-semibold">Master Ron van Beukering</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--color-muted)]">Niveau</span>
                <span className="font-semibold">Basis → Gevorderd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--color-muted)]">Lessen</span>
                <span className="font-semibold">
                  {allLessen.length} lessen · {allLessen.reduce((s, l) => s + parseInt(l.duur), 0)} min
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--color-muted)]">Toegang</span>
                <span className={`font-semibold ${isLid ? "text-emerald-600" : "text-[color:var(--color-accent-700)]"}`}>
                  {isLid ? "✓ Volledige toegang" : "Lidmaatschap vereist"}
                </span>
              </div>
            </div>

            {!isLid && (
              <div className="rounded-xl border border-[color:var(--color-accent-200)] bg-[color:var(--color-accent-50)] p-5 space-y-3">
                {isIngelogd ? (
                  <>
                    <p className="text-sm text-[color:var(--color-accent-800)] leading-relaxed">
                      <strong>Je account is aangemaakt</strong>, maar je lidmaatschap is nog niet actief.
                      Betaal je contributie of neem contact op met Ron.
                    </p>
                    <Link href="/contributie" className="btn-primary !py-2 !px-4 text-sm inline-flex">
                      Contributie bekijken <ArrowRight size={14} />
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-[color:var(--color-accent-800)] leading-relaxed">
                      <strong>Lessen 1 &amp; 2 zijn gratis.</strong> Voor volledige toegang heb je een
                      actief lidmaatschap nodig.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/login" className="btn-primary !py-2 !px-4 text-sm inline-flex">
                        Inloggen <ArrowRight size={14} />
                      </Link>
                      <Link href="/contributie" className="btn-secondary !py-2 !px-4 text-sm inline-flex">
                        Lid worden
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <div className="card overflow-hidden">
              <div className="px-5 py-4 border-b border-[color:var(--color-border)] flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-display)] text-2xl">
                  Lessen ({allLessen.length})
                </h3>
                {isLid && (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded">
                    Volledige toegang
                  </span>
                )}
              </div>
              <LessenLijst lessen={lessenVoorLid} />
            </div>
          </div>
        </div>
      </section>

      {/* Niet-leden: vergrendelde preview */}
      {!isLid && (
        <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
          <div className="container-x">
            <div className="badge-red mb-4">Videobibliotheek</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
              Hapkido in beeld
            </h2>
            <p className="mt-4 text-[color:var(--color-muted)] max-w-2xl">
              Als lid krijg je toegang tot alle trainingsopnames en demonstratie-video&apos;s.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {publiekeVideos.slice(0, 3).map((v) => (
                <div
                  key={v.id}
                  className="group rounded-xl overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] relative"
                >
                  <div className="aspect-video relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                      alt={v.titel}
                      className="w-full h-full object-cover blur-sm scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                        <Lock size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm text-[color:var(--color-heading)] truncate">{v.titel}</h4>
                    <p className="mt-1 text-xs text-[color:var(--color-muted)]">Alleen voor leden</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Link href="/login" className="btn-primary">Inloggen</Link>
              <Link href="/contributie" className="btn-secondary">
                Lid worden <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Leden: volledige videobibliotheek */}
      {isLid && (
        <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
          <div className="container-x">
            <div className="badge-red mb-4">Videobibliotheek</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
              Hapkido in beeld
            </h2>
            <p className="mt-4 text-[color:var(--color-muted)] max-w-2xl">
              Demonstraties, trainingsopnames en eigen video&apos;s — klik om af te spelen.
            </p>
            <div className="mt-10">
              <VideoGalerij videos={allVideos} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
