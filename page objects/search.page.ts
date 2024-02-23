import { type Locator, type Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  static readonly crossButton = '.search__close';

  constructor(page: Page) {
    this.page = page;
  }


}