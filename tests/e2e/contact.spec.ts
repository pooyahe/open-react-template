import { expect, test } from "@playwright/test";

test("contact form exposes labeled fields and privacy information", async ({ page }) => {
  await page.goto("/#kontakt");

  await expect(page.getByLabel("Name *")).toBeVisible();
  await expect(page.getByLabel("E-Mail *")).toBeVisible();
  await expect(page.getByLabel("Worum geht es? *")).toBeVisible();
  await expect(page.getByRole("link", { name: "Datenschutzhinweise" })).toHaveAttribute("href", "/datenschutz");
});

test("contact form reports a successful same-origin submission", async ({ page }) => {
  let submittedBody = "";
  let submittedUrl = "";
  await page.route("**/*", async (route) => {
    if (route.request().method() === "POST") {
      submittedBody = route.request().postData() || "";
      submittedUrl = route.request().url();
      await route.fulfill({ status: 200, contentType: "text/html", body: "ok" });
      return;
    }
    await route.continue();
  });
  await page.goto("/#kontakt");

  await page.getByLabel("Name *").fill("Erika Beispiel");
  await page.getByLabel("E-Mail *").fill("erika@example.com");
  await page.getByLabel("Worum geht es? *").fill("Wir möchten unsere Rechnungsablage digitalisieren.");
  await page.getByLabel(/Ich habe die Datenschutzhinweise/).check();
  await page.getByRole("button", { name: "Nachricht senden" }).click();

  await expect(page.getByRole("status")).toContainText("erfolgreich gesendet");
  await expect(page.getByLabel("Name *")).toHaveValue("");
  expect(submittedUrl).toContain("/__forms.html");
  expect(submittedBody).toContain("form-name=aktenkompass-contact");
});

test("contact form exposes Netlify form metadata and a honeypot", async ({ page }) => {
  await page.goto("/#kontakt");
  const form = page.locator('form[name="aktenkompass-contact"]');
  await expect(form).toHaveAttribute("method", "POST");
  await expect(form.locator('input[name="form-name"]')).toHaveValue("aktenkompass-contact");
  await expect(form.locator('input[name="website"]')).toHaveAttribute("tabindex", "-1");
});
