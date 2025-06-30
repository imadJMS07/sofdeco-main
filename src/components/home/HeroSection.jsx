import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { COLORS } from '@/constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/utils/currency';
import { selectFilteredProducts, fetchProducts } from '@/features/products/productsSlice';
import { addToCart, openCart } from '@/features/cart/cartSlice';

const BackgroundImage = React.memo(({ image }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [image]);

  return (
    <>
      {/* Fallback color while loading */}
      <div className="absolute inset-0 bg-[#FAF7F2]" />
      
      {/* Actual background image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(${image})`,
          transform: 'translate3d(0, 0, 0)'
        }}
      />
    </>
  );
});

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector(selectFilteredProducts);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleLearnMore = () => {
    const currentProduct = limitedProducts[currentSlide];
    if (currentProduct) {
      navigate(`/products/${currentProduct.id}`);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Limit the number of products to 4
  const limitedProducts = allProducts.slice(0, 4);

  // Auto-slide functionality
  useEffect(() => {
    if (!limitedProducts.length) return;
    
    const slideTimer = setInterval(() => {
      if (!isHovering) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % limitedProducts.length);
      }
    }, 5000);

    return () => {
      clearInterval(slideTimer);
    };
  }, [isHovering, limitedProducts.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % limitedProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + limitedProducts.length) % limitedProducts.length);
  };

  const handleAddToCart = () => {
    const currentProduct = limitedProducts[currentSlide];
    if (currentProduct) {
      dispatch(addToCart({
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.images?.[0]?.image_path || '/path/to/default/image.jpg', // Fallback image
        quantity: 1
      }));
      dispatch(openCart());
    }
  };

  // Simplified background variants
  const backgroundVariants = {
    enter: { opacity: 0 },
    center: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "linear" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: "linear" }
    }
  };

  const contentVariants = {
    enter: { opacity: 0, y: 20 },
    center: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  if (!limitedProducts.length) return null;

  return (
    <section 
      className="relative w-full min-h-[500px] h-screen overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="absolute inset-0"
          >
            <BackgroundImage 
              image={limitedProducts[currentSlide]?.images?.[0]?.image_path || '/path/to/default/image.jpg'} // Fallback image
            />
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 h-full">
        <div className="h-full flex flex-col justify-center pt-16 md:pt-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`content-${currentSlide}`}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-4xl mx-auto lg:mx-0 will-change-transform px-2 sm:px-4 md:px-6"
            >
              <motion.span 
                className="inline-block px-3 sm:px-4 md:px-6 py-1 sm:py-2 text-sm sm:text-base font-medium tracking-wider mb-3 sm:mb-4 md:mb-6 mt-2 sm:mt-4 md:mt-6 bg-primary/10 rounded-full"
                style={{ color: COLORS.primary }}
                whileHover={{ scale: 1.05 }}
              >
                {limitedProducts[currentSlide]?.category || 'Category'}
              </motion.span>

              <div className="relative">
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none mb-3 sm:mb-4 md:mb-6 select-none"
                  style={{ 
                    color: COLORS.primary,
                    WebkitTextStroke: '1px rgba(78, 59, 38, 0.15)',
                    textShadow: '0 4px 30px rgba(78, 59, 38, 0.15)'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {limitedProducts[currentSlide]?.name || 'Product Name'}
                </motion.h1>

                <motion.h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  style={{ 
                    color: COLORS.text,
                    textShadow: '0 2px 10px rgba(78, 59, 38, 0.05)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {limitedProducts[currentSlide]?.description?.substring(0, 50) || 'Description'}...
                </motion.h2>
              </div>

              <motion.p 
                className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-8 max-w-lg backdrop-blur-sm bg-white/40 p-3 sm:p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {limitedProducts[currentSlide]?.description || 'Full Description'}
              </motion.p>

              <motion.div 
                className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap"
                style={{ color: COLORS.text }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div className="flex items-center gap-4">
                  <motion.span 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-primary to-secondary bg-clip-text"
                  >
                    {formatPrice(limitedProducts[currentSlide]?.price || 0)}
                  </motion.span>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(194, 164, 95, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg flex items-center justify-center sm:justify-start gap-2 text-white transition-all duration-300 w-full sm:w-auto"
                    style={{ 
                      background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.primary})`,
                      boxShadow: "0 5px 20px -5px rgba(194, 164, 95, 0.3)"
                    }}
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    <span className="text-sm sm:text-base md:text-lg">Ajouter au Panier</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ x: 5, color: COLORS.secondary }}
                    className="px-4 md:px-6 py-2 sm:py-3 flex items-center justify-center sm:justify-start gap-2 transition-colors duration-300 w-full sm:w-auto"
                    style={{ color: COLORS.primary }}
                    onClick={handleLearnMore}
                  >
                    <span className="text-sm sm:text-base md:text-lg">En Savoir Plus</span>
                    <FiArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute right-4 sm:right-6 md:right-8 bottom-6 sm:bottom-8 md:bottom-12 flex flex-col gap-2 sm:gap-3 md:gap-4 z-20">
        <div className="text-right font-light mb-2">
          <span className="text-lg sm:text-xl md:text-2xl" style={{ color: COLORS.primary }}>
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-400">
            {String(limitedProducts.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          {limitedProducts.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleSlideChange(index)}
              className="group relative flex items-center justify-end"
              whileHover="hover"
            >
              <motion.div
                className="w-8 sm:w-10 md:w-12 h-[2px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: currentSlide === index 
                    ? COLORS.primary 
                    : 'rgba(78, 59, 38, 0.2)',
                  boxShadow: currentSlide === index 
                    ? '0 2px 10px rgba(78, 59, 38, 0.2)' 
                    : 'none'
                }}
                whileHover={{ scaleX: 1.5, backgroundColor: COLORS.secondary }}
                animate={currentSlide === index ? { scaleX: 1.5 } : { scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute right-full mr-2 sm:mr-3 md:mr-4 text-xs sm:text-sm opacity-0 transform translate-x-2"
                variants={{
                  hover: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.2 }}
                style={{ color: COLORS.primary }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>
            </motion.button>
          ))}
        </div>

        <div className="flex gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/50 backdrop-blur-sm"
            style={{ color: COLORS.primary }}
          >
            <FiChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/50 backdrop-blur-sm"
            style={{ color: COLORS.primary }}
          >
            <FiChevronRight className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);