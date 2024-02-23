import { type Locator, type Page } from '@playwright/test';

export class MainPage {
  private static readonly sellWord = 'Продажа';
  private static readonly rentWord = 'Аренда';
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchBar: Locator;
  readonly searchModal: Locator;
  readonly productsPanel: Locator;
  readonly navigationPanelButtons: Locator;
  readonly authBarButton: Locator;
  readonly authBarVKButton: Locator;
  readonly authBarGoogleButton: Locator;
  readonly currenciesButtons: Locator;
  readonly authBarFbButton: Locator;
  readonly weatherButton: Locator;
  readonly cloverButton: Locator;
  readonly realtButton: Locator;
  readonly realtSellButton: Locator;
  readonly realtRentButton: Locator;
  readonly realtSellMinskButton: Locator;
  readonly realtSellMogilevButton: Locator;
  readonly realtSellBrestButton: Locator;
  readonly realtSellVitebskButton: Locator;
  readonly realtSellGomelButton: Locator;
  readonly realtSellGrodnoButton: Locator;
  readonly realtRentMinskButton: Locator;
  readonly realtRentMogilevButton: Locator;
  readonly realtRentBrestButton: Locator;
  readonly realtRentVitebskButton: Locator;
  readonly realtRentGomelButton: Locator;
  readonly realtRentGrodnoButton: Locator;
  
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
    this.currenciesButtons = this.page.locator("//a[@href = 'https://kurs.onliner.by/']");
    this.weatherButton = this.page.locator("//a[@href = 'https://pogoda.onliner.by/']");
    this.cloverButton = this.page.locator(".b-top-navigation-clover");
    this.realtButton = this.page.locator(".b-main-navigation__link").nth(3);
    this.realtSellButton = this.page.locator("//a[text()='Продажа']");
    this.realtRentButton = this.page.locator("//a[text()='Аренда']");

    this.realtSellMinskButton = this.buildCityLocator(MainPage.sellWord,'Минск');
    this.realtSellMogilevButton = this.buildCityLocator(MainPage.sellWord,'Могилев');
    this.realtSellBrestButton = this.buildCityLocator(MainPage.sellWord,'Брест');
    this.realtSellVitebskButton = this.buildCityLocator(MainPage.sellWord,'Витебск');
    this.realtSellGomelButton = this.buildCityLocator(MainPage.sellWord,'Гомель');
    this.realtSellGrodnoButton = this.buildCityLocator(MainPage.sellWord,'Гродно');

    this.realtRentMinskButton = this.buildCityLocator(MainPage.rentWord,'Минск');
    this.realtRentMogilevButton = this.buildCityLocator(MainPage.rentWord,'Могилев');
    this.realtRentBrestButton = this.buildCityLocator(MainPage.rentWord,'Брест');
    this.realtRentVitebskButton = this.buildCityLocator(MainPage.rentWord,'Витебск');
    this.realtRentGomelButton = this.buildCityLocator(MainPage.rentWord,'Гомель');
    this.realtRentGrodnoButton = this.buildCityLocator(MainPage.rentWord,'Гродно');
  }

  async goto() {
    await this.page.goto('https://www.onliner.by/');
  }

  private buildCityLocator(operation: string, city:string){
    return this.page.locator(`//a[text()='${operation}']/../..//span[text()='${city}']`);
  }



}