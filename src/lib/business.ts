/**
 * Single source of truth for every real-world fact used on the site.
 * Every value here must trace back to business-info.md or an explicit
 * confirmation from the business owner — see CLAUDE.md "Functional Requirements".
 */

export const business = {
  name: "Memon Motors",
  legalName: "ZHS GADAR PTY LTD",
  tradingAs: "Memon Motors",
  abn: "67 646 402 379",
  tagline: "The Name You Can Trust",
  servicesLine: "Car rentals, buy & sale, and repairs",
  proprietor: "Muhammad Sadiq",
  phoneDisplay: "0469 042 720",
  phoneE164: "+61469042720",
  whatsapp: "61469042720",
  email: "memonmotorsaustralia@gmail.com",
  address: {
    street: "37A Dunmore Dr",
    suburb: "Truganina",
    state: "VIC",
    postcode: "3029",
    country: "AU",
  },
  geo: {
    lat: -37.8167,
    lng: 144.7167,
  },
  rating: {
    value: 4.9,
    count: 106,
    source: "Google",
  },
} as const;

export const telHref = `tel:${business.phoneE164}`;
export const whatsappHref = (message: string) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.name} ${business.address.street} ${business.address.suburb} ${business.address.state} ${business.address.postcode}`
)}`;
export const fullAddress = `${business.address.street}, ${business.address.suburb} ${business.address.state} ${business.address.postcode}`;

/**
 * Hours as listed on Birdeye (treated as the more current source vs. the
 * 2+ year old Cylex listing — see business-info.md §4). Still flagged for
 * final owner confirmation per CLAUDE.md.
 */
export const hours = [
  { day: "Monday", open: "09:00", close: "18:00" },
  { day: "Tuesday", open: "09:00", close: "18:00" },
  { day: "Wednesday", open: "09:00", close: "18:00" },
  { day: "Thursday", open: "09:00", close: "18:00" },
  { day: "Friday", open: "09:00", close: "18:00" },
  { day: "Saturday", open: "13:00", close: "15:00" },
  { day: "Sunday", open: null, close: null },
] as const;

/** Formats a 24h "HH:MM" range as 12h with am/pm — the one place this logic lives. */
export function formatHourRange(h: { open: string | null; close: string | null }) {
  if (!h.open || !h.close) return "Closed";
  const fmt = (t: string) => {
    const [hh, mm] = t.split(":").map(Number);
    const period = hh >= 12 ? "pm" : "am";
    const hour12 = hh % 12 === 0 ? 12 : hh % 12;
    return mm === 0 ? `${hour12}${period}` : `${hour12}:${String(mm).padStart(2, "0")}${period}`;
  };
  return `${fmt(h.open)} – ${fmt(h.close)}`;
}

export type ServiceSlug =
  | "roadworthy-certificate"
  | "mechanical-repairs"
  | "car-rentals"
  | "vehicle-sales";

export interface Service {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  summary: string;
  description: string[];
  tags?: string[];
  priority?: boolean;
  image: { src: string; alt: string };
}

export const services: Service[] = [
  {
    slug: "roadworthy-certificate",
    name: "Roadworthy Certificates (RWC)",
    shortName: "Roadworthy Certificates",
    summary:
      "VicRoads-compliant inspections for buying, selling, or re-registering a car, with honest results explained in plain language.",
    description: [
      "Buying, selling, or re-registering a car in Victoria means getting a Roadworthy Certificate first. Our team inspects your vehicle against the full VicRoads checklist and tells you exactly what it needs, not what it doesn't.",
      "If repairs are required, we quote them upfront before any work starts, so there are no surprises on the final bill.",
    ],
    priority: true,
    image: {
      src: "/images/roadworthy-certificate.jpg",
      alt: "A mechanic inspecting a wheel and tyre during a safety check",
    },
  },
  {
    slug: "mechanical-repairs",
    name: "Mechanical Repairs & Servicing",
    shortName: "Mechanical Repairs",
    summary:
      "Diagnostics, scheduled servicing, and repairs: engines, brakes, suspension, and everything in between.",
    description: [
      "From a routine log-book service to a check-engine light you can't ignore, our mechanics diagnose the actual problem before recommending any work.",
      "We explain what's wrong, what it costs, and why, then only start once you've said yes.",
    ],
    image: {
      src: "/images/mechanical-repairs.jpg",
      alt: "A mechanic inspecting an engine bay with the bonnet open",
    },
    tags: [
      "General diagnostics",
      "Air conditioning & heating",
      "Battery replacement",
      "Brakes",
      "Check engine light",
      "Oil change & lube",
      "Engine & powertrain",
      "Scheduled maintenance",
      "Steering & suspension",
    ],
  },
  {
    slug: "car-rentals",
    name: "Car Rentals",
    shortName: "Car Rentals",
    summary:
      "Short and long-term rentals at fair daily rates, the same honest pricing our workshop is known for.",
    description: [
      "Need a car for a few days or a few weeks? We rent well-maintained vehicles at rates our customers consistently call fair, with no inflated daily fees and no hidden extras.",
      "Call or message us with your dates and we'll confirm availability.",
    ],
    image: {
      src: "/images/car-rentals.jpg",
      alt: "A hand holding a car key with the rental vehicle waiting in the background",
    },
  },
  {
    slug: "vehicle-sales",
    name: "Vehicle Sale & Purchase",
    shortName: "Vehicle Sales",
    summary: "Buying or selling a used vehicle: straightforward advice from mechanics who inspect it themselves.",
    description: [
      "Because we're mechanics first, every vehicle that passes through our hands gets inspected properly, so what you're buying (or selling) is exactly what's represented.",
    ],
    image: {
      src: "/images/vehicle-purchase-inspection.jpg",
      alt: "A mechanic inspecting a vehicle on the hoist before sale",
    },
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

export interface Suburb {
  slug: string;
  name: string;
  /** Short, genuinely specific line — not generic doorway-page filler. */
  note: string;
}

export const suburbs: Suburb[] = [
  {
    slug: "truganina",
    name: "Truganina",
    note: "Our home base at 37A Dunmore Dr, a couple of minutes from Williams Landing Station.",
  },
  {
    slug: "hoppers-crossing",
    name: "Hoppers Crossing",
    note: "A short drive down Old Geelong Rd, and one of our most regular service areas.",
  },
  {
    slug: "tarneit",
    name: "Tarneit",
    note: "Just across the Princes Freeway from our Dunmore Dr workshop.",
  },
  {
    slug: "point-cook",
    name: "Point Cook",
    note: "Regular RWC and rental customers come from right across Point Cook.",
  },
  {
    slug: "laverton",
    name: "Laverton",
    note: "A quick trip up Dohertys Rd from our workshop.",
  },
  {
    slug: "werribee",
    name: "Werribee",
    note: "We regularly handle roadworthy and mechanical work for Werribee customers.",
  },
  {
    slug: "williams-landing",
    name: "Williams Landing",
    note: "A four-minute walk from Williams Landing Station, the closest to our workshop.",
  },
  {
    slug: "wyndham-vale",
    name: "Wyndham Vale",
    note: "Along the Princes Freeway corridor from our Truganina workshop.",
  },
];

export const suburbBySlug = (slug: string) => suburbs.find((s) => s.slug === slug);

export interface Review {
  author: string;
  source: "Google";
  text: string;
  relativeDate: string;
}

/**
 * Real customer reviews, sourced from Google via Birdeye and Google Maps —
 * see business-info.md §6. Never add or alter content beyond trivial
 * typo cleanup.
 */
export const reviews: Review[] = [
  {
    author: "Ahsan Arshad",
    source: "Google",
    relativeDate: "a year ago",
    text: "Memon Mechanic is a fantastic place for car repairs and maintenance. Sadiq and his team are highly skilled, professional, and genuinely care about their customers. They take the time to explain the issues and offer fair pricing.",
  },
  {
    author: "Mike (Mahela)",
    source: "Google",
    relativeDate: "10 months ago",
    text: "Was a great experience. I rented a car for a week for my fam's vacay. Sadiq (Manager) gave us a great rate for 7 days and even gave an extra day for free as I couldn't return it on the right day.",
  },
  {
    author: "Fahad Hafeez",
    source: "Google",
    relativeDate: "6 months ago",
    text: "Recently, I had an RWC and some mechanical work done with Memon Motors and found great customer service, reasonable charges, and honest opinions. Highly recommended.",
  },
  {
    author: "Mudasir Chishti",
    source: "Google",
    relativeDate: "7 months ago",
    text: "Had a great experience with Memon Motors. Sadiq has great customer service, and they charge less compared to other shops in the area.",
  },
  {
    author: "Abdul Wadood Khan",
    source: "Google",
    relativeDate: "7 months ago",
    text: "If you need a perfect and affordable rental car, please prefer Memon Motors, based on my personal experience.",
  },
  {
    author: "Anas Arif",
    source: "Google",
    relativeDate: "8 months ago",
    text: "One of the best services provided in Melbourne, with car rentals, sale and purchase.",
  },
  {
    author: "Heshaam Rehman",
    source: "Google",
    relativeDate: "5 months ago",
    text: "Great service! Highly recommend.",
  },
];
