import { test, expect, Locator } from '@playwright/test';
import { MainPage } from '../../page objects/main.page';
import { RealtPage } from '../../page objects/realt.page';

let mainPage: MainPage;

test.beforeEach('Navigation to the main page of the Onliner.by', async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.goto();
});

test('Realt bar content under the hover', async ({}) => {
  await expect(mainPage.realtSellGomelButton).toBeHidden();
  await expect(mainPage.realtSellMinskButton).not.toBeVisible();
  await expect(mainPage.realtSellGrodnoButton).toBeHidden();
  await expect(mainPage.realtSellVitebskButton).not.toBeVisible();
  await expect(mainPage.realtSellMogilevButton).toBeHidden();
  await expect(mainPage.realtSellBrestButton).not.toBeVisible();

  await mainPage.realtButton.hover();

  await expect(mainPage.realtSellGomelButton).not.toBeHidden();
  await expect(mainPage.realtSellMinskButton).toBeVisible();
  await expect(mainPage.realtSellGrodnoButton).not.toBeHidden();
  await expect(mainPage.realtSellVitebskButton).toBeVisible();
  await expect(mainPage.realtSellMogilevButton).not.toBeHidden();
  await expect(mainPage.realtSellBrestButton).toBeVisible();

});

test.describe.parallel('city navigation with data provider', () => {
  const dataProvider = [
    { city: 'Гродно', operation: 'buy'},
    { city: 'Могилёв', operation: 'buy'},
    { city: 'Брест', operation: 'buy'},
    { city: 'Витебск', operation: 'buy'},
    { city: 'Гомель', operation: 'buy'},
    { city: 'Гродно', operation: 'rent'},
    { city: 'Могилёв', operation: 'rent'},
    { city: 'Брест', operation: 'rent'},
    { city: 'Витебск', operation: 'rent'},
    { city: 'Гомель', operation: 'rent'}
  ];

  dataProvider.forEach((data) => {
    test(`Onliner realt navigation to ${data.city} and ${data.operation}`, async ({ page }) => {
      let button: Locator;
      let minimumRate: number;

      switch (data.operation){
        case 'buy':
          minimumRate = 0.8
          break;
        default: 
          minimumRate = 0.6
          break;       
      }

      switch ( data.city + '_' + data.operation) {
        case 'Гродно_buy':
          button =  mainPage.realtSellGrodnoButton
          break;
        case 'Могилёв_buy':
          button =  mainPage.realtSellMogilevButton
          break;
        case 'Брест_buy':
          button =  mainPage.realtSellBrestButton
          break;
        case 'Витебск_buy':
          button =  mainPage.realtSellVitebskButton
          break;
        case 'Гомель_buy':
          button =  mainPage.realtSellGomelButton
          break;
        case 'Гродно_rent':
          button =  mainPage.realtRentGrodnoButton
          break;
        case 'Могилёв_rent':
          button =  mainPage.realtRentMogilevButton
          break;
        case 'Брест_rent':
          button =  mainPage.realtRentBrestButton
          break;
        case 'Витебск_rent':
          button =  mainPage.realtRentVitebskButton
          break;
        case 'Гомель_rent':
          button =  mainPage.realtRentGomelButton
          break;
        default: 
          button =  mainPage.realtSellGomelButton
          break;
      }

      await mainPage.realtButton.hover();
      await button.click();
      await page.waitForLoadState();
      let realtPage = new RealtPage(page);

      await expect.poll(async () => await realtPage.addressLabels.count(),{timeout:10000}).toBeGreaterThan(0);
      const listOfAddress = await realtPage.addressLabels.allTextContents();

      const listOfCorrectCityAddress = listOfAddress.filter((item)=> 
      item.toLocaleLowerCase().replace(/ё/g, 'е').includes(data.city.toLocaleLowerCase().replace(/ё/g, 'е')));

      expect(listOfCorrectCityAddress.length/listOfAddress.length).toBeGreaterThanOrEqual(minimumRate);
    });
  });
});

test.describe.parallel('city navigation with data provider buy and rent in Minsk', () => {
  const dataProvider = [
    { operation: 'buy'},
    { operation: 'rent'}
  ];

dataProvider.forEach((data) => {
  test(`Onliner realt navigation to Минск ${data.operation}`, async ({ page }) => {
      await mainPage.realtButton.hover();
      let minimumRate: number;
      switch (data.operation){
        case 'buy':
          minimumRate = 0.8
          break;
        default: 
          minimumRate = 0.6
          break;       
      }
      let button: Locator;
      switch ( data.operation ) {
        case 'buy':
          button =  mainPage.realtSellMinskButton
          break;
        default: 
          button =  mainPage.realtRentMinskButton
          break;
      }

      await button.click();
      await page.waitForLoadState();
      let realtPage = new RealtPage(page);
      await expect.poll(async () => await realtPage.addressLabels.count(),{timeout:10000}).toBeGreaterThan(0);
      const listOfAddress = (await realtPage.addressLabels.allTextContents()).map((item)=>item.toLocaleLowerCase().replace(/ё/g, 'е'));   
      const listOfCorrectCityAddress = listOfAddress.filter((item)=> 
      (!item.includes('минск') && !item.includes('гомель') && !item.includes('могилев') && !item.includes('гродно') && !item.includes('брест') && !item.includes('витебск')))
      expect(listOfCorrectCityAddress.length/listOfAddress.length).toBeGreaterThanOrEqual(minimumRate);
    });
  });
});

