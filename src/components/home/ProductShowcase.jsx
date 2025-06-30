import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiShoppingCart, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { addToCart, openCart } from '@/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { 
  addToWishlist, 
  removeFromWishlist, 
  selectIsInWishlist,
  selectWishlistStatus,
  fetchWishlist 
} from '@/features/wishlist/wishlistSlice';
import { toast } from 'react-hot-toast';
import {
  selectFilteredProducts,
  selectCategories,
  selectSelectedCategory,
  setSelectedCategory,
  selectProductStatus,
  selectProductError,
  selectCategoryStatus,
  fetchProducts,
  fetchCategories
} from '@/features/products/productsSlice';
import { formatPrice } from '@/utils/currency';

// Fixed memoized selector for wishlist items
const selectWishlistItems = createSelector(
  [
    state => state,
    (state, products) => products || [] // Fallback to empty array if undefined
  ],
  (state, products) => 
    products.reduce((acc, product) => {
      acc[product.id] = selectIsInWishlist(product.id)(state);
      return acc;
    }, {})
);

const getTimeLeft = (expirationDate) => {
  if (!expirationDate) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      progress: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      isExpired: true
    };
  }

  const now = new Date().getTime();
  const end = new Date(expirationDate).getTime();
  const diff = end - now;
  
  if (diff <= 0) {
    return { 
      days: 0, 
      hours: 0, 
      minutes: 0, 
      seconds: 0, 
      progress: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      isExpired: true 
    };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  const totalDays = 30;
  const daysProgress = Math.min((days / totalDays) * 100, 100);
  const hoursProgress = (hours / 24) * 100;
  const minutesProgress = (minutes / 60) * 100;
  const secondsProgress = (seconds / 60) * 100;
  
  return { 
    days, 
    hours, 
    minutes, 
    seconds,
    progress: {
      days: daysProgress,
      hours: hoursProgress,
      minutes: minutesProgress,
      seconds: secondsProgress
    },
    isExpired: false 
  };
};

const TimerBlock = ({ value, label, progress, isExpired }) => (
  <motion.div 
    className={`relative ${isExpired ? 'opacity-50' : ''}`}
    whileHover={{ scale: 1.05 }}
  >
    <motion.div 
      className={`relative text-center p-3 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl border ${
        isExpired ? 'border-red-200' : 'border-[#C2A45F]/20'
      }`}
      whileHover={{ y: -2 }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <motion.div
          className={`h-full ${isExpired ? 'bg-red-50' : 'bg-[#C2A45F]/10'}`}
          initial={{ y: '100%' }}
          animate={{ y: `${100 - progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <motion.div 
        className={`relative text-lg md:text-xl font-bold ${
          isExpired ? 'text-red-400' : 'text-[#4E3B26]'
        }`}
        animate={{ 
          scale: value === 0 ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="relative text-[10px] font-medium text-[#4E3B26]/50 uppercase tracking-wider mt-1">
        {label}
      </div>
    </motion.div>
  </motion.div>
);

const ProductShowcase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const productStatus = useSelector(selectProductStatus);
  const productError = useSelector(selectProductError);
  const categoryStatus = useSelector(selectCategoryStatus);
  const wishlistStatus = useSelector(selectWishlistStatus);

  // Handle API errors gracefully
  useEffect(() => {
    if (productError) {
      // Extract the error message from the error object
      const errorMessage = typeof productError === 'object' ? 
        productError.message || 'Une erreur est survenue' :
        productError;
      
      toast.error(errorMessage);
    }
  }, [productError]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageError, setImageError] = useState({});
  const [timeLeft, setTimeLeft] = useState({});
  const [isWishlistLoading, setIsWishlistLoading] = useState({});
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // Use the fixed selector with products passed as argument
  const wishlistItems = useSelector(state => selectWishlistItems(state, products));

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
    if (categoryStatus === 'idle') {
      dispatch(fetchCategories());
    }
    dispatch(fetchWishlist());
  }, [dispatch, productStatus, categoryStatus]);

  useEffect(() => {
    if (!products.length) return;

    const initialTimeLeft = {};
    products.forEach(product => {
      initialTimeLeft[product.id] = getTimeLeft(product.expiration_date);
    });
    setTimeLeft(initialTimeLeft);

    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        const newTimeLeft = {};
        products.forEach(product => {
          newTimeLeft[product.id] = getTimeLeft(product.expiration_date);
        });
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [products]);

  const handleAddToCart = async (product, e) => {
    e?.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images && product.images[0]?.image_path,
      quantity: 1
    }));
    dispatch(openCart());
    toast.success('Ajouté au panier !');
  };

  const navigateToProductDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleToggleWishlist = async (product, e) => {
    e?.stopPropagation();
    setIsWishlistLoading(prev => ({ ...prev, [product.id]: true }));
    
    try {
      const isInWishlist = wishlistItems[product.id];
      if (isInWishlist) {
        await dispatch(removeFromWishlist(product.id)).unwrap();
        toast.success('Retiré de la liste de souhaits !');
      } else {
        await dispatch(addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images && product.images[0]?.image_path
        })).unwrap();
        toast.success('Ajouté à la liste de souhaits !');
      }
    } catch (error) {
      toast.error('Échec de la mise à jour de la liste de souhaits. Veuillez réessayer.');
    } finally {
      setIsWishlistLoading(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleImageError = (productId) => {
    setImageError(prev => ({ ...prev, [productId]: true }));
  };

  const displayedProducts = products.slice(0, 4);

  if (productStatus === 'loading' || categoryStatus === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#4E3B26]"></div>
      </div>
    );
  }

  if (productError) {
    // Extract the error message from the error object
    const errorMessage = typeof productError === 'object' ? 
      productError.message || 'An unexpected error occurred' :
      productError;

    return (
      <div className="text-center py-12">
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4E3B26]">
            Produits en Vedette
          </h2>
          <p className="text-[#1A1A1A]/60 text-base md:text-lg font-medium max-w-xl mx-auto">
            Offres à durée limitée sur des meubles haut de gamme
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md p-1.5">
              {/* All Categories button */}
              <motion.button
                key="all-categories"
                onClick={() => dispatch(setSelectedCategory(null))}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  selectedCategory === null
                    ? 'text-white bg-[#4E3B26] shadow-sm' 
                    : 'text-[#4E3B26] hover:bg-[#4E3B26]/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Toutes les Catégories
              </motion.button>
              
              {/* Category buttons */}
              {Array.isArray(categories) && categories.map((category) => (
                <motion.button
                  key={typeof category === 'object' ? category.id : category}
                  onClick={() => dispatch(setSelectedCategory(typeof category === 'object' ? category.name : category))}
                  className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    ((typeof category === 'object' ? category.name : category) === selectedCategory)
                      ? 'text-white bg-[#4E3B26] shadow-sm' 
                      : 'text-[#4E3B26] hover:bg-[#4E3B26]/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {typeof category === 'object' ? category.name : category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute top-4 right-4 z-10 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleAddToCart(product, e)}
                    className="p-2 bg-white/90 backdrop-blur-sm text-[#4E3B26] hover:text-[#C2A45F] shadow-lg rounded-full"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleToggleWishlist(product, e)}
                    disabled={isWishlistLoading[product.id]}
                    className={`p-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full 
                      ${isWishlistLoading[product.id] ? 'opacity-50 cursor-wait' : ''}
                      ${wishlistItems[product.id]
                        ? 'text-red-500'
                        : 'text-[#4E3B26] hover:text-[#C2A45F]'
                      }`}
                  >
                    {isWishlistLoading[product.id] ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiHeart 
                        className={`w-5 h-5 ${
                          wishlistItems[product.id] ? 'fill-current' : ''
                        }`}
                      />
                    )}
                  </motion.button>
                </div>

                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={() => navigateToProductDetail(product.id)}
                />
                
                <img
                  src={product.images && product.images[0]?.image_path}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={() => handleImageError(product.id)}
                />
              </div>

              <div className="p-6" onClick={() => navigateToProductDetail(product.id)}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#4E3B26] mb-2 line-clamp-1 group-hover:text-[#C2A45F] transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating
                            ? 'text-[#C2A45F] fill-[#C2A45F]'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#4E3B26]">
                      {formatPrice(product.price)}
                    </span>
                    {product.original_price && (
                      <span className="text-sm text-[#1A1A1A]/40 line-through">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-[#FAF7F2] rounded-xl p-3">
                  <div className="flex items-center gap-1 mb-2">
                    <SparklesIcon className="h-4 w-4 text-[#C2A45F]" />
                    <span className="text-xs font-semibold text-[#4E3B26]">Special Discount Offers!</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: timeLeft[product.id]?.days || 0, label: "D", key: "days" },
                      { value: timeLeft[product.id]?.hours || 0, label: "H", key: "hours" },
                      { value: timeLeft[product.id]?.minutes || 0, label: "M", key: "minutes" },
                      { value: timeLeft[product.id]?.seconds || 0, label: "S", key: "seconds" }
                    ].map((item) => (
                      <TimerBlock
                        key={item.label}
                        value={item.value}
                        label={item.label}
                        progress={timeLeft[product.id]?.progress?.[item.key] || 0}
                        isExpired={timeLeft[product.id]?.isExpired}
                      />
                    ))}
                  </div>
                  {timeLeft[product.id]?.isExpired && (
                    <div className="text-center mt-2 text-xs font-medium text-red-400">
                      Offer Expired
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;