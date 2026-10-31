import type { Metadata } from "next";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StickyBookingCard } from "@/components/sections/sticky-booking-card";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Mechanic, Roadworthy, Rentals & Sales",
  description:
    "Roadworthy certificates, mechanical repairs and servicing, car rentals and vehicle sale & purchase at Memon Motors, 37A Dunmore Dr, Truganina VIC.",
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />

      <section className="w-full px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Services
            </h1>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              Roadworthy certificates, mechanical repairs, car rentals and
              vehicle sales, all handled by the same workshop in Truganina.
            </p>
            <div className="mt-10">
              <ServicesGrid />
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
