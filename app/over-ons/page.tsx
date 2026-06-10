import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Over Hapkido Yong Hapkido in Noord-Brabant sinds 2006",
  description:
    "Hapkido Yong brengt Hapkido Combinatie naar Noord-Brabant. Opgericht door Master Ron van Beukering, met vestigingen in Berkel-Enschot en Waalwijk. Bekijk ons verhaal.",
  keywords: [
    "hapkido yong",
    "hapkido combinatie",
    "ron van beukering",
    "hapkido noord-brabant",
    "kwan nyom hapkido",
    "hapkido 2006",
  ],
  alternates: { canonical: `${site.url}/over-ons` },
  openGraph: {
    title: "Over Hapkido Yong Hapkido in Noord-Brabant sinds 2006",
    description:
      "Hapkido Yong brengt Hapkido Combinatie naar Noord-Brabant. Opgericht door Master Ron van Beukering, met vestigingen in Berkel-Enschot en Waalwijk.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-1.jpg", width: 1200, height: 630, alt: "Hapkido Yong training in Noord-Brabant" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Over Hapkido Yong Hapkido in Noord-Brabant",
    description: "Opgericht door Master Ron van Beukering in 2006. Twee locaties: Berkel-Enschot en Waalwijk.",
    images: ["/images/training/training-1.jpg"],
  },
};

const values = [
  { t: "Respect", b: "Voor jezelf, je trainingspartner en je trainer. Op de mat én daarbuiten." },
  { t: "Weerbaarheid", b: "Lichamelijk én mentaal. Sterker staan in elke situatie." },
  { t: "Community", b: "Een gezellige groep van alle leeftijden, vechtsport is teamsport." },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Over ons", url: `${site.url}/over-ons` },
        ])}
      />
      <PageHero
        eyebrow="Over ons"
        title="Sinds 2006 zelfverdediging in Brabant"
        subtitle="Een korte geschiedenis, een duidelijke missie en de mensen die het mogelijk maken."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Over ons", href: "/over-ons" },
        ]}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            <div className="badge-red mb-4">Onze missie</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight mb-6">
              Hapkido als levensstijl:<br />je leert voorkomen, niet vechten
            </h2>
            <div className="space-y-5 text-[color:var(--color-text)] leading-relaxed">
              <p>
                De-escalatie staat voorop. We trainen technieken om jezelf en je geliefden te beschermen, maar bovenal leren we situaties te voorkomen en met emoties om te gaan.
              </p>
              <p>
                Master Ron van Beukering introduceerde Kwan Nyom Hapkido in 2006 in Nederland. In 2023 ontstond hieruit Hapkido Combinatie, een moderne, complete stijl die diverse vechtsporten samenbrengt.
              </p>
              <p>
                Vandaag traint Hapkido Yong meer dan 150 leden op twee locaties in Noord-Brabant. We zijn aangesloten bij de NBJJV, hebben een eigen Academie voor zwarte-bandtraining en verzorgen examens tot in de hoogste Dan-graden.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <div className="card p-6 md:p-8 space-y-6">
              <div>
                <div className="text-xs text-[color:var(--color-muted)] uppercase tracking-widest">Federatie</div>
                <div className="mt-2 space-y-2 text-sm text-[color:var(--color-text)]">
                  <div>NBJJV, Nederlandse bond voor jujitsu, judo en vormgeving</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-[color:var(--color-muted)] uppercase tracking-widest">Locaties</div>
                <div className="mt-2 space-y-2 text-sm text-[color:var(--color-text)]">
                  <div>Kerkstraat 9B, Berkel-Enschot</div>
                  <div>Dominee Louwe Kooymanslaan 9, Waalwijk</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-[color:var(--color-muted)] uppercase tracking-widest">Sinds</div>
                <div className="mt-2 text-sm text-[color:var(--color-text)]">2006 in Nederland · 2023 als Hapkido Combinatie</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Waarden</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight">
              Wat ons drijft
            </h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 100}>
                <div className="card p-6 h-full">
                  <div className="font-[family-name:var(--font-display)] text-5xl text-[color:var(--color-accent-500)]">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl mt-2">{v.t}</h3>
                  <p className="text-sm text-[color:var(--color-muted)] mt-2 leading-relaxed">{v.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fotogalerij */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">De club in beeld</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tight mb-10">
              Op de mat in Brabant
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal>
              <figure className="relative overflow-hidden rounded-xl aspect-video bg-[color:var(--color-stone-200)]">
                <Image
                  src="/images/training/training-1.jpg"
                  alt="Examens bij de NBJJV — Hapkido Yong"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0e0b08]/80 to-transparent text-white text-sm">
                  <span className="font-semibold">Examens bij de NBJJV</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={100}>
              <figure className="relative overflow-hidden rounded-xl aspect-video bg-[color:var(--color-stone-200)]">
                <Image
                  src="/images/training/training-2.jpg"
                  alt="Dojang Berkel-Enschot — Hapkido Yong"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0e0b08]/80 to-transparent text-white text-sm">
                  <span className="font-semibold">Dojang Berkel-Enschot</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={60}>
              <figure className="relative overflow-hidden rounded-xl aspect-video bg-[color:var(--color-stone-200)]">
                <Image
                  src="/images/training/training-3.jpg"
                  alt="Impressie van diverse trainingen — Hapkido Yong"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0e0b08]/80 to-transparent text-white text-sm">
                  <span className="font-semibold">Impressie van diverse trainingen</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={120}>
              <figure className="relative overflow-hidden rounded-xl aspect-video bg-[color:var(--color-stone-200)]">
                <Image
                  src="/images/training/training-4.jpg"
                  alt="Diploma uitreiking bij de NBJJV — Hapkido Yong"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0e0b08]/80 to-transparent text-white text-sm">
                  <span className="font-semibold">Diploma uitreiking bij de NBJJV</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner title="Maak kennis, kom langs" />
    </>
  );
}
