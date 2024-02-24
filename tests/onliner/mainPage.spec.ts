import { test, expect, Locator } from '@playwright/test';
import { MainPage } from '../../page objects/main.page';
import { SearchPage } from '../../page objects/search.page';
import { LoginPage } from '../../page objects/login.page';

let mainPage: MainPage;

test.beforeEach('Navigation to the main page of the Onliner.by', async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.goto();
});

test('search modal is collapsed by cross click @main @frame', async ({ page }) => {
  const searchPage = page.frameLocator('.modal-iframe');
  const crossButton = searchPage.locator(SearchPage.crossButton);
  const calcY = async () => (await searchPage.locator('html').boundingBox())?.y;

  expect(await calcY()).toBe(0); 
  await expect(crossButton).toBeHidden();

  await mainPage.searchInput.fill('apple');

  expect(await calcY()).not.toBe(0);
  await expect(crossButton).toBeVisible();

  await searchPage.locator(SearchPage.crossButton).click();
  expect(await calcY()).toBe(0);
});

test('products buttons are presented @main', async () => {
  const expectedSetOfButtons = [
    'Смартфоны',
    'Ноутбуки',
    'Телевизоры',
    'Видеокарты',
    'Роботы-пылесосы',
    'SSD',
    'Планшеты',
    'Наушники и гарнитуры',
    'Мониторы',
    'Игровые приставки',
    'Стиральные машины',
    'Холодильники',
    'Пылесосы',
    'Кофеварки и кофемашины',
    'Фены'
  ];

  const allText = await mainPage.productsPanel.allTextContents();
  const areEqual = allText.length === expectedSetOfButtons.length && 
    allText.every((value, index) => value === expectedSetOfButtons[index]);
  
  expect(areEqual).toBe(true);
});

test('main buttons are presented @main', async () => {
  const expectedSetOfButtons = [
    'Каталог',
    'Новости',
    'Автобарахолка',
    'Дома и квартиры',
    'Услуги',
    'Барахолка',
    'Форум'
  ];

  const allText = await mainPage.navigationPanelButtons.allTextContents();
  const areEqual = allText.length === expectedSetOfButtons.length && 
    allText.every((value, index) => value === expectedSetOfButtons[index]);
  
  expect(areEqual).toBe(true);
});

test('login window could be opened @main', async ({page}) => {
  await mainPage.authBarButton.click();
  let loginPage = new LoginPage(page);
  
  await expect(loginPage.authFormTitle).toHaveText('Вход')
});

test('login window VK could be opened @main', async ({page}) => {
  let popupPromise = page.waitForEvent('popup');
  await mainPage.authBarVKButton.click();
  let pageVkLogin = await popupPromise;
  expect(pageVkLogin.url()).toBe('https://gc.onliner.by/views/social-auth.html?socialType=vkontakte')
  await pageVkLogin.waitForURL('https://id.vk.com/auth?return_auth_hash**');
  expect(pageVkLogin.url()).toContain('https://id.vk.com/auth?return_auth_hash')
});

test('login window Facebook could be opened @main', async ({page}) => {
  let popupPromise = page.waitForEvent('popup');
  await mainPage.authBarFbButton.click();
  let pageVkLogin = await popupPromise;
  expect(pageVkLogin.url()).toBe('https://gc.onliner.by/views/social-auth.html?socialType=facebook')
  await pageVkLogin.waitForURL('https://www.facebook.com/login.php**');
  expect(pageVkLogin.url()).toContain('https://www.facebook.com/login.php')
});

test('login window Google could be opened @main', async ({page}) => {
  let popupPromise = page.waitForEvent('popup');
  await mainPage.authBarGoogleButton.click();
  let pageVkLogin = await popupPromise;
  expect(pageVkLogin.url()).toBe('https://gc.onliner.by/views/social-auth.html?socialType=google')
  await pageVkLogin.waitForURL('https://accounts.google.com/v3/signin/identifier**');
  expect(pageVkLogin.url()).toContain('https://accounts.google.com/v3/signin/identifier')
});

test('currencies could be opened by the top link @main', async ({page}) => {
  await mainPage.currenciesButtons.nth(0).click();
  await page.waitForURL('https://kurs.onliner.by/');
  expect(page.url()).toBe('https://kurs.onliner.by/')
});

test('currencies could be opened by the bottom link @main', async ({page}) => {
  await mainPage.currenciesButtons.nth(1).click();
  await page.waitForURL('https://kurs.onliner.by/');
  expect(page.url()).toBe('https://kurs.onliner.by/')
});

test('weather could be opened by the link @main', async ({page}) => {
  await mainPage.weatherButton.click();
  await page.waitForURL('https://pogoda.onliner.by/');
  expect(page.url()).toBe('https://pogoda.onliner.by/');
});

test('clover could be opened by the link @main', async ({page, context}) => {
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    mainPage.cloverButton.click()
  ]);
  await newTab.waitForURL('https://clever.onliner.by/*');
  expect(newTab.url()).toContain('https://clever.onliner.by/');
});

test('realt could be opened by the link @main', async ({page}) => {
  await mainPage.realtButton.click();
  await page.waitForURL('https://r.onliner.by/pk/');
  expect(page.url()).toBe('https://r.onliner.by/pk/');
});

test('realt could be opened by the link of any buttons @main', async ({page}) => {
  await mainPage.realtButton.hover();

  await mainPage.realtSellGomelButton.click();

  await page.waitForURL('https://r.onliner.by/pk/*');
  expect(page.url()).toContain('https://r.onliner.by/pk/');
});