import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ArrowRightIcon, SparklesIcon, ShoppingBagIcon, TagIcon } from '@heroicons/react/24/outline';
import { FireIcon, StarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@/components/common/Rating';
import CountdownTimer from '@/components/common/CountdownTimer';
import { fetchProducts, selectAllProducts, selectProductStatus, selectProductError } from '@/features/products/productsSlice';
import { COLORS } from '@/constants/colors';
import { formatPrice } from '@/utils/currency';

const getTimeLeft = (end) => {
  const diff = Math.max(0, new Date(end) - new Date());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

export default function SpecialOfferPopup({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const offersStatus = useSelector(selectProductStatus);
  const offersError = useSelector(selectProductError);
  
  // Helper function to check if a product is active (not expired)
  const isProductActive = (product) => {
    if (!product.expiration_date) return true; // No expiration date = always active
    const expiration = new Date(product.expiration_date);
    const now = new Date();
    return expiration >= now;
  };

  // Memoize the filtered products to prevent unnecessary recalculations
  const specialOffers = React.useMemo(() => 
    products.filter(product => {
      const isActive = isProductActive(product);
      return product.featured === 1 || 
        (product.original_price && product.price && 
         parseFloat(product.original_price) > parseFloat(product.price)) ||
        isActive;
    }),
    [products]
  );
  
  // Memoize display products
  const displayProducts = React.useMemo(() => 
    specialOffers.length > 0 
      ? specialOffers 
      : products.filter(p => isProductActive(p)).slice(0, 3),
    [specialOffers, products]
  );
  
  const [timeLeft, setTimeLeft] = useState([]);
  const [isChecked, setIsChecked] = useState(false); // Local state for checkbox
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if popup should be hidden
  const shouldHidePopup = useCallback(() => {
    // Check for 24h hide
    const hide24h = localStorage.getItem('hideSpecialOffer24h');
    if (hide24h && new Date().getTime() < parseInt(hide24h)) {
      return true;
    }
    
    // Check for 15min hide
    const hide15min = localStorage.getItem('hideSpecialOffer15min');
    if (hide15min && new Date().getTime() < parseInt(hide15min)) {
      return true;
    }
    
    return false;
  }, []);
  
  const [isHidden, setIsHidden] = useState(shouldHidePopup());

  // Fetch products from API
  useEffect(() => {
    if (offersStatus === 'idle') {
      dispatch(fetchProducts({ 
        size: 20, // Increased limit to get more products
        sortBy: 'discount',
        order: 'desc',
        include: 'discounts' // Make sure to include discounts if they're a relationship
      }))
      .then((result) => {
      })
      .catch((error) => {
      });
    }
  }, [dispatch, offersStatus]);
  
  // Log Redux state changes
  useEffect(() => {
  }, [offersStatus, offersError, products]);

  // Update timeLeft state when offers are loaded
  useEffect(() => {
    if (specialOffers.length === 0) return;
    
    // Create a stable reference for the expiration dates
    const expirationDates = specialOffers.map(offer => 
      offer.expiration_date || new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()
    );
    
    const newTimeLeft = expirationDates.map(date => getTimeLeft(date));
    
    setTimeLeft(prev => {
      // Only update if the time values have actually changed
      return JSON.stringify(prev) === JSON.stringify(newTimeLeft) ? prev : newTimeLeft;
    });
  }, [JSON.stringify(specialOffers.map(offer => offer.id))]); // Only depend on offer IDs and expiration dates

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Standard mobile breakpoint
    };
    
    // Check initially
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Update countdown timer every second
  useEffect(() => {
    if (specialOffers.length === 0) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTimeLeft = specialOffers.map(offer => {
          const countdownEnd = offer.expiration_date || 
            new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString();
          return getTimeLeft(countdownEnd);
        });
        
        // Only update if the time values have actually changed
        return JSON.stringify(prev) === JSON.stringify(newTimeLeft) 
          ? prev 
          : newTimeLeft;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [specialOffers]);

  // Toggle checkbox state
  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };
  
  // Handle close button click
  const handleClose = () => {
    if (isChecked) {
      // User checked the box - hide for 24 hours
      const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('hideSpecialOffer24h', expirationTime.toString());
    } else {
      // User didn't check the box - hide for 15 minutes
      const expirationTime = new Date().getTime() + (15 * 60 * 1000);
      localStorage.setItem('hideSpecialOffer15min', expirationTime.toString());
    }
    
    // Update hidden state and close popup
    setIsHidden(true);
    onClose();
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    onClose();
  };

  const handleAllProducts = () => {
    navigate('/products');
    onClose();
  };

  // Check if we should hide the popup
  useEffect(() => {
    // Set up interval to check hiding status every minute
    const checkHidingInterval = setInterval(() => {
      setIsHidden(shouldHidePopup());
    }, 60000); // Check every minute
    
    return () => clearInterval(checkHidingInterval);
  }, [shouldHidePopup]);
  
  if (isMobile || isHidden) return null;
  
  // Show loading state
  if (offersStatus === 'loading') {
    return null; // Don't show popup while loading
  }
  
  // Handle error state
  if (offersStatus === 'failed') {
    return null; // Don't show popup if there's an error
  }
  
  // Don't show if no offers available
  if (!specialOffers || specialOffers.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg p-2 sm:p-3"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2] rounded-xl shadow-lg max-w-3xl w-[85%] p-2 sm:p-3 md:p-4 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gradient-to-br from-[#4E3B26]/10 to-[#C2A45F]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md" />
        <div className="absolute bottom-0 right-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gradient-to-tl from-[#C2A45F]/10 to-[#4E3B26]/10 rounded-full translate-x-1/2 translate-y-1/2 blur-md" />

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-[#FAF7F2] transition-colors z-10"
        >
          <XMarkIcon className="w-4 h-4 text-[#4E3B26]" />
        </motion.button>

        {/* Header */}
        <div className="text-center mb-3 sm:mb-4 md:mb-5 relative">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex items-center justify-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-3"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FireIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#C2A45F]" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <SparklesIcon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#4E3B26]" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <TagIcon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#C2A45F]" />
            </motion.div>
          </motion.div>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-[#4E3B26] via-[#C2A45F] to-[#4E3B26] bg-clip-text text-transparent bg-[length:200%] animate-gradient">
            Limited-Time Offers
          </h2>
          <p className="text-[#1A1A1A] text-xs sm:text-xs md:text-sm font-medium max-w-md mx-auto">Special prices on premium furniture - act fast!</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {specialOffers.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              onClick={() => handleProductClick(product.id)}
              className="group relative bg-white rounded-2xl p-5 flex flex-col items-center cursor-pointer transition-all duration-300 border border-[#C2A45F]/20 hover:border-[#C2A45F]/50 hover:shadow-[0_12px_40px_rgb(194,164,95,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#4E3B26]/5 via-[#C2A45F]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              
              {/* Category Badge */}
              {product.category_name && (
                <div className="absolute top-3 left-3 z-20 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#4E3B26] shadow-sm border border-[#C2A45F]/10">
                  {product.category_name}
                </div>
              )}

              <div className="relative z-10 w-full">
                <div className="relative w-full aspect-square mb-3 sm:mb-4 md:mb-5 rounded-xl overflow-hidden bg-gradient-to-br from-[#FAF7F2] to-white">
                  <img
                    src={product.images && product.images[0]?.image_path || product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/products/placeholder.jpg';
                    }}
                  />
                  {product.original_price && product.price && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 right-2 bg-gradient-to-r from-[#4E3B26] to-[#C2A45F] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                    >
                      -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                    </motion.div>
                  )}
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 -mt-8 sm:-mt-10 relative shadow-sm border border-[#C2A45F]/20">
                  <CountdownTimer {...timeLeft[index]} />

                  <h3 className="text-sm sm:text-base font-semibold mt-1.5 sm:mt-2 text-center line-clamp-1 text-[#111827] group-hover:text-[#C2A45F] transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Description preview - hide completely */}
                  <p className="hidden">
                    {product.description?.substring(0, 60)}...
                  </p>

                  <div className="mt-1.5 sm:mt-2 flex justify-center">
                    <Rating value={product.rating || 0} size="xs" />
                    <span className="text-[10px] text-[#1A1A1A]/60 ml-1">
                      ({product.rating || 0})
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 mt-1.5 sm:mt-2">
                    <span className="text-base font-bold bg-gradient-to-r from-[#4E3B26] to-[#C2A45F] bg-clip-text text-transparent">
                      {formatPrice(product.price)}
                    </span>
                    {product.original_price && (
                      <span className="text-gray-400 line-through text-xs">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>
                  
                  {/* Shop now button */}
                  <div className="mt-2 sm:mt-3 flex justify-center">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 bg-[#4E3B26]/10 hover:bg-[#4E3B26]/15 text-[#4E3B26] text-[10px] font-medium py-1 px-2 rounded-full transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.id);
                      }}
                    >
                      <ShoppingBagIcon className="w-2.5 h-2.5" />
                      Shop Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3 relative">
            <motion.button
            whileHover={{ scale: 1.03, translateY: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAllProducts}
            className="bg-gradient-to-r from-[#4E3B26] via-[#C2A45F] to-[#4E3B26] bg-[length:200%] animate-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md shadow-sm hover:shadow transition-all duration-300 text-xs font-bold flex items-center gap-1.5 group"
          >
            <span>VIEW ALL</span>
            <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-white" />
          </motion.button>
          
          <div className="w-full max-w-xs border-t border-[#C2A45F]/20 pt-2 mt-1">
            <div className="flex flex-row items-center justify-center">
              <label className="flex items-center justify-center gap-1.5 text-[10px] text-[#1A1A1A] cursor-pointer hover:text-[#4E3B26] transition-colors">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxToggle}
                  className="rounded text-[#C2A45F] focus:ring-[#C2A45F] h-3 w-3"
                />
                Hide for 24 hours
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 