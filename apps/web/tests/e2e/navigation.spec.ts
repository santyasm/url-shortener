import { test, expect } from "../fixtures/testFixtures";
import { mockList, type Link } from "../utils/apiMock";

test("navegação para QR de um link", async ({ page, app }) => {
  const link: Link = {
    id: "id-qr",
    slug: "abc123",
    destination: "https://example.com",
    createdAt: new Date().toISOString(),
    clickCount: 0,
  };
  await mockList(page, [link]);
  await app.goto();

  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    app.qrLinkForSlug("abc123").click(),
  ]);

  expect(popup.url()).toContain("/api/links/abc123/qr");
});
