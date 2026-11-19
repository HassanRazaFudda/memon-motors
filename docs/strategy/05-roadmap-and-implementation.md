# Implementation report and roadmap

## 1. Done in this round (19 Nov 2026)

Verified on a local production build (build exit 0, lint clean). **Not committed or deployed.**

| Area | Change |
|---|---|
| Positioning | Car rentals and vehicle sale/purchase removed from every page, the metadata, the schema, the footer, the hero, the FAQs and About |
| Services | 9 service pages (was 4): Roadworthy, Car Servicing, Brake Repairs, European Cars, Mechanical Repairs & Diagnostics, Engine Repairs, Suspension & Steering, Car Tyres, Japanese Cars. Each has answer-first sections, 3–6 FAQs and official sources where rules are stated |
| Redirects | `/services/car-rentals` and `/services/vehicle-sales` → permanent redirect (308) to `/services` |
| Reviews | Three rental/sales reviews removed from the site (they stay on Google). Four repair reviews remain |
| Images | Renamed to describe content. Rental photo deleted. Alt text no longer claims stock photos are Memon's workshop (the About page did) |
| Cards | Services without a photo render as gold-striped text cards instead of reusing stock images |
| Footer | Services column with all 9 services, so every page links to every service page |
| Metadata | New home/services/about/suburb/review titles and descriptions; all titles unique, all descriptions ≤160 chars |
| Schema | `AutoRepair` description updated; offer catalogue lists the 9 services; still exactly one `aggregateRating` per page (verified on all 22 URLs) |
| Sitemap | 22 URLs, `lastmod` 2026-11-19 |
| Security | Next.js 16.4.3 → 16.4.6 (two moderate advisories; the build was failing on them, which would have blocked deploys) |
| Docs | This folder (`docs/strategy/01–05`), GBP description in `docs/seo/03` updated, CLAUDE.md updated |

## 2. Deliverables map

| Brief item | Where |
|---|---|
| 1. Brand positioning | `01-positioning-and-competitors.md` §2 |
| 2. Competitor analysis | `01` §4 |
| 3. Website content strategy | `02-website-seo-aeo-geo.md` §4, plus the live content in `src/lib/business.ts` |
| 4. Expanded services | `01` §3 (built) and `02` §9 (next, pending confirmation) |
| 5. Keyword research and mapping | `02` §2–4 (autocomplete evidence; no invented volumes) |
| 6. Local SEO, AEO, GEO | `02` §7–8, plus `docs/seo/03` |
| 7. Technical SEO | `02` §5–6, plus `docs/seo/01` |
| 8. Social media strategy | `03-social-and-video-ads.md` §1–3, §5 |
| 9. AI video ad concepts and prompts | `03` §4 (8 concepts, all 13 fields) |
| 10. Google and Meta ads | `04-paid-ads-tracking-kpis.md` §3–4 |
| 11. Content calendar | `03` §6 |
| 12. Roadmap | below |

## 3. Roadmap

### Now (this week): needs your OK

1. **Review the new pages**, then commit and deploy. Suggested commits: (a) Next.js 16.4.6, (b) repositioning: services, content, redirects, images, (c) docs.
2. After deploy: resubmit the sitemap in Search Console, and spot-check that the two old URLs redirect.
3. **Owner call** to answer the 12 questions in `01` §5. The licence number and the tyre scope matter most.

### Days 1–30: foundation

- Update the Google Business Profile: services list, description (new draft), remove rental/sales categories, real photos.
- Update Facebook intro and category.
- **Workshop shoot day** (see `03` §7). Swap real photos onto the site, GBP and social.
- Privacy policy page, then GA4 with click events (`04` §2).
- Publish licence number and named makes as soon as they're confirmed.
- Start the review-request routine with service-specific wording.
- Begin organic posting per the calendar (`03` §6).

### Days 31–60: demand

- Google Search campaigns 1–2 (roadworthy, mechanic/servicing) with conversion tracking live.
- Meta click-to-WhatsApp campaign with V2/V4/V7 once real footage exists.
- Build confirmed extra pages (alignment, logbook, pre-purchase, as confirmed).
- Add in-body links between related services (needs a small `links` field on `ServiceSection`).
- First Search Console read: which new service pages get impressions; prune suburb pages with none (per `docs/seo/01`).

### Days 61–90: scale what works

- Shift budget to the campaigns with the best cost per booked job.
- Add symptom campaigns (brakes, suspension, engine) and tyres if CPL allows.
- Evaluate Performance Max / Local Services Ads eligibility.
- Re-run the AI prompt log and the SERP checks; compare to the October baseline.

## 4. What I could not do, and why

| Item | Reason | Next step |
|---|---|---|
| Search volumes, difficulty, CPC | No Keyword Planner/paid tool access | Pull Keyword Planner once Google Ads exists |
| Confirm the services and capabilities | Only the owner knows | 12 questions in `01` §5 |
| GBP, Facebook, directory changes | No dashboard access | Owner, or grant access |
| Real photos/video | None exist | Shoot day |
| Tracking and ads setup | No GA4/Ads/Meta accounts or IDs; no privacy policy | `04` §1 |
| Live browser check | Chrome extension not connected this session | Headless Edge screenshots used instead; check the new pages on a real phone before deploy |
