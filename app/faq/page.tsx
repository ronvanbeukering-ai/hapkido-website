import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site, faq } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ Veelgestelde vragen over Hapkido Combinatie",
  description:
    "Antwoorden op al je vragen over hapkido: leeftijd, kosten, proefles, banden en examens. Hapkido Yong, Berkel-Enschot en Waalwijk, Noord-Brabant.",
  keywords: [
    "hapkido vragen",
    "hapkido beginnen",
    "hapkido leeftijd kinderen",
    "hapkido kosten contributie",
    "hapkido bandexamen",
    "hapkido combinatie uitleg",
    "hapkido voor beginners",
    "hapkido yong faq",
  ],
  alternates: { canonical: `${site.url}/faq` },
  openGraph: {
    title: "FAQ Veelgestelde vragen over Hapkido Combinatie",
    description:
      "Alles over hapkido: leeftijd, contributie, proefles, banden en examens. Hapkido Yong in Berkel-Enschot en Waalwijk.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-1.jpg", width: 1200, height: 630, alt: "Hapkido Yong veelgestelde vragen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ Hapkido Yong Hapkido Combinatie vragen",
    description: "Leeftijd, kosten, proefles, banden. Alles over hapkido bij Hapkido Yong in Noord-Brabant.",
    images: ["/images/training/training-1.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          faqPageSchema,
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "FAQ", url: `${site.url}/faq` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="FAQ"
        title="Veelgestelde vragen"
        subtitle="Antwoorden op de meest gestelde vragen over Hapkido Combinatie, proefles, contributie en examens."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />

      <section className="section">
        <div className="container-x max-w-3xl">
          <FAQ items={faq} />
        </div>
      </section>

      <CTABanner
        title="Vraag niet beantwoord?"
        subtitle="WhatsApp ons direct, meestal binnen een paar uur reactie."
        primary={{ label: "WhatsApp ons", href: site.whatsapp, external: true, icon: "message" }}
        secondary={{ label: "Gratis proefles", href: "/proefles", icon: "arrow" }}
      />
    </>
  );
}
