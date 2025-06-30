import { MOCK_CONFIG } from "../config";
import { store } from "@/app/store";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockWishlistAPI = {
  getWishlist: async () => {
    await delay(MOCK_CONFIG.DELAY);
    const state = store.getState();
    return { data: state.wishlist.items || [] };
  },

  addToWishlist: async (product) => {
    await delay(MOCK_CONFIG.DELAY);
    const state = store.getState();
    const currentItems = state.wishlist.items || [];
    if (!currentItems.some(item => item.id === product.id)) {
      const newItems = [...currentItems, product];
      return { data: newItems };
    }
    return { data: currentItems };
  },

  removeFromWishlist: async (productId) => {
    await delay(MOCK_CONFIG.DELAY);
    const state = store.getState();
    const currentItems = state.wishlist.items || [];
    const newItems = currentItems.filter(item => item.id !== productId);
    return { data: newItems };
  },

  clearWishlist: async () => {
    await delay(MOCK_CONFIG.DELAY);
    return { data: [] };
  },

  isInWishlist: async (productId) => {
    await delay(MOCK_CONFIG.DELAY);
    const state = store.getState();
    const currentItems = state.wishlist.items || [];
    return { data: currentItems.some(item => item.id === productId) };
  },

  moveToCart: async (productId) => {
    await delay(MOCK_CONFIG.DELAY);
    const state = store.getState();
    const currentItems = state.wishlist.items || [];
    const item = currentItems.find(item => item.id === productId);
    if (!item) {
      throw new Error('Product not found in wishlist');
    }
    const newItems = currentItems.filter(item => item.id !== productId);
    return { 
      data: {
        wishlist: newItems,
        movedItem: item
      }
    };
  }
};
