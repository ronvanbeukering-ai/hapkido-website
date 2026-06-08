"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, CheckCircle, BookOpen, Video, Clock, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { site } from "@/lib/site";

type Stap = "form" | "bevestigd" | "error";

function AanmeldenForm() {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [stap, setStap] = useState<Stap>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [laden, setLaden] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!naam.trim() || !email.trim() || !password) return;
    setLaden(true);
    setErrorMsg("");

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { naam: naam.trim() } },
    });

    if (error) {
      setErrorMsg(
        error.message.includes("already registered")
          ? "Dit e-mailadres is al geregistreerd. Ga naar de inlogpagina."
          : "Er is iets misgegaan. Probeer het opnieuw."
      );
      setStap("error");
      setLaden(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: email.trim().toLowerCase(),
        rol: "geen",
        lid_geldig_tot: null,
      });
    }

    setLaden(false);
    setStap("bevestigd");
  }

  if (stap === "bevestigd") {
    return (
      <div className="card p-8 space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">
            Account aangemaakt!
          </h2>
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">
            Welkom, {naam}. Bevestig je e-mailadres via de link die we hebben gestuurd naar <strong>{email}</strong>.
          </p>
        </div>

        <div className="card p-5 text-left space-y-3 bg-[color:var(--color-accent-50)] border-[color:var(--color-accent-200)]">
          <p className="text-sm font-semibold text-[color:var(--color-accent-800)]">
            Stap 2 — Maak de eenmalige betaling over
          </p>
          <div className="text-sm text-[color:var(--color-accent-700)] space-y-1">
            <div><span className="text-xs text-[color:var(--color-accent-600)] uppercase tracking-widest">Bedrag</span><br />€ 35,00 (eenmalig)</div>
            <div className="mt-2"><span className="text-xs text-[color:var(--color-accent-600)] uppercase tracking-widest">IBAN</span><br /><span className="font-mono">{site.iban}</span></div>
            <div className="mt-2"><span className="text-xs text-[color:var(--color-accent-600)] uppercase tracking-widest">Tenaamstelling</span><br />Yong</div>
            <div className="mt-2"><span className="text-xs text-[color:var(--color-accent-600)] uppercase tracking-widest">Omschrijving</span><br />Online training – {email}</div>
          </div>
          <p className="text-xs text-[color:var(--color-accent-600)] pt-2 border-t border-[color:var(--color-accent-200)]">
            Zodra wij de betaling ontvangen, activeren we je toegang. Dat duurt meestal één werkdag.
          </p>
        </div>

        <p className="text-xs text-[color:var(--color-muted)]">
          Vragen? Mail naar{" "}
          <a href={`mailto:${site.email}`} className="text-[color:var(--color-accent-400)] hover:underline">
            {site.email}
          </a>
        </p>

        <Link href="/cursussen" className="btn-ghost inline-flex">
          Bekijk de cursussen alvast <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="card p-8 space-y-6">
      {stap === "error" && errorMsg && (
        <div className="flex items-start gap-2 text-red-600 bg-red-50 rounded-lg p-3 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="naam" className="block text-sm font-medium text-[color:var(--color-text-strong)] mb-1.5">
            Naam
          </label>
          <input
            id="naam"
            type="text"
            required
            autoComplete="name"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            placeholder="Jouw naam"
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] placeholder:text-[color:var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-600)] transition"
            disabled={laden}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[color:var(--color-text-strong)] mb-1.5">
            E-mailadres
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jouw@email.nl"
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] placeholder:text-[color:var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-600)] transition"
            disabled={laden}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[color:var(--color-text-strong)] mb-1.5">
            Wachtwoord
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimaal 8 tekens"
              className="w-full px-4 py-3 pr-11 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] placeholder:text-[color:var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-600)] transition"
              disabled={laden}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
              tabIndex={-1}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={laden || !naam.trim() || !email.trim() || password.length < 8}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {laden ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Account aanmaken"
          )}
        </button>
      </form>

      <div className="border-t border-[color:var(--color-border)] pt-4">
        <p className="text-xs text-[color:var(--color-muted)] text-center">
          Al een account?{" "}
          <Link href="/login" className="text-[color:var(--color-accent-400)] hover:underline">
            Inloggen
          </Link>
        </p>
      </div>
    </div>
  );
}

const voordelen = [
  { icon: BookOpen, t: "12 lessen",        b: "Van basis tot gevorderd, opgebouwd door Master Ron van Beukering." },
  { icon: Video,    t: "Videobibliotheek", b: "Trainingsopnames en demonstraties om thuis te oefenen." },
  { icon: Clock,    t: "Op jouw tempo",    b: "Kijk en herkijk wanneer het jou uitkomt, geen vaste trainingstijden." },
];

export default function OnlineAanmeldenPage() {
  return (
    <div className="min-h-screen px-4 pt-20 pb-16">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <span className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">
              Hapkido Yong
            </span>
          </Link>
          <div className="badge-gold inline-flex mb-4">Online training</div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-[color:var(--color-heading)] tracking-tight leading-tight">
            Hapkido thuis trainen<br />eenmalig €35
          </h1>
          <p className="mt-4 text-[color:var(--color-muted)] max-w-xl mx-auto leading-relaxed">
            Geen vaste trainingstijden, geen dojo nodig. Volg de online cursus van Master Ron van Beukering en oefen wanneer het jou uitkomt.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {voordelen.map(({ icon: Icon, t, b }) => (
            <div key={t} className="card p-6 text-center">
              <div className="w-11 h-11 rounded-md bg-[color:var(--color-accent-600)]/15 border border-[color:var(--color-accent-600)]/30 inline-flex items-center justify-center text-[color:var(--color-accent-400)] mb-3">
                <Icon size={20} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl">{t}</h3>
              <p className="mt-1 text-sm text-[color:var(--color-muted)] leading-relaxed">{b}</p>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">
              Account aanmaken
            </h2>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              Maak een gratis account aan. Na betaling activeren wij je toegang.
            </p>
          </div>

          <Suspense fallback={<div className="card p-8 animate-pulse h-64" />}>
            <AanmeldenForm />
          </Suspense>

          <p className="mt-4 text-center text-xs text-[color:var(--color-muted)]">
            <Link href="/" className="hover:underline">Terug naar website</Link>
            {" · "}
            <Link href="/cursussen" className="hover:underline">Bekijk cursussen</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
