import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiUser, FiX, FiAward, FiMessageSquare, FiCheck, FiLoader } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { COLORS } from '@/constants/colors';
import { fetchProductReviews, addProductReview, selectAllReviews, selectReviewsStatus, selectReviewsError } from '@/features/reviews/reviewsSlice';

const ReviewForm = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, review, userName, email });
    setRating(0);
    setReview('');
    setUserName('');
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-8 rounded-2xl shadow-xl"
      style={{
        background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}dd)`,
        border: `1px solid ${COLORS.border}`
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl" style={{ backgroundColor: COLORS.primary + '15' }}>
            <FiMessageSquare className="w-5 h-5" style={{ color: COLORS.primary }} />
          </div>
          <h3 className="text-xl font-medium" style={{ color: COLORS.text }}>Écrire un avis</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="p-2 rounded-xl transition-all duration-300"
          style={{
            backgroundColor: COLORS.background,
            border: `1px solid ${COLORS.border}`
          }}
        >
          <FiX className="w-4 h-4" style={{ color: COLORS.text }} />
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{ color: COLORS.text }}>
            Votre nom
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl transition-all duration-300 text-base"
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
            Votre email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl transition-all duration-300 text-base"
            style={{
              backgroundColor: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.text
            }}
            placeholder="Entrez votre email"
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
                className="p-1"
              >
                <FiStar
                  className={`w-6 h-6 transition-colors duration-200 ${
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
            className="w-full px-4 py-3 rounded-xl transition-all duration-300 resize-none text-base"
            style={{
              backgroundColor: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.text
            }}
            placeholder="Partagez votre expérience avec ce produit..."
          />
        </div>

        <div className="flex justify-end gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2 rounded-xl transition-all duration-300 text-sm font-medium"
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
            className="px-6 py-2 rounded-xl transition-all duration-300 text-sm font-medium"
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
  );
};

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="p-6 rounded-2xl"
    style={{
      background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}dd)`,
      border: `1px solid ${COLORS.border}`,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    }}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.primary + '20' }}>
        <FiUser className="w-5 h-5" style={{ color: COLORS.primary }} />
      </div>
      <div>
        <h4 className="font-medium" style={{ color: COLORS.text }}>{review.reviewer_name}</h4>
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
            {new Date(review.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
    <p className="text-base leading-relaxed" style={{ color: COLORS.text }}>
      {review.review}
    </p>
  </motion.div>
);

const ProductReviews = ({ product }) => {
  const dispatch = useDispatch();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const reviews = useSelector(selectAllReviews);
  const status = useSelector(selectReviewsStatus);
  const error = useSelector(selectReviewsError);
  
  // Calculate average rating from reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };
  
  const averageRating = calculateAverageRating(reviews);
  
  // Fetch reviews when component mounts or product changes
  useEffect(() => {
    if (product && product.id) {
      dispatch(fetchProductReviews(product.id));
    }
  }, [dispatch, product]);

  const handleSubmitReview = (reviewData) => {
    if (product && product.id) {
      dispatch(addProductReview({ 
        productId: product.id, 
        reviewData: {
          ...reviewData,
          date: new Date().toISOString().split('T')[0],
          verified: true
        }
      }))
        .unwrap()
        .then(() => {
          toast.success('Merci pour votre avis !');
          setShowReviewForm(false);
        })
        .catch((err) => {
          toast.error('Échec de la soumission de l\'avis. Veuillez réessayer.');
        });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between p-6 rounded-2xl"
        style={{
          background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}dd)`,
          border: `1px solid ${COLORS.border}`
        }}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ backgroundColor: COLORS.primary + '15' }}>
              <FiAward className="w-5 h-5" style={{ color: COLORS.primary }} />
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < averageRating ? 'text-[#C5A05C] fill-current' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <span className="text-xl font-medium" style={{ color: COLORS.text }}>
              {averageRating} sur 5
            </span>
            <p className="text-sm mt-1" style={{ color: COLORS.secondary }}>
              Basé sur {reviews.length} avis
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReviewForm(true)}
          className="px-6 py-2 rounded-xl transition-all duration-300 text-sm font-medium"
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
          <ReviewForm
            onSubmit={handleSubmitReview}
            onClose={() => setShowReviewForm(false)}
          />
        )}
      </AnimatePresence>

      {status === 'loading' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 rounded-2xl"
          style={{
            background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}dd)`,
            border: `1px solid ${COLORS.border}`
          }}
        >
          <div className="p-4 rounded-xl inline-block mb-4" style={{ backgroundColor: COLORS.primary + '15' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <FiLoader className="w-6 h-6" style={{ color: COLORS.primary }} />
            </motion.div>
          </div>
          <p className="text-base" style={{ color: COLORS.secondary }}>
            Chargement des avis...
          </p>
        </motion.div>
      ) : status === 'failed' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 rounded-2xl"
          style={{
            background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}dd)`,
            border: `1px solid ${COLORS.error + '30'}`
          }}
        >
          <div className="p-4 rounded-xl inline-block mb-4" style={{ backgroundColor: COLORS.error + '15' }}>
            <FiX className="w-6 h-6" style={{ color: COLORS.error }} />
          </div>
          <p className="text-base" style={{ color: COLORS.error }}>
            {error && typeof error === 'object' ? (error.message || 'Une erreur est survenue') : error || 'Échec du chargement des avis. Veuillez réessayer.'}
          </p>
        </motion.div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 rounded-2xl"
          style={{
            background: `linear-gradient(145deg, ${COLORS.background}, ${COLORS.background}dd)`,
            border: `1px solid ${COLORS.border}`
          }}
        >
          <div className="p-4 rounded-xl inline-block mb-4" style={{ backgroundColor: COLORS.primary + '15' }}>
            <FiMessageSquare className="w-6 h-6" style={{ color: COLORS.primary }} />
          </div>
          <p className="text-base" style={{ color: COLORS.secondary }}>
            Aucun avis pour le moment. Soyez le premier à donner votre avis sur ce produit !
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductReviews; 