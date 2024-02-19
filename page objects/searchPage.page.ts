import { type Locator, type Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  //readonly crossButton: Locator;
  static readonly crossButton = '.search__close';


  constructor(page: Page) {
    this.page = page;

    //this.crossButton = this.page.locator('.search__close');

  }


}