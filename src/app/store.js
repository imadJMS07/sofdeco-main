import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Import reducers
import wishlistReducer from '@/features/wishlist/wishlistSlice';
import productsReducer from '@/features/products/productsSlice';
import cartReducer from '@/features/cart/cartSlice';
import uiReducer from '@/features/ui/uiSlice';
import searchReducer from '@/features/search/searchSlice';
import specialOffersReducer from '@/features/specialOffer/specialOfferSlice';
import partnersReducer from '../features/partners/partnersSlice';
import reviewsReducer from '@/features/reviews/reviewsSlice';
import ordersReducer from '@/features/orders/ordersSlice';
import contactsReducer from '@/features/contacts/contactsSlice';
import blogsReducer from '@/features/blogs/blogsSlice';

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['wishlist', 'cart'], // Only persist these reducers
};

// Root reducer
const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  products: productsReducer,
  cart: cartReducer,
  ui: uiReducer,
  search: searchReducer,
  specialOffers: specialOffersReducer,
  partners: partnersReducer,
  reviews: reviewsReducer,
  orders: ordersReducer,
  contacts: contactsReducer,
  blogs: blogsReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: import.meta.env.MODE !== 'production',
});

// Persistor
export const persistor = persistStore(store); 