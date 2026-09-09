import { expect, test } from "@playwright/test";

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test("privacy inventory remains same-origin at " + viewport.name, async ({ page }) => {
    await page.setViewportSize(viewport);
    const requests: string[] = [];
    page.on("request", (request) => requests.push(request.url()));

    await page.goto("/");
    await page.getByRole("link", { name: "Impressum" }).click();
    await expect(page).toHaveURL(/\/impressum$/);
    await expect(page.getByRole("heading", { name: "Angaben gemäß § 5 DDG" })).toBeVisible();
    await expect(page.getByText(/ausschließlich an Unternehmer/)).toBeVisible();
    await page.goto("/datenschutz");
    await expect(page.getByRole("heading", { name: "Datenschutz" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "5. Speicherdauer" })).toBeVisible();
    await expect(page.getByText(/spätestens sechs Monate/)).toBeVisible();
    await page.goto("/");

    if (viewport.name === "mobile") {
      await page.getByRole("button", { name: /Menü öffnen/ }).click();
      await expect(page.getByRole("navigation", { name: "Mobile Hauptnavigation" })).toBeVisible();
    } else {
      await page.getByRole("navigation", { name: "Hauptnavigation" }).getByRole("link", { name: "Leistungen" }).click();
    }

    const externalRequests = Array.from(new Set(
      requests
        .filter((url) => url.startsWith("http"))
        .map((url) => new URL(url).hostname)
        .filter((hostname) => hostname !== "127.0.0.1" && hostname !== "localhost"),
    ));
    const storage = await page.evaluate(async () => ({
      cookies: document.cookie,
      localStorage: Object.keys(localStorage),
      sessionStorage: Object.keys(sessionStorage),
      indexedDB: "databases" in indexedDB ? (await indexedDB.databases()).map(({ name }) => name ?? "") : [],
      serviceWorkers: "serviceWorker" in navigator ? (await navigator.serviceWorker.getRegistrations()).length : 0,
    }));

    console.log("[privacy:" + viewport.name + "] requests=" + JSON.stringify(requests));
    console.log("[privacy:" + viewport.name + "] externalHostnames=" + JSON.stringify(externalRequests));
    console.log("[privacy:" + viewport.name + "] storage=" + JSON.stringify(storage));
    expect(externalRequests).toEqual([]);
    expect(storage).toEqual({
      cookies: "",
      localStorage: [],
      sessionStorage: [],
      indexedDB: [],
      serviceWorkers: 0,
    });
  });
}
