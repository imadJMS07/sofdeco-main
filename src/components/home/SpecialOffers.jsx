import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchSpecialOffers, 
  selectOffers, 
  selectSpecialOffersStatus, 
  selectSpecialOffersError 
} from '@/features/specialOffer/specialOfferSlice';
import { formatPrice } from '@/utils/currency';
import Rating from '@/components/common/Rating';
import { toast } from 'react-hot-toast';

const getTimeLeft = (end) => {
  const diff = Math.max(0, new Date(end) - new Date());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isExpired: diff <= 0 };
};

const TimerBlock = ({ value, label, isExpired }) => (
  <div className={`text-center p-2 bg-white/90 backdrop-blur-sm shadow-md rounded-lg border ${
    isExpired ? 'border-red-200' : 'border-[#C2A45F]/20'
  }`}>
    <div className={`text-lg font-bold ${
      isExpired ? 'text-red-400' : 'text-[#4E3B26]'
    }`}>
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-[10px] font-medium text-[#4E3B26]/50 uppercase tracking-wider">
      {label}
    </div>
  </div>
);

const SpecialOffers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const offers = useSelector(selectOffers);
  const status = useSelector(selectSpecialOffersStatus);
  const error = useSelector(selectSpecialOffersError);
  const [timeLeft, setTimeLeft] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fetch special offers
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSpecialOffers());
    }
  }, [dispatch, status]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      const errorMessage = typeof error === 'object' ? 
        error.message || 'An unexpected error occurred' :
        error;
      
      toast.error(errorMessage);
    }
  }, [error]);

  // Update countdown timer
  useEffect(() => {
    if (!offers.length) return;

    const updateTimers = () => {
      setTimeLeft(offers.map(offer => getTimeLeft(offer.countdownEnd || offer.expiration_date)));
    };
    
    // Initial update
    updateTimers();
    
    // Set interval for updates
    const interval = setInterval(updateTimers, 1000);
    
    // Cleanup
    return () => clearInterval(interval);
  }, [offers]);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[30vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C2A45F]"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    const errorMessage = typeof error === 'object' ? 
      error.message || 'An unexpected error occurred' :
      error;

    return (
      <div className="text-center py-12">
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  // Don't render if no offers
  if (!offers.length) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-[#FAF7F2] to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-2 mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FireIcon className="w-6 h-6 text-[#C2A45F]" />
            </motion.div>
            <h2 className="text-3xl font-bold text-[#4E3B26]">Special Offers</h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <SparklesIcon className="w-5 h-5 text-[#4E3B26]" />
            </motion.div>
          </div>
          <p className="text-[#4E3B26]/70 max-w-2xl mx-auto">
            Exclusive deals on our finest furniture pieces. Limited time offers you don't want to miss!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.slice(0, 3).map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#C2A45F]/10"
            >
              <div 
                className="relative aspect-square cursor-pointer"
                onClick={() => navigate(`/product/${offer.id}`)}
              >
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-[#4E3B26] to-[#C2A45F] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    -{Math.round(((offer.oldPrice - offer.price) / offer.oldPrice) * 100)}%
                  </div>
                </div>
                <img
                  src={offer.image || (offer.images && offer.images[0]?.image_path)}
                  alt={offer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#4E3B26] mb-2 line-clamp-1 group-hover:text-[#C2A45F] transition-colors">
                  {offer.name}
                </h3>
                
                <div className="mb-3">
                  <Rating value={offer.rating} size="sm" />
                </div>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-[#4E3B26]">
                    {formatPrice(offer.price)}
                  </span>
                  <span className="text-sm text-[#1A1A1A]/40 line-through">
                    {formatPrice(offer.oldPrice)}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] rounded-xl p-4">
                  <div className="flex items-center gap-1 mb-3">
                    <SparklesIcon className="h-4 w-4 text-[#C2A45F]" />
                    <span className="text-xs font-semibold text-[#4E3B26]">Limited Time Offer!</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: timeLeft[index]?.days || 0, label: "Days" },
                      { value: timeLeft[index]?.hours || 0, label: "Hrs" },
                      { value: timeLeft[index]?.minutes || 0, label: "Min" },
                      { value: timeLeft[index]?.seconds || 0, label: "Sec" }
                    ].map((item) => (
                      <TimerBlock
                        key={item.label}
                        value={item.value}
                        label={item.label}
                        isExpired={timeLeft[index]?.isExpired}
                      />
                    ))}
                  </div>
                  
                  {timeLeft[index]?.isExpired && (
                    <div className="text-center mt-3 text-xs font-medium text-red-400">
                      Offer Expired
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/product/${offer.id}`)}
                  className="w-full mt-4 bg-gradient-to-r from-[#4E3B26] to-[#C2A45F] text-white py-2 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  View Offer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
