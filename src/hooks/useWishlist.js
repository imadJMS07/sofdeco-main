import { useState, useEffect, useMemo } from 'react';
import { mockWishlistAPI } from '@/services/api/mock/wishlist.mock';

/**
 * Custom hook for managing wishlist state and operations
 * @returns {Object} Wishlist state and operations
 */
export const useWishlist = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist items
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        const response = await mockWishlistAPI.getWishlist();
        setItems(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Calculate wishlist statistics
  const stats = useMemo(() => {
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => sum + item.price, 0);
    const totalSavings = items.reduce((sum, item) => {
      if (item.discount) {
        const originalPrice = item.price / (1 - item.discount / 100);
        return sum + (originalPrice - item.price);
      }
      return sum;
    }, 0);

    const categories = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    return {
      totalItems,
      totalValue,
      totalSavings,
      categories
    };
  }, [items]);

  // Wishlist operations
  const addToWishlist = async (productId) => {
    try {
      setIsLoading(true);
      const response = await mockWishlistAPI.addToWishlist(productId);
      setItems(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setIsLoading(true);
      const response = await mockWishlistAPI.removeFromWishlist(productId);
      setItems(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const moveToCart = async (productId) => {
    try {
      setIsLoading(true);
      const response = await mockWishlistAPI.moveToCart(productId);
      setItems(response.data.wishlist);
      // Note: In a real app, you would also update the cart state here
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    isLoading,
    error,
    stats,
    actions: {
      addToWishlist,
      removeFromWishlist,
      moveToCart
    }
  };
}; 