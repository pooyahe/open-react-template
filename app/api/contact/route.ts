import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, { count: number; resetAt: number }>();

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function allowedRequest(key: string) {
  const now = Date.now();
  const current = requestLog.get(key);
  if (!current || current.resetAt <= now) {
    requestLog.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_REQUESTS_PER_WINDOW) return false;
  current.count += 1;
  return true;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Die Anfrage ist zu groß." }, { status: 413 });
  }

  if (!allowedRequest(clientKey(request))) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      { status: 429, headers: { "Retry-After": "3600" } },
    );
  }

  let payload: ContactPayload;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Die Anfrage ist zu groß." }, { status: 413 });
    }
    payload = JSON.parse(rawBody) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Die Anfrage konnte nicht gelesen werden." }, { status: 400 });
  }

  // Quietly accept honeypot submissions so automated clients do not learn the rule.
  if (text(payload.website, 100)) return NextResponse.json({ ok: true });

  const name = text(payload.name, 100);
  const company = text(payload.company, 120);
  const email = text(payload.email, 254);
  const phone = text(payload.phone, 40);
  const message = text(payload.message, 4000);

  if (!name || !company || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Bitte füllen Sie Name, Unternehmen, E-Mail und Beschreibung korrekt aus." },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Das Formular ist noch nicht mit dem E-Mail-Dienst verbunden. Bitte nutzen Sie die E-Mail-Adresse als Alternative." },
      { status: 503 },
    );
  }

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || siteConfig.email;
  const sender = process.env.CONTACT_SENDER_EMAIL || "website@aktenkompass.de";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: siteConfig.name, email: sender },
        to: [{ email: recipient }],
        replyTo: { email, name },
        subject: `Neue Anfrage von ${name} – ${company}`,
        htmlContent: [
          `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
          `<p><strong>Unternehmen:</strong> ${escapeHtml(company)}</p>`,
          `<p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>`,
          phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : "",
          `<p><strong>Beschreibung:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
        ].join(""),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Die Anfrage konnte gerade nicht versendet werden." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Die Anfrage konnte gerade nicht versendet werden." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
