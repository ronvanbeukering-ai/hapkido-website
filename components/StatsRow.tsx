import { site } from "@/lib/site";

export function StatsRow() {
  return (
    <section className="bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {site.stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-10 md:py-14 px-4 text-center ${
                i < site.stats.length - 1 ? "md:border-r border-[color:var(--color-border)]" : ""
              } ${i % 2 === 0 ? "border-r border-[color:var(--color-border)] md:border-r" : ""} ${
                i < 2 ? "border-b border-[color:var(--color-border)] md:border-b-0" : ""
              }`}
            >
              <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[color:var(--color-accent-500)] tracking-tight">
                {s.value}
              </div>
              <div className="text-[10px] md:text-xs text-[color:var(--color-muted)] uppercase tracking-widest mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
