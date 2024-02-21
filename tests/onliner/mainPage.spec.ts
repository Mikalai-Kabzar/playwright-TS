import { test, expect } from '@playwright/test';
import { MainPage } from '../../page objects/mainPage.page';
import { SearchPage } from '../../page objects/searchPage.page';
import { LoginPage } from '../../page objects/loginPage.page';

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.goto();
});

test('search modal is opened @main', async () => {
  await expect(mainPage.searchModal).toHaveClass(MainPage.collapsedSearchModalClass);
  await expect(mainPage.searchModal).not.toHaveClass(MainPage.expandedSearchModalClass);

  await mainPage.searchInput.fill('sony');

  await expect(mainPage.searchModal).not.toHaveClass(MainPage.collapsedSearchModalClass);
  await expect(mainPage.searchModal).toHaveClass(MainPage.expandedSearchModalClass);
});

test('search modal is collapsed by cross click @main @frame', async ({ page }) => {
  const searchPage = page.frameLocator('.modal-iframe');
  
  await mainPage.searchInput.fill('apple');

  await expect(mainPage.searchModal).not.toHaveClass(MainPage.collapsedSearchModalClass);
  await expect(mainPage.searchModal).toHaveClass(MainPage.expandedSearchModalClass);

  await searchPage.locator(SearchPage.crossButton).click();

  await expect(mainPage.searchModal).toHaveClass(MainPage.collapsedSearchModalClass);
  await expect(mainPage.searchModal).not.toHaveClass(MainPage.expandedSearchModalClass);
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
  
  expect(loginPage.authFormTitle).toHaveText('Вход')
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