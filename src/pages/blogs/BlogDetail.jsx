import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiTag, FiFolder, FiShare2 } from 'react-icons/fi';
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

const BlogDetail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
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
    if (blogId) {
      dispatch(selectBlogByIdAction(blogId));
    }
  }, [dispatch, blogId]);

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

  // Loading state
  if (status === 'loading') {
    return <BlogDetailSkeleton />;
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.text }}>
              Une erreur est survenue
            </h2>
            <p className="text-gray-600 mb-6">{error || "Impossible de charger l'article demandé."}</p>
            <button
              onClick={() => navigate('/blogs')}
              className="px-6 py-3 rounded-lg font-medium"
              style={{ backgroundColor: COLORS.primary, color: 'white' }}
            >
              Retour aux blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If blog not found
  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.text }}>
              Article non trouvé
            </h2>
            <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
            <button
              onClick={() => navigate('/blogs')}
              className="px-6 py-3 rounded-lg font-medium"
              style={{ backgroundColor: COLORS.primary, color: 'white' }}
            >
              Retour aux blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get tags array - sécurisé car blog.tags est toujours une chaîne
  const tags = blog?.tags ? blog.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 group"
          onClick={() => navigate('/blogs')}
        >
          <FiArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Retour aux blogs</span>
        </motion.button>

        <div className="max-w-4xl mx-auto">
          {/* Blog header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-[#F9F5EC] text-[#C2A45F] flex items-center gap-1">
                <FiFolder className="w-4 h-4" />
                {blog.category}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <FiCalendar className="w-4 h-4 mr-1" />
                {formatDate(blog.created_at)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: COLORS.text }}>
              {blog.title}
            </h1>

            {/* Featured image */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8 aspect-video">
              <img
                src={`${API_CONFIG.BASE_URL}/storage/${blog.image}`}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x450?text=Image+non+disponible';
                }}
              />
            </div>
          </motion.div>

          {/* Blog content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8"
          >
            <div className="prose prose-lg max-w-none" style={{ color: COLORS.text }}>
              {blog.content}
            </div>
          </motion.div>

          {/* Tags and share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-4 mt-8"
          >
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span 
                  key={tag}
                  className="text-sm px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1"
                >
                  <FiTag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9F5EC] text-[#C2A45F] hover:bg-[#F3EEE3] transition-colors"
            >
              <FiShare2 className="w-4 h-4" />
              <span>Partager</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for blog detail
const BlogDetailSkeleton = () => (
  <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-16">
    <div className="container mx-auto px-4">
      <div className="h-8 w-32 bg-gray-200 rounded mb-8 animate-pulse"></div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          <div className="h-12 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>

          <div className="rounded-2xl overflow-hidden aspect-video bg-gray-200 mb-8 animate-pulse"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 animate-pulse">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/6"></div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export default BlogDetail;
