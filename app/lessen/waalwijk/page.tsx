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

const loc = locations.find((l) => l.slug === "waalwijk")!;

export const metadata: Metadata = {
  title: "Hapkido & zelfverdediging Waalwijk, Lestijden en proefles",
  description:
    "Hapkido lessen in Waalwijk op Dominee Louwe Kooymanslaan 9. Maandag en zaterdag. Hoofdtrainer Marco van Gulik. Meld je aan voor een gratis proefles.",
  keywords: ["hapkido waalwijk", "zelfverdediging waalwijk", "martial arts waalwijk"],
  alternates: { canonical: `${site.url}/lessen/waalwijk` },
};

export default function Page() {
  const schema = locationSchema("waalwijk")!;
  return (
    <>
      <JsonLd
        data={[
          schema,
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Lessen Waalwijk", url: `${site.url}/lessen/waalwijk` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Waalwijk"
        title="Hapkido in Waalwijk"
        subtitle="Dominee Louwe Kooymanslaan 9 · hoofdtrainer CGN Marco van Gulik, 2e Dan."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Waalwijk", href: "/lessen/waalwijk" },
        ]}
        bgImage="/images/training/training-2.jpg"
      />

      <section className="bg-[color:var(--color-surface-2)] border-b border-[color:var(--color-border)]">
        <div className="container-x grid sm:grid-cols-3 gap-px bg-[color:var(--color-stone-200)]">
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
            <ScheduleTable entries={loc.schedule} />
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <div className="card overflow-hidden">
              <iframe
                title="Kaart Waalwijk"
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
                Marco geeft les met humor én serieuze inhoud. Je leert technieken die op straat kloppen, niet alleen in een ring. Tijdens je proefles draai je rustig mee in de groep.
              </p>
              <ul className="list-disc pl-5 text-[color:var(--color-muted)] space-y-1.5">
                <li>Sportkleding</li>
                <li>Drinkfles</li>
                <li>Handdoek</li>
              </ul>
              <p className="text-sm text-[color:var(--color-muted)]">Een pak heb je voor de proefles niet nodig.</p>
            </div>
            <div className="mt-8">
              <Link href={`/trainers/${loc.trainerSlug}`} className="btn-ghost">
                Maak kennis met {loc.trainerName} <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} id="proefles">
            <ProeflesForm />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight mb-8">
            Vragen over Waalwijk
          </h2>
          <FAQ items={faq} limit={5} />
        </div>
      </section>

      <CTABanner title="Klaar om mee te trainen?" />
    </>
  );
}
