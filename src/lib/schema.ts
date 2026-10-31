import { business, hours, services, suburbs, type Service } from "@/lib/business";

const SITE_URL = "https://www.memonmotors.com";
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const openingHoursSpecification = hours
  .filter((h) => h.open && h.close)
  .map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${h.day}`,
    opens: h.open,
    closes: h.close,
  }));

const areaServed = suburbs.map((s) => ({ "@type": "City", name: s.name }));

/**
 * Full AutoRepair node (a LocalBusiness subtype). Emitted once, by the root
 * layout, so every page carries exactly one `aggregateRating` — a second
 * copy on the same page makes Google flag "Review has multiple aggregate
 * ratings". Everything else refers to this node by `@id` instead of
 * repeating it.
 *
 * Only facts that are verified or visible on the page go in here: no
 * `priceRange` (an unverified guess), and ratings mirror what the Google
 * Business Profile shows. Note Google does not show review stars for a
 * business's own LocalBusiness markup, so this is for entity understanding,
 * not a rich-result promise.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": BUSINESS_ID,
    name: business.name,
    alternateName: business.legalName,
    description:
      "Roadworthy certificates, mechanical repairs, car rentals and vehicle sales from one workshop in Truganina, Victoria.",
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    telephone: business.phoneE164,
    email: business.email,
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
    hasMap: business.mapsListingUrl,
    sameAs: [business.facebookUrl, business.mapsListingUrl],
    openingHoursSpecification,
    paymentAccepted: business.paymentAccepted,
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: 5,
    },
  };
}

/** Site-level node so search engines can resolve the site name and tie it to the business. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: business.name,
    inLanguage: "en-AU",
    publisher: { "@id": BUSINESS_ID },
  };
}

/** A service page's Service node, linked to the business by `@id` rather than a new unlinked copy. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.name,
    description: service.summary,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": BUSINESS_ID },
    areaServed,
  };
}

/**
 * Suburb-scoped `areaServed`, linked to the business by `@id` rather than
 * repeating the full node, so no suburb page ever has two ratings. See
 * CLAUDE.md "Functional Requirements" on why suburb-specific areaServed is
 * the highest-leverage SEO move for this project.
 */
export function suburbAreaSchema(areaName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": BUSINESS_ID,
    areaServed: { "@type": "City", name: areaName },
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
