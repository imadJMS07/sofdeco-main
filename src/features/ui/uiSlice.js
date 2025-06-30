import { createBaseSlice } from '../baseSlice';

const uiSlice = createBaseSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    isSidebarOpen: false,
    isSearchOpen: false,
    isFilterDrawerOpen: false,
    isMobileMenuOpen: false,
    activeModal: null,
    notifications: [],
    breadcrumbs: [],
    loading: {
      global: false,
      products: false,
      cart: false,
      wishlist: false,
    },
    isWishlistOpen: false,
    isCartOpen: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
      // Close other overlays
      state.isWishlistOpen = false;
      state.isCartOpen = false;
      state.isMobileMenuOpen = false;
      state.activeModal = null;
    },
    toggleFilterDrawer: (state) => {
      state.isFilterDrawerOpen = !state.isFilterDrawerOpen;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
      // Close other overlays
      state.isWishlistOpen = false;
      state.isCartOpen = false;
      state.isSearchOpen = false;
      state.activeModal = null;
    },
    setActiveModal: (state, action) => {
      state.activeModal = action.payload;
      // Close other overlays
      state.isWishlistOpen = false;
      state.isCartOpen = false;
      state.isSearchOpen = false;
      state.isMobileMenuOpen = false;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
    toggleWishlist: (state) => {
      state.isWishlistOpen = !state.isWishlistOpen;
      // Close other overlays
      state.isCartOpen = false;
      state.isSearchOpen = false;
      state.isMobileMenuOpen = false;
      state.activeModal = null;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
      // Close other overlays
      state.isWishlistOpen = false;
      state.isSearchOpen = false;
      state.isMobileMenuOpen = false;
      state.activeModal = null;
    },
    closeAllOverlays: (state) => {
      state.isWishlistOpen = false;
      state.isCartOpen = false;
      state.isSearchOpen = false;
      state.isMobileMenuOpen = false;
      state.activeModal = null;
    }
  },
});

// Actions
export const {
  toggleTheme,
  toggleSidebar,
  toggleSearch,
  toggleFilterDrawer,
  toggleMobileMenu,
  setActiveModal,
  addNotification,
  removeNotification,
  setBreadcrumbs,
  setLoading,
  toggleWishlist,
  toggleCart,
  closeAllOverlays
} = uiSlice.actions;

// Selectors
export const selectTheme = (state) => state.ui.theme;
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export const selectIsSearchOpen = (state) => state.ui.isSearchOpen;
export const selectIsFilterDrawerOpen = (state) => state.ui.isFilterDrawerOpen;
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;
export const selectActiveModal = (state) => state.ui.activeModal;
export const selectNotifications = (state) => state.ui.notifications;
export const selectBreadcrumbs = (state) => state.ui.breadcrumbs;
export const selectLoading = (state) => state.ui.loading;
export const selectIsWishlistOpen = (state) => state.ui.isWishlistOpen;
export const selectIsCartOpen = (state) => state.ui.isCartOpen;

export default uiSlice.reducer; 