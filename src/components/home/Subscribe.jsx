import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await axios.post('/api/subscribe', { email });
      
      if (response.data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(response.data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(error.response.data.message || 'Subscription failed. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-[#F8F3EE]">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A05C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h2 className="text-sm uppercase tracking-[0.3em] text-[#C5A05C] font-medium mb-2">Restez Informé</h2>
              <div className="w-12 h-0.5 bg-[#C5A05C] mb-6" />
              
              <h3 className="text-4xl md:text-5xl font-serif text-[#2A2118] mb-6 leading-tight">
                Rejoignez Notre Newsletter
              </h3>
              
              <p className="text-[#2A2118] text-lg mb-8 max-w-lg">
                Soyez le premier à connaître nos nouvelles collections, nos offres exclusives et nos conseils de décoration intérieure. Abonnez-vous maintenant et transformez votre espace avec nos conseils personnalisés.
              </p>

              {/* Benefits list */}
              <div className="space-y-4">
                {[
                  'Accès anticipé exclusif aux nouvelles collections',
                  'Offres spéciales et remises',
                  'Conseils et inspiration de décoration intérieure',
                  'Dernières tendances en matière de décoration'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A05C]" />
                    <span className="text-[#2A2118]">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#C5A05C]/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A05C]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Entrez votre email"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white border border-[#C5A05C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A05C] focus:border-transparent transition-all duration-300 text-[#2A2118] placeholder-[#2A2118]/60"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 bg-[#2A2118] text-white rounded-xl flex items-center justify-center space-x-2 ${
                      status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1A1510]'
                    }`}
                  >
                    <span>{status === 'loading' ? 'Abonnement en cours...' : 'S\'abonner Maintenant'}</span>
                    {status !== 'loading' && <ArrowRightIcon className="w-4 h-4" />}
                  </motion.button>

                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center"
                      >
                        Merci pour votre abonnement ! Nous vous tiendrons informé de nos dernières actualités.
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
                      >
                        {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-6 text-center text-sm text-[#2A2118]/60"
                >
                  En vous abonnant, vous acceptez notre Politique de Confidentialité et consentez à recevoir des mises à jour de notre entreprise.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscribe; 