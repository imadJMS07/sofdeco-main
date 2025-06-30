import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { COLORS } from '@/constants/colors';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2] px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2
          }}
          className="mb-8"
        >
          <h1 
            className="text-8xl md:text-9xl font-bold"
            style={{ color: COLORS.secondary }}
          >
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <h2 
            className="text-2xl md:text-3xl font-semibold"
            style={{ color: COLORS.text }}
          >
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              style={{ backgroundColor: COLORS.secondary }}
            >
              Back to Home
            </motion.button>
          </Link>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-medium transition-colors hover:bg-gray-100"
              style={{ color: COLORS.text }}
            >
              Browse Products
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-gray-400"
        >
          <div className="inline-flex items-center justify-center">
            <div className="h-px w-12 bg-gray-300"></div>
            <span className="mx-4 text-sm">Error 404</span>
            <div className="h-px w-12 bg-gray-300"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 