import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Users, ShieldCheck, Dumbbell, Award, PartyPopper, Calendar } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hapkido voor Kinderen (vanaf 7 jaar) | Hapkido Yong",
  description:
    "Hapkido voor kinderen vanaf 7 jaar in Berkel-Enschot en Waalwijk. Zelfvertrouwen, discipline en plezier. Aparte jeugdlessen. Plan een gratis proefles.",
  keywords: [
    "hapkido kinderen",
    "hapkido voor kinderen",
    "hapkido kind Tilburg",
    "jeugdlessen hapkido",
    "zelfverdediging kinderen",
    "hapkido kinderen Berkel-Enschot",
    "hapkido kinderen Waalwijk",
    "vechtsport kinderen Tilburg",
  ],
  alternates: { canonical: `${site.url}/hapkido-kinderen` },
  openGraph: {
    title: "Hapkido voor Kinderen (vanaf 7 jaar) | Hapkido Yong",
    description:
      "Hapkido voor kinderen vanaf 7 jaar — zelfvertrouwen, discipline en plezier, in Berkel-Enschot en Waalwijk.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-4.jpg", width: 1200, height: 630, alt: "Hapkido voor kinderen bij Hapkido Yong" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hapkido voor Kinderen (vanaf 7 jaar) | Hapkido Yong",
    description: "Hapkido voor kinderen vanaf 7 jaar in Berkel-Enschot en Waalwijk.",
    images: ["/images/training/training-4.jpg"],
  },
};

const voordelen = [
  {
    Icon: Heart,
    title: "Zelfvertrouwen",
    body: "Sterker in hun schoenen staan — letterlijk en figuurlijk. Kinderen die onzeker beginnen, groeien zichtbaar in houding en durf.",
  },
  {
    Icon: ShieldCheck,
    title: "Weerbaarheid",
    body: "Grenzen aangeven, ook tegen pesten of ongewenst gedrag. Praktische zelfverdediging, aangepast aan hun leeftijd.",
  },
  {
    Icon: Award,
    title: "Discipline & respect",
    body: "Structuur, luisteren, doorzetten en respect voor elkaar — waarden die verder reiken dan de mat.",
  },
  {
    Icon: Users,
    title: "Sociale vaardigheden",
    body: "Samen trainen met leeftijdgenoten in een vaste groep, met ruimte voor vriendschap en teamgevoel.",
  },
  {
    Icon: Dumbbell,
    title: "Conditie & motoriek",
    body: "Lenigheid, kracht, coördinatie en uithoudingsvermogen — spelenderwijs opgebouwd.",
  },
  {
    Icon: PartyPopper,
    title: "Plezier",
    body: "Streng waar nodig, speels waar het kan. Kinderen komen niet omdat het moet, maar omdat ze het leuk vinden.",
  },
];

export default function HapkidoKinderenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Hapkido voor kinderen", url: `${site.url}/hapkido-kinderen` },
        ])}
      />
      <PageHero
        eyebrow="Hapkido voor kinderen"
        title="Sterker in hun schoenen, vanaf 7 jaar"
        subtitle="Aparte jeugdlessen in Berkel-Enschot, en samen trainen met de gemixte groep in Waalwijk — voor kinderen vanaf 7 jaar."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Hapkido voor kinderen", href: "/hapkido-kinderen" },
        ]}
      />

      {/* Lestijden strip */}
      <section className="bg-[color:var(--color-surface-2)] border-b border-[color:var(--color-border)]">
        <div className="container-x py-5 flex flex-wrap items-center gap-3 text-sm">
          <Calendar size={16} className="text-[color:var(--color-accent-500)] shrink-0" />
          <span className="text-[color:var(--color-text)]">
            <strong>Berkel-Enschot:</strong> ma 18:30–19:15 (t/m 12 jaar), wo 18:30–19:15 (t/m 13 jaar), za 11:30–12:15 (t/m 13 jaar).{" "}
            <strong>Waalwijk:</strong> ma en za, gemixte groep vanaf 7 jaar.
          </span>
          <Link href="/lessen/berkel-enschot" className="ml-auto font-semibold text-[color:var(--color-accent-600)] hover:underline shrink-0">
            Bekijk lesrooster
          </Link>
        </div>
      </section>

      {/* Wat leert je kind */}
      <section className="section">
        <div className="container-x">
          <div className="badge-red mb-4">Wat leert je kind?</div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight max-w-2xl">
            Meer dan alleen technieken
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)] max-w-2xl">
            Hapkido is een complete vechtsport, maar voor kinderen draait het minstens zo veel om wat ze eraan
            overhouden buiten de mat.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {voordelen.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card p-6 h-full">
                  <v.Icon className="text-[color:var(--color-accent-500)]" size={22} />
                  <h3 className="font-[family-name:var(--font-display)] text-xl mt-4">{v.title}</h3>
                  <p className="mt-2 text-sm text-[color:var(--color-muted)] leading-relaxed">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Praktisch: leeftijd & tarieven */}
      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <div className="badge-red mb-4">Praktisch</div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight max-w-2xl">
            Leeftijd en tarieven
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            <Reveal delay={0}>
              <div className="card p-6 h-full">
                <h3 className="font-[family-name:var(--font-display)] text-xl">7 t/m 12 jaar</h3>
                <p className="mt-2 text-2xl font-[family-name:var(--font-display)] text-[color:var(--color-accent-600)]">
                  €75 <span className="text-sm text-[color:var(--color-muted)] font-sans">/ kwartaal</span>
                </p>
                <p className="mt-1 text-sm text-[color:var(--color-muted)]">of €265 per jaar</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card p-6 h-full">
                <h3 className="font-[family-name:var(--font-display)] text-xl">Vanaf 13 jaar</h3>
                <p className="mt-2 text-2xl font-[family-name:var(--font-display)] text-[color:var(--color-accent-600)]">
                  €90 <span className="text-sm text-[color:var(--color-muted)] font-sans">/ kwartaal</span>
                </p>
                <p className="mt-1 text-sm text-[color:var(--color-muted)]">of €300 per jaar</p>
              </div>
            </Reveal>
          </div>
          <p className="mt-6 text-sm text-[color:var(--color-muted)]">
            Kan je kind niet wekelijks trainen? Er is ook een strippenkaart van 10 lessen voor €75.{" "}
            <Link href="/contributie" className="font-semibold text-[color:var(--color-accent-600)] hover:underline">
              Bekijk alle tarieven
            </Link>
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section">
        <div className="container-x">
          <blockquote className="max-w-2xl mx-auto text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[color:var(--color-heading)] leading-snug">
              &ldquo;Mijn zoon was eerst onzeker en wat klein voor zijn leeftijd. Na een jaar Hapkido staat hij
              sterker in zijn schoenen, letterlijk en figuurlijk. De jeugdtraining is streng waar nodig en speels
              waar het kan.&rdquo;
            </p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">— Joris H., vader van Liam (9), Berkel-Enschot</p>
          </blockquote>
        </div>
      </section>

      {/* Trainers */}
      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <div className="badge-red mb-4">Wie geeft de jeugdlessen</div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight max-w-2xl">
            Instructeurs met affiniteit voor jeugd
          </h2>
          <p className="mt-4 text-[color:var(--color-text)] max-w-2xl leading-relaxed">
            De jeugdlessen staan onder leiding van Master Ron van Beukering (6e Dan), met Jesse van Mierlo (2e Dan) —
            gericht op techniek en jeugdtraining — en CGN Leonie Klerkx (1e Dan), met affiniteit voor jeugd- en
            vrouwenlessen.
          </p>
          <Link href="/trainers" className="mt-6 inline-block font-semibold text-[color:var(--color-accent-600)] hover:underline">
            Bekijk alle trainers →
          </Link>
        </div>
      </section>

      <CTABanner
        title="Laat je kind het zelf ervaren"
        subtitle="Een gratis proefles is de makkelijkste manier om te zien of het klikt. Geen verplichting, gewoon meedoen."
      />
    </>
  );
}
