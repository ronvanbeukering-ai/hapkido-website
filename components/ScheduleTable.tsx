import { Info } from "lucide-react";

type Entry = { day: string; time: string; group: string };

export function ScheduleTable({ entries, note }: { entries: Entry[]; note?: string }) {
  return (
    <div className="card p-6 md:p-8">
      <div className="hidden md:grid grid-cols-[140px_180px_1fr] gap-4 pb-3 mb-3 border-b border-[color:var(--color-border)] text-xs uppercase tracking-widest text-[color:var(--color-muted)]">
        <span>Dag</span>
        <span>Tijd</span>
        <span>Groep</span>
      </div>
      <ul className="divide-y divide-[color:var(--color-border)]">
        {entries.map((e, i) => (
          <li
            key={i}
            className="grid grid-cols-2 md:grid-cols-[140px_180px_1fr] gap-x-4 gap-y-1 py-3.5 items-center"
          >
            <span className="text-[color:var(--color-muted)] text-sm font-medium md:font-normal">{e.day}</span>
            <span className="font-semibold text-sm md:text-base text-right md:text-left">{e.time}</span>
            <span className="text-[color:var(--color-muted)] text-xs md:text-sm col-span-2 md:col-span-1 md:text-right">{e.group}</span>
          </li>
        ))}
      </ul>
      {note && (
        <div className="mt-5 flex gap-3 p-4 rounded-md bg-[#0e0b08]/30 border-l-2 border-[color:var(--color-gold)]">
          <Info size={16} className="shrink-0 text-[color:var(--color-gold)] mt-0.5" />
          <p className="text-xs text-[color:var(--color-muted)] leading-relaxed">{note}</p>
        </div>
      )}
    </div>
  );
}
