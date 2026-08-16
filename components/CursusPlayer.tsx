"use client";

import { useState, useEffect, useRef, useId } from "react";
import { Play, Lock, Film, ChevronDown } from "lucide-react";
import type { Les } from "@/lib/cursussen";
import { categorieLabelMap } from "@/lib/cursussen";

export type VideoItem = {
  id: string;
  titel: string;
  beschrijving?: string | null;
  categorie: string;
  subcategorie?: string | null;
  platform: string;
  volgorde?: number;
  thumbnail_url?: string | null;
};

// ─── helpers ──────────────────────────────────────────────────

function extractYoutubeId(raw: string): string {
  const m = raw.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : raw;
}

// ─── Platform embeds ──────────────────────────────────────────

function YoutubeEmbed({ videoId: rawId, titel }: { videoId: string; titel: string }) {
  const videoId = extractYoutubeId(rawId);
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
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt={titel}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#0e0b08]/30 group-hover:bg-[#0e0b08]/20 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
          <Play size={22} className="text-stone-900 ml-0.5" fill="currentColor" />
        </div>
      </div>
    </button>
  );
}

function VimeoEmbed({ videoId, titel, thumbnailUrl }: { videoId: string; titel: string; thumbnailUrl?: string | null }) {
  const [active, setActive] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerId = useId().replace(/:/g, "");
  const raw = videoId.replace(/^vimeo-/, "");
  const [vid, hash] = raw.split("/");
  const base = hash
    ? `https://player.vimeo.com/video/${vid}?h=${hash}`
    : `https://player.vimeo.com/video/${vid}?`;
  const embedSrc = `${base}&autoplay=1&color=c25a00&api=1&player_id=${playerId}`;

  useEffect(() => {
    if (!active) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://player.vimeo.com") return;
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (d.player_id !== playerId) return;
        if (d.event === "ready") {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ method: "addEventListener", value: "finish", player_id: playerId }),
            "https://player.vimeo.com"
          );
        }
        if (d.event === "finish") setActive(false);
      } catch { /* ignore malformed messages */ }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [active, playerId]);

  if (active) {
    return (
      <iframe
        ref={iframeRef}
        className="absolute inset-0 w-full h-full"
        src={embedSrc}
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
      className="absolute inset-0 flex flex-col items-center justify-center bg-stone-700 group cursor-pointer gap-3 overflow-hidden"
      aria-label={`Speel ${titel} af`}
    >
      {thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbnailUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      <div className={`absolute inset-0 ${thumbnailUrl ? "bg-black/35 group-hover:bg-black/25" : ""} transition-colors`} />
      <div className="relative w-16 h-16 rounded-full bg-[#1ab7ea] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
        <Play size={26} className="text-white ml-1" fill="currentColor" />
      </div>
      {!thumbnailUrl && (
        <span className="relative text-white font-semibold text-sm text-center px-4 leading-snug drop-shadow">{titel}</span>
      )}
      <span className="absolute bottom-3 right-3 text-[11px] text-white/70 font-medium drop-shadow">Vimeo</span>
    </button>
  );
}

function LocalEmbed({ videoId, titel }: { videoId: string; titel: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  const bestand = videoId.replace(/^local-/, "") + ".mp4";

  useEffect(() => {
    fetch(`/api/video-url?path=${encodeURIComponent(bestand)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.url) { setUrl(d.url); setStatus("ok"); }
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [bestand]);

  if (status === "loading") {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      </div>
    );
  }
  if (status === "error" || !url) {
    return (
      <div className="w-full h-full bg-stone-900 flex flex-col items-center justify-center gap-2 text-white/50">
        <Film size={28} />
        <span className="text-xs">Video niet beschikbaar</span>
      </div>
    );
  }
  return (
    <video
      controls
      preload="metadata"
      className="w-full h-full object-contain bg-black"
      title={titel}
      controlsList="nodownload"
      disablePictureInPicture
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={url} type="video/mp4" />
      Je browser ondersteunt geen video.
    </video>
  );
}

function GdriveEmbed({ videoId, titel }: { videoId: string; titel: string }) {
  const fileId = videoId.replace(/^gdrive-/, "");
  const isRealId = fileId.length > 10;
  if (!isRealId) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 gap-2 text-stone-400">
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
  return (
    <div className="relative w-full h-full" onContextMenu={(e) => e.preventDefault()}>
      {p === "youtube" && <YoutubeEmbed videoId={video.id} titel={video.titel} />}
      {p === "vimeo"   && <VimeoEmbed   videoId={video.id} titel={video.titel} thumbnailUrl={video.thumbnail_url} />}
      {p === "local"   && <LocalEmbed   videoId={video.id} titel={video.titel} />}
      {p === "gdrive"  && <GdriveEmbed  videoId={video.id} titel={video.titel} />}
      {!["youtube","vimeo","local","gdrive"].includes(p ?? "") && <YoutubeEmbed videoId={video.id} titel={video.titel} />}
    </div>
  );
}

// ─── LessenLijst ──────────────────────────────────────────────

function videoItemFromLes(l: Les): VideoItem | null {
  if (!l.video_url) return null;
  if (l.video_url.startsWith("vimeo-")) {
    return { id: l.video_url, titel: l.titel, categorie: l.categorie, platform: "vimeo" };
  }
  if (l.video_url.startsWith("local-")) {
    return { id: l.video_url, titel: l.titel, categorie: l.categorie, platform: "local" };
  }
  if (l.video_url.startsWith("gdrive-")) {
    return { id: l.video_url, titel: l.titel, categorie: l.categorie, platform: "gdrive" };
  }
  return { id: l.video_url, titel: l.titel, categorie: l.categorie, platform: "youtube" };
}

export function LessenLijst({ lessen }: { lessen: Les[] }) {
  const [selectedCat, setSelectedCat] = useState<string>("alle");
  const [openNr, setOpenNr] = useState<number | null>(null);

  const aanwezigeCategorieen = Array.from(new Set(lessen.map(l => l.categorie))).sort();
  const filteredLessen = selectedCat === "alle"
    ? lessen
    : lessen.filter(l => l.categorie === selectedCat);

  return (
    <div>
      <div className="px-5 py-4 border-b border-[color:var(--color-border)] flex items-center gap-3">
        <label className="text-sm font-medium text-[color:var(--color-muted)]">Filter:</label>
        <div className="relative">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-md bg-[color:var(--color-surface-2)] border border-[color:var(--color-border)] text-sm font-medium text-[color:var(--color-heading)] cursor-pointer hover:bg-[color:var(--color-surface)] transition-colors"
          >
            <option value="alle">Alle lessen ({lessen.length})</option>
            {aanwezigeCategorieen.map(c => (
              <option key={c} value={c}>
                {c} ({lessen.filter(l => l.categorie === c).length})
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[color:var(--color-muted)]" />
        </div>
      </div>

      <div className="divide-y divide-[color:var(--color-border)]">
        {filteredLessen.map((l) => {
          const videoItem = videoItemFromLes(l);
          const isOpen = openNr === l.nr;
          const klikbaar = l.gratis && videoItem;

          return (
            <div key={l.nr}>
              <div
                onClick={() => klikbaar && setOpenNr(isOpen ? null : l.nr)}
                className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                  klikbaar ? "hover:bg-[color:var(--color-surface-2)] cursor-pointer" : "opacity-60"
                } ${isOpen ? "bg-[color:var(--color-surface-2)]" : ""}`}
              >
                <div className="w-8 h-8 rounded-md bg-[color:var(--color-surface-2)] border border-[color:var(--color-border)] flex items-center justify-center shrink-0">
                  {l.gratis ? (
                    <Play size={13} className="text-[color:var(--color-accent-600)] ml-0.5" fill="currentColor" />
                  ) : (
                    <Lock size={13} className="text-[color:var(--color-muted)]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-[color:var(--color-heading)] truncate">{l.titel}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm text-[color:var(--color-text)]">{l.categorie}</span>
                    <span className="text-sm text-[color:var(--color-muted)]">·</span>
                    <span className="text-sm text-[color:var(--color-text)]">{l.duur}</span>
                  </div>
                </div>
                {l.gratis && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-accent-300)] bg-[color:var(--color-accent-600)]/15 border border-[color:var(--color-accent-600)]/30 px-2 py-0.5 rounded">
                    Gratis
                  </span>
                )}
                {klikbaar && (
                  <ChevronDown
                    size={15}
                    className={`text-[color:var(--color-muted)] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </div>

              {isOpen && videoItem && (
                <div className="border-t border-[color:var(--color-border)] bg-black">
                  <div className="aspect-video relative overflow-hidden">
                    <VideoEmbed video={videoItem} />
                  </div>
                  {l.beschrijving && (
                    <div className="px-5 py-3 bg-[color:var(--color-surface-2)] text-sm text-[color:var(--color-text)]">
                      {l.beschrijving}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── VideoGalerij ─────────────────────────────────────────────

export function VideoGalerij({ videos }: { videos: VideoItem[] }) {
  const [filterCat, setFilterCat] = useState<string>("alle");

  // Groepeer op subcategorie (techniekgroep) indien aanwezig — relevant voor
  // zwarte-band/academie, waar "categorie" al de toegangstier is, niet de
  // techniekgroep. Video's zonder subcategorie groeperen op categorie, zoals
  // voorheen (geen verandering voor de reguliere bibliotheek).
  const byCategorie = videos.reduce<Record<string, VideoItem[]>>((acc, v) => {
    const key = v.subcategorie || v.categorie;
    if (!acc[key]) acc[key] = [];
    acc[key].push(v);
    return acc;
  }, {});

  const catOrder = ["uitleg", "stoten", "elleboog", "hammerslag", "palm", "trappen", "ground", "eigen", "zwarte-band", "academie"];
  const sortedEntries = Object.entries(byCategorie).sort(([a], [b]) => {
    const ia = catOrder.indexOf(a), ib = catOrder.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

  const gefilterdeEntries = filterCat === "alle" ? sortedEntries : sortedEntries.filter(([cat]) => cat === filterCat);

  return (
    <div className="space-y-10">
      {sortedEntries.length > 1 && (
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-[color:var(--color-muted)]">Techniek:</label>
          <select
            className="input !w-auto !py-2"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="alle">Alle technieken ({videos.length})</option>
            {sortedEntries.map(([cat, vids]) => (
              <option key={cat} value={cat}>
                {categorieLabelMap[cat] ?? cat} ({vids.length})
              </option>
            ))}
          </select>
        </div>
      )}
      {gefilterdeEntries.map(([cat, vids]) => (
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
                <div className="aspect-video bg-stone-900 relative overflow-hidden">
                  <VideoEmbed video={v} />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-base text-[color:var(--color-heading)] leading-snug">{v.titel}</h4>
                  {v.beschrijving && (
                    <p className="mt-1.5 text-sm text-[color:var(--color-text)] leading-relaxed">{v.beschrijving}</p>
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
