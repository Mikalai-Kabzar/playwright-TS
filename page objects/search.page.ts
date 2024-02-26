import { FrameLocator, type Locator, type Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly pageFrame: FrameLocator;
  static readonly crossButton = '.search__close';
  static readonly activeButtonStatusLocatorPart = "xpath = self::div[contains(@class,'item_active')]";
  static readonly inactiveButtonStatusLocatorPart = "xpath = self::div[not(contains(@class,'item_active'))]";
  readonly inCatalogueButton: Locator;
  readonly inTheNewsButton: Locator;
  readonly atЕheFleaMarketButton: Locator;
  readonly onTheForumButton: Locator;
  //search__tabs-item_active

  constructor(page: Page) {
    this.page = page;
    this.pageFrame = this.page.frameLocator("xpath = //iframe[@class = 'modal-iframe']");
    this.inCatalogueButton = this.pageFrame.locator("xpath = //div[text()='в каталоге']");
    this.inTheNewsButton = this.pageFrame.locator("xpath = //div[text()='в новостях']");
    this.atЕheFleaMarketButton = this.pageFrame.locator("xpath = //div[text()='на барахолке']");
    this.onTheForumButton = this.pageFrame.locator("xpath = //div[text()='на форуме']");
  }


}