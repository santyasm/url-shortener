import { test, expect } from "../fixtures/testFixtures";
import { mockList } from "../utils/apiMock";

test("carregamento da home", async ({ page, app }) => {
  await mockList(page, []);
  await app.goto();

  await expect(app.header()).toHaveText("URL Shortener");
  await expect(app.destinationInput()).toBeVisible();
  await expect(app.slugInput()).toBeVisible();
  await expect(app.expiresInput()).toBeVisible();
  await expect(app.maxClicksInput()).toBeVisible();
  await expect(app.shortenButton()).toBeVisible();
});

