import { test, expect, Locator, Page } from '@playwright/test';
import { MainPage } from '../../page objects/main.page';
import { SearchPage } from '../../page objects/search.page';

let mainPage: MainPage;
let searchPage: SearchPage;
const minimumRate = 0.8;
const pageLoadTImeout = 5000;

test.beforeEach('Search page mechanism', async ({ page }) => {
  mainPage = new MainPage(page);
  searchPage = new SearchPage(page);
  await mainPage.goto();
});

test('Look up navigation buttons in the search page', async ({page}) => {
  const searchPage = new SearchPage(page);
  await mainPage.searchInput.fill('apple');

  await expect(searchPage.inCatalogueButton).toBeVisible();
  await expect(searchPage.inTheNewsButton).toBeVisible();
  await expect(searchPage.atTheFleaMarketButton).toBeVisible();
  await expect(searchPage.onTheForumButton).toBeVisible();
});

test('Catalog page contains proper number of expected output results on the Catalogue page', async ({page}) => {
  const searchPage = new SearchPage(page);
  await mainPage.searchInput.fill('apple');
  
  await expect(searchPage.inCatalogueButton.locator(SearchPage.activeButtonStatusLocatorPart)).toBeVisible();

  await searchPage.inTheNewsButton.click();
  await expect(searchPage.inCatalogueButton.locator(SearchPage.inactiveButtonStatusLocatorPart)).toBeVisible();
  await expect(searchPage.inCatalogueButton.locator(SearchPage.activeButtonStatusLocatorPart)).not.toBeVisible();
  await expect(searchPage.inTheNewsButton.locator(SearchPage.activeButtonStatusLocatorPart)).toBeVisible();

  await searchPage.atTheFleaMarketButton.click();

  await expect(searchPage.inTheNewsButton.locator(SearchPage.inactiveButtonStatusLocatorPart)).toBeVisible();
  await expect(searchPage.inTheNewsButton.locator(SearchPage.activeButtonStatusLocatorPart)).not.toBeVisible();
  await expect(searchPage.atTheFleaMarketButton.locator(SearchPage.activeButtonStatusLocatorPart)).toBeVisible();

  await searchPage.onTheForumButton.click();

  await expect(searchPage.atTheFleaMarketButton.locator(SearchPage.inactiveButtonStatusLocatorPart)).toBeVisible();
  await expect(searchPage.atTheFleaMarketButton.locator(SearchPage.activeButtonStatusLocatorPart)).not.toBeVisible();
  await expect(searchPage.onTheForumButton.locator(SearchPage.activeButtonStatusLocatorPart)).toBeVisible();

  await searchPage.inCatalogueButton.click();
  await expect(searchPage.onTheForumButton.locator(SearchPage.inactiveButtonStatusLocatorPart)).toBeVisible();
  await expect(searchPage.onTheForumButton.locator(SearchPage.activeButtonStatusLocatorPart)).not.toBeVisible();
  await expect(searchPage.inCatalogueButton.locator(SearchPage.activeButtonStatusLocatorPart)).toBeVisible();
});

test(`test on the 'в каталоге' tab using 'sony' query`, async () => {
  await testSearchMethod(searchPage, searchPage.inCatalogueButton, searchPage.titleCatalogLabel, 'sony');
});

test(`test on the 'в новостях' tab using 'apple' query`, async () => {
  await testSearchMethod(searchPage, searchPage.inTheNewsButton, searchPage.titleNewsLabel, 'apple');
});

test(`test on the 'на барахолке' tab using 'samsung' query`, async () => {
  await testSearchMethod(searchPage, searchPage.atTheFleaMarketButton, searchPage.titleAtTheFleaMarketLabel, 'samsung');
});

test(`test on the 'на форуме' tab using 'acer' query`, async () => {
  await testSearchMethod(searchPage, searchPage.onTheForumButton, searchPage.titleForumLabel, 'acer');
});
  
async function testSearchMethod(searchPage:SearchPage, menuButtonlocator: Locator, labelLocator: Locator, query: string) {
  await mainPage.searchInput.fill(query);
  await menuButtonlocator.click();
  await expect.poll(async () => await labelLocator.count(),{timeout:pageLoadTImeout}).toBeGreaterThan(0);
  const actuaItemTitles = await labelLocator.allTextContents();
  const fitItemTitles = actuaItemTitles.map((item)=>item.toLocaleLowerCase().includes(query));   
  expect(fitItemTitles.length/actuaItemTitles.length).toBeGreaterThanOrEqual(minimumRate);
};
