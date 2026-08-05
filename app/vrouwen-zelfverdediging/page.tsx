import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eye, Shield, HandMetal, Wind, Footprints, MessageCircleWarning, Calendar } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zelfverdediging voor Vrouwen | Hapkido Yong",
  description:
    "Zelfverdediging voor vrouwen, verweven in de reguliere hapkido-lessen in Berkel-Enschot en Waalwijk: grenzen aangeven, situaties inschatten en verdedigen.",
  keywords: [
    "zelfverdediging voor vrouwen",
    "vrouwen zelfverdediging",
    "vrouwen weerbaarheid",
    "weerbaarheidstraining vrouwen",
    "hapkido voor vrouwen",
    "zelfverdediging berkel-enschot",
    "zelfverdediging waalwijk",
  ],
  alternates: { canonical: `${site.url}/vrouwen-zelfverdediging` },
  openGraph: {
    title: "Zelfverdediging voor Vrouwen | Hapkido Yong",
    description:
      "Vertrouwen op jezelf en je grenzen aangeven — zelfverdediging voor vrouwen, verweven in de reguliere hapkido-lessen.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-1.jpg", width: 1200, height: 630, alt: "Zelfverdediging voor vrouwen bij Hapkido Yong" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zelfverdediging voor Vrouwen | Hapkido Yong",
    description: "Vertrouwen op jezelf en je grenzen aangeven — zelfverdediging voor vrouwen bij Hapkido Yong.",
    images: ["/images/training/training-1.jpg"],
  },
};

const onderwerpen = [
  {
    Icon: Eye,
    title: "Bewustwording & situaties inschatten",
    body: "Alert blijven, signalen op tijd herkennen en een onveilige situatie waar mogelijk vermijden voordat hij escaleert.",
  },
  {
    Icon: MessageCircleWarning,
    title: "Grenzen aangeven",
    body: "Je stem en houding gebruiken om assertief en duidelijk 'nee' te zeggen, vóór het fysiek wordt.",
  },
  {
    Icon: HandMetal,
    title: "Bevrijden uit een greep",
    body: "Technieken om je los te maken uit een pols-, arm- of lichaamsgreep, ook als de ander sterker is.",
  },
  {
    Icon: Footprints,
    title: "Afstand bewaren & vallen",
    body: "Veilig afstand houden of creëren, en als het toch nodig is: veilig en gecontroleerd neerkomen (valbreken).",
  },
  {
    Icon: Shield,
    title: "Direct verdedigen",
    body: "Eenvoudige stoten, trappen en technieken die ook zonder veel kracht effectief zijn, gericht op zo snel mogelijk veilig wegkomen.",
  },
  {
    Icon: Wind,
    title: "Rustig blijven onder druk",
    body: "Ademhaling en mentale focus, zodat je in een spannend moment helder kunt blijven denken en handelen.",
  },
];

export default function VrouwenZelfverdedigingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Zelfverdediging voor vrouwen", url: `${site.url}/vrouwen-zelfverdediging` },
        ])}
      />
      <PageHero
        eyebrow="Zelfverdediging voor vrouwen"
        title="Vertrouwen op jezelf en je grenzen aangeven"
        subtitle="Verweven in onze reguliere lessen in Berkel-Enschot en Waalwijk — geen aparte cursus nodig."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Zelfverdediging voor vrouwen", href: "/vrouwen-zelfverdediging" },
        ]}
      />

      {/* Wanneer */}
      <section className="bg-[color:var(--color-surface-2)] border-b border-[color:var(--color-border)]">
        <div className="container-x py-5 flex flex-wrap items-center gap-3 text-sm">
          <Calendar size={16} className="text-[color:var(--color-accent-500)] shrink-0" />
          <span className="text-[color:var(--color-text)]">
            <strong>Berkel-Enschot:</strong> maandag 20:15–21:00 uur (niet op de eerste maandag van de maand, dan is er
            zwarte-bandtraining van de Academie).
          </span>
          <Link href="/lessen/berkel-enschot" className="ml-auto font-semibold text-[color:var(--color-accent-600)] hover:underline shrink-0">
            Bekijk lesrooster
          </Link>
        </div>
      </section>

      {/* Intro: visie van Jamy & Leonie */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-5">
            <p className="text-lg text-[color:var(--color-text)] leading-relaxed">
              Zelfverdediging gaat voor ons niet alleen over fysieke technieken. Het gaat vooral over bewustwording, je
              grenzen voelen en durven aangeven, vertrouwen op jezelf en weten wat je kunt doen als een situatie
              spannend of onveilig voelt. Je leert alert te blijven, situaties op tijd in te schatten en te vermijden,
              rustig te blijven en voor jezelf op te komen.
            </p>
            <p className="text-[color:var(--color-text)] leading-relaxed">
              Juist doordat je zelfverzekerder wordt, word je ook weerbaarder: je staat steviger, reageert bewuster en
              durft eerder voor jezelf op te komen. Kortom, je leert niet alleen hoe je jezelf kunt beschermen, maar
              ook hoe je steviger in je schoenen staat in het dagelijks leven.
            </p>
            <p className="text-sm text-[color:var(--color-muted)]">
              — Jamy van den Heuvel-Toorop (Instructrice, 2e Dan), ondersteund door Leonie Klerkx (1e Dan) en input van
              onze vrouwelijke leden
            </p>
          </div>

          <div className="lg:col-span-4 flex gap-4">
            <div className="flex-1 rounded-xl overflow-hidden border border-[color:var(--color-border)] relative aspect-[3/4]">
              <Image src="/images/trainers/jamy.jpg" alt="Jamy van den Heuvel-Toorop" fill className="object-cover" />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden border border-[color:var(--color-border)] relative aspect-[3/4]">
              <Image src="/images/trainers/leonie.jpg" alt="Leonie Klerkx" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Pull-quote */}
      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[color:var(--color-heading)] leading-snug">
              &ldquo;Bij zelfverdediging heb ik geleerd hoe ik een onveilige situatie kan voorkomen en mezelf zo snel
              mogelijk in veiligheid breng.&rdquo;
            </p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">— een van onze trainsters</p>
          </blockquote>
        </div>
      </section>

      {/* Wat behandelen we */}
      <section className="section">
        <div className="container-x">
          <div className="badge-red mb-4">Wat behandelen we?</div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight max-w-2xl">
            Bewustwording, grenzen en concrete technieken
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)] max-w-2xl">
            Dit is geen losse cursus, maar verweven in de reguliere lessen — zowel mentaal als fysiek.
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

      {/* Video: proefexamen Jamy & Jesse */}
      <section className="section bg-[color:var(--color-surface-2)] border-y border-[color:var(--color-border)]">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="badge-red mb-4">In de praktijk</div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
                Zie het zelf
              </h2>
              <p className="mt-4 text-[color:var(--color-muted)] max-w-md">
                Tijdens haar proefexamen laat Jamy van den Heuvel-Toorop zien wat Hapkido Combinatie in de praktijk
                inhoudt — inclusief de technieken die ook bij zelfverdediging voor vrouwen aan bod komen.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border border-[color:var(--color-border)] aspect-video bg-stone-900">
              <iframe
                className="w-full h-full"
                src="https://player.vimeo.com/video/1199536635?h=87f62c18bd&color=c25a00"
                title="Proefexamen Jamy van den Heuvel-Toorop & Jesse van Mierlo"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center">
            <div className="badge-red mb-4 inline-block">Ervaring van een lid</div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight">
              Wat zelfverdediging mij heeft gebracht
            </h2>
            <p className="mt-6 text-[color:var(--color-text)] leading-relaxed">
              Zelfverdediging heeft mij vooral meer rust en zelfverzekerdheid gegeven. Ik merk dat ik bewuster ben van
              mijn omgeving en meer vertrouw op mijn eigen gevoel. Ook heb ik ervaren dat wat ik leer echt effectief
              kan zijn bij het voorkomen van een potentieel vervelende situatie.
            </p>
            <p className="mt-4 text-[color:var(--color-text)] leading-relaxed">
              Daarnaast geven de trainingen met een fijne groep mensen mij plezier en de ruimte om mezelf uit te leven
              en mijn energie kwijt te kunnen. Ik blijf continu leren en mezelf ontwikkelen, fysiek én mentaal. Juist
              die combinatie maakt zelfverdediging voor mij zo waardevol.
            </p>
            <p className="mt-5 text-sm font-semibold text-[color:var(--color-heading)]">— Ingrid v.B.</p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ervaar het zelf"
        subtitle="Zelfverdediging voor vrouwen is verweven in elke reguliere les — een gratis proefles is de makkelijkste manier om te ervaren hoe dat voelt."
      />
    </>
  );
}
