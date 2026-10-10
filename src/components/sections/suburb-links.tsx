import Link from "next/link";
import { suburbs } from "@/lib/business";

export function SuburbLinks() {
  return (
    <ul className="flex flex-wrap gap-3">
      {suburbs.map((suburb) => (
        <li key={suburb.slug}>
          <Link
            href={`/areas/${suburb.slug}`}
            className="inline-flex h-11 items-center rounded-sm border border-hairline bg-surface-card px-4 font-display text-sm font-semibold text-ink transition-colors duration-[var(--duration-fast)] hover:border-gold hover:text-red"
          >
            {suburb.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
