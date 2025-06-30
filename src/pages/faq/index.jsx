import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = [
    {
      title: "Commandes et Paiements",
      faqs: [
        {
          question: "Comment passer une commande sur votre site ?",
          answer: "Pour passer une commande, parcourez notre catalogue, sélectionnez les articles souhaités et ajoutez-les à votre panier. Ensuite, cliquez sur l'icône du panier pour procéder au paiement. Vous pouvez payer par carte de crédit, PayPal ou virement bancaire."
        },
        {
          question: "Quels modes de paiement acceptez-vous ?",
          answer: "Nous acceptons les paiements par carte de crédit (Visa, Mastercard, American Express), PayPal, et virement bancaire. Tous les paiements sont sécurisés et cryptés pour garantir la protection de vos informations personnelles."
        },
        {
          question: "Puis-je modifier ou annuler ma commande après l'avoir passée ?",
          answer: "Vous pouvez modifier ou annuler votre commande dans les 24 heures suivant sa validation en contactant notre service client. Au-delà de ce délai, si la commande est déjà en cours de préparation, il ne sera plus possible de la modifier ou de l'annuler."
        },
        {
          question: "Comment puis-je suivre ma commande ?",
          answer: "Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi. Vous pouvez également suivre votre commande en vous connectant à votre compte sur notre site et en accédant à la section 'Mes commandes'."
        }
      ]
    },
    {
      title: "Produits et Stock",
      faqs: [
        {
          question: "Les dimensions des meubles sont-elles précises ?",
          answer: "Oui, toutes les dimensions indiquées sur notre site sont précises et mesurées en centimètres. Nous vous recommandons de mesurer votre espace avant d'acheter pour vous assurer que le meuble s'adaptera parfaitement."
        },
        {
          question: "Que faire si un produit est en rupture de stock ?",
          answer: "Si un produit est en rupture de stock, vous pouvez cliquer sur le bouton 'Prévenez-moi quand le produit est disponible' sur la page du produit. Vous recevrez un email dès que le produit sera de nouveau disponible."
        },
        {
          question: "Les couleurs des produits sur les photos sont-elles fidèles à la réalité ?",
          answer: "Nous nous efforçons de présenter des photos aussi fidèles que possible à la réalité. Cependant, les couleurs peuvent légèrement varier en fonction de votre écran. Pour les tissus et les finitions en bois, nous recommandons de commander un échantillon avant l'achat final."
        },
        {
          question: "Proposez-vous des échantillons de tissus ou de matériaux ?",
          answer: "Oui, pour certains produits, nous proposons des échantillons de tissus et de matériaux. Consultez la page du produit concerné ou contactez notre service client pour plus d'informations."
        }
      ]
    },
    {
      title: "Livraison et Retours",
      faqs: [
        {
          question: "Quels sont vos délais de livraison ?",
          answer: "Les délais de livraison varient en fonction du produit et de votre localisation. Pour les articles en stock, comptez 5 à 7 jours ouvrables pour la livraison standard. Pour les articles sur commande, le délai peut aller jusqu'à 4-6 semaines. Les délais précis sont indiqués sur la page de chaque produit."
        },
        {
          question: "Livrez-vous à l'international ?",
          answer: "Oui, nous livrons dans de nombreux pays. Les frais de livraison et les délais varient selon la destination. Vous pouvez consulter les options de livraison disponibles pour votre pays lors du processus de commande."
        },
        {
          question: "Comment retourner un article ?",
          answer: "Si vous souhaitez retourner un article, contactez notre service client dans les 14 jours suivant la réception. Nous vous fournirons les instructions détaillées pour le retour. Les articles doivent être retournés dans leur état d'origine, non utilisés et dans leur emballage d'origine."
        },
        {
          question: "Les frais de livraison sont-ils remboursés en cas de retour ?",
          answer: "Les frais de livraison initiaux ne sont pas remboursés en cas de retour, sauf si le retour est dû à une erreur de notre part (article défectueux, mauvais article livré, etc.)."
        }
      ]
    },
    {
      title: "Garantie et Service Après-Vente",
      faqs: [
        {
          question: "Quelle est la durée de garantie de vos produits ?",
          answer: "Tous nos produits sont couverts par une garantie de 2 ans contre les défauts de fabrication. Certains produits peuvent bénéficier d'une garantie plus longue, comme indiqué sur leur page respective."
        },
        {
          question: "Comment faire une réclamation sous garantie ?",
          answer: "Pour faire une réclamation sous garantie, contactez notre service client en fournissant votre numéro de commande, des photos du produit défectueux et une description du problème. Nous traiterons votre demande dans les plus brefs délais."
        },
        {
          question: "Proposez-vous un service de réparation pour les meubles endommagés ?",
          answer: "Oui, nous proposons un service de réparation pour les meubles sous garantie. Pour les meubles hors garantie, nous pouvons vous recommander des professionnels qualifiés ou vous conseiller sur les réparations possibles."
        },
        {
          question: "Vendez-vous des pièces de rechange pour vos meubles ?",
          answer: "Oui, nous vendons des pièces de rechange pour la plupart de nos meubles. Contactez notre service client en précisant le modèle et la pièce dont vous avez besoin."
        }
      ]
    }
  ];

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4E3B26] mb-6">Foire Aux Questions</h1>
            <div className="w-24 h-0.5 bg-[#C5A05C]/50 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-[#4E3B26]/80 max-w-3xl mx-auto leading-relaxed">
              Trouvez des réponses aux questions les plus fréquemment posées concernant nos produits, commandes, livraisons et plus encore.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {faqCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-[#FAF7F2] hover:bg-[#FAF7F2]/80 transition-colors duration-300 p-6 rounded-lg text-center cursor-pointer"
              onClick={() => document.getElementById(`category-${index}`).scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <h3 className="text-lg font-medium text-[#4E3B26]">{category.title}</h3>
              <div className="mt-2 text-sm text-[#4E3B26]/70">{category.faqs.length} questions</div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Sections */}
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} id={`category-${categoryIndex}`} className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-serif text-[#4E3B26] mb-8 text-center"
            >
              {category.title}
            </motion.h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {category.faqs.map((faq, faqIndex) => {
                const index = categoryIndex * 10 + faqIndex;
                return (
                  <motion.div 
                    key={faqIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * faqIndex }}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md' : ''}`}
                  >
                    <button 
                      className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="text-lg font-medium text-[#4E3B26]">{faq.question}</h3>
                      <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#C5A05C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                    >
                      <div className="p-6 pt-0 text-[#4E3B26]/80 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-[#FAF7F2]/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif text-[#4E3B26] mb-6">Vous n'avez pas trouvé votre réponse ?</h2>
            <p className="text-[#4E3B26]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Notre équipe de service client est disponible pour répondre à toutes vos questions. N'hésitez pas à nous contacter.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-[#4E3B26] hover:bg-[#5D4A35] text-white px-8 py-3 rounded-md transition-colors duration-300 font-medium"
            >
              Contactez-Nous
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
