import React from 'react';
import { motion } from 'framer-motion';
import { Link, useRouteError } from 'react-router-dom';
import { COLORS } from '@/constants/colors';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorBoundary = () => {
  const error = useRouteError();
  
  // Determine error type and message
  const getErrorDetails = () => {
    if (error.status === 404) {
      return {
        title: '404 - Page Not Found',
        message: "The page you're looking for doesn't exist or has been moved.",
        icon: '404'
      };
    }
    
    return {
      title: 'Oops! Something went wrong',
      message: error.message || 'An unexpected error occurred. Please try again later.',
      icon: <ExclamationTriangleIcon className="w-16 h-16 text-yellow-500" />
    };
  };

  const { title, message, icon } = getErrorDetails();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2] px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon/Number */}
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
          {typeof icon === 'string' ? (
            <h1 
              className="text-8xl md:text-9xl font-bold"
              style={{ color: COLORS.secondary }}
            >
              {icon}
            </h1>
          ) : (
            <div className="flex justify-center">
              {icon}
            </div>
          )}
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
            {title}
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            {message}
          </p>
          {error.stack && process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 p-4 bg-gray-100 rounded-lg text-left text-sm text-gray-700 overflow-auto">
              {error.stack}
            </pre>
          )}
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
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-full font-medium transition-colors hover:bg-gray-100"
            style={{ color: COLORS.text }}
          >
            Try Again
          </button>
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
            <span className="mx-4 text-sm">Error {error.status || 'Unknown'}</span>
            <div className="h-px w-12 bg-gray-300"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorBoundary; 