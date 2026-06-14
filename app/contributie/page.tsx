import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hapkido Contributie & Tarieven Noord-Brabant",
  description:
    "Hapkido Yong contributie: jeugd €75/kwartaal, volwassenen €90/kwartaal, strippenkaart €75 per 10 lessen. Eerlijke tarieven in Berkel-Enschot en Waalwijk.",
  keywords: [
    "hapkido contributie",
    "hapkido kosten",
    "zelfverdediging tarieven tilburg",
    "hapkido lidmaatschap",
    "hapkido prijs nederland",
    "hapkido combinatie kosten",
    "hapkido abonnement",
  ],
  alternates: { canonical: `${site.url}/contributie` },
  openGraph: {
    title: "Hapkido Contributie & Tarieven Hapkido Yong",
    description:
      "Hapkido lessen vanaf €75 per kwartaal. Jeugd, volwassenen en strippenkaart. Berkel-Enschot en Waalwijk.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-1.jpg", width: 1200, height: 630, alt: "Hapkido Yong tarieven en contributie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hapkido Contributie Hapkido Yong vanaf €75/kwartaal",
    description: "Eerlijke tarieven voor hapkido lessen in Noord-Brabant. Jeugd, volwassenen, strippenkaart.",
    images: ["/images/training/training-1.jpg"],
  },
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
      "Bondsexamens via NBJJV (zwarte band)",
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
      "Eén strip per training",
      "Bondskosten apart (€25/jaar)",
    ],
  },
  {
    title: "Online Cursustoegang",
    price: "€7,50",
    period: "per maand",
    yearly: "€50 per jaar",
    features: [
      "Volledige toegang tot alle online lessen",
      "Videobibliotheek met trainingsopnames",
      "Maandelijks opzegbaar",
      "Geen mat-training inbegrepen",
    ],
    online: true,
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div
                  className={`card p-6 md:p-8 h-full flex flex-col relative ${
                    p.featured
                      ? "border-[color:var(--color-accent-700)] shadow-[var(--shadow-glow-red)]"
                      : ""
                  } ${"online" in p && p.online
                      ? "border-[color:var(--color-gold-600)]"
                      : ""
                  }`}
                >
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-red text-xs">
                      Meest gekozen
                    </div>
                  )}
                  {"online" in p && p.online && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-gold text-xs whitespace-nowrap">
                      Niet-leden
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
                  De <a href="https://nbjjv.nl" target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-accent-400)] hover:underline">NBJJV</a> (Nederlandse bond voor jujitsu, judo en vormgeving) brengt jaarlijks €25,00 in rekening voor bondskosten. Verzekering en zwarte band examens lopen via de NBJJV.
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
