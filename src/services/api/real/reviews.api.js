import api, { ENDPOINTS } from '../config';

export const reviewsApi = {
  getProductReviews: async (productId) => {
    const response = await api.get(`${ENDPOINTS.PRODUCTS}/${productId}/reviews`);
    return response;
  },

  addProductReview: async (productId, reviewData) => {
    const formattedData = {
      reviewer_name: reviewData.userName,
      reviewer_email: reviewData.email || 'user@example.com',
      review: reviewData.review,
      rating: reviewData.rating
    };
    
    const response = await api.post(`${ENDPOINTS.PRODUCTS}/${productId}/reviews`, formattedData);
    return response;
  }
};
