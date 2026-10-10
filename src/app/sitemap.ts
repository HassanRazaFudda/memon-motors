import type { MetadataRoute } from "next";
import { services, suburbs } from "@/lib/business";
import { SITE } from "@/lib/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/areas",
    "/about",
    "/contact",
    "/reviews",
  ];

  const serviceRoutes = services.map((s) => `/services/${s.slug}`);
  const suburbRoutes = suburbs.map((s) => `/areas/${s.slug}`);

  const allRoutes = [...staticRoutes, ...serviceRoutes, ...suburbRoutes];

  return allRoutes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("roadworthy") ? 0.9 : 0.7,
  }));
}
