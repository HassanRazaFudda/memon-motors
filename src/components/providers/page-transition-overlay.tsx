"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";

/**
 * A brief branded moment on client-side route changes — logo scales in,
 * holds, fades out revealing the new page. Never runs on first load (that
 * would be the Wiemer-style preload-splash CLAUDE.md explicitly rules out
 * for a "mechanic near me" site where speed-to-phone-number matters); this
 * only fires on *subsequent* navigations, after the first page already
 * painted, so it costs nothing on the metric that matters.
 */
export function PageTransitionOverlay() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const el = overlayRef.current;
    const logo = logoRef.current;
    if (!el || !logo) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();
    tl.set(el, { autoAlpha: 1 })
      .set(logo, { scale: 0.82, autoAlpha: 0 })
      .to(logo, { autoAlpha: 1, scale: 1, duration: 0.28, ease: "power2.out" })
      .to(logo, { autoAlpha: 0, duration: 0.2, ease: "power1.in" }, "+=0.1")
      .to(el, { autoAlpha: 0, duration: 0.35, ease: "power2.inOut" }, "-=0.05");

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="pointer-events-none invisible fixed inset-0 z-[100] flex items-center justify-center bg-canvas opacity-0"
    >
      <div ref={logoRef}>
        <Image
          src="/logo.png"
          alt=""
          width={160}
          height={160}
          className="h-28 w-auto sm:h-36"
        />
      </div>
    </div>
  );
}
