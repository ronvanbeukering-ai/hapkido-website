import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Clock } from "lucide-react";
import type { Location } from "@/lib/site";

export function LocationCard({ loc }: { loc: Location }) {
  const preview = loc.schedule.slice(0, 3);
  const extra = loc.schedule.length - preview.length;

  return (
    <article className="card card-hover group relative overflow-hidden flex flex-col">
      <div className="aspect-[16/10] bg-[color:var(--color-stone-200)] relative overflow-hidden">
        <Image
          src={loc.photo}
          alt={`Hapkido Yong ${loc.city} Hapkido Combinatie training, ${loc.street}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/15 to-stone-950/10" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#0e0b08]/80 backdrop-blur text-white text-sm font-semibold shadow-md border border-white/20">
            {loc.city}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white/95 text-sm font-medium drop-shadow">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{loc.street}</span>
        </div>
      </div>

      <div className="p-6 md:p-7 flex flex-col flex-1">
        <dl className="divide-y divide-[color:var(--color-border)]">
          {preview.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-[5rem_1fr_auto] items-baseline gap-x-4 py-3 first:pt-0 last:pb-0"
            >
              <dt className="text-sm font-medium text-[color:var(--color-muted)]">
                {s.day}
              </dt>
              <dd className="text-sm font-semibold text-[color:var(--color-heading)] tabular-nums">
                {s.time}
              </dd>
              <dd className="text-xs text-[color:var(--color-muted)] truncate text-right max-w-[10rem]">
                {s.group}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-center justify-between gap-3 pt-4 border-t border-[color:var(--color-border)]">
          {extra > 0 ? (
            <span className="inline-flex items-center gap-1 text-xs text-[color:var(--color-muted)]">
              <Clock size={12} /> +{extra} extra lestijden
            </span>
          ) : (
            <span />
          )}
          <Link
            href={`/lessen/${loc.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-accent-400)] hover:text-[color:var(--color-accent-300)] group/cta"
          >
            Bekijk {loc.city}
            <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
