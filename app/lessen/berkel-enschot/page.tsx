import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { ScheduleTable } from "@/components/ScheduleTable";
import { ProeflesForm } from "@/components/ProeflesForm";
import { CTABanner } from "@/components/CTABanner";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { locationSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site, locations, faq } from "@/lib/site";

const loc = locations.find((l) => l.slug === "berkel-enschot")!;

export const metadata: Metadata = {
  title: "Hapkido Berkel-Enschot (bij Tilburg) Gratis proefles",
  description:
    "Hapkido Combinatie lessen in Berkel-Enschot, Kerkstraat 9B. Jeugd en volwassenen, ma/wo/za. Trainer: Master Ron van Beukering (6e Dan). Plan gratis proefles.",
  keywords: [
    "hapkido berkel-enschot",
    "hapkido tilburg",
    "hapkido combinatie tilburg",
    "zelfverdediging berkel-enschot",
    "zelfverdediging tilburg",
    "hapkido noord-brabant",
    "martial arts tilburg",
    "kwan nyom hapkido tilburg",
    "hapkido proefles tilburg",
  ],
  alternates: { canonical: `${site.url}/lessen/berkel-enschot` },
  openGraph: {
    title: "Hapkido Berkel-Enschot (bij Tilburg) Gratis proefles",
    description:
      "Hapkido Combinatie in Berkel-Enschot onder leiding van Master Ron van Beukering. Lessen voor jeugd en volwassenen. Maandag, woensdag en zaterdag.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-4.jpg", width: 1200, height: 630, alt: "Hapkido Yong dojang Berkel-Enschot Kerkstraat 9B" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hapkido Berkel-Enschot Hapkido Combinatie bij Tilburg",
    description: "Master Ron van Beukering (6e Dan). Lessen ma/wo/za. Gratis proefles aanvragen.",
    images: ["/images/training/training-4.jpg"],
  },
};

export default function Page() {
  const schema = locationSchema("berkel-enschot")!;
  return (
    <>
      <JsonLd
        data={[
          schema,
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Lessen Berkel-Enschot", url: `${site.url}/lessen/berkel-enschot` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Berkel-Enschot"
        title="Hapkido in Berkel-Enschot"
        subtitle={`Kerkstraat 9B · zeven trainingsuren per week · jeugd vanaf 7 jaar tot volwassenen.`}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Berkel-Enschot", href: "/lessen/berkel-enschot" },
        ]}
        bgImage="/images/training/berkel-enschot-header.jpg"
        bgPosition="top"
      />

      <section className="bg-[color:var(--color-surface-2)] border-b border-[color:var(--color-border)]">
        <div className="container-x grid sm:grid-cols-3 gap-px bg-[color:var(--color-border)]">
          <div className="bg-[color:var(--color-surface-2)] p-6 flex items-center gap-3">
            <MapPin className="text-[color:var(--color-accent-500)]" size={18} />
            <div>
              <div className="text-xs text-[color:var(--color-muted)] uppercase tracking-widest">Adres</div>
              <div className="text-sm">{loc.street}, {loc.postalCode}</div>
            </div>
          </div>
          <a href={`tel:${site.phoneRaw}`} className="bg-[color:var(--color-surface-2)] p-6 flex items-center gap-3 hover:bg-[color:var(--color-surface-3)] transition-colors">
            <Phone className="text-[color:var(--color-accent-500)]" size={18} />
            <div>
              <div className="text-xs text-[color:var(--color-muted)] uppercase tracking-widest">Telefoon</div>
              <div className="text-sm">{site.phone}</div>
            </div>
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[color:var(--color-surface-2)] p-6 flex items-center gap-3 hover:bg-[color:var(--color-surface-3)] transition-colors">
            <MessageCircle className="text-[color:var(--color-accent-500)]" size={18} />
            <div>
              <div className="text-xs text-[color:var(--color-muted)] uppercase tracking-widest">WhatsApp</div>
              <div className="text-sm">Direct contact</div>
            </div>
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            <div className="badge-red mb-4">Lestijden</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight mb-8">
              Wanneer trainen we?
            </h2>
            <ScheduleTable entries={loc.schedule} note={loc.note} />
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <div className="card overflow-hidden">
              <iframe
                title="Kaart Berkel-Enschot"
                src={loc.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full aspect-square border-0 grayscale opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="p-6 space-y-3">
                <h3 className="font-[family-name:var(--font-display)] text-2xl">Routebeschrijving</h3>
                <p className="text-sm text-[color:var(--color-muted)]">{loc.street}, {loc.postalCode} {loc.city}</p>
                <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                  Open in Google Maps <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="badge-red mb-4">Eerste les?</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
              Wat je kunt verwachten
            </h2>
            <div className="mt-6 space-y-4 text-[color:var(--color-text)] leading-relaxed">
              <p>
                Tijdens een proefles draai je gewoon mee in de groep. Onze trainers letten extra op je en leggen rustig uit wat we doen. Geen toetsen, geen verplichtingen, gewoon kijken of het klikt.
              </p>
              <p>Wat neem je mee?</p>
              <ul className="list-disc pl-5 text-[color:var(--color-muted)] space-y-1.5">
                <li>Sportkleding (joggingbroek + T-shirt is prima)</li>
                <li>Een flesje water</li>
                <li>Een handdoek</li>
              </ul>
              <p className="text-sm text-[color:var(--color-muted)]">Een hapkidopak is niet nodig, dat krijg je pas als je lid wordt.</p>
            </div>
          </Reveal>
          <Reveal delay={150} id="proefles">
            <ProeflesForm locatie="Berkel-Enschot" />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight mb-8">
            Vragen over Berkel-Enschot
          </h2>
          <FAQ items={faq} limit={5} />
        </div>
      </section>

      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight mb-4">
              Meer weten over Hapkido Combinatie?
            </h2>
            <p className="text-[color:var(--color-muted)] leading-relaxed">
              Lees alles over <Link href="/hapkido-combinatie" className="text-[color:var(--color-accent-300)] hover:underline">Hapkido Combinatie</Link>, onze complete zelfverdedigingsstijl. Of bekijk de andere locatie in <Link href="/lessen/waalwijk" className="text-[color:var(--color-accent-300)] hover:underline">Waalwijk</Link>. Meer over onze hoofdtrainer: <Link href="/trainers/ron-van-beukering" className="text-[color:var(--color-accent-300)] hover:underline">Master Ron van Beukering</Link>.
            </p>
          </Reveal>
        </div>
      </section>
      <CTABanner title="Klaar om mee te trainen?" />
    </>
  );
}
