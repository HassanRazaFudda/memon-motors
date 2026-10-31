import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/sections/contact-form";
import { breadcrumbSchema } from "@/lib/schema";
import {
  business,
  formatHourRange,
  fullAddress,
  hours,
  hoursSummary,
  mapsHref,
  telHref,
  whatsappHref,
} from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact & Directions, Truganina Mechanic",
  description: `Call ${business.phoneDisplay}, WhatsApp or visit Memon Motors at ${fullAddress}. ${hoursSummary()}.`,
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />

      <section className="w-full px-6 py-16 sm:px-10 sm:py-24">
        <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          Call for the fastest response, or send a message below.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="min-w-0 space-y-10">
            <div className="bg-surface-card p-6 ring-1 ring-hairline">
              <dl className="space-y-5 break-words text-sm">
                <div>
                  <dt className="font-display text-xs font-bold uppercase tracking-wide text-muted">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a href={telHref} className="text-lg font-semibold text-ink hover:text-red">
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-xs font-bold uppercase tracking-wide text-muted">
                    WhatsApp
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={whatsappHref("Hi Memon Motors, I'd like to ask about...")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-ink hover:text-red"
                    >
                      Message us
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-xs font-bold uppercase tracking-wide text-muted">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${business.email}`}
                      className="text-lg font-semibold text-ink hover:text-red"
                    >
                      {business.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-xs font-bold uppercase tracking-wide text-muted">
                    Address
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-ink hover:text-red"
                    >
                      {fullAddress}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
                Hours
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6">
                    <span>{h.day}</span>
                    <span>
                      {formatHourRange(h)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-md shadow-card">
              <iframe
                title={`${business.name} location map`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  fullAddress
                )}&z=15&output=embed`}
                width="100%"
                height="300"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>

          <div className="min-w-0 bg-surface-card p-8 ring-1 ring-hairline">
            <h2 className="font-display text-xl font-bold text-ink">
              Send a message
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Opens WhatsApp with your message pre-filled.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
