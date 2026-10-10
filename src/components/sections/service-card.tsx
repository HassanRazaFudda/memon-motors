import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/business";

/**
 * Deliberately not the generic "identical rounded card, same soft shadow,
 * icon-in-a-circle" kit (frontend-design skill names this as the commonest
 * AI tell). The priority service (RWC — the business's top local-SEO
 * target per CLAUDE.md) spans wider and carries a taller photo; the rest
 * stay quieter.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden bg-surface-card ring-1 ring-hairline transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-smooth)] hover:-translate-y-1 hover:ring-gold",
        service.priority && "sm:col-span-2"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          service.priority ? "aspect-[21/9]" : "aspect-[16/10]"
        )}
      >
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes={service.priority ? "(min-width: 640px) 70vw, 100vw" : "(min-width: 640px) 35vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-smooth)] group-hover:scale-105"
        />
        {service.priority && (
          <span className="absolute left-4 top-4 bg-gold px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-canvas-warm">
            Most requested
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-ink">
            {service.name}
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {service.summary}
          </p>
        </div>

        <span className="mt-6 font-display text-sm font-semibold text-red transition-colors group-hover:text-red-light">
          View details
        </span>
      </div>
    </Link>
  );
}
