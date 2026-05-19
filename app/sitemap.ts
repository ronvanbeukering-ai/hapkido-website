import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = site.url;

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/hapkido-combinatie`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/lessen/berkel-enschot`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/lessen/waalwijk`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/trainers`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/trainers/ron-van-beukering`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/trainers/marco-van-gulik`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contributie`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/academie`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/proefles`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/over-ons`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/faq`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
