# Measurement, roadmap and implementation report

## Implementation report: what was actually done

Everything below was changed in code, verified on a local production build (build exit 0, lint clean), then **deployed** (`7274a8a` on 31 Oct 2026 and `27b9860` on 1 Nov 2026, both Success in Coolify) and re-checked on the live site on 1 Nov 2026: all 18 sitemap URLs return a self-referencing www canonical, a unique title and exactly one `aggregateRating`; every http/apex variant 301s to `https://www.memonmotors.com`. No Google Business Profile or directory listing was changed, because there was no access.

### Done in code

| Area | Change |
|---|---|
| Security | Next.js 16.4.0 → **16.4.3** (2 critical RCE + 1 high DoS advisories fixed) |
| Host | One canonical host, `https://www.memonmotors.com`, on every page, sitemap, robots, schema and Open Graph |
| Canonical | Self-referencing canonical on all 18 URLs |
| Titles and descriptions | Unique and keyword-led on all pages (table in `02-…md`) |
| Accuracy | Hours corrected to the Google profile (5:30pm). Review count corrected (105; visible copy "100+"). Schema geo corrected (~2 km error). False Williams Landing / freeway claims removed. Unverified "family-run", "since 2020", "regular customers from X" removed. About page legal-entity wording fixed |
| Suburb pages | Unique, measured drive time, distance, main roads, directions button, hours |
| Content depth | RWC page 215 → 718 words with official-source sections and 6 FAQs. Mechanical 4 FAQs. Rentals 2 FAQs. Home 4 FAQs |
| Internal links | Service pages link to every suburb page |
| Structured data | One `AutoRepair` node per page (the duplicate rating fix), `WebSite`, `Service` linked by `@id`, `hasOfferCatalog`, `areaServed` for all 8 suburbs, `sameAs`, `hasMap`, `paymentAccepted`. Removed the guessed `priceRange` |
| Sitemap | Honest `lastmod`, dropped ignored fields |
| Open Graph | Image, locale, fuller description |

Files touched: `src/lib/business.ts`, `src/lib/schema.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/sitemap.ts`, `src/app/about|areas|areas/[suburb]|contact|reviews|services|services/[slug]/page.tsx`, `src/components/sections/hero.tsx`, `reviews-section.tsx`, `sticky-booking-card.tsx`, `trust-block.tsx`, new `faq-section.tsx`, plus `package.json` and `pnpm-lock.yaml`.

### Deploy and Search Console steps (status on 1 Nov 2026)

1. Commit and push. **Done** (`7274a8a`, `27b9860`).
2. Coolify redeploy. **Done** (both deployments Success).
3. **Coolify domain setting:** apex→www and a permanent redirect type. **Done**, `curl` shows 301 on every http/apex variant.
4. Search Console: sitemap `/sitemap.xml` submitted (Success, 18 pages discovered). **Validate Fix** on "Review has multiple aggregate ratings" shows **Started** (the report lists 4 items, all crawled before the fix). **Pending:** re-check the validation result after Google recrawls. Request Indexing is not needed: the home page was already recrawled after the first deploy and Google's selected canonical matches ours.
5. **Still pending:** run PageSpeed Insights manually for `/` and `/services/roadworthy-certificate` (mobile) and record the numbers as the Core Web Vitals baseline.

### Pending: needs the owner

| # | Question | Why it matters |
|---|---|---|
| 1 | **Is Memon Motors a VicRoads/Transport Victoria licensed vehicle tester? Licence number? Can it test EV/hybrid?** | Highest-intent page. Every roadworthy competitor shows it. Nothing is claimed until confirmed |
| 2 | Confirm hours (Google says Mon–Fri to 5:30pm, Sat 1–3pm) | NAP consistency |
| 3 | Shopfront sign: "Memon Motors" or "Memon Motors Melbourne"? | GBP name policy risk |
| 4 | Is the roadworthy same-day or next-day? Any "from $" price you are happy to publish? | The #1 follow-up search is price. Not published without confirmation |
| 5 | ~~Rental terms~~: retired 19 Nov 2026, rentals no longer offered. Replaced by the service-scope questions in `docs/strategy/01-positioning-and-competitors.md` §5 | — |
| 6 | Which services are really offered: logbook servicing, pre-purchase inspection, AC regas, tyres, mobile? | Decides which new pages are honest to build |
| 7 | Repair warranty? Years of experience / trading start date? | Strong trust signals, only if true |
| 8 | GA4 measurement ID (create a free GA4 property) | No conversion tracking exists yet |
| 9 | GBP dashboard screenshots and 6-month Performance export | Baseline and category check |
| 10 | OK to merge Williams Landing / Wyndham Vale / Laverton pages later if they get no impressions? | Doorway-page risk |

## Measurement framework

**Baseline first.** Before or at deploy, capture and save: Search Console Performance (last 28 days, queries and pages), Pages (indexing) report, GBP Performance, and a manual SERP/local-pack screenshot for the target queries below.

| Metric | Source | Reliability |
|---|---|---|
| Impressions, clicks, CTR, average position (by query and page) | Search Console | **Reliable** for web search. The best volume proxy available |
| Indexed pages | Search Console → Pages | Reliable |
| Calls, direction requests, website clicks, profile views | GBP Performance | Reliable for Google surfaces. Counts are rounded |
| Calls and WhatsApp taps from the website | GA4 events (needs GA4) | Reliable once installed. **Not tracked today** |
| Form submissions | GA4 event or form backend | Reliable once wired |
| Local-pack position | Manual check from the shop's area, or a paid grid tool | **Directional only.** Varies by location, device, time and personalisation |
| AI mentions | Manual prompt log (below) | **Anecdotal.** Answers vary run to run |
| Reviews: count, rate per month, average | GBP | Reliable |
| Referring domains / backlinks | Search Console Links, free | Partial. Paid tools see more |
| Core Web Vitals | PageSpeed Insights (lab), Search Console (field, once there is enough traffic) | Lab = directional, field = reliable |

### Target queries to track monthly

mechanic truganina · car service truganina · roadworthy certificate truganina · roadworthy tarneit · roadworthy point cook · roadworthy werribee · mechanic tarneit · mechanic point cook · mechanic hoppers crossing · tyres truganina · brake repair truganina · european car mechanic hoppers crossing · memon motors (brand)

### AI prompt log protocol

Monthly, in a clean browser session, same wording each time, record date, platform, whether Memon Motors appears, who else is named, and what sources are cited:

1. who is a reliable mechanic in Truganina for a roadworthy certificate
2. best mechanic near Truganina for a roadworthy certificate
3. how much is a roadworthy certificate in Victoria
4. who can fix my brakes near Truganina
5. where can I get a car service near Tarneit
6. tyre shop near Tarneit
7. european car service west melbourne

Platforms: Google AI Mode / AI Overviews, ChatGPT, Gemini, Copilot, Perplexity. Only Google AI Mode has been tested so far (see `02-…md`).

## 30 / 60 / 90 day plan

**Days 0–30: fix and baseline**
- Done: deploy, Coolify apex→www permanent redirect, sitemap submitted, rating-fix validation started. Next: check the validation result.
- Capture the baselines above. Install GA4 with call/WhatsApp/form events once the ID is supplied.
- Owner answers the ten questions. Publish the licence number and any confirmed RWC turnaround/price.
- GBP: confirm name, set website to www, add categories/services/description, photos, reply to all reviews.
- Correct MapQuest, Dealwala, Localsearch and the Facebook page address. Claim Bing Places and Apple Business Connect.
- Start the review-request routine (card/QR with the direct review link).

**Days 31–60: content and authority**
- Build the next pages only for confirmed services (AC, brakes, logbook, pre-purchase).
- Rentals page: rates, terms, vehicle types once supplied.
- Wyndham council and other directory listings. Choose one local sponsorship.
- First Search Console review: which queries and suburb pages get impressions. Flag suburb pages with none.
- Re-run the SERP and AI prompt log.

**Days 61–90: consolidate and compound**
- Prune or merge suburb pages with no impressions (301 to `/areas`).
- Add the roadworthy cost guide if the RWC page shows demand.
- Compare against baseline: impressions, average position for the target queries, GBP calls/directions, review count.
- Decide on paid options (rank-grid tool, AutoGuru) based on evidence, not hope.

## What not to expect

No specific rankings, traffic or customer numbers are promised. A site this new usually needs months to build reputation, and Maps prominence depends heavily on review volume, which only the owner's customers can supply.
