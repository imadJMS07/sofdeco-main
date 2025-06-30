import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const DesktopNav = ({ navItems }) => {
  const location = useLocation();

  return (
    <div className="flex items-center space-x-8">
      {navItems.map((item) => (
        <motion.div
          key={item.path}
          className="relative"
          whileHover="hover"
        >
          <Link
            to={item.path}
            className={`relative px-3 py-2 text-[15px] tracking-wide font-medium transition-colors duration-300 ${
              location.pathname === item.path
                ? 'text-[#C5A05C]'
                : 'text-gray-800 hover:text-[#C5A05C]'
            }`}
          >
            {/* Text */}
            <span className="relative">
              {item.label}
              
              {/* Active indicator */}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#C5A05C]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </span>

            {/* Hover line */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#C5A05C] origin-center"
              initial={{ scaleX: 0, opacity: 0 }}
              variants={{
                hover: { scaleX: 1, opacity: 1 }
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}; 