import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiTag, FiFolder } from 'react-icons/fi';
import { COLORS } from '@/constants/colors';
import { API_CONFIG } from '@/services/api/config';

// Fonction utilitaire pour vérifier si une valeur est un objet et la convertir en chaîne si nécessaire
const safeValue = (value, defaultValue = '') => {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

const BlogCard = ({ blog, onClick }) => {
  // Créer un objet blog sécurisé avec des valeurs par défaut
  const safeBlog = useMemo(() => {
    if (!blog) return {};
    
    return {
      id: blog.id || 0,
      title: safeValue(blog.title, 'Titre de l\'article'),
      content: safeValue(blog.content, 'Contenu non disponible'),
      image: safeValue(blog.image, ''),
      category: safeValue(blog.category, 'Catégorie'),
      tags: safeValue(blog.tags, ''),
      created_at: safeValue(blog.created_at, '')
    };
  }, [blog]);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Truncate content for preview
  const truncateContent = (content, maxLength = 120) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Get first tag
  const firstTag = safeBlog.tags ? safeBlog.tags.split(',')[0] : '';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-50 hover:border-gray-200 h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-[#F9F5EC]">
        <img
          src={`${safeBlog.image}`}
          alt={safeBlog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F9F5EC] text-[#C2A45F] flex items-center gap-1">
            <FiFolder className="w-3 h-3" />
            {safeBlog.category}
          </span>
          
          {firstTag && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
              <FiTag className="w-3 h-3" />
              {firstTag}
            </span>
          )}
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-xl mb-3" style={{ color: COLORS.text }}>
          {safeBlog.title}
        </h3>
        
        {/* Content preview */}
        <p className="text-gray-600 mb-4 flex-grow">
          {truncateContent(safeBlog.content)}
        </p>
        
        {/* Date */}
        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <FiCalendar className="w-4 h-4 mr-2" />
          {formatDate(safeBlog.created_at)}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
