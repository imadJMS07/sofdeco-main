import api, { ENDPOINTS } from '../config';

export const cartAPI = {
  getCart: async () => {
    const response = await api.get(ENDPOINTS.CART);
    return response.data;
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await api.post(ENDPOINTS.CART, { productId, quantity });
    return response.data;
  },

  removeFromCart: async (productId) => {
    const response = await api.delete(`${ENDPOINTS.CART}/${productId}`);
    return response.data;
  },

  updateQuantity: async (productId, quantity) => {
    const response = await api.patch(`${ENDPOINTS.CART}/${productId}`, { quantity });
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete(ENDPOINTS.CART);
    return response.data;
  }
}; 