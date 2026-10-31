import type { MetadataRoute } from "next";
import { services, suburbs } from "@/lib/business";
import { SITE } from "@/lib/schema";

/**
 * Bump this when page content genuinely changes. A fresh `new Date()` on
 * every build tells Google every page changed every time, and it learns to
 * ignore `lastmod` for the whole site. `priority` and `changefreq` are
 * omitted on purpose: Google ignores both.
 */
const CONTENT_LAST_UPDATED = new Date("2026-10-31");

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

  return [...staticRoutes, ...serviceRoutes, ...suburbRoutes].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: CONTENT_LAST_UPDATED,
  }));
}
