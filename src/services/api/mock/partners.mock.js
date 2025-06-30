import { partnersData } from './data/partners.data';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const partnersApi = {
  getPartners: async () => {
    await delay(500);
    return partnersData;
  },

  getPartnerById: async (partnerId) => {
    await delay(500);
    const partner = partnersData.find(p => String(p.id) === String(partnerId));
    if (!partner) {
      throw new Error('Partner not found');
    }
    return partner;
  },

  updatePartner: async (partnerId, partnerData) => {
    await delay(500);
    const index = partnersData.findIndex(p => String(p.id) === String(partnerId));
    if (index === -1) {
      throw new Error('Partner not found');
    }
    const updatedPartner = {
      ...partnersData[index],
      ...partnerData
    };
    partnersData[index] = updatedPartner;
    return updatedPartner;
  },

  getActivePartners: async () => {
    await delay(500);
    return partnersData.filter(partner => partner.isActive);
  },

  getFeaturedPartners: async () => {
    await delay(500);
    return partnersData.filter(partner => partner.priority <= 3);
  }
}; 