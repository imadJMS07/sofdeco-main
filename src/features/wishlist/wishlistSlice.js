import { createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { createBaseSlice } from '../baseSlice';
import { wishlistAPI } from '@/services/api/real/wishlist.api';
import { mockWishlistAPI } from '@/services/api/mock/wishlist.mock';

// Use mock or real API based on environment
const useMockApi = import.meta.env.VITE_USE_MOCK_DATA;
const api = useMockApi ? mockWishlistAPI : wishlistAPI;

// Async Thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getWishlist();
      return response.data || response; // Handle both mock and real API responses
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (product, { rejectWithValue }) => {
    try {
      const response = await api.addToWishlist(product);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.removeFromWishlist(productId);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove from wishlist');
    }
  }
);

export const moveToCart = createAsyncThunk(
  'wishlist/moveToCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.moveToCart(productId);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to move item to cart');
    }
  }
);

// Create the slice
const wishlistSlice = createBaseSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    lastUpdated: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Move to cart
      .addCase(moveToCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.wishlist;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistStatus = (state) => state.wishlist.status;
export const selectWishlistError = (state) => state.wishlist.error;
export const selectLastUpdated = (state) => state.wishlist.lastUpdated;

export const selectIsInWishlist = (productId) =>
  createSelector(
    [selectWishlistItems],
    (items) => items.some(item => item.id === productId)
  );

export default wishlistSlice.reducer; 