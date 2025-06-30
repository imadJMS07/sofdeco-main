import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  HeartIcon, 
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { NAV_ITEMS } from './constants';
import { IconButton } from './components/IconButton';
import { DesktopNav } from './components/DesktopNav';
import { CartModal } from '@/components/Cart/CartModal';
import { toggleCart, updateQuantity, removeFromCart } from '@/features/cart/cartSlice';
import { toggleWishlist } from '@/features/ui/uiSlice';
import { selectWishlistItems } from '@/features/wishlist/wishlistSlice';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const cartItems = useSelector(state => state.cart.items);
  const isCartOpen = useSelector(state => state.cart.isOpen);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist());
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        height: isScrolled ? '72px' : '88px',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm w-full overflow-x-hidden"
    >
      {/* Subtle top border */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A05C]/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      
      {/* Logo - centered on larger screens, left-aligned on mobile */}
      <div className="hidden sm:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Link 
          to="/" 
          className="relative flex items-center justify-center"
        >
          <motion.img 
            src="/logo/logo-black.svg" 
            alt="SOFDECO" 
            className={`transition-all duration-300 ${isScrolled ? 'h-9 md:h-10 lg:h-12' : 'h-10 md:h-11 lg:h-12'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          />
        </Link>
      </div>
      
      <div className="container mx-auto px-4 h-full flex items-center justify-between relative w-full max-w-screen-2xl">
        {/* Left - Navigation or Logo (on mobile) */}
        <div className="flex items-center">
          {/* Mobile Logo - Left aligned */}
          <div className="sm:hidden">
            <Link 
              to="/" 
              className="relative flex items-center"
            >
              <motion.img 
                src="/logo/logo-black.svg" 
                alt="SOFDECO" 
                className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-9'}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            <DesktopNav navItems={NAV_ITEMS} />
          </div>
        </div>
        
        {/* Tablet Navigation - Simplified version for medium screens */}
        <div className="hidden md:flex lg:hidden items-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-[#C5A05C]/5 flex items-center space-x-2"
          >
            <Bars3Icon className="h-5 w-5 text-[#4E3B26]" />
            <span className="text-sm font-medium text-[#4E3B26]">Menu</span>
          </motion.button>
        </div>

        {/* Empty center space for the absolute positioned logo */}
        <div className="invisible">
          <img 
            src="/logo/logo-black.svg" 
            alt="" 
            className={`transition-all duration-300 ${isScrolled ? 'h-8 sm:h-9 md:h-10 lg:h-12' : 'h-9 sm:h-10 md:h-11 lg:h-12'}`}
          />
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Desktop & Tablet actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            {[
              { icon: MagnifyingGlassIcon, onClick: () => navigate('/products'), label: "Search" },
              { icon: HeartIcon, onClick: handleToggleWishlist, label: "Wishlist", count: wishlistCount },
              { icon: ShoppingCartIcon, onClick: handleToggleCart, label: "Cart", count: cartItemCount }
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton 
                  icon={<item.icon className="h-5 w-5" />}
                  onClick={item.onClick}
                  count={item.count}
                  className="relative text-gray-800 hover:text-[#C5A05C] transition-colors duration-300"
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-3 mr-1 sm:mr-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
                className="p-1.5 rounded-full hover:bg-[#C5A05C]/5"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-800" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleWishlist}
                className="p-1.5 rounded-full hover:bg-[#C5A05C]/5 relative"
              >
                <HeartIcon className="h-5 w-5 text-gray-800" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#C5A05C] text-white text-xs flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleCart}
                className="p-1.5 rounded-full hover:bg-[#C5A05C]/5 relative"
              >
                <ShoppingCartIcon className="h-5 w-5 text-gray-800" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#C5A05C] text-white text-xs flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 rounded-full hover:bg-[#C5A05C]/5"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6 text-gray-800" />
                  ) : (
                    <Bars3Icon className="h-6 w-6 text-gray-800" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#C5A05C]/10 lg:hidden"
          >
            <div className="container mx-auto p-4 space-y-2">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 px-4 text-sm font-medium ${
                      location.pathname === item.path
                        ? 'text-[#C5A05C]'
                        : 'text-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={handleToggleCart}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </motion.nav>
  );
}; 