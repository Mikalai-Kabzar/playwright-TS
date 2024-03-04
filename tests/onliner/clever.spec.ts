import { test, expect, Locator, Page } from '@playwright/test';
import { CartPage } from '../../page objects/cart.page';
import { CatalogPage } from '../../page objects/catalog.page';
import { LoginPage } from '../../page objects/login.page';
import { MainPage } from '../../page objects/main.page';
import { CleverPage } from '../../page objects/clever.page';
import { ProfilePage } from '../../page objects/profile.page';
import { Context } from 'vm';

test('Clever page navigation via direct url', async ({page}) => {
  const cleverPage = new CleverPage(page);
  await cleverPage.goto();
  await expect(page).toHaveURL(CleverPage.url);
});

test('Clever could be opened by the link', async ({page, context}) => {
  const mainPage = new MainPage(page);
  await mainPage.goto();
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    mainPage.cleverButton.click()
  ]);
  await mainPage.cleverButton.click();
  expect(newTab.url()).toContain(CleverPage.url);
});

test.describe('issue card link navigation tests',()=>{

  test('issue card top link navigate to login page', async ({page}) => {
    const cleverPage = new CleverPage(page);
    await testIssueCardWithoutLogin(page, cleverPage.issueCartHeaderButton, 'Оформить карту');
  });

  test('issue card intro link navigate to login page', async ({page}) => {
    const cleverPage = new CleverPage(page);
    await testIssueCardWithoutLogin(page, cleverPage.issueCartIntroButton, 'Оформить карту');
  });

  test('issue card footer link navigate to login page', async ({page}) => {
    const cleverPage = new CleverPage(page);
    await testIssueCardWithoutLogin(page, cleverPage.issueCartFooterButton, 'Оформить карту сейчас');
  }); 

  async function testIssueCardWithoutLogin(page:Page, issueCardButton:Locator, loginButtonLabel: string) {
    const cleverPage = new CleverPage(page);
    await cleverPage.goto();
    await expect(issueCardButton).toHaveText(loginButtonLabel);
    await issueCardButton.click();

    expect(page.url()).toContain(ProfilePage.url);
  };
})

test.describe.parallel('MTBank could be opened by the link', () => {
  const dataProvider = [
    { linkNumber: 0, title: 'top'},
    { linkNumber: 1, title: 'footer'},
  ];

  dataProvider.forEach((data) => {
    test(`MTBank could be opened via to ${data.title} button`, async ({ page, context }) => {
    const cleverPage = new CleverPage(page);
    await cleverPage.goto();

    const [MTBankNexTab] = await Promise.all([
      context.waitForEvent('page'),
      await new CleverPage(page).MTBankNavigationButtons.nth(data.linkNumber).click()
    ]);

    expect(MTBankNexTab.url()).toBe('https://www.mtbank.by/');
    });
  });
});

test.describe.parallel('Main page could be opened by the link', () => {
  const dataProvider = [
    { linkNumber: 0, title: 'top'},
    { linkNumber: 1, title: 'footer'},
  ];

  dataProvider.forEach((data) => {
    test(`Main page could be opened via to ${data.title} button`, async ({ page, context }) => {
    const cleverPage = new CleverPage(page);
    await cleverPage.goto();

    const [mainPageNewTab] = await Promise.all([
      context.waitForEvent('page'),
      await new CleverPage(page).mainPageNavigationButtons.nth(data.linkNumber).click()
    ]);

    expect(mainPageNewTab.url()).toBe(MainPage.url);
    });
  });
});

