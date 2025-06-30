import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactsApi } from '@/services/api/real/contacts.api';

// Async thunks
export const fetchContactInfo = createAsyncThunk(
  'contacts/fetchContactInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contactsApi.getContactInfo();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch contact information');
    }
  }
);

export const submitContactForm = createAsyncThunk(
  'contacts/submitContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await contactsApi.submitContactForm(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to submit contact form');
    }
  }
);

// Initial state
const initialState = {
  contactInfo: {
    email: '',
    phone: '',
    address: '',
    working_hours: '',
    facebook_link: '',
    instagram_link: '',
    location_link: '',
    whatsapp_link: ''
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  formSubmissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  formSubmissionError: null
};

// Slice
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    resetFormSubmissionStatus: (state) => {
      state.formSubmissionStatus = 'idle';
      state.formSubmissionError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch contact info cases
      .addCase(fetchContactInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // If the API returns an array, take the first item
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.contactInfo = action.payload[0];
        } else if (!Array.isArray(action.payload)) {
          // If it's not an array, assume it's the contact object
          state.contactInfo = action.payload;
        }
      })
      .addCase(fetchContactInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch contact information';
      })
      
      // Submit contact form cases
      .addCase(submitContactForm.pending, (state) => {
        state.formSubmissionStatus = 'loading';
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.formSubmissionStatus = 'succeeded';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.formSubmissionStatus = 'failed';
        state.formSubmissionError = action.payload || 'Failed to submit contact form';
      });
  }
});

// Actions
export const { resetFormSubmissionStatus } = contactsSlice.actions;

// Selectors
export const selectContactInfo = (state) => state.contacts.contactInfo;
export const selectContactStatus = (state) => state.contacts.status;
export const selectContactError = (state) => state.contacts.error;
export const selectFormSubmissionStatus = (state) => state.contacts.formSubmissionStatus;
export const selectFormSubmissionError = (state) => state.contacts.formSubmissionError;

// Reducer
export default contactsSlice.reducer;
