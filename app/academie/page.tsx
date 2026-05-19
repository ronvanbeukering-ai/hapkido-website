import type { Metadata } from "next";
import { Award, Calendar, Users } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hapkido Combinatie Academie, Zwarte-bandtraining",
  description:
    "De Hapkido Combinatie Academie organiseert maandelijkse zwarte-bandtrainingen voor gevorderde beoefenaars vanaf bruine band.",
  alternates: { canonical: `${site.url}/academie` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Academie", url: `${site.url}/academie` },
        ])}
      />
      <PageHero
        eyebrow="Hapkido Combinatie Academie"
        title="Voor de gevorderde beoefenaar"
        subtitle="Maandelijkse zwarte-bandtraining, toegankelijk vanaf bruine band."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Academie", href: "/academie" },
        ]}
      />

      <section className="section">
        <div className="container-x grid md:grid-cols-3 gap-5">
          {[
            { Icon: Users, title: "Voor wie?", body: "Leden vanaf bruine band die zich verder willen ontwikkelen onder begeleiding van masters en seniors." },
            { Icon: Calendar, title: "Wanneer?", body: "Elke eerste maandag van de maand. Op die avond vervalt de reguliere training in Berkel-Enschot, jeugdtraining gaat wel door." },
            { Icon: Award, title: "Wat behandelen we?", body: "Geavanceerde technieken, mentoring, examenvoorbereiding voor hogere Dan-graden via NBJJV." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="card p-6 h-full">
                <c.Icon className="text-[color:var(--color-accent-500)]" size={22} />
                <h3 className="font-[family-name:var(--font-display)] text-2xl mt-4">{c.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-muted)] leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner title="Aanmelden voor de Academie?" subtitle="Neem contact op met je trainer of stuur ons een bericht." />
    </>
  );
}
