import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Shield, HandMetal, Wind, Footprints, MessageCircleWarning, Briefcase, HeartPulse, Clock, Users, MapPin, Shirt } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, zelfverdedigingOpLocatieSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zelfverdediging op Locatie — Bedrijven & Zorg | Hapkido Yong",
  description:
    "Praktische zelfverdedigingstraining op locatie voor teams, bedrijven en zorgprofessionals in Noord-Brabant. Op maat, door Master Ron van Beukering (6e Dan).",
  keywords: [
    "zelfverdediging op locatie",
    "zelfverdediging bedrijven",
    "weerbaarheidstraining zorg",
    "workshop zelfverdediging teamuitje",
    "agressietraining zorg",
    "zelfverdediging workshop Tilburg",
    "zelfverdediging workshop Waalwijk",
  ],
  alternates: { canonical: `${site.url}/zelfverdediging-op-locatie` },
  openGraph: {
    title: "Zelfverdediging op Locatie — Bedrijven & Zorg | Hapkido Yong",
    description:
      "Praktische zelfverdedigingstraining op locatie voor teams, bedrijven en zorgprofessionals — op maat, bij jullie op de werkvloer.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-3.jpg", width: 1200, height: 630, alt: "Zelfverdediging op locatie bij Hapkido Yong" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zelfverdediging op Locatie — Bedrijven & Zorg | Hapkido Yong",
    description: "Praktische zelfverdedigingstraining op locatie voor teams, bedrijven en zorgprofessionals.",
    images: ["/images/training/training-3.jpg"],
  },
};

const doelgroepen = [
  {
    Icon: Briefcase,
    title: "Bedrijven & teams",
    body: "Een teamuitje dat blijft hangen. Medewerkers leren praktisch omgaan met onveilige of grimmige situaties — onderweg, op een parkeerterrein, 's avonds laat — en trainen dat samen als team.",
  },
  {
    Icon: HeartPulse,
    title: "Zorg & welzijn",
    body: "In de zorg krijg je te maken met onrust, boosheid en soms fysieke agressie van cliënten, patiënten of familie. We leren jullie zo'n situatie herkennen, de-escaleren en, als het toch nodig is, jezelf en een collega veilig uit een grip- of duwsituatie halen — zonder de ander onnodig pijn te doen.",
  },
];

const onderwerpen = [
  {
    Icon: Eye,
    title: "Situaties inschatten & de-escaleren",
    body: "Spanning op tijd herkennen en, waar mogelijk, een situatie laten sussen voordat die uit de hand loopt.",
  },
  {
    Icon: MessageCircleWarning,
    title: "Grenzen aangeven onder druk",
    body: "Stem, houding en positionering gebruiken om assertief en duidelijk grenzen te stellen.",
  },
  {
    Icon: HandMetal,
    title: "Vrijkomen uit een greep",
    body: "Jezelf losmaken uit een pols-, arm- of lichaamsgreep, ook als de ander sterker is.",
  },
  {
    Icon: Footprints,
    title: "Afstand nemen & vallen",
    body: "Veilig afstand creëren, en als het toch nodig is: gecontroleerd en veilig neerkomen.",
  },
  {
    Icon: Shield,
    title: "Proportioneel reageren",
    body: "Jezelf en collega's beschermen op een manier die past bij de situatie — belangrijk in de zorg, waar de ander vaak een cliënt of patiënt is.",
  },
  {
    Icon: Wind,
    title: "Rustig blijven onder spanning",
    body: "Ademhaling en mentale focus, zodat je in een spannend moment helder kunt blijven denken en handelen.",
  },
];

const praktisch = [
  { Icon: Clock, label: "Duur", value: "2 tot 3 uur, in overleg uit te breiden" },
  { Icon: Users, label: "Groep", value: "Van klein team tot hele afdeling" },
  { Icon: MapPin, label: "Locatie", value: "Bij jullie op kantoor of instelling, ergens in Noord-Brabant" },
  { Icon: Shirt, label: "Kleding", value: "Gewone, beweeglijke kleding volstaat" },
];

export default function ZelfverdedigingOpLocatiePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Zelfverdediging op locatie", url: `${site.url}/zelfverdediging-op-locatie` },
          ]),
          zelfverdedigingOpLocatieSchema,
        ]}
      />
      <PageHero
        eyebrow="Zelfverdediging op locatie"
        title="Weerbaarheid, bij jullie op locatie"
        subtitle="Praktische zelfverdediging voor teams, bedrijven en zorgprofessionals — op maat, bij jullie op de werkvloer, door een 6e Dan Master met bijna twintig jaar leservaring."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Zelfverdediging op locatie", href: "/zelfverdediging-op-locatie" },
        ]}
      />

      {/* Voor wie */}
      <section className="section">
        <div className="container-x">
          <div className="badge-red mb-4">Voor wie</div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight max-w-2xl">
            Twee groepen, één praktische aanpak
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {doelgroepen.map((d, i) => (
              <Reveal key={d.title} delay={i * 100}>
                <div className="card p-8 h-full">
                  <d.Icon className="text-[color:var(--color-accent-500)]" size={26} />
                  <h3 className="font-[family-name:var(--font-display)] text-2xl mt-4">{d.title}</h3>
                  <p className="mt-3 text-[color:var(--color-muted)] leading-relaxed">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wat behandelen we */}
      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <div className="badge-red mb-4">Wat behandelen we?</div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight max-w-2xl">
            Bewustwording, grenzen en concrete technieken
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)] max-w-2xl">
            Altijd op maat, in overleg over jullie specifieke situaties en risico&apos;s.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {onderwerpen.map((o, i) => (
              <Reveal key={o.title} delay={i * 80}>
                <div className="card p-6 h-full">
                  <o.Icon className="text-[color:var(--color-accent-500)]" size={22} />
                  <h3 className="font-[family-name:var(--font-display)] text-xl mt-4">{o.title}</h3>
                  <p className="mt-2 text-sm text-[color:var(--color-muted)] leading-relaxed">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="section">
        <div className="container-x">
          <div className="badge-red mb-4">Hoe het werkt</div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight max-w-2xl">
            Praktisch, zonder poespas
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {praktisch.map((p, i) => (
              <Reveal key={p.label} delay={i * 80}>
                <div className="card p-6 h-full">
                  <p.Icon className="text-[color:var(--color-accent-500)]" size={22} />
                  <h3 className="font-[family-name:var(--font-display)] text-lg mt-4">{p.label}</h3>
                  <p className="mt-2 text-sm text-[color:var(--color-muted)] leading-relaxed">{p.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meer dan een workshop */}
      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[color:var(--color-heading)] leading-snug">
              &ldquo;Veel aanbieders doen een losse workshop als leuke aanvulling op een teamdag. Wij doen dat ook —
              maar met de diepgang van bijna twintig jaar lesgeven in een complete, praktijkgerichte vechtsport.
              Geen show, maar technieken die echt werken als het erop aankomt.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Waarom Hapkido Yong */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <div className="rounded-xl overflow-hidden border border-[color:var(--color-border)] relative aspect-[3/4]">
              <Image src="/images/trainers/ron-van-beukering.jpg" alt="Master Ron van Beukering" fill className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-8 space-y-5">
            <div className="badge-red inline-block">Wie geeft de training</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight">
              Master Ron van Beukering, 6e Dan
            </h2>
            <p className="text-[color:var(--color-text)] leading-relaxed">
              Ron van Beukering introduceerde Hapkido in 2006 in Noord-Brabant en traint inmiddels meer dan 150 leden
              op twee locaties. Op 71-jarige leeftijd staat hij nog wekelijks zelf op de mat — het beste bewijs dat de
              technieken die we jullie leren niet draaien om kracht, maar om timing, techniek en rust. Precies wat je
              nodig hebt op de werkvloer.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Interesse? Vraag een offerte aan"
        subtitle="Vertel ons over jullie team, locatie en wensen — we stellen een programma op maat voor. Reactie meestal binnen 24 uur."
        primary={{ label: "WhatsApp direct", href: site.whatsapp, external: true, icon: "message" }}
        secondary={{ label: "Mail ons", href: `mailto:${site.email}`, external: true }}
      />
    </>
  );
}
