import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar/index';
import { Footer } from './footer';
import { Loading } from '@/components/common/Loading';
import SpecialOfferPopup from '@/components/SpecialOfferPopup/SpecialOfferPopup';
import { useSpecialOffer } from '@/features/specialOffer/useSpecialOffer';
import Wishlist from '@/components/wishlist/Wishlist';
import ScrollToTop from '@/components/common/ScrollToTop';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const { showOffer, handleClose } = useSpecialOffer();

  useEffect(() => {
    // Simulate loading products or user data
    const loadData = async () => {
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 2500)),
      ]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="app-container" >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loading />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
            <Wishlist />
            <AnimatePresence>
              {showOffer && <SpecialOfferPopup onClose={handleClose} />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}