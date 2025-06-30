import api, { ENDPOINTS } from '../config';

export const wishlistAPI = {
  getWishlist: async () => {
    const response = await api.get(ENDPOINTS.WISHLIST);
    return response.data;
  },

  addToWishlist: async (productId) => {
    const response = await api.post(ENDPOINTS.WISHLIST, { productId });
    return response.data;
  },

  removeFromWishlist: async (productId) => {
    const response = await api.delete(`${ENDPOINTS.WISHLIST}/${productId}`);
    return response.data;
  },

  clearWishlist: async () => {
    const response = await api.delete(ENDPOINTS.WISHLIST);
    return response.data;
  },

  isInWishlist: async (productId) => {
    const response = await api.get(`${ENDPOINTS.WISHLIST}/check/${productId}`);
    return response.data;
  },

  moveToCart: async (productId) => {
    const response = await api.post(`${ENDPOINTS.WISHLIST}/move-to-cart/${productId}`);
    return response.data;
  }
}; 