import axios from 'axios';

// Mock API configuration
export const MOCK_CONFIG = {
  DELAY: 500, // Simulated network delay in milliseconds
};

// Real API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  TIMEOUT: 5000,
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Create axios instance with custom config
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = ERROR_MESSAGES[Object.keys(STATUS_CODES).find(key => STATUS_CODES[key] === status)] || ERROR_MESSAGES.SERVER_ERROR;
    } else if (error.request) {
      // Request made but no response received
    } else {
      // Error in request configuration
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const ENDPOINTS = {
  PRODUCTS: '/products',
  CART: '/cart',
  WISHLIST: '/wishlist',
  SEARCH: '/search',
  CATEGORIES: '/categories',
  SPECIAL_OFFERS: '/special-offers',
  ORDERS: '/orders',
  BLOGS: '/blogs'
};

// HTTP Status Codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An internal server error occurred.',
  TIMEOUT: 'The request timed out. Please try again.'
};

export default api; 