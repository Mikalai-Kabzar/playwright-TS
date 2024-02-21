import { type Locator, type Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchBar: Locator;
  readonly searchModal: Locator;
  readonly productsPanel: Locator;
  readonly navigationPanelButtons: Locator;
  readonly authBarButton: Locator;
  readonly authBarVKButton: Locator;
  readonly authBarGoogleButton: Locator;
  readonly authBarFbButton: Locator;
  static readonly expandedSearchModalClass = 'modal modal_open';
  static readonly collapsedSearchModalClass = 'modal';


  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.locator('.fast-search__input');
    this.searchBar = this.page.locator('.search__bar');
    this.searchModal = this.page.locator('#fast-search-modal');
    this.productsPanel = this.page.locator('.project-navigation__sign');
    this.navigationPanelButtons = this.page.locator('.b-main-navigation__text');
    this.authBarButton = this.page.locator('.auth-bar__item--text');
    this.authBarVKButton = this.page.locator('.auth-bar__item--vk-alter');
    this.authBarGoogleButton = this.page.locator('.auth-bar__item--gg');
    this.authBarFbButton = this.page.locator('.auth-bar__item--fb');
  }

  async goto() {
    await this.page.goto('https://www.onliner.by/');
  }



}