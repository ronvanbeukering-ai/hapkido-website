"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Lock, ArrowRight, Crown, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { LessenLijst, VideoGalerij, type VideoItem } from "@/components/CursusPlayer";
import type { Les } from "@/lib/cursussen";
import { isLidOfAdmin, isAdminOrSuperAdmin, isCursusAbonnee } from "@/lib/auth";

type Profiel = {
  id: string;
  email: string;
  rol: "admin" | "lid" | "cursus" | "geen";
  lid_geldig_tot: string | null;
};

type Props = {
  lessen: Les[];
  videos: { id: string; titel: string; beschrijving: string; categorie: string; platform?: string }[];
};

export function CursusContent({ lessen: staticLessen, videos: staticVideos }: Props) {
  const [profiel, setProfiel] = useState<Profiel | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (data) setProfiel(data);
      }
    }
    checkAuth();
  }, [supabase]);

  const isLid = isLidOfAdmin(profiel?.email, profiel?.rol, profiel?.lid_geldig_tot);
  const isCursus = isCursusAbonnee(profiel?.email, profiel?.rol, profiel?.lid_geldig_tot);
  const isAdmin = isAdminOrSuperAdmin(profiel?.email, profiel?.rol);
  const isIngelogd = !!profiel;
  const heeftCursustoegang = isCursus;

  const allVideos: VideoItem[] = staticVideos.map((v) => ({ ...v, platform: v.platform ?? "youtube" }));
  const publiekeVideos = allVideos.filter((v) => v.platform === "youtube");
  const lessenVoorLid = heeftCursustoegang
    ? staticLessen.map((l) => ({ ...l, gratis: true }))
    : staticLessen;

  return (
    <>
      {/* Status banner */}
      {heeftCursustoegang && (
        <div className="bg-emerald-50 border-b border-emerald-200">
          <div className="container-x py-3 flex items-center gap-2 text-sm text-emerald-800">
            <CheckCircle size={16} />
            {isAdmin
              ? "Je bent ingelogd als beheerder — volledige toegang."
              : isLid
              ? "Je bent actief lid — volledige toegang tot alle lessen en video's."
              : "Je hebt een cursusabonnement — volledige toegang tot alle online lessen."}
            {isAdmin && (
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
                Hapkido Basis tot Gevorderd
              </h2>
              <p className="mt-4 text-[color:var(--color-text)] leading-relaxed">
                Beheers de kunst van Hapkido Combinatie van basisgrepen en valbreektechnieken
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
                  {lessenVoorLid.length} lessen · {lessenVoorLid.reduce((s, l) => s + parseInt(l.duur), 0)} min
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--color-muted)]">Toegang</span>
                <span className={`font-semibold ${heeftCursustoegang ? "text-emerald-600" : "text-[color:var(--color-heading)]"}`}>
                  {isLid ? "✓ Volledige toegang" : heeftCursustoegang ? "✓ Cursusabonnement" : "Abonnement vereist"}
                </span>
              </div>
            </div>

            {!heeftCursustoegang && (
              <div className="rounded-xl border border-[color:var(--color-accent-200)] bg-[color:var(--color-accent-50)] p-5 space-y-3">
                {isIngelogd ? (
                  <>
                    <p className="text-sm text-[color:var(--color-accent-800)] leading-relaxed">
                      <strong>Je account is aangemaakt</strong>, maar je hebt nog geen actief abonnement.
                      Kies een lidmaatschap of een cursusabonnement.
                    </p>
                    <Link href="/contributie" className="btn-primary !py-2 !px-4 text-sm inline-flex">
                      Abonnementen bekijken <ArrowRight size={14} />
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-[color:var(--color-accent-800)] leading-relaxed">
                      <strong>Lessen 1 &amp; 2 zijn gratis.</strong> Voor volledige toegang kun je lid worden
                      of een abonnement nemen vanaf <strong>€7,50/maand</strong> of <strong>€50/jaar</strong>.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/login" className="btn-primary !py-2 !px-4 text-sm inline-flex">
                        Inloggen <ArrowRight size={14} />
                      </Link>
                      <Link href="/contributie" className="btn-secondary !py-2 !px-4 text-sm inline-flex !text-[color:var(--color-accent-800)] !border-[color:var(--color-accent-400)] hover:!bg-[color:var(--color-accent-100)]">
                        Abonnementen bekijken
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
                  Lessen ({lessenVoorLid.length})
                </h3>
                {heeftCursustoegang && (
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

      {/* Niet-abonnees: vergrendelde preview */}
      {!heeftCursustoegang && (
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
                    <div className="absolute inset-0 bg-[#0e0b08]/55 flex items-center justify-center">
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
                Abonnementen bekijken <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Abonnees: volledige videobibliotheek */}
      {heeftCursustoegang && (
        <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
          <div className="container-x">
            <div className="badge-red mb-4">Videobibliotheek</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
              Hapkido in beeld
            </h2>
            <p className="mt-4 text-[color:var(--color-muted)] max-w-2xl">
              Demonstraties, trainingsopnames en eigen video&apos;s klik om af te spelen.
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
