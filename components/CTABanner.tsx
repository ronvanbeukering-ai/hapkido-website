import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

type CTAButton = { label: string; href: string; external?: boolean; icon?: "arrow" | "message" };

export function CTABanner({
  title = "Klaar voor je eerste les?",
  subtitle = "Plan een gratis proefles. Geen verplichting, gewoon meedoen en kijken of het klikt.",
  variant = "accent",
  primary = { label: "Gratis proefles", href: "/proefles" },
  secondary = { label: "WhatsApp", href: site.whatsapp, external: true, icon: "message" },
}: {
  title?: string;
  subtitle?: string;
  variant?: "accent" | "dark";
  primary?: CTAButton;
  secondary?: CTAButton | null;
}) {
  const isAccent = variant === "accent";

  const primaryClass = "inline-flex items-center justify-center gap-2 bg-white text-neutral-950 hover:bg-neutral-100 font-semibold px-7 py-3.5 rounded-md transition-all hover:-translate-y-0.5";
  const secondaryClass = "inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium px-7 py-3.5 rounded-md transition-colors";

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
            {primary.external ? (
              <a href={primary.href} target="_blank" rel="noopener noreferrer" className={primaryClass}>
                {primary.label} {primary.icon === "message" ? <MessageCircle size={18} /> : <ArrowRight size={18} />}
              </a>
            ) : (
              <Link href={primary.href} className={primaryClass}>
                {primary.label} {primary.icon === "message" ? <MessageCircle size={18} /> : <ArrowRight size={18} />}
              </Link>
            )}
            {secondary && (
              secondary.external ? (
                <a href={secondary.href} target="_blank" rel="noopener noreferrer" className={secondaryClass}>
                  {secondary.icon === "arrow" ? <ArrowRight size={18} /> : <MessageCircle size={18} />} {secondary.label}
                </a>
              ) : (
                <Link href={secondary.href} className={secondaryClass}>
                  {secondary.icon === "arrow" ? <ArrowRight size={18} /> : <MessageCircle size={18} />} {secondary.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
