import { test, expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../../page objects/login.page';

test('Login test with correct username and password redirect to captcha @debug', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillLoginInputs(process.env.onliner_username!, process.env.onliner_password!); 
  await loginPage.authButton.click();

  await expect(loginPage.captchaLabel).toHaveText('Помогите нам улучшить безопасность');
  await expect(loginPage.captchaGoogleLabel).toHaveText('I\'m not a robot',{useInnerText:true});

  await loginPage.captchaCheckbox.click();
await page.waitForTimeout(5000)
  await loginPage.captchaCheckbox.check();
  await page.waitForTimeout(5000)

});
