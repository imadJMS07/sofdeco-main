import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersApi } from '@/services/api/real/orders.api';
import { toast } from 'react-hot-toast';

// Create order thunk
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await ordersApi.createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create order');
    }
  }
);

// Get orders thunk
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ordersApi.getOrders();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch orders');
    }
  }
);

// Update order status thunk
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await ordersApi.updateOrderStatus(orderId, status);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update order status');
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  paymentStatus: 'idle' // 'idle' | 'processing' | 'succeeded' | 'failed'
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create order cases
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
        toast.success('Order created successfully!');
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(action.payload || 'Failed to create order');
      })
      
      // Get orders cases
      .addCase(getOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(action.payload || 'Failed to fetch orders');
      })
      
      // Update order status cases
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedOrder = action.payload;
        state.orders = state.orders.map(order => 
          order.id === updatedOrder.id ? updatedOrder : order
        );
        toast.success('Order status updated successfully!');
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(action.payload || 'Failed to update order status');
      });
  }
});

export const { resetOrderStatus, setPaymentStatus } = ordersSlice.actions;

// Selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrderStatus = (state) => state.orders.status;
export const selectOrderError = (state) => state.orders.error;
export const selectPaymentStatus = (state) => state.orders.paymentStatus;

export default ordersSlice.reducer;
