import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon, 
  MicrophoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { COLORS } from '@/constants/colors';
import debounce from 'lodash/debounce';

const MAX_RECENT_SEARCHES = 5;
const SEARCH_HISTORY_KEY = 'sofdeco_recent_searches';

export const SearchModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};