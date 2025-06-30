import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FiGrid, FiList, FiChevronRight } from 'react-icons/fi';
import { fetchBlogs, selectAllBlogs, selectBlogsStatus } from '@/features/blogs/blogsSlice';
import BlogCard from './BlogCard';
import { COLORS } from '@/constants/colors';
import { Pagination } from '@/components/common/Pagination';

const BlogsList = ({ onBlogClick }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);
  const status = useSelector(selectBlogsStatus);
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Nombre d'articles par page

  // Effet pour charger tous les blogs une seule fois
  useEffect(() => {
    dispatch(fetchBlogs({
      page: 1,
      size: 100, // Récupérer un grand nombre de blogs
      sortBy: 'created_at',
      direction: 'desc'
    }));
  }, [dispatch]);
  
  // Calculer les indices pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  
  // Changer de page
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll vers le haut de la liste
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Changer le nombre d'articles par page
  const handlePageSizeChange = (newSize) => {
    setItemsPerPage(newSize);
    setCurrentPage(1); // Retourner à la première page après changement de taille
    // Scroll vers le haut de la liste
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading skeleton
  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="flex justify-between items-center">
          <div className="h-12 w-48 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full animate-pulse"></div>
          <div className="h-12 w-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(6)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* En-tête luxueux avec titre et contrôles d'affichage */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 relative">
        {/* Ligne décorative */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10 hidden md:block"></div>
        
        <div className="relative">
          <h2 className="text-4xl font-bold tracking-tight" style={{ color: COLORS.text }}>Nos Articles</h2>
          <div className="h-1 w-16 mt-3" style={{ background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}></div>
        </div>
        
        {/* View mode toggle */}
        <div className="flex items-center gap-3 p-1.5 rounded-full border border-gray-200 shadow-sm backdrop-blur-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${viewMode === 'grid' 
              ? `bg-gradient-to-r from-[${COLORS.primary}] to-[${COLORS.secondary}] text-white shadow-lg` 
              : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FiGrid className="w-4 h-4" />
            <span className="text-sm font-medium">Grille</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${viewMode === 'list' 
              ? `bg-gradient-to-r from-[${COLORS.primary}] to-[${COLORS.secondary}] text-white shadow-lg` 
              : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FiList className="w-4 h-4" />
            <span className="text-sm font-medium">Liste</span>
          </button>
        </div>
      </div>

      {/* Liste des blogs */}
      {blogs.length > 0 ? (
        <>
          <AnimatePresence>
            <motion.div 
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.12 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12" 
                : "flex flex-col gap-8"}
            >
              {currentItems.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={viewMode === 'list' ? "w-full" : ""}
                >
                  <BlogCard blog={blog} onClick={() => onBlogClick(blog.id)} />
                </motion.div>
              ))}
            </motion.div>
            
            {/* Pagination and Results Info */}
            <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-sm font-medium text-gray-500 px-6 py-3 rounded-full shadow-sm border border-gray-200 backdrop-blur-sm flex items-center">
                <span className="inline-block h-2 w-2 rounded-full mr-2" style={{ background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}></span>
                Affichage de {currentItems.length} {currentItems.length === 1 ? 'article' : 'articles'} sur {blogs.length} au total
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                  pageSize={itemsPerPage}
                  className={`${status === 'loading' ? 'opacity-70 pointer-events-none' : ''}`}
                />
              )}
            </div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-16 text-center max-w-xl mx-auto"
        >
          <div className="w-32 h-32 mx-auto mb-10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F9F5EC] to-[#C2A45F] opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute inset-3 bg-gradient-to-br from-[#F9F5EC] to-[#C2A45F] opacity-20 rounded-full animate-pulse animation-delay-300"></div>
            <div className="absolute inset-6 bg-gradient-to-br from-[#F9F5EC] to-[#C2A45F] opacity-30 rounded-full animate-pulse animation-delay-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" style={{ color: COLORS.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-6" style={{ color: COLORS.text }}>
            Aucun article disponible
          </h3>
          <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Revenez bientôt pour découvrir notre sélection d'articles exclusifs.
          </p>
          <div className="h-1 w-24 mx-auto rounded-full" style={{ background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }}></div>
        </motion.div>
      )}
    </div>
  );
};

// Skeleton loader for blog cards
const BlogCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden animate-pulse h-full transform transition-all duration-300 hover:-translate-y-1 border border-gray-100 shadow-md">
    <div className="h-56 bg-gradient-to-r from-gray-100 to-gray-200"></div>
    <div className="p-8">
      <div className="flex gap-3 mb-5">
        <div className="w-24 h-7 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full"></div>
        <div className="w-20 h-7 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full"></div>
      </div>
      <div className="h-9 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-4/5 mb-5"></div>
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-full"></div>
        <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-full"></div>
        <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-5/6"></div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-1/3"></div>
        <div className="h-8 w-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default BlogsList;
