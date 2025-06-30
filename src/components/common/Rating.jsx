import React from 'react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { COLORS } from '@/constants/colors';

export default function Rating({ value, size = 'sm' }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const filled = index < value;
    const StarComponent = filled ? StarSolid : StarOutline;
    
    return (
      <StarComponent
        key={index}
        className={`${
          size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
        } ${
          filled ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    );
  });

  return (
    <div className="flex items-center space-x-0.5">
      {stars}
    </div>
  );
} 