"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Video, BookOpen, Users, LogOut, Plus, Trash2, Pencil,
  Save, X, Upload, Crown, CheckCircle, XCircle, ArrowLeft,
  Youtube, Library, Play,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSuperAdmin } from "@/lib/auth";
import { categorieLabelMap } from "@/lib/cursussen";

/* ─── types ─────────────────────────────────────── */
type Profiel = { id: string; email: string; rol: "admin" | "lid" | "cursus" | "geen"; lid_geldig_tot: string | null; zwarte_band_geldig_tot: string | null; academie_toegang: boolean; tijdelijk_wachtwoord?: string | null };
type HKVideo = { id: string; titel: string; beschrijving: string; categorie: string; subcategorie?: string | null; platform?: string; url?: string; volgorde?: number };
type HKLes  = { nr: number; titel: string; duur: string; categorie: string; gratis: boolean; beschrijving?: string; video_url?: string; belt?: string };

const TABS = [
  { id: "videos",  label: "Video's",  icon: Video },
  { id: "lessen",  label: "Lessen",   icon: BookOpen },
  { id: "leden",   label: "Leden",    icon: Users },
] as const;

type Tab = typeof TABS[number]["id"];

/* ─── helpers ────────────────────────────────────── */
function toast(msg: string, type: "ok" | "err" = "ok") {
  const el = document.createElement("div");
  el.textContent = msg;
  el.className = `fixed bottom-6 right-6 z-[200] px-5 py-3 rounded-lg text-white text-sm font-semibold shadow-xl transition-all ${type === "err" ? "bg-red-600" : "bg-emerald-600"}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

async function apiFetch(url: string, options?: RequestInit) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, data: json.data, error: json.error as string | undefined };
  } catch {
    return { ok: false, data: undefined, error: "Geen verbinding — probeer het opnieuw" };
  }
}

function extractYoutubeId(raw: string): string {
  const m = raw.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : raw;
}

function vimeoEmbedSrc(raw: string): string {
  const clean = raw.replace(/^vimeo-/, "");
  const [vid, hash] = clean.split("/");
  return hash
    ? `https://player.vimeo.com/video/${vid}?h=${hash}&autoplay=1&color=c25a00`
    : `https://player.vimeo.com/video/${vid}?autoplay=1&color=c25a00`;
}

/* Modal die een video afspeelt op basis van platform (youtube/vimeo/local) */
function VideoPreviewModal({ video, onClose }: { video: HKVideo; onClose: () => void }) {
  const raw = video.url ?? video.id;
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Sluiten"
          className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          <X size={18} />
        </button>
        {video.platform === "local" ? (
          <video src={video.url} controls autoPlay className="w-full h-full" />
        ) : video.platform === "vimeo" ? (
          <iframe
            className="w-full h-full"
            src={vimeoEmbedSrc(raw)}
            title={video.titel}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${extractYoutubeId(raw)}?autoplay=1&rel=0&modestbranding=1`}
            title={video.titel}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

/* ─── main component ─────────────────────────────── */
export default function Dashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [profiel, setProfiel] = useState<Profiel | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("videos");

  useEffect(() => {
    // Server-side check (zelfde route als de Navbar gebruikt) — voorkomt dat
    // deze pagina blijft hangen op een directe browser→Supabase aanroep.
    // Middleware heeft toegang al gecheckt; dit is alleen voor de UI (e-mail
    // tonen + nette redirect als iemand de check via middleware omzeilt).
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        const json = await res.json();
        if (!json.email) { router.replace("/login"); return; }
        if (!json.isAdmin) { router.replace("/"); return; }
        setProfiel({ id: "", email: json.email, rol: "admin", lid_geldig_tot: null, zwarte_band_geldig_tot: null, academie_toegang: false });
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  async function uitloggen() {
    // Niet eindeloos wachten als de browser→Supabase aanroep blijft hangen.
    await Promise.race([
      supabase.auth.signOut().catch(() => {}),
      new Promise((resolve) => setTimeout(resolve, 4000)),
    ]);
    router.push("/");
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[color:var(--color-accent-600)] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[color:var(--color-stone-950)] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Crown size={18} className="text-[color:var(--color-gold-400)]" />
            <span className="font-[family-name:var(--font-display)] text-lg">Beheer</span>
          </div>
          <p className="text-xs text-white/50 truncate">{profiel?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === id
                  ? "bg-[color:var(--color-accent-700)] text-white"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-xs text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/8">
            <ArrowLeft size={14} /> Terug naar website
          </Link>
          <button onClick={uitloggen} className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-white/8">
            <LogOut size={14} /> Uitloggen
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="light-panel flex-1 overflow-auto bg-[color:var(--color-stone-50)] text-[color:var(--color-text)]">
        <div className="p-8">
          {tab === "videos" && <VideosBeheer />}
          {tab === "lessen" && <LessenBeheer />}
          {tab === "leden"  && <LedenBeheer />}
        </div>
      </main>
    </div>
  );
}


/* ══════════════════════════════════════════════════
   VIDEO'S BEHEER
══════════════════════════════════════════════════ */
function VideosBeheer() {
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = useMemo(() => createClient(), []);
  const [videos, setVideos] = useState<HKVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<HKVideo> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<HKVideo | null>(null);
  const [filterCat, setFilterCat] = useState<string>("alle");

  const laad = useCallback(async () => {
    const { ok, data, error } = await apiFetch("/api/admin/videos");
    if (!ok) { toast("Laden mislukt: " + error, "err"); return; }
    setVideos(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { laad(); }, [laad]);

  async function opslaan() {
    if (!form?.titel?.trim()) { toast("Titel is verplicht", "err"); return; }
    setSaving(true);
    const rec: HKVideo = {
      id:          form.id ?? crypto.randomUUID(),
      titel:       form.titel,
      beschrijving: form.beschrijving ?? "",
      categorie:   form.categorie ?? "kwan-nyom",
      subcategorie: form.subcategorie?.trim() || null,
      platform:    form.platform ?? "youtube",
      url:         form.url ?? form.id ?? "",
      volgorde:    form.volgorde ?? videos.length + 1,
    };
    const { ok, error } = await apiFetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rec),
    });
    setSaving(false);
    if (!ok) { toast("Fout: " + (error ?? "onbekend"), "err"); return; }
    toast("Video opgeslagen!");
    setForm(null);
    laad();
  }

  async function verwijder(id: string) {
    if (!confirm("Video verwijderen?")) return;
    const { ok, error } = await apiFetch(`/api/admin/videos?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!ok) { toast("Fout: " + (error ?? "onbekend"), "err"); return; }
    toast("Video verwijderd");
    laad();
  }

  async function uploadBestand(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const naam = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
    const { data, error } = await supabase.storage.from("hapkido-videos").upload(naam, file, { upsert: true });
    if (error) { toast("Upload mislukt: " + error.message, "err"); setUploading(false); return; }
    const { data: pub } = supabase.storage.from("hapkido-videos").getPublicUrl(data.path);
    setForm(f => ({ ...f, url: pub.publicUrl, platform: "local", id: pub.publicUrl }));
    toast("Video geüpload!");
    setUploading(false);
  }

  const categorieen = ["kwan-nyom", "hapkido-nederland", "eigen", "zwarte-band", "academie"];
  const catLabel: Record<string, string> = { "kwan-nyom": "Kwan Nyom Hapkido", "hapkido-nederland": "Hapkido Nederland", "eigen": "Eigen video's", "zwarte-band": "Zwarte band technieken", "academie": "Academie" };

  const aanwezigeCategorieen = Array.from(new Set(videos.map(v => v.categorie))).sort(
    (a, b) => (categorieLabelMap[a] ?? a).localeCompare(categorieLabelMap[b] ?? b)
  );
  const gefilterdeVideos = filterCat === "alle" ? videos : videos.filter(v => v.categorie === filterCat);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">Video&apos;s beheren</h1>
          <p className="text-sm text-[color:var(--color-muted)] mt-1">{videos.length} video&apos;s · YouTube, Vimeo of eigen upload</p>
        </div>
        <button onClick={() => setForm({ categorie: "kwan-nyom", platform: "youtube" })} className="btn-primary !py-2">
          <Plus size={16} /> Video toevoegen
        </button>
      </div>

      {/* Categoriefilter */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm font-medium text-[color:var(--color-muted)]">Filter:</label>
        <select
          className="input !w-auto !py-2"
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
        >
          <option value="alle">Alle categorieën ({videos.length})</option>
          {aanwezigeCategorieen.map(c => (
            <option key={c} value={c}>
              {categorieLabelMap[c] ?? c} ({videos.filter(v => v.categorie === c).length})
            </option>
          ))}
        </select>
      </div>

      {/* Formulier */}
      {form !== null && (
        <div className="card p-6 mb-6 border-[color:var(--color-accent-300)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl">{form.id ? `Bewerk: ${form.titel}` : "Nieuwe video"}</h2>
            <button onClick={() => setForm(null)} className="text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)]"><X size={20} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Titel *</label>
              <input className="input" value={form.titel ?? ""} onChange={e => setForm(f => ({ ...f, titel: e.target.value }))} placeholder="Video titel" />
            </div>
            <div>
              <label className="label">Categorie</label>
              <select className="input" value={form.categorie ?? "kwan-nyom"} onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))}>
                {categorieen.map(c => <option key={c} value={c}>{catLabel[c]}</option>)}
              </select>
            </div>
            {(form.categorie === "zwarte-band" || form.categorie === "academie") && (
              <div>
                <label className="label">Techniekgroep (optioneel)</label>
                <input
                  className="input"
                  value={form.subcategorie ?? ""}
                  onChange={e => setForm(f => ({ ...f, subcategorie: e.target.value }))}
                  placeholder="bijv. Worpen, Faking style, Vanuit zit/stoel"
                  list="techniekgroepen"
                />
                <datalist id="techniekgroepen">
                  {Array.from(new Set(videos.map(v => v.subcategorie).filter((s): s is string => !!s))).map(s => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>
            )}
            <div>
              <label className="label">Platform</label>
              <select className="input" value={form.platform ?? "youtube"} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="local">Lokale upload</option>
              </select>
            </div>
            <div>
              <label className="label">
                {form.platform === "youtube" ? "YouTube video-ID of URL" : form.platform === "vimeo" ? "Vimeo video-ID (bijv. vimeo-1234567)" : "Video URL (na upload)"}
              </label>
              <input
                className="input"
                value={form.url ?? form.id ?? ""}
                onChange={e => setForm(f => ({ ...f, url: e.target.value, id: e.target.value }))}
                placeholder={form.platform === "youtube" ? "bijv. dQw4w9WgXcQ" : form.platform === "vimeo" ? "vimeo-1234567" : "URL"}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Beschrijving</label>
              <textarea className="input min-h-[80px]" value={form.beschrijving ?? ""} onChange={e => setForm(f => ({ ...f, beschrijving: e.target.value }))} placeholder="Korte omschrijving van de video" />
            </div>
            {form.platform === "local" && (
              <div className="sm:col-span-2">
                <label className="label">Bestand uploaden</label>
                <div className="border-2 border-dashed border-[color:var(--color-border)] rounded-lg p-6 text-center hover:border-[color:var(--color-accent-400)] transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
                  <Upload size={24} className="mx-auto text-[color:var(--color-muted)] mb-2" />
                  <p className="text-sm text-[color:var(--color-muted)]">{uploading ? "Bezig met uploaden…" : "Klik of sleep een video hiernaartoe (MP4, MOV)"}</p>
                  <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={uploadBestand} />
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={opslaan} disabled={saving} className="btn-primary !py-2 disabled:opacity-60">
              {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
              {saving ? "Bezig…" : "Opslaan"}
            </button>
            <button onClick={() => setForm(null)} className="btn-secondary !py-2">Annuleer</button>
          </div>
        </div>
      )}

      {/* Video grid */}
      {loading ? <div className="text-center py-12 text-[color:var(--color-muted)]">Laden…</div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gefilterdeVideos.map(v => (
            <div key={v.id} className="card overflow-hidden">
              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => setPreview(v)}
                aria-label={`Speel ${v.titel} af`}
                className="block w-full aspect-video bg-stone-200 relative overflow-hidden group cursor-pointer"
              >
                {(v.platform === "youtube" || !v.platform) && (
                  <img src={`https://img.youtube.com/vi/${v.url ?? v.id}/hqdefault.jpg`} alt={v.titel} className="w-full h-full object-cover" loading="lazy" />
                )}
                {v.platform === "vimeo" && (
                  <div className="w-full h-full bg-[#1ab7ea]/15 flex flex-col items-center justify-center gap-1">
                    <span className="text-[#1ab7ea] font-bold text-lg">vimeo</span>
                    <span className="text-[10px] text-[#1ab7ea]/60 px-2 text-center truncate max-w-full">{v.url ?? v.id}</span>
                  </div>
                )}
                {v.platform === "local" && (
                  <video src={v.url} className="w-full h-full object-cover" preload="metadata" muted />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/95 flex items-center justify-center transition-all scale-90 group-hover:scale-100">
                    <Play size={20} className="text-stone-900 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                  </div>
                </div>
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#0e0b08]/60 text-white uppercase">{v.platform ?? "youtube"}</span>
              </button>
              {/* Info + knoppen */}
              <div className="p-3">
                <p className="text-sm font-semibold text-[color:var(--color-heading)] truncate">{v.titel}</p>
                <p className="text-xs text-[color:var(--color-muted)] truncate mt-0.5">{v.beschrijving}</p>
                <span className="text-[10px] text-[color:var(--color-muted)] mt-1 block">{categorieLabelMap[v.categorie] ?? v.categorie}</span>
                <div className="flex gap-2 mt-3 pt-3 border-t border-[color:var(--color-border)]">
                  <button
                    onClick={() => setPreview(v)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[color:var(--color-surface-2)] hover:bg-[color:var(--color-stone-200)] text-[color:var(--color-heading)] transition-colors border border-[color:var(--color-border)]"
                  >
                    <Play size={12} /> Afspelen
                  </button>
                  <button
                    onClick={() => setForm({ ...v })}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md bg-[color:var(--color-surface-2)] hover:bg-[color:var(--color-stone-200)] text-[color:var(--color-heading)] transition-colors border border-[color:var(--color-border)]"
                  >
                    <Pencil size={12} /> Bewerken
                  </button>
                  <button
                    onClick={() => verwijder(v.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200"
                  >
                    <Trash2 size={12} /> Verwijder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {preview && <VideoPreviewModal video={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   LESSEN BEHEER
══════════════════════════════════════════════════ */
function LessenBeheer() {
  const [lessen, setLessen] = useState<HKLes[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bewerkt, setBewerkt] = useState<HKLes | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function openBewerkt(l: HKLes) {
    setBewerkt({ ...l });
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  const laad = useCallback(async () => {
    const { ok, data, error } = await apiFetch("/api/admin/lessen");
    if (!ok) { toast("Laden mislukt: " + error, "err"); return; }
    setLessen(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { laad(); }, [laad]);

  async function slaOp(les: HKLes) {
    setSaving(true);
    const { ok, error } = await apiFetch("/api/admin/lessen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(les),
    });
    setSaving(false);
    if (!ok) { toast("Fout: " + (error ?? "onbekend"), "err"); return; }
    toast(`Les ${les.nr} opgeslagen!`);
    setBewerkt(null);
    laad();
  }

  const cats = ["Basis", "Grepen", "Slagen", "Werpingen", "Locks", "Verweer", "Wapens", "Houding", "Stoten", "Trappen"];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">Lessen bewerken</h1>
        <p className="text-sm text-[color:var(--color-muted)] mt-1">Pas titels, duur, beschrijvingen en video-links aan</p>
      </div>

      {bewerkt && (
        <div ref={formRef} className="card p-6 mb-6 border-[color:var(--color-accent-300)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl">Les {bewerkt.nr} bewerken</h2>
            <button onClick={() => setBewerkt(null)}><X size={20} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Titel *</label>
              <input className="input" value={bewerkt.titel} onChange={e => setBewerkt(b => b && ({ ...b, titel: e.target.value }))} />
            </div>
            <div>
              <label className="label">Duur</label>
              <input className="input" value={bewerkt.duur} onChange={e => setBewerkt(b => b && ({ ...b, duur: e.target.value }))} placeholder="bijv. 20m" />
            </div>
            <div>
              <label className="label">Categorie</label>
              <select className="input" value={bewerkt.categorie} onChange={e => setBewerkt(b => b && ({ ...b, categorie: e.target.value }))}>
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="label mb-0">Gratis preview</label>
              <button type="button" onClick={() => setBewerkt(b => b && ({ ...b, gratis: !b.gratis }))}
                className={`w-12 h-6 rounded-full transition-colors ${bewerkt.gratis ? "bg-emerald-500" : "bg-stone-300"}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${bewerkt.gratis ? "translate-x-6" : "translate-x-0"}`} />
              </button>
              <span className="text-sm text-[color:var(--color-muted)]">{bewerkt.gratis ? "Ja" : "Nee"}</span>
            </div>
            <div className="sm:col-span-2">
              <label className="label">Video URL (vimeo-ID, YouTube-ID of URL)</label>
              <input className="input" value={bewerkt.video_url ?? ""} onChange={e => setBewerkt(b => b && ({ ...b, video_url: e.target.value }))} placeholder="bijv. vimeo-1198905757 of dQw4w9WgXcQ" />
              <p className="text-xs text-[color:var(--color-muted)] mt-1">Vimeo: gebruik formaat <code className="bg-stone-100 px-1 rounded">vimeo-1234567</code> · YouTube: alleen het video-ID</p>
            </div>
            <div className="sm:col-span-2">
              <label className="label">Beschrijving</label>
              <textarea className="input min-h-[100px]" value={bewerkt.beschrijving ?? ""} onChange={e => setBewerkt(b => b && ({ ...b, beschrijving: e.target.value }))} placeholder="Wat leert de student in deze les?" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => slaOp(bewerkt)} disabled={saving} className="btn-primary !py-2 disabled:opacity-60">
              {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
              {saving ? "Bezig…" : "Opslaan"}
            </button>
            <button onClick={() => setBewerkt(null)} className="btn-secondary !py-2">Annuleer</button>
          </div>
        </div>
      )}

      {loading ? <div className="text-[color:var(--color-muted)] py-8 text-center">Laden…</div> : (
        <div className="card overflow-hidden">
          {lessen.map((l, i) => (
            <div key={l.nr} className={`flex items-center gap-4 px-5 py-4 ${i < lessen.length - 1 ? "border-b border-[color:var(--color-border)]" : ""} hover:bg-[color:var(--color-stone-50)]`}>
              <div className="w-8 h-8 rounded-md bg-[color:var(--color-surface-2)] border border-[color:var(--color-border)] flex items-center justify-center text-xs font-bold text-[color:var(--color-muted)] shrink-0">{l.nr}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[color:var(--color-heading)] truncate">{l.titel}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-[color:var(--color-muted)]">{l.categorie}</span>
                  <span className="text-xs text-[color:var(--color-muted)]">·</span>
                  <span className="text-xs text-[color:var(--color-muted)]">{l.duur}</span>
                  {l.video_url && <span className="text-xs text-[color:var(--color-accent-600)] flex items-center gap-1"><Youtube size={11} /> Video</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {l.gratis
                  ? <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">Gratis</span>
                  : <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[color:var(--color-stone-100)] text-[color:var(--color-muted)] border border-[color:var(--color-border)]">Vergrendeld</span>
                }
                <button onClick={() => openBewerkt(l)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[color:var(--color-surface-2)] hover:bg-[color:var(--color-stone-200)] text-[color:var(--color-heading)] transition-colors border border-[color:var(--color-border)]">
                  <Pencil size={12} /> Bewerken
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   LEDEN BEHEER
══════════════════════════════════════════════════ */
function LedenBeheer() {
  const [leden, setLeden] = useState<Profiel[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoek, setZoek] = useState("");
  const [nieuwForm, setNieuwForm] = useState(false);
  const [nieuwNaam, setNieuwNaam] = useState("");
  const [nieuwEmail, setNieuwEmail] = useState("");
  const [uitnodigBusy, setUitnodigBusy] = useState(false);
  const [uitnodigWachtwoord, setUitnodigWachtwoord] = useState<{ email: string; ww: string } | null>(null);

  const laad = useCallback(async () => {
    const { ok, data, error } = await apiFetch("/api/admin/leden");
    if (!ok) { toast("Laden mislukt: " + error, "err"); return; }
    setLeden(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { laad(); }, [laad]);

  async function updateLid(id: string, update: Record<string, unknown>) {
    const { ok, error } = await apiFetch("/api/admin/leden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...update }),
    });
    if (!ok) { toast("Fout: " + (error ?? "onbekend"), "err"); return; }
    laad();
  }

  async function maakLid(id: string) {
    await updateLid(id, { rol: "lid", lid_geldig_tot: null, emailVersturen: "lid" });
    toast("Lid gemaakt! Welkomstmail verstuurd.");
  }

  async function geefBibliotheek(id: string) {
    const huidig = leden.find(l => l.id === id);
    const basis = huidig?.lid_geldig_tot && new Date(huidig.lid_geldig_tot) > new Date()
      ? new Date(huidig.lid_geldig_tot)
      : new Date();
    basis.setFullYear(basis.getFullYear() + 1);
    const tot = basis.toISOString().slice(0, 10);
    const update: Record<string, unknown> = { lid_geldig_tot: tot, emailVersturen: "bibliotheek" };
    if (huidig?.rol === "geen") update.rol = "lid";
    await updateLid(id, update);
    toast("Bibliotheek actief t/m " + tot + " — mail verstuurd.");
  }

  async function intrekken(id: string) {
    await updateLid(id, { rol: "geen", lid_geldig_tot: null });
    toast("Toegang ingetrokken");
  }

  async function geefZwarteBand(id: string) {
    const huidig = leden.find(l => l.id === id);
    const basis = huidig?.zwarte_band_geldig_tot && new Date(huidig.zwarte_band_geldig_tot) > new Date()
      ? new Date(huidig.zwarte_band_geldig_tot)
      : new Date();
    basis.setFullYear(basis.getFullYear() + 1);
    const tot = basis.toISOString().slice(0, 10);
    await updateLid(id, { zwarte_band_geldig_tot: tot, emailVersturen: "zwarte-band" });
    toast("Zwarte band bibliotheek actief t/m " + tot + " — mail verstuurd.");
  }

  async function trekZwarteBandIn(id: string) {
    await updateLid(id, { zwarte_band_geldig_tot: null });
    toast("Toegang zwarte band bibliotheek ingetrokken");
  }

  async function geefAcademie(id: string) {
    await updateLid(id, { academie_toegang: true });
    toast("Academie-toestemming gegeven");
  }

  async function trekAcademieIn(id: string) {
    await updateLid(id, { academie_toegang: false });
    toast("Academie-toestemming ingetrokken");
  }

  async function uitnodigen() {
    if (!nieuwEmail.trim()) return;
    setUitnodigBusy(true);
    const { ok, data, error } = await apiFetch("/api/admin/leden", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ naam: nieuwNaam.trim(), email: nieuwEmail.trim() }),
    });
    setUitnodigBusy(false);
    if (!ok) { toast("Fout: " + (error ?? "onbekend"), "err"); return; }
    toast("Lid aangemaakt!");
    if (data?.tijdelijk_wachtwoord) {
      setUitnodigWachtwoord({ email: nieuwEmail.trim(), ww: data.tijdelijk_wachtwoord });
    }
    setNieuwNaam(""); setNieuwEmail(""); setNieuwForm(false);
    laad();
  }

  async function verwijderTijdelijkWachtwoord(id: string) {
    await updateLid(id, { tijdelijk_wachtwoord: null });
    toast("Tijdelijk wachtwoord gewist");
  }

  async function verwijderLid(id: string, email: string) {
    if (!confirm(`Account van ${email} definitief verwijderen? Dit kan niet ongedaan worden gemaakt.`)) return;
    const { ok, error } = await apiFetch(`/api/admin/leden?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!ok) { toast("Fout: " + (error ?? "onbekend"), "err"); return; }
    toast("Account verwijderd");
    laad();
  }

  const gefilterd = leden.filter(l => l.email?.toLowerCase().includes(zoek.toLowerCase()));

  const rolKleur: Record<string, string> = {
    admin:  "bg-[color:var(--color-gold-100)] text-[color:var(--color-gold-600)] border-[color:var(--color-gold-200)]",
    lid:    "bg-emerald-100 text-emerald-700 border-emerald-200",
    cursus: "bg-blue-100 text-blue-700 border-blue-200",
    geen:   "bg-[color:var(--color-stone-100)] text-[color:var(--color-muted)] border-[color:var(--color-border)]",
  };

  const rolLabel: Record<string, string> = { admin: "ADMIN", lid: "LID", cursus: "CURSUS", geen: "GEEN" };

  function bibliotheekStatus(l: Profiel): string {
    if (!l.lid_geldig_tot) return l.rol === "lid" ? "onbeperkt" : "—";
    const datum = new Date(l.lid_geldig_tot);
    const verlopen = datum < new Date();
    return (verlopen ? "verlopen " : "t/m ") + datum.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
  }

  function zwarteBandStatus(l: Profiel): string {
    if (!l.zwarte_band_geldig_tot) return "—";
    const datum = new Date(l.zwarte_band_geldig_tot);
    const verlopen = datum < new Date();
    return (verlopen ? "verlopen " : "t/m ") + datum.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
  }

  function heeftActieveZwarteBand(l: Profiel): boolean {
    return !!l.zwarte_band_geldig_tot && new Date(l.zwarte_band_geldig_tot) > new Date();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">Leden beheren</h1>
          <p className="text-sm text-[color:var(--color-muted)] mt-1">{leden.length} gebruikers geregistreerd</p>
        </div>
        <button onClick={() => setNieuwForm(v => !v)} className="btn-primary !py-2">
          <Plus size={16} /> Nieuw lid toevoegen
        </button>
      </div>

      {/* Formulier: nieuw lid uitnodigen */}
      {nieuwForm && (
        <div className="card p-6 mb-6 border-[color:var(--color-accent-300)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[color:var(--color-heading)]">Nieuw lid uitnodigen</h2>
            <button onClick={() => setNieuwForm(false)} className="text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)]"><X size={20} /></button>
          </div>
          <p className="text-sm text-[color:var(--color-muted)] mb-4">
            Het account wordt direct geactiveerd met een tijdelijk wachtwoord dat je kunt doorgeven via WhatsApp of telefoon. Een uitnodigingsmail gaat ter informatie ook mee.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Naam</label>
              <input className="input" placeholder="Voor- en achternaam" value={nieuwNaam} onChange={e => setNieuwNaam(e.target.value)} />
            </div>
            <div>
              <label className="label">E-mailadres *</label>
              <input className="input" type="email" placeholder="klant@email.nl" value={nieuwEmail} onChange={e => setNieuwEmail(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={uitnodigen}
              disabled={uitnodigBusy || !nieuwEmail.trim()}
              className="btn-primary !py-2 disabled:opacity-60"
            >
              {uitnodigBusy
                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Plus size={16} />}
              {uitnodigBusy ? "Bezig…" : "Uitnodiging versturen"}
            </button>
            <button onClick={() => setNieuwForm(false)} className="btn-secondary !py-2">Annuleer</button>
          </div>
        </div>
      )}

      {/* Tijdelijk wachtwoord notificatie — direct na uitnodigen */}
      {uitnodigWachtwoord && (
        <div className="card p-5 mb-6 border-emerald-300 bg-emerald-50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-800 mb-1">Lid aangemaakt — tijdelijk wachtwoord:</p>
              <p className="text-xs text-emerald-700 mb-2">{uitnodigWachtwoord.email}</p>
              <div className="flex items-center gap-3">
                <code className="text-lg font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded">{uitnodigWachtwoord.ww}</code>
                <button
                  onClick={() => { navigator.clipboard.writeText(uitnodigWachtwoord.ww); toast("Gekopieerd!"); }}
                  className="text-xs px-2 py-1 rounded bg-emerald-200 text-emerald-800 hover:bg-emerald-300 transition-colors font-semibold"
                >
                  Kopieer
                </button>
              </div>
              <p className="text-xs text-emerald-600 mt-2">Geef dit door via WhatsApp of telefoon. Het staat ook zichtbaar in de ledenlijst totdat je het wist.</p>
            </div>
            <button onClick={() => setUitnodigWachtwoord(null)} className="text-emerald-600 hover:text-emerald-800 shrink-0"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="card p-4 mb-4 bg-[color:var(--color-stone-50)] text-xs text-[color:var(--color-muted)] flex flex-wrap gap-4">
        <span><strong className="text-emerald-700">✓ Lid maken</strong> → toegang als fysiek lid (geen verloopdatum)</span>
        <span><strong className="text-blue-700">📚 Bibliotheek +1 jaar</strong> → online videobibliotheek, verlengbaar</span>
        <span><strong className="text-red-600">✗ Intrekken</strong> → verwijdert alle toegang</span>
        <span><strong className="text-[color:var(--color-gold-600)]">♛ Zwarte band +1 jaar</strong> → exclusieve zwarte band bibliotheek, verlengbaar</span>
        <span><strong className="text-purple-700">AC Academie</strong> → toestemming voor de Academie (vanaf bruine band), geen vervaldatum</span>
        <span><strong className="text-red-700">🗑 Verwijder</strong> → verwijdert het account definitief</span>
      </div>

      <div className="mb-4">
        <input className="input max-w-sm" placeholder="Zoek op e-mailadres…" value={zoek} onChange={e => setZoek(e.target.value)} />
      </div>

      {loading ? <div className="text-center py-12 text-[color:var(--color-muted)]">Laden…</div> : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[color:var(--color-border)] bg-[color:var(--color-stone-50)]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">E-mail</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">Rol</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">Bibliotheek</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">Zwarte band</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">AC</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">Tijdelijk ww</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">Acties</th>
              </tr>
            </thead>
            <tbody>
              {gefilterd.map((l, i) => (
                <tr key={l.id} className={`border-b border-[color:var(--color-border)] ${i % 2 === 0 ? "" : "bg-[color:var(--color-stone-50)]/50"}`}>
                  <td className="px-5 py-4">
                    <span className="font-medium text-[color:var(--color-heading)]">{l.email}</span>
                    {isSuperAdmin(l.email) && <span className="ml-2 text-[10px] text-[color:var(--color-gold-600)]">★ eigenaar</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${rolKleur[l.rol] ?? rolKleur.geen}`}>
                      {rolLabel[l.rol] ?? l.rol.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-[color:var(--color-muted)]">
                    {bibliotheekStatus(l)}
                  </td>
                  <td className="px-5 py-4 text-xs text-[color:var(--color-muted)]">
                    {zwarteBandStatus(l)}
                  </td>
                  <td className="px-5 py-4 text-xs">
                    {l.academie_toegang
                      ? <span className="text-[10px] font-bold px-2 py-1 rounded border bg-purple-100 text-purple-700 border-purple-200">AC</span>
                      : <span className="text-[color:var(--color-muted)]">—</span>}
                  </td>
                  <td className="px-5 py-4 text-xs">
                    {l.tijdelijk_wachtwoord ? (
                      <div className="flex items-center gap-1.5">
                        <code className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">{l.tijdelijk_wachtwoord}</code>
                        <button
                          onClick={() => { navigator.clipboard.writeText(l.tijdelijk_wachtwoord!); toast("Gekopieerd!"); }}
                          title="Kopieer"
                          className="text-emerald-600 hover:text-emerald-800"
                        ><CheckCircle size={12} /></button>
                        <button
                          onClick={() => verwijderTijdelijkWachtwoord(l.id)}
                          title="Wis wachtwoord"
                          className="text-[color:var(--color-muted)] hover:text-red-500"
                        ><X size={12} /></button>
                      </div>
                    ) : <span className="text-[color:var(--color-muted)]">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2 flex-wrap">
                      {/* Lid maken — voor iedereen zonder lid/admin rol */}
                      {l.rol !== "lid" && l.rol !== "admin" && (
                        <button onClick={() => maakLid(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-semibold">
                          <CheckCircle size={12} /> Lid maken
                        </button>
                      )}
                      {/* Bibliotheek — voor alle niet-admin gebruikers */}
                      {l.rol !== "admin" && (
                        <button onClick={() => geefBibliotheek(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors font-semibold">
                          <Library size={12} /> Bibliotheek +1 jaar
                        </button>
                      )}
                      {/* Toegang intrekken */}
                      {(l.rol === "lid" || l.rol === "cursus") && (
                        <button onClick={() => intrekken(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors font-semibold">
                          <XCircle size={12} /> Intrekken
                        </button>
                      )}
                      {/* Zwarte band bibliotheek — voor alle niet-admin gebruikers */}
                      {l.rol !== "admin" && (
                        <button onClick={() => geefZwarteBand(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-[color:var(--color-gold-100)] text-[color:var(--color-gold-600)] hover:bg-[color:var(--color-gold-200)] transition-colors font-semibold">
                          <Crown size={12} /> Zwarte band +1 jaar
                        </button>
                      )}
                      {heeftActieveZwarteBand(l) && (
                        <button onClick={() => trekZwarteBandIn(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors font-semibold">
                          <XCircle size={12} /> Zwarte band intrekken
                        </button>
                      )}
                      {/* Academie-toestemming — voor alle niet-admin gebruikers */}
                      {l.rol !== "admin" && !l.academie_toegang && (
                        <button onClick={() => geefAcademie(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors font-semibold">
                          <CheckCircle size={12} /> Academie (AC)
                        </button>
                      )}
                      {l.academie_toegang && (
                        <button onClick={() => trekAcademieIn(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors font-semibold">
                          <XCircle size={12} /> Academie intrekken
                        </button>
                      )}
                      {/* Account verwijderen */}
                      {!isSuperAdmin(l.email) && (
                        <button onClick={() => verwijderLid(l.id, l.email)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-semibold">
                          <Trash2 size={12} /> Verwijder
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {gefilterd.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-8 text-center text-[color:var(--color-muted)]">Geen gebruikers gevonden</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
