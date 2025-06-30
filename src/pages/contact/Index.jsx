import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaInstagram, FaFacebookF, FaPinterestP, FaTwitter } from 'react-icons/fa';
import { 
  fetchContactInfo, 
  submitContactForm, 
  resetFormSubmissionStatus,
  selectContactInfo, 
  selectContactStatus, 
  selectContactError,
  selectFormSubmissionStatus,
  selectFormSubmissionError
} from '@/features/contacts/contactsSlice';

export default function ContactUs() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [activeQuestion, setActiveQuestion] = useState(null);
  
  // Redux selectors
  const contactInfo = useSelector(selectContactInfo);
  const contactStatus = useSelector(selectContactStatus);
  const contactError = useSelector(selectContactError);
  const formSubmissionStatus = useSelector(selectFormSubmissionStatus);
  const formSubmissionError = useSelector(selectFormSubmissionError);
  
  // Derived state
  const isLoading = contactStatus === 'loading';
  const loading = formSubmissionStatus === 'loading';

  // Fetch contact info on component mount
  useEffect(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);
  
  // Handle form submission success/error
  useEffect(() => {
    if (formSubmissionStatus === 'succeeded') {
      toast.success('Message envoyé avec succès ! Nous vous répondrons bientôt.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      dispatch(resetFormSubmissionStatus());
    } else if (formSubmissionStatus === 'failed' && formSubmissionError) {
      toast.error(formSubmissionError || 'Échec de l\'envoi du message. Veuillez réessayer plus tard.');
      dispatch(resetFormSubmissionStatus());
    }
  }, [formSubmissionStatus, formSubmissionError, dispatch]);
  
  // Show error toast if contact info fetch fails
  useEffect(() => {
    if (contactStatus === 'failed' && contactError) {
      toast.error('Impossible de charger les informations de contact. Veuillez actualiser la page.');
    }
  }, [contactStatus, contactError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "Quelles sont vos options de livraison ?",
      answer: "Nous proposons la livraison standard (3-5 jours ouvrables), la livraison express (1-2 jours ouvrables) et la livraison premium avec service de montage. Les frais de livraison varient selon l'emplacement et le niveau de service."
    },
    {
      question: "Proposez-vous la livraison internationale ?",
      answer: "Oui, nous livrons vers certaines destinations internationales. Les tarifs d'expédition internationale et les délais de livraison varient selon l'emplacement. Veuillez contacter notre service client pour plus de détails."
    },
    {
      question: "Quelle est votre politique de retour ?",
      answer: "Nous offrons une politique de retour de 30 jours pour la plupart des articles. Les produits doivent être dans leur état d'origine avec tous les emballages. Les commandes personnalisées peuvent avoir des conditions de retour différentes."
    },
    {
      question: "Proposez-vous des services de montage ?",
      answer: "Oui, nous proposons des services de montage professionnels moyennant des frais supplémentaires. Vous pouvez sélectionner cette option lors du paiement ou contacter notre service client pour l'organiser après l'achat."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Premium Background */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3032&q=100" 
          alt="Luxury furniture showroom" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center px-4 max-w-4xl"
          >
            <div className="flex flex-col items-center">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-[1px] bg-[#C5A05C] mb-8"
              ></motion.div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white font-serif tracking-tight">Contactez-Nous</h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-[1px] bg-[#C5A05C] mb-8"
              ></motion.div>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light italic">
                Créons ensemble votre espace parfait
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-8 text-[#4E3B26] relative inline-block">
            Entrez en Contact avec Sofdeco
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-[#C5A05C]"></span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Que vous ayez une question sur notre collection de meubles, besoin de conseils en décoration, ou souhaitiez discuter d'une commande personnalisée, notre équipe est prête à vous aider avec un service personnalisé et une expertise professionnelle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-xl p-10 h-full border-t-4 border-[#C5A05C] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#C5A05C]/5 rounded-full -mr-20 -mt-20 z-0"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#4E3B26]/5 rounded-full -ml-20 -mb-20 z-0"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-serif font-medium mb-10 text-[#4E3B26] border-b border-gray-100 pb-4">Contactez-Nous</h2>
                
                <div className="space-y-10">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#C5A05C]"></div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-5">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C5A05C]/20 to-[#C5A05C]/10 flex items-center justify-center shadow-sm">
                            <FaMapMarkerAlt className="text-[#C5A05C] text-xl" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 text-lg">Notre Adresse</h3>
                          <p className="text-gray-600 mt-2 leading-relaxed">{contactInfo.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-5">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C5A05C]/20 to-[#C5A05C]/10 flex items-center justify-center shadow-sm">
                            <FaPhoneAlt className="text-[#C5A05C] text-xl" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 text-lg">Numéro de Téléphone</h3>
                          <p className="text-gray-600 mt-2">{contactInfo.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-5">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C5A05C]/20 to-[#C5A05C]/10 flex items-center justify-center shadow-sm">
                            <FaEnvelope className="text-[#C5A05C] text-xl" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 text-lg">Adresse Email</h3>
                          <p className="text-gray-600 mt-2">{contactInfo.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-5">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C5A05C]/20 to-[#C5A05C]/10 flex items-center justify-center shadow-sm">
                            <FaClock className="text-[#C5A05C] text-xl" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 text-lg">Heures d'Ouverture</h3>
                          <p className="text-gray-600 mt-2">{contactInfo.working_hours}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {!isLoading && (
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="font-medium text-gray-800 text-lg mb-5">Suivez-Nous</h3>
                      <div className="flex space-x-4">
                        {contactInfo.instagram_link && (
                          <a 
                            href={contactInfo.instagram_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A05C]/20 to-[#C5A05C]/10 flex items-center justify-center hover:bg-[#C5A05C] hover:text-white transition-colors duration-300 text-[#C5A05C] shadow-sm"
                          >
                            <FaInstagram />
                          </a>
                        )}
                        {contactInfo.facebook_link && (
                          <a 
                            href={contactInfo.facebook_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A05C]/20 to-[#C5A05C]/10 flex items-center justify-center hover:bg-[#C5A05C] hover:text-white transition-colors duration-300 text-[#C5A05C] shadow-sm"
                          >
                            <FaFacebookF />
                          </a>
                        )}
                        {contactInfo.whatsapp_link && (
                          <a 
                            href={contactInfo.whatsapp_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A05C]/20 to-[#C5A05C]/10 flex items-center justify-center hover:bg-[#C5A05C] hover:text-white transition-colors duration-300 text-[#C5A05C] shadow-sm"
                          >
                            <FaTwitter />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-xl p-10 border-t-4 border-[#4E3B26] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#4E3B26]/5 rounded-full -mr-20 -mt-20 z-0"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#C5A05C]/5 rounded-full -ml-20 -mb-20 z-0"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-serif font-medium mb-10 text-[#4E3B26] border-b border-gray-100 pb-4">Envoyez-Nous un Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Votre Nom</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A05C] focus:border-transparent transition-all duration-300 bg-gray-50/50"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Votre Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A05C] focus:border-transparent transition-all duration-300 bg-gray-50/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A05C] focus:border-transparent transition-all duration-300 bg-gray-50/50"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A05C] focus:border-transparent transition-all duration-300 bg-gray-50/50"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#C5A05C] to-[#4E3B26] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                        </>
                      ) : 'Envoyer le Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Map Section */}

        
        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-10"
        >
          <div className="bg-white rounded-xl shadow-xl p-10 border border-gray-100">
            <h2 className="text-2xl font-serif font-medium mb-10 text-center text-[#4E3B26] relative inline-block mx-auto w-full">
              <span className="relative inline-block">
                Questions Fréquemment Posées
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-[#C5A05C]"></span>
              </span>
            </h2>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#C5A05C] transition-colors duration-300 hover:shadow-md"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none bg-white hover:bg-gray-50/80 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-medium text-[#4E3B26]">{faq.question}</h3>
                    <span className={`transform transition-transform duration-300 ${activeQuestion === index ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#C5A05C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${activeQuestion === index ? 'max-h-40' : 'max-h-0'}`}
                  >
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
