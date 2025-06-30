import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiHeart,
  FiStar
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { COLORS } from '@/constants/colors';
import { addToCart } from '@/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '@/features/wishlist/wishlistSlice';
import { selectAllProducts } from '@/features/products/productsSlice';
import { formatPrice } from '@/utils/currency';

// Similar Products Component
export const SimilarProducts = ({ productId, categoryId }) => {
  const allProducts = useSelector(selectAllProducts);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find similar products (same category, excluding current product)
    if (allProducts.length > 0 && categoryId) {
      const filtered = allProducts
        .filter(p => p.id !== productId && (p.category_id === categoryId || (p.category && p.category.id === categoryId)))
        .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating
        .slice(0, 4); // Take top 4

      setSimilarProducts(filtered);
      setIsLoading(false);
    } else if (allProducts.length > 0) {
      // If no category, just show other top products
      const filtered = allProducts
        .filter(p => p.id !== productId)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating
        .slice(0, 4); // Take top 4

      setSimilarProducts(filtered);
      setIsLoading(false);
    }
  }, [allProducts, productId, categoryId]);

  return (
    <div className="mt-16 relative">
      {/* Decorative elements */}
      <div className="absolute -top-6 left-0 w-24 h-24 bg-[#F9F5EC] rounded-full -z-10 blur-2xl opacity-70" />
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-[#EFE8D9] rounded-full -z-10 blur-3xl opacity-50" />
      
      {/* Section header with decorative line */}
      <div className="flex items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.primary }}>Produits similaires</h2>
        <div className="ml-6 h-[1px] flex-grow" style={{ background: `linear-gradient(to right, ${COLORS.primary}, transparent)` }}></div>
      </div>
      
      {/* Products grid with improved spacing and responsive design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
        {isLoading ? (
          // Show skeletons while loading
          Array.from({ length: 4 }).map((_, index) => (
            <SimilarProductCardSkeleton key={index} />
          ))
        ) : similarProducts.length > 0 ? (
          // Show similar products
          similarProducts.map(product => (
            <SimilarProductCard key={product.id} product={product} />
          ))
        ) : (
          // Fallback if no similar products found
          <div className="col-span-4 text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 italic">Aucun produit similaire trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Similar Product Card Component
export const SimilarProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInWishlist = useSelector(state => selectIsInWishlist(product.id)(state));
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      ...product,
      quantity: 1
    }));
    toast.success('Ajouté au panier !');
  };

  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    setIsWishlistLoading(true);

    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(product.id)).unwrap();
        toast.success('Retiré de la liste de souhaits !');
      } else {
        await dispatch(addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || (product.images && product.images[0]?.image_path)
        })).unwrap();
        toast.success('Ajouté à la liste de souhaits !');
      }
    } catch (error) {
      toast.error('Échec de la mise à jour de la liste de souhaits');
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-gray-50 hover:border-gray-200 transition-colors"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="relative h-64 overflow-hidden bg-[#F9F5EC] flex items-center justify-center">
        {/* Decorative circle */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#F3EEE3] z-0" />
        
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={product.image || (product.images && product.images[0]?.image_path)}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110 z-10"
          />
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-[#4E3B26] hover:text-[#C2A45F] hover:bg-white shadow-lg rounded-full transition-all duration-300"
          >
            <FiShoppingCart className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            disabled={isWishlistLoading}
            className={`p-2.5 backdrop-blur-sm shadow-lg rounded-full transition-all duration-300
              ${isWishlistLoading ? 'opacity-50 cursor-wait' : ''}
              ${isInWishlist
                ? 'text-red-500 bg-white/90 hover:bg-white'
                : 'text-[#4E3B26] bg-white/90 hover:text-[#C2A45F] hover:bg-white'
              }`}
          >
            {isWishlistLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiHeart 
                className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`}
              />
            )}
          </motion.button>
        </div>
      </div>
      
      <div className="p-5">
        {/* Category tag if available */}
        {product.category && (
          <div className="mb-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F9F5EC] text-[#C2A45F]">
              {product.category.name || 'Catégorie'}
            </span>
          </div>
        )}
        
        <h3 className="font-medium text-lg truncate mb-1" style={{ color: COLORS.text }}>{product.name}</h3>
        
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-lg" style={{ color: COLORS.primary }}>{formatPrice(product.price)}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${i < (product.rating || 5) ? 'text-[#C5A05C] fill-current' : 'text-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Skeleton for loading state
export const SimilarProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-50">
    <div className="relative h-64 bg-gray-100">
      {/* Simulated action buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
      </div>
    </div>
    <div className="p-5">
      {/* Simulated category tag */}
      <div className="mb-2 w-20 h-6 bg-gray-100 rounded-full"></div>
      
      {/* Simulated product name */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      
      <div className="flex justify-between items-center mt-3">
        <div className="h-7 bg-gray-200 rounded w-1/4"></div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
