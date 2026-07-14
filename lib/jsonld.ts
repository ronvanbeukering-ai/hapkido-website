import { site, locations, trainers, faq } from "./site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "SportsOrganization"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: [site.altName, "Hapkido Combinatie", "Kwan Nyom Hapkido Nederland"],
  description:
    "Hapkido Yong biedt Hapkido Combinatie (Koreaans MMA) op twee locaties in Noord-Brabant: Berkel-Enschot en Waalwijk. Opgericht door Master Ron van Beukering in 2006.",
  foundingDate: "2006",
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/logo.png`,
    width: 200,
    height: 200,
  },
  image: `${site.url}/images/training/training-1.jpg`,
  telephone: site.phoneRaw,
  email: site.email,
  sameAs: [
    site.socials.facebook,
    site.socials.instagram,
    site.socials.youtube,
    site.socials.googleBusiness,
    `https://${site.domainAlias}`,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phoneRaw,
    contactType: "customer service",
    contactOption: "TollFree",
    availableLanguage: "Dutch",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Saturday"],
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kerkstraat 9B",
    addressLocality: "Berkel-Enschot",
    addressRegion: "Noord-Brabant",
    postalCode: "5056 AE",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.5741,
    longitude: 5.1564,
  },
  memberOf: [
    { "@type": "Organization", name: "NBJJV", url: "https://www.nbjjv.nl" },
  ],
  knowsAbout: [
    "Hapkido",
    "Hapkido Combinatie",
    "Kwan Nyom Hapkido",
    "Sin Moo Hapkido",
    "Krav Maga",
    "Braziliaans Jiu-Jitsu",
    "Pencak Silat",
    "Taekwondo",
    "Systema",
    "Judo",
    "Jiu-Jitsu",
    "Boksen",
    "Zelfverdediging",
    "Dim Mak",
    "Pressure Point Fighting",
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
  const trainer = trainers.find((t) => t.slug === loc.trainerSlug);
  return {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    "@id": `${site.url}/lessen/${loc.slug}#location`,
    name: `Hapkido Yong ${loc.city}`,
    alternateName: `Hapkido Combinatie ${loc.city}`,
    description: `Hapkido Combinatie lessen (Koreaans MMA) in ${loc.city}, ${loc.region}. Zelfverdediging voor jeugd en volwassenen. Gratis proefles mogelijk.`,
    url: `${site.url}/lessen/${loc.slug}`,
    telephone: site.phoneRaw,
    email: site.email,
    priceRange: "€75–€300",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Bank transfer",
    image: `${site.url}${loc.photo}`,
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
    hasMap: loc.mapsUrl,
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
    employee: trainer
      ? {
          "@type": "Person",
          "@id": `${site.url}/trainers/${trainer.slug}#person`,
          name: trainer.name,
          jobTitle: trainer.role,
        }
      : undefined,
    parentOrganization: { "@id": `${site.url}/#organization` },
    sameAs: [site.url],
  };
}

export function personSchema(slug: string) {
  const t = trainers.find((x) => x.slug === slug);
  if (!t) return null;
  const isRon = slug === "ron-van-beukering";
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/trainers/${t.slug}#person`,
    name: t.name.replace(/^(Master|CGN|KSN)\s+/, ""),
    alternateName: isRon ? ["Master Ron", "Ron van Beukering-Bin Ghoni", "Master Ron van Beukering"] : undefined,
    honorificPrefix: /^(Master|CGN|KSN)/.test(t.name) ? t.name.split(" ")[0] : undefined,
    jobTitle: t.role,
    description: t.bio,
    knowsAbout: t.knowsAbout,
    hasCredential: isRon
      ? [
          { "@type": "EducationalOccupationalCredential", credentialCategory: "6e Dan Hapkido Combinatie" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "5e Dan Kwan Nyom Hapkido" },
        ]
      : undefined,
    image: t.photo ? `${site.url}${t.photo}` : undefined,
    worksFor: { "@id": `${site.url}/#organization` },
    url: `${site.url}/trainers/${t.slug}`,
    sameAs: isRon
      ? [site.socials.facebook, site.socials.instagram, site.socials.youtube]
      : undefined,
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

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${site.url}/cursussen#course`,
  name: "Hapkido Combinatie Online Cursus — Solo training",
  description:
    "5 online videolessen Hapkido Combinatie, speciaal samengesteld voor solo training thuis. Van basishoudingen en valbreken tot stoten, trappen en locks. Gemaakt door Master Ron van Beukering (6e Dan).",
  url: `${site.url}/cursussen`,
  inLanguage: "nl",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    instructor: {
      "@type": "Person",
      "@id": `${site.url}/trainers/ron-van-beukering#person`,
      name: "Ron van Beukering",
    },
  },
  provider: { "@id": `${site.url}/#organization` },
  educationalLevel: "Beginner to Intermediate",
  teaches: ["Hapkido Combinatie", "Basishoudingen", "Valbreken", "Stoten", "Trappen", "Locks", "Zelfverdediging"],
  numberOfCredits: 5,
};

