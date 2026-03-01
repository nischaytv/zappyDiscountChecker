// utils/sortUtils.js

export function sortByHighestDiscount(products) {
  return products.sort((a, b) => b.discountPercent - a.discountPercent);
}