import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { MainPage } from '../../page objects/mainPage.page';
import { SearchPage } from '../../page objects/searchPage.page';

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.goto();
});

describe('Main page tests', async ()=> {


  test('search modal is opened @main', async ({ page }) => {
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

  test('products buttons are presented @main', async ({ page }) => {
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

    let allText = await mainPage.productsPanel.allTextContents();
    let isEqual = allText.length === expectedSetOfButtons.length && 
      allText.every((value, index) => value === expectedSetOfButtons[index]);
  expect(isEqual).toBe(true);
  });
})
