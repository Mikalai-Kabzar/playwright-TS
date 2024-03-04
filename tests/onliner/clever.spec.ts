import { test, expect, Locator, Page } from '@playwright/test';
import { MainPage } from '../../page objects/main.page';
import { CleverPage } from '../../page objects/clever.page';
import { ProfilePage } from '../../page objects/profile.page';

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

test.describe.parallel('issue card medium links navigation tests', () => {
  const dataProvider = [
    { linkNumber: 0},
    { linkNumber: 1},
    { linkNumber: 2},
  ];

  dataProvider.forEach((data) => {
    test(`Main page could be opened via to ${data.linkNumber} link button`, async ({ page, context }) => {
    const cleverPage = new CleverPage(page);
    await cleverPage.goto();
    await new CleverPage(page).issueCartMediumButtons.nth(data.linkNumber).click();

    expect(page.url()).toContain(ProfilePage.url);
    });
  });
});

test.describe.parallel('Developer links navigation tests @debug', () => {
  const dataProvider = [
    { linkNumber: 0, url: 'https://69pixels.com'},//bug
    { linkNumber: 1, url: 'https://take5dev.com'},
  ];

  dataProvider.forEach((data) => {
    test(`Developer link ${data.url} could be opened via to ${data.linkNumber} link button`, async ({ page, context }) => {
    const cleverPage = new CleverPage(page);
    await cleverPage.goto();

    const [newTab] = await Promise.all([
      context.waitForEvent('page', {timeout:50000}),
      cleverPage.developerLinks.nth(data.linkNumber).click()
    ]);

    expect(newTab.url()).toContain(data.url);

    });
  });
});

