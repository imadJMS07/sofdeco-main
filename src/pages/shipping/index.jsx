import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TruckIcon, ClockIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const ShippingPage = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-white mb-16">
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A05C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4E3B26] mb-6">Livraison</h1>
            <div className="w-24 h-0.5 bg-[#C5A05C]/50 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-[#4E3B26]/80 max-w-3xl mx-auto leading-relaxed">
              Informations sur nos options de livraison, délais et politiques pour vous assurer de recevoir vos articles dans les meilleures conditions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Shipping Options */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-serif text-[#4E3B26] mb-6">Options de Livraison</h2>
          <div className="w-16 h-0.5 bg-[#C5A05C]/50 mx-auto mb-6"></div>
          <p className="text-[#4E3B26]/80 max-w-3xl mx-auto leading-relaxed">
            Nous proposons plusieurs options de livraison pour répondre à vos besoins.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Livraison Standard",
              description: "Livraison en 5-7 jours ouvrables. Gratuite pour les commandes de plus de 150€.",
              price: "8,95€",
              icon: <TruckIcon className="w-8 h-8 text-[#C5A05C]" />
            },
            {
              title: "Livraison Express",
              description: "Livraison en 2-3 jours ouvrables pour les commandes passées avant 14h.",
              price: "14,95€",
              icon: <ClockIcon className="w-8 h-8 text-[#C5A05C]" />
            },
            {
              title: "Livraison Premium",
              description: "Livraison le jour suivant pour les commandes passées avant 12h (jours ouvrables uniquement).",
              price: "19,95€",
              icon: <ShieldCheckIcon className="w-8 h-8 text-[#C5A05C]" />
            }
          ].map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="mb-4">{option.icon}</div>
              <h3 className="text-xl font-medium text-[#4E3B26] mb-2">{option.title}</h3>
              <p className="text-[#4E3B26]/70 leading-relaxed mb-4 flex-grow">{option.description}</p>
              <div className="text-[#C5A05C] font-medium text-lg">{option.price}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shipping Process */}
      <div className="bg-[#FAF7F2]/50 py-16 md:py-24 mb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-serif text-[#4E3B26] mb-6">Processus de Livraison</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mx-auto mb-6"></div>
            <p className="text-[#4E3B26]/80 max-w-3xl mx-auto leading-relaxed">
              Notre processus de livraison est conçu pour assurer que vos articles arrivent en parfait état et dans les délais prévus.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#C5A05C]/20 hidden md:block"></div>
            
            <div className="space-y-12 relative">
              {[
                {
                  title: "Confirmation de Commande",
                  description: "Vous recevrez un email de confirmation dès que votre commande sera validée, avec un récapitulatif de vos articles."
                },
                {
                  title: "Préparation de Commande",
                  description: "Nos équipes préparent soigneusement votre commande, en vérifiant la qualité de chaque article avant emballage."
                },
                {
                  title: "Expédition",
                  description: "Vous recevrez un email avec un numéro de suivi dès que votre commande sera remise au transporteur."
                },
                {
                  title: "Livraison",
                  description: "Le transporteur vous contactera pour organiser la livraison à votre domicile ou à l'adresse indiquée."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-[#C5A05C]/10 flex items-center justify-center z-10 relative">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C5A05C] font-bold text-xl">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-xl font-medium text-[#4E3B26] mb-3">{step.title}</h3>
                    <p className="text-[#4E3B26]/70 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* International Shipping */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-serif text-[#4E3B26] mb-6">Livraison Internationale</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            <p className="text-[#4E3B26]/80 mb-6 leading-relaxed">
              Nous livrons dans de nombreux pays à travers le monde. Les délais et frais de livraison varient selon la destination.
            </p>
            <p className="text-[#4E3B26]/80 mb-6 leading-relaxed">
              Pour les livraisons internationales, veuillez noter que des frais de douane ou taxes peuvent s'appliquer selon le pays de destination. Ces frais sont à la charge du client et ne sont pas inclus dans nos prix.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed">
              Pour plus d'informations sur la livraison internationale, n'hésitez pas à contacter notre service client.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FAF7F2] rounded-full z-0"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#FAF7F2] rounded-full z-0"></div>
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-center mb-6">
                <GlobeAltIcon className="w-16 h-16 text-[#C5A05C]" />
              </div>
              <h3 className="text-xl font-medium text-[#4E3B26] mb-4 text-center">Pays Desservis</h3>
              <ul className="grid grid-cols-2 gap-2 text-[#4E3B26]/70">
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>France</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>Belgique</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>Suisse</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>Luxembourg</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>Allemagne</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>Italie</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>Espagne</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>Portugal</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>Pays-Bas</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-[#C5A05C] rounded-full mr-2"></span>Maroc</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#FAF7F2]/50 py-16 md:py-24 mb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-serif text-[#4E3B26] mb-6">Questions Fréquentes</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mx-auto mb-6"></div>
            <p className="text-[#4E3B26]/80 max-w-3xl mx-auto leading-relaxed">
              Retrouvez les réponses aux questions les plus fréquemment posées concernant nos livraisons.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Comment suivre ma commande ?",
                answer: "Vous recevrez un email avec un numéro de suivi dès que votre commande sera expédiée. Vous pourrez suivre votre colis en cliquant sur le lien fourni dans l'email ou en vous connectant à votre compte sur notre site."
              },
              {
                question: "Que faire si je ne suis pas présent lors de la livraison ?",
                answer: "Si vous n'êtes pas présent lors de la livraison, le transporteur laissera un avis de passage. Vous pourrez alors reprogrammer la livraison ou récupérer votre colis à un point relais, selon les options proposées par le transporteur."
              },
              {
                question: "Les frais de livraison sont-ils remboursés en cas de retour ?",
                answer: "Les frais de livraison initiaux ne sont pas remboursés en cas de retour, sauf si le retour est dû à une erreur de notre part ou à un produit défectueux."
              },
              {
                question: "Livrez-vous les meubles montés ?",
                answer: "La plupart de nos meubles sont livrés non montés pour faciliter le transport. Des instructions de montage détaillées sont fournies avec chaque article. Pour certains articles volumineux, nous proposons un service de livraison et montage moyennant des frais supplémentaires."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="mb-6 bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-medium text-[#4E3B26] mb-3">{faq.question}</h3>
                <p className="text-[#4E3B26]/70 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#4E3B26] to-[#6B5842] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif mb-6">Besoin d'Aide ?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Notre équipe de service client est disponible pour répondre à toutes vos questions concernant la livraison de vos commandes.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-[#C5A05C] hover:bg-[#D6B16D] text-white px-8 py-3 rounded-md transition-colors duration-300 font-medium"
            >
              Contactez-Nous
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
