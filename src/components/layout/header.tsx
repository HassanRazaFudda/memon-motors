"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { business, telHref } from "@/lib/business";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas we serve" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas text-ink">
      <div className="flex w-full items-center justify-between px-4 py-2 sm:px-10 sm:py-3 xl:px-16">
        <Link
          href="/"
          className="flex flex-col items-center gap-1"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-11 w-[103px] shrink-0 sm:h-[66px] sm:w-[155px]">
            <Image
              src="/logo.png"
              alt="Memon Motors"
              fill
              sizes="(min-width: 640px) 137px, 103px"
              className="object-cover object-center"
              priority
            />
          </div>
          <span className="font-display text-base font-bold tracking-tight whitespace-nowrap sm:text-xl">
            Memon Motors
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-display text-base font-semibold tracking-tight text-ink/75 transition-colors duration-[var(--duration-fast)] hover:text-gold-light",
                  active && "text-gold-light"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button href={telHref} variant="primary" size="md">
            Call {business.phoneDisplay}
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 cursor-pointer items-center justify-center"
          >
            <span className="relative block h-4 w-6" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-6 bg-ink transition-transform duration-[var(--duration-fast)]",
                  open && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-0.5 w-6 bg-ink transition-opacity duration-[var(--duration-fast)]",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[14px] h-0.5 w-6 bg-ink transition-transform duration-[var(--duration-fast)]",
                  open && "-translate-y-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden transition-[max-height] duration-[var(--duration-base)] ease-[var(--ease-out-smooth)] md:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 border-t border-hairline px-4 pb-6 pt-4 sm:px-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 font-display text-base font-semibold text-ink/85 hover:text-gold-light"
            >
              {link.label}
            </Link>
          ))}
          <Button href={telHref} variant="primary" size="md" className="mt-4 w-full">
            Call {business.phoneDisplay}
          </Button>
        </nav>
      </div>
    </header>
  );
}
