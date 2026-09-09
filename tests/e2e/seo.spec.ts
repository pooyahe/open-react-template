import { expect, test } from "@playwright/test";

test("preview metadata is fail-safe and German-first", async ({ page, request }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Dokumentenmanagement für kleine Unternehmen | AktenKompass");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Strukturierte digitale Dokumentenverwaltung, pragmatische Automatisierung und verständliche Datennutzung für kleine Unternehmen.",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex.*nofollow/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /icon\.svg/);
  await expect(page.locator('script[type="application/ld+json"]')).toContainText(
    '"@type":"WebSite"',
  );
  await expect(page.locator("head")).not.toContainText(/Cruip|Open Pro|SaaS|Web3|crypto/i);

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.status()).toBe(200);
  expect(await robotsResponse.text()).toMatch(/Disallow:\s*\//);

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  expect(await sitemapResponse.text()).not.toContain("aktenkompass.de");
});

test("route metadata and legal routes remain available", async ({ page }) => {
  for (const [path, title] of [["/impressum", "Impressum | AktenKompass"], ["/datenschutz", "Datenschutz | AktenKompass"]]) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute("lang", "de");
  }
});
