import { test, expect, Locator } from '@playwright/test';
import { MainPage } from '../../page objects/main.page';
import { RealtPage } from '../../page objects/realt.page';
import { SearchPage } from '../../page objects/search.page';

let mainPage: MainPage;

test.beforeEach('Search page mechanism', async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.goto();
});

test('Look up navigation buttons in the search page', async ({page}) => {
  const searchPage = new SearchPage(page);
  await mainPage.searchInput.fill('apple');

  await expect(searchPage.inCatalogueButton).toBeVisible();
  await expect(searchPage.inTheNewsButton).toBeVisible();
  await expect(searchPage.atЕheFleaMarketButton).toBeVisible();
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

  await searchPage.atЕheFleaMarketButton.click();

  await expect(searchPage.inTheNewsButton.locator(SearchPage.inactiveButtonStatusLocatorPart)).toBeVisible();
  await expect(searchPage.inTheNewsButton.locator(SearchPage.activeButtonStatusLocatorPart)).not.toBeVisible();
  await expect(searchPage.atЕheFleaMarketButton.locator(SearchPage.activeButtonStatusLocatorPart)).toBeVisible();

  await searchPage.onTheForumButton.click();

  await expect(searchPage.atЕheFleaMarketButton.locator(SearchPage.inactiveButtonStatusLocatorPart)).toBeVisible();
  await expect(searchPage.atЕheFleaMarketButton.locator(SearchPage.activeButtonStatusLocatorPart)).not.toBeVisible();
  await expect(searchPage.onTheForumButton.locator(SearchPage.activeButtonStatusLocatorPart)).toBeVisible();

  await searchPage.inCatalogueButton.click();
  await expect(searchPage.onTheForumButton.locator(SearchPage.inactiveButtonStatusLocatorPart)).toBeVisible();
  await expect(searchPage.onTheForumButton.locator(SearchPage.activeButtonStatusLocatorPart)).not.toBeVisible();
  await expect(searchPage.inCatalogueButton.locator(SearchPage.activeButtonStatusLocatorPart)).toBeVisible();
});



