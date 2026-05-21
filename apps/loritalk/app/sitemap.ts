import type { MetadataRoute } from "next";

// Sitemap entries are regenerated at build time.
const SITE = "https://lori-talk.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/agency`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/influencer`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/supported-networks`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/cookie-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/legal-notice`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
