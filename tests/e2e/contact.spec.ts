import { expect, test } from "@playwright/test";

test("contact form exposes labeled fields and privacy information", async ({ page }) => {
  await page.goto("/#kontakt");

  await expect(page.getByLabel("Name *")).toBeVisible();
  await expect(page.getByLabel("E-Mail *")).toBeVisible();
  await expect(page.getByLabel("Worum geht es? *")).toBeVisible();
  await expect(page.getByRole("link", { name: "Datenschutzhinweise" })).toHaveAttribute("href", "/datenschutz");
});

test("contact form reports a successful same-origin submission", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "ok" }) });
  });
  await page.goto("/#kontakt");

  await page.getByLabel("Name *").fill("Erika Beispiel");
  await page.getByLabel("E-Mail *").fill("erika@example.com");
  await page.getByLabel("Worum geht es? *").fill("Wir möchten unsere Rechnungsablage digitalisieren.");
  await page.getByLabel(/Ich habe die Datenschutzhinweise/).check();
  await page.getByRole("button", { name: "Nachricht senden" }).click();

  await expect(page.getByRole("status")).toContainText("erfolgreich gesendet");
  await expect(page.getByLabel("Name *")).toHaveValue("");
});

test("contact endpoint rejects invalid input and absorbs honeypot submissions", async ({ request }) => {
  const invalid = await request.post("/api/contact", {
    data: { name: "X", email: "invalid", message: "short", privacyAccepted: false },
  });
  expect(invalid.status()).toBe(400);

  const bot = await request.post("/api/contact", {
    data: {
      name: "Bot Example",
      email: "bot@example.com",
      message: "This is a sufficiently long automated message.",
      website: "spam.example",
      privacyAccepted: true,
    },
  });
  expect(bot.status()).toBe(200);
});
