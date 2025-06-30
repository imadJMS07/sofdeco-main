import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reviewsApi as realReviewsApi } from '@/services/api/real/reviews.api';
import { reviewsApi as mockReviewsApi } from '@/services/api/mock/reviews.mock';

// Use the real API implementation
const api = realReviewsApi;

// Async thunks
export const fetchProductReviews = createAsyncThunk(
  'reviews/fetchProductReviews',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.getProductReviews(productId);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch product reviews');
    }
  }
);

export const addProductReview = createAsyncThunk(
  'reviews/addProductReview',
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await api.addProductReview(productId, reviewData);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add product review');
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch product reviews
      .addCase(fetchProductReviews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle the API response format which includes a data property
        state.items = action.payload.data || action.payload;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch reviews';
      })
      
      // Add product review
      .addCase(addProductReview.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle the API response format and add the new review to the beginning of the list
        const newReview = action.payload.data || action.payload;
        state.items = [newReview, ...state.items];
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to add review';
      });
  },
});

// Selectors
export const selectAllReviews = (state) => state.reviews.items;
export const selectReviewsStatus = (state) => state.reviews.status;
export const selectReviewsError = (state) => state.reviews.error;

export default reviewsSlice.reducer;
