import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { personSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site, trainers } from "@/lib/site";

const trainer = trainers.find((t) => t.slug === "marco-van-gulik")!;

export const metadata: Metadata = {
  title: `${trainer.name}, Hoofdtrainer Waalwijk`,
  description: trainer.bio,
  alternates: { canonical: `${site.url}/trainers/marco-van-gulik` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          personSchema("marco-van-gulik")!,
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Trainers", url: `${site.url}/trainers` },
            { name: trainer.name, url: `${site.url}/trainers/${trainer.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Hoofdtrainer Waalwijk"
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
              {trainer.photo ? (
                <Image
                  src={trainer.photo}
                  alt="CGN Marco van Gulik — 2e Dan Hapkido Combinatie, Senior Instructor en hoofdtrainer van Hapkido Yong Waalwijk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-stone-200)] to-[color:var(--color-stone-300)] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-display)] text-9xl text-[color:var(--color-stone-400)]">MG</span>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <div className="badge-gold mb-4">{trainer.shortRank}</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight mb-6">
              Senior Instructor met Pencak Silat-achtergrond
            </h2>
            <div className="space-y-5 text-[color:var(--color-text)] leading-relaxed">
              <p>{trainer.bio}</p>
              <p>
                Marco staat bekend om zijn relaxte lesstijl met humor en serieuze inhoud, technieken die op straat kloppen, niet alleen in een ring.
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

      <CTABanner title="Train onder Marco" subtitle="Maandag en zaterdag in Waalwijk." />
    </>
  );
}
