import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { StickyBookingCard } from "@/components/sections/sticky-booking-card";
import { FaqSection } from "@/components/sections/faq-section";
import { SuburbLinks } from "@/components/sections/suburb-links";
import { Reveal } from "@/components/motion/reveal";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { serviceBySlug, services } from "@/lib/business";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">
) {
  const { slug } = await props.params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.shortName, url: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceSchema(service)} />

      <section className="w-full px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{service.shortName}</span>
        </nav>

        <div className="relative mb-10 aspect-[21/9] overflow-hidden rounded-md">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <Reveal as="div">
              {service.priority && (
                <span className="font-display text-xs font-bold tracking-tight text-red">
                  Most requested
                </span>
              )}
              <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
                {service.name}
              </h1>

              <div className="mt-6 max-w-2xl space-y-4">
                {service.description.map((paragraph) => (
                  <p key={paragraph} className="text-[17px] leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>

              {service.tags && (
                <div className="mt-8">
                  <h2 className="font-display text-sm font-bold text-ink">
                    Covers
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-sm border border-hairline bg-surface-card px-3 py-1.5 text-sm text-ink-soft"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>

            {service.sections?.map((section) => (
              <div key={section.heading} className="mt-12 max-w-2xl">
                <h2 className="font-display text-lg font-bold text-ink">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-[17px] leading-relaxed text-ink-soft">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.source && (
                  <p className="mt-3 text-sm text-muted">
                    Source:{" "}
                    <a
                      href={section.source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-ink"
                    >
                      {section.source.label}
                    </a>
                  </p>
                )}
              </div>
            ))}

            {service.faqs && (
              <div className="mt-14 border-t border-hairline pt-10">
                <FaqSection faqs={service.faqs} id={`${service.slug}-faq`} />
              </div>
            )}

            <div className="mt-14 border-t border-hairline pt-10">
              <h2 className="font-display text-lg font-bold text-ink">
                Areas we serve
              </h2>
              <div className="mt-4">
                <SuburbLinks />
              </div>
            </div>

            <div className="mt-14 border-t border-hairline pt-10">
              <h2 className="font-display text-lg font-bold text-ink">
                Other services
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {otherServices.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/services/${other.slug}`}
                      className="block rounded-sm border border-hairline bg-surface-card px-4 py-3 text-sm font-semibold text-ink hover:border-gold"
                    >
                      {other.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
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
