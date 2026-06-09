"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="dark-section relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero background photo zoomed in */}
        <img
          src="/images/training/ron-hapkido-strand.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ transform: "scale(1.12)", transformOrigin: "center center" }}
          fetchPriority="high"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0e0b08]/65" />
        {/* Brand colour gradient on top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(59,24,0,0.45) 0%, rgba(14,11,8,0.1) 50%, rgba(14,11,8,0.75) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(230,100,20,0.40) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(240,130,30,0.22) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 container-x text-center pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="badge-red inline-flex mb-6">
          <span>Berkel-Enschot · Waalwijk · sinds 2006</span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-8xl text-white tracking-tight leading-[0.95] max-w-5xl mx-auto">
          Hapkido<br />
          <span className="text-[color:var(--color-accent-400)]">voor alle</span> leeftijden
        </h1>
        <p className="mt-6 text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
          Hapkido Combinatie, het Koreaanse MMA. Zelfverdediging voor vrouwen, mannen en kinderen. Twee locaties in Noord-Brabant: Berkel-Enschot en Waalwijk.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link href="/proefles" className="btn-primary w-full sm:w-auto group">
            Plan je gratis proefles
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto">
            <MessageCircle size={18} /> WhatsApp direct
          </a>
        </div>

      </div>

      <a
        href="#wat-is-hapkido"
        aria-label="Scroll naar content"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white animate-bounce"
      >
        <ChevronDown size={26} />
      </a>
    </section>
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumb,
  bgImage,
  bgPosition = "center",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumb?: { name: string; href: string }[];
  bgImage?: string;
  bgPosition?: string;
}) {
  return (
    <section className="dark-section relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {bgImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover"
              style={{ backgroundImage: `url('${bgImage}')`, backgroundPosition: bgPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0b08]/55 via-[#3d1a00]/45 to-[#a05000]/85" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e0b08] via-[#3d1a00] to-[#a05000]" />
        )}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-soft-light pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(201,100,22,0.12) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="container-x">
        {breadcrumb && (
          <nav aria-label="Kruimelpad" className="mb-6 text-xs text-white/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumb.map((b, i) => (
                <li key={b.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-white/30">/</span>}
                  <Link href={b.href} className="hover:text-white">{b.name}</Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <div className="badge-red mb-4">{eyebrow}</div>}
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1] max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
