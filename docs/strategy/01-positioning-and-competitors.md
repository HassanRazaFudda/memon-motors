# Positioning, brand and competitors

Prepared 19 Nov 2026 after the owner asked to drop car rentals and vehicle sale/purchase and position Memon Motors purely as a repair and mechanical workshop. Builds on the October SEO work in `docs/seo/`.

## 1. What changed and why

| Before | After |
|---|---|
| Four service lines: roadworthy, mechanical repairs, car rentals, vehicle sale and purchase | One business: car repair, servicing, tyres and roadworthy certificates |
| Owner's card line "Deals in Car Rentals, Buy & Sale and Repairs" | "Car servicing, repairs, tyres and roadworthy certificates" |
| 4 service pages | 9 service pages (rentals and sales pages 301 to `/services`) |

**Business reason.** A mixed rental/sales/repair message weakens all three. Google's local ranking starts with *relevance* to the search, and both visitors and AI answer engines need to understand in one sentence what the business is. "Truganina mechanic for servicing, repairs, tyres and roadworthies" is that sentence.

**Cost of the change.** Some of the strongest Google reviews are about rentals ("timely bond return" is even a Google review topic). Those reviews stay on Google, but the site no longer quotes them. Expect a few months where some review text doesn't match the new positioning. New reviews about repairs fix that over time (see the review routine in `docs/seo/03-local-gbp-citations.md`).

## 2. Positioning

**Positioning statement (internal, not site copy)**
For drivers in Melbourne's west who want their car fixed properly without being upsold, Memon Motors is the Truganina workshop that explains the problem, quotes before it starts, and handles servicing, brakes, suspension, engine work, tyres and roadworthies for European, Japanese and everyday cars in one place.

**Why it's credible.** Every part traces to evidence: the location (Google profile), the service list (client brief and RepairBook tags), and "explains and quotes first" plus "fair pricing" (the most repeated themes in 100+ Google reviews, and Google's own review-topic chip "fair pricing").

**What we deliberately don't claim** until the owner confirms it: licensed vehicle tester, "specialist" or "expert" for any make, dealer-level equipment, warranties on work, years in trade, "best", "cheapest", "certified", "qualified technicians", logbook stamping, wheel alignment, AC regas (needs an ARC refrigerant licence), mobile service.

### Messaging pillars

| Pillar | Message | Proof we can show today |
|---|---|---|
| Straight answers | We tell you what's wrong, what can wait, and what it costs | Review quotes: "take the time to explain the issues", "honest opinions" |
| Quote first | No work starts without your OK | Stated policy on every service page |
| One workshop for the whole car | Service, brakes, suspension, engine, tyres, roadworthy in one visit | Service pages, linked to each other |
| Local and easy | Truganina, minutes from the western suburbs, WhatsApp a photo for a quote | Measured drive times on suburb pages; WhatsApp on every page |

### Brand voice

- **Plain and specific.** "Grinding usually means metal on metal" beats "we deliver brake excellence".
- **Confident, not boastful.** The visual brand is premium (black, gold, red, cinematic photography). The words stay grounded.
- **Australian English.** Tyres, servicing, licence, colour, callipers, ute. "Roadworthy" and "RWC" both, since customers use both.
- **Second person, short sentences.** Answer first, explain second.
- **Never:** invented numbers, superlatives ("best in Melbourne"), urgency tricks, fake scarcity, or fear about safety beyond what is factually true.

### Terminology (use consistently on site, Google profile, social and ads)

| Use | Avoid |
|---|---|
| Car servicing / car service | Auto service, vehicle maintenance package |
| Roadworthy certificate (RWC), roadworthy | Safety certificate, pink slip (NSW term) |
| Mechanical repairs | Auto repairs (fine in ads, not as a page name) |
| European cars / Japanese cars | Euro specialist, JDM specialist (implies a claim) |
| Tyres, supplied and fitted | Tires |
| Quote | Estimate (unless it is genuinely a rough estimate) |
| Workshop | Garage, shop |

### Visual identity (unchanged, now applied to ads and social)

Black canvas (`#0A0A0A`), red action colour (`#B31E20`, hover `#E3272C`), gold signature stripe (`#C59129 → #F0C04B`) used sparingly, white type. Archivo (700–900, uppercase) for headlines, Inter for body. Sharp rectangles, no rounded cards, no drop shadows. The gold winged-M badge (`public/logo.png`) is the only round element.

**Biggest brand gap: there are no real photos.** Every image on the site is licensed stock (one shows a Renault dealership with Turkish plates). For a business selling trust, real photos of Sadiq, the team, the workshop and real customer cars are the single most valuable brand asset to collect. They also feed the Google profile, social and ads.

## 3. Service architecture

| Page | URL | Status of facts |
|---|---|---|
| Roadworthy certificates | `/services/roadworthy-certificate` | Live. Licence number still needed |
| Car servicing | `/services/car-servicing` | New. Logbook stamping to confirm |
| Brake repairs | `/services/brake-repairs` | New |
| European car servicing & repairs | `/services/european-car-repairs` | New. Makes and diagnostic tools to confirm |
| Mechanical repairs & diagnostics | `/services/mechanical-repairs` | Re-scoped as the "everything else" hub |
| Engine repairs & diagnostics | `/services/engine-repairs` | New. Rebuild/replacement scope to confirm |
| Suspension & steering | `/services/suspension-steering` | New. Wheel alignment to confirm |
| Car tyres | `/services/car-tyres` | New. Brands, balancing, puncture repair to confirm |
| Japanese car servicing & repairs | `/services/japanese-car-repairs` | New. Hybrid capability to confirm |

**Considered and not built (needs confirmation first):** logbook servicing as its own page, transmission and clutch, cooling system and radiators, auto electrical, air-conditioning regas, pre-purchase inspections, wheel alignment, fleet servicing. Each has real search demand (see `02-website-seo-aeo-geo.md`), so each is a fast follow once the owner says yes.

## 4. Competitor analysis

Sources: Google AU autocomplete, web search results, council and marketplace listings, read 19 Nov 2026. Listings were not independently verified, and details such as hours change. Use this as a map of the field, not as fact about each business.

### Who Memon Motors competes with, by search

| Search intent | Who shows up | What they do well | Gap Memon can fill |
|---|---|---|---|
| Mechanic / roadworthy, Truganina | **Friends Auto Solutions** (Truganina + Hoppers Crossing, ~650 Google reviews), Honest Car Care, A1 Auto, Truganina Car Repairs, Techno Auto | Friends: LVT number shown, suburb pages, "RWC in under a day", trading since 2015 | Same rating (4.9). Memon needs review volume and a visible licence number |
| European cars, west Melbourne | **HE Auto Care Centre** (Palmers Rd, Truganina: European, Japanese, Chinese, Korean), **iCar Automotive** and **AJA Prestige Performance** (Hoppers Crossing, European/Mercedes), Western Prestige Auto | Name the makes they work on; prestige positioning | Most European options sit in Hoppers Crossing. Memon is closer for Truganina, Tarneit and Williams Landing drivers. Honest quoting is a strong angle against "prestige = expensive" |
| Tyres, Truganina/Tarneit/Hoppers | **Bridgestone Select Truganina** (tyres, alignment, logbook servicing), Grand Tyres (Prosperity St), Ultra Tune Truganina, JAX and Pedders (Hoppers Crossing), mobile tyre fitters | Brand-name stock, alignment, price promotions | Tyres plus the mechanical fix for the *cause* of uneven wear, in one visit. Don't try to out-price chains |
| Suspension and brakes | Pedders Hoppers Crossing (suspension & brakes franchise), "brakes plus/just brakes" style specialists | Specialist brand | One workshop for brakes, suspension and roadworthy repairs |
| Marketplaces | AutoGuru, Oneflare, Airtasker | Instant quotes, reviews | Optional extra channel (commission). Evaluate later |

### Patterns worth borrowing (not copying)

1. **Named makes.** European specialists list makes (BMW, Mercedes-Benz, Audi, VW, Volvo). Autocomplete confirms make-level demand ("bmw mechanic hoppers crossing", "best subaru mechanic melbourne"). Memon's pages deliberately **don't name makes yet**. Add them once the owner confirms which makes they regularly service.
2. **Credential up front.** Friends Auto shows its licensed tester number next to the RWC offer.
3. **Photo-to-quote for tyres.** Tyre buyers compare price. Memon's WhatsApp-a-sidewall-photo flow is now on the tyres page.
4. **Answer-first FAQs.** Few local workshop sites explain things in detail. Every new page now opens with plain answers and links official sources (Transport Victoria, ACCC).

## 5. What the owner must confirm (blocking or limiting)

| # | Question | Unlocks |
|---|---|---|
| 1 | Licensed vehicle tester? Licence number? EV/hybrid tester? | RWC credibility, Transport Victoria tester map, ads that say "licensed" |
| 2 | Tyres: supply and fit confirmed? Which brands and price tiers? Balancing, puncture repair, TPMS? | Tyre page detail, tyre ads |
| 3 | Wheel alignment in-house, or referred out? | Suspension and tyre pages, alignment searches |
| 4 | European and Japanese: which makes do you regularly service? Which diagnostic scan tool(s)? Can you do battery registration, service resets, EPB service mode? | Make names on pages and ads |
| 5 | Engine scope: timing belts, head gaskets, engine replacement or rebuilds? Transmission and clutch work? | Engine page depth, new pages |
| 6 | Do you stamp logbooks for new-car servicing? | "Logbook service" page and keyword |
| 7 | Air conditioning: does anyone hold an ARC automotive refrigerant licence? | AC page and AC claims |
| 8 | Pre-purchase inspections, auto electrical, cooling systems, fleet? | Additional pages |
| 9 | Any warranty on parts and labour? Years in trade? | Trust signals |
| 10 | Have rentals and sales fully stopped? What happens to existing rental customers and the bond process? | GBP categories, Facebook, reviews strategy |
| 11 | Permission to photograph and film the workshop, Sadiq and team, and customer cars (with consent) | Real imagery for site, GBP, social, ads |
| 12 | Hours still Mon–Fri 9–5:30, Sat 1–3? | NAP consistency |
