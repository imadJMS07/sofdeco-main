import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchPartners, 
  selectAllPartners, 
  selectPartnerStatus, 
  selectPartnerError,
  selectFilteredPartners,
  updateFilters 
} from '../../features/partners/partnersSlice';

const Partners = () => {
  const dispatch = useDispatch();
  const partners = useSelector(selectFilteredPartners);
  const status = useSelector(selectPartnerStatus);
  const error = useSelector(selectPartnerError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPartners());
    }
  }, [status, dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 15,
      scale: 0.98
    },
    visible: { 
      opacity: 0.85,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      opacity: 1,
      scale: 1.02,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  if (error) {
    return (
      <div className="py-32 text-center text-red-600">
        <p>Erreur lors du chargement des partenaires: {error}</p>
      </div>
    );
  }

  const isLoading = status === 'loading';

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Luxury background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8F3EE]/30 to-white">
        <div className="absolute inset-0 opacity-[0.015]" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A05C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-[#C5A05C] font-medium mb-2">Nos Partenaires</h2>
          <div className="w-12 h-0.5 bg-[#C5A05C]/30 mx-auto" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative"
        >
          {/* Decorative lines */}
          <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#C5A05C]/10 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#C5A05C]/10 to-transparent" />
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-x-24 gap-y-16 px-8"
          >
            {isLoading ? (
              // Loading skeleton
              [...Array(5)].map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  variants={itemVariants}
                  className="relative w-[180px] h-[70px] bg-gradient-to-r from-[#F8F3EE]/30 via-white to-[#F8F3EE]/30 animate-pulse rounded"
                />
              ))
            ) : (
              partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="relative w-[180px] h-[70px] flex items-center justify-center group"
                >
                  {/* Hover effects */}
                  <div className="absolute inset-0 bg-[#C5A05C]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                    />
                    
                    {/* Elegant underline */}
                    <motion.div
                      className="absolute -bottom-3 left-1/2 right-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#C5A05C]/50 to-transparent"
                      initial={{ left: '50%', right: '50%' }}
                      whileHover={{ left: '0%', right: '0%' }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners; 