import { Hero } from "@/components/sections/hero";
import { QuickBookingBar } from "@/components/sections/quick-booking-bar";
import { TrustBlock } from "@/components/sections/trust-block";
import { ServicesGrid } from "@/components/sections/services-grid";
import { HostCard } from "@/components/sections/host-card";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { SuburbLinks } from "@/components/sections/suburb-links";
import { FaqSection } from "@/components/sections/faq-section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  business,
  fullAddress,
  hoursSummary,
  suburbs,
  telHref,
  whatsappHref,
  type Faq,
} from "@/lib/business";

// Built from the business data so the answers can't drift from the facts.
const homeFaqs: Faq[] = [
  {
    q: "What does Memon Motors do?",
    a: `Memon Motors is a Truganina workshop that handles roadworthy certificates, mechanical repairs and servicing, car rentals, and vehicle sale and purchase, all from one site at ${fullAddress}.`,
  },
  {
    q: "Where is Memon Motors and when is it open?",
    a: `${fullAddress}. Open ${hoursSummary()}. Appointments are recommended, so call ${business.phoneDisplay} before you come.`,
  },
  {
    q: "How do I book a roadworthy certificate, repair or rental?",
    a: `Call ${business.phoneDisplay}, message us on WhatsApp, or use the booking bar at the top of this page. We'll confirm a time with you.`,
  },
  {
    q: "Which suburbs do you serve?",
    a: `We're based in Truganina and customers come from across Melbourne's west. Approximate driving times from our workshop: ${suburbs
      .map((s) => `${s.name} about ${s.driveMin} minutes`)
      .join(", ")}.`,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="relative z-10 -mt-10 w-full px-6 sm:px-10 xl:px-16">
        <QuickBookingBar />
      </section>

      <section className="w-full px-6 py-20 sm:px-10 sm:py-28 xl:px-16">
        <TrustBlock />
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="w-full px-6 sm:px-10 xl:px-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Everything your car needs, from one Truganina workshop.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Roadworthy certificates, mechanical repairs, rentals and vehicle
              sales, handled by the same team, at prices our reviews keep
              calling fair.
            </p>
          </div>
          <div className="mt-10">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-20 sm:px-10 sm:py-28 xl:px-16">
        <HostCard />
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="w-full px-6 sm:px-10 xl:px-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              What Truganina says.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Real reviews from Google. Nothing written for this page.
            </p>
          </div>
          <div className="mt-10">
            <ReviewsSection limit={6} />
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-20 sm:px-10 sm:py-28 xl:px-16">
        <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
          Areas we serve.
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
          Based at 37A Dunmore Dr, Truganina, a short drive from across
          Melbourne&apos;s west.
        </p>
        <div className="mt-8">
          <SuburbLinks />
        </div>
      </section>

      <section className="w-full px-6 py-20 sm:px-10 sm:py-28 xl:px-16">
        <FaqSection
          faqs={homeFaqs}
          id="home-faq"
          heading="Common questions."
          headingClassName="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl"
        />
      </section>

      <section className="bg-surface py-20 text-ink sm:py-28">
        <div className="w-full px-6 sm:px-10 xl:px-16">
          <Reveal as="div" className="flex flex-col items-start gap-6">
            <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
              Need your car sorted? Call Memon Motors directly.
            </h2>
            <p className="max-w-xl text-ink/70">
              No call centres, no booking queues. You&apos;ll speak to the
              person doing the work.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={telHref} variant="primary" size="lg">
                Call now
              </Button>
              <Button
                href={whatsappHref("Hi Memon Motors, I'd like to ask about...")}
                variant="gold"
                size="lg"
              >
                Message on WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
