import React, { useState } from 'react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full md:w-[500px] mx-auto relative">
      
      <h3 className="text-[#4E3B26] font-serif text-2xl mb-4 text-center">Restez Informé</h3>
      <div className="w-16 h-0.5 bg-[#C5A05C]/50 mx-auto mb-6" />
      <p className="text-[#4E3B26]/70 text-sm mb-8 text-center max-w-md mx-auto leading-relaxed">
        Abonnez-vous à notre newsletter pour recevoir des offres exclusives et les dernières actualités.
      </p>
      {submitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg text-center shadow-sm animate-fade-in">
          <div className="flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Inscription réussie!</span>
          </div>
          <p>Merci pour votre inscription! Vous recevrez bientôt nos actualités.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            className="flex-1 px-5 py-3.5 border border-[#C5A05C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A05C] focus:border-transparent bg-white/90 shadow-sm hover:shadow-md transition-shadow text-[#4E3B26]"
            required
          />
          <button
            type="submit"
            className="bg-[#4E3B26] text-white px-6 py-3.5 rounded-lg hover:bg-[#C5A05C] transition-all duration-300 font-medium shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transform"
          >
            <span className="flex items-center justify-center">
              <span>S'abonner</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </form>
      )}
    </div>
  );
}; 