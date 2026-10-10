import Link from "next/link";
import Image from "next/image";
import {
  business,
  formatHourRange,
  fullAddress,
  hours,
  mapsHref,
  suburbs,
  telHref,
  whatsappHref,
} from "@/lib/business";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas text-ink">
      <div className="w-full px-4 py-16 sm:px-10 xl:px-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Memon Motors"
                width={44}
                height={44}
                className="h-11 w-auto"
              />
              <span className="font-display text-lg font-bold">{business.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              {business.tagline}. Roadworthy certificates, mechanical repairs,
              car rentals and vehicle sales in Truganina.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-gold-light">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 break-words text-sm text-ink/75">
              <li>
                <a href={telHref} className="hover:text-ink">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref("Hi Memon Motors, I'd like to ask about...")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="hover:text-ink">
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink"
                >
                  {fullAddress}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-gold-light">
              Hours
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink/75">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day.slice(0, 3)}</span>
                  <span>{formatHourRange(h)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-gold-light">
              Areas we serve
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-ink/75">
              {suburbs.map((s) => (
                <li key={s.slug}>
                  <Link href={`/areas/${s.slug}`} className="hover:text-ink">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-md ring-1 ring-hairline">
          <iframe
            title={`${business.name} location map`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              fullAddress
            )}&z=15&output=embed`}
            width="100%"
            height="280"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {business.name} · ABN {business.abn}
          </p>
          <p>{fullAddress}</p>
        </div>
      </div>
    </footer>
  );
}
