import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { TrustBlock } from "@/components/sections/trust-block";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StickyBookingCard } from "@/components/sections/sticky-booking-card";
import { Button } from "@/components/ui/button";
import { suburbAreaSchema, breadcrumbSchema } from "@/lib/schema";
import {
  business,
  directionsFromHref,
  fullAddress,
  hoursSummary,
  suburbBySlug,
  suburbNote,
  suburbs,
} from "@/lib/business";

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
    title: `Mechanic & Roadworthy in ${suburb.name}`,
    description: `Roadworthy certificates, mechanical repairs and car rentals for ${suburb.name} customers. About ${suburb.driveMin} minutes by road from Memon Motors in Truganina.`,
  };
}

export default async function SuburbPage(props: PageProps<"/areas/[suburb]">) {
  const { suburb: slug } = await props.params;
  const suburb = suburbBySlug(slug);
  if (!suburb) notFound();

  return (
    <>
      <JsonLd data={suburbAreaSchema(suburb.name)} />
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
              {suburbNote(suburb)}
            </p>

            <div className="mt-12 max-w-2xl">
              <h2 className="font-display text-2xl font-black tracking-tight text-ink">
                Getting to Memon Motors from {suburb.name}
              </h2>
              <dl className="mt-6 grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3">
                <div className="bg-surface-card p-5">
                  <dt className="text-sm text-muted">Driving time</dt>
                  <dd className="mt-1 font-display text-2xl font-black text-ink">
                    About {suburb.driveMin} min
                  </dd>
                </div>
                <div className="bg-surface-card p-5">
                  <dt className="text-sm text-muted">Distance</dt>
                  <dd className="mt-1 font-display text-2xl font-black text-ink">
                    {suburb.driveKm} km
                  </dd>
                </div>
                <div className="col-span-2 bg-surface-card p-5 sm:col-span-1">
                  <dt className="text-sm text-muted">Main roads</dt>
                  <dd className="mt-1 text-[17px] font-semibold text-ink">
                    {suburb.via.join(", ")}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-muted">
                Approximate off-peak figures from {suburb.name}&apos;s centre,
                estimated with OpenStreetMap routing. Allow longer in peak
                traffic.
              </p>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-soft">
                {business.name}, {fullAddress}. Open {hoursSummary()}.
              </p>
              <div className="mt-6">
                <Button href={directionsFromHref(suburb)} variant="primary" size="lg">
                  Get directions from {suburb.name}
                </Button>
              </div>
            </div>

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
