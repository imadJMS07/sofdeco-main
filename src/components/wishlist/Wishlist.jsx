import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FiX, FiShoppingCart, FiTrash2, FiEye } from 'react-icons/fi';
import { COLORS } from '@/constants/colors';
import { useNavigate } from 'react-router-dom';
import {
  selectWishlistItems,
  selectWishlistStatus,
  fetchWishlist,
  removeFromWishlist
} from '@/features/wishlist/wishlistSlice';
import { addToCart } from '@/features/cart/cartSlice';
import { selectIsWishlistOpen, toggleWishlist } from '@/features/ui/uiSlice';
import { formatPrice } from '@/utils/currency';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectWishlistItems);
  const isOpen = useSelector(selectIsWishlistOpen);
  const status = useSelector(selectWishlistStatus);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isOpen]);

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  const handleSeeDetails = (productId) => {
    dispatch(toggleWishlist()); // Close wishlist panel
    navigate(`/products/${String(productId)}`); // Navigate to product details with string ID
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => dispatch(toggleWishlist())}
          />

          {/* Wishlist Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-xl shadow-xl z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: COLORS.text }}>
                  Wishlist
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(toggleWishlist())}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiX className="w-6 h-6" style={{ color: COLORS.text }} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto h-[calc(100vh-88px)]">
              {status === 'loading' ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div 
                    className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${COLORS.secondary}20` }}
                  >
                    <FiShoppingCart className="w-8 h-8" style={{ color: COLORS.secondary }} />
                  </div>
                  <p className="text-lg font-medium mb-2" style={{ color: COLORS.text }}>
                    Your wishlist is empty
                  </p>
                  <p className="text-sm text-gray-500">
                    Start adding items to your wishlist
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 
                            className="font-medium text-lg group-hover:text-secondary transition-colors"
                            style={{ color: COLORS.text }}
                          >
                            {item.name}
                          </h3>
                          <p className="text-sm font-semibold mt-1" style={{ color: COLORS.secondary }}>
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleMoveToCart(item)}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                            >
                              Move to Cart
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSeeDetails(item.id)}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
                            >
                              <FiEye className="w-3 h-3" />
                              Details
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Wishlist; 