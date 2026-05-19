import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { EmailCard } from "@/components/EmailCard";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site, locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact, Hapkido Yong Berkel-Enschot & Waalwijk",
  description:
    "Neem contact op met Hapkido Yong. Bel of WhatsApp +31 6 46 55 55 55, mail info@hapkidonederland.nl of bezoek onze dojo in Berkel-Enschot of Waalwijk.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Contact", url: `${site.url}/contact` },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="We horen graag van je"
        subtitle="Bellen, WhatsAppen of mailen, wat jou het beste uitkomt. Reactietijd: meestal binnen 24 uur."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <section className="section">
        <div className="container-x grid md:grid-cols-3 gap-5">
          <Reveal delay={0}>
            <a
              href={`tel:${site.phoneRaw}`}
              className="card p-6 block hover:border-[color:var(--color-accent-700)] transition-colors group h-full"
            >
              <Phone className="text-[color:var(--color-accent-500)]" size={22} />
              <h3 className="font-[family-name:var(--font-display)] text-2xl mt-4">Bel ons</h3>
              <p className="text-sm text-[color:var(--color-muted)] mt-1">{site.phone}</p>
            </a>
          </Reveal>
          <Reveal delay={80}>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 block hover:border-[color:var(--color-accent-700)] transition-colors group h-full"
            >
              <MessageCircle className="text-[color:var(--color-accent-500)]" size={22} />
              <h3 className="font-[family-name:var(--font-display)] text-2xl mt-4">WhatsApp</h3>
              <p className="text-sm text-[color:var(--color-muted)] mt-1">Snelste reactie</p>
            </a>
          </Reveal>
          <Reveal delay={160}>
            <EmailCard />
          </Reveal>
        </div>
      </section>

      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Bezoek</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
              Twee locaties
            </h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {locations.map((l, i) => (
              <Reveal key={l.slug} delay={i * 100}>
                <Link href={`/lessen/${l.slug}`} className="card p-6 block hover:border-[color:var(--color-accent-700)] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <MapPin className="text-[color:var(--color-accent-500)]" size={20} />
                      <h3 className="font-[family-name:var(--font-display)] text-3xl mt-3">{l.city}</h3>
                      <p className="text-sm text-[color:var(--color-muted)] mt-2">{l.street}</p>
                      <p className="text-sm text-[color:var(--color-muted)]">{l.postalCode} {l.city}</p>
                    </div>
                    <span className="badge-gold text-[10px]">{l.trainerName.split(" ").pop()}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
