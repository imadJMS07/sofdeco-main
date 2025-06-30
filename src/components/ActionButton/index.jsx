import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';

export const ActionButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = 'primary', 
  className = '',
  style = {} 
}) => {
  const baseStyles = "flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300";
  const variants = {
    primary: {
      className: "text-white shadow-lg hover:shadow-xl",
      style: { backgroundColor: COLORS.secondary }
    },
    secondary: {
      className: "bg-gray-100 hover:bg-gray-200",
      style: {}
    },
    danger: {
      className: "bg-red-50 hover:bg-red-100 text-red-500",
      style: {}
    }
  };

  const selectedVariant = variants[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${selectedVariant.className} rounded-2xl ${className}`}
      style={{ ...selectedVariant.style, ...style }}
    >
      <Icon className="h-5 w-5" />
      {label && <span>{label}</span>}
    </motion.button>
  );
}; 