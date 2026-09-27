"use client";

import * as React from "react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Button } from "@/components/ui/button";

const field =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground shadow-chip transition-[border-color,box-shadow] placeholder:text-muted-foreground/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
const label = "text-sm font-semibold text-foreground";

/**
 * Enquiry form. Without a backend it opens the visitor's email app with the message pre-filled.
 * To collect submissions server-side, replace `onSubmit` with a POST to your form provider or API route.
 */
export function ContactForm({ subject = "New project enquiry", submitLabel = "Send enquiry", audit = false }: { subject?: string; submitLabel?: string; audit?: boolean }) {
  const [sent, setSent] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "-"}`,
      `Interested in: ${data.get("service") || "-"}`,
      audit ? `Team size: ${data.get("teamSize") || "-"}` : null,
      "",
      String(data.get("message") ?? ""),
    ].filter((l) => l !== null);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-panel bg-card p-5 shadow-soft ring-1 ring-border/60 sm:p-8" aria-describedby="form-note">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={label}>Full name</label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Jane Smith" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={label}>Work email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="jane@company.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={label}>Company <span className="font-normal text-muted-foreground">(optional)</span></label>
          <input id="company" name="company" autoComplete="organization" className={field} />
        </div>
        {audit ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="teamSize" className={label}>Team size</label>
            <select id="teamSize" name="teamSize" className={field} defaultValue="">
              <option value="" disabled>Select a range</option>
              <option>1–10</option>
              <option>11–50</option>
              <option>51–200</option>
              <option>200+</option>
            </select>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label htmlFor="service" className={label}>What do you need?</label>
            <select id="service" name="service" className={field} defaultValue="">
              <option value="">Not sure yet</option>
              {services.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={label}>{audit ? "Which processes take the most time?" : "Tell us about the project"}</label>
        <textarea id="message" name="message" required rows={5} className={`${field} resize-y`} />
      </div>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-sm text-muted-foreground">
          We reply within one working day. Prefer email? Write to{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-accent underline underline-offset-4">{site.email}</a>.
        </p>
        <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">{submitLabel}</Button>
      </div>
      <p role="status" aria-live="polite" className="text-sm font-medium text-foreground empty:hidden">
        {sent ? "Your email app should now be open with your message ready to send." : ""}
      </p>
    </form>
  );
}
