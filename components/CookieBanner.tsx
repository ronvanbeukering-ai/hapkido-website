"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

export function CookieBanner() {
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    const opgeslagen = localStorage.getItem(STORAGE_KEY);
    if (!opgeslagen) {
      setZichtbaar(true);
    } else if (opgeslagen === "granted") {
      activeerAnalytics();
    }
  }, []);

  function activeerAnalytics() {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  }

  function accepteren() {
    localStorage.setItem(STORAGE_KEY, "granted");
    activeerAnalytics();
    setZichtbaar(false);
  }

  function weigeren() {
    localStorage.setItem(STORAGE_KEY, "denied");
    setZichtbaar(false);
  }

  if (!zichtbaar) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[90] p-4 md:p-6 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto bg-[color:var(--color-stone-900)] border border-white/15 rounded-xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/80 flex-1 leading-relaxed">
          We gebruiken cookies om het bezoek aan onze website te analyseren. Zo kunnen we de site blijven verbeteren.{" "}
          <a href="/privacy" className="text-[color:var(--color-accent-400)] hover:underline">Meer info</a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={weigeren}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white/60 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
          >
            Weigeren
          </button>
          <button
            onClick={accepteren}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[color:var(--color-accent-600)] hover:bg-[color:var(--color-accent-500)] text-white transition-colors"
          >
            Akkoord
          </button>
        </div>
      </div>
    </div>
  );
}
