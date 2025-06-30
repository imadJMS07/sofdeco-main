import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PlusIcon, MinusIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { COLORS } from '@/constants/colors';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '@/features/wishlist/wishlistSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/utils/currency';

export const CartModal = ({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleMoveToWishlist = (item) => {
    dispatch(addToWishlist(item));
    onRemoveItem(item.id);
    toast.success('Item moved to wishlist!');
  };

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50" 
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-xl shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex justify-between items-center p-6 border-b border-gray-100"
              >
                <div>
                  <h2 
                    className="text-xl font-semibold"
                    style={{ color: COLORS.text }}
                  >
                    Shopping Cart
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  style={{ color: COLORS.text }}
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </motion.div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                  {cartItems.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center justify-center h-full p-8 text-center"
                    >
                      <div 
                        className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${COLORS.secondary}20` }}
                      >
                        <ShoppingCartIcon 
                          className="h-8 w-8"
                          style={{ color: COLORS.secondary }}
                        />
                      </div>
                      <p 
                        className="text-lg font-medium mb-2"
                        style={{ color: COLORS.text }}
                      >
                        Your cart is empty
                      </p>
                      <p className="text-sm text-gray-500">
                        Start adding items to your cart
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 space-y-4"
                    >
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            delay: index * 0.1
                          }}
                          className="group bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="p-4 flex items-center space-x-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 group-hover:shadow-md transition-shadow">
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
                              <p 
                                className="text-sm font-semibold mt-1"
                                style={{ color: COLORS.secondary }}
                              >
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              <div className="flex items-center space-x-3 mt-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                  style={{ color: COLORS.secondary }}
                                >
                                  <MinusIcon className="h-4 w-4" />
                                </motion.button>
                                <span 
                                  className="w-8 text-center font-medium"
                                  style={{ color: COLORS.text }}
                                >
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                  style={{ color: COLORS.secondary }}
                                >
                                  <PlusIcon className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onRemoveItem(item.id)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors self-start opacity-0 group-hover:opacity-100"
                                style={{ color: COLORS.text }}
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleMoveToWishlist(item)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors self-start opacity-0 group-hover:opacity-100"
                                style={{ color: COLORS.secondary }}
                              >
                                <HeartIcon className="h-5 w-5" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="border-t border-gray-100 p-6 bg-white/50 backdrop-blur-sm"
                >
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span 
                        className="text-lg font-medium"
                        style={{ color: COLORS.text }}
                      >
                        Total
                      </span>
                      <span 
                        className="text-xl font-semibold"
                        style={{ color: COLORS.primary }}
                      >
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 rounded-xl text-white font-medium shadow-lg transition-all duration-300"
                    style={{ 
                      backgroundColor: COLORS.secondary,
                    }}
                    onClick={() => {
                      onClose(); // Close the cart modal
                      navigate('/checkout'); // Navigate to checkout page
                    }}
                  >
                    Proceed to Checkout
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}; 