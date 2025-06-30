import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../../constants/colors';

export const IconButton = ({ icon, count, onClick, className = '' }) => {
  return (
    <motion.button
      className={`relative p-2 rounded-full ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{ color: COLORS.text }}
    >
      {icon}
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center rounded-full text-white"
          style={{ backgroundColor: COLORS.secondary }}
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  );
}; 