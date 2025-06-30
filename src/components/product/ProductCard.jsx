import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, ShoppingCartIcon as CartOutline } from '@heroicons/react/24/outline';
import { addToCart, openCart } from '@/features/cart/cartSlice';
import { COLORS } from '@/constants/colors';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '@/utils/currency';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '@/features/wishlist/wishlistSlice';

export const ProductCard = ({ product }) => {
  const { 
    id, 
    name, 
    price = 0, 
    original_price,
    images = [], 
    discount = 0,
    rating = 4.5,
    reviewCount = 24
  } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const safePrice = isNaN(price) ? 0 : price;
  const safeDiscount = isNaN(discount) ? 0 : discount;
  const image = images.length > 0 ? images[0].image_path : 'https://via.placeholder.com/300';
  const finalPrice = safePrice * (1 - safeDiscount / 100);
  const isWishlisted = useSelector(state => selectIsInWishlist(id)(state));
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);

  const handleWishlistToggle = async (e) => {
    e?.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
      toast.success('Removed from wishlist!');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist!');
    }
  };

  const handleAddToCart = async (e) => {
    e?.stopPropagation();
    setIsAddingToCart(true);
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.image_path,
      quantity: 1
    }));
    dispatch(openCart());
    toast.success('Added to cart!');
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group h-full"
    >
      <div className="relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
           style={{ 
             background: COLORS.gradients.light,
             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
           }}>
        
        {/* Wishlist Button (Top Right) */}
        <motion.button 
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all duration-200 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: COLORS.gradients.overlay,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <HeartIcon className="w-5 h-5" style={{ color: COLORS.error }} />
          ) : (
            <HeartOutline className="w-5 h-5" style={{ color: COLORS.textMuted }} />
          )}
        </motion.button>
        
        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Link to={`/products/${id}`} className="block w-full h-full">
            <motion.img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          {/* Discount Badge */}
          {safeDiscount > 0 && (
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
              style={{ 
                background: COLORS.gradients.secondary,
                boxShadow: '0 2px 8px rgba(194, 164, 95, 0.3)'
              }}
            >
              {safeDiscount}% OFF
            </motion.div>
          )}
        </div>

        {/* Product Info Container */}
        <div className="flex flex-col flex-grow p-5">
          <div className="mb-2 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs" style={{ color: COLORS.textMuted }}>({reviewCount})</span>
          </div>
          
          <Link 
            to={`/product/${id}`}
            className="group-hover:text-secondary transition-colors duration-300 mb-2 cursor-pointer"
          >
            <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors duration-300" style={{ color: COLORS.textDark }}>{name}</h3>
          </Link>
          
          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold" style={{ color: COLORS.primary }}>
                {formatPrice(finalPrice)}
              </span>
              {safeDiscount > 0 && (
                <span className="text-sm line-through" style={{ color: COLORS.textMuted }}>
                  {formatPrice(safePrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 p-4 border-t" style={{ borderColor: COLORS.backgroundMuted }}>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200 cursor-pointer"
            style={{ 
              background: isAddingToCart ? COLORS.backgroundMuted : COLORS.gradients.primary,
              color: COLORS.backgroundLight,
              boxShadow: '0 2px 8px rgba(78, 59, 38, 0.2)'
            }}
            aria-label="Add to cart"
          >
            {isAddingToCart ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ShoppingCartIcon className="w-5 h-5" />
              </motion.div>
            ) : (
              <ShoppingCartIcon className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </span>
          </motion.button>

          <motion.button 
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              backgroundColor: COLORS.primaryLight,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/products/${id}`)}
            className="p-2.5 rounded-lg transition-all duration-200 cursor-pointer"
            style={{ 
              background: COLORS.gradients.light,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
            aria-label="Quick view"
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              style={{ color: COLORS.primary }}
              whileHover={{ scale: 1.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </motion.svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;