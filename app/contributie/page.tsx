import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contributie & tarieven, Hapkido Yong | Berkel-Enschot & Waalwijk",
  description:
    "Jeugd €75/kwartaal, volwassenen €90/kwartaal. Strippenkaart beschikbaar. Bekijk alle contributietarieven van Hapkido Yong en hoe je je inschrijft.",
  keywords: ["hapkido contributie", "hapkido kosten", "zelfverdediging tarieven tilburg"],
  alternates: { canonical: `${site.url}/contributie` },
};

const plans = [
  {
    title: "Jeugd 7 t/m 12 jaar",
    price: "€75",
    period: "per kwartaal",
    yearly: "of €265 per jaar",
    features: [
      "Tot 2× per week trainen",
      "Aparte jeugdgroepen",
      "Examens via NBJJV",
      "Bondskosten apart (€25/jaar)",
    ],
  },
  {
    title: "Vanaf 13 jaar",
    price: "€90",
    period: "per kwartaal",
    yearly: "of €300 per jaar",
    features: [
      "Tot 2× per week trainen",
      "Gemixte volwassen groepen",
      "Toegang tot Academie (vanaf bruine band)",
      "Bondskosten apart (€25/jaar)",
    ],
    featured: true,
  },
  {
    title: "Strippenkaart",
    price: "€75",
    period: "10 strippen",
    yearly: "geen abonnement",
    features: [
      "Voor wie niet regelmatig kan",
      "Geldig op alle lessen",
      "Een strip per training",
      "Bondskosten apart (€25/jaar)",
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Contributie", url: `${site.url}/contributie` },
        ])}
      />
      <PageHero
        eyebrow="Contributie"
        title="Eerlijke tarieven, geen verrassingen"
        subtitle="Drie opties, voor jeugd, voor volwassenen en een strippenkaart voor wie niet wekelijks kan."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Contributie", href: "/contributie" },
        ]}
      />

      <section className="section">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div
                  className={`card p-6 md:p-8 h-full flex flex-col ${
                    p.featured
                      ? "border-[color:var(--color-accent-700)] relative shadow-[var(--shadow-glow-red)]"
                      : ""
                  }`}
                >
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-red text-xs">
                      Meest gekozen
                    </div>
                  )}
                  <h3 className="font-[family-name:var(--font-display)] text-2xl">{p.title}</h3>
                  <div className="mt-4">
                    <span className="font-[family-name:var(--font-display)] text-6xl">{p.price}</span>
                    <span className="text-sm text-[color:var(--color-muted)] ml-2">{p.period}</span>
                  </div>
                  <div className="text-sm text-[color:var(--color-muted)] mt-1">{p.yearly}</div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm text-[color:var(--color-text)]">
                        <Check size={16} className="text-[color:var(--color-accent-500)] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 grid md:grid-cols-2 gap-5">
              <div className="card p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl mb-3">Bondskosten NBJJV</h3>
                <p className="text-sm text-[color:var(--color-muted)] leading-relaxed">
                  De Nederlandse Brazilian Jiu-Jitsu en MMA Vereniging (NBJJV) brengt jaarlijks €25,00 in rekening voor bondskosten en eenmalig €5,00 inschrijfgeld. Verzekering en examens lopen via de NBJJV.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl mb-3">Betalingsinfo</h3>
                <p className="text-sm text-[color:var(--color-muted)] leading-relaxed">
                  Contributie wordt per kwartaal of per jaar overgemaakt.
                </p>
                <div className="mt-4 text-sm">
                  <div className="text-[color:var(--color-muted)] text-xs uppercase tracking-widest">IBAN</div>
                  <div className="font-mono mt-1">{site.iban}</div>
                  <div className="text-[color:var(--color-muted)] text-xs mt-1">t.n.v. Yong</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner title="Eerst proberen?" subtitle="Plan een gratis proefles voordat je beslist." />
    </>
  );
}
