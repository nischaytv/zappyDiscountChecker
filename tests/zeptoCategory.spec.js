import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { sortByHighestDiscount } from '../utils/sortUtils';
import fs from 'fs';
import path from 'path';

test('Extract By Category with subcategories', async ({ page }) => {
test.setTimeout(180000);
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  const address = process.env.ADDRESS; 

  await homePage.goto();

  // Location example
  await homePage.selectLocation(
    address,
    address
  ); 

  // File to store all results
  const fileName = 'category_product_results.json';
  const filePath = path.join(process.cwd(), fileName);

  // Read existing JSON if exists
  let allData = [];
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    allData = JSON.parse(rawData);
  }

  // Click on main search/category menu
  await homePage.clickOnFruitsAndVegetables();

  // Define subcategories dynamically
  const subCategories = [
    { name: 'Fresh Vegetables', clickMethod: homePage.clickOnFreshVegetables.bind(homePage) },
    { name: 'Fresh Fruits', clickMethod: homePage.clickOnFreshFruits.bind(homePage) },
    { name: 'Exotics & Premium', clickMethod: homePage.clickOnExoticsAndPremium.bind(homePage) },
    { name: 'New Launches', clickMethod: homePage.clickOnNewLaunches.bind(homePage) },
    // { name: 'Organics & Hydroponics', clickMethod: homePage.clickOnOrganicsAndHydroponics.bind(homePage) },
    { name: 'Leafy Herbs & Seasonings', clickMethod: homePage.clickOnLeafyHerbsAndSeasonings.bind(homePage) }

  ];

  for (const subCat of subCategories) {
    console.log(`Fetching products for subcategory: ${subCat.name}`);

    // Click on subcategory
    await subCat.clickMethod();

    // Extract and sort products
    const products = await productsPage.getAllProducts();
    const sortedProducts = sortByHighestDiscount(products);

    // Add metadata
    const entry = {
      category: 'Fruits & Vegetables',
      subCategory: subCat.name,
      dateTime: new Date().toISOString(),
      products: sortedProducts
    };

    // Append to array
    allData.push(entry);
  }
/////////////////////////////////////////////////////////// For Dairy, Bread & Eggs Category ///////////////////////
    await homePage.clickOnHome();
    await homePage.clickOnDiaryBreadAndEggs();

    // Define subcategories dynamically
  const diarySubCategories = [
    { name: 'Milk', clickMethod: homePage.clickOnMilk.bind(homePage) },
    { name: 'Eggs', clickMethod: homePage.clickOnEggs.bind(homePage) },
    { name: 'Breads & Buns', clickMethod: homePage.clickOnBreadsAndBuns.bind(homePage) },
    { name: 'Fresh Bakery', clickMethod: homePage.clickOnFreshBakery.bind(homePage) },
    { name: 'Cheese', clickMethod: homePage.clickOnCheese.bind(homePage) },
    { name: 'Batters & Mixes', clickMethod: homePage.clickOnBattersAndMixes.bind(homePage) },
    { name: 'Paneer & Cream', clickMethod: homePage.clickOnPaneerAndCream.bind(homePage) },

  ];

  for (const subCat of diarySubCategories) {
    console.log(`Fetching products for subcategory: ${subCat.name}`);

    // Click on subcategory
    await subCat.clickMethod();

    // Extract and sort products
    const products = await productsPage.getAllProducts();
    const sortedProducts = sortByHighestDiscount(products);

    // Add metadata
    const entry = {
      category: 'Dairy, Bread & Eggs',
      subCategory: subCat.name,
      dateTime: new Date().toISOString(),
      products: sortedProducts
    };

    // Append to array
    allData.push(entry);
  }
////////////////////////////////////////////////////////////////Atta Rice Category //////////////////////////////////////////////
  await homePage.clickOnHome();
  await homePage.clickOnAttaRice();

      // Define subcategories dynamically 
  const attaRiceSubCategories = [
    // { name: 'Healthy Picks', clickMethod: homePage.clickOnHealthyPicks.bind(homePage) },
    // { name: 'Olive & Cold Press Oil', clickMethod: homePage.clickOnOliveAndColdPressOil.bind(homePage) },
    { name: 'Oil', clickMethod: homePage.clickOnOil.bind(homePage) },
    { name: 'Atta', clickMethod: homePage.clickOnAtta.bind(homePage) },
    { name: 'Besan, Sooji & Maida', clickMethod: homePage.clickOnBesanSoojiMaida.bind(homePage) },
    { name: 'Healthy Atta & Millets', clickMethod: homePage.clickOnHealthyAttaMillets.bind(homePage) },
    // { name: 'Healthy Ghee', clickMethod: homePage.clickOnHealthyGhee.bind(homePage) },
    // { name: 'Ghee', clickMethod: homePage.clickOnGhee.bind(homePage) },
    { name: 'Dals & Pulses', clickMethod: homePage.clickOnDalsPulses.bind(homePage) },
    // { name: 'Healthy Dal', clickMethod: homePage.clickOnHealthyDal.bind(homePage) }
  ];

  for (const subCat of attaRiceSubCategories) {
    console.log(`Fetching products for subcategory: ${subCat.name}`);

    // Click on subcategory
    await subCat.clickMethod();

    // Extract and sort products
    const products = await productsPage.getAllProducts();
    const sortedProducts = sortByHighestDiscount(products);

    // Add metadata
    const entry = {
      category: 'Atta, Rice & More',
      subCategory: subCat.name,
      dateTime: new Date().toISOString(),
      products: sortedProducts
    };

    // Append to array
    allData.push(entry);
  }

  ////////////////////////////////////////////////////////////////Meats Fish Category //////////////////////////////////////////////
  await homePage.clickOnHome();
  await homePage.clickOnMeatsFish();

      // Define subcategories dynamically
  const meatsFishSubCategories = [
    { name: 'Chicken', clickMethod: homePage.clickOnChicken.bind(homePage) },
    { name: 'Fish & Sea Food', clickMethod: homePage.clickOnFishAndSeaFood.bind(homePage) },
    { name: 'Mutton', clickMethod: homePage.clickOnMutton.bind(homePage) },
    { name: 'Top Picks', clickMethod: homePage.clickOnTopPicks.bind(homePage) }
  ];

  for (const subCat of meatsFishSubCategories) {
    console.log(`Fetching products for subcategory: ${subCat.name}`);

    // Click on subcategory
    await subCat.clickMethod();

    // Extract and sort products
    const products = await productsPage.getAllProducts();
    const sortedProducts = sortByHighestDiscount(products);

    // Add metadata
    const entry = {
      category: 'Meats & Fish',
      subCategory: subCat.name,
      dateTime: new Date().toISOString(),
      products: sortedProducts
    };

    // Append to array
    allData.push(entry);
  }



  // Save all results to single JSON
  fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
  console.log(`✅ All subcategory products saved to ${filePath}`);


  // Group products by category
const categoryMap = {};

for (const item of allData) {
  const { category, products } = item;

  if (!categoryMap[category]) {
    categoryMap[category] = [];
  }

  categoryMap[category].push(...products);
}

let finalMessage = '';

for (const category in categoryMap) {

  const top5 = categoryMap[category]
    .filter(p => p.discountPercent && p.discountPercent > 0)
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 5);

  if (top5.length === 0) continue;

  finalMessage += `📂 <b>${category}</b>\n\n`;

  top5.forEach((p, index) => {
    finalMessage += 
`🔥 <b>${index + 1}. ${p.name}</b>
Qty: ${p.quantity}
💰 ₹${p.discountedPrice} (₹${p.actualPrice ?? 'N/A'})
📉 ${p.discountPercent}%
🔗 ${p.link}

`;
  });

  finalMessage += `━━━━━━━━━━━━━━━━━━\n\n`;
}

  const MAX_LENGTH = 4000; // safer than 4096

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

console.log('Message length:', finalMessage.length);

// Split and send safely
for (let i = 0; i < finalMessage.length; i += MAX_LENGTH) {
  const chunk = finalMessage.substring(i, i + MAX_LENGTH);

  const response = await page.request.post(telegramURL, {
    data: {
      chat_id: CHAT_ID,
      text: chunk,
      parse_mode: 'HTML' // safer than Markdown
    }
  });

  const responseBody = await response.json();
  console.log('Telegram Response:', responseBody);
}

console.log('✅ All messages sent successfully!');



});