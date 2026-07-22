import type { MetadataRoute } from "next";
import { getActualites, getEquipes } from "@/lib/strapi";

function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (!raw) {
    return "https://www.basketballbrivadois.fr";
  }

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

const STATIC_PATHS = [
  "",
  "/club",
  "/equipes",
  "/calendrier",
  "/actualites",
  "/entrainements",
  "/bureau",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/actualites" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/equipes" || path === "/actualites" ? 0.9 : 0.7,
  }));

  const [equipes, actualites] = await Promise.all([
    getEquipes(),
    getActualites(),
  ]);

  const equipeEntries: MetadataRoute.Sitemap = equipes.map((equipe) => ({
    url: `${siteUrl}/equipes/${equipe.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const actualiteEntries: MetadataRoute.Sitemap = actualites.map((actu) => ({
    url: `${siteUrl}/actualites/${actu.slug}`,
    lastModified: actu.datePublication
      ? new Date(actu.datePublication)
      : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...equipeEntries, ...actualiteEntries];
}
