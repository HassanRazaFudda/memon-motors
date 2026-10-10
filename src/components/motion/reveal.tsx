"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds between each direct child's entrance. */
  stagger?: number;
  /** Vertical travel distance in pixels. */
  distance?: number;
}

/**
 * Staggers the direct children of the wrapped element in as one orchestrated
 * group entrance when it scrolls into view — not an individual fade-up
 * applied to every element on the page (see frontend-design skill: scattered
 * per-element fades read as generic/AI-templated).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = 0.1,
  distance = 28,
}: RevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const targets = Array.from(el.children);
      if (targets.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: distance });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger,
          }),
      });
    },
    { scope: containerRef }
  );

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}
