"use client";

import { useRef } from "react";
import { ReviewCard } from "@/components/sections/review-card";
import { GoogleWordmark } from "@/components/icons/google-g-icon";
import { business, reviews } from "@/lib/business";

export function ReviewsSection({ limit }: { limit?: number }) {
  const list = limit ? reviews.slice(0, limit) : reviews;
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollNext() {
    scrollerRef.current?.scrollBy({ left: 360, behavior: "smooth" });
  }

  return (
    <div className="border border-hairline bg-surface px-6 py-10 sm:px-10 sm:py-12">
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-sm font-black tracking-wide text-ink">
          EXCELLENT
        </p>
        <div className="mt-2 flex justify-center gap-1 text-gold" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              <path d="M10 1.5l2.6 5.46 6 .87-4.3 4.2 1 5.97L10 15.1l-5.3 2.9 1-5.97-4.3-4.2 6-.87L10 1.5z" />
            </svg>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">
          Based on <span className="font-bold text-ink">{business.rating.countLabel} reviews</span>
        </p>
        <GoogleWordmark className="mt-2 inline-block font-display text-xl font-bold" />
      </div>

      <div className="relative mt-8">
        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {list.map((review, i) => (
            <ReviewCard key={`${review.author}-${review.relativeDate}`} review={review} index={i} />
          ))}
        </div>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next reviews"
          className="absolute -right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-hairline-soft bg-surface-elevated text-ink transition-colors duration-[var(--duration-fast)] hover:border-gold hover:bg-gold hover:text-canvas-warm sm:flex"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
            <path
              d="M7.5 15l5-5-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
