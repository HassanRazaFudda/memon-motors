import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 font-display text-sm font-bold uppercase tracking-wider transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-smooth)] disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-red text-white hover:bg-red-light active:bg-red-dark",
  secondary:
    "bg-transparent text-ink ring-1 ring-inset ring-ink hover:bg-surface-card active:bg-surface-strong",
  ghost: "bg-transparent text-ink ring-1 ring-inset ring-hairline hover:bg-surface-card",
  gold: "bg-gold text-canvas-warm hover:bg-gold-light active:bg-gold-dark",
} as const;

const sizes = {
  md: "h-11 px-5",
  lg: "h-12 px-8",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface SharedProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = SharedProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonAsButton = SharedProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const isInternal = props.href.startsWith("/");
    const { href, ...rest } = props;

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
