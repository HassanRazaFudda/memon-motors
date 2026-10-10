"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/business";

/**
 * No backend behind this site yet, so "submitting" opens a pre-filled
 * WhatsApp message — the channel the business already uses with customers
 * (see business-info.md: WhatsApp promoted on their own Facebook page) —
 * rather than a form that silently goes nowhere.
 */
export function ContactForm() {
  const nameId = useId();
  const messageId = useId();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = `Hi Memon Motors, my name is ${name}.\n\n${message}`;
    window.open(whatsappHref(text), "_blank", "noopener,noreferrer");
  }

  const fieldClasses =
    "w-full rounded-sm border border-hairline bg-surface-card px-4 py-3 text-sm text-ink outline-none focus-visible:border-red";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor={nameId} className="mb-1.5 block text-xs font-semibold text-muted">
          Your name
        </label>
        <input
          id={nameId}
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClasses}
        />
      </div>

      <div>
        <label htmlFor={messageId} className="mb-1.5 block text-xs font-semibold text-muted">
          What do you need?
        </label>
        <textarea
          id={messageId}
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={fieldClasses}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
        Send via WhatsApp
      </Button>
    </form>
  );
}
