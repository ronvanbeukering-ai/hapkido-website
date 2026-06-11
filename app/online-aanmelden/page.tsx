import type { Metadata } from "next";
import { site } from "@/lib/site";
import { AanmeldenContent } from "./AanmeldenContent";

export const metadata: Metadata = {
  title: "Online Hapkido cursus aanmelden — thuis trainen",
  description:
    "Meld je aan voor de online Hapkido Combinatie cursus van Master Ron van Beukering. Geen dojang nodig. €7,50 per maand of €50 per jaar. Start wanneer jij wilt.",
  keywords: [
    "hapkido online cursus",
    "hapkido thuis trainen",
    "hapkido combinatie online",
    "online zelfverdediging",
    "hapkido aanmelden",
  ],
  alternates: { canonical: `${site.url}/online-aanmelden` },
  openGraph: {
    title: "Online Hapkido cursus — thuis trainen met Master Ron",
    description:
      "Start de online Hapkido Combinatie cursus. Geen dojang, geen vaste tijden. €7,50/maand of €50/jaar.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/images/training/training-1.jpg", width: 1200, height: 630, alt: "Hapkido Yong online cursus aanmelden" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Hapkido cursus — Hapkido Yong",
    description: "Thuis trainen met Master Ron van Beukering. €7,50/maand of €50/jaar.",
    images: ["/images/training/training-1.jpg"],
  },
};

export default function Page() {
  return <AanmeldenContent />;
}
