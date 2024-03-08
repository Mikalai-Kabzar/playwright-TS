import { test, expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../../page objects/login.page';

test('Login test with correct username and password redirect to captcha', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillLoginInputs(process.env.onliner_username!, process.env.onliner_password!); 
  await loginPage.authButton.click();

  await expect(loginPage.captchaLabel).toHaveText('Помогите нам улучшить безопасность');
  await expect(loginPage.captchaGoogleLabel).toHaveText('I\'m not a robot',{useInnerText:true});
});

test('Login test with incorrect username and correct password redirect to captcha', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillLoginInputs(process.env.onliner_username! + 'incorrect', process.env.onliner_password!); 
  await loginPage.authButton.click();

  await expect(loginPage.captchaLabel).toBeHidden();
  await expect(loginPage.captchaGoogleLabel).toBeHidden();
  await expect(loginPage.captchaErrorLabel).toHaveText('Неверный логин или пароль');
});

test.describe.parallel('Login test with incorrect (username or/and password) shows error message', () => {
  const dataProvider = [
    { loginAddon: 'incorrect', passwordAddon:''},
    { loginAddon: '', passwordAddon:'incorrect'},//Flacky. bug captcha resolver was shown as in the previous case BEFORE the error message presence
    { loginAddon: 'incorrect', passwordAddon:'incorrect'},//Flacky. bug captcha resolver was shown as in the previous case BEFORE the error message presence
  ];

  dataProvider.forEach((data) => {
    test(`Login test with ${data.loginAddon == ''?'correct':data.loginAddon} username and ${data.passwordAddon == ''?'correct':data.passwordAddon} password causes error label`, async ({page}) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.fillLoginInputs(process.env.ONLINER_USERNAME + data.loginAddon, process.env.ONLINER_PASSWORD! + data.passwordAddon); 
      await loginPage.authButton.click();
    
      await expect(loginPage.captchaLabel).toBeHidden();
      await expect(loginPage.captchaGoogleLabel).toBeHidden();
      await expect(loginPage.captchaErrorLabel).toHaveText('Неверный логин или пароль');
    });

  });
});
