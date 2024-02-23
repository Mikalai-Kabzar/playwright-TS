import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly authFormTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.authFormTitle = this.page.locator('.auth-form__title');
  }
}