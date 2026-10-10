# Memon Motors — memonmotors.com

Project instructions for any coding agent (Claude Code) working in this repo. Read this before writing UI code, alongside `DESIGN.md` in the project root.

## Business Context

Full research is in `business-info.md` (project root) — read it for sourcing/citations. Summary relevant to the build:

- **Who**: Memon Motors (legal entity ZHS GADAR PTY LTD, ABN 67 646 402 379), auto repair + RWC (Roadworthy Certificate) + mechanical servicing + car rentals + vehicle sale/purchase, Truganina VIC (western Melbourne suburbs).
- **Reputation**: 4.9★ across 100+ reviews (Google, Birdeye, RepairBook). Currently **zero official website** — the whole gap this project exists to close. All traffic today comes from Google Maps/directories and word-of-mouth.
- **What customers praise**: fair/reasonable/honest pricing, manager **Sadiq**'s customer service, cheaper than other shops in the area, good car-rental experience.
- **Service area**: Truganina, Hoppers Crossing, Tarneit, Point Cook, Laverton (from the business's own Facebook page), plus the broader western-suburbs corridor (Werribee, Williams Landing, Wyndham Vale) used by the direct competitor for local SEO.
- **Positioning — revised 2026-10-08**: affordable and honest in substance (copy, pricing language, real reviews, no fabricated claims), but the *visual* brand has deliberately shifted to upscale/premium-automotive. The owner reviewed the first build and judged it too basic/generic for 2026 and explicitly chose a luxury-atelier direction over "elevate craft, stay soft" — see Design System below. Content stays honest; the skin goes cinematic.
- **Proprietor**: Muhammad Sadiq (named on the business card; matches "Sadiq" praised throughout reviews).
- **Address — resolved**: confirmed as **37A Dunmore Dr, Truganina VIC 3029** by the owner's business card (agrees with Google Maps/RepairBook). Treat 40/20 Prosperity St (Birdeye/Facebook/Wheree/Dealwala) as the outdated address — do not use it.
- **Still unresolved — confirm with the business owner before publishing**:
  - Hours vary slightly by source (Birdeye vs Dealwala Saturday hours differ) — confirm final hours.
  - A "$36,200 Victorian government grant" mention is unverified — do not publish it without confirmation.

## Brand Assets (from the owner's business card — see `business-info.md` §0)

- **Logo**: gold metallic winged "M" emblem in a circular badge on black. **Resolved** — a clean, high-res (1254×1254), transparent-background PNG is saved at `public/logo.png`. Use it as-is sitewide (header, footer, favicon source). Do not substitute a generic icon or regenerate a new "M" mark. For the favicon specifically, generate a square-cropped/padded version from this file (the wings make the source non-square) rather than stretching it.
- **Tagline**: "The Name You Can Trust" — use in the hero and `<title>`/meta description.
- **Owner's own services line**: "Deals in Car Rentals, Buy & Sale and Repairs" — good source wording for hero subcopy.
- **Card's visual identity**: black background, red ribbon/accent (used on the business name band and to highlight "CAR"), gold badge, moody dark showroom car photography.

## Competitive Benchmark

- **Friends Auto Solutions** (friendsautosolutions.co.uk — actually `.com.au`) is the direct local competitor: same suburb, same service mix (RWC + mechanical + rentals), 635 reviews, has the website Memon Motors lacks. Use its information architecture as the closest real-world template: Home → Car Repairs → Roadworthy Certificates → Car/Courier Rentals → Other Services → Contact, each service page targeting its own suburb list for local SEO.
- **Lube Mobile** pattern worth copying functionally: postcode/suburb entry up front, itemised/upfront quoting language, visible warranty terms, FAQ block that pre-answers pricing/timing objections.
- **Do not copy** Forge Automotive (forgeautomotive.co.uk) or BMW/Ferrari/Lamborghini/Bugatti-style dark cinematic "luxury atelier" skins. That visual language signals expensive/exclusive and directly undermines Memon Motors' actual selling point (affordable, honest pricing). Borrow motion technique from sites like that — never the color/mood.

## Tech Stack

- **Framework**: Next.js **16.4.0** (App Router), already scaffolded in this repo — do not downgrade or switch to Pages Router.
- **React**: 19.3.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Structure**: `src/app/` (App Router), import alias `@/*`
- **Animation libraries to add**: `lenis` (smooth inertial scroll), `gsap` + `ScrollTrigger` (pinned/scroll-synced effects, staggered reveals). Prefer these over introducing a full WebGL/Three.js stack — see Motion section below for why.
- Package manager: **pnpm 12.10.1**, pinned via the `packageManager` field in `package.json` (`pnpm-lock.yaml` is committed; migrated from npm on 2026-10-10 — do not reintroduce `package-lock.json`). Use `pnpm add <pkg>` / `pnpm dev` / `pnpm build`, not `npm`.
  - **Corepack must be ≥ 0.36.** pnpm 12 ships `bin/pnpm.mjs` (no `pnpm.cjs`), and the Corepack bundled with Node 22.18 (0.33) fails with `Cannot find module '…\pnpm\12.10.1\bin\pnpm.cjs'`. Fix: `npm i -g corepack@latest`, then delete the stale cache dir `…\node\corepack\v1\pnpm\12.10.1`. Any CI/Coolify build that goes through an old Corepack hits the same error. `npx pnpm@12.10.1 <cmd>` works as a fallback.
  - `pnpm-workspace.yaml` holds `allowBuilds` — pnpm 10+ blocks dependency postinstall scripts by default (pnpm 11+ fails the install with `ERR_PNPM_IGNORED_BUILDS`), and `unrs-resolver` (pulled in by `eslint-config-next`) is explicitly allowed there. pnpm 11+ no longer reads the `pnpm` field in `package.json`, and pnpm 9 rejects this file (no `packages:`), so this is pnpm ≥ 10 only. If a future install trips `ERR_PNPM_IGNORED_BUILDS`, review the named package and add it to that list rather than disabling the check.
- **TypeScript 7 + 6 side by side (deliberate).** `typescript` is aliased to `npm:@typescript/typescript6` because `typescript-eslint` (inside `eslint-config-next@16.4.0`) throws on TS 7 and Next's build also uses the JS API; real TS 7 is installed as `@typescript/native`. This is TypeScript's own recommended setup (see the TS 7.0 announcement). Collapse back to a single `typescript` once `typescript-eslint` supports TS ≥ 7.1. ESLint is on 10.x even though `eslint-plugin-react`/`jsx-a11y`/`import` still declare peer ranges up to 9 (`pnpm peers check` warns) — verified working on 2026-10-10, but if lint starts crashing after an update, pin `eslint` back to `^9` first.

## Design System

### v2 (current): DESIGN.md (BMW M) — dark luxury-automotive, full commitment

**Superseded the Airbnb-structured v1** (soft rounded cards, white canvas, restrained black/gold/red bands) after the owner reviewed it and judged it too basic/generic for 2026 — "nobody would say it's worth $10k." Given an explicit choice between "elevate craft, keep the soft/affordable skin" and "shift to upscale/luxury positioning," the owner chose the latter, fully aware this means the site now resembles the Forge-Automotive / exotic-car-atelier register v1 deliberately avoided. That avoidance is reversed as of this revision — see Non-Goals below.

`DESIGN.md` in the project root is now generated from **BMW M** (motorsport marketing site): near-pure-black canvas, zero page ever goes light-mode, massive UPPERCASE display type (BMW Type Next Latin 700, substituted with Archivo Black here), light-weight body copy for contrast, `0px` border radius on every surface except circular icon buttons (the "engineered precision, sharp rectangles" rule), no drop shadows anywhere — depth comes only from full-bleed photography and black-vs-elevated-surface contrast, and a single sparing accent stripe/signature element. Read its full component list before building any page.

**Color override — keep BMW M's structure, swap in our real sampled brand colors, not theirs:**

| DESIGN.md (BMW M) role | BMW M original | Use instead |
|---|---|---|
| `colors.canvas` (page floor) | `#000000` | Keep **as-is** — `#000000`/`#0A0A0A`. This is now the default surface for the entire site, not just header/hero/footer bands. No light-mode sections. |
| `colors.primary` / `on-dark` (headline + primary CTA text) | `#ffffff` | Headlines/body stay white (`#ffffff`/`#e6e6e6`) as BMW M does. For the **primary CTA fill itself**, use our red (`#B31E20` flat, `#E3272C` hover/highlight, `#6D1719` pressed) instead of BMW M's outline-only white button — red reads as "brand accent," matching the business card's ribbon. |
| M tricolor stripe (`m-blue-light → m-blue-dark → m-red`) | Blue/blue/red 4px divider, used sparingly as brand signature | Replace with a **single gold stripe** (`#C59129 → #DDA936 → #F0C04B`, a gradient not a tricolor) used the exact same way BMW M uses its stripe: thin dividers, section markers, badge accents — never as a fill, never as a CTA. This is our equivalent brand-signature mark, standing in for the absent tricolor. |
| `colors.surface-card` / `surface-elevated` | `#1a1a1a` / `#262626` | Keep as-is — these are brand-neutral dark neutrals, no reason to change them. |
| Body/muted text | `#bbbbbb` / `#7e7e7e` | Keep as-is. |
| `rounded.*` scale | All `0px` except `rounded.full` on circular icon buttons | Keep exactly as-is — this is the single biggest visual signature of the new direction (every button, card, input, photo frame is a sharp rectangle; only circular icon buttons and the logo badge itself are round). |

**Typography substitution** (BMW Type Next Latin is licensed, not available): `font-display` (Archivo, already installed) at weight 700–900 for all display/UPPERCASE headlines, matching BMW M's 700-weight "stamped" voice; `font-body` (Inter, already installed) at its lightest practical weight (300 where legible, 400 as floor for body copy at small sizes — BMW M's Light-300 body-on-black can hurt legibility at small sizes, don't go below 400 for body text under ~16px) for the "engineered" contrast voice. UPPERCASE is the default for h1/h2 per BMW M's own rule; body copy stays sentence case.

**Logo exception**: `public/logo.png` (the gold winged-M badge) keeps its own circular/organic shape regardless of the `0px` radius rule — it's the one pre-existing brand asset, not a UI component this system generates.

**Photography is now the primary depth mechanism**, per BMW M's own philosophy ("the system has no decorative voltage of its own — energy comes from full-bleed photography"). Use the real workshop photos (`public/images/*.jpg`) full-bleed wherever possible — hero background, section dividers, card imagery — not as small inset thumbnails. No drop shadows anywhere; elevation reads only via `surface-card`/`surface-elevated` tone steps and photographic lighting.

**No page-width cap.** First tried capping the page at `max-w-7xl` (1280px), widened to a custom 1680px container when called out as reading dated/boxed — still wasn't enough on a normal 1920px monitor, which left a ~120px dead margin each side. The cap is removed entirely now: every section is `w-full` with only responsive gutter padding (`px-6 sm:px-10 xl:px-16`), no centered max-width box anywhere. If a future page needs a long-form text column (like About's intro paragraphs), constrain *that specific text block* with its own `max-w-2xl`/`max-w-3xl` — don't reintroduce a page-level width cap to solve a line-length problem.

### Light / dark theming — added 2026-10-09

The site now ships both a dark theme (the v2 BMW M palette above, still the default) and a light theme, switchable via a header toggle. Implementation lives in `globals.css`, `layout.tsx`, and `src/components/ui/theme-toggle.tsx`:

- **Mechanism**: Tailwind v4's `@theme` block compiles every `--color-*` token into a real runtime CSS custom property on `:root` (e.g. `.text-ink{color:var(--color-ink)}`), not an inlined hex. That means the entire token-driven component tree (service cards, forms, review cards, trust block, every page body) re-themes automatically just by overriding the same variable names under `:root[data-theme="light"]` in `globals.css` — no per-component rewrites needed. Default (no attribute) is dark.
- **Brand-constant "chrome"**: `header.tsx`, `footer.tsx`, `hero.tsx`, and the homepage CTA band intentionally keep their hardcoded `bg-canvas-warm text-white` styling in **both** themes — they don't use the `ink`/`canvas` tokens at all. `--color-canvas-warm` and the brand red/gold tokens are never redefined per theme. This is deliberate: the business card and `logo.png` are both designed for a black backdrop, so those band sections stay black regardless of toggle state, the same way a brand's colored nav bar typically doesn't invert with a site-wide light/dark toggle. Any new element added inside those bands (like the toggle button itself) must use the same hardcoded white/gold styling, not the `text-ink` token — `text-ink` flips to near-black in light mode and would vanish against the still-black header.
- **No FOUC**: an inline blocking `<script>` in `layout.tsx`'s `<head>` reads `localStorage` and sets `data-theme="light"` on `<html>` before first paint if that was the stored choice. `<html>` has `suppressHydrationWarning` since this attribute is applied outside React.
- **Toggle component**: `ThemeToggle` (`src/components/ui/theme-toggle.tsx`) uses `useSyncExternalStore` (not `useState`+`useEffect`) to read the live `data-theme` attribute — avoids a hydration-mismatch flash and matches the pattern already used for `StickyBookingCard`'s client-only derived state. Persists the choice to `localStorage`. Mounted in `header.tsx`, both the desktop nav row and the mobile bar next to the hamburger.
- **Light palette**: ink/surface/hairline roles only — see the `:root[data-theme="light"]` block in `globals.css` for exact values. Structure (0px radius, no shadows, hairline-bordered cards) is unchanged between themes; only lightness flips, so the toggle reads as "same design, inverted palette," not two different aesthetics.

### Installed skills/plugins (auto-activate — do not need to be invoked manually)

- **`frontend-design`** (Anthropic official plugin, `claude-plugins-official` marketplace) — activates automatically on any "build/design this page" request. Pushes toward a distinctive, intentional aesthetic direction and orchestrated motion instead of generic AI-template output.
- **`ui-ux-pro-max`** (`ui-ux-pro-max-skill` marketplace) — activates automatically on UI/UX requests. Has an industry-specific reasoning engine; when generating or checking a design system for this project, treat it as closest to its **"Home Services / Booking & Appointment"** and **"Auto"-adjacent service categories**, not e-commerce or SaaS. Use its pre-delivery checklist on every shipped page (no emoji-as-icons, `cursor-pointer` on clickables, 4.5:1 text contrast, visible focus states, `prefers-reduced-motion` respected, responsive at 375/768/1024/1440px).

Both are installed at **user scope**, so they apply to this project automatically — no extra setup step needed per session.

## Motion / Animation Requirements

The brief: premium, smooth, "3D-feeling" scroll animation in the style of apple.com, and the motion grammar seen on wiemer.store and forgeautomotive.co.uk — **without** adopting their visual skins (DTC-furniture softness, luxury-car darkness).

What those reference sites are actually doing (confirmed by inspection, not guessing):
- **apple.com / forgeautomotive.co.uk**: scroll-pinned hero image that zooms/crops as the user scrolls (GSAP `ScrollTrigger` pinning a section, animating `scale`/`clip-path` against scroll progress), text cross-fading/blurring out as the pin progresses. This is 2D image transform, not real WebGL — it *reads* as 3D depth because of the zoom+blur+timing, which is why it's achievable without a 3D engine.
- **wiemer.store**: staggered fade-up reveals on scroll (GSAP `ScrollTrigger` + stagger), a sticky/pinned card that stays fixed in the viewport while the page scrolls past it.

**Build it this way:**
1. **Lenis** for page-wide smooth/inertial scrolling — this alone accounts for most of the "premium" feel.
2. **GSAP ScrollTrigger** for: a pinned-zoom hero (car on the hoist / workshop photo, not a stock luxury shot), staggered fade-up reveals on service cards and the trust/rating block, and a sticky booking card on service/suburb pages.
3. Optional subtle 3D: a lightweight hover-tilt (perspective transform) on service cards is enough "3D" feel for a site like this. Do **not** add a full Three.js/WebGL 3D model viewer — it adds load weight and build complexity with no payoff for a "mechanic near me" search intent, where most traffic is mobile and wants a phone number fast.
4. **Explicitly avoid**: Wiemer's multi-second asset-preload splash screen before first paint. That pattern suits a single hero product launch; it actively hurts a local-service site where speed-to-phone-number is the conversion metric. Largest Contentful Paint should stay fast on mobile — animate content in as it scrolls, don't gate the whole page behind a loader.
5. Respect `prefers-reduced-motion` everywhere (required by both installed skills' checklists, and by the ui-ux-pro-max anti-pattern rules).

## Site Requirements (Information Architecture)

Modeled on Friends Auto Solutions' structure + local-SEO pattern, populated with Memon Motors' real info from `business-info.md`:

1. **Home** — hero (pinned-zoom workshop/car photo), quick-booking bar (suburb → service → time), trust block (4.9★ / 100+ reviews, loud per DESIGN.md's rating-display treatment), service cards (RWC, Mechanical Repairs & Diagnostics, Car Rentals, Vehicle Sale & Purchase), "Meet Sadiq" trust card, real review excerpts, suburb links, sticky contact/booking card, footer with hours/address/phone/WhatsApp/Google Maps embed.
2. **Services** — overview page + one detail page per service (RWC, Mechanical Repairs incl. the RepairBook tag list: diagnostics, AC/heating, battery, brakes, check-engine-light, oil change, powertrain/engine, scheduled maintenance, steering/suspension; Car Rentals; Vehicle Sales).
3. **Roadworthy Certificates (RWC)** — dedicated page (this is Friends Auto Solutions' top SEO target and should be Memon Motors' too): what it is, turnaround time, price-from if available, same-day messaging if true.
4. **Car Rentals** — dedicated page.
5. **Suburb pages** (local SEO, one per service area): Truganina, Point Cook, Tarneit, Hoppers Crossing, Werribee, Williams Landing, Wyndham Vale, Laverton — each a thin, genuinely useful page (not doorway-page spam): "Mechanic in [Suburb]" with the same trust block + a map + driving-distance framing.
6. **About** — business story, Sadiq, the honest-pricing positioning backed by real review quotes.
7. **Pricing/Transparency block** — reusable component (not necessarily a full page): itemised-quote promise, "no work without approval" language, similar trust mechanism to Lube Mobile's pricing FAQ. Do not publish specific $ figures that were not confirmed by the business owner.
8. **Contact** — phone (click-to-call `tel:`), WhatsApp deep link, email, Google Maps embed (confirm which address first), hours, contact form.
9. **Reviews** — aggregated real excerpts from Google/Birdeye/RepairBook (cite source, do not invent).

## Functional Requirements

- Mobile-first. Most "mechanic near me" / "RWC near me" searches are on mobile — click-to-call and WhatsApp buttons must be reachable without scrolling on the hero.
- `tel:` and `https://wa.me/` links using the real number (+61 469 042 720).
- Google Maps embed, once the address discrepancy above is resolved.
- `LocalBusiness` + `AutoRepair` (schema.org) structured data on every page, with suburb-specific `areaServed` — this is the single highest-leverage SEO move per the competitor research (Active Auto Ace / On Site Mobile Mechanic case studies both won on local-SEO schema + suburb pages, not on visual design).
- Booking form: short (suburb → service → time), modeled on Lube Mobile's pattern — do not build an 11-field form.
- No fabricated pricing, reviews, awards, or certifications. Every factual claim on the site must trace back to `business-info.md` or explicit confirmation from the business owner.

## Non-Goals / Anti-Patterns

- **Reversed 2026-10-08**: the v1 rule against Forge-Automotive-style full-page dark cinematic treatment is gone — that is now explicitly the target register (see Design System v2 above). Full-bleed dark photography, confident/exclusive-sounding headline copy, and a luxury-atelier page feel are all correct now.
- Still **not** correct: literal exotic-car *stock photography* (Ferrari/Lamborghini/BMW-badge imagery) — the dark/premium treatment applies to layout, type, color, and motion, not to pretending the business sells supercars. Keep using the real Memon Motors workshop photos (`public/images/*.jpg`) as the full-bleed subject matter; the cinematic treatment comes from how those real photos are framed/lit/cropped, not from substituting stock exotic cars.
- No generic AI-purple/pink gradients.
- No heavy pre-loader/splash screen gating first paint.
- No invented pricing, grant claims, awards, review content, or exclusivity claims not backed by `business-info.md` — the visual register changed, the honesty constraint did not. Confident/premium copy is fine; fabricated copy is not.
- No full WebGL/3D model viewer unless a future iteration specifically asks for one — the motion techniques (pinned-zoom, scroll choreography, stagger reveals) achieve the premium feel without that cost.
