"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, MessageCircle, Play } from "lucide-react";
import { site } from "@/lib/site";

export function HomeHero() {
  const [videoActive, setVideoActive] = useState(false);

  return (
    <section className="dark-section relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900" />
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(201,58,22,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(212,160,48,0.18) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 22px)",
          }}
        />
      </div>

      <div className="relative z-10 container-x text-center pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="badge-red inline-flex mb-6">
          <span>Berkel-Enschot · Waalwijk · sinds 2006</span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-8xl text-white tracking-tight leading-[0.95] max-w-5xl mx-auto">
          Zelfverdediging<br />
          <span className="text-[color:var(--color-accent-400)]">voor alle</span> leeftijden
        </h1>
        <p className="mt-6 text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
          Hapkido Combinatie, het Koreaanse MMA. Vanaf 7 jaar, twee locaties in Brabant, een sterke groep.
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

        <div className="mt-12 md:mt-14 max-w-2xl mx-auto">
          {!videoActive ? (
            <button
              type="button"
              onClick={() => setVideoActive(true)}
              className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer border border-white/15 shadow-2xl"
              aria-label="Speel de introvideo af"
            >
              <img
                src="https://vumbnail.com/400308195.jpg"
                alt="Bekijk een training bij Hapkido Yong"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent group-hover:from-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <Play size={26} className="text-stone-900 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-3 left-4 text-white text-xs md:text-sm font-medium drop-shadow">
                Bekijk een echte training
              </div>
            </button>
          ) : (
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/15 shadow-2xl">
              <iframe
                src="https://player.vimeo.com/video/400308195?autoplay=1&title=0&byline=0&portrait=0"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Hapkido Yong training"
              />
            </div>
          )}
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
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumb?: { name: string; href: string }[];
  bgImage?: string;
}) {
  return (
    <section className="dark-section relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {bgImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${bgImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/55 via-stone-950/45 to-stone-950/85" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900" />
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
