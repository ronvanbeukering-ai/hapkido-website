"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"in" | "aan">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (tab === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push("/cursussen");
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      setSuccess("Account aangemaakt! Controleer je e-mail om te bevestigen.");
      setLoading(false);
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
            Ledentoegang
          </h1>
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">
            Log in voor volledige toegang tot de cursussen en video&apos;s
          </p>
        </div>

        <div className="card p-8">
          {/* Tabs */}
          <div className="flex rounded-lg bg-[color:var(--color-surface-2)] p-1 mb-6">
            {(["in", "aan"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
                  tab === t
                    ? "bg-[color:var(--color-surface)] shadow text-[color:var(--color-heading)]"
                    : "text-[color:var(--color-muted)] hover:text-[color:var(--color-text-strong)]"
                }`}
              >
                {t === "in" ? "Inloggen" : "Account aanmaken"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="label">E-mailadres</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)]" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-9"
                  placeholder="jouw@email.nl"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label">Wachtwoord</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete={tab === "in" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)] hover:text-[color:var(--color-text-strong)]"
                  aria-label={showPass ? "Verberg wachtwoord" : "Toon wachtwoord"}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              <LogIn size={18} />
              {loading ? "Bezig…" : tab === "in" ? "Inloggen" : "Account aanmaken"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[color:var(--color-muted)]">
            Nog geen lid?{" "}
            <Link href="/contributie" className="text-[color:var(--color-accent-700)] hover:underline font-semibold">
              Bekijk de contributie
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-[color:var(--color-muted)]">
          <Link href="/" className="hover:underline">← Terug naar website</Link>
        </p>
      </div>
    </div>
  );
}
