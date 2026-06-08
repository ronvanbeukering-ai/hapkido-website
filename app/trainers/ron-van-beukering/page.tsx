import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { VideoGallery } from "@/components/VideoGallery";
import { personSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site, trainers } from "@/lib/site";

const trainer = trainers.find((t) => t.slug === "ron-van-beukering")!;

export const metadata: Metadata = {
  title: "Ron van Beukering 6e Dan Hapkido Combinatie, Hoofdtrainer",
  description:
    "Master Ron van Beukering (6e Dan) introduceerde Kwan Nyom Hapkido in Nederland en richtte Hapkido Combinatie op. Hoofdtrainer van Hapkido Yong Berkel-Enschot.",
  keywords: [
    "ron van beukering",
    "master ron",
    "ron van beukering-bin ghoni",
    "hapkido combinatie hoofdtrainer",
    "kwan nyom hapkido nederland",
    "sin moo hapkido",
    "6e dan hapkido",
    "hapkido berkel-enschot",
  ],
  alternates: { canonical: `${site.url}/trainers/ron-van-beukering` },
  openGraph: {
    title: "Ron van Beukering 6e Dan Hapkido Combinatie, Oprichter Hapkido Yong",
    description:
      "Master Ron van Beukering introduceerde Kwan Nyom Hapkido in 2006 in Nederland en stichtte Hapkido Combinatie in 2023. Hoofdtrainer in Berkel-Enschot.",
    locale: "nl_NL",
    type: "profile",
    images: [{ url: "/images/trainers/ron-van-beukering.jpg", width: 800, height: 1067, alt: "Master Ron van Beukering 6e Dan Hapkido Combinatie, oprichter Hapkido Yong" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ron van Beukering 6e Dan Hapkido Combinatie",
    description: "Oprichter van Hapkido Yong en Hapkido Combinatie. Hoofdtrainer in Berkel-Enschot, Noord-Brabant.",
    images: ["/images/trainers/ron-van-beukering.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          personSchema("ron-van-beukering")!,
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Trainers", url: `${site.url}/trainers` },
            { name: trainer.name, url: `${site.url}/trainers/${trainer.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Hoofdtrainer"
        title={trainer.name}
        subtitle={trainer.rank}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Trainers", href: "/trainers" },
          { name: trainer.name, href: `/trainers/${trainer.slug}` },
        ]}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[3/4] card relative overflow-hidden">
              {trainer.photo && (
                <Image
                  src={trainer.photo}
                  alt="Master Ron van Beukering 6e Dan Hapkido Combinatie, oprichter en hoofdtrainer van Hapkido Yong in Berkel-Enschot"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority
                />
              )}
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <div className="badge-gold mb-4">{trainer.shortRank}</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight mb-6">
              Pionier van Hapkido in Nederland
            </h2>
            <div className="space-y-5 text-[color:var(--color-text)] leading-relaxed">
              <p>{trainer.bio}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trainingsvideo's */}
      <section className="section bg-[color:var(--color-stone-950)] border-y border-white/10">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">In de training</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-white">
              Bekijk de lessen van Hapkido Yong
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl">
              Echte trainingsopnames van de lessen onder leiding van Master Ron en zijn team. Zo ziet een gewone les eruit.
            </p>
          </Reveal>
          <div className="mt-10">
            <VideoGallery />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight mb-4">
              Train Hapkido Combinatie in Berkel-Enschot
            </h2>
            <p className="text-[color:var(--color-muted)] leading-relaxed">
              Master Ron geeft les op <Link href="/lessen/berkel-enschot" className="text-[color:var(--color-accent-400)] hover:underline">Kerkstraat 9B in Berkel-Enschot</Link> (bij Tilburg). Lees alles over <Link href="/hapkido-combinatie" className="text-[color:var(--color-accent-400)] hover:underline">Hapkido Combinatie</Link> of bekijk alle <Link href="/trainers" className="text-[color:var(--color-accent-400)] hover:underline">trainers van Hapkido Yong</Link>.
            </p>
          </Reveal>
        </div>
      </section>
      <CTABanner title="Train onder Master Ron" subtitle="Maandag, woensdag en zaterdag in Berkel-Enschot." />
    </>
  );
}
