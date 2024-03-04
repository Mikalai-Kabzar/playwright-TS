import { FrameLocator, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  static readonly url = 'https://cart.onliner.by/';
  readonly promoInput: Locator;
  readonly applyPromoButton: Locator;
  readonly errorMessageTitle: Locator;
  readonly yourCityButton: Locator;
  readonly changeCityButton: Locator;
  readonly changeCityInput: Locator;
  readonly changeCityCloseButton: Locator;
  readonly citiesDropdownItems: Locator;
  readonly cityNotFoundLabel: Locator;
  readonly noteYourCityLabel: Locator;
  readonly removeCityQueryButton: Locator;
  readonly catalogButton: Locator;
  readonly enterTheSiteButton: Locator;
  readonly mainPageNavigationButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.promoInput = this.page.locator(".cart-form__field input");
    this.applyPromoButton = this.page.locator(".cart-form__field a");
    this.errorMessageTitle = this.page.locator(".growl-title");
    this.yourCityButton = this.page.locator(".cart-form__link_base-alter");
    this.changeCityButton = this.page.locator(".auth-button");
    this.changeCityInput = this.page.locator(".auth-input");
    this.changeCityCloseButton = this.page.locator(".auth-popup__close");
    this.cityNotFoundLabel = this.page.locator(".auth-dropdown__content");
    this.noteYourCityLabel = this.page.locator(".auth-form__description_error");
    this.citiesDropdownItems = this.page.locator(".auth-dropdown__item");
    this.removeCityQueryButton = this.page.locator(".auth-input__helper");
    this.catalogButton = this.page.locator("a[href^=\"https://catalog.onliner.by\"]");
    this.mainPageNavigationButton = this.page.locator("a[href^=\"https://www.onliner.by\"]");
    this.enterTheSiteButton = this.page.locator(".cart-message__description a:nth-child(3)");
  }

  async goto() {
    await this.page.goto(CartPage.url);
  }
}