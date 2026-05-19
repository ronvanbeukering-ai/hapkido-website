"use client";

import { useState } from "react";
import { Play, Lock, Film } from "lucide-react";
import type { Les } from "@/lib/cursussen";
import { categorieLabelMap } from "@/lib/cursussen";

export type VideoItem = {
  id: string;
  titel: string;
  beschrijving?: string | null;
  categorie: string;
  platform: string;
  volgorde?: number;
};

// ─── Platform embeds ──────────────────────────────────────────

function YoutubeEmbed({ videoId, titel }: { videoId: string; titel: string }) {
  const [active, setActive] = useState(false);
  if (active) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={titel}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="relative w-full h-full group cursor-pointer"
      aria-label={`Speel ${titel} af`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={titel}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
          <Play size={22} className="text-stone-900 ml-0.5" fill="currentColor" />
        </div>
      </div>
    </button>
  );
}

function VimeoEmbed({ videoId, titel }: { videoId: string; titel: string }) {
  const [active, setActive] = useState(false);
  const numericId = videoId.replace(/^vimeo-/, "");
  if (active) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://player.vimeo.com/video/${numericId}?autoplay=1&color=c93a16`}
        title={titel}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="relative w-full h-full flex items-center justify-center bg-stone-800 group cursor-pointer"
      aria-label={`Speel ${titel} af`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-[#1ab7ea]/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
          <Play size={22} className="text-white ml-0.5" fill="currentColor" />
        </div>
      </div>
      <span className="absolute bottom-3 left-3 text-xs text-white/60 font-medium">Vimeo</span>
    </button>
  );
}

function LocalEmbed({ videoId, titel }: { videoId: string; titel: string }) {
  const slug = videoId.replace(/^local-/, "");
  const candidates = [
    `/videos/IMG_${slug}.MOV`,
    `/videos/IMG_${slug}.mov`,
    `/videos/IMG_${slug}.mp4`,
    `/videos/IMG_${slug}.MP4`,
    `/videos/training-les-${slug}.mov`,
  ];
  return (
    <video
      controls
      preload="metadata"
      className="w-full h-full object-contain bg-black"
      title={titel}
    >
      {candidates.map((src) => (
        <source key={src} src={src} />
      ))}
      Je browser ondersteunt geen video.
    </video>
  );
}

function GdriveEmbed({ videoId, titel }: { videoId: string; titel: string }) {
  const fileId = videoId.replace(/^gdrive-/, "");
  const isRealId = fileId.length > 10;
  if (!isRealId) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 gap-2 text-stone-500">
        <Film size={28} />
        <span className="text-xs text-center px-4">Video wordt binnenkort toegevoegd<br /><span className="opacity-50">{videoId}</span></span>
      </div>
    );
  }
  return (
    <iframe
      className="w-full h-full"
      src={`https://drive.google.com/file/d/${fileId}/preview`}
      title={titel}
      allow="autoplay"
      allowFullScreen
    />
  );
}

function VideoEmbed({ video }: { video: VideoItem }) {
  const p = video.platform;
  if (p === "youtube") return <YoutubeEmbed videoId={video.id} titel={video.titel} />;
  if (p === "vimeo") return <VimeoEmbed videoId={video.id} titel={video.titel} />;
  if (p === "local") return <LocalEmbed videoId={video.id} titel={video.titel} />;
  if (p === "gdrive") return <GdriveEmbed videoId={video.id} titel={video.titel} />;
  return <YoutubeEmbed videoId={video.id} titel={video.titel} />;
}

// ─── LessenLijst ──────────────────────────────────────────────

export function LessenLijst({ lessen }: { lessen: Les[] }) {
  return (
    <div className="divide-y divide-[color:var(--color-border)]">
      {lessen.map((l) => (
        <div
          key={l.nr}
          className={`flex items-center gap-4 px-5 py-4 ${
            l.gratis
              ? "hover:bg-[color:var(--color-stone-100)] transition-colors cursor-pointer"
              : "opacity-60"
          }`}
        >
          <div className="w-8 h-8 rounded-md bg-[color:var(--color-surface-2)] border border-[color:var(--color-border)] flex items-center justify-center shrink-0">
            {l.gratis ? (
              <Play size={13} className="text-[color:var(--color-accent-600)] ml-0.5" fill="currentColor" />
            ) : (
              <Lock size={13} className="text-[color:var(--color-muted)]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-[color:var(--color-heading)] truncate">{l.titel}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-[color:var(--color-muted)]">{l.categorie}</span>
              <span className="text-xs text-[color:var(--color-muted)]">·</span>
              <span className="text-xs text-[color:var(--color-muted)]">{l.duur}</span>
            </div>
          </div>
          {l.gratis && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-accent-700)] bg-[color:var(--color-accent-100)] border border-[color:var(--color-accent-200)] px-2 py-0.5 rounded">
              Gratis
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── VideoGalerij ─────────────────────────────────────────────

export function VideoGalerij({ videos }: { videos: VideoItem[] }) {
  const byCategorie = videos.reduce<Record<string, VideoItem[]>>((acc, v) => {
    if (!acc[v.categorie]) acc[v.categorie] = [];
    acc[v.categorie].push(v);
    return acc;
  }, {});

  const catOrder = ["eigen", "kwan-nyom", "hapkido-nederland"];
  const sortedEntries = Object.entries(byCategorie).sort(([a], [b]) => {
    const ia = catOrder.indexOf(a);
    const ib = catOrder.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return (
    <div className="space-y-10">
      {sortedEntries.map(([cat, vids]) => (
        <div key={cat}>
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)] mb-5">
            {categorieLabelMap[cat] ?? cat}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vids.map((v) => (
              <article
                key={v.id}
                className="group rounded-xl overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-stone-900">
                  <VideoEmbed video={v} />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm text-[color:var(--color-heading)] leading-snug">{v.titel}</h4>
                  {v.beschrijving && (
                    <p className="mt-1 text-xs text-[color:var(--color-muted)] leading-relaxed">{v.beschrijving}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
