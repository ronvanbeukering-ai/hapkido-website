import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Heart, Brain, Zap, Users, Flame, Play } from "lucide-react";
import { HomeHero } from "@/components/Hero";
import { LocationCard } from "@/components/LocationCard";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { VideoGallery } from "@/components/VideoGallery";
import { videoSchema } from "@/lib/jsonld";
import { locations, benefits, faq, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Hapkido Yong — Hapkido Combinatie in Berkel-Enschot & Waalwijk" },
  description:
    "Hapkido Combinatie (Koreaans MMA) bij Hapkido Yong in Berkel-Enschot en Waalwijk. Zelfverdediging voor alle leeftijden onder leiding van Master Ron van Beukering. Gratis proefles.",
  keywords: [
    "hapkido nederland",
    "hapkido combinatie",
    "kwan nyom hapkido",
    "hapkido berkel-enschot",
    "hapkido waalwijk",
    "hapkido tilburg",
    "hapkido noord-brabant",
    "ron van beukering",
    "zelfverdediging nederland",
    "koreaans mma",
  ],
  alternates: { canonical: site.url },
  openGraph: {
    title: "Hapkido Yong Hapkido Combinatie in Berkel-Enschot & Waalwijk",
    description:
      "Hapkido Combinatie (Koreaans MMA) bij Hapkido Yong in Berkel-Enschot en Waalwijk. Zelfverdediging voor alle leeftijden onder leiding van Master Ron van Beukering. Gratis proefles.",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/images/training/training-1.jpg",
        width: 1200,
        height: 630,
        alt: "Hapkido Yong Hapkido Combinatie training in Berkel-Enschot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hapkido Yong Hapkido Combinatie in Noord-Brabant",
    description:
      "Hapkido Combinatie bij Hapkido Yong. Twee locaties: Berkel-Enschot en Waalwijk. Gratis proefles.",
    images: ["/images/training/training-1.jpg"],
  },
};

const benefitIcons = [Shield, Zap, Heart, Brain, Flame, Users];

const trainingPhotos = [
  {
    src: "/images/training/training-1.jpg",
    alt: "Hapkido training trappen en stoten bij Hapkido Yong Berkel-Enschot",
    caption: "Trappen en stoten",
  },
  {
    src: "/images/training/training-2.jpg",
    alt: "Groepsles bij Hapkido Yong Waalwijk gemixte groep volwassenen en jongeren",
    caption: "Groepsles Waalwijk",
  },
  {
    src: "/images/training/training-3.jpg",
    alt: "Grondtechnieken en klemmen tijdens Hapkido Combinatie training",
    caption: "Grondtechnieken & klemmen",
  },
  {
    src: "/images/training/training-4.jpg",
    alt: "Hapkido Yong dojang in Berkel-Enschot trainingsruimte Kerkstraat 9B",
    caption: "Dojang Berkel-Enschot",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={videoSchema} />
      <HomeHero />

      <section id="wat-is-hapkido" className="section">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <div className="badge-red mb-4">Hapkido Combinatie</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-[1] mb-6">
              Hapkido Combinatie:<br />diverse vechtsporten in één
            </h2>
            <p className="text-base md:text-lg text-[color:var(--color-muted)] leading-relaxed">
              Hapkido Combinatie is Hapkido gecombineerd met inzichten uit andere martial arts. Door het samenbrengen van verdedigingsstijlen en vooropleidingen in Fysiotherapie, Manueel therapie en Shiatsu therapie is er een methode ontstaan waarbij je het maximum haalt uit praktische zelfverdediging.
            </p>
          </Reveal>

          <div className="mt-10">
            <Link href="/hapkido-combinatie" className="btn-ghost">
              Lees meer over Hapkido Combinatie <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trainingsvideo's lokale opnames */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">In de training</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-tight text-white">
              Bekijk de lessen van Hapkido Yong
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl">
              Echte trainingsopnames, geen toneelstukken, gewoon de mat.
            </p>
          </Reveal>
          <div className="mt-10">
            <VideoGallery />
          </div>
          <Reveal>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="badge-gold text-xs whitespace-nowrap">Ledenvoordeel</span>
              <p className="text-sm md:text-base text-white/80">
                Leden hebben <span className="text-[color:var(--color-gold-400)] font-medium">gratis toegang tot onze volledige videotheek</span> met alle trainingsopnames — inbegrepen bij je lidmaatschap.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trainingsfoto's */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">In de dojang</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-tight">
              Op de mat in Brabant
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {trainingPhotos.map((p, i) => (
              <Reveal key={p.src} delay={i * 60}>
                <figure className="group relative overflow-hidden rounded-xl aspect-square bg-[color:var(--color-stone-200)]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#0e0b08]/80 to-transparent text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Locaties</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-tight">
              Twee dojang&apos;s in Noord-Brabant
            </h2>
            <p className="mt-4 text-[color:var(--color-muted)] max-w-2xl">
              Kies de locatie die het beste bij je past.
            </p>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {locations.map((l, i) => (
              <Reveal key={l.slug} delay={i * 100}>
                <LocationCard loc={l} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Online training callout */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="card p-6 md:p-8 border-[color:var(--color-gold-600)] flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-[color:var(--color-gold-600)]/15 border border-[color:var(--color-gold-600)]/30 inline-flex items-center justify-center text-[color:var(--color-gold-400)] shrink-0">
                <Play size={24} />
              </div>
              <div className="flex-1">
                <div className="badge-gold mb-2">Online training</div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-tight">
                  Woon je te ver weg of wil je eerst thuis oefenen?
                </h3>
                <p className="mt-2 text-sm text-[color:var(--color-muted)] max-w-xl leading-relaxed">
                  Volg de volledige Hapkido Combinatie cursus van Master Ron vanuit huis. Vijf lessen met video's — €7,50 per maand of €50 per jaar.
                </p>
              </div>
              <Link href="/online-aanmelden" className="btn-primary shrink-0">
                Start online <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Wat je krijgt</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-tight max-w-3xl">
              Sterker, fitter,<br />zelfverzekerder
            </h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const Icon = benefitIcons[i] ?? Shield;
              return (
                <Reveal key={b.title} delay={i * 60}>
                  <div className="card p-6 h-full hover:border-[color:var(--color-stone-300)] transition-colors">
                    <div className="w-11 h-11 rounded-md bg-[color:var(--color-accent-600)]/15 border border-[color:var(--color-accent-600)]/30 inline-flex items-center justify-center text-[color:var(--color-accent-400)] mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl">{b.title}</h3>
                    <p className="mt-2 text-sm text-[color:var(--color-muted)] leading-relaxed">{b.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Het team</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight leading-tight mb-6">
              Gediplomeerde trainers in Noord-Brabant
            </h2>
            <p className="text-[color:var(--color-muted)] leading-relaxed max-w-2xl mb-6">
              Een ervaren team, allen opgeleid binnen Hapkido Combinatie.
            </p>
            <Link href="/trainers" className="btn-ghost">
              Bekijk het volledige team <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Verhalen van leden</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-tight">
              Wat onze leden zeggen
            </h2>
          </Reveal>
          <div className="mt-10">
            <Testimonials />
          </div>
          <div className="mt-8">
            <a
              href={site.socials.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Bekijk al onze reviews op Google <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <CTABanner />

      <section className="section">
        <div className="container-x">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="badge-red mb-4">FAQ</div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-tight">
                Veelgestelde vragen
              </h2>
            </div>
            <Link href="/faq" className="btn-ghost shrink-0">
              Alle vragen <ArrowRight size={16} />
            </Link>
          </Reveal>
          <FAQ items={faq} limit={4} />
        </div>
      </section>
    </>
  );
}
