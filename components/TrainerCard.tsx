import Image from "next/image";
import type { Trainer } from "@/lib/site";

export function TrainerCard({ t }: { t: Trainer }) {
  const initials = t.name
    .replace(/^(Master|CGN|KSN)\s+/, "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="group relative overflow-hidden rounded-xl bg-[color:var(--color-stone-200)] border border-[color:var(--color-border)] aspect-[3/4] shadow-sm hover:shadow-lg transition-shadow">
      {t.photo ? (
        <Image
          src={t.photo}
          alt={`${t.name} ${t.shortRank} Hapkido Combinatie${t.location ? `, ${t.location}` : ""}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-stone-200)] to-[color:var(--color-stone-300)] flex items-center justify-center">
          <span className="font-[family-name:var(--font-display)] text-7xl text-[color:var(--color-stone-400)]">
            {initials}
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0e0b08]/90 via-[#0e0b08]/55 to-transparent">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="badge-gold text-[10px]">{t.shortRank}</span>
          {t.location && (
            <span className="text-[10px] text-white/80 uppercase tracking-widest pt-1">{t.location}</span>
          )}
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-xl text-white leading-tight drop-shadow">{t.name}</h3>
        {t.role && <p className="text-xs text-white/85 mt-1 drop-shadow">{t.role}</p>}
      </div>

      <div className="absolute top-0 left-0 w-0 h-1 bg-[color:var(--color-accent-600)] group-hover:w-full transition-all duration-300" />
    </article>
  );
}
