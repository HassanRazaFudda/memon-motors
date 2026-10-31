import type { Faq } from "@/lib/business";

/**
 * Visible, answer-first Q&A. Rendered as plain headings and paragraphs (not a
 * collapsed accordion) so the full answer text is on the page for readers,
 * search engines and AI assistants alike. Deliberately no FAQPage JSON-LD:
 * Google only shows FAQ rich results for authoritative government and health
 * sites, so the markup would add weight without being eligible for anything.
 */
export function FaqSection({
  faqs,
  heading = "Common questions",
  id = "faq",
  headingClassName = "font-display text-lg font-bold text-ink",
}: {
  faqs: Faq[];
  heading?: string;
  id?: string;
  headingClassName?: string;
}) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className={headingClassName}>
        {heading}
      </h2>
      <div className="mt-6 max-w-2xl space-y-8">
        {faqs.map((faq) => (
          <div key={faq.q}>
            <h3 className="font-display text-base font-bold text-ink">
              {faq.q}
            </h3>
            <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
