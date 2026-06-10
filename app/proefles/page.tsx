import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { ProeflesForm } from "@/components/ProeflesForm";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gratis proefles Hapkido Berkel-Enschot of Waalwijk",
  description:
    "Plan een gratis proefles Hapkido Combinatie in Berkel-Enschot of Waalwijk. Geen verplichting, geen kosten. Gewoon meedoen en kijken of het klikt.",
  keywords: [
    "hapkido proefles",
    "gratis proefles hapkido",
    "gratis proefles zelfverdediging",
    "hapkido proefles tilburg",
    "hapkido proefles waalwijk",
    "hapkido yong aanmelden",
    "zelfverdediging proberen",
    "hapkido beginners",
  ],
  alternates: { canonical: `${site.url}/proefles` },
  openGraph: {
    title: "Gratis proefles Hapkido Combinatie Berkel-Enschot of Waalwijk",
    description:
      "Meld je aan voor een gratis proefles Hapkido Combinatie. Geen verplichting, geen kosten. Kies Berkel-Enschot of Waalwijk.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-1.jpg", width: 1200, height: 630, alt: "Gratis proefles Hapkido Yong" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gratis proefles Hapkido Berkel-Enschot of Waalwijk",
    description: "Geen verplichting, geen kosten. Plan je gratis proefles Hapkido Combinatie.",
    images: ["/images/training/training-1.jpg"],
  },
};

const steps = [
  { n: "01", t: "Aanmelden", b: "Vul het formulier in. Drie minuutjes, klaar." },
  { n: "02", t: "Bevestiging", b: "Binnen 24 uur krijg je een bericht met dag, tijd en wat je meeneemt." },
  { n: "03", t: "Meetrainen", b: "Kom langs, draai mee, voel of het klikt. Geen verplichting." },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Proefles", url: `${site.url}/proefles` },
        ])}
      />
      <PageHero
        eyebrow="Gratis proefles"
        title="Plan je eerste les"
        subtitle="Gewoon meedoen, geen verplichting, geen kosten. Kies een locatie en een dag die jou uitkomt. App of vul het formulier in. Twee gratis proeflessen."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Proefles", href: "/proefles" },
        ]}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <div className="badge-red mb-4">Zo werkt het</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight mb-8">
              Drie stappen.<br />Geen drempels.
            </h2>
            <ol className="space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="font-[family-name:var(--font-display)] text-4xl text-[color:var(--color-accent-500)] leading-none">{s.n}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl">{s.t}</h3>
                    <p className="text-sm text-[color:var(--color-muted)] mt-1 leading-relaxed">{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 card p-5">
              <h3 className="font-semibold mb-3">Wat neem je mee?</h3>
              <ul className="space-y-2 text-sm text-[color:var(--color-muted)]">
                {["Sportkleding (jogging + T-shirt)", "Een flesje water", "Een handdoek", "Geen pak nodig, krijg je later"].map((x) => (
                  <li key={x} className="flex gap-2"><CheckCircle2 size={14} className="text-[color:var(--color-accent-500)] shrink-0 mt-0.5" />{x}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <ProeflesForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
