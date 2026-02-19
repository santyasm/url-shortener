import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: process.env.DOTENV_FILE || ".env.test" });

const baseURL = process.env.E2E_BASE_URL || "http://localhost:5173";
const headless =
  process.env.E2E_HEADLESS === "false" ? false : process.env.CI ? true : true;
const retries = process.env.CI ? 2 : 1;
const browserList: string[] = (process.env.E2E_BROWSERS || "chromium,webkit")
  .split(",")
  .map((s: string) => s.trim().toLowerCase());
const channelVar = (process.env.E2E_CHANNEL || "").toLowerCase();
const chromiumUse = ["chrome", "msedge"].includes(channelVar)
  ? { ...devices["Desktop Chrome"], channel: channelVar as "chrome" | "msedge" }
  : { ...devices["Desktop Chrome"] };

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  retries,
  reporter: [["list"], ["html", { outputFolder: "tests/results/html" }]],
  use: {
    baseURL,
    headless,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  projects: [
    browserList.includes("chromium")
      ? { name: "chromium", use: chromiumUse }
      : undefined,
    browserList.includes("webkit")
      ? { name: "webkit", use: { ...devices["Desktop Safari"] } }
      : undefined,
  ].filter(Boolean) as any,
  webServer: {
    command: "npm run preview:serve",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
