import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static date, not new Date(): a lastmod that changes on every single
  // crawl (regardless of whether content actually changed) is a false
  // freshness signal — Google explicitly recommends omitting lastmod
  // over reporting an inaccurate one. Bump this manually when pages change.
  const lastModified = new Date("2026-07-14");
  const base = site.url;

  return [
    // Homepage hoogste prioriteit
    { url: base, lastModified, changeFrequency: "weekly", priority: 1.0 },
    // Primaire pagina's
    { url: `${base}/hapkido-combinatie`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/proefles`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/lessen/berkel-enschot`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/lessen/waalwijk`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    // Secundaire pagina's
    { url: `${base}/trainers`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/vrouwen-zelfverdediging`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contributie`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cursussen`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    // Detailpagina's
    { url: `${base}/trainers/ron-van-beukering`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/trainers/marco-van-gulik`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/academie`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/over-ons`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    // /aanmelden is no-index, but include for completeness
  ];
}
