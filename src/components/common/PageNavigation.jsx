import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { COLORS } from '@/constants/colors';

export const PageNavigation = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;
  
  return (
    <div className={`flex justify-between items-center w-full ${className}`}>
      {/* Previous page button */}
      <motion.button
        whileHover={{ x: -5, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95 }}
        onClick={() => hasPrevious && onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
          hasPrevious 
            ? 'hover:bg-white hover:shadow-md' 
            : 'opacity-50 cursor-not-allowed'
        }`}
        style={{ color: COLORS.secondary }}
        aria-label="Go to previous page"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span className="font-medium">Previous</span>
      </motion.button>
      
      {/* Page indicator */}
      <div className="text-center">
        <span className="px-4 py-2 rounded-full bg-white shadow-md text-sm font-medium" 
              style={{ color: COLORS.secondary }}>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      
      {/* Next page button */}
      <motion.button
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95 }}
        onClick={() => hasNext && onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
          hasNext 
            ? 'hover:bg-white hover:shadow-md' 
            : 'opacity-50 cursor-not-allowed'
        }`}
        style={{ color: COLORS.secondary }}
        aria-label="Go to next page"
      >
        <span className="font-medium">Next</span>
        <ArrowRightIcon className="w-5 h-5" />
      </motion.button>
    </div>
  );
};
