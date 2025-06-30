import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export const RatingDisplay = ({ rating, reviewCount }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {starValue <= rating ? (
              <StarSolidIcon className="w-4 h-4 text-yellow-400" />
            ) : (
              <StarIcon className="w-4 h-4 text-gray-300" />
            )}
          </motion.div>
        );
      })}
    </div>
    <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
  </div>
); 