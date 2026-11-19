import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { HostCard } from "@/components/sections/host-card";
import { TrustBlock } from "@/components/sections/trust-block";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { Reveal } from "@/components/motion/reveal";
import { breadcrumbSchema } from "@/lib/schema";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "About Our Truganina Workshop",
  description: `${business.name} is a Truganina auto workshop operated by ${business.legalName}, offering car servicing, mechanical repairs, tyres and roadworthy certificates.`,
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <section className="w-full px-6 py-16 sm:px-10 sm:py-24">
        <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
          About Memon Motors
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
          <Reveal as="div" className="max-w-2xl space-y-5">
            <p className="text-[17px] leading-relaxed text-ink-soft">
              Memon Motors is a Truganina workshop operated by ZHS Gadar Pty
              Ltd (ABN {business.abn}), a registered Australian company. One
              team handles car servicing, roadworthy certificates, brake,
              suspension and engine repairs, and tyres, for European, Japanese
              and everyday cars, from {business.address.street}.
            </p>
            <p className="text-[17px] leading-relaxed text-ink-soft">
              The thing customers mention most isn&apos;t a specific repair.
              It&apos;s being told the truth about what a car actually needs,
              at a price that doesn&apos;t feel inflated. That&apos;s the
              reputation the business has built one service and one repair at
              a time, and it&apos;s the standard every job is held to.
            </p>
          </Reveal>

          <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-card">
            <Image
              src="/images/workshop-bay.jpg"
              alt="Vehicles parked in a workshop bay during repairs"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-14">
          <TrustBlock />
        </div>

        <div className="mt-14">
          <HostCard />
        </div>

        <div className="mt-20">
          <h2 className="font-display text-2xl font-black tracking-tight text-ink">
            In their own words
          </h2>
          <div className="mt-6">
            <ReviewsSection limit={6} />
          </div>
        </div>
      </section>
    </>
  );
}
