import { business } from "@/lib/business";

/**
 * The one place type alone carries hierarchy — DESIGN.md's rating-display
 * treatment (64px/700), here built around Memon Motors' real number, not a
 * decorative stat. This is the single most important trust signal the
 * business has (see business-info.md §6).
 */
export function TrustBlock() {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-10 gap-y-6">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-6xl font-black leading-none text-ink sm:text-7xl">
            {business.rating.value}
          </span>
          <StarRow />
        </div>
        <p className="mt-2 text-sm text-muted">
          from {business.rating.count}+ reviews on Google
        </p>
      </div>

      <dl className="flex flex-wrap gap-x-12 gap-y-4 sm:gap-x-16 sm:border-l sm:border-hairline sm:pl-10 lg:gap-x-20">
        <div>
          <dt className="text-sm text-muted">Based in</dt>
          <dd className="font-display text-lg font-bold text-ink">Truganina</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Serving since</dt>
          <dd className="font-display text-lg font-bold text-ink">2020</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">ABN</dt>
          <dd className="font-display text-lg font-bold text-ink">{business.abn}</dd>
        </div>
      </dl>
    </div>
  );
}

function StarRow() {
  return (
    <div className="flex gap-0.5 text-gold" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path d="M10 1.5l2.6 5.46 6 .87-4.3 4.2 1 5.97L10 15.1l-5.3 2.9 1-5.97-4.3-4.2 6-.87L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
