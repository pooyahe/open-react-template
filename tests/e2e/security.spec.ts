import { expect, test } from "@playwright/test";

test("security headers are present on the homepage and legal routes", async ({ request }) => {
  for (const path of ["/", "/impressum", "/datenschutz"]) {
    const response = await request.get(path);
    const headers = response.headers();

    expect(response.ok()).toBe(true);
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy-report-only"]).toContain("default-src 'self'");
    expect(headers["content-security-policy-report-only"]).toContain("script-src 'self'");
    expect(headers["content-security-policy-report-only"]).not.toContain("unsafe-eval");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["cross-origin-opener-policy"]).toBe("same-origin");
    expect(headers["cross-origin-resource-policy"]).toBe("same-origin");
    expect(headers["strict-transport-security"]).toBeUndefined();
  }
});

test("contact endpoint rejects incomplete submissions", async ({ request }) => {
  const response = await request.post("/api/contact", {
    data: { name: "", company: "", email: "not-an-email", message: "" },
  });

  expect(response.status()).toBe(400);
  await expect(response.json()).resolves.toMatchObject({ error: expect.any(String) });
});
