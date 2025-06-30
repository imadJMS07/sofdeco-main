import { MOCK_CONFIG } from '../config';
import { mockReviews } from '@/pages/shop/data/mockReviews';

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reviewsApi = {
  getProductReviews: async (productId) => {
    await delay(MOCK_CONFIG.DELAY);
    // Return mock reviews (in a real scenario, we would filter by productId)
    return { data: mockReviews };
  },

  addProductReview: async (productId, reviewData) => {
    await delay(MOCK_CONFIG.DELAY);
    
    // Extract data from the formatted request payload
    const { reviewer_name, reviewer_email, review, rating } = reviewData;
    
    // Create a new review with the provided data
    const newReview = {
      id: Math.floor(Math.random() * 10000),
      userName: reviewer_name,
      email: reviewer_email,
      text: review,
      rating: rating,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };
    
    // In a real implementation, we would save this to a store
    return { data: newReview };
  }
};
