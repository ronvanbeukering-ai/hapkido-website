import type { Metadata } from "next";
import { BookOpen, Clock, Star, Lock } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { CursusContent } from "@/components/CursusContent";
import { hapkidoLessen, hapkidoVideos, totalDuur } from "@/lib/cursussen";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cursussen & Online Training — Hapkido Yong",
  description:
    "Online trainingsvideo's en cursussen van Hapkido Yong. 12 lessen van basis tot gevorderd, plus een videobibliotheek met Kwan Nyom Hapkido demonstraties.",
  keywords: ["hapkido cursus online", "hapkido video training", "hapkido lessen nederland"],
  alternates: { canonical: `${site.url}/cursussen` },
};

const stats = [
  { icon: BookOpen, value: `${hapkidoLessen.length}`, label: "Lessen" },
  { icon: Clock, value: `${totalDuur}m`, label: "Totale duur" },
  { icon: Star, value: "4.9", label: "Beoordeling" },
  { icon: Lock, value: "Leden", label: "Toegang" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Cursussen", url: `${site.url}/cursussen` },
        ])}
      />
      <PageHero
        eyebrow="Online trainingsmateriaal"
        title="Hapkido Cursus — Basis tot Gevorderd"
        subtitle="12 lessen · 5u 45m · door Ron van Beukering · exclusief voor leden"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Cursussen", href: "/cursussen" },
        ]}
      />

      {/* Stats balk */}
      <section className="bg-[color:var(--color-surface-2)] border-b border-[color:var(--color-border)]">
        <div className="container-x grid grid-cols-2 sm:grid-cols-4 gap-px bg-[color:var(--color-stone-200)]">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-[color:var(--color-surface-2)] p-6 flex items-center gap-3">
              <Icon className="text-[color:var(--color-accent-500)] shrink-0" size={18} />
              <div>
                <div className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-heading)]">{value}</div>
                <div className="text-xs text-[color:var(--color-muted)] uppercase tracking-widest">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Auth-aware content (client component) */}
      <CursusContent lessen={hapkidoLessen} videos={hapkidoVideos} />

      <CTABanner
        title="Word lid en krijg volledige toegang"
        subtitle="Alle 12 lessen, de videobibliotheek en trainingen op de mat — voor één contributiebedrag."
      />
    </>
  );
}
