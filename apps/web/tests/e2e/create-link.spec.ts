import { test, expect } from "../fixtures/testFixtures";
import type { Link } from "../utils/apiMock";

test("fluxo de criação de link pela UI", async ({ page, app }) => {
  let created: Link | null = null;
  let getCalls = 0;

  await page.route("**/api/links", async (route) => {
    const method = route.request().method();
    if (method === "GET") {
      getCalls++;
      const items = getCalls === 1 ? [] : created ? [created] : [];
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(items),
      });
      return;
    }
    if (method === "POST") {
      const body = await route.request().postDataJSON();
      created = {
        id: "id-1",
        slug: body.slug || "play-e2e",
        destination: body.destination,
        createdAt: new Date().toISOString(),
        clickCount: 0,
        expiresAt: body.expiresAt ?? null,
        lastAccessAt: null,
      };
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: created.id,
          slug: created.slug,
          shortUrl: `http://localhost:8787/${created.slug}`,
          destination: created.destination,
          expiresAt: created.expiresAt,
          maxClicks: body.maxClicks ?? null,
        }),
      });
      return;
    }
    route.fallback();
  });

  await app.goto();
  await app.createLinkUI({
    destination: "https://example.com",
    slug: "play-e2e",
  });
  await expect(app.shortUrlForSlug("play-e2e")).toContainText("play-e2e");
});

