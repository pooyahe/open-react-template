"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/config/site";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Die Anfrage konnte nicht versendet werden.");
      form.reset();
      setState("success");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Die Anfrage konnte nicht versendet werden.");
      setState("error");
    }
  }

  return (
    <div id="kontakt-formular" className="site-container mt-12 rounded-[1.25rem] bg-white p-6 text-[var(--ink)] shadow-sm sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Problem beschreiben</p>
          <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">Wobei dürfen wir Sie unterstützen?</h3>
          <p className="mt-4 leading-7 text-[var(--muted)]">Beschreiben Sie kurz Ihre aktuelle Herausforderung. Wir melden uns für ein unverbindliches Erstgespräch.</p>
          <p className="mt-5 text-sm leading-6 text-[var(--muted)]">Ihre Angaben werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Pflichtfelder sind mit * gekennzeichnet.</p>
        </div>
        <form className="grid gap-4 rounded-xl border-2 border-blue-100 bg-[var(--page-bg)] p-4 sm:p-5" onSubmit={submit} noValidate>
          <p className="-mb-1 text-sm font-semibold text-[var(--ink)]">Beginnen Sie hier – wir melden uns innerhalb von zwei Werktagen.</p>
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="contact-form-label grid gap-2 text-sm font-semibold" htmlFor="contact-name">Name *<input id="contact-name" name="name" required maxLength={100} autoComplete="name" className="contact-form-field" /></label>
            <label className="contact-form-label grid gap-2 text-sm font-semibold" htmlFor="contact-company">Unternehmen *<input id="contact-company" name="company" required maxLength={120} autoComplete="organization" className="contact-form-field" /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="contact-form-label grid gap-2 text-sm font-semibold" htmlFor="contact-email">E-Mail *<input id="contact-email" name="email" required type="email" maxLength={254} autoComplete="email" className="contact-form-field" /></label>
            <label className="contact-form-label grid gap-2 text-sm font-semibold" htmlFor="contact-phone">Telefon <input id="contact-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className="contact-form-field" /></label>
          </div>
          <label className="contact-form-label grid gap-2 text-sm font-semibold" htmlFor="contact-message">Ihre Herausforderung *<textarea id="contact-message" name="message" required maxLength={4000} rows={5} className="contact-form-field" /></label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button className="button-primary contact-form-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Wird gesendet …" : "Anfrage senden"}</button>
            <a className="text-sm font-semibold text-blue-700 underline underline-offset-4" href={`mailto:${siteConfig.email}`}>Alternativ per E-Mail</a>
          </div>
          <p aria-live="polite" className={state === "success" ? "text-sm font-semibold text-green-700" : "text-sm text-red-700"}>{state === "success" ? "Vielen Dank. Ihre Anfrage wurde übermittelt." : state === "error" ? error : ""}</p>
        </form>
      </div>
    </div>
  );
}
