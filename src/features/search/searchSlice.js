import { createBaseSlice } from '../baseSlice';

const searchSlice = createBaseSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    filters: {
      category: 'ALL',
      priceRange: [0, 10000],
      rating: 0,
      sortBy: 'relevance',
    },
    recentSearches: [],
    suggestions: [],
    isVoiceSearchActive: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    addRecentSearch: (state, action) => {
      // Add to front, remove duplicates, limit to 10
      const search = action.payload;
      state.recentSearches = [
        search,
        ...state.recentSearches.filter((item) => item !== search),
      ].slice(0, 10);
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    toggleVoiceSearch: (state) => {
      state.isVoiceSearchActive = !state.isVoiceSearchActive;
    },
    resetSearch: (state) => {
      state.query = '';
      state.results = [];
      state.suggestions = [];
      state.isVoiceSearchActive = false;
    },
  },
});

// Actions
export const {
  setQuery,
  setResults,
  updateFilters,
  addRecentSearch,
  clearRecentSearches,
  setSuggestions,
  toggleVoiceSearch,
  resetSearch,
} = searchSlice.actions;

// Selectors
export const selectSearchQuery = (state) => state.search.query;
export const selectSearchResults = (state) => state.search.results;
export const selectSearchFilters = (state) => state.search.filters;
export const selectRecentSearches = (state) => state.search.recentSearches;
export const selectSuggestions = (state) => state.search.suggestions;
export const selectIsVoiceSearchActive = (state) => state.search.isVoiceSearchActive;

export default searchSlice.reducer; 