"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { business, hours, telHref, whatsappHref } from "@/lib/business";

/** No-op subscription — the clock never pushes updates, we just need one read. */
function subscribe() {
  return () => {};
}

function getServerIsOpen(): boolean | null {
  return null;
}

/** Returns a plain boolean so useSyncExternalStore's Object.is check is stable. */
function getClientIsOpen(): boolean {
  const now = new Date();
  const todayHours = hours[(now.getDay() + 6) % 7]; // hours[] starts Monday
  if (!todayHours.open || !todayHours.close) return false;

  const [openH, openM] = todayHours.open.split(":").map(Number);
  const [closeH, closeM] = todayHours.close.split(":").map(Number);
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  return minutesNow >= openH * 60 + openM && minutesNow < closeH * 60 + closeM;
}

export function StickyBookingCard() {
  const isOpen = useSyncExternalStore(subscribe, getClientIsOpen, getServerIsOpen);

  return (
    <div className="bg-surface-card p-6 ring-1 ring-hairline">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink">Get in touch</h3>
        {isOpen !== null && (
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
              isOpen ? "text-green-400" : "text-muted"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOpen ? "bg-green-400" : "bg-muted-soft"
              }`}
              aria-hidden
            />
            {isOpen ? "Open now" : "Closed now"}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-ink-soft">
        {business.rating.value}★ from {business.rating.countLabel} Google reviews.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        <Button href={telHref} variant="primary" size="lg" className="w-full">
          Call {business.phoneDisplay}
        </Button>
        <Button
          href={whatsappHref("Hi Memon Motors, I'd like to ask about...")}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          WhatsApp us
        </Button>
      </div>

      <p className="mt-4 text-xs text-muted">
        {business.address.street}, {business.address.suburb}{" "}
        {business.address.state} {business.address.postcode}
      </p>
    </div>
  );
}
