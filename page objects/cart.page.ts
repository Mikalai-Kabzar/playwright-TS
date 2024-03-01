import { FrameLocator, type Locator, type Page } from '@playwright/test';



export class CartPage {
  readonly page: Page;
  static readonly url = 'https://cart.onliner.by/';
  // readonly pageFrame: FrameLocator;
  // static readonly crossButton = '.search__close';
  // static readonly activeButtonStatusLocatorPart = "xpath = self::div[contains(@class,'item_active')]";
  // static readonly inactiveButtonStatusLocatorPart = "xpath = self::div[not(contains(@class,'item_active'))]";
  // readonly inCatalogueButton: Locator;
  // readonly inTheNewsButton: Locator;
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
  
  // readonly onTheForumButton: Locator;
  // readonly titleCatalogLabel: Locator;
  // readonly titleNewsLabel: Locator;
  // readonly titleAtTheFleaMarketLabel: Locator;
  // readonly titleForumLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.pageFrame = this.page.frameLocator("xpath = //iframe[@class = 'modal-iframe']");
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


    // this.inTheNewsButton = this.pageFrame.locator("xpath = //div[text()='в новостях']");
    // this.atTheFleaMarketButton = this.pageFrame.locator("xpath = //div[text()='на барахолке']");
    // this.onTheForumButton = this.pageFrame.locator("xpath = //div[text()='на форуме']");
    // this.titleCatalogLabel = this.pageFrame.locator(".product__title>a");
    // this.titleNewsLabel = this.pageFrame.locator(".news__title>a");
    // this.titleAtTheFleaMarketLabel = this.pageFrame.locator(".baraholka__title a>strong");
    // this.titleForumLabel = this.pageFrame.locator(".search__result a");

  }

  async goto() {
    await this.page.goto(CartPage.url);
  }



}