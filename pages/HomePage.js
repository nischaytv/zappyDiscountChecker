// pages/HomePage.js

export class HomePage {
  constructor(page) {
    this.page = page;

    this.selectLocationBtn = page.getByRole('button', { name: 'Select Location' });
    this.searchTextbox = page.getByRole('textbox', { name: 'Search a new address' });
    this.searchBarIcon = page.getByTestId('search-bar-icon');
    this.searchCombobox = page.getByRole('combobox', { name: 'Search' });
    this.homeText = page.locator('//a[text()="Home"]');

    //Main
    this.fruitsAndVegetables = page.locator('(//section[@class="embla"])[2]//a[contains(@href, "/cn/fruits-vegetables")]');
    this.diaryBreadAndEggs = page.locator('(//section[@class="embla"])[2]//a[contains(@href, "/cn/dairy-bre")]');
    this.attaRice = page.locator('(//section[@class="embla"])[2]//a[contains(@href, "/cn/atta-rice")]');
    this.meatsFish = page.locator('(//section[@class="embla"])[2]//a[contains(@href, "/cn/meats-fish")]');


    //Sub categories
    this.freshVegetables = page.getByRole('link', { name: 'Fresh Vegetables Fresh' });
    this.newLaunches = page.getByRole('link', { name: 'New Launches New Launches' });
    this.freshFruits = page.getByRole('link', { name: 'Fresh Fruits Fresh Fruits' });
    this.exoticsAndPremium = page.getByRole('link', { name: 'Exotics & Premium Exotics &' });
    this.organicsAndHydroponics = page.getByRole('link', { name: 'Organics & Hydroponics' });
    this.leafyHerbsAndSeasonings = page.getByRole('link', { name: 'Leafy, Herbs & Seasonings' });

    this.milk = page.getByRole('link', { name: 'Milk Milk' });
    this.eggs = page.getByRole('link', { name: 'Eggs Eggs' });
    this.breadsAndBuns = page.getByRole('link', { name: 'Breads & Buns Breads & Buns' });
    this.freshBakery = page.getByRole('link', { name: 'Fresh Bakery Fresh Bakery' });
    this.cheese = page.getByRole('link', { name: 'Cheese Cheese' });
    this.battersAndMixes = page.getByRole('link', { name: 'Batters & Mixes Batters &' });
    this.paneerAndCream = page.getByRole('link', { name: 'Paneer & Cream Paneer & Cream' });

    this.healthyPicks = page.getByRole('link', { name: 'Healthy Picks Healthy Picks' });
    this.oliveAndColdPressOil = page.getByRole('link', { name: 'Olive & Cold Press Oil Olive' });
    this.oil = page.getByRole('link', { name: 'Oil Oil' });
    this.atta = page.getByRole('link', { name: 'Atta Atta' });
    this.besanSoojiMaida = page.getByRole('link', { name: 'Besan, Sooji & Maida Besan,' });
    this.healthyAttaMillets = page.getByRole('link', { name: 'Healthy Atta & Millets' });
    this.healthyGhee = page.getByRole('link', { name: 'Healthy Ghee Healthy Ghee' });
    this.ghee = page.getByRole('link', { name: 'Ghee Ghee' });
    this.dalsPulses = page.getByRole('link', { name: 'Dals & Pulses Dals & Pulses' });
    this.healthyDal = page.getByRole('link', { name: 'Healthy Dal Healthy Dal' });

    this.chicken = page.getByRole('link', { name: 'Chicken Chicken' });
    this.fishAndSeaFood = page.getByRole('link', { name: 'Fish & Sea Food Fish & Sea' });
    this.mutton = page.getByRole('link', { name: 'Mutton Mutton' });
    this.topPicks = page.getByRole('link', { name: 'Top Picks Top Picks' });


  }

  async goto() {
    await this.page.goto('https://www.zepto.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickOnHome() {
    await this.homeText.click();
    await this.page.waitForSelector(`(//section[@class="embla"])[2]//a[contains(@href, "/cn/fruits-vegetables")]`, { state: 'visible', timeout: 10000 });
  }

  // Dynamic location selection
  async selectLocation(searchText, locationOptionText) {
    await this.selectLocationBtn.click();
    await this.searchTextbox.click();
    await this.searchTextbox.fill(searchText);
    // dynamic option selection
    await this.page.getByText(locationOptionText, { exact: false }).click();
    await this.page.waitForSelector('//div[@data-testid="address-modal"]', { state: 'detached', timeout: 15000 });
  }

  async clickOnSearch() {
    await this.searchBarIcon.click();
  }

  // Dynamic product search
  async searchProduct(productName) {

    await this.searchCombobox.fill(productName);
    await this.searchCombobox.press('Enter');
    await this.page.waitForSelector("//div[contains(@class,'animate-pulse')]", { state: 'detached', timeout: 15000 });
    await this.page.waitForSelector(`//h1[contains(text(),'Showing results for')]`, { state: 'visible', timeout: 10000 });

  }

  async waitTillLoaderDisappear() {
    await this.page.locator("//*[local-name()='svg' and contains(@class,'animate-spin')]")
  .waitFor({ state: 'detached' });
  }

  //Main Category
  async clickOnFruitsAndVegetables() {
    await this.fruitsAndVegetables.click();
    await this.page.waitForSelector('//h1', { state: 'visible', timeout: 10000 });
  }
  async clickOnDiaryBreadAndEggs() {
    await this.diaryBreadAndEggs.click();
    await this.page.waitForSelector('//h1', { state: 'visible', timeout: 10000 });
  }
  async clickOnAttaRice() {
    await this.attaRice.click();
    await this.page.waitForSelector('//h1', { state: 'visible', timeout: 10000 });
  }
  async clickOnMeatsFish() {
    await this.meatsFish.click();
    await this.page.waitForSelector('//h1', { state: 'visible', timeout: 10000 });
  }

  //Sub Category
  async clickOnFreshVegetables() {
    await this.freshVegetables.click();
    await this.waitTillLoaderDisappear();
  }
  async clickOnNewLaunches() {
    await this.newLaunches.click();
    await this.waitTillLoaderDisappear();
  }
  async clickOnFreshFruits() {
    await this.freshFruits.click();
    await this.waitTillLoaderDisappear();
  }
    async clickOnExoticsAndPremium() {
    await this.exoticsAndPremium.click();
    await this.waitTillLoaderDisappear();
  }
    async clickOnOrganicsAndHydroponics() {
    await this.organicsAndHydroponics.click();
    await this.waitTillLoaderDisappear();
  }
    async clickOnLeafyHerbsAndSeasonings() {
    await this.leafyHerbsAndSeasonings.click();
    await this.waitTillLoaderDisappear();
  }
  async clickOnMilk() {
    await this.milk.click();
    await this.waitTillLoaderDisappear();
  }
  async clickOnEggs() {
    await this.eggs.click();
    await this.waitTillLoaderDisappear();
  }
  async clickOnBreadsAndBuns() {
    await this.breadsAndBuns.click();
    await this.waitTillLoaderDisappear();
  }
  async clickOnFreshBakery() {
    await this.freshBakery.click();
    await this.waitTillLoaderDisappear();
  }
  async clickOnCheese() {
    await this.cheese.click();
    await this.waitTillLoaderDisappear();
  }
  async clickOnBattersAndMixes() {
    await this.battersAndMixes.click();
    await this.waitTillLoaderDisappear();
  }
  async clickOnPaneerAndCream() {
    await this.paneerAndCream.click();
    await this.waitTillLoaderDisappear(); 
  } 
  async clickOnHealthyPicks() {
    await this.healthyPicks.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnOliveAndColdPressOil() {
    await this.oliveAndColdPressOil.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnOil() {
    await this.oil.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnAtta() {
    await this.atta.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnBesanSoojiMaida() {
    await this.besanSoojiMaida.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnHealthyAttaMillets() {
    await this.healthyAttaMillets.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnHealthyGhee() {
    await this.healthyGhee.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnGhee() {
    await this.ghee.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnDalsPulses() {
    await this.dalsPulses.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnHealthyDal() {
    await this.healthyDal.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnChicken() {
    await this.chicken.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnFishAndSeaFood() {
    await this.fishAndSeaFood.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnMutton() {
    await this.mutton.click();
    await this.waitTillLoaderDisappear(); 
  }
  async clickOnTopPicks() {
    await this.topPicks.click();
    await this.waitTillLoaderDisappear();
  }
  

}