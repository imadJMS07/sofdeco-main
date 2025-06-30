import { MOCK_CONFIG } from '../config';
import { mockProducts } from './data/products.data';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory cart storage
let cartItems = [];

export const mockCartAPI = {
  getCart: async () => {
    await delay(MOCK_CONFIG.DELAY);
    return { data: cartItems };
  },

  addToCart: async (productId, quantity = 1) => {
    await delay(MOCK_CONFIG.DELAY);
    const product = mockProducts.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');
    
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }
    
    return { data: cartItems };
  },

  removeFromCart: async (productId) => {
    await delay(MOCK_CONFIG.DELAY);
    cartItems = cartItems.filter(item => item.id !== productId);
    return { data: cartItems };
  },

  updateQuantity: async (productId, quantity) => {
    await delay(MOCK_CONFIG.DELAY);
    const item = cartItems.find(item => item.id === productId);
    if (!item) throw new Error('Product not found in cart');
    
    if (quantity <= 0) {
      cartItems = cartItems.filter(item => item.id !== productId);
    } else {
      item.quantity = quantity;
    }
    
    return { data: cartItems };
  },

  clearCart: async () => {
    await delay(MOCK_CONFIG.DELAY);
    cartItems = [];
    return { data: cartItems };
  }
}; 