import api, { ENDPOINTS } from '../config';

export const productsApi = {
  getProducts: async (params = {}) => {
    console.log('Fetching products with params:', params);
    // Convert to 0-based pagination (API uses page=0 for first page)
    const { page = 1, size = 12, sortBy = 'created_at', direction = 'desc', minPrice, maxPrice, name, isSearch = false } = params;
    const apiPage = Math.max(0, page - 1); // Convert from 1-based to 0-based
    
    // Map UI sort options to actual database columns
    let dbSortBy = 'created_at';
    if (sortBy === 'newest') dbSortBy = 'created_at';
    else if (sortBy === 'price-low-to-high' || sortBy === 'price-high-to-low') dbSortBy = 'price';
    else if (sortBy === 'name') dbSortBy = 'name';
    else if (sortBy === 'popularity') dbSortBy = 'id'; // Fallback to ID if popularity isn't available
    
    // Determine direction
    let dbDirection = direction;
    if (sortBy === 'price-low-to-high') dbDirection = 'asc';
    if (sortBy === 'price-high-to-low') dbDirection = 'desc';
    
    // Build query parameters
    const queryParams = { 
      page: apiPage, 
      size, 
      sortBy: dbSortBy, 
      direction: dbDirection 
    };
    
    // Add search query if provided
    if (name) {
      queryParams.name = name;
    }
    
    // Add price range parameters if provided
    if (minPrice !== undefined && minPrice !== null) {
      queryParams.min_price = minPrice;
    }
    
    if (maxPrice !== undefined && maxPrice !== null) {
      queryParams.max_price = maxPrice;
    }
    
    try {
      // Use search endpoint if this is a search request
      const endpoint = isSearch ? ENDPOINTS.SEARCH : ENDPOINTS.PRODUCTS;
      const response = await api.get(endpoint, { params: queryParams });
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  getProductsByPriceRange: async (params = {}) => {
    const { minPrice, maxPrice, page = 1, size = 12, sortBy = 'created_at', direction = 'desc' } = params;
    const apiPage = Math.max(0, page - 1); // Convert from 1-based to 0-based
    
    // Map UI sort options to actual database columns (same as getProducts)
    let dbSortBy = 'created_at';
    if (sortBy === 'newest') dbSortBy = 'created_at';
    else if (sortBy === 'price-low-to-high' || sortBy === 'price-high-to-low') dbSortBy = 'price';
    else if (sortBy === 'name') dbSortBy = 'name';
    else if (sortBy === 'popularity') dbSortBy = 'id';
    
    // Determine direction
    let dbDirection = direction;
    if (sortBy === 'price-low-to-high') dbDirection = 'asc';
    if (sortBy === 'price-high-to-low') dbDirection = 'desc';
    
    const response = await api.get(`${ENDPOINTS.PRODUCTS}/price-range`, {
      params: {
        min_price: minPrice,
        max_price: maxPrice,
        page: apiPage,
        size,
        sortBy: dbSortBy,
        direction: dbDirection
      }
    });
    return response;
  },

  getProductById: async (productId) => {
    const response = await api.get(`${ENDPOINTS.PRODUCTS}/${productId}`);
    return response;
  },

  getProductsByCategory: async (categoryId) => {
    const response = await api.get(`${ENDPOINTS.PRODUCTS}/category`, {
      params: { category_id: categoryId }
    });
    return response;
  },

  getFeaturedProducts: async () => {
    const response = await api.get(`${ENDPOINTS.PRODUCTS}/featured`);
    return response;
  },

  getNewArrivals: async () => {
    const response = await api.get(`${ENDPOINTS.PRODUCTS}/new-arrivals`);
    return response;
  },

  searchProducts: async (query) => {
    const response = await api.get(`${ENDPOINTS.SEARCH}/products`, {
      params: { query }
    });
    return response;
  },
  
  getCategories: async () => {
    const response = await api.get(ENDPOINTS.CATEGORIES);
    return response;
  }
}; 