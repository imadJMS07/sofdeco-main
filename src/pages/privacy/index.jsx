import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4E3B26] mb-6">Politique de Confidentialité</h1>
            <div className="w-24 h-0.5 bg-[#C5A05C]/50 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-[#4E3B26]/80 max-w-3xl mx-auto leading-relaxed">
              Chez SOFDECO, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous explique comment nous collectons, utilisons et protégeons vos informations.
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
              Cette politique de confidentialité décrit nos pratiques concernant la collecte, l'utilisation et la divulgation de vos informations lorsque vous utilisez notre service et vous informe de vos droits en matière de confidentialité et de la manière dont la loi vous protège.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed">
              Nous utilisons vos données personnelles pour fournir et améliorer notre service. En utilisant notre service, vous acceptez la collecte et l'utilisation d'informations conformément à la présente politique de confidentialité.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Collecte et utilisation des données</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <h3 className="text-xl font-medium text-[#4E3B26] mb-3">Types de données collectées</h3>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              <strong>Données personnelles</strong>
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Lors de l'utilisation de notre service, nous pouvons vous demander de nous fournir certaines informations personnellement identifiables qui peuvent être utilisées pour vous contacter ou vous identifier. Ces informations peuvent inclure, sans s'y limiter :
            </p>
            <ul className="list-disc pl-6 text-[#4E3B26]/80 leading-relaxed mb-6 space-y-2">
              <li>Adresse e-mail</li>
              <li>Nom et prénom</li>
              <li>Numéro de téléphone</li>
              <li>Adresse, État, Province, Code postal, Ville</li>
              <li>Données d'utilisation</li>
            </ul>
            
            <h3 className="text-xl font-medium text-[#4E3B26] mb-3">Données d'utilisation</h3>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Les données d'utilisation sont collectées automatiquement lors de l'utilisation du service.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Les données d'utilisation peuvent inclure des informations telles que l'adresse de protocole Internet de votre appareil (par exemple, l'adresse IP), le type de navigateur, la version du navigateur, les pages de notre service que vous visitez, l'heure et la date de votre visite, le temps passé sur ces pages, les identifiants uniques de l'appareil et d'autres données de diagnostic.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Lorsque vous accédez au service par ou via un appareil mobile, nous pouvons collecter automatiquement certaines informations, y compris, mais sans s'y limiter, le type d'appareil mobile que vous utilisez, l'identifiant unique de votre appareil mobile, l'adresse IP de votre appareil mobile, votre système d'exploitation mobile, le type de navigateur Internet mobile que vous utilisez, les identifiants uniques de l'appareil et d'autres données de diagnostic.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Nous pouvons également collecter les informations que votre navigateur envoie chaque fois que vous visitez notre service ou lorsque vous accédez au service par ou via un appareil mobile.
            </p>
            
            <h3 className="text-xl font-medium text-[#4E3B26] mb-3">Technologies de suivi et cookies</h3>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre service et stocker certaines informations. Les technologies de suivi utilisées sont des balises, des tags et des scripts pour collecter et suivre des informations et pour améliorer et analyser notre service.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Vous pouvez demander à votre navigateur de refuser tous les cookies ou d'indiquer quand un cookie est envoyé. Cependant, si vous n'acceptez pas les cookies, vous ne pourrez peut-être pas utiliser certaines parties de notre service.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Utilisation de vos données personnelles</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              SOFDECO peut utiliser les données personnelles aux fins suivantes :
            </p>
            <ul className="list-disc pl-6 text-[#4E3B26]/80 leading-relaxed mb-6 space-y-3">
              <li>
                <strong>Pour fournir et maintenir notre service</strong>, y compris pour surveiller l'utilisation de notre service.
              </li>
              <li>
                <strong>Pour gérer votre compte</strong> : pour gérer votre inscription en tant qu'utilisateur du service. Les données personnelles que vous fournissez peuvent vous donner accès à différentes fonctionnalités du service qui vous sont disponibles en tant qu'utilisateur enregistré.
              </li>
              <li>
                <strong>Pour l'exécution d'un contrat</strong> : le développement, la conformité et l'entreprise du contrat d'achat des produits, articles ou services que vous avez achetés ou de tout autre contrat avec nous par le biais du service.
              </li>
              <li>
                <strong>Pour vous contacter</strong> : pour vous contacter par e-mail, appels téléphoniques, SMS ou autres formes équivalentes de communication électronique, telles que les notifications push d'une application mobile concernant les mises à jour ou les communications informatives liées aux fonctionnalités, produits ou services contractés, y compris les mises à jour de sécurité, lorsque cela est nécessaire ou raisonnable pour leur mise en œuvre.
              </li>
              <li>
                <strong>Pour vous fournir</strong> des nouvelles, des offres spéciales et des informations générales sur d'autres biens, services et événements que nous proposons et qui sont similaires à ceux que vous avez déjà achetés ou sur lesquels vous vous êtes renseigné, sauf si vous avez choisi de ne pas recevoir ces informations.
              </li>
              <li>
                <strong>Pour gérer vos demandes</strong> : pour assister et gérer vos demandes à notre égard.
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Conservation de vos données personnelles</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              La Société ne conservera vos données personnelles que le temps nécessaire aux fins énoncées dans la présente politique de confidentialité. Nous conserverons et utiliserons vos données personnelles dans la mesure nécessaire pour nous conformer à nos obligations légales (par exemple, si nous sommes tenus de conserver vos données pour nous conformer aux lois applicables), résoudre les litiges et appliquer nos accords et politiques juridiques.
            </p>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              La Société conservera également les données d'utilisation à des fins d'analyse interne. Les données d'utilisation sont généralement conservées pendant une période plus courte, sauf lorsque ces données sont utilisées pour renforcer la sécurité ou pour améliorer la fonctionnalité de notre service, ou lorsque nous sommes légalement tenus de conserver ces données pendant des périodes plus longues.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Sécurité de vos données personnelles</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              La sécurité de vos données personnelles est importante pour nous, mais n'oubliez pas qu'aucune méthode de transmission sur Internet ou méthode de stockage électronique n'est sécurisée à 100%. Bien que nous nous efforcions d'utiliser des moyens commercialement acceptables pour protéger vos données personnelles, nous ne pouvons garantir leur sécurité absolue.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-4">Vos droits en matière de protection des données</h2>
            <div className="w-16 h-0.5 bg-[#C5A05C]/50 mb-6"></div>
            
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Vous disposez de certains droits en vertu des lois sur la protection des données concernant vos données personnelles. Ces droits peuvent inclure :
            </p>
            <ul className="list-disc pl-6 text-[#4E3B26]/80 leading-relaxed mb-6 space-y-2">
              <li>Le droit d'accéder à vos données personnelles</li>
              <li>Le droit de rectifier vos données personnelles</li>
              <li>Le droit de supprimer vos données personnelles</li>
              <li>Le droit de restreindre le traitement de vos données personnelles</li>
              <li>Le droit à la portabilité des données</li>
              <li>Le droit de vous opposer au traitement de vos données personnelles</li>
            </ul>
            <p className="text-[#4E3B26]/80 leading-relaxed mb-6">
              Pour exercer l'un de ces droits, veuillez nous contacter à l'adresse e-mail indiquée dans la section Contact ci-dessous.
            </p>
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
            <h2 className="text-2xl font-serif text-[#4E3B26] mb-6">Des questions sur notre politique de confidentialité ?</h2>
            <p className="text-[#4E3B26]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, n'hésitez pas à nous contacter.
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

export default PrivacyPolicyPage;
