"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Video, BookOpen, Users, LogOut, Plus, Trash2, Pencil,
  Save, X, Upload, Crown, CheckCircle, XCircle, ArrowLeft,
  Youtube, Library,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSuperAdmin, isAdminOrSuperAdmin } from "@/lib/auth";

/* ─── types ─────────────────────────────────────── */
type Profiel = { id: string; email: string; rol: "admin" | "lid" | "cursus" | "geen"; lid_geldig_tot: string | null };
type HKVideo = { id: string; titel: string; beschrijving: string; categorie: string; platform?: string; url?: string; volgorde?: number };
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
  const res = await fetch(url, options);
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, data: json.data, error: json.error as string | undefined };
}

/* ─── main component ─────────────────────────────── */
export default function Dashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [profiel, setProfiel] = useState<Profiel | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("videos");

  useEffect(() => {
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) { router.replace("/login"); return; }
        const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
        const p: Profiel = data ?? { id: session.user.id, email: session.user.email ?? "", rol: "geen", lid_geldig_tot: null };
        if (!isAdminOrSuperAdmin(p.email, p.rol)) { router.replace("/"); return; }
        setProfiel(p);
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [supabase, router]);

  async function uitloggen() {
    await supabase.auth.signOut();
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

  const laad = useCallback(async () => {
    const { ok, data, error } = await apiFetch("/api/admin/videos");
    if (!ok) { toast("Laden mislukt: " + error, "err"); return; }
    setVideos(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { laad(); }, [laad]);

  async function opslaan() {
    if (!form?.titel) return;
    setSaving(true);
    const rec: HKVideo = {
      id:          form.id ?? crypto.randomUUID(),
      titel:       form.titel,
      beschrijving: form.beschrijving ?? "",
      categorie:   form.categorie ?? "kwan-nyom",
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

  const categorieen = ["kwan-nyom", "hapkido-nederland", "eigen"];
  const catLabel: Record<string, string> = { "kwan-nyom": "Kwan Nyom Hapkido", "hapkido-nederland": "Hapkido Nederland", "eigen": "Eigen video's" };

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
          {videos.map(v => (
            <div key={v.id} className="card overflow-hidden">
              {/* Thumbnail */}
              <div className="aspect-video bg-stone-200 relative overflow-hidden">
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
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#0e0b08]/60 text-white uppercase">{v.platform ?? "youtube"}</span>
              </div>
              {/* Info + knoppen */}
              <div className="p-3">
                <p className="text-sm font-semibold text-[color:var(--color-heading)] truncate">{v.titel}</p>
                <p className="text-xs text-[color:var(--color-muted)] truncate mt-0.5">{v.beschrijving}</p>
                <span className="text-[10px] text-[color:var(--color-muted)] mt-1 block">{catLabel[v.categorie] ?? v.categorie}</span>
                <div className="flex gap-2 mt-3 pt-3 border-t border-[color:var(--color-border)]">
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

  async function uitnodigen() {
    if (!nieuwEmail.trim()) return;
    setUitnodigBusy(true);
    const { ok, error } = await apiFetch("/api/admin/leden", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ naam: nieuwNaam.trim(), email: nieuwEmail.trim() }),
    });
    setUitnodigBusy(false);
    if (!ok) { toast("Fout: " + (error ?? "onbekend"), "err"); return; }
    toast("Uitnodiging verstuurd naar " + nieuwEmail.trim());
    setNieuwNaam(""); setNieuwEmail(""); setNieuwForm(false);
    laad();
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
            Het lid ontvangt een e-mail met een link om een wachtwoord in te stellen. Na het instellen is het account direct actief als <strong>lid</strong>.
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

      {/* Legenda */}
      <div className="card p-4 mb-4 bg-[color:var(--color-stone-50)] text-xs text-[color:var(--color-muted)] flex flex-wrap gap-4">
        <span><strong className="text-emerald-700">✓ Lid maken</strong> → toegang als fysiek lid (geen verloopdatum)</span>
        <span><strong className="text-blue-700">📚 Bibliotheek +1 jaar</strong> → online videobibliotheek, verlengbaar</span>
        <span><strong className="text-red-600">✗ Intrekken</strong> → verwijdert alle toegang</span>
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
                <tr><td colSpan={4} className="px-5 py-8 text-center text-[color:var(--color-muted)]">Geen gebruikers gevonden</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
