import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { COLORS } from '@/constants/colors';

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  onPageSizeChange,
  pageSize = 10,
  className = ''
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        end = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3);
      }
      
      if (start > 2) {
        pageNumbers.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 my-8 ${className}`}>
      <div className="flex items-center justify-center space-x-2 bg-white rounded-xl shadow-md p-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
            currentPage === 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 cursor-pointer'
          }`}
          style={{ color: COLORS.secondary }}
          aria-label="Go to first page"
        >
          <ChevronDoubleLeftIcon className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
            currentPage === 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 cursor-pointer'
          }`}
          style={{ color: COLORS.secondary }}
          aria-label="Go to previous page"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </motion.button>
        
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="flex items-center justify-center px-2 text-gray-400">•••</span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 cursor-pointer ${
                  currentPage === page
                    ? 'text-white shadow-md'
                    : 'hover:bg-gray-100'
                }`}
                style={{ 
                  background: currentPage === page 
                    ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` 
                    : 'transparent',
                  color: currentPage === page ? 'white' : COLORS.text
                }}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </motion.button>
            )}
          </React.Fragment>
        ))}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
            currentPage >= totalPages 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 cursor-pointer'
          }`}
          style={{ color: COLORS.secondary }}
          aria-label="Go to next page"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
            currentPage >= totalPages 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 cursor-pointer'
          }`}
          style={{ color: COLORS.secondary }}
          aria-label="Go to last page"
        >
          <ChevronDoubleRightIcon className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
