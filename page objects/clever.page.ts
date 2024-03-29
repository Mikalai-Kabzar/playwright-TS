import { FrameLocator, type Locator, type Page } from '@playwright/test';

export class CleverPage {
  readonly page: Page;
  static readonly url = 'https://clever.onliner.by/';
  readonly mailToButton: Locator;
  readonly mainPageNavigationButtons: Locator;
  readonly MTBankNavigationButtons: Locator;
  readonly issueCartHeaderButton: Locator;
  readonly issueCartIntroButton: Locator;
  readonly issueCartFooterButton: Locator;
  readonly issueCartMediumButtons: Locator;
  readonly developerLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainPageNavigationButtons = this.page.locator(".logos__item.onliner");
    this.MTBankNavigationButtons = this.page.locator(".logos__item.mtbank");
    this.mailToButton = this.page.locator(".footer-email");
    this.issueCartHeaderButton = this.page.locator(".header-button");
    this.issueCartIntroButton = this.page.locator(".intro-button");
    this.issueCartFooterButton = this.page.locator(".footer-button");
    this.issueCartMediumButtons = this.page.locator(".utp-link-label");

    this.developerLinks = this.page.locator(".footer-developers__item-link");
  }

  async goto() {
    await this.page.goto(CleverPage.url);
  }
}