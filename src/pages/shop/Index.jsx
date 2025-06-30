import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    fetchProducts,
    fetchCategories,
    fetchProductsByCategory,
    selectFilteredProducts,
    selectCategories,
    selectSelectedCategory,
    selectCategoryStatus,
    selectFilters,
    selectFilterOptions,
    selectPagination,
    setSelectedCategory,
    updateFilters,
    clearFilters
} from '@/features/products/productsSlice';
import { ProductCard } from '@/components/product/ProductCard';
import { RangeSlider } from '@/components/common/Slider';
import { Pagination } from '@/components/common/Pagination';
import { PageNavigation } from '@/components/common/PageNavigation';
import { COLORS } from '@/constants/colors';
import {
    AdjustmentsHorizontalIcon,
    TagIcon,
    ArrowsUpDownIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    ChevronUpIcon,
    XMarkIcon,
    StarIcon,
    CheckIcon,
    ArrowRightIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: COLORS.secondary }}
        />
    </div>
);

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectFilteredProducts);
    const categories = useSelector(selectCategories);
    const selectedCategory = useSelector(selectSelectedCategory);
    const categoryStatus = useSelector(selectCategoryStatus);
    const filters = useSelector(selectFilters);
    const filterOptions = useSelector(selectFilterOptions);
    const pagination = useSelector(selectPagination);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);

    const [priceRange, setPriceRange] = useState(filters.priceRange);
    const [localFilters, setLocalFilters] = useState({
        sortBy: filters.sortBy,
        searchQuery: filters.searchQuery,
        rating: filters.rating,
        availability: filters.availability,
        discount: filters.discount,
        colors: filters.colors,
        materials: filters.materials,
        brands: filters.brands,
        tags: filters.tags,
        features: filters.features
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeFilterSection, setActiveFilterSection] = useState('categories');

    // Fetch products and categories on mount or when filters change
    useEffect(() => {
        const fetchData = async () => {
            if (localFilters.searchQuery) {
                // Use search endpoint when there's a search query
                await dispatch(fetchProducts({
                    page: pagination.currentPage,
                    size: pagination.pageSize,
                    sortBy: filters.sortBy === 'price-low-to-high' ? 'price' : 'name',
                    direction: filters.sortBy === 'price-low-to-high' ? 'asc' : 'desc',
                    name: localFilters.searchQuery,
                    isSearch: true // Flag to indicate this is a search request
                }));
            } else {
                // Regular product listing
                await dispatch(fetchProducts({
                    page: pagination.currentPage,
                    size: pagination.pageSize,
                    sortBy: filters.sortBy === 'price-low-to-high' ? 'price' : 'name',
                    direction: filters.sortBy === 'price-low-to-high' ? 'asc' : 'desc',
                    name: localFilters.searchQuery,
                    isSearch: true // Flag to indicate this is a search request
                }));
            }
            dispatch(fetchCategories());
        };
        
        fetchData();
    }, [dispatch, pagination.currentPage, pagination.pageSize, filters.sortBy, localFilters.searchQuery]);

    // Handle price range change - client-side filtering only
    const handlePriceRangeChange = (newRange) => {
        setPriceRange(newRange);

        // Update Redux state with the new price range to trigger client-side filtering
        dispatch(updateFilters({ priceRange: newRange }));

        console.log('Price range updated:', newRange);

        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            // Scroll to top when changing page
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Fetch products for the new page
            // Remember: UI uses 1-based pagination but API uses 0-based pagination
            // The conversion happens in the API service
            dispatch(fetchProducts({
                page,
                size: pagination.pageSize,
                sortBy: filters.sortBy,
                direction: filters.sortBy === 'price-low-to-high' ? 'asc' : 'desc'
            }));

            console.log(`Navigating to page ${page}`);

            // Reset any client-side filters that might interfere with pagination
            // But keep the selected category and other filters
            const currentCategory = selectedCategory;
            const currentFilters = { ...filters };

            // Briefly delay to ensure the new page data is loaded before reapplying filters
            setTimeout(() => {
                // Reapply category filter if needed
                if (currentCategory && currentCategory.toLowerCase() !== 'all') {
                    dispatch(setSelectedCategory(currentCategory));
                }

                // Reapply other filters
                dispatch(updateFilters(currentFilters));
            }, 300);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newSize) => {
        console.log(`Changing page size to: ${newSize}`);

        // Scroll to top when changing page size
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Fetch products with the new page size
        dispatch(fetchProducts({
            page: 1, // Reset to first page when changing page size
            size: newSize,
            sortBy: filters.sortBy,
            direction: filters.sortBy === 'price-low-to-high' ? 'asc' : 'desc'
        }));
    };

    // Handle scroll to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Apply filters after a short delay when they change
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(updateFilters({
                priceRange,
                sortBy: localFilters.sortBy,
                searchQuery: localFilters.searchQuery
            }));
        }, 300);
        return () => clearTimeout(timer);
    }, [priceRange, localFilters, dispatch]);

    const handleCategoryChange = (categoryId, categoryName) => {
        // Update the selected category in Redux state for client-side filtering
        const categoryValue = categoryName || 'all';
        dispatch(setSelectedCategory(categoryValue));

        console.log(`Filtering by category: ${categoryValue}`);

        // If we don't have enough products loaded yet, fetch all products
        if (products.length < 10) {
            // Fetch all products to ensure we have a good selection to filter from
            dispatch(fetchProducts({
                page: 1,
                size: 100, // Fetch more products to ensure we have enough for filtering
                sortBy: filters.sortBy,
                direction: filters.sortBy === 'price-low-to-high' ? 'asc' : 'desc'
            }));
        }

        // Scroll to top for better UX when changing categories
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Close filter sidebar on mobile after category selection
        if (window.innerWidth < 768) {
            setIsFilterOpen(false);
        }
    };

    const handlePriceChange = (values) => {
        setPriceRange(values);

        // Update local filters immediately to reflect in UI
        setLocalFilters(prev => ({
            ...prev,
            priceRange: values
        }));

        // Update Redux state to trigger the actual filtering
        dispatch(updateFilters({ priceRange: values }));

        console.log('Price range changed:', values);
    };

    // Add debounced effect to update Redux store
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(updateFilters({ priceRange }));
        }, 300);
        return () => clearTimeout(timer);
    }, [priceRange, dispatch]);

    const handleSortChange = (e) => {
        setLocalFilters({ ...localFilters, sortBy: e.target.value });
    };

    const searchInputRef = React.useRef(null);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchQuery = searchInputRef.current?.value?.trim() || '';
        
        // Always use the search endpoint when the form is submitted
        dispatch(fetchProducts({
            page: 1, // Reset to first page when searching
            size: pagination.pageSize || 12,
            sortBy: filters.sortBy === 'price-low-to-high' ? 'price' : 'name',
            direction: filters.sortBy === 'price-low-to-high' ? 'asc' : 'desc',
            name: searchQuery || undefined,
            isSearch: true
        }));
    };

    const handleFilterChange = (filterType, value) => {
        // Update local state first for immediate UI feedback
        setLocalFilters(prev => {
            const newFilters = { ...prev };

            if (Array.isArray(prev[filterType])) {
                // Handle array filters (colors, materials, etc.)
                if (prev[filterType].includes(value)) {
                    newFilters[filterType] = prev[filterType].filter(item => item !== value);
                } else {
                    newFilters[filterType] = [...prev[filterType], value];
                }
            } else {
                // Handle single value filters (rating, availability, etc.)
                newFilters[filterType] = value;
            }

            return newFilters;
        });

        // Update Redux store to trigger filtering
        // For rating filter, we need to handle it specially
        if (filterType === 'rating') {
            console.log(`Setting rating filter to: ${value}`);
            dispatch(updateFilters({ rating: value }));

            // Scroll to top for better UX when filtering
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // For other filters like availability
        else if (filterType === 'availability') {
            console.log(`Setting availability filter to: ${value}`);
            dispatch(updateFilters({ availability: value }));

            // Scroll to top for better UX when filtering
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const resetFilters = () => {
        // Reset local state
        setPriceRange([0, 100000]);
        setLocalFilters({
            sortBy: 'newest',
            searchQuery: '',
            rating: null,
            availability: 'all',
            discount: 'all',
            colors: [],
            materials: [],
            brands: [],
            tags: [],
            features: []
        });

        // Reset Redux store to trigger filtering
        dispatch(clearFilters());
        console.log('All filters have been reset');

        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(setSelectedCategory('all'));
        dispatch(fetchProducts());
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (status === 'loading' || categoryStatus === 'loading') {
        return <LoadingFallback />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Mobile/Tablet Filter Button */}
                    <div className="lg:hidden sticky top-0 z-40 mb-6 bg-white/90 backdrop-blur-sm py-3 md:py-4 -mx-4 px-4 md:-mx-6 md:px-6 border-b border-gray-100">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg md:text-xl font-semibold" style={{ color: COLORS.text }}>
                                    {selectedCategory === 'all' ? 'Tous les Produits' : 
                                    categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                                    <span className="text-gray-500 ml-2 text-sm md:text-base font-normal">
                                        ({products.length} {products.length === 1 ? 'article' : 'articles'})
                                    </span>
                                </h2>
                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="px-4 md:px-5 py-2.5 md:py-3 rounded-xl flex items-center gap-2 shadow-sm border border-gray-200"
                                    style={{
                                        background: 'white',
                                        color: COLORS.primary,
                                    }}
                                >
                                    <AdjustmentsHorizontalIcon className="w-5 h-5 md:w-6 md:h-6" />
                                    <span className="font-medium text-sm md:text-base">Filtres</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>


                    {/* Filters Sidebar */}
                    <AnimatePresence>
                        {(isFilterOpen || window.innerWidth >= 1024) && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className={`fixed inset-0 z-50 bg-white lg:bg-transparent lg:static lg:z-auto w-full lg:w-72 xl:w-80 2xl:w-96 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}
                            >
                                <div className="bg-white h-full lg:h-[calc(100vh-8rem)] overflow-y-auto p-5 lg:p-6 xl:p-7 rounded-none lg:rounded-2xl shadow-xl lg:sticky lg:top-4 transition-all duration-200"
                                    style={{
                                        background: COLORS.gradients.light,
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: `${COLORS.primary} transparent`
                                    }}>
                                    {/* Scrollbar styling for Webkit browsers */}
                                    <style jsx>{`
                                        div::-webkit-scrollbar {
                                            width: 6px;
                                        }
                                        div::-webkit-scrollbar-track {
                                            background: transparent;
                                        }
                                        div::-webkit-scrollbar-thumb {
                                            background-color: ${COLORS.primary}40;
                                            border-radius: 20px;
                                        }
                                    `}</style>
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6 lg:mb-7 xl:mb-8">
                                        <div className="flex items-center gap-3">
                                            <FunnelIcon className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: COLORS.secondary }} />
                                            <h3 className="text-base lg:text-lg font-semibold" style={{ color: COLORS.text }}>Filtres</h3>
                                        </div>
                                        <div className="flex items-center gap-2 lg:gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.02, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={resetFilters}
                                                className="text-xs lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 lg:gap-2 border border-transparent hover:border-gray-200"
                                                style={{
                                                    background: `${COLORS.secondary}08`,
                                                    color: COLORS.secondary,
                                                    backdropFilter: 'blur(4px)'
                                                }}
                                            >
                                                <ArrowPathIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                                <span>Réinitialiser</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setIsFilterOpen(false)}
                                                className="lg:hidden flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-full transition-colors"
                                                style={{ 
                                                    color: COLORS.text,
                                                    border: `1px solid ${COLORS.text}15`,
                                                    backgroundColor: 'rgba(255,255,255,0.8)'
                                                }}
                                                aria-label="Fermer les filtres"
                                            >
                                                <XMarkIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Filter Sections */}
                                    <div className="space-y-6">
                                        {/* Categories Section */}
                                        <div className="filter-section">
                                            <motion.button
                                                onClick={() => setActiveFilterSection(prev => prev === 'categories' ? '' : 'categories')}
                                                className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-white/50"
                                                style={{ background: activeFilterSection === 'categories' ? 'white' : 'transparent' }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <FunnelIcon className="w-5 h-5" style={{ color: COLORS.secondary }} />
                                                    <h4 className="font-medium" style={{ color: COLORS.text }}>Catégories</h4>
                                                </div>
                                                <ChevronUpIcon
                                                    className={`w-5 h-5 transition-transform ${activeFilterSection === 'categories' ? 'rotate-180' : ''}`}
                                                    style={{ color: COLORS.secondary }}
                                                />
                                            </motion.button>
                                            <AnimatePresence>
                                                {activeFilterSection === 'categories' && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 py-3 space-y-2">
                                                            <motion.button
                                                                whileHover={{ x: 4 }}
                                                                onClick={() => handleCategoryChange('all', 'all')}
                                                                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${selectedCategory === 'all'
                                                                        ? 'bg-white shadow-md'
                                                                        : 'hover:bg-white/50'
                                                                    }`}
                                                                style={{
                                                                    color: selectedCategory === 'all'
                                                                        ? COLORS.secondary
                                                                        : COLORS.text
                                                                }}
                                                            >
                                                                Tous les Produits
                                                            </motion.button>
                                                            {Array.isArray(categories) ? categories.map((category) => (
                                                                <motion.button
                                                                    key={category.id}
                                                                    whileHover={{ x: 4 }}
                                                                    onClick={() => handleCategoryChange(category.id, category.name)}
                                                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${selectedCategory === category.name
                                                                            ? 'bg-white shadow-md'
                                                                            : 'hover:bg-white/50'
                                                                        }`}
                                                                    style={{
                                                                        color: selectedCategory === category.name
                                                                            ? COLORS.secondary
                                                                            : COLORS.text
                                                                    }}
                                                                >
                                                                    {category.name}
                                                                </motion.button>
                                                            )) : <p className="px-4 py-2 text-sm" style={{ color: COLORS.textMuted }}>No categories available</p>}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Price Range Section */}
                                        <div className="filter-section">
                                            <motion.button
                                                onClick={() => setActiveFilterSection(prev => prev === 'price' ? '' : 'price')}
                                                className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-white/50"
                                                style={{ background: activeFilterSection === 'price' ? 'white' : 'transparent' }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <TagIcon className="w-5 h-5" style={{ color: COLORS.secondary }} />
                                                    <h4 className="font-medium" style={{ color: COLORS.text }}>Gamme de Prix</h4>
                                                </div>
                                                <ChevronUpIcon
                                                    className={`w-5 h-5 transition-transform ${activeFilterSection === 'price' ? 'rotate-180' : ''}`}
                                                    style={{ color: COLORS.secondary }}
                                                />
                                            </motion.button>
                                            <AnimatePresence>
                                                {activeFilterSection === 'price' && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 py-6">
                                                            <div className="relative mb-4">
                                                                <RangeSlider
                                                                    min={0}
                                                                    max={10000}
                                                                    step={50}
                                                                    value={priceRange}
                                                                    onChange={handlePriceChange}
                                                                    className="z-10 relative"
                                                                    trackStyle={{
                                                                        backgroundColor: `${COLORS.secondary}20`,
                                                                        height: 3,
                                                                        borderRadius: 4
                                                                    }}
                                                                    rangeStyle={{
                                                                        background: `linear-gradient(90deg, ${COLORS.secondary} 0%, ${COLORS.secondaryLight} 100%)`,
                                                                        height: 3,
                                                                        borderRadius: 4
                                                                    }}
                                                                    railStyle={{
                                                                        backgroundColor: `${COLORS.secondary}10`,
                                                                        height: 3,
                                                                        borderRadius: 4
                                                                    }}
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="relative">
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORS.secondary }}>$</span>
                                                                        <input
                                                                            type="number"
                                                                            min="0"
                                                                            max={priceRange[1]}
                                                                            value={priceRange[0]}
                                                                            onChange={(e) => {
                                                                                const min = Math.min(Number(e.target.value), priceRange[1]);
                                                                                handlePriceChange([min, priceRange[1]]);
                                                                            }}
                                                                            className="w-full pl-8 pr-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                                            style={{
                                                                                borderColor: `${COLORS.secondary}20`,
                                                                                color: COLORS.text,
                                                                                focusRingColor: `${COLORS.secondary}40`
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="relative">
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORS.secondary }}>$</span>
                                                                        <input
                                                                            type="number"
                                                                            min={priceRange[0]}
                                                                            max="10000"
                                                                            value={priceRange[1]}
                                                                            onChange={(e) => {
                                                                                const max = Math.max(Number(e.target.value), priceRange[0]);
                                                                                handlePriceChange([priceRange[0], max]);
                                                                            }}
                                                                            className="w-full pl-8 pr-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                                            style={{
                                                                                borderColor: `${COLORS.secondary}20`,
                                                                                color: COLORS.text,
                                                                                focusRingColor: `${COLORS.secondary}40`
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="text-xs text-gray-500 mt-2 text-center">
                                                                Les produits sont filtrés instantanément lorsque vous ajustez la gamme de prix
                                                            </div>

                                                            <div className="mt-4 flex justify-end">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    onClick={() => handlePriceChange([0, 10000])}
                                                                    className="text-sm px-4 py-2 rounded-xl transition-all duration-200"
                                                                    style={{
                                                                        background: `${COLORS.secondary}10`,
                                                                        color: COLORS.secondary
                                                                    }}
                                                                >
                                                                    Réinitialiser
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Rating Filter */}
                                        <div className="filter-section">
                                            <motion.button
                                                onClick={() => setActiveFilterSection(prev => prev === 'rating' ? '' : 'rating')}
                                                className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-white/50"
                                                style={{ background: activeFilterSection === 'rating' ? 'white' : 'transparent' }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <StarIcon className="w-5 h-5" style={{ color: COLORS.secondary }} />
                                                    <h4 className="font-medium" style={{ color: COLORS.text }}>Évaluation</h4>
                                                </div>
                                                <ChevronUpIcon
                                                    className={`w-5 h-5 transition-transform ${activeFilterSection === 'rating' ? 'rotate-180' : ''}`}
                                                    style={{ color: COLORS.secondary }}
                                                />
                                            </motion.button>
                                            <AnimatePresence>
                                                {activeFilterSection === 'rating' && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 py-3 space-y-2">
                                                            {[4, 3, 2, 1].map((rating) => (
                                                                <motion.button
                                                                    key={rating}
                                                                    whileHover={{ x: 4 }}
                                                                    onClick={() => handleFilterChange('rating', rating)}
                                                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${localFilters.rating === rating
                                                                            ? 'bg-white shadow-md'
                                                                            : 'hover:bg-white/50'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="flex">
                                                                            {[...Array(5)].map((_, i) => (
                                                                                <StarIcon
                                                                                    key={i}
                                                                                    className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                        <span style={{
                                                                            color: localFilters.rating === rating
                                                                                ? COLORS.secondary
                                                                                : COLORS.text
                                                                        }}> et plus</span>
                                                                    </div>
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Availability Filter */}
                                        <div className="filter-section">
                                            <motion.button
                                                onClick={() => setActiveFilterSection(prev => prev === 'availability' ? '' : 'availability')}
                                                className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-white/50"
                                                style={{ background: activeFilterSection === 'availability' ? 'white' : 'transparent' }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <CheckIcon className="w-5 h-5" style={{ color: COLORS.secondary }} />
                                                    <h4 className="font-medium" style={{ color: COLORS.text }}>Disponibilité</h4>
                                                </div>
                                                <ChevronUpIcon
                                                    className={`w-5 h-5 transition-transform ${activeFilterSection === 'availability' ? 'rotate-180' : ''}`}
                                                    style={{ color: COLORS.secondary }}
                                                />
                                            </motion.button>
                                            <AnimatePresence>
                                                {activeFilterSection === 'availability' && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 py-3 space-y-2">
                                                            {[
                                                                { value: 'all', label: 'Tous les Articles' },
                                                                { value: 'in-stock', label: 'En Stock' },
                                                                { value: 'out-of-stock', label: 'Rupture de Stock' }
                                                            ].map((option) => (
                                                                <motion.button
                                                                    key={option.value}
                                                                    whileHover={{ x: 4 }}
                                                                    onClick={() => handleFilterChange('availability', option.value)}
                                                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${localFilters.availability === option.value
                                                                            ? 'bg-white shadow-md'
                                                                            : 'hover:bg-white/50'
                                                                        }`}
                                                                    style={{
                                                                        color: localFilters.availability === option.value
                                                                            ? COLORS.secondary
                                                                            : COLORS.text
                                                                    }}
                                                                >
                                                                    {option.label}
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Dynamic Filter Sections */}
                                        {['colors', 'materials', 'brands', 'tags', 'features'].map((filterType) => (
                                            filterOptions[filterType]?.length > 0 && (
                                                <div key={filterType} className="filter-section">
                                                    <motion.button
                                                        onClick={() => setActiveFilterSection(prev => prev === filterType ? '' : filterType)}
                                                        className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-white/50"
                                                        style={{ background: activeFilterSection === filterType ? 'white' : 'transparent' }}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <TagIcon className="w-5 h-5" style={{ color: COLORS.secondary }} />
                                                            <h4 className="font-medium capitalize" style={{ color: COLORS.text }}>
                                                                {filterType}
                                                            </h4>
                                                        </div>
                                                        <ChevronUpIcon
                                                            className={`w-5 h-5 transition-transform ${activeFilterSection === filterType ? 'rotate-180' : ''}`}
                                                            style={{ color: COLORS.secondary }}
                                                        />
                                                    </motion.button>
                                                    <AnimatePresence>
                                                        {activeFilterSection === filterType && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="px-4 py-3 space-y-2">
                                                                    {filterOptions[filterType].map((option) => (
                                                                        <motion.button
                                                                            key={option}
                                                                            whileHover={{ x: 4 }}
                                                                            onClick={() => handleFilterChange(filterType, option)}
                                                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${localFilters[filterType].includes(option)
                                                                                    ? 'bg-white shadow-md'
                                                                                    : 'hover:bg-white/50'
                                                                                }`}
                                                                            style={{
                                                                                color: localFilters[filterType].includes(option)
                                                                                    ? COLORS.secondary
                                                                                    : COLORS.text
                                                                            }}
                                                                        >
                                                                            <div className="flex items-center justify-between">
                                                                                <span>{option}</span>
                                                                                {localFilters[filterType].includes(option) && (
                                                                                    <CheckIcon className="w-5 h-5" />
                                                                                )}
                                                                            </div>
                                                                        </motion.button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Products List */}
                    <div className="w-full md:w-full lg:w-4/5">
                        <div className="mb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                <h1 className="text-3xl font-bold hidden md:block" style={{ color: COLORS.text }}>
                                    {selectedCategory === 'all' ? 'Tous les Produits' :
                                        categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                                    <span className="text-gray-500 ml-2 text-xl">
                                        ({products.length} {products.length === 1 ? 'article' : 'articles'})
                                    </span>
                                </h1>
                                <form onSubmit={handleSearchSubmit} className="w-full max-w-md ml-auto">
                                    <div className="relative flex items-center group">
                                        <div className="absolute left-3 pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                            <MagnifyingGlassIcon className="w-4 h-4" />
                                        </div>
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Rechercher..."
                                            className="w-full pl-9 pr-8 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A05C] focus:border-transparent transition-all duration-200 bg-white/90 hover:bg-white/100 placeholder-gray-400 text-gray-700"
                                        />
                                        <button 
                                            type="submit" 
                                            className="absolute right-1 p-1 text-gray-400 hover:text-primary transition-colors focus:outline-none"
                                            aria-label="Rechercher"
                                        >
                                            <ArrowRightIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Page Navigation - Top */}
                            {products.length > 0 && (
                                <PageNavigation
                                    currentPage={pagination.currentPage || 1}
                                    totalPages={pagination.totalPages || 1}
                                    onPageChange={handlePageChange}
                                    className="mb-6"
                                />
                            )}

                            {/* Products Grid */}
                            <div className="w-full overflow-hidden">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-7 lg:gap-8 pr-0">
                                    <AnimatePresence>
                                        {products.map((product, index) => (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                className="w-full"
                                            >
                                                <ProductCard product={product} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Pagination and Results Info */}
                            {products.length > 0 && (
                                <div className="mt-8 space-y-6">
                                    {/* Results info */}
                                    <div className="text-center mb-4 text-sm text-gray-600">
                                        Affichage de {products.length} {products.length === 1 ? 'produit' : 'produits'} sur {pagination.totalItems} au total
                                    </div>

                                    {/* Pagination */}
                                    <Pagination
                                        currentPage={pagination.currentPage || 1}
                                        totalPages={pagination.totalPages || Math.max(Math.ceil(pagination.totalItems / (pagination.pageSize || 10)), 1)}
                                        onPageChange={handlePageChange}
                                        onPageSizeChange={handlePageSizeChange}
                                        pageSize={pagination.pageSize || 10}
                                        className={`${status === 'loading' ? 'opacity-70 pointer-events-none' : ''}`}
                                    />

                                    {/* Loading indicator */}
                                    {status === 'loading' && (
                                        <div className="flex justify-center mt-4">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="rounded-full h-6 w-6 border-t-2 border-b-2"
                                                style={{ borderColor: COLORS.secondary }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {products.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-16 px-4"
                                >
                                    <div className="p-4 rounded-full inline-block mb-4"
                                        style={{ backgroundColor: `${COLORS.primary}15` }}>
                                        <FunnelIcon className="w-8 h-8" style={{ color: COLORS.primary }} />
                                    </div>
                                    <h3 className="text-xl font-medium mb-2" style={{ color: COLORS.text }}>Aucun produit trouvé</h3>
                                    <p className="text-sm mb-6" style={{ color: COLORS.textMuted }}>
                                        Essayez d'ajuster vos filtres ou termes de recherche
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={resetFilters}
                                        className="px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
                                        style={{
                                            color: COLORS.secondary,
                                            backgroundColor: `${COLORS.secondary}15`
                                        }}
                                    >
                                        Réinitialiser les Filtres
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 p-4 rounded-full shadow-lg z-50"
                        style={{
                            background: COLORS.gradients.primary,
                            color: COLORS.backgroundLight
                        }}
                    >
                        <ChevronUpIcon className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductsPage;