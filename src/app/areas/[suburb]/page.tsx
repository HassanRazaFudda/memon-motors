import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { TrustBlock } from "@/components/sections/trust-block";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StickyBookingCard } from "@/components/sections/sticky-booking-card";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import { suburbBySlug, suburbs } from "@/lib/business";

export function generateStaticParams() {
  return suburbs.map((suburb) => ({ suburb: suburb.slug }));
}

export async function generateMetadata(
  props: PageProps<"/areas/[suburb]">
): Promise<Metadata> {
  const { suburb: slug } = await props.params;
  const suburb = suburbBySlug(slug);
  if (!suburb) return {};

  return {
    title: `Mechanic in ${suburb.name}`,
    description: `Roadworthy certificates, mechanical repairs, car rentals and vehicle sales for ${suburb.name} customers, from Memon Motors in Truganina VIC.`,
  };
}

export default async function SuburbPage(props: PageProps<"/areas/[suburb]">) {
  const { suburb: slug } = await props.params;
  const suburb = suburbBySlug(slug);
  if (!suburb) notFound();

  return (
    <>
      <JsonLd data={localBusinessSchema(suburb.name)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Areas we serve", url: "/areas" },
          { name: suburb.name, url: `/areas/${suburb.slug}` },
        ])}
      />

      <section className="w-full px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <Link href="/areas" className="hover:text-ink">
            Areas we serve
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{suburb.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Mechanic in {suburb.name}
            </h1>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              {suburb.note}
            </p>

            <div className="mt-12">
              <TrustBlock />
            </div>

            <div className="mt-14">
              <h2 className="font-display text-2xl font-black tracking-tight text-ink">
                Services available to {suburb.name}
              </h2>
              <div className="mt-6">
                <ServicesGrid />
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <StickyBookingCard />
          </aside>
        </div>
      </section>
    </>
  );
}
