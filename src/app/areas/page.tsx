import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { suburbNote, suburbs } from "@/lib/business";

export const metadata: Metadata = {
  title: "Areas We Serve around Truganina",
  description:
    "See drive times to Memon Motors, 37A Dunmore Dr, Truganina, from Tarneit, Williams Landing, Laverton, Hoppers Crossing, Point Cook and Werribee.",
};

export default function AreasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Areas we serve", url: "/areas" },
        ])}
      />

      <section className="w-full px-6 py-16 sm:px-10 sm:py-24">
        <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
          Areas we serve
        </h1>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          Based at 37A Dunmore Dr, Truganina, serving across Melbourne&apos;s west.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {suburbs.map((suburb) => (
            <li key={suburb.slug}>
              <Link
                href={`/areas/${suburb.slug}`}
                className="block h-full bg-surface-card p-6 ring-1 ring-hairline transition-transform duration-[var(--duration-base)] hover:-translate-y-1 hover:ring-gold"
              >
                <h2 className="font-display text-xl font-bold text-ink">
                  {suburb.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {suburbNote(suburb)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
