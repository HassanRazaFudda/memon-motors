"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { business, telHref, whatsappHref } from "@/lib/business";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-bleed real workshop photography is the primary depth mechanism here
 * (DESIGN.md / BMW M: "the system has no decorative voltage of its own —
 * energy comes from full-bleed photography"), not a stock luxury-car shot —
 * see CLAUDE.md Non-Goals. The scroll-pinned zoom on the photo itself is
 * the one orchestrated motion moment for the page (frontend-design skill:
 * spend boldness in one place).
 *
 * Desktop only: ScrollTrigger.matchMedia keeps mobile on a static, fast
 * hero — pinning eats scroll real estate and adds jank on small screens,
 * and CLAUDE.md prioritizes mobile LCP/speed-to-phone-number over the
 * effect there. Gated on `(hover: hover) and (pointer: fine)` in addition
 * to width — a touch phone with "Request Desktop Site" on reports a
 * desktop-width viewport but is still touch input, and pin + Lenis +
 * touch-scroll on a real device mis-measured the pin-spacer height badly
 * enough to collapse the whole page layout. hover/pointer reflect actual
 * input hardware and aren't spoofed by that viewport override.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (hover: hover) and (pointer: fine)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=70%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(
          photoRef.current,
          { scale: 1.18, ease: "none", force3D: true },
          0
        ).to(
          contentRef.current,
          { opacity: 0, y: -32, filter: "blur(6px)", ease: "none", force3D: true },
          0.1
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-canvas text-ink sm:min-h-[min(85svh,820px)]"
    >
      <div ref={photoRef} className="absolute inset-0 will-change-transform" aria-hidden>
        <Image
          src="/images/vehicle-sales.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 to-canvas/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/70 via-canvas/10 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-4 py-16 sm:px-10">
        <div ref={contentRef} className="max-w-3xl">
          <div className="gold-stripe mb-6 h-1 w-16" aria-hidden />

          <h1 className="font-display text-6xl font-black uppercase leading-[0.98] tracking-tight sm:text-7xl lg:text-[88px]">
            The name
            <br />
            you can trust.
          </h1>

          <p className="mt-7 max-w-xl text-lg text-ink-soft sm:text-xl">
            Roadworthy certificates, mechanical repairs, car rentals and
            vehicle sales from one Truganina workshop, serving Melbourne&apos;s
            western suburbs.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-black text-gold-light">
                {business.rating.value}
              </span>
              <span className="text-sm leading-tight text-ink-soft">
                ★ rating
                <br />
                {business.rating.countLabel} Google reviews
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={telHref} variant="primary" size="lg">
              Call {business.phoneDisplay}
            </Button>
            <Button
              href={whatsappHref("Hi Memon Motors, I'd like to ask about...")}
              variant="secondary"
              size="lg"
              className="text-ink ring-ink hover:bg-ink/10"
            >
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
