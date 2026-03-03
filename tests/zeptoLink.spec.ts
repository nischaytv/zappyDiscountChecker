import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { sortByHighestDiscount } from '../utils/sortUtils';
import fs from 'fs';
import path from 'path';

test('Extract By Category with subcategories', async ({ page }) => {
test.setTimeout(900000);
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  const address = process.env.ADDRESS; 

  await page.route('**/*', (route) => {
  const resourceType = route.request().resourceType();
  if (resourceType === 'image' || resourceType === 'font') {
    route.abort();
  } else {
    route.continue();
  }
});
  const randomDelayHome = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
  await homePage.goto();
  console.log('✅ Navigated to homepage');
  await page.waitForTimeout(randomDelayHome);
  // Location example
  await homePage.selectLocation(
    address,
    address
  ); 
  console.log(`✅ Location set`);

  await page.waitForTimeout(randomDelayHome); // Wait for location to be set and page to load

  // File to store all results 
  const fileName = 'category_product_results.json';
  const filePath = path.join(process.cwd(), fileName);

  // Read existing JSON if exists
  let allData = [];
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    allData = JSON.parse(rawData);
  }

  
  const subCategories = [
    { name: 'Fruits and Veggies', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/fruits-vegetables/all/cid/64374cfe-d06f-4a01-898e-c07c46462c36/scid/e78a8422-5f20-4e4b-9a9f-22a0e53962e3") },
    { name: 'Fresh Vegetables', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/fruits-vegetables/fresh-vegetables/cid/64374cfe-d06f-4a01-898e-c07c46462c36/scid/b4827798-fcb6-4520-ba5b-0f2bd9bd7208") },
    { name: 'Fresh Fruits', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/fruits-vegetables/fresh-fruits/cid/64374cfe-d06f-4a01-898e-c07c46462c36/scid/09e63c15-e5f7-4712-9ff8-513250b79942") },
    { name: 'Milk', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/dairy-bread-eggs/dairy-bread-eggs/cid/4b938e02-7bde-4479-bc0a-2b54cb6bd5f5/scid/22964a2b-0439-4236-9950-0d71b532b243") },
    { name: 'Atta', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/atta-rice-oil-dals/atta/cid/2f7190d0-7c40-458b-b450-9a1006db3d95/scid/15644eea-d781-4cdd-8d85-e63bd9706b96") },
    { name: 'Eggs', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/dairy-bread-eggs/eggs/cid/4b938e02-7bde-4479-bc0a-2b54cb6bd5f5/scid/d638f064-e7f3-4161-b692-a3f472c64020") },
    { name: 'Curd & Probiotic Drink', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/dairy-bread-eggs/curd-probiotic-drink/cid/4b938e02-7bde-4479-bc0a-2b54cb6bd5f5/scid/5418d83c-4c50-4914-a768-b02c2aac2fea") },
    { name: 'Meats & Fish', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/meats-fish-eggs/meats-fish-eggs/cid/4654bd8a-fb30-4ee1-ab30-4bf581b6c6e3/scid/95157c69-f03e-48e5-ae2f-d947af34397f") },
    { name: 'Fish & Sea Food', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/meats-fish-eggs/fish-sea-food/cid/4654bd8a-fb30-4ee1-ab30-4bf581b6c6e3/scid/c41382e7-5331-4116-ab96-8cf25af8eab9") },
    { name: 'Masala & Dry Fruits', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/masala-dry-fruits-more/masala-dry-fruits-more/cid/0c2ccf87-e32c-4438-9560-8d9488fc73e0/scid/8b44cef2-1bab-407e-aadd-29254e6778fa") },
    { name: 'Dry Fruits & Nuts', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/masala-dry-fruits-more/dry-fruits-nuts/cid/0c2ccf87-e32c-4438-9560-8d9488fc73e0/scid/dee4d0bc-0348-492c-9fa3-e55b7e2a44b3") },
    { name: 'Powders & Pastes', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/masala-dry-fruits-more/powders-pastes/cid/0c2ccf87-e32c-4438-9560-8d9488fc73e0/scid/80f4308e-91ad-4cc4-b804-57783fe4c667") },
    { name: 'Salt, Sugar & Jaggery', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/masala-dry-fruits-more/salt-sugar-jaggery/cid/0c2ccf87-e32c-4438-9560-8d9488fc73e0/scid/b5826992-5cfc-4554-8075-a3f33709ddf2") },
    { name: 'Packaged Food', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/packaged-food/packaged-food/cid/5736ad99-f589-4d58-a24b-a12222320a37/scid/dbb39a86-256b-4664-81ed-6668418a5436") },
    { name: 'Breakfast & Sauces', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/breakfast-sauces/breakfast-sauces/cid/f804bccc-c565-4879-b6ab-1b964bb1ed41/scid/68922181-4e0e-4a6b-9862-cf1a02ba240e") },
    { name: 'Tea, Coffee & More', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/tea-coffee-more/tea-coffee-more/cid/d7e98d87-6850-4cf9-a37c-e4fa34ae302c/scid/e6763c2d-0bf3-4332-82e4-0c8df1c94cad") },
    { name: 'Ice Creams & More', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/ice-creams-more/ice-creams-more/cid/65ee1b69-4e24-45b9-ac84-aace3c0854d8/scid/21c1011a-c677-4007-ac20-abc1542cb89c") },
    { name: 'Munchies', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/munchies/munchies/cid/d2c2a144-43cd-43e5-b308-92628fa68596/scid/d648ea7c-18f0-4178-a202-4751811b086b") },
    { name: 'Biscuits', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/biscuits/biscuits/cid/2552acf2-2f77-4714-adc8-e505de3985db/scid/3a10723e-ba14-4e5c-bdeb-a4dce2c1bec4") },
    { name: 'Cleaning Essentials', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com/cn/cleaning-essentials/cleaning-essentials/cid/1a7e46a8-e627-450f-8960-490b550eeee6/scid/3b8d9db5-1953-4593-b4ce-8593f6fbd67a") },
    { name: 'HomePage', clickMethod: homePage.gotolink.bind(homePage, "https://www.zepto.com") },
  ];

  // Call the click method for each subcategory
  for (const subCat of subCategories) {
    console.log(`🔍 Extracting products for: ${subCat.name}`);
    await subCat.clickMethod();
    const randomDelay = Math.floor(Math.random() * (9000 - 4000 + 1)) + 4000;
    await page.waitForTimeout(randomDelay);
    const products = await productsPage.getAllProducts();
    const sortedProducts = sortByHighestDiscount(products);
    await page.waitForTimeout(randomDelay);

    // Add metadata
    const entry = {
      category: subCat.name,
      subCategories: subCat.name,
      dateTime: new Date().toISOString(),
      products: sortedProducts
    };

    // Append to array
    allData.push(entry);

  }

  // Save all results to single JSON
    fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
    console.log(`✅ Multi-product results saved to ${filePath}`);  

  
  // Group products by category
const categoryMap: Record<string, any[]> = {};

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
    .filter((p: any) => p.discountPercent && p.discountPercent > 0)
    .sort((a: any, b: any) => b.discountPercent - a.discountPercent)
    .slice(0, 3);

  if (top5.length === 0) continue;

  finalMessage += `📂 <b>${category}</b>\n\n`;

  top5.forEach((p: any, index: number) => {
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