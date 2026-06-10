"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Video, BookOpen, Users, LogOut, Plus, Trash2, Pencil,
  Save, X, Upload, Crown, CheckCircle, XCircle, ArrowLeft,
  Youtube, Eye, EyeOff,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSuperAdmin, isAdminOrSuperAdmin } from "@/lib/auth";

/* ─── types ─────────────────────────────────────── */
type Profiel = { id: string; email: string; rol: "admin" | "lid" | "cursus" | "geen"; lid_geldig_tot: string | null };
type HKVideo = { id: string; titel: string; beschrijving: string; categorie: string; platform?: string; url?: string; volgorde?: number };
type HKLes  = { nr: number; titel: string; duur: string; categorie: string; gratis: boolean; beschrijving?: string; video_url?: string };
const SB_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_KEY  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.replace("/login"); return; }
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        const p: Profiel = data ?? { id: user.id, email: user.email ?? "", rol: "geen", lid_geldig_tot: null };
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
      <main className="flex-1 overflow-auto bg-[color:var(--color-stone-50)] text-[color:var(--color-text)]">
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
  const supabase = useMemo(() => createClient(), []);
  const fileRef = useRef<HTMLInputElement>(null);
  const [videos, setVideos] = useState<HKVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<HKVideo> | null>(null);
  const [uploading, setUploading] = useState(false);

  const laad = useCallback(async () => {
    const { data } = await supabase.from("hapkido_videos").select("*").order("volgorde", { ascending: true });
    setVideos(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { laad(); }, [laad]);

  async function opslaan() {
    if (!form?.titel) return;
    const rec = {
      id: form.id ?? crypto.randomUUID(),
      titel: form.titel,
      beschrijving: form.beschrijving ?? "",
      categorie: form.categorie ?? "kwan-nyom",
      platform: form.platform ?? "youtube",
      url: form.url ?? form.id ?? "",
      volgorde: form.volgorde ?? videos.length + 1,
    };
    const { error } = await supabase.from("hapkido_videos").upsert(rec);
    if (error) { toast("Fout: " + error.message, "err"); return; }
    toast(form.id ? "Video bijgewerkt!" : "Video toegevoegd!");
    setForm(null);
    laad();
  }

  async function verwijder(id: string) {
    if (!confirm("Video verwijderen?")) return;
    await supabase.from("hapkido_videos").delete().eq("id", id);
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
            <h2 className="font-[family-name:var(--font-display)] text-2xl">{form.titel ? `Bewerk: ${form.titel}` : "Nieuwe video"}</h2>
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
                {form.platform === "youtube" ? "YouTube video-ID of URL" : form.platform === "vimeo" ? "Vimeo video-ID of URL" : "Video URL (na upload)"}
              </label>
              <input className="input" value={form.url ?? form.id ?? ""} onChange={e => setForm(f => ({ ...f, url: e.target.value, id: e.target.value }))} placeholder={form.platform === "youtube" ? "bijv. dQw4w9WgXcQ" : "URL"} />
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
            <button onClick={opslaan} className="btn-primary !py-2"><Save size={16} /> Opslaan</button>
            <button onClick={() => setForm(null)} className="btn-secondary !py-2">Annuleer</button>
          </div>
        </div>
      )}

      {/* Video grid */}
      {loading ? <div className="text-center py-12 text-[color:var(--color-muted)]">Laden…</div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map(v => (
            <div key={v.id} className="card overflow-hidden group">
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
                <div className="absolute inset-0 bg-[#0e0b08]/0 group-hover:bg-[#0e0b08]/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => setForm({ ...v })} className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:scale-105 transition-transform">
                    <Pencil size={14} className="text-stone-700" />
                  </button>
                  <button onClick={() => verwijder(v.id)} className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center shadow hover:scale-105 transition-transform">
                    <Trash2 size={14} className="text-white" />
                  </button>
                </div>
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#0e0b08]/60 text-white uppercase">{v.platform ?? "youtube"}</span>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-[color:var(--color-heading)] truncate">{v.titel}</p>
                <p className="text-xs text-[color:var(--color-muted)] truncate mt-0.5">{v.beschrijving}</p>
                <span className="text-[10px] text-[color:var(--color-muted)] mt-1 block">{catLabel[v.categorie] ?? v.categorie}</span>
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
  const supabase = useMemo(() => createClient(), []);
  const [lessen, setLessen] = useState<HKLes[]>([]);
  const [loading, setLoading] = useState(true);
  const [bewerkt, setBewerkt] = useState<HKLes | null>(null);

  const STANDAARD: HKLes[] = [
    { nr: 1, titel: "Basishoudingen & voetenwerk",        duur: "18m", categorie: "Houding", gratis: true  },
    { nr: 2, titel: "Valbreken (ukemi)",                  duur: "22m", categorie: "Houding", gratis: true  },
    { nr: 3, titel: "Stoten — basisreeks tot rode band",  duur: "30m", categorie: "Stoten",  gratis: false },
    { nr: 4, titel: "Trappen — basisreeks tot rode band", duur: "30m", categorie: "Trappen", gratis: false },
    { nr: 5, titel: "Locks — uitleg en demonstratie",     duur: "35m", categorie: "Locks",   gratis: false },
  ];

  const laad = useCallback(async () => {
    const { data } = await supabase.from("hapkido_lessen").select("*").order("nr");
    setLessen(data && data.length > 0 ? data : STANDAARD);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { laad(); }, [laad]);

  async function slaOp(les: HKLes) {
    const { error } = await supabase.from("hapkido_lessen").upsert(les);
    if (error) { toast("Fout: " + error.message, "err"); return; }
    toast(`Les ${les.nr} opgeslagen!`);
    setBewerkt(null);
    laad();
  }

  const cats = ["Basis", "Grepen", "Slagen", "Werpingen", "Locks", "Verweer", "Wapens"];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">Lessen bewerken</h1>
        <p className="text-sm text-[color:var(--color-muted)] mt-1">Pas titels, duur, beschrijvingen en video-links aan</p>
      </div>

      {bewerkt && (
        <div className="card p-6 mb-6 border-[color:var(--color-accent-300)]">
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
              <label className="label">Video URL (YouTube, Vimeo of lokaal)</label>
              <input className="input" value={bewerkt.video_url ?? ""} onChange={e => setBewerkt(b => b && ({ ...b, video_url: e.target.value }))} placeholder="https://youtube.com/watch?v=…" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Beschrijving</label>
              <textarea className="input min-h-[100px]" value={bewerkt.beschrijving ?? ""} onChange={e => setBewerkt(b => b && ({ ...b, beschrijving: e.target.value }))} placeholder="Wat leert de student in deze les?" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => slaOp(bewerkt)} className="btn-primary !py-2"><Save size={16} /> Opslaan</button>
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
                <button onClick={() => setBewerkt({ ...l })} className="w-8 h-8 rounded-md hover:bg-[color:var(--color-stone-200)] flex items-center justify-center text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)] transition-colors">
                  <Pencil size={14} />
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
  const supabase = useMemo(() => createClient(), []);
  const [leden, setLeden] = useState<Profiel[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoek, setZoek] = useState("");
  const [geldigTot, setGeldigTot] = useState<Record<string, string>>({});

  const laad = useCallback(async () => {
    const { data } = await supabase.from("profiles").select("*").order("email");
    setLeden(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { laad(); }, [laad]);

  async function setRol(id: string, rol: "lid" | "geen") {
    const tot = geldigTot[id] || null;
    await supabase.from("profiles").update({ rol, lid_geldig_tot: rol === "lid" ? tot : null }).eq("id", id);
    toast(rol === "lid" ? "Lid gemaakt!" : "Toegang ingetrokken");
    laad();
  }

  async function activeerCursus(id: string) {
    const over30 = new Date();
    over30.setDate(over30.getDate() + 30);
    const tot = over30.toISOString().slice(0, 10);
    await supabase.from("profiles").update({ rol: "cursus", lid_geldig_tot: tot }).eq("id", id);
    toast("Cursus abonnement geactiveerd (30 dagen)!");
    laad();
  }

  async function verlengCursus(id: string) {
    const huidig = leden.find(l => l.id === id);
    const basis = huidig?.lid_geldig_tot && new Date(huidig.lid_geldig_tot) > new Date()
      ? new Date(huidig.lid_geldig_tot)
      : new Date();
    basis.setDate(basis.getDate() + 30);
    const tot = basis.toISOString().slice(0, 10);
    await supabase.from("profiles").update({ lid_geldig_tot: tot }).eq("id", id);
    toast("Cursus verlengd met 30 dagen!");
    laad();
  }

  async function setAdmin(id: string) {
    await supabase.from("profiles").update({ rol: "admin" }).eq("id", id);
    toast("Admin toegang gegeven!");
    laad();
  }

  const gefilterd = leden.filter(l => l.email?.toLowerCase().includes(zoek.toLowerCase()));

  const rolKleur: Record<string, string> = {
    admin:  "bg-[color:var(--color-gold-100)] text-[color:var(--color-gold-600)] border-[color:var(--color-gold-200)]",
    lid:    "bg-emerald-100 text-emerald-700 border-emerald-200",
    cursus: "bg-blue-100 text-blue-700 border-blue-200",
    geen:   "bg-[color:var(--color-stone-100)] text-[color:var(--color-muted)] border-[color:var(--color-border)]",
  };

  const rolLabel: Record<string, string> = {
    admin:  "ADMIN",
    lid:    "LID",
    cursus: "CURSUS",
    geen:   "GEEN",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">Leden beheren</h1>
          <p className="text-sm text-[color:var(--color-muted)] mt-1">{leden.length} gebruikers geregistreerd</p>
        </div>
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
                <th className="text-left px-5 py-3 text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">Geldig tot</th>
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
                  <td className="px-5 py-4">
                    {(l.rol === "lid" || l.rol === "cursus") ? (
                      <input type="date" className="input !py-1 !px-2 text-xs w-36"
                        value={geldigTot[l.id] ?? l.lid_geldig_tot?.slice(0, 10) ?? ""}
                        onChange={e => setGeldigTot(g => ({ ...g, [l.id]: e.target.value }))}
                        onBlur={() => supabase.from("profiles").update({ lid_geldig_tot: geldigTot[l.id] || null }).eq("id", l.id).then(() => laad())}
                      />
                    ) : (
                      <span className="text-[color:var(--color-muted)] text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2 flex-wrap">
                      {l.rol !== "lid" && l.rol !== "admin" && (
                        <button onClick={() => setRol(l.id, "lid")} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-semibold">
                          <CheckCircle size={12} /> Lid maken
                        </button>
                      )}
                      {l.rol === "geen" && (
                        <button onClick={() => activeerCursus(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors font-semibold">
                          <Video size={12} /> Cursus activeren
                        </button>
                      )}
                      {l.rol === "cursus" && (
                        <button onClick={() => verlengCursus(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors font-semibold">
                          <CheckCircle size={12} /> Verleng 30 dagen
                        </button>
                      )}
                      {(l.rol === "lid" || l.rol === "cursus") && (
                        <button onClick={() => setRol(l.id, "geen")} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-semibold">
                          <XCircle size={12} /> Intrekken
                        </button>
                      )}
                      {l.rol !== "admin" && !isSuperAdmin(l.email) && (
                        <button onClick={() => setAdmin(l.id)} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-[color:var(--color-gold-100)] text-[color:var(--color-gold-600)] hover:bg-[color:var(--color-gold-200)] transition-colors font-semibold">
                          <Crown size={12} /> Admin
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
