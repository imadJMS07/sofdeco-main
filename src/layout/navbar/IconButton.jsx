import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';

export const IconButton = ({ icon, count, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`text-text hover:text-secondary transition-colors relative ${className}`}
    >
      {icon}
      {count !== undefined && (
        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}; 