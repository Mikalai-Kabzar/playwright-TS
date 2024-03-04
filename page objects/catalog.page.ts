import { FrameLocator, type Locator, type Page } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;
  static readonly url = 'https://catalog.onliner.by/';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(CatalogPage.url);
  }
}