import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchBlogs } from '@/features/blogs/blogsSlice';
import BlogsList from './components/BlogsList';
import BlogDetailModal from './components/BlogDetailModal';
import { COLORS } from '@/constants/colors';
import { useLocation, useNavigate } from 'react-router-dom';

// Composant de secours pour les erreurs
class ErrorFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Blog error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-700 font-bold mb-2">Une erreur est survenue</h3>
          <p className="text-red-600 mb-2">Erreur de rendu dans le composant Blog.</p>
          <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40">
            {JSON.stringify(this.state.error, null, 2)}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const BlogsPage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs.blogs);
  const status = useSelector(state => state.blogs.status);
  const error = useSelector(state => state.blogs.error);
  const pagination = useSelector(state => state.blogs.pagination);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBlogs({
      page: 1,
      size: 100,
      sortBy: 'created_at',
      direction: 'desc'
    }));
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const blogId = params.get('blogId');
    
    if (blogId) {
      setSelectedBlogId(parseInt(blogId));
      setIsModalOpen(true);
    }
  }, [location]);

  const handleOpenBlog = (blogId) => {
    setSelectedBlogId(blogId);
    setIsModalOpen(true);
    // Mettre à jour l'URL sans rafraîchir la page
    navigate(`/blogs?blogId=${blogId}`, { replace: true });
  };

  const handleCloseBlog = () => {
    setIsModalOpen(false);
    // Supprimer le blogId de l'URL
    navigate('/blogs', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero section avec animation élégante */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-24 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Éléments décoratifs */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-10 rotate-45">
            <div className="w-full h-full border-t-2 border-l-2 rounded-tl-3xl" style={{ borderColor: COLORS.primary }}></div>
          </div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-10 -rotate-45">
            <div className="w-full h-full border-b-2 border-r-2 rounded-br-3xl" style={{ borderColor: COLORS.secondary }}></div>
          </div>
          

          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" 
            style={{ color: COLORS.text }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Notre Blog
          </motion.h1>
          
          <motion.div 
            className="h-1 w-24 mx-auto mb-8 rounded-full" 
            style={{ background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Découvrez nos derniers articles, conseils et actualités sur la décoration d'intérieur, 
            les tendances et l'art de vivre.
          </motion.p>
        </motion.div>

        {/* Blogs list */}
        <BlogsList onBlogClick={handleOpenBlog} />
        
        {/* Blog detail modal */}
        <BlogDetailModal 
          blogId={selectedBlogId} 
          isOpen={isModalOpen} 
          onClose={handleCloseBlog} 
        />


      </div>
    </div>
  );
};

export default BlogsPage;
