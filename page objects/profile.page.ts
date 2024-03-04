import { FrameLocator, type Locator, type Page } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  static readonly url = 'https://profile.onliner.by/';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(ProfilePage.url);
  }
}