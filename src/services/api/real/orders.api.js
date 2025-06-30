import api, { ENDPOINTS } from '../config';
import { toast } from 'react-hot-toast';

export const ordersApi = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post(ENDPOINTS.ORDERS, orderData);
      return response;
    } catch (error) {
      toast.error('Failed to create order. Please try again.');
      throw error;
    }
  },

  // Get all orders (for user dashboard)
  getOrders: async () => {
    try {
      const response = await api.get(ENDPOINTS.ORDERS);
      return response;
    } catch (error) {
      toast.error('Failed to fetch orders. Please try again.');
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`${ENDPOINTS.ORDERS}/${orderId}/status`, { status });
      return response;
    } catch (error) {
      toast.error('Failed to update order status. Please try again.');
      throw error;
    }
  }
};

export default ordersApi;
