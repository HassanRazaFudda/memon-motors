# Memon Motors: SEO, local SEO, AEO and GEO audit

Audit date: 31 Oct 2026. Site audited: https://www.memonmotors.com (live, pre-change baseline) and the local production build of the changes in this branch.

**Status key:** DONE = changed in code and verified on a local production build (not yet deployed unless stated). PENDING = needs a deploy, a dashboard change, or an answer from the owner.

## How this audit was done, and its limits

| Source | What it gave | Limit |
|---|---|---|
| Crawl of all 18 live URLs (own script) | Titles, descriptions, headings, canonicals, schema, links, word counts | Baseline is the old deployment |
| Google Maps listing, read in a real Chrome session | Verified address, pin, hours, reviews, attributes | Secondary categories and services are not public, so they were not seen |
| Live Google SERPs (`gl=au`) | Who ranks and who is in the local pack today | One day, one Melbourne browser, so results are personalised and move daily |
| Google AI Mode, one query | One observed AI answer | One query is an anecdote, not a measurement |
| Google autocomplete (50 seeds) | Proof that a phrase is actually typed | Shows existence of demand, **not volume** |
| OpenStreetMap geocoding and routing | Real coordinates and drive times | Free-flow estimates, approximate |
| Transport Victoria and VicRoads pages (via search) | Official roadworthy rules | Some pages block automated fetching |

**Not obtained:** search volumes, keyword difficulty, backlink profiles, Core Web Vitals field data, Google Trends. Keyword Planner needs a Google Ads account, Ahrefs/Semrush are paid, PageSpeed Insights' shared quota was exhausted when tried, and the site is too new for field data. Nothing in these documents invents those numbers. Use Search Console impressions as the volume proxy once data accrues (see `04-measurement-and-roadmap.md`).

## Critical findings (fix first)

| # | Issue | Impact | Evidence | Status |
|---|---|---|---|---|
| C1 | **Hours on the site were wrong.** Site said Mon–Fri to 6pm. Google Business Profile says 9am–5:30pm. | Customers arrive after close; NAP mismatch | GBP read 31 Oct 2026 | DONE in code (`hours` in `business.ts`). PENDING deploy. Owner to confirm |
| C2 | **Published local claims were false.** "A four-minute walk from Williams Landing Station", "a couple of minutes from Williams Landing Station", "just across the Princes Freeway" (Tarneit). | Misleads customers, damages trust and E-E-A-T | Station is 7.2 km / 8 min **drive** from the workshop (OSM routing) | DONE: replaced with measured drive times. PENDING deploy |
| C3 | **Unverified brand claims** on the site: "family-run", "serving the western suburbs since 2020", "regular customers from Point Cook/Werribee". | Breaks the project's honesty rule | Not in `business-info.md` | DONE: removed or replaced with verified wording |
| C4 | **Schema geo was ~2 km off.** `144.7167` vs the real pin `144.7383`. | Wrong map location in structured data | GBP pin `-37.8181805, 144.738346` | DONE |
| C5 | **No canonical tags, and www and apex both served 200.** | Duplicate-host signals; Search Console property is www while schema/sitemap said apex | Crawl | DONE in code (canonical on all pages, www everywhere). PENDING Coolify redirect apex→www |
| C6 | **Two `aggregateRating`s on every suburb page.** | Search Console "Review has multiple aggregate ratings" | GSC screenshot | DONE (1 per page on all 18 pages, verified) |
| C7 | **Old addresses live on third-party listings.** MapQuest "20 Prosperity St", Dealwala "40/20 Prosperity St", Localsearch "40 20 Prosperity St", Facebook shows "Hoppers Crossing". | Split citations, confuses Google and AI engines | Seen in Google results 31 Oct 2026 | PENDING (owner/listing claims, see `03-local-gbp-citations.md`) |
| C8 | **Roadworthy licence not shown.** A roadworthy certificate can only be issued by a licensed vehicle tester. The site never states Memon Motors' licence. Rival Friends Auto Solutions shows its LVT number. | Biggest trust gap on the highest-intent page | Competitor audit | PENDING owner input. Not verified, so nothing was claimed |

## On-page findings

| Issue | Before | After | Status |
|---|---|---|---|
| Titles | `Contact \| Memon Motors`, `Services \| Memon Motors`, home had no keyword | Unique, keyword-led, 35–58 chars | DONE |
| Meta descriptions | Several under 100 chars, suburb pages identical bar the name | Unique, 86–160 chars (reviews page is the short one) | DONE |
| H1 | Home "The name you can trust." (brand line, no keyword) | Kept, since it is the approved brand line. Keywords now carried by the hero sub-copy, title and FAQ | DONE |
| Thin content | Service pages 183–240 words | RWC 718, mechanical 436, rentals 278, sales 199 | DONE for RWC/mechanical. Rentals and sales need owner facts to go further |
| Suburb pages | ~265 words, ~90% shared template | ~330 words, each with its own measured drive time, distance, main roads and directions link | DONE. See doorway-page risk below |
| FAQ / answer content | None anywhere | RWC (6 Q&A), mechanical (4), rentals (2), home (4). Answer-first, official rules cited | DONE |
| Internal links | Services pages did not link to suburb pages | Service pages now link to all suburbs | DONE |
| Open Graph | No image, tagline-only description | Logo image, `en_AU`, fuller description | DONE |
| Image alt text | 3 empty `alt=""` | All three are decorative (hero background, logo in card, transition overlay), so correct | No change needed |
| Sitemap | `lastmod` = build time on every URL; ignored `priority`/`changefreq` | Fixed content date; ignored fields removed | DONE |
| `robots.txt` | Allows all, sitemap link | Correct. Sitemap URL now www | DONE |

### Doorway-page risk (suburb pages)

Eight suburb pages is the most aggressive part of the architecture. Each page now has real, checkable, page-specific content (drive time, distance, roads, directions), which is what separates a useful local page from a doorway page. But demand evidence is uneven:

- **Real demand in autocomplete:** Truganina, Tarneit, Point Cook, Hoppers Crossing, Werribee (mechanic and roadworthy phrases).
- **Weak or no autocomplete evidence:** Williams Landing (no suggestions at all), Laverton and Wyndham Vale (roadworthy phrases return noise).
- **Only five suburbs were ever advertised by the business** (Truganina, Hoppers Crossing, Tarneit, Point Cook, Laverton). Werribee, Williams Landing and Wyndham Vale were added from a competitor's list.

**Recommendation:** keep all eight for now (they are indexed and now genuinely differentiated), then at day 60 read Search Console. Any suburb page with zero impressions should be merged into `/areas` with a 301, not left as thin content.

## Technical findings

| Area | Finding | Status |
|---|---|---|
| HTTPS | Valid certificate, http→https works, no mixed content, no HSTS | OK. HSTS optional |
| http→https redirect | Returns **307 (temporary)** rather than 301/308 | PENDING (Traefik/Coolify setting) |
| www vs apex | Both serve 200 independently | PENDING Coolify "redirect to www" |
| Indexing | Home, About and Areas already indexed (seen in Google, 31 Oct) | OK |
| GSC "Page is not served over HTTPS" | Info-level, reflects Google's last crawl. HTTPS verified working | Re-test live URL after deploy |
| Structured data | One `AutoRepair` node per page, valid JSON-LD on all 14 pages checked | DONE |
| `priceRange: "$$"` | Unverified guess in schema | DONE: removed |
| Core Web Vitals | **Not measured.** PageSpeed quota exhausted, no field data yet | PENDING: run PageSpeed Insights manually |
| Next.js | Was 16.4.0 with 2 critical RCE and 1 high DoS advisories | DONE: 16.4.3. PENDING deploy |
| Conversion tracking | **None installed** (no GA4/GTM) | PENDING: needs a GA4 measurement ID |
| Page weight | Home 87 KB HTML, 9 images, 1.0–1.6 s from this machine | Acceptable |

## Structured data: what is and is not eligible

- **Helps understanding only (no visible search feature):** `AutoRepair` (LocalBusiness), `WebSite`, `Service`, `OfferCatalog`, `areaServed`, `sameAs`.
- **`BreadcrumbList`:** eligible for breadcrumb display in results.
- **`aggregateRating` on the business's own page:** Google does not show review stars for a business's own LocalBusiness markup. It is kept because it matches the visible, real Google rating and is harmless, but **do not expect stars**. It can be deleted in one line (`schema.ts`) if you prefer not to carry it.
- **`FAQPage`:** deliberately **not** added. Google limits FAQ rich results to authoritative government and health sites. The FAQs are visible page text instead, which is what answer engines read.

## Conversion findings

- Click-to-call (`tel:`) and WhatsApp links are present on every page (3–6 per page). Good.
- A booking form and booking bar exist.
- Appointments are recommended per the Google profile, and the home FAQ now says to call first.
- **Gap:** nothing measures calls, WhatsApp taps or form submissions. Until GA4 is installed, Google Business Profile call/direction counts are the only conversion data.
