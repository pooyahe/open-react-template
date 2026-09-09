"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      privacyAccepted: formData.get("privacyAccepted") === "on",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Die Nachricht konnte nicht gesendet werden.");
      }

      form.reset();
      setStatus("success");
      setFeedback("Vielen Dank. Ihre Nachricht wurde erfolgreich gesendet.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Die Nachricht konnte nicht gesendet werden.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.25rem] bg-white p-6 text-[var(--ink)] shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="contact-name">Name *</label>
          <input className="form-field" id="contact-name" name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required />
        </div>
        <div>
          <label className="field-label" htmlFor="contact-email">E-Mail *</label>
          <input className="form-field" id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
        <div>
          <label className="field-label" htmlFor="contact-company">Unternehmen</label>
          <input className="form-field" id="contact-company" name="company" type="text" autoComplete="organization" maxLength={120} />
        </div>
        <div>
          <label className="field-label" htmlFor="contact-phone">Telefon</label>
          <input className="form-field" id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={50} />
        </div>
      </div>

      <div className="mt-5">
        <label className="field-label" htmlFor="contact-message">Worum geht es? *</label>
        <textarea className="form-field min-h-36 resize-y" id="contact-message" name="message" minLength={20} maxLength={3000} required placeholder="Beschreiben Sie kurz Ihren aktuellen Prozess oder Ihre Herausforderung." />
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[var(--muted)]" htmlFor="contact-privacy">
        <input id="contact-privacy" name="privacyAccepted" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-blue-600" />
        <span>Ich habe die <Link href="/datenschutz" className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2">Datenschutzhinweise</Link> zur Verarbeitung meiner Anfrage gelesen. *</span>
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button className="button-primary disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet …" : "Nachricht senden"}
        </button>
        <p className={`text-sm leading-6 ${status === "error" ? "text-red-700" : status === "success" ? "text-green-700" : "text-[var(--muted)]"}`} role="status" aria-live="polite">
          {feedback || "Pflichtfelder sind mit * gekennzeichnet."}
        </p>
      </div>
    </form>
  );
}
