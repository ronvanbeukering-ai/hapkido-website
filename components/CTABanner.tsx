import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function CTABanner({
  title = "Klaar voor je eerste les?",
  subtitle = "Plan een gratis proefles. Geen verplichting, gewoon meedoen en kijken of het klikt.",
  variant = "accent",
}: {
  title?: string;
  subtitle?: string;
  variant?: "accent" | "dark";
}) {
  const isAccent = variant === "accent";
  return (
    <section
      className="relative overflow-hidden"
    >
      {isAccent && (
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 14px)",
          }}
        />
      )}
      <div className="container-x py-16 md:py-24 relative">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-white tracking-tight leading-tight">
            {title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed">{subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/proefles"
              className="inline-flex items-center justify-center gap-2 bg-white text-neutral-950 hover:bg-neutral-100 font-semibold px-7 py-3.5 rounded-md transition-all hover:-translate-y-0.5"
            >
              Gratis proefles
              <ArrowRight size={18} />
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium px-7 py-3.5 rounded-md transition-colors"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
