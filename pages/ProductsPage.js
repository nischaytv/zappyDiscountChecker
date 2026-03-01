// pages/ProductsPage.js

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('//div[@data-variant="edlp" and (@data-is-out-of-stock!="true")]');
  }

  extractNumber(priceText) {
    if (!priceText) return null;
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }

  async getAllProducts() {
    const count = await this.products.count();
    const results = [];

    for (let i = 0; i < count; i++) {
      const product = this.products.nth(i);

      // Link
      const link = await product.locator('xpath=..').getAttribute('href');

      // Discounted price
      const discountedText = await product
        .locator('xpath=div[2]/span[1]')
        .textContent()
        .catch(() => null);

      // Actual price (optional)
      let actualText = null;
      const actualPriceLocator = product.locator('xpath=div[2]/span[2]');
      if ((await actualPriceLocator.count()) > 0) {
        actualText = await actualPriceLocator.textContent().catch(() => null);
      }

      // Product name
      const name = await product
        .locator('xpath=div[4]/span')
        .textContent()
        .catch(() => null);

      // Quantity (optional)
      let quantity = null;
      const quantityLocator = product.locator('xpath=div[@data-slot-id="PackSize"]');
      if ((await quantityLocator.count()) > 0) {
        quantity = await quantityLocator.textContent().catch(() => null);
      }

      const discountedPrice = this.extractNumber(discountedText);
      const actualPrice = this.extractNumber(actualText);

      let discountPercent = 0;
      if (actualPrice && discountedPrice) {
        discountPercent =
          ((actualPrice - discountedPrice) / actualPrice) * 100;
      }

      results.push({
        name: name?.trim(),
        link: `${process.env.URL}${link}`,
        quantity: quantity?.trim() || null,
        discountedPrice,
        actualPrice,
        discountPercent: Number(discountPercent?.toFixed(2))
      });
    }

    return results;
  }
}