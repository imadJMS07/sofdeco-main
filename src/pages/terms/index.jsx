import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsPage = () => {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4E3B26] mb-6">Conditions d'Utilisation</h1>
            <div className="w-24 h-0.5 bg-[#C5A05C]/50 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-[#4E3B26]/80 max-w-3xl mx-auto leading-relaxed">
              Veuillez lire attentivement ces conditions d'utilisation avant d'utiliser notre site web et nos services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-6">Dernière mise à jour : 23 mai 2025</h2>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Bienvenue sur SOFDECO. Les présentes conditions d'utilisation régissent votre utilisation du site web SOFDECO, accessible à l'adresse www.sofdeco.com, ainsi que tous les services associés.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed">
              En accédant à ce site web, nous supposons que vous acceptez ces conditions d'utilisation. N'utilisez pas SOFDECO si vous n'êtes pas d'accord avec toutes les conditions d'utilisation énoncées sur cette page.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Terminologie</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              La terminologie suivante s'applique aux présentes conditions d'utilisation, à la déclaration de confidentialité et à tout accord :
            </p>
            <ul className="list-disc pl-6 text-[#4E3B26]/80 leading-relaxed mb-6 space-y-3">
              <li>
                <strong>"Client", "Vous" et "Votre"</strong> désignent la personne accédant à ce site web et acceptant les conditions d'utilisation de la société.
              </li>
              <li>
                <strong>"La Société", "Nous-mêmes", "Nous" et "Notre"</strong> désignent notre société, SOFDECO.
              </li>
              <li>
                <strong>"Partie", "Parties" ou "Nous"</strong> désignent à la fois le client et nous-mêmes.
              </li>
            </ul>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Tous les termes se réfèrent à l'offre, à l'acceptation et à la considération du paiement nécessaire pour entreprendre le processus de notre assistance au client de la manière la plus appropriée, que ce soit par des réunions formelles d'une durée déterminée, ou par tout autre moyen, dans le but exprès de répondre aux besoins du client en ce qui concerne la fourniture des services/produits déclarés de la société, conformément à la loi en vigueur.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Licence</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Sauf indication contraire, SOFDECO et/ou ses concédants de licence détiennent les droits de propriété intellectuelle pour tout le matériel sur SOFDECO. Tous les droits de propriété intellectuelle sont réservés. Vous pouvez y accéder depuis SOFDECO pour votre usage personnel, sous réserve des restrictions définies dans les présentes conditions d'utilisation.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Vous ne devez pas :
            </p>
            <ul className="list-disc pl-6 text-[#4E3B26]/80 leading-relaxed mb-6 space-y-2">
              <li>Republier le matériel de SOFDECO</li>
              <li>Vendre, louer ou sous-licencier le matériel de SOFDECO</li>
              <li>Reproduire, dupliquer ou copier le matériel de SOFDECO</li>
              <li>Redistribuer le contenu de SOFDECO</li>
            </ul>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Le présent accord commence à la date des présentes. Certaines parties de ce site web offrent aux utilisateurs la possibilité de publier et d'échanger des opinions et des informations dans certaines zones du site web. SOFDECO ne filtre pas, n'édite pas, ne publie pas et ne révise pas les commentaires avant leur présence sur le site web. Les commentaires ne reflètent pas les vues et opinions de SOFDECO, de ses agents et/ou de ses affiliés. Les commentaires reflètent les vues et opinions de la personne qui publie ses vues et opinions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Commandes et Paiements</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              En passant une commande sur notre site, vous garantissez que vous êtes légalement capable de conclure des contrats contraignants et que vous avez au moins 18 ans.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Lorsque vous passez une commande, nous vous enverrons un e-mail de confirmation de la réception de votre commande. Cet e-mail constitue uniquement un accusé de réception de votre commande et ne représente pas une acceptation de votre offre d'achat.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Un contrat entre nous ne sera formé que lorsque nous vous enverrons un e-mail confirmant que les produits ont été expédiés. Nous nous réservons le droit de refuser ou d'annuler votre commande à tout moment pour des raisons incluant, sans s'y limiter :
            </p>
            <ul className="list-disc pl-6 text-[#4E3B26]/80 leading-relaxed mb-6 space-y-2">
              <li>Indisponibilité du produit</li>
              <li>Erreurs dans la description ou le prix du produit</li>
              <li>Erreurs dans votre commande</li>
            </ul>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Nous nous réservons le droit de refuser les commandes qui, selon nous, semblent être passées par des revendeurs, des distributeurs ou des grossistes. Si nous annulons une commande, nous tenterons de vous en informer en vous contactant via l'e-mail et/ou le numéro de téléphone fournis au moment de la commande.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Livraison et Retours</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Les délais de livraison sont donnés à titre indicatif et peuvent varier en fonction de votre localisation et d'autres facteurs. Nous nous efforçons de livrer tous les produits dans les délais indiqués, mais nous ne pouvons garantir des dates de livraison précises.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Vous avez le droit de retourner les produits achetés sur notre site dans les 30 jours suivant la réception, à condition qu'ils soient dans leur état d'origine, non utilisés et dans leur emballage d'origine. Certains produits, pour des raisons d'hygiène ou de personnalisation, ne peuvent pas être retournés. Veuillez consulter notre politique de retour pour plus de détails.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Limitation de Responsabilité</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Dans la mesure permise par la loi applicable, SOFDECO ne sera pas responsable des dommages indirects, punitifs, accessoires, spéciaux, consécutifs ou exemplaires, y compris, sans s'y limiter, les dommages pour perte de profits, de clientèle, d'utilisation, de données ou d'autres pertes intangibles, résultant de ou liés à l'utilisation ou à l'impossibilité d'utiliser le service.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Dans la mesure permise par la loi applicable, SOFDECO ne sera pas responsable des dommages résultant de ou liés à votre utilisation du service ou de tout contenu disponible sur le service.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Modifications des Conditions</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces conditions à tout moment. Si une révision est importante, nous fournirons un préavis d'au moins 30 jours avant l'entrée en vigueur des nouvelles conditions. Ce qui constitue un changement important sera déterminé à notre seule discrétion.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              En continuant à accéder ou à utiliser notre service après l'entrée en vigueur de ces révisions, vous acceptez d'être lié par les conditions révisées. Si vous n'acceptez pas les nouvelles conditions, veuillez cesser d'utiliser le service.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Contact</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Si vous avez des questions concernant ces conditions d'utilisation, vous pouvez nous contacter :
            </p>
            <ul className="list-disc pl-6 text-[#4E3B26]/80 leading-relaxed space-y-2">
              <li>Par email : legal@sofdeco.com</li>
              <li>Par courrier : SOFDECO, 123 Rue de la Décoration, 75001 Paris, France</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#FAF7F2]/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-6">Des questions sur nos conditions d'utilisation ?</h2>
            <p className="text-[#4E3B26]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Si vous avez des questions ou des préoccupations concernant nos conditions d'utilisation, n'hésitez pas à nous contacter.
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

export default TermsPage;
