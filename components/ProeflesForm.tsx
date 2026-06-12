"use client";

import { useState } from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { locations } from "@/lib/site";

type State = "idle" | "submitting" | "success" | "error";

const dagPerLocatie: Record<string, string[]> = {
  "Berkel-Enschot": ["Maandag", "Woensdag", "Zaterdag"],
  "Waalwijk": ["Maandag", "Zaterdag"],
};

export function ProeflesForm({ compact = false, locatie }: { compact?: boolean; locatie?: string }) {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [forKid, setForKid] = useState(false);
  const dagen = locatie ? (dagPerLocatie[locatie] ?? ["Maandag", "Woensdag", "Zaterdag"]) : ["Maandag", "Woensdag", "Zaterdag"];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/proefles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Aanvraag mislukt");
      setState("success");
    } catch (err) {
      setErrorMsg((err as Error).message || "Er ging iets mis. Probeer het opnieuw of WhatsApp ons.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[color:var(--color-accent-600)]/15 border border-[color:var(--color-accent-600)]/30 inline-flex items-center justify-center text-[color:var(--color-accent-400)] mb-4">
          <Check size={28} />
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-3xl">Top, je aanvraag staat genoteerd</h3>
        <p className="mt-4 text-[color:var(--color-muted)] leading-relaxed max-w-md mx-auto">
          We sturen je binnen 24 uur een bevestiging met dag, tijd en wat je meeneemt. Vergeet niet je telefoon op stil te zetten, we bellen of appen je vandaag of morgen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "" : "card p-6 md:p-8"} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="naam" className="label">Naam *</label>
          <input id="naam" name="naam" required className="input" placeholder="Voor- en achternaam" />
        </div>
        <div>
          <label htmlFor="email" className="label">E-mail *</label>
          <input id="email" name="email" type="email" required className="input" placeholder="jij@voorbeeld.nl" />
        </div>
        <div>
          <label htmlFor="telefoon" className="label">Telefoon *</label>
          <input id="telefoon" name="telefoon" type="tel" required className="input" placeholder="06 ..." />
        </div>
        <div>
          <label htmlFor="leeftijd" className="label">{forKid ? "Leeftijd kind" : "Leeftijd"}</label>
          <input id="leeftijd" name="leeftijd" type="number" min={6} max={99} className="input" placeholder="bv. 28" />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="label">Voor wie?</legend>
        <div className="grid grid-cols-2 gap-3">
          <label className={`cursor-pointer border rounded-md px-4 py-3 text-sm text-center transition-colors ${!forKid ? "border-[color:var(--color-accent-600)] bg-[color:var(--color-accent-600)]/10" : "border-[color:var(--color-border)] text-[color:var(--color-muted)] hover:border-[color:var(--color-stone-300)]"}`}>
            <input type="radio" name="voor" value="mezelf" defaultChecked onChange={() => setForKid(false)} className="sr-only" />
            Voor mezelf
          </label>
          <label className={`cursor-pointer border rounded-md px-4 py-3 text-sm text-center transition-colors ${forKid ? "border-[color:var(--color-accent-600)] bg-[color:var(--color-accent-600)]/10" : "border-[color:var(--color-border)] text-[color:var(--color-muted)] hover:border-[color:var(--color-stone-300)]"}`}>
            <input type="radio" name="voor" value="kind" onChange={() => setForKid(true)} className="sr-only" />
            Voor mijn kind
          </label>
        </div>
      </fieldset>

      {locatie ? (
        <input type="hidden" name="locatie" value={locatie} />
      ) : (
        <fieldset className="mt-5">
          <legend className="label">Locatie *</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {locations.map((l) => (
              <label key={l.slug} className="cursor-pointer border border-[color:var(--color-border)] hover:border-[color:var(--color-stone-300)] rounded-md px-4 py-3 text-sm text-[color:var(--color-text)] has-[:checked]:border-[color:var(--color-accent-600)] has-[:checked]:bg-[color:var(--color-accent-600)]/10 has-[:checked]:transition-colors">
                <input type="radio" name="locatie" value={l.city} required className="sr-only" />
                {l.city}
              </label>
            ))}
            <label className="cursor-pointer border border-[color:var(--color-border)] hover:border-[color:var(--color-stone-300)] rounded-md px-4 py-3 text-sm text-[color:var(--color-text)] has-[:checked]:border-[color:var(--color-accent-600)] has-[:checked]:bg-[color:var(--color-accent-600)]/10 has-[:checked]:transition-colors">
              <input type="radio" name="locatie" value="onbekend" className="sr-only" />
              Maakt niet uit
            </label>
          </div>
        </fieldset>
      )}

      <div className="mt-5">
        <label htmlFor="dag" className="label">Voorkeursdag</label>
        <select id="dag" name="dag" className="input" defaultValue="">
          <option value="">Kies een dag</option>
          {dagen.map((d) => <option key={d}>{d}</option>)}
          <option>Maakt niet uit</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="opmerking" className="label">Vraag of opmerking</label>
        <textarea id="opmerking" name="opmerking" rows={3} className="input resize-none" placeholder="Optioneel, bv. ik heb een blessure aan..." />
      </div>

      <label className="flex items-start gap-3 mt-6 text-xs text-[color:var(--color-muted)] cursor-pointer">
        <input type="checkbox" required className="mt-0.5 accent-[color:var(--color-accent-600)]" />
        <span>Ik ga akkoord met de <a href="/privacy" className="underline hover:text-[color:var(--color-heading)]">privacyverklaring</a>.</span>
      </label>

      {state === "error" && (
        <div className="mt-4 flex items-start gap-2 text-sm text-[color:var(--color-accent-400)] bg-[color:var(--color-accent-600)]/10 border border-[color:var(--color-accent-600)]/30 rounded-md p-3">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed">
        {state === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Verstuur...
          </>
        ) : (
          "Stuur aanvraag, bevestiging binnen 24u"
        )}
      </button>
      <p className="text-xs text-[color:var(--color-muted)] text-center mt-3">
        Liever direct contact? <a href="https://wa.me/message/GBCYDJPCHVCCA1" target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-text)] hover:text-[color:var(--color-heading)] underline">WhatsApp ons</a>.
      </p>
    </form>
  );
}
