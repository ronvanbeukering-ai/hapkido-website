import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { TrainerCard } from "@/components/TrainerCard";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site, trainers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Onze trainers, Master Ron van Beukering & het team",
  description:
    "Ontmoet de trainers van Hapkido Yong. Master Ron van Beukering (6e Dan) en een team van gediplomeerde instructeurs in Berkel-Enschot en Waalwijk.",
  keywords: ["hapkido trainer nederland", "ron van beukering hapkido", "hapkido instructeur tilburg"],
  alternates: { canonical: `${site.url}/trainers` },
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
            <div className="badge-red mb-4">Instructors</div>
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

      <CTABanner title="Train met onze masters" subtitle="Plan een gratis proefles en ervaar de kwaliteit zelf." />
    </>
  );
}
