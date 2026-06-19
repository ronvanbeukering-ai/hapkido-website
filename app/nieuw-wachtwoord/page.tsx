"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Status = "wachten" | "gereed" | "loading" | "klaar" | "verlopen";

export default function NieuwWachtwoord() {
  const supabase = useMemo(() => createClient(), []);
  const [status, setStatus] = useState<Status>("wachten");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Flow A: implicit — Supabase zet #access_token=xxx&type=recovery in de hash
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token") ?? "";
    if (access_token && hashParams.get("type") === "recovery") {
      supabase.auth.setSession({ access_token, refresh_token })
        .then(({ error }) => setStatus(error ? "verlopen" : "gereed"));
      return;
    }

    // Flow B: PKCE — Supabase zet ?code=xxx in de query string
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      supabase.auth.exchangeCodeForSession(code)
        .then(({ error }) => setStatus(error ? "verlopen" : "gereed"));
      return;
    }

    // Flow C: sessie al gezet via /auth/callback (token_hash flow)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setStatus(s => s === "wachten" ? "gereed" : s);
    });

    // Flow D: event-gebaseerd (PASSWORD_RECOVERY of SIGNED_IN)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setStatus(s => s === "wachten" ? "gereed" : s);
      }
    });

    const timer = setTimeout(() => {
      setStatus(s => s === "wachten" ? "verlopen" : s);
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) return;
    setStatus("loading");
    setErrorMsg("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErrorMsg("Er ging iets mis. Vraag een nieuwe reset-link aan.");
      setStatus("gereed");
    } else {
      setStatus("klaar");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-bg)] px-4 pt-20 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--color-heading)]">
              Hapkido Yong
            </span>
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[color:var(--color-heading)]">
            Nieuw wachtwoord
          </h1>
        </div>

        <div className="card p-8 space-y-6">

          {/* Wachten op recovery-sessie */}
          {status === "wachten" && (
            <div className="text-center py-4">
              <div className="w-8 h-8 border-2 border-[color:var(--color-accent-600)] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-[color:var(--color-muted)] mt-3">Bezig met verificatie…</p>
            </div>
          )}

          {/* Link verlopen */}
          {status === "verlopen" && (
            <div className="text-center space-y-4">
              <div className="flex items-start gap-2 text-red-600 bg-red-50 rounded-lg p-4 text-sm">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>De reset-link is verlopen of ongeldig. Vraag een nieuwe aan.</span>
              </div>
              <Link href="/login" className="btn-primary w-full inline-flex items-center justify-center">
                Terug naar inloggen
              </Link>
            </div>
          )}

          {/* Formulier */}
          {(status === "gereed" || status === "loading") && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[color:var(--color-muted)]">Kies een nieuw wachtwoord voor je account.</p>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[color:var(--color-text-strong)] mb-1.5">
                  Nieuw wachtwoord
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    required minLength={8}
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Minimaal 8 tekens"
                    className="w-full px-4 py-3 pr-11 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] placeholder:text-[color:var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-600)] transition"
                    disabled={status === "loading"}
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)} tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {errorMsg && (
                <div className="flex items-start gap-2 text-red-600 bg-red-50 rounded-lg p-3 text-sm">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <button type="submit" disabled={status === "loading" || password.length < 8}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {status === "loading"
                  ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : "Wachtwoord opslaan"}
              </button>
            </form>
          )}

          {/* Gelukt */}
          {status === "klaar" && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle size={28} className="text-emerald-600" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)]">
                Wachtwoord gewijzigd!
              </h2>
              <p className="text-sm text-[color:var(--color-muted)]">Je kunt nu inloggen met je nieuwe wachtwoord.</p>
              <Link href="/login" className="btn-primary w-full inline-flex items-center justify-center">
                Inloggen
              </Link>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-[color:var(--color-muted)]">
          <Link href="/login" className="hover:underline">Terug naar inloggen</Link>
        </p>
      </div>
    </div>
  );
}
