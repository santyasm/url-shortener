import type { Page, Locator } from "@playwright/test";

export class AppPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  header(): Locator {
    return this.page.getByRole("heading", { level: 1 });
  }

  destinationInput(): Locator {
    return this.page.getByPlaceholder("https://example.com");
  }

  slugInput(): Locator {
    return this.page.getByPlaceholder("custom slug (optional)");
  }

  expiresInput(): Locator {
    return this.page.locator('input[type="datetime-local"]');
  }

  maxClicksInput(): Locator {
    return this.page.locator('input[type="number"]');
  }

  shortenButton(): Locator {
    return this.page.getByRole("button", { name: "Shorten" });
  }

  async createLinkUI(params: {
    destination: string;
    slug?: string;
    expiresAt?: string;
    maxClicks?: number;
  }) {
    const { destination, slug, expiresAt, maxClicks } = params;
    await this.destinationInput().fill(destination);
    if (slug) await this.slugInput().fill(slug);
    if (expiresAt) await this.expiresInput().fill(expiresAt);
    if (typeof maxClicks === "number")
      await this.maxClicksInput().fill(String(maxClicks));
    await this.shortenButton().click();
  }

  listItemBySlug(slug: string): Locator {
    return this.page
      .locator(".list .card")
      .filter({ has: this.page.locator("strong", { hasText: slug }) });
  }

  qrLinkForSlug(slug: string): Locator {
    return this.listItemBySlug(slug).getByRole("link", { name: "QR" });
  }

  shortUrlForSlug(slug: string): Locator {
    return this.listItemBySlug(slug).locator("strong");
  }
}

