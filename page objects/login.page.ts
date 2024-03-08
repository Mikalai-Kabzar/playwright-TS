import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly authFormTitle: Locator;
  static readonly url = 'https://profile.onliner.by/';
  readonly authInputs: Locator;
  readonly authButton: Locator;
  readonly captchaLabel: Locator;
  readonly captchaCheckbox: Locator;
  readonly captchaGoogleLabel: Locator;
  readonly captchaErrorLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.authFormTitle = this.page.locator('.auth-form__title');
    this.authInputs = this.page.locator('.auth-input');
    this.authButton = this.page.locator('.auth-button_primary');
    this.captchaLabel = this.page.locator('.auth-form__title_condensed-other');
    const googleIframeCaptcha = this.page.frameLocator('iframe[title="reCAPTCHA"]');
    this.captchaCheckbox = googleIframeCaptcha.locator('.recaptcha-checkbox-borderAnimation');
    this.captchaGoogleLabel = googleIframeCaptcha.locator('.rc-anchor-checkbox-label');
    this.captchaErrorLabel = this.page.locator('.auth-form__description_error');

    
  }

  async fillLoginInputs(username: string, password: string) {
    await this.authInputs.nth(0).fill(username);
    await this.authInputs.nth(1).fill(password);
  }



  async goto() {
    await this.page.goto(LoginPage.url);
  }
}