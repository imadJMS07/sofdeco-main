import { createSlice } from '@reduxjs/toolkit';

export const createBaseSlice = ({ name, initialState, reducers = {}, extraReducers = {} }) => {
  const baseInitialState = {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    ...initialState
  };

  const baseReducers = {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    ...reducers
  };

  const baseExtraReducers = (builder) => {
    if (typeof extraReducers === 'function') {
      extraReducers(builder);
    } else {
      Object.entries(extraReducers).forEach(([type, reducer]) => {
        builder.addCase(type, reducer);
      });
    }
  };

  return createSlice({
    name,
    initialState: baseInitialState,
    reducers: baseReducers,
    extraReducers: baseExtraReducers
  });
}; 