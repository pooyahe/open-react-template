import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "small desktop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow mobile", width: 320, height: 700 },
];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  const metrics = await page.evaluate(() => ({
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
  }));
  const viewportWidth = page.viewportSize()?.width ?? "unknown";
  const offenders = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    return Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          label: `${element.tagName.toLowerCase()}.${element.className || "no-class"}`,
          right: Math.round(rect.right),
          left: Math.round(rect.left),
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
        };
      })
      .filter(({ right, left, scrollWidth, clientWidth }) =>
        right > viewport + 2 || left < -2 || scrollWidth > clientWidth + 2,
      )
      .slice(0, 5)
      .map(({ label, right, left, scrollWidth, clientWidth }) =>
        `${label} [${left}, ${right}; scroll ${scrollWidth}/${clientWidth}]`,
      )
      .join(", ");
  });
  expect(
    overflow,
    `Unexpected horizontal overflow at ${viewportWidth}px: ${offenders} (${JSON.stringify(metrics)})`,
  ).toBeLessThanOrEqual(2);
}

test("homepage renders an actionable primary CTA", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Weniger Papier. Mehr Zeit für Ihr Unternehmen.",
    }),
  ).toBeVisible();
  const cta = page.getByRole("link", { name: "Kostenloses Erstgespräch" }).first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", /mailto:info@aktenkompass\.de\?subject=/);
});

test("contact actions provide real email and telephone paths", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Problem beschreiben" })).toHaveAttribute(
    "href",
    /mailto:info@aktenkompass\.de\?subject=/,
  );
  await expect(page.getByRole("link", { name: "Erstgespräch vereinbaren" })).toHaveAttribute(
    "href",
    /mailto:info@aktenkompass\.de\?subject=/,
  );
  await expect(page.getByRole("link", { name: "Direkt anrufen" })).toHaveAttribute(
    "href",
    "tel:+4917657739809",
  );
  await expect(page.getByRole("link", { name: "info@aktenkompass.de" })).toHaveAttribute(
    "href",
    "mailto:info@aktenkompass.de",
  );
});

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: "Zum Inhalt springen" });
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

test("footer legal links resolve without a 404", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");

  await footer.getByRole("link", { name: "Impressum" }).click();
  await expect(page).toHaveURL(/\/impressum$/);
  await expect(page.getByRole("heading", { name: "Impressum" })).toBeVisible();

  await page.goto("/");
  await footer.getByRole("link", { name: "Datenschutz" }).click();
  await expect(page).toHaveURL(/\/datenschutz$/);
  await expect(page.getByRole("heading", { name: "Datenschutz" })).toBeVisible();
});

test("desktop navigation is keyboard reachable and actionable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const link = page
    .getByRole("navigation", { name: "Hauptnavigation" })
    .getByRole("link", { name: "Leistungen" });
  await expect(link).toBeVisible();

  let reached = false;
  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press("Tab");
    if (await link.evaluate((element) => element === document.activeElement)) {
      reached = true;
      break;
    }
  }

  expect(reached).toBe(true);
  await expect(link).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#leistungen$/);
});

test("mobile navigation opens, closes, and remains usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const openButton = page.getByRole("button", { name: /Menü öffnen/ });
  await expect(openButton).toBeVisible();
  await openButton.focus();
  await expect(openButton).toBeFocused();
  await page.keyboard.press("Enter");

  const mobileNavigation = page.getByRole("navigation", {
    name: "Mobile Hauptnavigation",
  });
  await expect(mobileNavigation).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await mobileNavigation.getByRole("link", { name: "Leistungen" }).focus();
  await page.keyboard.press("Escape");
  await expect(mobileNavigation).toBeHidden();
  await expect(openButton).toBeFocused();

  await openButton.click();
  await expect(mobileNavigation).toBeVisible();

  await mobileNavigation.getByRole("link", { name: "Leistungen" }).click();
  await expect(page).toHaveURL(/#leistungen$/);
  await expect(mobileNavigation).toBeHidden();

  const reopenedButton = page.getByRole("button", { name: /Menü öffnen/ });
  await reopenedButton.click();
  await expect(mobileNavigation).toBeVisible();
  await page.getByRole("button", { name: /Menü schließen/ }).click();
  await expect(mobileNavigation).toBeHidden();
});

test("interactive controls expose a visible focus indicator", async ({ page }) => {
  await page.goto("/");

  const cta = page.getByRole("link", { name: "Kostenloses Erstgespräch" }).first();
  await cta.focus();
  const focusStyle = await cta.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });

  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(focusStyle.outlineWidth).not.toBe("0px");
});

test("reduced motion keeps content available and disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});

test("essential content remains available at a 200 percent text-scale proxy", async ({ page }) => {
  await page.setViewportSize({ width: 620, height: 900 });
  await page.goto("/");
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "Kostenloses Erstgespräch" }).first()).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("keyboard smoke test keeps principal controls operable", async ({ page }) => {
  await page.goto("/");

  let visibleFocusCount = 0;
  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press("Tab");
    const isVisible = await page.evaluate(() => {
      const element = document.activeElement;
      if (!(element instanceof HTMLElement)) return false;
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    if (isVisible) visibleFocusCount += 1;
  }

  expect(visibleFocusCount).toBeGreaterThan(0);
  const cta = page.getByRole("link", { name: "Kostenloses Erstgespräch" }).first();
  await cta.focus();
  await expect(cta).toBeFocused();
  await expect(cta).toHaveAttribute("href", /mailto:info@aktenkompass\.de\?subject=/);
});

test("homepage has no unintended horizontal overflow at required widths", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Weniger Papier. Mehr Zeit für Ihr Unternehmen.",
      }),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});
