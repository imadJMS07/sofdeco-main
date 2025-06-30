// Mock APIs
export * from './mock';

// Real APIs
export * from './real';

// Config
export * from './config';

import api from './config';
import { productsApi as realProductsApi } from './real/products.api';
import { productsApi as mockProductsApi } from './mock/products.mock';

// Use mock API for development
const isDevelopment = import.meta.env.MODE === 'development';
const activeProductsApi = isDevelopment ? mockProductsApi : realProductsApi;

export {
  api as default,
  activeProductsApi as productsApi,
}; 