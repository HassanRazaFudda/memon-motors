import Image from "next/image";
import { business, telHref } from "@/lib/business";
import { Button } from "@/components/ui/button";

export function HostCard() {
  return (
    <div className="flex flex-col gap-6 bg-surface-card p-8 ring-1 ring-hairline sm:flex-row sm:items-center">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-canvas-warm">
        <Image src="/logo.png" alt="" width={48} height={48} className="h-12 w-auto" />
      </div>

      <div className="flex-1">
        <p className="font-display text-xs font-bold uppercase tracking-wide text-muted">
          Why customers come back
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold text-ink">
          {business.name}
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Customers come back to Memon Motors and tell their neighbours
          about it. Reviews consistently point to straight answers, fair
          pricing, and work that&apos;s explained before it&apos;s done, not
          after.
        </p>
      </div>

      <Button href={telHref} variant="secondary" size="md" className="sm:shrink-0">
        Call Memon Motors
      </Button>
    </div>
  );
}
