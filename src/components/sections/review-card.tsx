"use client";

import { useState } from "react";
import { GoogleGIcon } from "@/components/icons/google-g-icon";
import type { Review } from "@/lib/business";

/** Cycles through brand-adjacent tones for the avatar initial — not random
 * per-review colors, so the row still reads as one system, not a generic
 * widget's rainbow avatars. */
const avatarColors = ["#B31E20", "#DDA936", "#525252"];

function avatarColor(index: number) {
  return avatarColors[index % avatarColors.length];
}

const READ_MORE_THRESHOLD = 140;

export function ReviewCard({
  review,
  index = 0,
}: {
  review: Review;
  index?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > READ_MORE_THRESHOLD;

  return (
    <figure className="flex h-full w-[300px] shrink-0 snap-start flex-col border border-hairline bg-surface-card p-6 text-ink sm:w-[340px]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white"
            style={{ backgroundColor: avatarColor(index) }}
            aria-hidden
          >
            {review.author.charAt(0)}
          </span>
          <div>
            <figcaption className="font-display text-sm font-bold text-ink">
              {review.author}
            </figcaption>
            <p className="text-xs text-muted">{review.relativeDate}</p>
          </div>
        </div>
        <GoogleGIcon className="h-5 w-5 shrink-0" />
      </div>

      <div className="mt-3 flex gap-0.5 text-gold" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M10 1.5l2.6 5.46 6 .87-4.3 4.2 1 5.97L10 15.1l-5.3 2.9 1-5.97-4.3-4.2 6-.87L10 1.5z" />
          </svg>
        ))}
      </div>

      <blockquote
        className={`mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft ${
          isLong && !expanded ? "line-clamp-4" : ""
        }`}
      >
        {review.text}
      </blockquote>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 cursor-pointer self-start text-xs font-semibold text-muted underline-offset-2 hover:text-gold hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </figure>
  );
}
