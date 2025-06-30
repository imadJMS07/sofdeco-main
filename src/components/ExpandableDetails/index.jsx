import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { COLORS } from '@/constants/colors';

export const ExpandableDetails = ({ isExpanded, onToggle, product }) => {
  const sections = [
    {
      title: 'Features',
      content: (
        <ul className="list-disc list-inside space-y-1">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Colors',
      content: (
        <div className="flex gap-2">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )
    },
    {
      title: 'Dimensions',
      content: <p>{product.dimensions}</p>
    },
    {
      title: 'Materials',
      content: <p>{product.materials}</p>
    }
  ];

  return (
    <div className="mt-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-sm text-gray-500 hover:text-gray-700"
      >
        <span>Product Details</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 text-sm text-gray-600">
              <p>{product.description}</p>
              {product.specifications && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Specifications</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {product.specifications.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
              {sections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {section.title}
                  </h4>
                  <div className="text-gray-600">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 