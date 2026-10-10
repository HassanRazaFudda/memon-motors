"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Next.js remounts `template.tsx` on every navigation (initial load
 * included), unlike `layout.tsx` which persists. Paired with
 * PageTransitionOverlay: the overlay covers the swap, this settles the new
 * content in as the overlay clears, so the two read as one motion instead
 * of two disconnected effects.
 */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.15,
          // Without this, GSAP leaves an inline `transform: matrix(1,0,0,1,0,0)`
          // on this wrapper after the tween ends. That's a visual no-op, but any
          // non-`none` transform on an ancestor creates a new containing block
          // for `position: fixed` descendants — which silently broke the Hero's
          // GSAP ScrollTrigger pin (it was pinning relative to this div instead
          // of the viewport, so the "pinned" photo scrolled away with the page).
          clearProps: "transform",
        }
      );
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
