"use client";

import { useState } from "react";
import { Check, MessageCircle, AlertCircle } from "lucide-react";
import { locations, site } from "@/lib/site";

type State = "idle" | "success" | "error";

const dagPerLocatie: Record<string, string[]> = {
  "Berkel-Enschot": ["Maandag", "Woensdag", "Zaterdag"],
  "Waalwijk": ["Maandag", "Zaterdag"],
};

export function ProeflesForm({ compact = false, locatie }: { compact?: boolean; locatie?: string }) {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [forKid, setForKid] = useState(false);
  const dagen = locatie
    ? (dagPerLocatie[locatie] ?? ["Maandag", "Woensdag", "Zaterdag"])
    : ["Maandag", "Woensdag", "Zaterdag"];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const naam = String(fd.get("naam") ?? "").trim();
    const telefoon = String(fd.get("telefoon") ?? "").trim();
    const leeftijd = String(fd.get("leeftijd") ?? "").trim();
    const locatieValue = locatie ?? String(fd.get("locatie") ?? "onbekend");
    const dag = String(fd.get("dag") ?? "").trim();
    const opmerking = String(fd.get("opmerking") ?? "").trim();

    if (!naam || !telefoon || !leeftijd || !locatieValue) {
      setErrorMsg("Vul minimaal je naam, telefoonnummer, leeftijd en locatie in.");
      setState("error");
      return;
    }

    const bericht = [
      "Hallo Hapkido Yong,",
      "",
      "Ik wil graag een gratis proefles aanvragen.",
      "",
      `Naam: ${naam}`,
      `Leeftijd: ${leeftijd} jaar`,
      `Voor: ${forKid ? "mijn kind" : "mezelf"}`,
      `Telefoon: ${telefoon}`,
      `Locatie: ${locatieValue}`,
      `Voorkeursdag: ${dag || "Maakt niet uit"}`,
      opmerking ? `Opmerking: ${opmerking}` : "",
    ].filter(Boolean).join("\n");

    const telefoonIntern = site.phoneRaw.replace(/\D/g, "");
    const url = `https://wa.me/${telefoonIntern}?text=${encodeURIComponent(bericht)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[color:var(--color-accent-600)]/15 border border-[color:var(--color-accent-600)]/30 inline-flex items-center justify-center text-[color:var(--color-accent-400)] mb-4">
          <Check size={28} />
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-3xl">WhatsApp is geopend</h3>
        <p className="mt-4 text-[color:var(--color-muted)] leading-relaxed max-w-md mx-auto">
          Verstuur het bericht in WhatsApp. Vermeld daarin je leeftijd en gewenste locatie. We nemen daarna contact met je op.
        </p>
        <button type="button" onClick={() => setState("idle")} className="btn-ghost mt-5">
          Nieuw bericht samenstellen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "" : "card p-6 md:p-8"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="naam" className="label">Naam *</label>
          <input id="naam" name="naam" required className="input" placeholder="Voor- en achternaam" />
        </div>
        <div>
          <label htmlFor="telefoon" className="label">Telefoon *</label>
          <input id="telefoon" name="telefoon" type="tel" required className="input" placeholder="06 ..." />
        </div>
        <div>
          <label htmlFor="leeftijd" className="label">{forKid ? "Leeftijd kind" : "Leeftijd"} *</label>
          <input id="leeftijd" name="leeftijd" type="number" required min={4} max={99} className="input" placeholder="bv. 28" />
        </div>
        <div>
          <label htmlFor="dag" className="label">Voorkeursdag</label>
          <select id="dag" name="dag" className="input" defaultValue="">
            <option value="">Kies een dag</option>
            {dagen.map((d) => <option key={d}>{d}</option>)}
            <option>Maakt niet uit</option>
          </select>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="label">Voor wie? *</legend>
        <div className="grid grid-cols-2 gap-3">
          <label className={`cursor-pointer border rounded-md px-4 py-3 text-sm text-center transition-colors ${!forKid ? "border-[color:var(--color-accent-600)] bg-[color:var(--color-accent-600)]/10" : "border-[color:var(--color-border)] text-[color:var(--color-muted)]"}`}>
            <input type="radio" name="voor" value="mezelf" defaultChecked onChange={() => setForKid(false)} className="sr-only" />
            Voor mezelf
          </label>
          <label className={`cursor-pointer border rounded-md px-4 py-3 text-sm text-center transition-colors ${forKid ? "border-[color:var(--color-accent-600)] bg-[color:var(--color-accent-600)]/10" : "border-[color:var(--color-border)] text-[color:var(--color-muted)]"}`}>
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
              <label key={l.slug} className="cursor-pointer border border-[color:var(--color-border)] rounded-md px-4 py-3 text-sm text-[color:var(--color-text)] has-[:checked]:border-[color:var(--color-accent-600)] has-[:checked]:bg-[color:var(--color-accent-600)]/10">
                <input type="radio" name="locatie" value={l.city} required className="sr-only" />
                {l.city}
              </label>
            ))}
            <label className="cursor-pointer border border-[color:var(--color-border)] rounded-md px-4 py-3 text-sm text-[color:var(--color-text)] has-[:checked]:border-[color:var(--color-accent-600)] has-[:checked]:bg-[color:var(--color-accent-600)]/10">
              <input type="radio" name="locatie" value="onbekend" className="sr-only" />
              Maakt niet uit
            </label>
          </div>
        </fieldset>
      )}

      <div className="mt-5">
        <label htmlFor="opmerking" className="label">Vraag of opmerking</label>
        <textarea id="opmerking" name="opmerking" rows={3} className="input resize-none" placeholder="Optioneel" />
      </div>

      {state === "error" && (
        <div className="mt-4 flex items-start gap-2 text-sm text-[color:var(--color-accent-300)] bg-[color:var(--color-accent-600)]/10 border border-[color:var(--color-accent-600)]/30 rounded-md p-3">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button type="submit" className="btn-primary w-full mt-6">
        <MessageCircle size={18} /> Stuur aanvraag via WhatsApp
      </button>
      <p className="text-xs text-[color:var(--color-muted)] text-center mt-3">
        Vermeld in het bericht je leeftijd en gewenste locatie.
      </p>
    </form>
  );
}
