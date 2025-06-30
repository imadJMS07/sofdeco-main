import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will scroll the window to the top whenever the pathname changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Forcefully scroll to top when pathname changes
    // First try with smooth scrolling
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Also set a backup with immediate scrolling after a short delay
    // This helps ensure it works in all cases, especially on the products page
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      
      // For some pages like products that might have their own scroll handling,
      // we add an additional scroll after a slightly longer delay
      if (pathname.includes('products')) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
