"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { services, suburbs, whatsappHref } from "@/lib/business";

/**
 * Short booking flow (suburb → service → time) per CLAUDE.md — modeled on
 * Lube Mobile's pattern, deliberately not an 11-field form. There's no
 * backend yet, so submitting builds a pre-filled WhatsApp message instead
 * of a form that goes nowhere — a real, working path to a booking today.
 */
export function QuickBookingBar() {
  const suburbId = useId();
  const serviceId = useId();
  const timeId = useId();

  const [suburb, setSuburb] = useState("");
  const [service, setService] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const suburbName = suburbs.find((s) => s.slug === suburb)?.name ?? suburb;
    const serviceName =
      services.find((s) => s.slug === service)?.name ?? service;

    const message = [
      `Hi Memon Motors, I'd like to book:`,
      serviceName ? `Service: ${serviceName}` : null,
      suburbName ? `Suburb: ${suburbName}` : null,
      time ? `Preferred time: ${time}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
  }

  const fieldClasses =
    "h-12 w-full rounded-sm border border-hairline bg-surface-card px-4 text-sm text-ink outline-none focus-visible:border-red";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 bg-surface-card p-4 ring-1 ring-hairline sm:grid-cols-[1fr_1fr_1fr_auto] sm:gap-4 sm:p-5"
    >
      <div>
        <label htmlFor={suburbId} className="mb-1.5 block text-xs font-semibold text-muted">
          Suburb
        </label>
        <select
          id={suburbId}
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          required
          className={fieldClasses}
        >
          <option value="" disabled>
            Select your suburb
          </option>
          {suburbs.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={serviceId} className="mb-1.5 block text-xs font-semibold text-muted">
          Service
        </label>
        <select
          id={serviceId}
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          className={fieldClasses}
        >
          <option value="" disabled>
            What do you need?
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.shortName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={timeId} className="mb-1.5 block text-xs font-semibold text-muted">
          Preferred time
        </label>
        <input
          id={timeId}
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="e.g. Today afternoon"
          className={fieldClasses}
        />
      </div>

      <div className="flex items-end">
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          Request booking
        </Button>
      </div>
    </form>
  );
}
