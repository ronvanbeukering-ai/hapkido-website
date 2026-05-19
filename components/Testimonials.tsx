import { Quote } from "lucide-react";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {testimonials.map((t, i) => (
        <figure key={i} className="card p-6 md:p-7 flex flex-col">
          <Quote className="text-[color:var(--color-accent-500)]" size={28} />
          <blockquote className="mt-4 text-[color:var(--color-text)] leading-relaxed text-sm md:text-base flex-1">
            "{t.quote}"
          </blockquote>
          <figcaption className="mt-6 pt-5 border-t border-[color:var(--color-border)]">
            <div className="font-semibold text-sm">{t.name}</div>
            <div className="text-xs text-[color:var(--color-muted)] mt-0.5">{t.meta}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
