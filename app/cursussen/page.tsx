import type { Metadata } from "next";
import { BookOpen, Clock, Star, Lock, Home, Play, CalendarX } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, courseSchema } from "@/lib/jsonld";
import { CursusContent } from "@/components/CursusContent";
import { onlineLessen, hapkidoVideos, totalDuur } from "@/lib/cursussen";
import { site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Hapkido Online Cursus Lessen van Ron van Beukering",
  description:
    "Online hapkido-lessen van Master Ron van Beukering. 12 videolessen van basis tot gevorderd. Kwan Nyom Hapkido en Hapkido Combinatie technieken. Voor leden en niet-leden.",
  keywords: [
    "hapkido cursus online",
    "hapkido video training",
    "hapkido lessen nederland",
    "kwan nyom hapkido cursus",
    "hapkido combinatie online",
    "ron van beukering hapkido cursus",
    "hapkido techniques video",
    "hapkido zelfverdediging online",
  ],
  alternates: { canonical: `${site.url}/cursussen` },
  openGraph: {
    title: "Hapkido Online Cursus Lessen van Master Ron van Beukering",
    description:
      "12 online hapkido-videolessen van basis tot gevorderd door Master Ron van Beukering. Kwan Nyom Hapkido en Hapkido Combinatie.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-3.jpg", width: 1200, height: 630, alt: "Hapkido online cursus Hapkido Yong" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hapkido Online Cursus door Ron van Beukering",
    description: "12 videolessen Hapkido Combinatie en Kwan Nyom Hapkido. Voor leden en niet-leden van Hapkido Yong.",
    images: ["/images/training/training-3.jpg"],
  },
};

const stats = [
  { icon: BookOpen, value: `${onlineLessen.length}`, label: "Online lessen" },
  { icon: Clock, value: `${totalDuur}m`, label: "Totale duur" },
  { icon: Star, value: "4.9", label: "Beoordeling" },
  { icon: Lock, value: "€7,50", label: "Niet-leden (per maand)" },
];

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hapkido_videos")
    .select("url, titel, beschrijving, categorie, platform")
    .order("volgorde", { ascending: true });

  const videos = (data ?? hapkidoVideos.map(v => ({ url: v.id, titel: v.titel, beschrijving: v.beschrijving, categorie: v.categorie, platform: v.platform ?? "vimeo" })))
    .map(v => ({ id: v.url ?? "", titel: v.titel, beschrijving: v.beschrijving, categorie: v.categorie, platform: v.platform as "youtube" | "vimeo" | "local" | undefined }));
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Cursussen", url: `${site.url}/cursussen` },
          ]),
          courseSchema,
        ]}
      />
      <PageHero
        eyebrow="Online trainingsmateriaal"
        title="Hapkido Cursus Basis tot Gevorderd"
        subtitle="Solo te trainen · door Ron van Beukering · voor leden en niet-leden"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Cursussen", href: "/cursussen" },
        ]}
      />

      {/* Stats balk */}
      <section className="bg-[color:var(--color-surface-2)] border-b border-[color:var(--color-border)]">
        <div className="container-x grid grid-cols-2 sm:grid-cols-4 gap-px bg-[color:var(--color-border)]">
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

      {/* Promo blok voor thuistrainers */}
      <section className="section border-b border-[color:var(--color-border)]">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="badge-gold mb-4">Geen lid? Geen probleem.</div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight leading-tight">
                Train Hapkido<br />gewoon thuis
              </h2>
              <p className="mt-4 text-[color:var(--color-text)] leading-relaxed max-w-lg">
                Woon je te ver weg, heb je een druk schema of wil je eerst rustig kennismaken met Hapkido Combinatie?
                Met het online cursusabonnement volg je dezelfde lessen als onze leden — op jouw tijd, in jouw eigen ruimte.
              </p>
              <p className="mt-3 text-[color:var(--color-muted)] leading-relaxed max-w-lg">
                Master Ron van Beukering legt elke techniek stap voor stap uit. Van basishoudingen en valbreken tot stoten, trappen en locks — alles wat je solo kunt oefenen.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/online-aanmelden" className="btn-primary">
                  Starten vanaf €7,50 per maand
                </Link>
                <Link href="/proefles" className="btn-ghost">
                  Liever naar de dojo?
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Home,      t: "Thuis trainen",        b: "Geen dojo nodig. Oefen in je woonkamer, garage of tuin op het moment dat jou uitkomt." },
                { icon: Play,      t: "Solo trainbaar",          b: "Basishoudingen, valbreken, stoten, trappen en locks. Alles wat je zelfstandig kunt oefenen." },
                { icon: CalendarX, t: "Geen verplichting",    b: "Maandelijks opzegbaar. Geen kwartaalcontract, geen inschrijfgeld, geen bondskosten." },
              ].map(({ icon: Icon, t, b }) => (
                <div key={t} className="card p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-md bg-[color:var(--color-accent-600)]/15 border border-[color:var(--color-accent-600)]/30 inline-flex items-center justify-center text-[color:var(--color-accent-400)] shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl">{t}</h3>
                    <p className="mt-1 text-sm text-[color:var(--color-muted)] leading-relaxed">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dojang-blok voor niet-leden */}
      <section className="section bg-[color:var(--color-stone-950)] text-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-widest text-white/70 mb-5">
                In de Dojang
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight leading-tight">
                Thuis oefen je de beweging.<br />
                <span className="text-[color:var(--color-gold-400)]">In de dojo maak je hem echt.</span>
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed max-w-lg">
                De online cursus geeft je een stevige technische basis die je zelfstandig kunt opbouwen.
                Maar elke techniek — of het nu een worp, een lock of een ontwijkbeweging is — wordt in de Dojang
                geoefend <strong className="text-white">met één of meerdere tegenstanders</strong>.
                Je leert dan niet alleen hoe een techniek eruitziet, maar hoe hij aanvoelt onder druk,
                hoe je timing werkt en hoe je je aanpast aan een echte situatie.
              </p>
              <p className="mt-3 text-white/50 leading-relaxed max-w-lg text-sm">
                Dat is het verschil tussen kennis en vaardigheid. Online leer je het patroon.
                In de Dojang word je er bedreven in.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/proefles" className="btn-primary">
                  Plan een gratis proefles
                </Link>
                <Link href="/lessen/berkel-enschot" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-white/80 hover:bg-white/8 hover:text-white transition-colors text-sm font-semibold">
                  Bekijk lesrooster
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  nr: "01",
                  t: "Tegenstander-druk",
                  b: "Een greep, worp of lock voelt anders op een echte partner dan in je eentje. Je leert afstand, timing en kracht correct inschatten.",
                },
                {
                  nr: "02",
                  t: "Meerdere aanvallers",
                  b: "Hapkido Combinatie bereidt je voor op onverwachte situaties. In de Dojang oefen je ook scenario's met meer dan één tegenstander.",
                },
                {
                  nr: "03",
                  t: "Directe correctie",
                  b: "Master Ron of een senior instructor ziet en corrigeert in real-time. Dat versnelt je ontwikkeling enorm ten opzichte van alleen thuis oefenen.",
                },
                {
                  nr: "04",
                  t: "Sparring & randori",
                  b: "Naarmate je vordert ga je technieken ook vrij toepassen in gecontroleerde sparring. Dáár toets je of het echt zit.",
                },
              ].map(({ nr, t, b }) => (
                <div key={nr} className="flex gap-4 items-start p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors">
                  <span className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-gold-400)] shrink-0 leading-none mt-0.5">{nr}</span>
                  <div>
                    <h3 className="font-semibold text-white">{t}</h3>
                    <p className="mt-1 text-sm text-white/55 leading-relaxed">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Auth-aware content (client component) */}
      <CursusContent lessen={onlineLessen} videos={videos} />

      <CTABanner
        title="Toegang voor iedereen"
        subtitle="Leden hebben automatisch toegang. Niet-lid? €7,50 per maand of €50 per jaar."
      />
    </>
  );
}
