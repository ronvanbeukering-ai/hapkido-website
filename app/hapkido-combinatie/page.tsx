import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sword, Target, History } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { VideoGallery } from "@/components/VideoGallery";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hapkido Combinatie uitgelegd Koreaans MMA & street defence",
  description:
    "Hapkido Combinatie combineert diverse vechtsporten: Hapkido, BJJ, Krav Maga, Systema en meer. Ontdek complete street defence bij Hapkido Yong in Noord-Brabant.",
  keywords: [
    "hapkido combinatie",
    "koreaans mma",
    "wat is hapkido",
    "kwan nyom hapkido",
    "sin moo hapkido",
    "dim mak",
    "pressure point fighting",
    "street defence nederland",
    "complete defence",
    "hapkido versus krav maga",
    "hapkido versus bjj",
    "systema nederland",
    "hapkido voor beginners",
  ],
  alternates: { canonical: `${site.url}/hapkido-combinatie` },
  openGraph: {
    title: "Hapkido Combinatie Koreaans MMA & complete street defence",
    description:
      "Hapkido Combinatie combineert diverse vechtsporten tot één complete zelfverdedigingsstijl. Ontdek Hapkido, BJJ, Krav Maga, Systema en meer bij Hapkido Yong.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-3.jpg", width: 1200, height: 630, alt: "Hapkido Combinatie grondtechnieken en klemmen in de training" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hapkido Combinatie Koreaans MMA uitgelegd",
    description: "Diverse vechtsporten in één stijl: Hapkido, BJJ, Krav Maga, Systema en meer. Berkel-Enschot & Waalwijk.",
    images: ["/images/training/training-3.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Hapkido Combinatie", url: `${site.url}/hapkido-combinatie` },
        ])}
      />
      <PageHero
        eyebrow="Wat is Hapkido Combinatie"
        title="Het Koreaanse MMA uitgelegd"
        subtitle="Diverse vechtsporten gecombineerd in één moderne, complete zelfverdedigingsstijl. Vanaf 7 jaar tot ver in je 60ers."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Hapkido Combinatie", href: "/hapkido-combinatie" },
        ]}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="space-y-5 text-[color:var(--color-text)] leading-relaxed text-base md:text-lg">
              <p>
                Hapkido Combinatie is Hapkido gecombineerd met inzichten uit andere martial arts. Door het samenbrengen van verdedigingsstijlen en vooropleidingen ontstaat een methode waarbij je het maximum haalt uit praktische zelfverdediging.
              </p>
              <p>
                <strong className="text-[color:var(--color-heading)] font-semibold">Hapkido Combinatie</strong> is een innovatieve, moderne zelfverdedigingsstijl die technieken combineert uit Hapkido, Jiu-Jitsu, Judo, Taekwondo, Systema, Boksen, Pencak Silat, Krav Maga en Braziliaans Jiu-Jitsu. Daarom wordt het ook wel <em>Koreaans MMA</em> genoemd.
              </p>
              <p>
                Kwan Nyom Hapkido is in 2006 door Master Ron van Beukering in Nederland geïntroduceerd. In oktober 2023 startte hij Hapkido Combinatie, een eigen, complete stijl die de beste elementen uit moderne vechtsporten samenbrengt.
              </p>
              <p>
                Je leert trappen, stoten, worpen, klemmen en grondtechnieken, aangevuld met ademhalings-, meditatie- en ontspanningsoefeningen. Niet om te vechten maar om situaties te voorkomen en jezelf en anderen te beschermen.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-6 md:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-3xl mb-5">In het kort</h3>
              <ul className="space-y-3 text-sm text-[color:var(--color-text)]">
                <li className="flex gap-3"><Sword size={16} className="text-[color:var(--color-accent-500)] shrink-0 mt-1" /><span>Stand-up, klemmen, worpen, grondtechnieken</span></li>
                <li className="flex gap-3"><Target size={16} className="text-[color:var(--color-accent-500)] shrink-0 mt-1" /><span>Praktische zelfverdediging, voor de straat, niet de ring</span></li>
                <li className="flex gap-3"><History size={16} className="text-[color:var(--color-accent-500)] shrink-0 mt-1" /><span>Sinds 2006 in Nederland · sinds 2023 als Hapkido Combinatie</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="badge-red mb-4">Tijdlijn</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight mb-10">
              Van Korea naar Nederland
            </h2>
          </Reveal>
          <ol className="relative border-l border-[color:var(--color-border)] ml-3 space-y-8">
            {[
              { y: "1948", t: "Hapkido opgericht", b: "Dojunim Choi Yong-sool legt in Korea de basis voor wat later Hapkido wordt." },
              { y: "1983", t: "Sin Moo Hapkido", b: "Dojunim Ji Han-Jae ontwikkelt Sin Moo Hapkido, een verfijnde tak met nadruk op spirituele en filosofische diepgang." },
              { y: "1984", t: "Kwan Nyom Hapkido geboren", b: "Master G.M. Booth ontwikkelt een eigen tak van het Hapkido in Amerika." },
              { y: "2006", t: "Introductie in Nederland", b: "Master Ron van Beukering brengt Kwan Nyom Hapkido naar Nederland." },
              { y: "2023", t: "Hapkido Combinatie", b: "Lancering van de moderne, gecombineerde stijl, Koreaans MMA." },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 100} as="li">
                <span className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full bg-[color:var(--color-accent-600)] ring-4 ring-[color:var(--color-bg)]" />
                <div className="pl-6">
                  <div className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-accent-500)]">{step.y}</div>
                  <h3 className="text-xl mt-1 font-[family-name:var(--font-display)]">{step.t}</h3>
                  <p className="text-[color:var(--color-muted)] text-sm md:text-base mt-2 leading-relaxed">{step.b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10">
            <Link href="/trainers/ron-van-beukering" className="btn-ghost">
              Lees meer over Master Ron <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trainingsfoto's */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">In actie</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight mb-10">
              Hapkido Combinatie op de mat
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <figure className="relative overflow-hidden rounded-xl aspect-video bg-[color:var(--color-stone-200)]">
                <Image
                  src="/images/training/training-3.jpg"
                  alt="Hapkido Combinatie grondtechnieken en klemmen tijdens training in Berkel-Enschot"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0e0b08]/80 to-transparent text-white text-sm font-medium">
                  Grondtechnieken &amp; klemmen Berkel-Enschot
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={100}>
              <figure className="relative overflow-hidden rounded-xl aspect-video bg-[color:var(--color-stone-200)]">
                <Image
                  src="/images/training/academy.jpg"
                  alt="Hapkido Combinatie Academie zwarte-bandtraining voor gevorderden"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0e0b08]/80 to-transparent text-white text-sm font-medium">
                  Hapkido Combinatie Academie zwarte-bandtraining
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trainingsvideo's */}
      <section className="section bg-[color:var(--color-stone-950)] border-y border-white/10">
        <div className="container-x">
          <Reveal>
            <div className="badge-red mb-4">Bekijk de training</div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-white">
              Zo ziet Hapkido Combinatie eruit
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl">
              Echte trainingsopnames van onze lessen in Noord-Brabant. Geen showvechten gewone lessen, echte technieken.
            </p>
          </Reveal>
          <div className="mt-10">
            <VideoGallery />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight mb-4">
              Train Hapkido Combinatie in Noord-Brabant
            </h2>
            <p className="text-[color:var(--color-muted)] leading-relaxed">
              Hapkido Combinatie wordt gegeven op twee locaties: <Link href="/lessen/berkel-enschot" className="text-[color:var(--color-accent-400)] hover:underline">Berkel-Enschot</Link> en <Link href="/lessen/waalwijk" className="text-[color:var(--color-accent-400)] hover:underline">Waalwijk</Link>. Bekijk het profiel van onze hoofdtrainer <Link href="/trainers/ron-van-beukering" className="text-[color:var(--color-accent-400)] hover:underline">Master Ron van Beukering</Link>, of ga direct naar <Link href="/proefles" className="text-[color:var(--color-accent-400)] hover:underline">gratis proefles aanvragen</Link>.
            </p>
          </Reveal>
        </div>
      </section>
      <CTABanner title="Klinkt dit als iets voor jou?" subtitle="Ervaar het in een gratis proefles, geen verplichting." />
    </>
  );
}
