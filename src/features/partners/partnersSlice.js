import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { partnersApi as realPartnersApi } from '@/services/api/real/partners.api';
import { partnersApi as mockPartnersApi } from '@/services/api/mock/partners.mock';

// Use mock or real API based on environment
const useMockApi = import.meta.env.VITE_USE_MOCK_DATA;
const api = useMockApi ? mockPartnersApi : realPartnersApi;

// Async thunks
export const fetchPartners = createAsyncThunk(
  'partners/fetchPartners',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getPartners();
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch partners');
    }
  }
);

export const fetchPartnerById = createAsyncThunk(
  'partners/fetchPartnerById',
  async (id, { rejectWithValue }) => {
    try {
      return await api.getPartnerById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch partner');
    }
  }
);

export const updatePartnerStatus = createAsyncThunk(
  'partners/updatePartnerStatus',
  async ({ partnerId, partnerData }, { rejectWithValue }) => {
    try {
      return await api.updatePartner(partnerId, partnerData);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update partner');
    }
  }
);

const initialState = {
  partners: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedPartner: null,
  filters: {
    isActive: true,
    sortBy: 'priority' // 'priority' | 'name' | 'newest'
  }
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setSelectedPartner: (state, action) => {
      state.selectedPartner = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchPartners
      .addCase(fetchPartners.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.partners = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetchPartnerById
      .addCase(fetchPartnerById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPartnerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPartner = action.payload;
      })
      .addCase(fetchPartnerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle updatePartnerStatus
      .addCase(updatePartnerStatus.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePartnerStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedPartner = action.payload;
        const index = state.partners.findIndex(p => p.id === updatedPartner.id);
        if (index !== -1) {
          state.partners[index] = updatedPartner;
        }
      })
      .addCase(updatePartnerStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Base selectors
export const selectAllPartners = (state) => state.partners.partners;
export const selectPartnerById = (id) => (state) => 
  state.partners.partners.find(partner => String(partner.id) === String(id));
export const selectPartnerStatus = (state) => state.partners.status;
export const selectPartnerError = (state) => state.partners.error;
export const selectSelectedPartner = (state) => state.partners.selectedPartner;
export const selectFilters = (state) => state.partners.filters;

// Memoized filtered partners selector
export const selectFilteredPartners = createSelector(
  [selectAllPartners, selectFilters],
  (partners, filters) => {
    const { isActive, sortBy } = filters;

    let filteredPartners = partners;

    // Apply active filter
    if (isActive !== null && isActive !== undefined) {
      filteredPartners = filteredPartners.filter(partner => partner.isActive === isActive);
    }

    // Apply sorting
    switch (sortBy) {
      case 'priority':
        return [...filteredPartners].sort((a, b) => a.priority - b.priority);
      case 'name':
        return [...filteredPartners].sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
      default:
        return filteredPartners;
    }
  }
);

export const { setSelectedPartner, updateFilters, clearFilters } = partnersSlice.actions;

export default partnersSlice.reducer; 