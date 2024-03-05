import { test, expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../../page objects/login.page';
import { env } from 'node:process';


test('Login test with correct username and password @debug', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  console.log(process.env.onliner_username);

  await loginPage.fillLoginInputs(process.env.onliner_username!, process.env.onliner_password!);

  await loginPage.authButton.click();

  await page.waitForTimeout(10000);
});
