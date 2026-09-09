import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const MAX_RATE_ENTRIES = 1_000;

type RateEntry = { count: number; resetAt: number };
const rateStore = new Map<string, RateEntry>();

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

function clientIp(request: NextRequest): string {
  return request.headers.get("x-nf-client-connection-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  if (rateStore.size >= MAX_RATE_ENTRIES) {
    rateStore.forEach((entry, storedKey) => {
      if (entry.resetAt <= now) rateStore.delete(storedKey);
    });
    if (rateStore.size >= MAX_RATE_ENTRIES) {
      const oldestKey = rateStore.keys().next().value as string | undefined;
      if (oldestKey) rateStore.delete(oldestKey);
    }
  }
  const current = rateStore.get(key);
  if (!current || current.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ message: "Ungültige Anfrage." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Die Anfrage ist zu groß." }, { status: 413 });
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Die Anfrage ist zu groß." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Ungültige Anfrage." }, { status: 400 });
  }

  // Silently accept bot-filled honeypots without sending an email.
  if (clean(body.website)) {
    return NextResponse.json({ message: "Vielen Dank. Ihre Nachricht wurde erfolgreich gesendet." });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { message: "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  const phone = clean(body.phone);
  const message = clean(body.message);
  const privacyAccepted = body.privacyAccepted === true;

  if (name.length < 2 || name.length > 100 || !isEmail(email) || email.length > 254 || company.length > 120 || phone.length > 50 || message.length < 2 || message.length > 3000 || !privacyAccepted) {
    return NextResponse.json({ message: "Bitte prüfen Sie die Pflichtfelder und Ihre Angaben." }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || siteConfig.email;
  if (!apiKey) {
    console.error("Contact delivery is not configured: BREVO_API_KEY is missing.");
    return NextResponse.json({ message: "Der Versand ist derzeit nicht verfügbar. Bitte nutzen Sie die angegebene E-Mail-Adresse." }, { status: 503 });
  }

  const safe = { name: escapeHtml(name), email: escapeHtml(email), company: escapeHtml(company), phone: escapeHtml(phone), message: escapeHtml(message).replace(/\n/g, "<br />") };
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": apiKey, Accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "AktenKompass Website", email: siteConfig.email },
        to: [{ email: recipient, name: "AktenKompass" }],
        replyTo: { email, name },
        subject: `Neue Website-Anfrage von ${name}`,
        textContent: [`Name: ${name}`, `E-Mail: ${email}`, `Unternehmen: ${company || "–"}`, `Telefon: ${phone || "–"}`, "", "Nachricht:", message].join("\n"),
        htmlContent: `<h2>Neue Anfrage über aktenkompass.de</h2><p><strong>Name:</strong> ${safe.name}<br><strong>E-Mail:</strong> ${safe.email}<br><strong>Unternehmen:</strong> ${safe.company || "–"}<br><strong>Telefon:</strong> ${safe.phone || "–"}</p><p><strong>Nachricht:</strong><br>${safe.message}</p>`,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Vielen Dank. Ihre Nachricht wurde erfolgreich gesendet." });
    }
    console.error("Brevo contact delivery failed with status", response.status);
  } catch {
    console.error("Brevo contact delivery failed before a response was received.");
  }

  return NextResponse.json(
    { message: "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt." },
    { status: 502 },
  );
}
