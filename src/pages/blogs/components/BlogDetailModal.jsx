import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiTag, FiFolder, FiShare2, FiClock, FiUser, FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';
import { selectBlogByIdAction, selectBlogById, selectBlogsStatus, selectBlogsError } from '@/features/blogs/blogsSlice';
import { COLORS } from '@/constants/colors';
import { API_CONFIG } from '@/services/api/config';
import { toast } from 'react-hot-toast';

// Fonction utilitaire pour vérifier si une valeur est un objet et la convertir en chaîne si nécessaire
const safeValue = (value, defaultValue = '') => {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

// Hook personnalisé pour détecter les media queries
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

const BlogDetailModal = ({ blogId, isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const dispatch = useDispatch();
  const blogData = useSelector(state => selectBlogById(blogId)(state));
  const status = useSelector(selectBlogsStatus);
  const error = useSelector(selectBlogsError);
  
  // Créer un objet blog sécurisé avec des valeurs par défaut
  const blog = useMemo(() => {
    if (!blogData) return null;
    
    return {
      id: blogData.id || 0,
      title: safeValue(blogData.title, 'Titre de l\'article'),
      content: safeValue(blogData.content, 'Contenu non disponible'),
      image: safeValue(blogData.image, ''),
      category: safeValue(blogData.category, 'Catégorie'),
      tags: safeValue(blogData.tags, ''),
      created_at: safeValue(blogData.created_at, '')
    };
  }, [blogData]);

  useEffect(() => {
    if (isOpen && blogId) {
      dispatch(selectBlogByIdAction(blogId));
      // Reset expanded state when opening a new blog
      setIsExpanded(false);
    }
  }, [dispatch, blogId, isOpen]);
  
  // Measure content height to determine if we need the "Show more" button
  useEffect(() => {
    if (contentRef.current && blog) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [blog, isOpen]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    } catch (e) {
      return '';
    }
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: `Découvrez cet article : ${blog.title}`,
        url: window.location.href,
      })
      .catch(error => {
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          toast.success('Lien copié dans le presse-papier !');
        })
        .catch(err => {
          toast.error('Impossible de copier le lien');
        });
    }
  };

  // Get tags array - maintenant sécurisé car blog.tags est toujours une chaîne
  const tags = blog?.tags ? blog.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-0 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, type: "spring", damping: 25 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[90vh] overflow-hidden relative flex flex-col border border-gray-100 sm:my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Actions buttons */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white transition-all duration-300 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/50 shadow-md cursor-pointer"
              >
                <FiShare2 className="w-4 h-4" />
                <span className="text-sm font-medium">Partager</span>
              </button>
              
              <button
                onClick={onClose}
                className="p-2.5 text-white/90 hover:text-white transition-all duration-300 backdrop-blur-sm bg-black/40 rounded-full hover:bg-black/50 shadow-md cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {status === 'loading' ? (
              <BlogDetailSkeleton />
            ) : error ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-red-50 flex items-center justify-center shadow-inner">
                  <FiX className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-red-600 mb-3">Erreur</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full hover:shadow-md transition-all duration-300 font-medium hover:from-gray-200 hover:to-gray-300"
                >
                  Fermer
                </button>
              </div>
            ) : !blog ? (
              <div className="p-8 text-center">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 p-8 rounded-xl mb-8 shadow-sm border border-yellow-100/50">
                  <h2 className="text-yellow-700 font-bold mb-4">Article non trouvé</h2>
                  <p className="text-yellow-600">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full hover:shadow-md transition-all duration-300 font-medium hover:from-gray-200 hover:to-gray-300"
                >
                  Retourner à la liste
                </button>
              </div>
            ) : (
              <>
                {/* Blog header with image */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[16/9] w-full sm:rounded-t-2xl overflow-hidden">
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      src={`${blog.image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x675?text=Image+non+disponible';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent opacity-70"></div>
                  </div>
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 text-white"
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <span className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-none bg-white/10 backdrop-blur-sm flex items-center gap-1 sm:gap-2 border-l-2 border-white/10 pl-3">
                        <FiFolder className="w-3.5 h-3.5" />
                        {blog.category}
                      </span>
                      <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm flex items-center gap-2">
                        <FiCalendar className="w-3.5 h-3.5" />
                        {formatDate(blog.created_at)}
                      </span>
                      <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm flex items-center gap-2">
                        <FiClock className="w-3.5 h-3.5" />
                        {Math.ceil(blog.content.length / 1000)} min de lecture
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight line-clamp-3 sm:line-clamp-2 drop-shadow-sm">{blog.title}</h1>
                  </motion.div>
                </div>

                <div className="overflow-y-auto flex-grow" style={{ 
                  maxHeight: isMobile ? 'calc(100vh - 300px)' : isExpanded ? 'none' : 'min(600px, calc(90vh - 300px))'
                }}>
                  {/* Blog content */}
                  <div className="p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-b from-white to-gray-50 sm:rounded-b-2xl border-t border-gray-100">
                    <div ref={contentRef} className="prose prose-lg max-w-none mb-10" style={{ 
                      color: COLORS.text,
                      transition: 'max-height 0.5s ease-in-out',
                      lineHeight: '1.9',
                      letterSpacing: '0.015em',
                      fontFamily: '"Playfair Display", serif'
                    }}>
                      {typeof blog.content === 'string' ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >
                          {blog.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </motion.div>
                      ) : (
                        <p>Contenu non disponible</p>
                      )}
                    </div>

                    {/* Tags and share */}
                    {/* Expand/Collapse button for long content */}
                    {contentHeight > 600 && !isExpanded && (
                      <div className="text-center mb-8">
                        <button 
                          onClick={() => setIsExpanded(true)}
                          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300 border border-gray-200 shadow-sm"
                        >
                          <span>Voir plus</span>
                          <FiChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {isExpanded && (
                      <div className="text-center mb-8">
                        <button 
                          onClick={() => setIsExpanded(false)}
                          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300 border border-gray-200 shadow-sm"
                        >
                          <span>Réduire</span>
                          <FiChevronUp className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* Tags supprimés comme demandé */}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Skeleton loader for blog detail
const BlogDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[16/9] w-full bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden sm:rounded-t-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-300/50"></div>
    </div>
    
    <div className="p-8 md:p-12 bg-gradient-to-b from-white to-gray-50">
      <div className="flex gap-3 mb-6">
        <div className="h-8 w-28 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
        <div className="h-8 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
      </div>
      
      <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-4/5 mb-8"></div>
      
      <div className="space-y-5 mb-10">
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-full"></div>
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-full"></div>
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-5/6"></div>
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-full"></div>
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-4/6"></div>
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-full"></div>
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4"></div>
      </div>
      
      <div className="flex justify-between mt-10 pt-8 border-t border-gray-100">
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
          <div className="h-9 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
          <div className="h-9 w-28 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

export default BlogDetailModal;
