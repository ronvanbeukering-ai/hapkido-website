import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Heart, Brain, Zap, Users, Flame } from "lucide-react";
import { HomeHero } from "@/components/Hero";
import { LocationCard } from "@/components/LocationCard";
import { TrainerCard } from "@/components/TrainerCard";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { VideoGallery } from "@/components/VideoGallery";
import { videoSchema } from "@/lib/jsonld";
import { locations, trainers, benefits, disciplines, faq } from "@/lib/site";

const benefitIcons = [Shield, Zap, Heart, Brain, Flame, Users];

const trainingPhotos = [
  {
    src: "/images/training/training-1.jpg",
    alt: "Hapkido training — stand-up technieken bij Hapkido Yong Berkel-Enschot",
    caption: "Stand-up technieken",
  },
  {
    src: "/images/training/training-2.jpg",
    alt: "Groepsles bij Hapkido Yong Waalwijk — gemixte groep volwassenen en jongeren",
    caption: "Groepsles Waalwijk",
  },
  {
    src: "/images/training/training-3.jpg",
    alt: "Grondtechnieken en klemmen tijdens Hapkido Combinatie training",
    caption: "Grondtechnieken & klemmen",
  },
  {
    src: "/images/training/training-4.jpg",
    alt: "Hapkido Yong dojo in Berkel-Enschot — trainingsruimte Kerkstraat 9B",
    caption: "Dojo Berkel-Enschot",
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
              Negen vechtsporten<br />in één moderne stijl
            </h2>
            <p className="text-base md:text-lg text-[color:var(--color-muted)] leading-relaxed">
              Hapkido Combinatie, ook bekend als Koreaans MMA, combineert technieken uit Hapkido, Jiu-Jitsu, Judo, Taekwondo, Systema, Boksen, Pencak Silat, Krav Maga en Braziliaans Jiu-Jitsu. Eén complete, moderne zelfverdedigingsstijl. Je leert niet vechten, maar voorkomen.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-2">
            {disciplines.map((d, i) => (
              <Reveal key={d} delay={i * 40}>
                <span className="inline-flex items-center px-4 py-2 rounded-md bg-[color:var(--color-surface-2)] border border-[color:var(--color-border)] text-sm text-[color:var(--color-text)] hover:border-[color:var(--color-stone-300)] hover:text-[color:var(--color-heading)] transition-colors">
                  {d}
                </span>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/hapkido-combinatie" className="btn-ghost">
              Lees meer over Hapkido Combinatie <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trainingsvideo's — lokale opnames */}
      <section className="section bg-[color:var(--color-stone-950)] border-y border-white/10">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Echte trainingen</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-tight text-white">
              Zo ziet een les eruit
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl">
              Bekijk fragmenten van onze echte trainingen in Berkel-Enschot en Waalwijk. Geen toneelstukken, gewoon de mat.
            </p>
          </Reveal>
          <div className="mt-10">
            <VideoGallery />
          </div>
        </div>
      </section>

      {/* Trainingsfoto's */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">In de dojo</div>
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
                  <figcaption className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Locaties</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-tight">
              Twee dojo&apos;s in Noord-Brabant
            </h2>
            <p className="mt-4 text-[color:var(--color-muted)] max-w-2xl">
              Kies de locatie die het beste bij je past. Beide met ervaren trainers, een sterke groep en een gratis proefles.
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

      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
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
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal className="mb-10">
            <div className="badge-red mb-4">Het team</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight leading-tight">
              Onder leiding van<br />Master Ron van Beukering
            </h2>
          </Reveal>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {(() => {
              const ron = trainers.find((t) => t.slug === "ron-van-beukering")!;
              return (
                <Reveal className="lg:col-span-5">
                  <div className="max-w-sm mx-auto lg:mx-0">
                    <TrainerCard t={ron} />
                  </div>
                </Reveal>
              );
            })()}
            <Reveal delay={150} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-[color:var(--color-text)] max-w-xl">
                Master Ron introduceerde Kwan Nyom Hapkido in 2006 in Nederland en richtte in 2023 Hapkido Combinatie op. Met 6e Dan Hapkido Combinatie en 5e Dan Kwan Nyom Hapkido is hij het gezicht en de drijvende kracht achter Hapkido Yong.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/trainers/ron-van-beukering" className="btn-primary">
                  Bekijk profiel
                </Link>
                <Link href="/trainers" className="btn-secondary">
                  Bekijk alle trainers <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
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
