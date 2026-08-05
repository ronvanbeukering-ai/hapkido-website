import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { personSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site, trainers } from "@/lib/site";

const trainer = trainers.find((t) => t.slug === "marco-van-gulik")!;

export const metadata: Metadata = {
  title: "Marco van Gulik Senior Instructor Hapkido Waalwijk",
  description:
    "CGN Marco van Gulik (2e Dan Hapkido Combinatie) is Senior Instructor bij Hapkido Yong Waalwijk. Specialist Pencak Silat en weerbaarheidstraining.",
  keywords: [
    "marco van gulik hapkido",
    "hapkido waalwijk",
    "hapkido combinatie waalwijk",
    "pencak silat waalwijk",
    "zelfverdediging waalwijk",
    "hapkido instructor noord-brabant",
  ],
  alternates: { canonical: `${site.url}/trainers/marco-van-gulik` },
  openGraph: {
    title: "Marco van Gulik Senior Instructor Hapkido Yong Waalwijk",
    description:
      "CGN Marco van Gulik (2e Dan) geeft les bij Hapkido Yong Waalwijk. Specialist Pencak Silat en Hapkido Combinatie. Maandag en zaterdag.",
    locale: "nl_NL",
    type: "profile",
    images: [{ url: "/images/trainers/marco-van-gulik.jpg", width: 800, height: 1067, alt: "CGN Marco van Gulik Senior Instructor Hapkido Yong Waalwijk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marco van Gulik Hapkido Waalwijk",
    description: "Senior Instructor Hapkido Yong Waalwijk. Pencak Silat & Hapkido Combinatie. Gratis proefles.",
    images: ["/images/trainers/marco-van-gulik.jpg"],
  },
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
        eyebrow="Senior Instructor Waalwijk"
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
          <Reveal className="lg:col-span-2">
            <div className="aspect-[3/4] card relative overflow-hidden">
              {trainer.photo ? (
                <Image
                  src={trainer.photo}
                  alt="CGN Marco van Gulik 2e Dan Hapkido Combinatie, Senior Instructor en hoofdtrainer van Hapkido Yong Waalwijk"
                  fill
                  sizes="(max-width: 1024px) 50vw, 17vw"
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-stone-800)] to-[color:var(--color-stone-700)] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-display)] text-9xl text-[color:var(--color-stone-500)]">MG</span>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-10">
            <div className="badge-gold mb-4">{trainer.shortRank}</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight mb-6">
              Senior Instructor met Pencak Silat-achtergrond
            </h2>
            <div className="space-y-5 text-[color:var(--color-text)] leading-relaxed">
              <p>{trainer.bio}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight mb-4">
              Train Hapkido Combinatie in Waalwijk
            </h2>
            <p className="text-[color:var(--color-muted)] leading-relaxed">
              Marco geeft les op <Link href="/lessen/waalwijk" className="text-[color:var(--color-accent-300)] hover:underline">Dominee Louwe Kooymanslaan 9 in Waalwijk</Link>. Lees alles over <Link href="/hapkido-combinatie" className="text-[color:var(--color-accent-300)] hover:underline">Hapkido Combinatie</Link> of bekijk alle <Link href="/trainers" className="text-[color:var(--color-accent-300)] hover:underline">trainers van Hapkido Yong</Link>.
            </p>
          </Reveal>
        </div>
      </section>
      <CTABanner title="Train onder Marco" subtitle="Maandag en zaterdag in Waalwijk." />
    </>
  );
}
