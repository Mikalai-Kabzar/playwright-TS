import { type Locator, type Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchBar: Locator;
  readonly searchModal: Locator;
  readonly productsPanel: Locator;
  static readonly expandedSearchModalClass = 'modal modal_open';
  static readonly collapsedSearchModalClass = 'modal';


  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.locator('.fast-search__input');
    this.searchBar = this.page.locator('.search__bar');
    this.searchModal = this.page.locator('#fast-search-modal');
    this.productsPanel = this.page.locator('.project-navigation__sign');
  }

  async goto() {
    await this.page.goto('https://www.onliner.by/');
  }



}