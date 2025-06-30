import { MOCK_CONFIG } from '../config';
import { mockProducts } from './data/products.data';
import { mockCategories } from './data/categories.data';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productsApi = {
  getProducts: async (params = {}) => {
    const { page = 0, size = 12, sortBy = 'name', direction = 'desc' } = params;
    await delay(MOCK_CONFIG.DELAY);
    
    // Sort products based on sortBy and direction
    const sortedProducts = [...mockProducts].sort((a, b) => {
      let valueA, valueB;
      
      // Get values to compare based on sortBy
      switch (sortBy) {
        case 'price':
          valueA = parseFloat(a.price);
          valueB = parseFloat(b.price);
          break;
        case 'created_at':
          valueA = new Date(a.created_at || Date.now());
          valueB = new Date(b.created_at || Date.now());
          break;
        case 'name':
          valueA = a.name || '';
          valueB = b.name || '';
          break;
        default:
          valueA = a.id;
          valueB = b.id;
      }
      
      // Compare based on direction
      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    // Apply pagination
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
    
    // Create pagination metadata
    const totalItems = mockProducts.length;
    const totalPages = Math.ceil(totalItems / size);
    
    return {
      data: paginatedProducts,
      current_page: page,
      last_page: totalPages - 1,
      total: totalItems,
      per_page: size
    };
  },

  getCategories: async () => {
    await delay(MOCK_CONFIG.DELAY);
    return { data: mockCategories };
  },

  getProductById: async (productId) => {
    await delay(MOCK_CONFIG.DELAY);
    const product = mockProducts.find(p => String(p.id) === String(productId));
    if (!product) throw new Error('Product not found');
    return { data: product };
  },

  getProductsByCategory: async (categorySlug) => {
    await delay(MOCK_CONFIG.DELAY);
    if (categorySlug.toLowerCase() === 'all') {
      return { data: mockProducts };
    }
    
    // Find the category
    const category = mockCategories.find(c => c.slug === categorySlug);
    if (!category) {
      throw new Error('Category not found');
    }

    // Get all products that belong to any of the subcategories
    const products = mockProducts.filter(product => 
      category.subcategories.includes(product.category_name)
    );
    return { data: products };
  },

  getFeaturedProducts: async () => {
    await delay(MOCK_CONFIG.DELAY);
    const featured = mockProducts.filter(p => p.featured === 1);
    return { data: featured };
  },

  getNewArrivals: async () => {
    await delay(MOCK_CONFIG.DELAY);
    // Get products from the last 30 days based on created_at
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newArrivals = mockProducts.filter(p => {
      const productDate = new Date(p.specification.created_at);
      return productDate >= thirtyDaysAgo;
    });
    return { data: newArrivals };
  },

  searchProducts: async (query) => {
    await delay(MOCK_CONFIG.DELAY);
    const searchResults = mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category_name.toLowerCase().includes(query.toLowerCase())
    );
    return { data: searchResults };
  }
}; 