import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { TrustBlock } from "@/components/sections/trust-block";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { breadcrumbSchema } from "@/lib/schema";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Reviews",
  description: `${business.rating.value}★ from ${business.rating.count}+ Google reviews: real feedback from Memon Motors customers in Truganina.`,
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Reviews", url: "/reviews" },
        ])}
      />

      <section className="w-full px-6 py-16 sm:px-10 sm:py-24">
        <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
          Reviews
        </h1>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          Pulled from Google. Nothing here was written for this page.
        </p>

        <div className="mt-12">
          <TrustBlock />
        </div>

        <div className="mt-14">
          <ReviewsSection />
        </div>
      </section>
    </>
  );
}
