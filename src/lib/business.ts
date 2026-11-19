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
  /** Replaced the card's "Deals in Car Rentals, Buy & Sale and Repairs" after the 2026-11-19 repositioning. */
  servicesLine: "Car servicing, repairs, tyres and roadworthy certificates",
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

/**
 * Service catalogue. Repositioned 2026-11-19 at the owner's request: car
 * rentals and vehicle sale/purchase were dropped so the site presents a
 * repair and mechanical workshop only. The client named roadworthy
 * certificates, tyres, suspension, engine and brake repairs, mechanical
 * repairs of all types, and European and Japanese cars. Servicing and the
 * mechanical-repairs tags come from the RepairBook listing (business-info.md
 * §5). Anything a page does not state as a fact is phrased as "ask us"
 * until the owner confirms it: see docs/strategy/01-positioning-and-competitors.md.
 */
export type ServiceSlug =
  | "roadworthy-certificate"
  | "car-servicing"
  | "brake-repairs"
  | "european-car-repairs"
  | "mechanical-repairs"
  | "engine-repairs"
  | "suspension-steering"
  | "car-tyres"
  | "japanese-car-repairs";

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
  /**
   * Every photo on the site is licensed stock, not the Memon Motors
   * workshop, so alt text describes what is in the picture and never claims
   * it is this business. Services without a fitting photo render as text
   * cards until the owner supplies real workshop photos.
   */
  image?: { src: string; alt: string };
}

const TV_RWC = {
  label: "Transport Victoria: roadworthy certificate",
  href: "https://transport.vic.gov.au/road-and-active-transport/registration-and-licensing/registration/roadworthy-certification/roadworthy-certificate",
};
const TV_TESTERS = {
  label: "Transport Victoria: roadworthy tester locations",
  href: "https://transport.vic.gov.au/road-and-active-transport/registration-and-licensing/registration/roadworthy-certification/roadworthy-tester-locations",
};
const TV_TYRES = {
  label: "Transport Victoria: tyre maintenance and repair",
  href: "https://transport.vic.gov.au/road-and-active-transport/registration-and-licensing/registration/standard-and-non-standard-vehicle-information/vehicle-standards-information/tyre-maintenance-and-repair",
};
const ACCC_NEW_CAR = {
  label: "ACCC: just bought a new car?",
  href: "https://www.accc.gov.au/about-us/news/media-updates/just-bought-a-new-car",
};

const QUOTE_FIRST_FAQ: Faq = {
  q: "Will you start work before I approve a quote?",
  a: "No. We explain what's wrong and what it will cost, and only start once you've said yes.",
};

export const services: Service[] = [
  {
    slug: "roadworthy-certificate",
    name: "Roadworthy Certificates (RWC)",
    shortName: "Roadworthy Certificates",
    summary:
      "Roadworthy inspections for selling or re-registering a car in Victoria, with the result explained in plain language.",
    description: [
      "Selling or re-registering a car in Victoria usually means getting a roadworthy certificate first. We inspect the vehicle against Victoria's roadworthiness requirements and tell you exactly what it needs, not what it doesn't.",
      "If repairs are required, we quote them upfront before any work starts. Brakes, suspension, steering and tyres are all handled in the same workshop, so a failed item doesn't mean a trip somewhere else.",
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
          "A roadworthy inspection checks the items that make a car safe to drive on public roads, including wheels and tyres, steering, suspension, brakes, seats and seatbelts, lights, the windscreen and the vehicle structure. It is not an inspection of mechanical reliability or cosmetic condition, so a car can pass and still have engine, transmission or bodywork problems.",
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
      src: "/images/inspection-checklist.jpg",
      alt: "A mechanic filling in an inspection checklist in front of a car's open engine bay",
    },
  },
  {
    slug: "car-servicing",
    name: "Car Servicing",
    shortName: "Car Servicing",
    summary:
      "Scheduled servicing to your manufacturer's schedule, with a clear rundown of anything that needs attention now or soon.",
    description: [
      "A service is more than an oil change. We follow the schedule for your make and model, check the parts that wear (brakes, tyres, suspension, belts, fluids and battery) and tell you what's due now, what can wait, and what it will cost.",
      "If we find something that needs fixing, you get a quote first. Nothing extra is done without your OK.",
    ],
    seoTitle: "Car Service Truganina",
    seoDescription:
      "Car servicing in Truganina to your manufacturer's schedule, for European, Japanese and everyday cars. Quote before any extra work. Call 0469 042 720.",
    sections: [
      {
        heading: "What a service usually includes",
        body: [
          "The exact items depend on the vehicle and the service interval. A scheduled service typically includes an engine oil and filter change, a check of fluid levels and condition, and an inspection of the brakes, tyres, steering, suspension, lights, battery and drive belts.",
          "Some intervals add spark plugs, air and cabin filters, coolant or brake fluid. Your owner's manual or logbook lists what each interval needs, and we'll go through it with you when you book.",
        ],
      },
      {
        heading: "Servicing a car that's still under warranty",
        body: [
          "In Australia you generally don't have to return to the dealer for servicing to keep your consumer guarantee rights. Manufacturers usually require servicing to be done by qualified staff, to their specifications, using appropriate parts, so keep your service records and receipts.",
          "Extended warranties sold by dealers can have their own conditions, so check yours before booking anywhere.",
        ],
        source: ACCC_NEW_CAR,
      },
    ],
    faqs: [
      {
        q: "How often should I service my car?",
        a: "Follow the schedule in your owner's manual or logbook. Many manufacturers specify intervals of around 6 to 12 months or 10,000 to 15,000 km, whichever comes first, but it varies by vehicle, so check yours.",
      },
      {
        q: "Will servicing my car outside the dealer void the warranty?",
        a: "Generally, no. The ACCC says you don't have to use the dealer to keep your consumer guarantee rights. Manufacturer warranties usually require the work to meet their specifications with appropriate parts, and dealer extended warranties can differ, so check your terms.",
      },
      {
        q: "How long does a car service take?",
        a: "It depends on the service interval and what we find. Call or WhatsApp us with your make, model and kilometres and we'll give you an estimate when you book.",
      },
      QUOTE_FIRST_FAQ,
    ],
    tags: [
      "Oil & filter change",
      "Scheduled maintenance",
      "Fluid checks",
      "Brake & tyre check",
      "Battery check",
    ],
    image: {
      src: "/images/mechanic-paperwork.jpg",
      alt: "A mechanic in overalls reading service paperwork beside a car in a workshop",
    },
  },
  {
    slug: "brake-repairs",
    name: "Brake Repairs",
    shortName: "Brake Repairs",
    summary:
      "Squealing, grinding or a soft pedal? We inspect pads, discs, callipers and fluid, then quote the fix before we start.",
    description: [
      "Brakes wear every time you use them, so most brake work is routine: pads, discs (rotors) and fluid. We inspect the whole system, measure what's left, and only recommend the parts that actually need replacing.",
      "You see the quote before any work starts.",
    ],
    seoTitle: "Brake Repairs Truganina",
    seoDescription:
      "Brake pads, discs, callipers and brake fluid in Truganina. We inspect, explain what's worn and quote before work starts. Call Memon Motors on 0469 042 720.",
    sections: [
      {
        heading: "Signs your brakes need attention",
        body: [
          "Squealing or grinding when you brake, vibration through the pedal or steering wheel, a soft or spongy pedal, the car pulling to one side, longer stopping distances, or a brake warning light on the dash.",
          "If the pedal sinks towards the floor or the car isn't stopping properly, don't keep driving it. Call us and we'll talk you through the safest next step.",
        ],
      },
      {
        heading: "Pads, discs and brake fluid",
        body: [
          "Pads are designed to wear and are the most common brake replacement. Discs wear more slowly and are measured against the manufacturer's minimum thickness to decide whether they can stay or need replacing.",
          "Brake fluid absorbs moisture over time, which lowers its boiling point and the braking performance you get under heavy use. Most manufacturers specify a replacement interval in the service schedule.",
        ],
      },
      {
        heading: "Electronic parking brakes",
        body: [
          "Many newer cars have an electronic parking brake. Replacing the rear pads on these usually needs a diagnostic tool to wind the callipers back, so tell us the make, model and year when you book.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I know if my brakes need replacing?",
        a: "Common warning signs are squealing or grinding noises, a longer stopping distance, a soft or spongy pedal, vibration when braking, or the car pulling to one side. A brake warning light also needs checking promptly. A mechanic can inspect the pads, discs and fluid and explain what's needed before any work starts.",
      },
      {
        q: "Is it safe to drive with squealing brakes?",
        a: "Many pads have a wear indicator that squeals when the pad gets thin. That's a warning to book in soon rather than an emergency. Grinding usually means metal is touching metal, which damages the discs and reduces braking, so get it checked before driving further.",
      },
      {
        q: "Do I need new discs every time I replace the pads?",
        a: "Not always. Discs are measured against the manufacturer's minimum thickness and checked for scoring and warping. If they're within limits, they can stay.",
      },
      {
        q: "How long do brake pads last?",
        a: "It depends on the car, the pads and how you drive. Stop-start suburban driving wears them faster than highway driving. The reliable answer is to have them measured at each service.",
      },
    ],
    image: {
      src: "/images/hoist-brake-disc.jpg",
      alt: "A car raised on a workshop hoist with its front wheel removed, showing the brake disc and calliper",
    },
  },
  {
    slug: "european-car-repairs",
    name: "European Car Servicing & Repairs",
    shortName: "European Cars",
    summary:
      "Servicing and repairs for European cars, following the manufacturer's requirements for oil, parts and service procedures.",
    description: [
      "European cars often have stricter requirements than owners expect: specific approved engine oils, service intervals the car calculates itself, and electronic systems that need a diagnostic tool for routine jobs.",
      "We work to your car's specifications, quote before we start, and tell you upfront if a job needs equipment only a dealer has.",
    ],
    seoTitle: "European Car Service & Repairs Truganina",
    seoDescription:
      "European car servicing and repairs in Truganina, Melbourne's west. Manufacturer-specified oils and parts, quote before work. Call Memon Motors on 0469 042 720.",
    sections: [
      {
        heading: "What's different about servicing a European car",
        body: [
          "Most European manufacturers approve engine oils against their own standards, such as Volkswagen 504 00 / 507 00, Mercedes-Benz 229.51 or BMW Longlife-04. The approval code is listed in your owner's manual, and using an oil that meets it matters for engine protection and for warranty.",
          "Many European cars also track their own service intervals and display them on the dash. After a service, the indicator has to be reset with the right tool so the next service is calculated correctly.",
        ],
      },
      {
        heading: "Electronics on routine jobs",
        body: [
          "Jobs that are simple on an older car can need a diagnostic tool on a modern European one. Many cars with electronic parking brakes need the callipers put into service mode before rear pads can be changed, and some models need a new battery registered to the car so the charging system adjusts to it.",
          "Tell us your make, model and year when you book and we'll confirm what's involved before you bring it in.",
        ],
      },
      {
        heading: "Servicing outside the dealer network",
        body: [
          "If your car is still under the manufacturer's warranty, you generally don't have to use the dealer for servicing to keep your consumer guarantee rights, as long as the work meets the manufacturer's requirements. Keep your records, and check the conditions of any extended warranty.",
        ],
        source: ACCC_NEW_CAR,
      },
    ],
    faqs: [
      {
        q: "Do you service European cars?",
        a: "Yes. Send us the make, model, year and kilometres by phone or WhatsApp and we'll confirm what the service involves and quote it before you book.",
      },
      {
        q: "Why does my European car need a specific engine oil?",
        a: "Many European manufacturers only approve oils that pass their own tests, listed as an approval code in the owner's manual. Using an oil that meets that code protects the engine and keeps the service in line with the manufacturer's requirements.",
      },
      {
        q: "Will servicing outside the dealer affect my warranty?",
        a: "Generally, no, provided the work meets the manufacturer's specifications and uses appropriate parts. The ACCC has said you don't have to use the dealer to keep your consumer guarantee rights. Dealer extended warranties can have their own conditions, so check them.",
      },
      QUOTE_FIRST_FAQ,
    ],
    image: {
      src: "/images/workshop-hoists.jpg",
      alt: "Cars raised on hoists in a bright, modern service workshop",
    },
  },
  {
    slug: "mechanical-repairs",
    name: "Mechanical Repairs & Diagnostics",
    shortName: "Mechanical Repairs",
    summary:
      "Diagnostics, warning lights, batteries, starting problems, air conditioning and repairs of all types.",
    description: [
      "Not every problem fits a neat category. A noise you can't place, a warning light on the dash, a car that won't start on a cold morning: we diagnose it properly, explain what we found, and quote the repair before we begin.",
      "We work on everyday cars as well as European and Japanese models.",
    ],
    seoTitle: "Car Mechanic Truganina: Repairs & Diagnostics",
    seoDescription:
      "Car mechanic in Truganina for diagnostics, warning lights, batteries, air conditioning and repairs of all types. Quote before work. Call 0469 042 720.",
    faqs: [
      {
        q: "What should I do when a warning light comes on?",
        a: "Check its colour. A red light usually means stop when it's safe and get the car checked before driving on. An amber or orange light usually means get it checked soon. Your owner's manual explains each symbol.",
      },
      {
        q: "My car won't start. What's the likely cause?",
        a: "A flat or failing battery is the most common cause, especially if you hear clicking or the engine turns slowly. It can also be the starter motor, the alternator not charging, or a fuel or ignition fault. Testing the battery and charging system first usually narrows it down.",
      },
      {
        q: "Can you find a noise I can't pin down?",
        a: "Usually, yes. Tell us when it happens (over bumps, when braking, when turning, at certain speeds) and we'll road-test and inspect the car to find the source before quoting.",
      },
      QUOTE_FIRST_FAQ,
    ],
    tags: [
      "General diagnostics",
      "Warning lights",
      "Battery & charging",
      "Starting problems",
      "Air conditioning & heating",
      "Oil change & lube",
      "Scheduled maintenance",
    ],
    image: {
      src: "/images/workshop-bay.jpg",
      alt: "Vehicles parked in a workshop bay during repairs",
    },
  },
  {
    slug: "engine-repairs",
    name: "Engine Repairs & Diagnostics",
    shortName: "Engine Repairs",
    summary:
      "Check engine light, overheating, oil leaks, rough running or loss of power: we find the cause and quote the repair.",
    description: [
      "Engine problems rarely fix themselves, and guessing gets expensive. We start with diagnostics: reading the fault codes, then testing to confirm the cause before recommending any parts.",
      "You get a clear explanation and a quote. If a repair isn't worth doing on your car, we'll tell you that too.",
    ],
    seoTitle: "Engine Repairs & Diagnostics Truganina",
    seoDescription:
      "Engine diagnostics and repairs in Truganina: check engine light, overheating, oil leaks, misfires and loss of power. Quote before work. Call 0469 042 720.",
    sections: [
      {
        heading: "Engine problems we look at",
        body: [
          "A check engine light, overheating or losing coolant, oil leaks or burning oil, a misfire or rough idle, loss of power or limp mode, hard starting, knocking or ticking noises, and smoke from the exhaust.",
        ],
      },
      {
        heading: "A fault code is the start, not the answer",
        body: [
          "A fault code tells you which system reported a problem, not always which part failed. A misfire code, for example, can come from a spark plug, an ignition coil, an injector or a mechanical fault. Testing before replacing parts means you don't pay for parts you didn't need.",
        ],
      },
      {
        heading: "Timing belts",
        body: [
          "Many engines use a timing belt that must be replaced at an interval set in the manufacturer's schedule; others use a timing chain. On some engines a broken belt causes serious internal damage, so it's worth knowing which one your car has. Your logbook will say, or ask us.",
        ],
      },
      {
        heading: "If your engine is overheating",
        body: [
          "Pull over when it's safe and switch the engine off. Don't open the radiator or coolant cap while it's hot. Driving on with an overheating engine can turn a small repair into a very large one.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does the check engine light mean?",
        a: "It means the car's computer has detected a fault. A steady light should be checked soon. A flashing light usually points to a serious problem such as an engine misfire, so slow down, stop somewhere safe and get the car checked rather than driving it far. Diagnostics reads the fault codes so the real cause is found before parts are replaced.",
      },
      {
        q: "Can I keep driving with the check engine light on?",
        a: "If the light is steady and the car drives normally, you can usually drive it to a workshop, but get it checked soon. If it's flashing, or the car is losing power, overheating or making new noises, stop and call us.",
      },
      {
        q: "How much does it cost to diagnose an engine problem?",
        a: "It depends on the fault. Ask us when you book and we'll tell you what the diagnosis involves and what it costs before we start.",
      },
      QUOTE_FIRST_FAQ,
    ],
  },
  {
    slug: "suspension-steering",
    name: "Suspension & Steering Repairs",
    shortName: "Suspension & Steering",
    summary:
      "Clunks over bumps, a bouncy ride or uneven tyre wear: we find the worn part, from shocks and bushes to ball joints and tie rod ends.",
    description: [
      "Suspension and steering parts wear gradually, so problems creep up on you. We inspect the shock absorbers, springs, control arm bushes, ball joints, tie rod ends and steering components, show you what's worn, and quote the repair.",
      "Worn parts don't just affect comfort. They change how the car brakes and corners, and they wear tyres out faster.",
    ],
    seoTitle: "Suspension & Steering Repairs Truganina",
    seoDescription:
      "Suspension and steering repairs in Truganina: shocks, bushes, ball joints and tie rod ends, inspected, explained and quoted first. Call 0469 042 720.",
    sections: [
      {
        heading: "Signs of worn suspension or steering",
        body: [
          "Clunking or knocking over bumps, a car that keeps bouncing after a dip, the nose diving under braking, drifting or wandering on a straight road, a steering wheel that sits off-centre or vibrates, uneven or feathered tyre wear, or one corner sitting lower than the others.",
        ],
      },
      {
        heading: "Why it matters for your tyres and your roadworthy",
        body: [
          "Worn steering and suspension parts can make tyres wear unevenly, and both systems are checked in a Victorian roadworthy inspection. Fixing a worn part early usually costs less than replacing tyres that wore out because of it.",
          "After some steering and suspension parts are replaced, a wheel alignment is recommended. Ask us when you book how that's handled for your car.",
        ],
        source: TV_RWC,
      },
    ],
    faqs: [
      {
        q: "How do I know if my shock absorbers are worn?",
        a: "Common signs are the car bouncing more than once after a bump, the nose diving when you brake, the body leaning more in corners, fluid leaking from the shock, or patchy tyre wear. We can inspect them and tell you if they need replacing.",
      },
      {
        q: "Is a clunking noise from the front suspension serious?",
        a: "It can be minor, like a worn sway bar link, or more serious, like a worn ball joint. Because steering and suspension affect control of the car, get it checked soon rather than waiting for it to get louder.",
      },
      {
        q: "Do I need a wheel alignment after suspension work?",
        a: "Often, yes, when the parts replaced affect the wheel angles, such as tie rod ends or control arms. Ask us when you book and we'll tell you whether your repair needs one.",
      },
      QUOTE_FIRST_FAQ,
    ],
  },
  {
    slug: "car-tyres",
    name: "Car Tyres",
    shortName: "Tyres",
    summary:
      "New tyres supplied and fitted. Send us your tyre size or a photo of the sidewall and we'll quote.",
    description: [
      "Tyres are the only part of the car touching the road, so worn or damaged ones affect braking, cornering and wet-weather grip. We check tread depth and condition, quote replacement tyres to suit your car, and fit them in the workshop.",
      "Not sure of your size? It's printed on the tyre's sidewall, for example 205/55 R16. Send us a photo on WhatsApp and we'll quote.",
    ],
    seoTitle: "Car Tyres Truganina, Supplied & Fitted",
    seoDescription:
      "New car tyres supplied and fitted in Truganina. Send your tyre size or a sidewall photo on WhatsApp for a quote. Memon Motors, 37A Dunmore Dr. 0469 042 720.",
    sections: [
      {
        heading: "When tyres need replacing",
        body: [
          "In Victoria, tyres must have at least 1.5 mm of tread in the principal grooves (the main grooves running around the tyre), except at the tread wear indicators. Many drivers replace them earlier for better wet-weather grip.",
          "Tyres also need replacing if they have cuts, bulges, exposed cords or sidewall damage, whatever the tread depth.",
        ],
        source: TV_TYRES,
      },
      {
        heading: "How to read your tyre size",
        body: [
          "Take 205/55 R16 91V. 205 is the width in millimetres, 55 is the sidewall height as a percentage of the width, R means radial construction, 16 is the wheel diameter in inches, 91 is the load index and V is the speed rating.",
          "Replacement tyres should meet the load and speed ratings specified for your vehicle, which are shown on the tyre placard, usually on the driver's door pillar.",
        ],
      },
      {
        heading: "Uneven wear is a clue",
        body: [
          "If a tyre is wearing on one edge or in patches, the cause is often wheel alignment or a worn suspension or steering part. Fitting new tyres without fixing the cause means they wear the same way, so we check for it while the car is here.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the legal minimum tread depth in Victoria?",
        a: "1.5 mm in the principal grooves, except at the tread wear indicators. The indicators are small raised bars inside the grooves; when the tread is level with them, the tyre is at the limit.",
      },
      {
        q: "Do I need to replace all four tyres at once?",
        a: "Not always. Tyres are often replaced in pairs on the same axle so grip is even side to side. Some all-wheel-drive vehicles are sensitive to differences in tyre wear between axles, so check your owner's manual or ask us.",
      },
      {
        q: "How do I tell how old my tyres are?",
        a: "Look for the DOT code on the sidewall. The last four digits are the week and year of manufacture, so 2321 means the 23rd week of 2021. Rubber ages even when the tread looks fine, so older tyres are worth having checked.",
      },
      {
        q: "How do I get a tyre quote?",
        a: "Call 0469 042 720 or WhatsApp us your tyre size, or a clear photo of the sidewall, and we'll come back with options and a price.",
      },
    ],
  },
  {
    slug: "japanese-car-repairs",
    name: "Japanese Car Servicing & Repairs",
    shortName: "Japanese Cars",
    summary:
      "Servicing and repairs for Japanese cars, including high-kilometre cars that need the right maintenance to keep going.",
    description: [
      "Japanese cars are a big part of what Australians drive, and many keep running well past 200,000 km when they're maintained. Keeping them reliable is mostly about doing the right maintenance on time: oil, coolant, transmission fluid, the timing belt where one is fitted, and catching worn brakes and suspension early.",
      "We service to the manufacturer's schedule and quote any repairs before starting.",
    ],
    seoTitle: "Japanese Car Service & Repairs Truganina",
    seoDescription:
      "Servicing and repairs for Japanese cars in Truganina: scheduled servicing, brakes, suspension, engine and transmission fluid. Quote first. Call 0469 042 720.",
    sections: [
      {
        heading: "Maintenance that matters on high-kilometre cars",
        body: [
          "Check whether your engine uses a timing belt or a timing chain. Belts have a replacement interval in the manufacturer's schedule, and it's one of the most important services on a high-kilometre car.",
          "Many modern Japanese cars use a CVT (continuously variable transmission). Manufacturers' schedules differ on when its fluid should be serviced, and the correct fluid type matters, so follow your logbook rather than a generic interval.",
        ],
      },
      {
        heading: "Hybrids",
        body: [
          "Many Japanese hybrids have high-voltage systems. Tell us if your car is a hybrid when you book so we can confirm what we can do for it. From 1 September 2026, roadworthy inspections on hybrid and electric vehicles may only be done by EV testers.",
        ],
        source: TV_TESTERS,
      },
    ],
    faqs: [
      {
        q: "Do you service Japanese cars?",
        a: "Yes. Send us the make, model, year and kilometres by phone or WhatsApp and we'll confirm what the service involves and quote it before you book.",
      },
      {
        q: "My car has done over 200,000 km. Is it worth servicing?",
        a: "Often, yes. A well-maintained engine can keep running well past that. We'll inspect the car and tell you honestly if a major repair isn't worth doing.",
      },
      {
        q: "Does my car have a timing belt or a timing chain?",
        a: "It depends on the engine. Your logbook or owner's manual will say, or tell us the make, model and year and we'll check.",
      },
      QUOTE_FIRST_FAQ,
    ],
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
 * typo cleanup. Reviews about car rentals and vehicle sales were removed
 * on 2026-11-19 because the business no longer offers those services.
 */
export const reviews: Review[] = [
  {
    author: "Ahsan Arshad",
    source: "Google",
    relativeDate: "a year ago",
    text: "Memon Mechanic is a fantastic place for car repairs and maintenance. Sadiq and his team are highly skilled, professional, and genuinely care about their customers. They take the time to explain the issues and offer fair pricing.",
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
    author: "Heshaam Rehman",
    source: "Google",
    relativeDate: "5 months ago",
    text: "Great service! Highly recommend.",
  },
];
