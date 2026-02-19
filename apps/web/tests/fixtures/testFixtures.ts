import { test as base } from "@playwright/test";
import { AppPage } from "../utils/pages/AppPage";
import type { Page } from "@playwright/test";

type Fixtures = {
  app: AppPage;
};

export const test = base.extend<Fixtures>({
  app: async (
    { page }: { page: Page },
    provide: (app: AppPage) => Promise<void>,
  ) => {
    const app = new AppPage(page);
    await provide(app);
  },
});

export const expect = base.expect;
