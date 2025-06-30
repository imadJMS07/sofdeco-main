import api from '../config';

export const contactsApi = {
  getContactInfo: async () => {
    const response = await api.get('/contacts');
    return response;
  },
  
  submitContactForm: async (formData) => {
    const response = await api.post('/contact-submissions', formData);
    return response;
  }
};
