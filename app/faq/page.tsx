import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema, breadcrumbSchema } from "@/lib/jsonld";
import { site, faq } from "@/lib/site";

export const metadata: Metadata = {
  title: "Veelgestelde vragen over Hapkido",
  description:
    "Alles wat je wilt weten over Hapkido: leeftijd, kosten, proefles, banden, examens en meer. Antwoorden van Hapkido Yong in Berkel-Enschot en Waalwijk.",
  keywords: ["hapkido vragen", "hapkido beginnen", "hapkido leeftijd kinderen"],
  alternates: { canonical: `${site.url}/faq` },
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

      <CTABanner title="Vraag niet beantwoord?" subtitle="WhatsApp ons direct, meestal binnen een paar uur reactie." />
    </>
  );
}
