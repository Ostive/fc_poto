import type { MetadataRoute } from "next";
import { news } from "@/lib/data";

const BASE_URL = "https://fcpoto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/club`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/pratiques`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/calendrier`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/actualites`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/galerie`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/partenaires`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/nous-rejoindre`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/politique-confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookies`, changeFrequency: "yearly", priority: 0.2 }
  ];

  const articleRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${BASE_URL}/actualites/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly",
    priority: 0.6
  }));

  return [...staticRoutes, ...articleRoutes];
}
