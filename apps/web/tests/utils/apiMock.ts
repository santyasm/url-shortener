import type { Page } from "@playwright/test";

export type Link = {
  id: string;
  slug: string;
  destination: string;
  createdAt: string;
  clickCount: number;
  expiresAt?: string | null;
  lastAccessAt?: string | null;
};

export async function mockList(
  page: Page,
  items: Link[],
): Promise<{ set: (items: Link[]) => void }> {
  let current = items.slice();
  await page.route("**/api/links", (route) => {
    if (route.request().method() === "GET") {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(current),
      });
      return;
    }
    route.fallback();
  });
  return {
    set(next: Link[]) {
      current = next.slice();
    },
  };
}

export async function mockCreate(
  page: Page,
  createHandler?: (body: any) => Link,
) {
  await page.route("**/api/links", async (route) => {
    if (route.request().method() === "POST") {
      const body = await route.request().postDataJSON();
      const link: Link =
        createHandler?.(body) ??
        {
          id: "test-id",
          slug: body.slug || "test-slug",
          destination: body.destination,
          createdAt: new Date().toISOString(),
          clickCount: 0,
          expiresAt: body.expiresAt ?? null,
          lastAccessAt: null,
        };
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: link.id,
          slug: link.slug,
          shortUrl: `http://localhost:8787/${link.slug}`,
          destination: link.destination,
          expiresAt: link.expiresAt,
          maxClicks: body.maxClicks ?? null,
        }),
      });
      return;
    }
    route.fallback();
  });
}

