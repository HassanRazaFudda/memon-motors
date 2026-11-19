# Website, SEO, local SEO, AEO and GEO plan (repair-focused)

Supersedes the rental and sales parts of `docs/seo/02-keywords-competitors-content.md`. Everything else in `docs/seo/` (audit, GBP, citations, measurement) still applies.

## 1. Data used, and its limits

- **Google AU autocomplete** for 38 repair-focused seeds (19 Nov 2026). This proves a phrase is typed. It gives **no volume or difficulty**.
- **Web search results** for competitors.
- **Not available:** search volume, keyword difficulty and CPC. Keyword Planner needs a Google Ads account with an active campaign to show exact volumes; Ahrefs and Semrush are paid. No number in this document is invented. Once Google Ads is set up (see `04-paid-ads-tracking-kpis.md`), pull Keyword Planner ranges for the clusters below and re-prioritise.

## 2. "Melbourne" keywords: what's realistic

The client's starting list targets "Melbourne" (for example "car mechanics in Melbourne" or "best car mechanics in Melbourne"). Two facts shape what's achievable:

1. **Local results are proximity-led.** For "mechanic Melbourne", Google shows businesses near the searcher or near the CBD. A Truganina workshop won't appear in the map pack for a searcher in Brunswick, whatever the website says. Google names distance as one of its three local ranking factors.
2. **Autocomplete shows people search by suburb.** "tyres truganina", "tyres hoppers crossing", "car service tarneit" and "euro mechanic hoppers crossing" all return real suggestions. Many "Melbourne" suggestions are noise ("melbourne fl" is Florida).

**Approach:**
- **Primary targets:** Truganina plus the western-suburbs ring (Tarneit, Hoppers Crossing, Point Cook, Williams Landing, Laverton, Werribee, Wyndham Vale) and "west Melbourne / western suburbs" modifiers.
- **Secondary:** "Melbourne" appears naturally in copy and meta ("Melbourne's west"), in schema `areaServed`, and in Google Ads location targeting, which *can* reach a wider area.
- **Never:** fake Melbourne addresses, CBD landing pages, or a page per suburb per service. That is doorway-page territory, which Google's spam policies target.
- **"Best mechanic Melbourne":** don't claim "best". Earn it through reviews. The phrase can appear only inside a real review quote.

## 3. Keyword clusters and evidence

| Cluster | Example phrases with autocomplete evidence | Intent | Page |
|---|---|---|---|
| Core mechanic | mechanic truganina, auto mechanic truganina, car repair truganina, mechanic near me truganina, car mechanic west melbourne | Find a workshop now | Home, `/services/mechanical-repairs` |
| Car servicing | car service truganina, cheapest/best car service truganina, car service tarneit, car service near tarneit vic | Book a service | `/services/car-servicing` |
| Roadworthy | roadworthy truganina, roadworthy certificate melbourne, roadworthy melbourne cost | Selling or re-registering | `/services/roadworthy-certificate` |
| Tyres | tyres truganina, tyre shop truganina, cheap tyres truganina/tarneit/werribee, tyre repair truganina, car tyres tarneit, tyres hoppers crossing | Buy tyres (price-sensitive) | `/services/car-tyres` |
| Brakes | brake repair truganina, brakes/brake repairs/brake specialist hoppers crossing | Fix a symptom | `/services/brake-repairs` |
| Suspension | suspension repair melbourne, suspension service melbourne, "pedders suspension & brakes hoppers crossing" | Fix a symptom | `/services/suspension-steering` |
| Engine | engine rebuild/reconditioning/replacement melbourne, engine repair near me | High-value repair | `/services/engine-repairs` |
| European | european car mechanic melbourne, euro/european car mechanic hoppers crossing, bmw mechanic hoppers crossing/werribee, mercedes mechanic werribee, best vw/bmw mechanic melbourne | Make-aware owner | `/services/european-car-repairs` |
| Japanese | japanese car mechanic melbourne (weak), best subaru mechanic melbourne, subaru engine rebuild melbourne | Make-aware owner | `/services/japanese-car-repairs` |
| Not yet built | wheel alignment truganina, auto electrician truganina, pre purchase inspection melbourne/vic | Needs owner confirmation | — |

**Notably weak or empty:** "european mechanic truganina", "logbook service truganina", "suspension repairs werribee", "clutch repair werribee", "car air conditioning truganina". Low demand at suburb level means one good page per service, not suburb variants.

## 4. Page map (implemented)

| Page | Title (template adds "\| Memon Motors") | H1 | Primary keyword | Supporting |
|---|---|---|---|---|
| Home | Truganina Car Mechanic, Tyres & Roadworthy | The name you can trust. | mechanic truganina | car service, tyres, roadworthy, west Melbourne |
| Services | Car Servicing, Repairs, Tyres & Roadworthy | Services | car repairs truganina | all service names |
| RWC | Roadworthy Certificate Truganina (RWC) | Roadworthy Certificates (RWC) | roadworthy certificate truganina | rwc cost, valid 30 days, failed roadworthy |
| Servicing | Car Service Truganina | Car Servicing | car service truganina | logbook, warranty, how often |
| Brakes | Brake Repairs Truganina | Brake Repairs | brake repairs truganina | pads, discs, squealing, grinding |
| European | European Car Service & Repairs Truganina | European Car Servicing & Repairs | european car mechanic | approved oil, warranty, EPB |
| Mechanical | Car Mechanic Truganina: Repairs & Diagnostics | Mechanical Repairs & Diagnostics | car mechanic truganina | warning light, won't start, battery |
| Engine | Engine Repairs & Diagnostics Truganina | Engine Repairs & Diagnostics | engine repair | check engine light, overheating, timing belt |
| Suspension | Suspension & Steering Repairs Truganina | Suspension & Steering Repairs | suspension repairs | shocks, clunking, alignment |
| Tyres | Car Tyres Truganina, Supplied & Fitted | Car Tyres | tyres truganina | tread depth Victoria, tyre size, quote |
| Japanese | Japanese Car Service & Repairs Truganina | Japanese Car Servicing & Repairs | japanese car mechanic | CVT, timing belt, hybrid |

Every service page has: an answer-first intro, H2 sections, official sources where a rule is stated (Transport Victoria, ACCC), 3–6 FAQs, a sticky call/WhatsApp card, links to all eight suburb pages and to every other service, and one Service JSON-LD node linked to the business by `@id`.

**Suburb pages** stay as they were (measured drive time, distance, roads, directions). Their meta now says "Car servicing, repairs, tyres and roadworthy certificates for {suburb} drivers". The day-60 pruning rule from `docs/seo/01-audit.md` still applies.

### Internal linking rules

- Each service page links to every other service ("Other services") and all suburbs.
- The footer now lists all nine services on every page. That is site-wide links to every money page.
- **Next (when content is added):** link symptom-to-service in body text. The tyres "uneven wear" section should link to suspension, and the RWC "if it fails" section to brakes, suspension and tyres. Today these are text mentions. `ServiceSection` supports only plain paragraphs, so this needs a small `links` field. It is a small change, and I left it out to keep this change focused.

## 5. Technical SEO

| Item | Status |
|---|---|
| Removed pages | `/services/car-rentals` and `/services/vehicle-sales` → 308 permanent to `/services` (Next.js `permanent: true`), verified locally |
| Sitemap | 22 URLs (was 18), `lastmod` 19 Nov 2026 |
| Canonicals, one `aggregateRating` per page | Verified on all 22 URLs on the local production build |
| Titles / descriptions | Unique; titles 36–60 chars, descriptions ≤160 |
| Next.js | 16.4.3 → **16.4.6**. Two moderate advisories (`use cache` / `unstable_cache`, not used by this site) made the build fail, which would also have blocked Coolify deploys |
| Images | Renamed to describe their content (`hoist-brake-disc.jpg` etc.). Alt text now describes the picture and never claims it is Memon's workshop |
| Core Web Vitals | Still not measured. Run PageSpeed Insights on `/`, `/services/roadworthy-certificate` and `/services/car-tyres` (mobile) after deploy |
| Privacy policy | **None exists.** Required before adding GA4, Google Ads or Meta Pixel (see `04-paid-ads-tracking-kpis.md`) |

### Image SEO (when real photos arrive)

- File names describe the subject: `memon-motors-workshop-truganina.jpg`, `brake-disc-replacement.jpg`.
- Alt text describes what's shown: "Sadiq inspecting front brake pads on a hoist at Memon Motors, Truganina". Only say "Memon Motors" when it really is.
- Export at about 2000 px on the long side, JPEG quality ~80. `next/image` handles responsive sizes and WebP/AVIF.
- Upload the same real photos to the Google profile.

## 6. Schema

- `AutoRepair` (root, one per page): description updated to the repair-only positioning. `hasOfferCatalog` now lists the nine services automatically.
- `Service` node per service page, `BreadcrumbList` everywhere.
- **Not added:** `FAQPage` (Google limits FAQ rich results to authoritative government and health sites; the FAQs stay as visible text for answer engines) and `Review` markup (self-serving reviews aren't eligible for stars).
- **When the licence is confirmed:** add `hasCredential` (an `EducationalOccupationalCredential` for the licensed vehicle tester) to the root node, and show the number visibly on the RWC page.

## 7. Local SEO and Google Business Profile changes for the repositioning

| Action | Detail |
|---|---|
| Categories | Keep primary **Auto repair shop**. **Remove** any car-rental or used-car-dealer secondary categories. Consider true secondaries from Google's list, such as a tyre shop or brake shop category, only if they reflect real work. Pick names exactly as the dashboard lists them |
| Services list | Replace with the nine services, using the same names as the site |
| Description | Updated draft in `docs/seo/03-local-gbp-citations.md` (no rentals) |
| Products / offers | Optional: a "Tyres: send your size on WhatsApp" post |
| Photos | Real workshop photos as soon as they exist |
| Reviews | Ask repair customers by service ("If we fixed your brakes…"). Natural review text that mentions brakes, tyres or roadworthy helps relevance. Never script or incentivise reviews |
| Facebook page | Update intro, category and services to match. Remove rental posts or leave them as history. Don't post new rental offers |
| Citations | Update any directory listing categories that say "car rental" (Calso, Birdeye categories) and the Prosperity St addresses already listed in `docs/seo/03` |

## 8. AEO (answer engines) and GEO (generative engines)

What helps, and what has been done:

1. **Answer-first content.** Each page now answers the questions people ask: legal tread depth, how long an RWC lasts, whether independent servicing affects warranty, what a check engine light means. Answers are short, specific and sourced, and are written to be quotable.
2. **Consistent entity facts.** The same name, address, phone, hours and service list on the site, Google profile, Facebook and directories. AI engines cross-check sources, so inconsistency (old Prosperity St addresses, "car rental" categories) is the main risk.
3. **Third-party corroboration.** AI answers about local businesses often lean on reviews and directories. Review volume and review text that mentions specific services are the biggest levers. Being named on Wyndham council or other credible local pages helps too.
4. **No tricks.** No hidden text, no AI-bait pages, no `llms.txt` promises (no major engine has documented using it for ranking).

**What to measure:** the monthly prompt log in `docs/seo/04-measurement-and-roadmap.md`, with repair prompts added: "who can fix my brakes near Truganina", "tyre shop near Tarneit", "european car service west melbourne". No outcome is promised; AI answers vary run to run.

## 9. Content roadmap (after owner confirmation)

| Priority | Content | Why |
|---|---|---|
| 1 | Licence number on RWC page + schema credential | Highest-intent page, competitor parity |
| 2 | Named makes on the European and Japanese pages | Make-level demand is in autocomplete |
| 3 | Wheel alignment (page, or a section on the tyres page) | "wheel alignment truganina" has demand |
| 4 | Logbook servicing page | Common search, but only if they stamp logbooks |
| 5 | Pre-purchase inspection page | "pre purchase inspection vic/melbourne" demand. Fits the old "inspect before you buy" story honestly |
| 6 | "Roadworthy cost in Victoria" guide | Top follow-up question. Needs the owner's price policy |
| 7 | Auto electrical, AC (with ARC licence), cooling | Only if offered |
