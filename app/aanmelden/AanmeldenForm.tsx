"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { site } from "@/lib/site";

type Stap = "form" | "bevestigd" | "error";

export function AanmeldenForm() {
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
      await fetch("/api/aanmelden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam: naam.trim(), email: email.trim().toLowerCase() }),
      });
    }

    setLaden(false);
    setStap("bevestigd");
  }

  if (stap === "bevestigd") {
    return (
      <div className="card p-8 space-y-5 text-center max-w-md mx-auto">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle size={28} className="text-emerald-600" />
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">
          Aanmelding ontvangen!
        </h2>
        <p className="text-[color:var(--color-muted)] leading-relaxed text-sm">
          Bevestig je e-mailadres via de link die we hebben gestuurd naar <strong className="text-[color:var(--color-text)]">{email}</strong>.
        </p>
        <p className="text-[color:var(--color-muted)] text-sm">
          Zodra je toegang geactiveerd is, ontvang je bericht. Heb je vragen? Stuur ons een bericht via{" "}
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-accent-400)] underline">WhatsApp</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-8 space-y-5 max-w-md mx-auto">
      {stap === "error" && errorMsg && (
        <div className="flex items-start gap-2 text-red-600 bg-red-50 rounded-lg p-3 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="naam" className="label">Naam *</label>
          <input
            id="naam" type="text" required autoComplete="name"
            value={naam} onChange={(e) => setNaam(e.target.value)}
            placeholder="Voor- en achternaam"
            className="input" disabled={laden}
          />
        </div>

        <div>
          <label htmlFor="email" className="label">E-mailadres *</label>
          <input
            id="email" type="email" required autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="jouw@email.nl"
            className="input" disabled={laden}
          />
        </div>

        <div>
          <label htmlFor="password" className="label">Wachtwoord *</label>
          <div className="relative">
            <input
              id="password" type={showPw ? "text" : "password"} required minLength={8}
              autoComplete="new-password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimaal 8 tekens"
              className="input pr-11" disabled={laden}
            />
            <button
              type="button" onClick={() => setShowPw((v) => !v)} tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={laden || !naam.trim() || !email.trim() || password.length < 8}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {laden
            ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
            : "Account aanmaken"}
        </button>
      </form>

      <p className="text-xs text-[color:var(--color-muted)] text-center border-t border-[color:var(--color-border)] pt-4">
        Al een account?{" "}
        <Link href="/login" className="text-[color:var(--color-accent-400)] hover:underline">Inloggen</Link>
      </p>
    </div>
  );
}
