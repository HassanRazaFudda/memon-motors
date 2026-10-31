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
  /** Exact pin of the Google Business Profile ("Memon Motors Melbourne"), read from Google Maps 2026-10-31. */
  geo: {
    lat: -37.8181805,
    lng: 144.738346,
  },
  /**
   * Google Maps showed 4.9 from 105 reviews on 2026-10-31. `count` feeds
   * structured data (must be the exact figure); `countLabel` is the rounded
   * floor used in visible copy so the page doesn't go stale or overstate.
   */
  rating: {
    value: 4.9,
    count: 105,
    countLabel: "100+",
    source: "Google",
  },
  facebookUrl: "https://www.facebook.com/p/Memon-Motors-100052455801516",
  /** Google Maps listing, from the place's CID (0xb6706a10a92e2a0a) in its Maps URL. */
  mapsListingUrl: "https://maps.google.com/?cid=13146123932084873738",
  /** Payment methods listed on the Google Business Profile "About" tab. */
  paymentAccepted: "Credit card, debit card, mobile payments",
} as const;

export const telHref = `tel:${business.phoneE164}`;
export const whatsappHref = (message: string) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.name} ${business.address.street} ${business.address.suburb} ${business.address.state} ${business.address.postcode}`
)}`;
export const fullAddress = `${business.address.street}, ${business.address.suburb} ${business.address.state} ${business.address.postcode}`;

/**
 * Hours as shown on the owner-managed Google Business Profile (Mon–Fri
 * 9am–5:30pm, Sat 1–3pm, Sun closed), read from Google Maps 2026-10-31.
 * Third-party directories list Mon–Fri closing at 6pm; the GBP is the
 * owner's own live data, so it wins. Keep the GBP and this file in sync.
 */
export const hours = [
  { day: "Monday", open: "09:00", close: "17:30" },
  { day: "Tuesday", open: "09:00", close: "17:30" },
  { day: "Wednesday", open: "09:00", close: "17:30" },
  { day: "Thursday", open: "09:00", close: "17:30" },
  { day: "Friday", open: "09:00", close: "17:30" },
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

/** One-line, human-readable hours built from `hours`, so copy can't drift from the data. */
export function hoursSummary() {
  const weekdays = hours.slice(0, 5);
  const sat = hours[5];
  const weekdayRange = formatHourRange(weekdays[0]);
  const sameWeekdays = weekdays.every((h) => formatHourRange(h) === weekdayRange);
  const parts = [
    sameWeekdays ? `Mon–Fri ${weekdayRange}` : weekdays.map((h) => `${h.day.slice(0, 3)} ${formatHourRange(h)}`).join(", "),
    `Sat ${formatHourRange(sat)}`,
    "closed Sunday",
  ];
  return parts.join(", ");
}

export interface Faq {
  q: string;
  a: string;
}

export interface ServiceSection {
  heading: string;
  body: string[];
  source?: { label: string; href: string };
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
  /** Search-result title (the site template appends "| Memon Motors") and description. */
  seoTitle: string;
  seoDescription: string;
  /** Extra answer-first content blocks, each optionally attributed to an official source. */
  sections?: ServiceSection[];
  faqs?: Faq[];
  tags?: string[];
  priority?: boolean;
  image: { src: string; alt: string };
}

const TV_RWC = {
  label: "Transport Victoria: roadworthy certificate",
  href: "https://transport.vic.gov.au/road-and-active-transport/registration-and-licensing/registration/roadworthy-certification/roadworthy-certificate",
};
const TV_TESTERS = {
  label: "Transport Victoria: roadworthy tester locations",
  href: "https://transport.vic.gov.au/road-and-active-transport/registration-and-licensing/registration/roadworthy-certification/roadworthy-tester-locations",
};

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
    seoTitle: "Roadworthy Certificate Truganina (RWC)",
    seoDescription:
      "Roadworthy certificate (RWC) in Truganina VIC. Memon Motors inspects your vehicle, explains the result and quotes any repairs upfront. Call 0469 042 720.",
    sections: [
      {
        heading: "When you need a roadworthy certificate",
        body: [
          "In Victoria, a roadworthy certificate is generally required when a vehicle is sold or re-registered, with some exemptions. A passing certificate is valid for 30 days from the day it is issued, and can be used more than once within that window for registration or transfer.",
        ],
        source: TV_RWC,
      },
      {
        heading: "What a roadworthy certificate does and doesn't cover",
        body: [
          "A roadworthy certificate shows that a vehicle is safe to be driven on public roads. It is not an inspection of mechanical reliability or cosmetic condition, so a car can pass and still have engine, transmission or bodywork problems.",
        ],
        source: TV_RWC,
      },
      {
        heading: "If your vehicle doesn't pass",
        body: [
          "The tester gives you a written list of the defects. Victorian guidance generally allows 14 days to repair them and have the vehicle retested without paying the full inspection fee again. Ask us how retests are charged when you book.",
          "If repairs are needed we quote them upfront, and we only start once you've said yes.",
        ],
        source: TV_RWC,
      },
      {
        heading: "Electric and hybrid vehicles",
        body: [
          "From 1 September 2026, electric and hybrid vehicles may only be inspected and tested by EV testers. If you drive an electric or hybrid vehicle, check with us before booking.",
        ],
        source: TV_TESTERS,
      },
    ],
    faqs: [
      {
        q: "How long is a roadworthy certificate valid in Victoria?",
        a: "A roadworthy certificate is current for 30 days from the date it is issued. Within that window it can be used for more than one transaction, such as registration and transfer.",
      },
      {
        q: "How much does a roadworthy certificate cost?",
        a: "There is no single fixed price. The cost depends on the age, type and condition of the vehicle, so get a quote before the inspection starts. Call or WhatsApp Memon Motors with your vehicle details and we'll tell you before we begin.",
      },
      {
        q: "Do I need a roadworthy certificate to sell my car in Victoria?",
        a: "Generally, yes. A roadworthy certificate is usually required when a vehicle is sold or re-registered, although some vehicles are exempt. Check Transport Victoria's rules for your situation.",
      },
      {
        q: "What happens if my car fails its roadworthy inspection?",
        a: "You receive a written report listing the defects. Victorian guidance generally gives you 14 days to have them repaired and the vehicle retested without paying the full fee again. We quote any repair work upfront and only start once you approve it.",
      },
      {
        q: "Does a roadworthy certificate mean the car is mechanically reliable?",
        a: "No. It shows the vehicle is safe to be driven on public roads at the time of inspection. It is not a check of mechanical reliability, so it doesn't replace a proper inspection before you buy a used car.",
      },
      {
        q: "Can you test an electric or hybrid vehicle?",
        a: "From 1 September 2026, electric and hybrid vehicles may only be inspected and tested by EV testers. Contact us with your vehicle's make and model before booking and we'll tell you whether we can help.",
      },
    ],
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
    seoTitle: "Car Mechanic & Servicing Truganina",
    seoDescription:
      "Diagnostics, brakes, air conditioning, batteries and servicing at Memon Motors, Truganina. We explain the problem and quote first. Call 0469 042 720.",
    faqs: [
      {
        q: "How do I know if my brakes need replacing?",
        a: "Common warning signs are squealing or grinding noises, a longer stopping distance, a soft or spongy pedal, vibration when braking, or the car pulling to one side. A brake warning light also needs checking promptly. A mechanic can inspect the pads, discs and fluid and explain what's needed before any work starts.",
      },
      {
        q: "What does the check engine light mean?",
        a: "It means the car's computer has detected a fault. A steady light should be checked soon. A flashing light usually points to a serious problem such as an engine misfire, so slow down, stop somewhere safe and get the car checked rather than driving it far. Diagnostics reads the fault codes so the real cause is found before parts are replaced.",
      },
      {
        q: "How often should I service my car?",
        a: "Follow the schedule in your owner's manual or logbook. Many manufacturers specify intervals of around 6 to 12 months or 10,000 to 15,000 km, whichever comes first, but it varies by vehicle, so check yours.",
      },
      {
        q: "Will you start work before I approve a quote?",
        a: "No. We explain what's wrong and what it will cost, and only start once you've said yes.",
      },
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
    seoTitle: "Car Rental Truganina",
    seoDescription:
      "Short and long-term car rental from Memon Motors in Truganina VIC. Call or WhatsApp your dates to confirm availability and rates.",
    faqs: [
      {
        q: "Do you offer short and long-term car rentals?",
        a: "Yes. Memon Motors rents vehicles for a few days or a few weeks. Call or message us with your dates and we'll confirm availability.",
      },
      {
        q: "How do I check availability and rates?",
        a: "Call 0469 042 720 or message us on WhatsApp with your pick-up and return dates. We'll confirm what's available and the rate before you commit.",
      },
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
    seoTitle: "Used Car Sale & Purchase Truganina",
    seoDescription:
      "Buying or selling a used car in Truganina? Memon Motors is a mechanic-run workshop at 37A Dunmore Dr. Call 0469 042 720.",
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
  /**
   * Driving time (minutes) and distance (km) from the workshop to the
   * suburb centre, plus the main roads used. Estimated 2026-10-31 with
   * OpenStreetMap/OSRM routing (free-flow, no live traffic), so always
   * presented as approximate. Every suburb page is differentiated by this
   * real, checkable data rather than by swapping the suburb name.
   */
  driveMin: number;
  driveKm: number;
  via: string[];
}

export const suburbs: Suburb[] = [
  { slug: "truganina", name: "Truganina", driveMin: 3, driveKm: 2.6, via: ["Dunmore Dr", "Boundary Rd"] },
  { slug: "hoppers-crossing", name: "Hoppers Crossing", driveMin: 13, driveKm: 9.5, via: ["Forsyth Rd", "Old Geelong Rd"] },
  { slug: "tarneit", name: "Tarneit", driveMin: 8, driveKm: 6.3, via: ["Dohertys Rd", "Morris Rd", "Leakes Rd"] },
  { slug: "point-cook", name: "Point Cook", driveMin: 13, driveKm: 11.7, via: ["Dohertys Rd", "Palmers Rd", "Point Cook Rd"] },
  { slug: "laverton", name: "Laverton", driveMin: 10, driveKm: 9.5, via: ["Dohertys Rd", "Palmers Rd", "Princes Fwy"] },
  { slug: "werribee", name: "Werribee", driveMin: 18, driveKm: 14.8, via: ["Forsyth Rd", "Princes Fwy"] },
  { slug: "williams-landing", name: "Williams Landing", driveMin: 8, driveKm: 7.2, via: ["Dohertys Rd", "Palmers Rd"] },
  { slug: "wyndham-vale", name: "Wyndham Vale", driveMin: 22, driveKm: 19.7, via: ["Dohertys Rd", "Derrimut Rd", "Tarneit Rd", "Ballan Rd"] },
];

export const suburbBySlug = (slug: string) => suburbs.find((s) => s.slug === slug);

/** Short factual line used on suburb cards and pages. */
export const suburbNote = (s: Suburb) =>
  s.slug === "truganina"
    ? `Our workshop is at ${business.address.street} in Truganina, about ${s.driveMin} minutes by road from the suburb centre.`
    : `About ${s.driveMin} minutes by road from ${s.name}.`;

/** Google Maps directions from a suburb to the workshop. */
export const directionsFromHref = (s: Suburb) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${s.name} VIC`)}&destination=${encodeURIComponent(
    `${business.name} ${business.address.street} ${business.address.suburb} ${business.address.state} ${business.address.postcode}`
  )}`;

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
