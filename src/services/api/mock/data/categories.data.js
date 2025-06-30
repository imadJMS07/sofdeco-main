import { mockProducts } from './products.data';
import { mockPromotions } from './promotions.data';

// Get unique categories from both products and promotions
const getUniqueCategories = () => {
  const productCategories = mockProducts.map(p => p.category_name);
  const promotionCategories = mockPromotions.map(p => p.category_name);
  const allCategories = [...productCategories, ...promotionCategories];
  
  // Get unique categories and sort them alphabetically
  const uniqueCategories = ['All', ...new Set(allCategories)].sort();
  
  // Convert to objects with id and name properties to match what the component expects
  return uniqueCategories.map((name, index) => ({
    id: index + 1,
    name: name
  }));
};

export const mockCategories = getUniqueCategories(); 