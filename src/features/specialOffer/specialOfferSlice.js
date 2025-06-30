import { createBaseSlice } from '../baseSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '@/services/api';

// Async thunks
export const fetchSpecialOffers = createAsyncThunk(
  'specialOffers/fetchSpecialOffers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsApi.getFeaturedProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const specialOfferSlice = createBaseSlice({
  name: 'specialOffers',
  initialState: {
    offers: [],
    activeOffer: null,
    popupVisible: false,
    currentPromoCode: null,
    appliedPromoCodes: [],
    discountTotal: 0,
  },
  reducers: {
    setActiveOffer: (state, action) => {
      state.activeOffer = action.payload;
    },
    togglePopup: (state) => {
      state.popupVisible = !state.popupVisible;
    },
    setPromoCode: (state, action) => {
      state.currentPromoCode = action.payload;
    },
    applyPromoCode: (state, action) => {
      if (!state.appliedPromoCodes.includes(action.payload)) {
        state.appliedPromoCodes.push(action.payload);
      }
    },
    removePromoCode: (state, action) => {
      state.appliedPromoCodes = state.appliedPromoCodes.filter(
        (code) => code !== action.payload
      );
    },
    updateDiscountTotal: (state, action) => {
      state.discountTotal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialOffers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.offers = action.payload;
      })
      .addCase(fetchSpecialOffers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Actions
export const {
  setActiveOffer,
  togglePopup,
  setPromoCode,
  applyPromoCode,
  removePromoCode,
  updateDiscountTotal,
} = specialOfferSlice.actions;

// Selectors
export const selectOffers = (state) => state.specialOffers.offers;
export const selectActiveOffer = (state) => state.specialOffers.activeOffer;
export const selectPopupVisible = (state) => state.specialOffers.popupVisible;
export const selectCurrentPromoCode = (state) => state.specialOffers.currentPromoCode;
export const selectAppliedPromoCodes = (state) => state.specialOffers.appliedPromoCodes;
export const selectDiscountTotal = (state) => state.specialOffers.discountTotal;
export const selectSpecialOffersStatus = (state) => state.specialOffers.status;
export const selectSpecialOffersError = (state) => state.specialOffers.error;

export default specialOfferSlice.reducer; 