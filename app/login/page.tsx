"use client";

import Link from "next/link";
import { ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type State = "idle" | "loading" | "error";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [state, setState] = useState<State>(authError ? "error" : "idle");
  const [errorMsg, setErrorMsg] = useState(
    authError === "auth_failed" ? "De inloglink is verlopen of ongeldig. Probeer opnieuw." : ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setState("loading");
    setErrorMsg("");

    const supabase = createClient();
    const timeout = new Promise<{ error: Error }>(resolve =>
      setTimeout(() => resolve({ error: new Error("timeout") }), 30000)
    );
    const { error } = await Promise.race([
      supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password }),
      timeout,
    ]);

    if (error) {
      setState("error");
      setErrorMsg(
        error.message === "timeout"
          ? "Verbinding te traag. Probeer het opnieuw."
          : "E-mailadres of wachtwoord klopt niet."
      );
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="card p-8 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={state === "loading"}
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-11 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] placeholder:text-[color:var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-600)] transition"
              disabled={state === "loading"}
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

        {(state === "error" || errorMsg) && (
          <div className="flex items-start gap-2 text-red-600 bg-red-50 rounded-lg p-3 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg || "Er ging iets mis. Probeer het opnieuw."}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={state === "loading" || !email.trim() || !password}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "loading" ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Inloggen"
          )}
        </button>
      </form>

      <div className="border-t border-[color:var(--color-border)] pt-4 space-y-2">
        <p className="text-xs text-[color:var(--color-muted)] text-center">
          Nog geen account?
        </p>
        <Link href="/contributie" className="btn-secondary w-full inline-flex items-center justify-center gap-2 text-sm">
          Lid worden (mat-training) <ArrowRight size={15} />
        </Link>
        <Link href="/online-aanmelden" className="btn-secondary w-full inline-flex items-center justify-center gap-2 text-sm !border-[color:var(--color-gold-500)] !text-[color:var(--color-gold-300)] hover:!bg-[color:var(--color-gold-600)]/10">
          Online trainen – vanaf €7,50/maand <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
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
            Inloggen
          </h1>
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">
            Voor leden en online abonnees
          </p>
        </div>

        <Suspense fallback={<div className="card p-8 animate-pulse h-64" />}>
          <LoginForm />
        </Suspense>

        <p className="mt-4 text-center text-xs text-[color:var(--color-muted)]">
          <Link href="/" className="hover:underline">
            Terug naar website
          </Link>
        </p>
      </div>
    </div>
  );
}
