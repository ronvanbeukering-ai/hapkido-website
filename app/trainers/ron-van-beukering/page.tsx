import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { VideoGallery } from "@/components/VideoGallery";
import { personSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site, trainers } from "@/lib/site";

const trainer = trainers.find((t) => t.slug === "ron-van-beukering")!;

export const metadata: Metadata = {
  title: `${trainer.name}, Hoofdtrainer & Oprichter`,
  description: trainer.bio,
  alternates: { canonical: `${site.url}/trainers/ron-van-beukering` },
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
                  alt="Master Ron van Beukering — 6e Dan Hapkido Combinatie, oprichter en hoofdtrainer van Hapkido Yong in Berkel-Enschot"
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
              <p>
                Onder zijn leiding is Hapkido Yong uitgegroeid tot een vereniging met twee locaties, ruim 150 leden en een actief examenprogramma onder NBJJV.
              </p>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl mt-10 mb-4">Specialisaties</h3>
            <div className="flex flex-wrap gap-2">
              {trainer.knowsAbout.map((k) => (
                <span key={k} className="px-3 py-1.5 rounded-md bg-[color:var(--color-surface-2)] border border-[color:var(--color-border)] text-sm text-[color:var(--color-text)]">
                  {k}
                </span>
              ))}
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

      <CTABanner title="Train onder Master Ron" subtitle="Maandag, woensdag en zaterdag in Berkel-Enschot." />
    </>
  );
}
