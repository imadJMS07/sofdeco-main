import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

export const ImageMagnifier = ({ src, alt, onFullscreen }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imgRef = useRef(null);
  const ZOOM_LEVEL = 2.5;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-2xl group"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-105"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseMove}
      />
      <AnimatePresence>
      {showMagnifier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none z-20"
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${ZOOM_LEVEL * 100}%`,
              borderRadius: '1.5rem',
            }}
          />
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onFullscreen}
        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:text-gray-900 transition-colors z-30 cursor-pointer"
      >
        <FiMaximize2 className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export const FullscreenGallery = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
      >
        <FiX className="w-8 h-8" />
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 p-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
      >
        <FiChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 p-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
      >
        <FiChevronRight className="w-8 h-8" />
      </button>
      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        src={images[currentIndex].image_path}
        alt={`Product view ${currentIndex + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onNext(index)}
            className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};
