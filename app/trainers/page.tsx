import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/Hero";
import { TrainerCard } from "@/components/TrainerCard";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site, trainers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trainers — Master Ron van Beukering & team",
  description:
    "Ontmoet de trainers van Hapkido Yong. Master Ron van Beukering (6e Dan Hapkido Combinatie) leidt het team in Berkel-Enschot en Waalwijk. Plan een gratis proefles.",
  keywords: [
    "hapkido trainer nederland",
    "ron van beukering hapkido",
    "ron van beukering-bin ghoni",
    "master ron",
    "hapkido instructeur tilburg",
    "hapkido instructeur noord-brabant",
    "marco van gulik hapkido",
  ],
  alternates: { canonical: `${site.url}/trainers` },
  openGraph: {
    title: "Trainers Master Ron van Beukering & team Hapkido Yong",
    description:
      "Master Ron van Beukering (6e Dan) leidt het team van Hapkido Yong. Gediplomeerde instructeurs in Berkel-Enschot en Waalwijk.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/trainers/ron-van-beukering.jpg", width: 1200, height: 630, alt: "Master Ron van Beukering 6e Dan Hapkido Combinatie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trainers Hapkido Yong Master Ron van Beukering",
    description: "Master Ron van Beukering (6e Dan) en team. Gediplomeerde instructeurs in Berkel-Enschot en Waalwijk.",
    images: ["/images/trainers/ron-van-beukering.jpg"],
  },
};

export default function Page() {
  const headTrainer = trainers.find((t) => t.slug === "ron-van-beukering")!;
  const rest = trainers.filter((t) => t.slug !== "ron-van-beukering");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Trainers", url: `${site.url}/trainers` },
        ])}
      />
      <PageHero
        eyebrow="Het team"
        title="Onze trainers"
        subtitle="Master Ron van Beukering en zijn team, gediplomeerd, ervaren, betrokken."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Trainers", href: "/trainers" },
        ]}
      />

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-gold mb-4">Hoofdtrainer</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight mb-10">
              Onder leiding van
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link href={`/trainers/${headTrainer.slug}`} className="block max-w-sm">
              <TrainerCard t={headTrainer} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Instructeurs</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight mb-10">
              Het volledige team
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rest.map((t, i) => (
              <Reveal key={t.slug} delay={i * 60}>
                <TrainerCard t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Elitegroep</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight mb-4">
              De elitegroep van Hapkido Combinatie
            </h2>
            <p className="text-[color:var(--color-muted)] leading-relaxed mb-4 max-w-2xl">
              Een speciale groep buiten de Kwan Nyom Hapkido. Destijds opgericht als gesloten groep — alles zwart, geen Dan zichtbaar. Marcel Dohmen, Toon van Gils en Ron van Beukering.
            </p>
            <p className="text-[color:var(--color-muted)] leading-relaxed mb-8 max-w-2xl">
              <span className="text-[color:var(--color-gold-400)] font-semibold">Ere-lid:</span>{" "}
              GM H. Bottse — als ere-lid verbonden aan de elitegroep van Hapkido Combinatie.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-2xl max-w-md">
              <Image
                src="/images/trainers/elitegroep.jpg"
                alt="Elitegroep Hapkido Combinatie — Marcel Dohmen, Toon van Gils en Ron van Beukering"
                width={600}
                height={750}
                className="object-cover w-full"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0e0b08]/80 to-transparent">
                <p className="text-white text-sm font-medium">Marcel Dohmen · Toon van Gils · Ron van Beukering</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight mb-4">
              Train Hapkido Combinatie in Noord-Brabant
            </h2>
            <p className="text-[color:var(--color-muted)] leading-relaxed mb-6">
              Onze trainers geven les op twee locaties: <Link href="/lessen/berkel-enschot" className="text-[color:var(--color-accent-400)] hover:underline">Berkel-Enschot</Link> (Master Ron van Beukering) en <Link href="/lessen/waalwijk" className="text-[color:var(--color-accent-400)] hover:underline">Waalwijk</Link> (CGN Marco van Gulik). Bekijk ook meer over <Link href="/hapkido-combinatie" className="text-[color:var(--color-accent-400)] hover:underline">Hapkido Combinatie</Link>.
            </p>
          </Reveal>
        </div>
      </section>
      <CTABanner title="Train met onze masters" subtitle="Plan een gratis proefles en ervaar de kwaliteit zelf." />
    </>
  );
}
