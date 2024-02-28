import { test, expect, Locator, Page } from '@playwright/test';
import { CartPage } from '../../page objects/cart.page';

test('Cart page navigation via direct url. Existing bug with invisible promo code input that could be fixed by F5', async ({page}) => {
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await page.waitForLoadState();

  //bug
  await expect(cartPage.promoInput).not.toBeVisible();
    
  await page.reload();


  await expect(cartPage.promoInput).toBeVisible();
  await expect(page).toHaveURL(CartPage.url);
});

test('Error message is shown by typing wrong promo code', async ({page}) => {
  const cartPage = new CartPage(page);
  await cartPage.goto();
  //bug
  await page.reload();
  await cartPage.promoInput.fill('wrong code');
  await cartPage.applyPromoButton.click();
  await cartPage.errorMessageTitle.isVisible();

  expect(await cartPage.errorMessageTitle.textContent()).toBe('Неверный промокод');
});

test('Default cart city is Minsk', async ({page}) => {
  const cartPage = new CartPage(page);
  await cartPage.goto();
  expect(await cartPage.yourCityButton.textContent()).toContain('Минск');
});

test('New cart city selector form can be opened', async ({page}) => {
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.yourCityButton.click();
  await cartPage.changeCityButton.isVisible();

  expect(cartPage.changeCityInput).toBeVisible();
});

test('New cart city selector form can be closed', async ({page}) => {
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.yourCityButton.click();
  await cartPage.changeCityButton.isVisible();
  await cartPage.changeCityCloseButton.click();

  expect(cartPage.changeCityInput).not.toBeVisible();
});

test('New cart city can be changed @debug', async ({page}) => {
  const city = 'Гомель';
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.yourCityButton.click();
  await cartPage.changeCityInput.fill(city);

  await page.waitForLoadState();
  await expect.poll(async ()=> await cartPage.citiesDropdownItems.count()).toBeGreaterThan(0);
  await cartPage.citiesDropdownItems.nth(0).click();
  await cartPage.changeCityButton.click();
  await page.waitForSelector(cartPage.changeCityInput['_selector'], { state: 'hidden', timeout: 5000});
  expect(cartPage.changeCityInput).not.toBeVisible();
  expect(await cartPage.yourCityButton.textContent()).toContain(city);
});
