import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { productsApi as realProductsApi } from '@/services/api/real/products.api';
import { productsApi as mockProductsApi } from '@/services/api/mock/products.mock';

// Use mock or real API based on environment

const api = realProductsApi;
// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log('Fetching products with params tetete:', params);
      const response = await api.getProducts(params);
      
      const paginationData = {
        currentPage: response.current_page,
        totalPages: response.last_page,
        totalItems: response.total,
        pageSize: params.size || 12
      };
      
      const products = response.data?.products || response.products || response.data || response || [];
      
      return {
        products: Array.isArray(products) ? products : [],
        pagination: paginationData
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch products');
    }
  }
);

// Note: fetchProductsByPriceRange has been removed in favor of client-side filtering

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProductById(id);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch product');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.getProductsByCategory(categoryId);
      // Ensure we return an array of products
      const products = response.data?.products || response.products || response.data || response || [];
      return Array.isArray(products) ? products : [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch products by category');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({ query, page = 1, size = 12, sortBy = 'name', direction = 'desc' }, { rejectWithValue }) => {
    try {
      const response = await api.get('/search', {
        params: {
          page: page - 1, // Convert to 0-based for API
          size,
          sortBy,
          direction,
          name: query
        }
      });
      
      const paginationData = {
        currentPage: response.current_page,
        totalPages: response.last_page,
        totalItems: response.total,
        pageSize: size
      };
      
      return {
        products: response.data || [],
        pagination: paginationData,
        searchQuery: query
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to search products');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCategories();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch categories');
    }
  }
);

const initialState = {
  products: [],
  product: null,
  categories: [],
  selectedCategory: null,
  status: 'idle',
  error: null,
  categoryStatus: 'idle',
  categoryError: null,
  filteredByCategory: false,
  filteredByPrice: false,
  filters: {
    sortBy: 'newest',
    searchQuery: '',
    priceRange: [0, 10000],
    rating: null,
    availability: 'all',
    discount: 'all',
    colors: [],
    materials: [],
    brands: [],
    tags: [],
    features: []
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 12
  },
  filterOptions: {
    colors: [],
    materials: [],
    brands: [],
    tags: [],
    features: []
  }
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateFilterOptions: (state, action) => {
      state.filterOptions = { ...state.filterOptions, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
        state.filteredByCategory = false;
        state.filteredByPrice = false;
        const filterOptions = {
          colors: [...new Set(action.payload.products.flatMap(p => p.colors || []))],
          materials: [...new Set(action.payload.products.flatMap(p => p.materials || []))],
          brands: [...new Set(action.payload.products.map(p => p.brand).filter(Boolean))],
          tags: [...new Set(action.payload.products.flatMap(p => p.tags || []))],
          features: [...new Set(action.payload.products.flatMap(p => p.features || []))]
        };
        state.filterOptions = filterOptions;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoryStatus = 'loading';
        state.categoryError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.categories = action.payload.data || action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.categoryError = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredByCategory = true;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
        state.filters.searchQuery = action.payload.searchQuery;
        state.filteredByCategory = false;
        state.filteredByPrice = false;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Note: fetchProductsByPriceRange reducers have been removed in favor of client-side filtering
  },
});

// Selectors
export const selectAllProducts = (state) => state.products.products || [];
export const selectProductById = (id) => (state) => {
  const products = state.products.products || [];
  return products.find(product => String(product.id) === String(id));
};
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;
export const selectCategories = (state) => state.products.categories;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectCategoryStatus = (state) => state.products.categoryStatus;
export const selectCategoryError = (state) => state.products.categoryError;
export const selectFilters = (state) => state.products.filters;
export const selectFilterOptions = (state) => state.products.filterOptions;

export const selectPagination = (state) => state.products.pagination;

export const selectFilteredByCategory = (state) => state.products.filteredByCategory;

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectSelectedCategory, selectFilters, selectFilteredByCategory],
  (items, selectedCategory, filters, filteredByCategory) => {
    const {
      priceRange,
      sortBy,
      searchQuery,
      rating,
      availability,
      discount,
      colors,
      materials,
      brands,
      tags,
      features
    } = filters;

    let filteredProducts = items;

    // Category filter - enhanced client-side filtering
    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      filteredProducts = filteredProducts.filter(product => {
        const categoryName = product.category_name || 
                           (product.category && product.category.name) || 
                           (product.category_id && String(product.category_id));
        
        if (!categoryName) {
          return false;
        }
        
        return categoryName.toLowerCase() === selectedCategory.toLowerCase() ||
               (product.category_id && String(product.category_id) === selectedCategory);
      });
    }

    // Price range filter - enhanced client-side filtering
    filteredProducts = filteredProducts.filter(product => {
      // Skip filtering if product or price is undefined
      if (!product || product.price === undefined || product.price === null) {
        return true; // Keep products with no price information
      }
      const price = parseFloat(product.price);
      // Skip NaN prices
      if (isNaN(price)) {
        return true;
      }
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Rating filter - enhanced client-side filtering
    if (rating > 0) {
      filteredProducts = filteredProducts.filter(product => {
        // Handle missing or invalid rating values
        if (product.rating === undefined || product.rating === null) {
          return false; // Skip products with no rating when filtering by rating
        }
        const productRating = parseFloat(product.rating);
        return !isNaN(productRating) && productRating >= rating;
      });
    }

    // Availability filter - enhanced client-side filtering
    if (availability !== 'all') {
      filteredProducts = filteredProducts.filter(product => {
        // Handle missing stock_quantity
        if (product.stock === 0) {
          // If no stock info is available, show in 'out-of-stock' by default
          return availability === 'out-of-stock';
        }
        
        // Parse stock quantity, handling different formats
        const stockQuantity = parseInt(product.stock);
        
        // If stock quantity is not a valid number
        if (isNaN(stockQuantity)) {
          return availability === 'out-of-stock';
        }
        
        // Check stock status based on quantity
        if (availability === 'in-stock') {
          return stockQuantity > 0;
        }
        if (availability === 'out-of-stock') {
          return stockQuantity <= 0;
        }
        
        return true; // For 'all' option
      });
    }

    // Discount filter
    if (discount === 'on-sale') {
      filteredProducts = filteredProducts.filter(product => 
        (product.discount || 0) > 0
      );
    }

    // Color filter
    if (colors.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.colors?.some(color => colors.includes(color))
      );
    }

    // Material filter
    if (materials.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.materials?.some(material => materials.includes(material))
      );
    }

    // Brand filter
    if (brands.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        brands.includes(product.brand)
      );
    }

    // Tags filter
    if (tags.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.tags?.some(tag => tags.includes(tag))
      );
    }

    // Features filter
    if (features.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.features?.some(feature => features.includes(feature))
      );
    }

    // Sorting
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        case 'newest':
        default:
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
    });
  }
);

export const { setSelectedCategory, updateFilters, clearFilters, updateFilterOptions } = productsSlice.actions;

export default productsSlice.reducer; 