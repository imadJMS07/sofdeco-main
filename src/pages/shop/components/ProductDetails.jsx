import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiShoppingCart, 
  FiHeart, 
  FiInfo, 
  FiList, 
  FiStar,
  FiShare2,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheck,
  FiUser
} from 'react-icons/fi';
import { COLORS } from '@/constants/colors';
import { addToCart } from '@/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '@/features/wishlist/wishlistSlice';
import { selectProductById, fetchProductById, selectProductStatus, selectProductError } from '@/features/products/productsSlice';
import { toast } from 'react-hot-toast';
import ProductReviews from './ProductReviews';
import { formatPrice } from '@/utils/currency';
import { ImageMagnifier, FullscreenGallery } from './ProductImageComponents';
import { SimilarProducts } from './SimilarProducts';



const ReviewSection = ({ product }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Here you would typically dispatch an action to save the review
    toast.success('Merci pour votre avis !');
    setShowReviewForm(false);
    setRating(0);
    setReview('');
    setUserName('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-6 h-6 ${
                  i < (product.rating || 0) ? 'text-[#C5A05C] fill-current' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-medium" style={{ color: COLORS.text }}>
            {product.rating || 0} sur 5
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReviewForm(true)}
          className="px-6 py-2 rounded-xl transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.background
          }}
        >
          Écrire un avis
        </motion.button>
      </div>

      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: COLORS.background,
              border: `1px solid ${COLORS.border}`
            }}
          >
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: COLORS.text }}>
                  Votre nom
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: COLORS.background,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.text
                  }}
                  placeholder="Entrez votre nom"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: COLORS.text }}>
                  Note
                </label>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRating(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-2 cursor-pointer"
                    >
                      <FiStar
                        className={`w-8 h-8 transition-colors duration-200 ${
                          i < (hoverRating || rating)
                            ? 'text-[#C5A05C] fill-current'
                            : 'text-gray-200'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: COLORS.text }}>
                  Votre avis
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl transition-all duration-300 resize-none"
                  style={{
                    backgroundColor: COLORS.background,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.text
                  }}
                  placeholder="Partagez votre expérience avec ce produit..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: COLORS.background,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.text
                  }}
                >
                  Annuler
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.background
                  }}
                >
                  Soumettre
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Display existing reviews */}
      {product.reviews && product.reviews.length > 0 ? (
        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: COLORS.background,
                border: `1px solid ${COLORS.border}`
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.primary + '20' }}>
                  <FiUser className="w-5 h-5" style={{ color: COLORS.primary }} />
                </div>
                <div>
                  <h4 className="font-medium" style={{ color: COLORS.text }}>{review.userName}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-[#C5A05C] fill-current' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm" style={{ color: COLORS.secondary }}>
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.text}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
          style={{ color: COLORS.secondary }}
        >
          Aucun avis pour le moment. Soyez le premier à donner votre avis sur ce produit !
        </motion.div>
      )}
    </motion.div>
  );
};

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get product from Redux store
  const product = useSelector(state => selectProductById(productId)(state));
  const productStatus = useSelector(selectProductStatus);
  const productError = useSelector(selectProductError);
  const isInWishlist = useSelector(state => selectIsInWishlist(productId)(state));
  
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showShare, setShowShare] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchProductById(productId)).unwrap();
      } catch (error) {
        toast.error('Failed to load product details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [dispatch, productId]);

  // Navigate away if product not found after loading
  useEffect(() => {
    if (!isLoading && !product && productStatus !== 'loading') {
      toast.error('Product not found');
      navigate('/');
    }
  }, [product, navigate, isLoading, productStatus]);

  // Show loading state
  if (isLoading || productStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A05C]"></div>
      </div>
    );
  }

  // Show error state
  if (productError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement du produit</h2>
        <p className="text-gray-700 mb-6">{productError}</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-[#C5A05C] text-white rounded-lg hover:bg-[#A38449] transition-colors"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  // Return null if product is not available
  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity
    }));
    toast.success('Ajouté au panier !');
  };

  const handleToggleWishlist = async () => {
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
          image: product.images && product.images[0]?.image_path
        })).unwrap();
        toast.success('Ajouté à la liste de souhaits !');
      }
    } catch (error) {
      toast.error('Échec de la mise à jour de la liste de souhaits. Veuillez réessayer.');
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      setShowShare(true); // Show share options
      
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Découvrez ce superbe ${product.name} sur notre boutique !`,
          url: window.location.href,
        });
        toast.success('Partagé avec succès !');
        setShowShare(false);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Lien copié dans le presse-papiers !');
        setTimeout(() => setShowShare(false), 2000);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast.error('Échec du partage. Veuillez réessayer.');
      }
      setShowShare(false);
    }
  };

  const handleNextImage = (index = selectedImage + 1) => {
    if (index >= product.images.length) index = 0;
    setSelectedImage(index);
  };

  const handlePrevImage = (index = selectedImage - 1) => {
    if (index < 0) index = product.images.length - 1;
    setSelectedImage(index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-gray max-w-none"
          >
            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
          </motion.div>
        );
      case 'additional':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Product Specifications */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: COLORS.primary + '15' }}>
                  <FiInfo className="w-6 h-6" style={{ color: COLORS.primary }} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium" style={{ color: COLORS.text }}>Spécifications du produit</h3>
                  <p className="text-sm mt-1" style={{ color: COLORS.secondary }}>Informations détaillées sur les caractéristiques et spécifications du produit</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.specification && Object.entries(product.specification)
                .filter(([key]) => !['id', 'created_at', 'updated_at'].includes(key))
                  .map(([key, value], index) => (
                    <motion.div 
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="p-6 rounded-2xl transition-all duration-300 group-hover:shadow-lg"
                        style={{
                          background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}dd)`,
                          border: `1px solid ${COLORS.border}`,
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1"
                            style={{ 
                              backgroundColor: COLORS.primary + '15'
                            }}
                          >
                            <FiInfo className="w-5 h-5" style={{ color: COLORS.primary }} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium mb-1" style={{ color: COLORS.secondary }}>
                              {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </h4>
                            <p className="text-lg font-medium" style={{ color: COLORS.text }}>
                              {value}
                            </p>
                          </div>
                        </div>
                  </div>
                    </motion.div>
                ))
              }
            </div>
          </div>

            {/* Shipping Information */}
            <div className="p-8 rounded-2xl"
              style={{
                background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}dd)`,
                border: `1px solid ${COLORS.border}`
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl" style={{ backgroundColor: COLORS.primary + '15' }}>
                  <FiTruck className="w-6 h-6" style={{ color: COLORS.primary }} />
                </div>
                <div>
                  <h3 className="text-xl font-medium" style={{ color: COLORS.text }}>Informations de livraison</h3>
                  <p className="text-sm mt-1" style={{ color: COLORS.secondary }}>Options de livraison rapides et fiables pour votre commodité</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl group transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.primary + '10',
                    border: `1px solid ${COLORS.border}`
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:-translate-y-1"
                      style={{ backgroundColor: COLORS.primary + '20' }}
                    >
                      <FiTruck className="w-5 h-5" style={{ color: COLORS.primary }} />
                    </div>
                    <h4 className="text-base font-medium" style={{ color: COLORS.text }}>Livraison standard</h4>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.secondary }}>3-5 jours ouvrables</p>
                  <p className="text-sm mt-2" style={{ color: COLORS.text }}>Gratuite pour les commandes de plus de 50€</p>
                </div>
                <div className="p-6 rounded-xl group transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.primary + '10',
                    border: `1px solid ${COLORS.border}`
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:-translate-y-1"
                      style={{ backgroundColor: COLORS.primary + '20' }}
                    >
                      <FiTruck className="w-5 h-5" style={{ color: COLORS.primary }} />
                    </div>
                    <h4 className="text-base font-medium" style={{ color: COLORS.text }}>Livraison express</h4>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.secondary }}>1-2 jours ouvrables</p>
                  <p className="text-sm mt-2" style={{ color: COLORS.text }}>Supplément de 15€</p>
                </div>
                <div className="p-6 rounded-xl group transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.primary + '10',
                    border: `1px solid ${COLORS.border}`
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:-translate-y-1"
                      style={{ backgroundColor: COLORS.primary + '20' }}
                    >
                      <FiTruck className="w-5 h-5" style={{ color: COLORS.primary }} />
                    </div>
                    <h4 className="text-base font-medium" style={{ color: COLORS.text }}>Livraison internationale</h4>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.secondary }}>7-14 jours ouvrables</p>
                  <p className="text-sm mt-2" style={{ color: COLORS.text }}>Varie selon la destination</p>
                </div>
              </div>
            </div>

            {/* Warranty & Returns */}
            <div className="p-8 rounded-2xl"
              style={{
                background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}dd)`,
                border: `1px solid ${COLORS.border}`
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl" style={{ backgroundColor: COLORS.primary + '15' }}>
                  <FiShield className="w-6 h-6" style={{ color: COLORS.primary }} />
                </div>
                <div>
                  <h3 className="text-xl font-medium" style={{ color: COLORS.text }}>Garantie et retours</h3>
                  <p className="text-sm mt-1" style={{ color: COLORS.secondary }}>Achetez en toute confiance avec nos politiques de garantie et de retour</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl group transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.primary + '10',
                    border: `1px solid ${COLORS.border}`
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:-translate-y-1"
                      style={{ backgroundColor: COLORS.primary + '20' }}
                    >
                      <FiShield className="w-5 h-5" style={{ color: COLORS.primary }} />
                    </div>
                    <h4 className="text-base font-medium" style={{ color: COLORS.text }}>Garantie</h4>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.secondary }}>Garantie fabricant de 2 ans</p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center gap-2 text-sm" style={{ color: COLORS.text }}>
                      <FiCheck className="w-4 h-4" style={{ color: COLORS.primary }} />
                      <span>Couverture des défauts de fabrication</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm" style={{ color: COLORS.text }}>
                      <FiCheck className="w-4 h-4" style={{ color: COLORS.primary }} />
                      <span>Réparation ou remplacement gratuit</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl group transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.primary + '10',
                    border: `1px solid ${COLORS.border}`
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:-translate-y-1"
                      style={{ backgroundColor: COLORS.primary + '20' }}
                    >
                      <FiRefreshCw className="w-5 h-5" style={{ color: COLORS.primary }} />
                    </div>
                    <h4 className="text-base font-medium" style={{ color: COLORS.text }}>Retours</h4>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.secondary }}>Politique de retour de 30 jours</p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center gap-2 text-sm" style={{ color: COLORS.text }}>
                      <FiCheck className="w-4 h-4" style={{ color: COLORS.primary }} />
                      <span>Frais de retour gratuits</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm" style={{ color: COLORS.text }}>
                      <FiCheck className="w-4 h-4" style={{ color: COLORS.primary }} />
                      <span>Remboursement intégral sous 30 jours</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'reviews':
        return <ProductReviews product={product} />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-12 group cursor-pointer"
        >
          <FiArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Retour aux produits</span>
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="relative">
            <div className="flex gap-6">
              {/* Thumbnail Strip */}
              {product.images && product.images.length > 0 && (
                <div className="hidden md:flex flex-col gap-4">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={image.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        selectedImage === index 
                          ? 'border-primary shadow-lg scale-105' 
                          : 'border-transparent hover:border-gray-200'
                      }`}
                    >
                      <img
                        src={image.image_path}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1">
            <ImageMagnifier
              src={product.images?.[selectedImage]?.image_path || product.image}
              alt={product.name}
                  onFullscreen={() => setShowFullscreen(true)}
            />
              </div>
            </div>

            {/* Mobile Thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="md:hidden mt-4 grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={image.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      selectedImage === index 
                        ? 'border-primary shadow-lg scale-105' 
                        : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <img
                      src={image.image_path}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-10"
          >
          <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-4xl font-bold tracking-tight" style={{ color: COLORS.text }}>
              {product.name}
            </h1>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="p-3 rounded-xl transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: showShare ? COLORS.primary + '20' : COLORS.background,
                        border: `1px solid ${showShare ? COLORS.primary : COLORS.border}`,
                        color: showShare ? COLORS.primary : COLORS.text
                      }}
                    >
                      <FiShare2 className="w-6 h-6" />
                    </motion.button>
                    
                    <AnimatePresence>
                      {showShare && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 top-full mt-2 p-4 rounded-xl shadow-lg z-50"
                          style={{ 
                            backgroundColor: COLORS.background,
                            border: `1px solid ${COLORS.border}`,
                            minWidth: '200px'
                          }}
                        >
                          <div className="text-center text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                            {navigator.share ? 'Sharing...' : 'Link copied to clipboard!'}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < (product.rating || 5) ? 'text-[#C5A05C] fill-current' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.rating ? Math.round(product.rating * 10) : 0} reviews)</span>
                </div>
              </div>
            
            <div className="flex items-baseline gap-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-4xl font-bold" 
                  style={{ color: COLORS.secondary }}
                >
                {formatPrice(product.price)}
                </motion.span>
              {product.original_price && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="text-2xl text-gray-400 line-through"
                  >
                  {formatPrice(product.original_price)}
                  </motion.span>
              )}
            </div>

            {/* Stock Status */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex items-center gap-2"
              >
              <span className="text-sm font-medium" style={{ color: COLORS.text }}>
                État du stock :
              </span>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
              }`}>
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </span>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-6">
                <label className="text-sm font-medium" style={{ color: COLORS.text }}>Quantité :</label>
                <div 
                  className="flex items-center rounded-full overflow-hidden shadow-sm"
                  style={{ 
                    background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}ff)`,
                    border: `1px solid ${COLORS.border}40`
                  }}
                >
                  <motion.button
                    whileHover={{ backgroundColor: COLORS.hover + '20' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ color: COLORS.secondary }}
                    disabled={product.stock === 0 || quantity <= 1}
                  >
                    <span className="text-sm font-medium">−</span>
                  </motion.button>
                  <motion.span 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    key={quantity}
                    className="px-3 py-1.5 font-medium text-sm min-w-[40px] text-center"
                    style={{ 
                      color: COLORS.primary,
                      borderLeft: `1px solid ${COLORS.border}20`,
                      borderRight: `1px solid ${COLORS.border}20`
                    }}
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    whileHover={{ backgroundColor: COLORS.hover + '20' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="px-3 py-1.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ color: COLORS.secondary }}
                    disabled={product.stock === 0 || quantity >= product.stock}
                  >
                    <span className="text-sm font-medium">+</span>
                  </motion.button>
                </div>
                {product.stock > 0 && (
                  <span className="text-sm" style={{ color: COLORS.secondary }}>
                    {product.stock} disponible
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: `0 8px 20px ${COLORS.primary}33`
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 text-lg font-medium cursor-pointer"
                  style={{
                    backgroundColor: product.stock > 0 ? COLORS.primary : COLORS.disabled,
                    color: product.stock > 0 ? COLORS.background : COLORS.text
                  }}
                >
                  <FiShoppingCart className="w-6 h-6" />
                  {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: `0 8px 20px ${isInWishlist ? COLORS.error + '33' : COLORS.border + '33'}`
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleToggleWishlist}
                  className="px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
                  style={{
                    backgroundColor: isInWishlist ? COLORS.error + '15' : 'transparent',
                    border: `1px solid ${isInWishlist ? COLORS.error : COLORS.border}`,
                    color: isInWishlist ? COLORS.error : COLORS.text
                  }}
                  disabled={isWishlistLoading}
                >
                  {isWishlistLoading ? (
                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FiHeart 
                      className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} 
                      style={{ color: isInWishlist ? COLORS.error : COLORS.text }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Category */}
            {(product.category_name || product.category) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="pt-8"
              >
                <span className="text-sm font-medium" style={{ color: COLORS.secondary }}>
                  Catégorie : <span style={{ color: COLORS.text }}>
                    {product.category_name || (product.category && product.category.name)}
                  </span>
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20"
        >
          <div className="border-b border-gray-200">
            <nav className="flex gap-12">
              {['description', 'additional', 'reviews'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-base font-medium border-b-2 transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                    {tab === 'description' ? <FiList className="w-5 h-5" /> : 
                     tab === 'additional' ? <FiInfo className="w-5 h-5" /> :
                     <FiStar className="w-5 h-5" />}
                    {tab === 'description' ? 'Description' : 
                     tab === 'additional' ? 'Informations complémentaires' :
                     'Avis'}
                </span>
                </motion.button>
              ))}
            </nav>
          </div>
          <div className="py-10">
            {renderTabContent()}
          </div>
        </motion.div>
      </div>

      {/* Similar Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-32 max-w-7xl mx-auto"
      >

        <SimilarProducts productId={product.id} categoryId={product.category_id || (product.category && product.category.id)} />
      </motion.div>

      <AnimatePresence>
        {showFullscreen && product.images && (
          <FullscreenGallery
            images={product.images}
            currentIndex={selectedImage}
            onClose={() => setShowFullscreen(false)}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};



export default ProductDetails; 