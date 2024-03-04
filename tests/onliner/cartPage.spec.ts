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

  await expect(cartPage.changeCityInput).toBeVisible();
});

test('New cart city selector form can be closed', async ({page}) => {
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.yourCityButton.click();
  await cartPage.changeCityButton.isVisible();
  await cartPage.changeCityCloseButton.click();

  await expect(cartPage.changeCityInput).not.toBeVisible();
});

test('New cart city can be changed', async ({page}) => {
  const city = 'Гомель';
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.yourCityButton.click();
  await cartPage.changeCityInput.fill(city);

  await page.waitForLoadState();
  await expect.poll(async ()=> await cartPage.citiesDropdownItems.count()).toBeGreaterThan(0);
  await cartPage.citiesDropdownItems.nth(0).click();
  await cartPage.changeCityButton.click();

  await expect(cartPage.changeCityInput).not.toBeVisible();
  expect(await cartPage.yourCityButton.textContent()).toContain(city);
});

test('Сart city not found label was shown', async ({page}) => {
  const notExistingCity = 'Гомель123';
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.yourCityButton.click();
  await cartPage.changeCityInput.fill(notExistingCity);

  await expect(cartPage.cityNotFoundLabel.getByText('Результатов не найдено')).toBeVisible();
});

test('Сart city choose city label was shown', async ({page}) => {
  const notExistingCity = 'Гомель';
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.yourCityButton.click();
  await cartPage.changeCityInput.fill(notExistingCity);
  await cartPage.changeCityButton.click();

  await expect(cartPage.noteYourCityLabel.getByText('Укажите населенный пункт')).toBeVisible();
});

test('Сart city cross button remove choose city label', async ({page}) => {
  const notExistingCity = 'Гомель123';
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.yourCityButton.click();
  await cartPage.changeCityInput.fill(notExistingCity);
  await cartPage.changeCityButton.click();
  await expect(cartPage.removeCityQueryButton).toBeVisible();
  await cartPage.removeCityQueryButton.click();

  await expect(cartPage.changeCityInput).toBeEmpty();
  await expect(cartPage.removeCityQueryButton).toBeHidden();
});
