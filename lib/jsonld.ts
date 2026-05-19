import { site, locations, trainers, faq } from "./site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.altName,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/logo.svg`,
    width: 200,
    height: 60,
  },
  telephone: site.phoneRaw,
  email: site.email,
  sameAs: [site.socials.facebook, site.socials.instagram, site.socials.youtube, `https://${site.domainAlias}`],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phoneRaw,
    contactType: "customer service",
    availableLanguage: "Dutch",
  },
  memberOf: [
    { "@type": "Organization", name: "NBJJV", url: "https://www.nbjjv.nl" },
  ],
};

const dayMap: Record<string, string> = {
  Maandag: "Monday",
  Dinsdag: "Tuesday",
  Woensdag: "Wednesday",
  Donderdag: "Thursday",
  Vrijdag: "Friday",
  Zaterdag: "Saturday",
  Zondag: "Sunday",
};

export function locationSchema(slug: string) {
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return null;
  return {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    "@id": `${site.url}/lessen/${loc.slug}#location`,
    name: `${site.name}, ${loc.city}`,
    description: `Hapkido Combinatie lessen in ${loc.city}.`,
    url: `${site.url}/lessen/${loc.slug}`,
    telephone: site.phoneRaw,
    email: site.email,
    priceRange: "€75–€300",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.city,
      addressRegion: loc.region,
      postalCode: loc.postalCode,
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    openingHoursSpecification: loc.schedule.map((s) => {
      const [opens, closes] = s.time.split(" – ");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[s.day],
        opens,
        closes,
        description: s.group,
      };
    }),
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}

export function personSchema(slug: string) {
  const t = trainers.find((x) => x.slug === slug);
  if (!t) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/trainers/${t.slug}#person`,
    name: t.name.replace(/^(Master|CGN|KSN)\s+/, ""),
    honorificPrefix: /^Master|CGN|KSN/.test(t.name) ? t.name.split(" ")[0] : undefined,
    jobTitle: t.role,
    description: t.bio,
    knowsAbout: t.knowsAbout,
    worksFor: { "@id": `${site.url}/#organization` },
    url: `${site.url}/trainers/${t.slug}`,
  };
}

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Hapkido Yong, Training en zelfverdediging",
  description:
    "Impressie van Hapkido Combinatie training bij Hapkido Yong in Berkel-Enschot en Waalwijk. Koreaans MMA voor alle leeftijden.",
  thumbnailUrl: `${site.url}/images/video-thumbnail.jpg`,
  uploadDate: "2020-04-01",
  contentUrl: "https://vimeo.com/400308195",
  embedUrl: "https://player.vimeo.com/video/400308195",
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "nl",
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

