import { type Locator, type Page } from '@playwright/test';

export class RealtPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly addressLabels: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.locator('.fast-search__input');
    this.addressLabels = this.page.locator("span.classified__caption-item_adress,span.classified__caption-line>span.classified__caption-item");


  }

  async goto() {
    await this.page.goto('https://r.onliner.by/pk/');
  }



}