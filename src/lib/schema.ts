import { business, hours } from "@/lib/business";

const SITE_URL = "https://memonmotors.com";

const openingHoursSpecification = hours
  .filter((h) => h.open && h.close)
  .map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${h.day}`,
    opens: h.open,
    closes: h.close,
  }));

/**
 * Base LocalBusiness/AutoRepair node, reused on every page. Pass
 * `areaServed` on suburb pages to scope it to that suburb — see
 * CLAUDE.md "Functional Requirements" on why this is the single
 * highest-leverage SEO move for this project.
 */
export function localBusinessSchema(areaServed?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    alternateName: business.legalName,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    telephone: business.phoneE164,
    email: business.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.suburb,
      addressRegion: business.address.state,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
    },
    ...(areaServed ? { areaServed: { "@type": "City", name: areaServed } } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export const SITE = {
  url: SITE_URL,
  name: business.name,
};
