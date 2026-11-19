# Paid advertising, conversion tracking and KPIs

**Order matters: tracking first, then ads.** Today the site has no analytics, no conversion tracking and no privacy policy. Spending on ads before that exists means paying for clicks with no way to tell which ones became bookings.

## 1. Prerequisites (owner and setup)

| # | Item | Who | Notes |
|---|---|---|---|
| 1 | Privacy policy page | Owner approves text | Needed before any tracking. Cover the analytics/ads cookies, WhatsApp/phone enquiries and data retention. Have it reviewed; it's a legal document |
| 2 | Google Analytics 4 property + measurement ID | Owner creates (free), shares ID | I can wire it into the site |
| 3 | Google Ads account, linked to GA4 and the Google Business Profile | Owner (billing is theirs) | Link the GBP so ads show the address and calls |
| 4 | Meta Business Manager, ad account, Pixel | Owner | Connect the Facebook page and Instagram |
| 5 | Monthly budget decision | Owner | No budget figure is recommended here without volume/CPC data. Start small, then scale what produces leads |
| 6 | Licence and service confirmations | Owner | See `01-positioning-and-competitors.md` §5. Ads can't claim what the site can't |

## 2. Conversion tracking plan

The site has no backend: bookings happen by phone or WhatsApp. So the conversions are **clicks that start a conversation**, plus calls.

| Conversion | How to track | Primary? |
|---|---|---|
| Phone call from site (`tel:` click) | GA4 event `click_call` on every `tel:` link | Yes |
| WhatsApp start (`wa.me` click) | GA4 event `click_whatsapp` | Yes |
| Booking bar submit (opens WhatsApp) | GA4 event `booking_request` with `service` and `suburb` params | Yes |
| Contact form submit (opens WhatsApp) | GA4 event `contact_request` | Yes |
| Calls from ads (call assets) | Google Ads call reporting, count calls ≥ 60 s | Yes |
| Directions click | GA4 event `click_directions` | Secondary |
| GBP calls and directions | GBP Performance (not attributable to ads) | Report only |

**Implementation (once the IDs exist):** add `@next/third-parties` Google tag in `layout.tsx`, and one small client helper that fires the events above from the existing `Button`/link components. Import the primary events into Google Ads as conversions. The Meta Pixel fires `Contact` for the same clicks.

**Call tracking caution:** if you use call-tracking numbers, use them **only inside ads**, never on the website, Google profile or directories. A different phone number in citations breaks NAP consistency (see `docs/seo/03-local-gbp-citations.md`).

**Offline check:** for the first 8 weeks, ask every new caller "how did you find us?" and tally it weekly. With a small business this is the most reliable attribution there is.

## 3. Google Search campaigns

### Structure

| Campaign | Ad groups (themes) | Landing page | Notes |
|---|---|---|---|
| **1. Roadworthy** (start here) | roadworthy certificate; rwc; roadworthy + suburb | `/services/roadworthy-certificate` | Highest intent, time-sensitive (selling a car) |
| **2. Mechanic / servicing** | mechanic + suburb; car service + suburb; car repairs | `/services/car-servicing`, `/services/mechanical-repairs` | Core demand |
| **3. Repairs by symptom** | brakes; suspension; engine / check engine light | Matching service page | Add after 1–2 show conversion data |
| **4. Tyres** | tyres + suburb; tyre shop; cheap tyres | `/services/car-tyres` | Only after tyre supply is confirmed. Price-competitive; watch cost per lead |
| **5. European / Japanese** | european car service; bmw/vw/mercedes mechanic (only confirmed makes) | Matching page | After makes are confirmed |

### Settings

- **Location:** "Presence: people in or regularly in" the target area. Start with Truganina, Tarneit, Hoppers Crossing, Point Cook, Williams Landing, Laverton, Werribee, Wyndham Vale and Derrimut (or a ~12 km radius around the pin). Don't use "interest in" (it pulls in people elsewhere).
- **Match types:** phrase and exact to start; broad match only once there are enough conversions for smart bidding to learn.
- **Bidding:** Maximise clicks with a CPC cap for the first 2–4 weeks to gather data, then Maximise conversions once conversions are being recorded.
- **Schedule:** run ads during open hours plus about an hour before opening (calls outside hours go unanswered). Mon–Fri 8:00–17:30, Sat 12:00–15:00.
- **Assets:** call asset (business number), location asset (from GBP), sitelinks (Servicing, Brakes, Tyres, Roadworthy), callouts ("Quote before we start", "WhatsApp quotes", "4.9★ on Google").
- **Negative keywords (starter list):** jobs, job, salary, apprentice, apprenticeship, course, certificate iii, training, how to become, diy, manual, pdf, rental, hire, for sale, buy car, used cars, truck, motorcycle, motorbike, boat, florida, fl, free, (and "mobile" unless mobile service is confirmed).

### Ad copy (responsive search ads)

Character limits: headlines ≤ 30, descriptions ≤ 90. Checked with a script.

**Roadworthy**
- Headlines: `Roadworthy Certificate` · `Roadworthy in Truganina` · `RWC Inspections Truganina` · `Selling Your Car? Get An RWC` · `Repairs Quoted Before We Start` · `4.9★ From 100+ Google Reviews` · `Call 0469 042 720` · `Truganina, Melbourne's West`
- Descriptions:
  - `Roadworthy inspections in Truganina. Results explained, repairs quoted before work.`
  - `Selling or re-registering? Call or WhatsApp for a time. Repairs in the same workshop.`

**Mechanic / servicing**
- Headlines: `Mechanic in Truganina` · `Car Service Truganina` · `Quote Before We Start` · `Servicing To Your Schedule` · `European & Japanese Cars` · `4.9★ On Google` · `WhatsApp For A Quick Quote` · `Brakes, Suspension, Engine`
- Descriptions:
  - `Car servicing and repairs in Truganina. We explain the problem and quote it first.`
  - `Servicing to your manufacturer's schedule. Call 0469 042 720 or WhatsApp us.`

**Brakes**
- Headlines: `Brake Repairs Truganina` · `Squealing Or Grinding Brakes?` · `Pads & Discs Measured` · `Brake Fluid & Callipers` · `Quote Before We Start`
- Descriptions:
  - `We measure your pads and discs, show you what's worn and quote before we start.`
  - `Squeal, grind or soft pedal? Book a brake check in Truganina. Call 0469 042 720.`

**Tyres** (after confirmation)
- Headlines: `Tyres Truganina` · `New Tyres Supplied & Fitted` · `WhatsApp Your Tyre Size` · `Tyre Quote By Photo` · `Near Tarneit & Hoppers`
- Descriptions:
  - `Send a photo of your tyre sidewall on WhatsApp and we'll quote new tyres, fitted.`
  - `Uneven wear? We check suspension and steering too, so new tyres last longer.`

**Never in ads until confirmed:** "licensed", "specialist", "cheapest", "best", "same day", "warranty", prices, named car makes.

### Local and Performance Max

- **Performance Max with a store goal / local actions:** can drive calls and direction requests from Maps, using the GBP link. Consider it only after Search has conversion data; it needs good creative (real photos) and spends across many surfaces.
- **Google Local Services Ads ("Google Screened"):** availability for auto repair in Australia is uncertain and changes. Check eligibility in the LSA sign-up flow; if it's available, it's worth applying (pay per lead, with a verified badge).

## 4. Meta (Facebook and Instagram) ads

| Campaign | Objective | Audience | Creative | Destination |
|---|---|---|---|---|
| A. Local awareness | Awareness (reach) | ~12–15 km radius around the workshop, 20–65+, Advantage+ audience off at first so radius holds | V1 brand video, real photos | Profile/page |
| B. Leads via WhatsApp | Engagement → Messaging (WhatsApp) | Same radius | V2 brakes, V4 tyres, V7 engine | WhatsApp chat (pre-filled "Hi, I'd like a quote for…") |
| C. Roadworthy | Leads or Traffic | Same radius; optional interest layer (buying/selling cars) | V3 | `/services/roadworthy-certificate` |
| D. Retargeting | Engagement/Leads | Video viewers (50%+), page engagers, site visitors (Pixel), 30–90 days | Reviews, "What we found" carousel, offer reminder | WhatsApp or call |

**Notes:**
- Meta classifies some local-service targeting narrowly; keep audiences broad within the radius and let the creative do the targeting.
- Click-to-WhatsApp ads fit this business: customers already use WhatsApp with Sadiq, and a tyre photo or a dashboard light photo is the natural first message.
- **Replies are the bottleneck.** Ads that start WhatsApp chats only work if someone answers within working hours. Set a WhatsApp Business greeting and away message with the hours.

## 5. KPIs

| Level | KPI | Source | Target-setting |
|---|---|---|---|
| Business | New jobs per week by channel (Google, Maps, Facebook, referral) | "How did you find us?" tally | Baseline in weeks 1–4, then set targets |
| Business | Average job value, by service | Workshop invoices | Needed to know what a lead is worth |
| Leads | Calls + WhatsApp starts + booking requests | GA4, Google Ads, GBP | Weekly trend |
| Efficiency | Cost per lead (CPL) per campaign | Ads ÷ conversions | Compare to average job value; cut campaigns whose CPL is persistently above what a job can bear |
| Efficiency | Lead → booked job rate | Manual log (simple spreadsheet) | Shows whether ads bring buyers or browsers |
| Visibility | Search Console impressions/clicks for the target queries | Search Console | Monthly |
| Local | GBP calls, directions, website clicks | GBP Performance | Monthly |
| Reputation | New Google reviews per month; average rating | GBP | Monthly. The biggest long-term lever |
| Social | Reach in radius, video 50% views, profile visits, messages | Meta/TikTok/YouTube insights | Directional only; not a success metric by itself |

Vanity metrics (likes, follower count, impressions) are reported but never used to judge success.

## 6. Optimisation rhythm

- **Weekly (15 min):** search terms report (add negatives), lead count by campaign, reply speed on WhatsApp.
- **Fortnightly:** pause ads/ad groups with spend and no conversions after a fair sample; rotate tired creative (falling CTR or rising frequency on Meta).
- **Monthly:** compare CPL and lead → job rate per service; move budget to what books jobs; refresh one video; update review count in ads if it changed.
- **Quarterly:** re-pull Keyword Planner ranges; decide on Performance Max, new services or new suburbs based on data.
