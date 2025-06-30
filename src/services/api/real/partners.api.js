import api, { ENDPOINTS } from '../config';

export const partnersApi = {
  getPartners: async () => {
    const response = await api.get(ENDPOINTS.PARTNERS);
    return response.data;
  },

  getPartnerById: async (partnerId) => {
    const response = await api.get(`${ENDPOINTS.PARTNERS}/${partnerId}`);
    return response.data;
  },

  updatePartner: async (partnerId, partnerData) => {
    const response = await api.put(`${ENDPOINTS.PARTNERS}/${partnerId}`, partnerData);
    return response.data;
  },

  getActivePartners: async () => {
    const response = await api.get(`${ENDPOINTS.PARTNERS}/active`);
    return response.data;
  },

  getFeaturedPartners: async () => {
    const response = await api.get(`${ENDPOINTS.PARTNERS}/featured`);
    return response.data;
  }
}; 